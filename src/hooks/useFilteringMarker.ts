import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MockedPositionType } from '../constant/mockingPositions';
import { generateMarker } from '../utils/mapUtils';
import filterState from '../recoil/atoms';

interface FacilityMarkerType {
    title: string;
    visible: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marker: any;
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFilteringMarker(map:any, facilityData: MockedPositionType[]) {
  const [facilityMarker, setFacilityMarker] = useState<FacilityMarkerType[]>([]);
  const filterValue = useRecoilValue(filterState);

  useEffect(() => {
    const filteredMarkerData = facilityData.map(position => {
      const marker = generateMarker(map, position.lat, position.lng, position.title);
      return {
        title: position.title,
        visible: false,
        marker,
      };
    });
    setFacilityMarker(filteredMarkerData);
  }, [map, facilityData]);

  // 필터링값을 확인하고, facilityMarker 데이터를 업데이트함
  useEffect(() => {
    const newFacilityMarker = facilityMarker.map(marker => {
      return {
        ...marker,
        visible: filterValue[marker.title]
      };
    });
    setFacilityMarker(newFacilityMarker);
  }, [filterValue]);

  useEffect(() => {
    facilityMarker.forEach(marker => {
      if (marker.visible) marker.marker.setMap(map);
      else marker.marker.setMap(null);
    });
  }, [facilityMarker]);

}

export default useFilteringMarker;

