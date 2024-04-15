/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
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
  const [polylines, setPolylines] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [waypoints] = useState([
    { latitude: 37.48213002, longitude: 126.94363778 },
    { latitude: 37.48223002, longitude: 126.94353778 },
    { latitude: 37.48209002, longitude: 126.93963778 },
  ]);

  console.log(startPosition, endPosition);
  console.log(polylines);
  useEffect(() => {
    if (!currentPosition) return;
    // 현재 위치 마커 생성 및 추가
    generateMarker(
      map,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );
  }, [map]);

  useEffect(() => {
    if (!map) return;

    drawRoute(map, startPosition, endPosition, waypoints, polylines, markers)
      .then(
        ({
          newPolylines,
          newMarkers,
        }: {
          newPolylines: any[];
          newMarkers: any[];
        }) => {
          setPolylines(newPolylines);
          setMarkers(newMarkers);
        },
      )
      .catch((error) => console.error('Error drawing route:', error));
  }, [map, startPosition, endPosition, waypoints]);

  return (
    <>
      <SearchContainer
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
      />
      {/* <button
        type="button"
        onClick={() => drawRoute(map, startPosition, endPosition, waypoints)}
      >
        길찾기
      </button> */}
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
