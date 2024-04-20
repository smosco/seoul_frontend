/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import BottomSheet from '../components/BottomSheet';
import useFilteringMarker from '../hooks/useFilteringMarker';
import Wrapper from '../components/common/Wrapper';

function Home() {
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );

  useFilteringMarker({
    map,
    lat: 37.606,
    lng: 126.9576788,
  });

  useEffect(() => {
    if (!currentPosition) return;
    // 현재 위치 마커 생성 및 추가
    generateMarker(
      map,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );
  }, [map]);

  return (
    <Wrapper>
      <SearchContainer />
      <div id="map_div" ref={mapRef} />
      <BottomSheet />
    </Wrapper>
  );
}

export default Home;
