import React, { useState, useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import POSITIONS from '../constant/mockingPositions';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker } from '../utils/mapUtils';
import SearchContainer from '../components/SearchInput';
import { AddressInfo } from '../types/mapTypes';

function Home() {
  const { currentPosition } = useCurrentPosition();
  // 이게 필요한지 의문
  const currentCoord = currentPosition
    ? {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
      }
    : null;
  const mapRef = useRef(null);
  const { map } = useMap(mapRef, currentCoord);
  // TODO: 알고리즘 검색을 위해 도로명 주소가 필요함
  // TODO: 카카오 모빌리티 경로 검색을 위해 좌표가 필요함

  const [start, setStart] = useState<AddressInfo>({
    address: '',
    coord: { lat: undefined, lng: undefined },
  });
  const [end, setEnd] = useState<AddressInfo>({
    address: '',
    coord: { lat: undefined, lng: undefined },
  });

  console.log(start, end);

  useEffect(() => {
    if (!currentPosition) return;

    // 현재 위치 마커 생성 및 추가
    const currentPositionMarker = generateMarker(
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );
    currentPositionMarker.setMap(map);

    // 위험 시설 마커 생성 및 추가
    for (let i = 0; i < POSITIONS.length; i++) {
      const marker = generateMarker(
        POSITIONS[i].lat,
        POSITIONS[i].lng,
        POSITIONS[i].title,
      );
      marker.setMap(map);
    }
  }, [map]);

  return (
    <>
      <SearchContainer setStart={setStart} setEnd={setEnd} />
      <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef} />
    </>
  );
}

export default Home;
