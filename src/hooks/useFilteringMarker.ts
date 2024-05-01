import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import filterState from '../recoil/atoms';
import { generateMarker } from '../utils/mapUtils';
import { FacilitiesType } from '../types/mapTypes';
import useToast from './useToast';
import getPositionData from '../api/positionAPI';

interface UseFilteringMarkerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
  lat: number | undefined;
  lng: number | undefined;
}

interface FilteringPosition {
  id: number;
  name: string;
  type: FacilitiesType;
  lon: number;
  lat: number;
}

// 마커 추가 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addMarkers(map: any, key: string, positions: FilteringPosition[]) {
  const newMarkers = positions.map((position) =>
    generateMarker(map, position.lat, position.lon, position.type),
  );
  return { key, markers: newMarkers };
}

function useFilteringMarker({ map, lat, lng }: UseFilteringMarkerProps): void {
  const filterValue = useRecoilValue(filterState);
  const [position, setPosition] = useState<
    { [key: string]: FilteringPosition[] } | undefined
  >({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<{ [key: string]: any[] }>({});
  const { createToast } = useToast();

  useEffect(() => {
    if (!lat || !lng) return;

    const allFilter = [
      'firestation',
      'safetycenter',
      'cctv',
      'safetyfacility',
      'heatshelter',
      'emergencybell',
    ];

    Promise.all(allFilter.map((key) => getPositionData(key, lat, lng)))
      .then((responses) => {
        setPosition(
          responses.reduce((acc, res) => {
            return { ...acc, [res.key]: res.data };
          }, {}),
        );
      })
      .catch((err) => {
        createToast({
          msg: '마커 데이터를 불러오는데 실패했습니다.',
          type: 'error',
        });
        console.error(err);
      });
  }, [lat, lng]);

  useEffect(() => {
    if (!position || Object.keys(position).length === 0) {
      return;
    }

    const trueKeys = Object.keys(filterValue).filter((key) => filterValue[key]);
    // console.log('trueKeys는 이거야!!', trueKeys);

    // 이전에 그렸던 마커 중에 필요한 것만 선택하여 새로운 마커를 그리거나 제거
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newMarkers: { [key: string]: any[] } = {};
    Object.entries(markers).forEach(([key, markerArray]) => {
      if (trueKeys.includes(key)) {
        // console.log('유지', key, markerArray);
        newMarkers[key] = markerArray; // 필터링이 유지되어야 하는 마커는 그대로 유지
      } else {
        // 필터링이 해제된 마커는 지도에서 제거
        // console.log('제거', key);
        markerArray.forEach((marker) => marker.setMap(null));
      }
    });

    // 새로운 필터에 해당하는 마커를 추가
    trueKeys.forEach((key) => {
      if (!markers[key]) {
        const { markers: markersArray } = addMarkers(map, key, position[key]);
        newMarkers[key] = markersArray;
      }
    });

    setMarkers(newMarkers);
  }, [map, filterValue, position]);
}

export default useFilteringMarker;
