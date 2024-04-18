/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import BottomSheet from '../components/BottomSheet';
import { Coord } from '../types/mapTypes';
import useFilteringMarker from '../hooks/useFilteringMarker';
import { WrapperContainer } from '../components/common/Wrapper/style';
import { endNameState } from '../recoil/atoms';

function Home() {
  const navigate = useNavigate();
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
  const [endPosition, setEndPosition] = useState<Coord>({
    latitude: undefined,
    longitude: undefined,
  });
  const [endName, setEndName] = useRecoilState<string>(endNameState);

  const findRoute = () => {
    navigate('/routes', {
      state: { endPosition },
    });
  };

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
    <WrapperContainer>
      <SearchContainer
        setEndPosition={setEndPosition}
        endName={endName}
        setEndName={setEndName}
      />
      <button type="button" onClick={findRoute}>
        길찾기
      </button>
      <div id="map_div" ref={mapRef} />
      <BottomSheet />
    </WrapperContainer>
  );
}

export default Home;
