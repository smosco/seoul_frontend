/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import POSITIONS from '../constant/mockingPositions';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, findway, kakao } from '../utils/mapUtils';
import SearchContainer from '../components/SearchInput';
import { AddressInfo } from '../types/mapTypes';

function Home() {
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const [start, setStart] = useState<AddressInfo>({
    address: '',
    coord: { x: undefined, y: undefined },
  });
  const [end, setEnd] = useState<AddressInfo>({
    address: '',
    coord: { x: undefined, y: undefined },
  });
  const [startMarker, setStartMarker] = useState<any>(null);
  const [endMarker, setEndMarker] = useState<any>(null);
  const [polyline, setPolyline] = useState<any>(null);

  const findAndDrawPath = async () => {
    const linePath = await findway(start, end);

    if (polyline) {
      polyline.setMap(null);
    }
    const newPolyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#FF7757',
      strokeOpacity: 0.7,
      strokeStyle: 'solid',
    });
    newPolyline.setMap(map);
    setPolyline(newPolyline);
  };

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

  // 출발, 도착 마커 생성
  useEffect(() => {
    if (start.coord.x !== undefined && start.coord.y !== undefined) {
      if (startMarker) {
        startMarker.setMap(null);
        polyline.setMap(null);
      }
      const newStartMarker = generateMarker(
        start.coord.y,
        start.coord.x,
        'way',
      );
      newStartMarker.setMap(map);
      setStartMarker(newStartMarker);
    }
    if (end.coord.x !== undefined && end.coord.y !== undefined) {
      if (endMarker) {
        endMarker.setMap(null);
        polyline.setMap(null);
      }
      const newEndMarker = generateMarker(end.coord.y, end.coord.x, 'way');
      newEndMarker.setMap(map);
      setEndMarker(newEndMarker);
    }
  }, [start, end, map]);

  return (
    <>
      <SearchContainer setStart={setStart} setEnd={setEnd} />
      <button type="button" onClick={findAndDrawPath}>
        길찾기
      </button>
      <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef} />
    </>
  );
}

export default Home;
