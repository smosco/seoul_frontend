/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker } from '../utils/mapUtils';
import SearchContainer from '../components/SearchInput';
import BottomSheet from '../components/BottomSheet';
import { Coord } from '../types/mapTypes';

function Home() {
  const navigate = useNavigate();
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );

  const [endPosition, setEndPosition] = useState<Coord>({
    latitude: undefined,
    longitude: undefined,
  });
  const [endName, setEndName] = useState<string>('');
  console.log(endName);

  const findRoute = () => {
    navigate('/routes', {
      state: { endPosition, endName },
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
    <>
      <SearchContainer
        setEndPosition={setEndPosition}
        endName={endName}
        setEndName={setEndName}
      />
      <button type="button" onClick={findRoute}>
        길찾기
      </button>
      <div
        id="map_div"
        style={{ width: '500px', height: '500px' }}
        ref={mapRef}
      />
      <BottomSheet map={map} />
    </>
  );
}

export default Home;
