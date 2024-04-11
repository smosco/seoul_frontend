import React, { useState, useEffect, useRef } from 'react';
import usePlaceSearch from '../hooks/usePlaceSearch';
import useMap from '../hooks/useMap';
import POSITIONS from '../constant/mockingPositions';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker } from '../utils/mapUtils';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface AddressResult {
  address: { address_name: string };
  code: string;
}

const { kakao } = window;

function Home() {
  const { currentPosition } = useCurrentPosition();
  const coordinate = currentPosition ? {
    lat: currentPosition.coords.latitude,
    lng: currentPosition.coords.longitude
  } : null;
  const mapRef = useRef(null);
  const { map } = useMap(mapRef, coordinate);
  const [startAddress, setStartAddress] = useState<string>('');
  const [endAddress, setEndAddress] = useState<string>('');
  const startPlaces = usePlaceSearch(startAddress);
  const endPlaces = usePlaceSearch(endAddress);
  const [startIsSearching, setStartIsSearching] = useState<boolean>(false);
  const [endIsSearching, setEndIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (!currentPosition) return;

    // 현재 위치 마커 생성 및 추가
    const currentPositionMarker = generateMarker(
      currentPosition.coords.latitude,
      currentPosition.coords.longitude
    );
    currentPositionMarker.setMap(map);

    // 위험 시설 마커 생성 및 추가
    for (let i = 0; i < POSITIONS.length; i++) {
      const marker = generateMarker(
        POSITIONS[i].lat,
        POSITIONS[i].lng,
        POSITIONS[i].title
      );
      marker.setMap(map);
    }
  }, [currentPosition, map]);

  // currentPosition를 Geocoder를 사용해서 startAddress에 저장한다.
  useEffect(() => {
    if (!currentPosition) return;

    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(
      currentPosition?.coords.latitude,
      currentPosition?.coords.longitude,
    );
    const callback = (result: AddressResult[], status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        setStartAddress(result[0].address.address_name);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, [currentPosition]);

  return (
    <>
      <input
        type="text"
        value={startAddress}
        onChange={(e) => {
          setStartIsSearching(true);
          setStartAddress(e.target.value);
        }}
        placeholder="출발지를 입력하세요"
      />
      <input
        type="text"
        value={endAddress}
        onChange={(e) => {
          setEndIsSearching(true);
          setEndAddress(e.target.value);
        }}
        placeholder="도착지를 입력하세요"
      />
      <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef} />
      <ul>
        {startIsSearching &&
          startPlaces.map((place, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  setStartAddress(place.address);
                  setStartIsSearching(false);
                }}
              >
                <div>{place.name}</div>
                <div>{place.address}</div>
              </button>
            </li>
          ))}
      </ul>
      <ul>
        {endIsSearching &&
          endPlaces.map((place, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  setEndAddress(place.address);
                  setEndIsSearching(false);
                }}
              >
                <div>{place.name}</div>
                <div>{place.address}</div>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Home;
