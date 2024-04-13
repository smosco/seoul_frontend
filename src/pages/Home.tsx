/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import POSITIONS from '../constant/mockingPositions';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/SearchInput';
import BottomSheet from '../components/BottomSheet';
import { Coord } from '../types/mapTypes';

function Home() {
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const [startPosition, setStartPosition] = useState<Coord>({
    latitude: undefined,
    longitude: undefined,
  });
  const [endPosition, setEndPosition] = useState<Coord>({
    latitude: undefined,
    longitude: undefined,
  });
  const [, setPolylines] = useState<any[]>([]);
  const [waypoints] = useState([
    { latitude: 37.399569, longitude: 127.10379 },
    { latitude: 37.402748, longitude: 127.108913 },
    { latitude: 37.397153, longitude: 127.113403 },
  ]);

  // console.log(startPosition, endPosition);

  useEffect(() => {
    if (!currentPosition) return;

    // 현재 위치 마커 생성 및 추가
    const currentPositionMarker = generateMarker(
      map,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );
    currentPositionMarker.setMap(map);

    // 위험 시설 마커 생성 및 추가
    for (let i = 0; i < POSITIONS.length; i++) {
      const marker = generateMarker(
        map,
        POSITIONS[i].lat,
        POSITIONS[i].lng,
        POSITIONS[i].title,
      );
      marker.setMap(map);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      drawRoute(map, startPosition, endPosition, waypoints)
        .then((newPolylines) => setPolylines(newPolylines))
        .catch((error) => console.error('Error drawing route:', error));
    }
  }, [startPosition, endPosition, waypoints]);

  return (
    <>
      <SearchContainer
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
      />
      <button
        type="button"
        onClick={() => drawRoute(map, startPosition, endPosition, waypoints)}
      >
        길찾기
      </button>
      <div
        id="map_div"
        style={{ width: '500px', height: '500px' }}
        ref={mapRef}
      />
      <BottomSheet />
    </>
  );
}

export default Home;
