import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';
import filterState from '../recoil/atoms';
import { generateMarker } from '../utils/mapUtils';
import { FacilitiesType } from '../types/mapTypes';

interface UseFilteringMarkerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map : any;
    lat : number | undefined;
    lng : number | undefined;
}

interface FilteringPosition {
  id: number;
  name: string;
  type: FacilitiesType;
  lon: number;
  lat: number;
}

// 위치 정보 가져오기
async function fetchPositionData(key: string, lat: number, lng: number) {
  const url = `http://3.34.25.245:80/api/${key}?userLat=${lat}&userLon=${lng}`;
  const response = await axios.get(url);
  return { key, data: response.data };
}

// 마커 추가 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addMarkers(map: any, key: string, positions: FilteringPosition[]) {
  const newMarkers = positions.map(position =>
    generateMarker(map, position.lat, position.lon, position.type)
  );
  newMarkers.forEach(marker => marker.setMap(map));
  return { key, markers: newMarkers };
}

function useFilteringMarker({ map, lat, lng }: UseFilteringMarkerProps): void {
  const filterValue = useRecoilValue(filterState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    if (!lat || !lng) return;

    const trueKeys = Object.keys(filterValue).filter(key => filterValue[key]);
    if (!trueKeys.length) {
      // 필터된 값에서 true인 값이 하나도 없으면 모든 마커 제거
      Object.values(markers).flat().forEach(marker => marker.setMap(null));
      setMarkers({});
      return;
    }

    Promise.all(trueKeys.map(key => fetchPositionData(key, lat, lng)))
      .then(responses => {
        // 이전 마커 제거
        Object.values(markers).flat().forEach(marker => marker.setMap(null));

        // 새로운 마커 추가
        const newMarkers = responses.reduce((acc, res) => {
          const { key, markers: markersArray } = addMarkers(map, res.key, res.data);
          return { ...acc, [key]: markersArray };
        }, {});

        // 새로운 마커 설정
        setMarkers(newMarkers);
      })
      .catch(err => {
        console.error(err);
      });
  }, [filterValue, lat, lng, map]);
}

export default useFilteringMarker;
