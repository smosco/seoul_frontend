import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import axios from 'axios';
import filterState from '../recoil/atoms';
import { generateMarker } from '../utils/mapUtils';
import { FacilitiesType } from '../types/mapTypes';
import useToast from './useToast';

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
  return { key, markers: newMarkers };
}

function useFilteringMarker({ map, lat, lng }: UseFilteringMarkerProps): void {
  const filterValue = useRecoilValue(filterState);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [position, setPosition] = useState<{[key : string] : FilteringPosition[]} | undefined>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<{ [key: string]: any[] }>({});
  const { createToast } = useToast();

  useEffect(() => {
    if(!lat || !lng) return;

    const allFilter = ['firestation', 'safetycenter', 'cctv', 'safetyfacility', 'heatshelter', 'emergencybell'];

    Promise.all(allFilter.map(key => fetchPositionData(key, lat, lng)))
      .then(responses => {
        setPosition(responses.reduce((acc, res) => {
          return { ...acc, [res.key]: res.data };
        }, {}));
      })
      .catch(err => {
        createToast({
          msg: '마커 데이터를 불러오는데 실패했습니다.',
          type: 'error'
        });
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // 이상해...
    if(!position) return;
    const trueKeys = Object.keys(filterValue).filter(key => filterValue[key]);
    console.log('trueKeys는 이거야!!',trueKeys);
    if(markers) {
      Object.values(markers).flat().forEach(marker => marker.setMap(null));
      console.log('이전 마커들을 flat 한거', Object.values(markers).flat());
      setMarkers({});
    }
    trueKeys.forEach(key => {
      const { markers: markersArray } = addMarkers(map, key, position[key]);
      setMarkers((prev) => ({ ...prev, [key]: markersArray }));
    });

  }, [map, filterValue]);
}

export default useFilteringMarker;
