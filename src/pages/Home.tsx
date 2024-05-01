/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
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
  const [currentMarker, setCurrentMarker] = useState<any>(null);

  useFilteringMarker({
    map,
    lat: currentPosition?.coords.latitude,
    lng: currentPosition?.coords.longitude,
  });

  useEffect(() => {
    if (!currentPosition) return;

    const marker = generateMarker(
      map,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );

    if (currentMarker) {
      currentMarker.setMap(null);
    }

    setCurrentMarker(marker);
  }, [map, currentPosition]);

  return (
    <Wrapper>
      <SearchContainer map={map} type="end" />
      <div id="map_div" ref={mapRef} />
      <BottomSheet />
    </Wrapper>
  );
}

export default Home;
