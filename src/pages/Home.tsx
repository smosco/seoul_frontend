import React, { useState, useEffect, useRef } from 'react';
import cctv from '../assets/images/cctv.png';
import emergencyBell from '../assets/images/emergencybell.png';
import safetFacility from '../assets/images/safetyfacility.png';
import safetCenter from '../assets/images/safetycenter.png';
import fireStation from '../assets/images/firestation.png';
import heatShelter from '../assets/images/heatshelter.png';
import location from '../assets/images/location.png';
import usePlaceSearch from '../hooks/usePlaceSearch';
import useMap from '../hooks/useMap';
import POSITIONS from '../constant/mockingPositions';

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

const getImageSrc = (title: string) => {
  switch (title) {
    case 'cctv':
      return cctv;
    case 'fireStation':
      return fireStation;
    case 'safetyFacility':
      return safetFacility;
    case 'saftyCenter':
      return safetCenter;
    case 'emergencyBell':
      return emergencyBell;
    case 'heatShelter':
      return heatShelter;
    default:
      return location;
  }
};

function Home() {
  const mapRef = useRef(null);
  const { map, currentPosition } = useMap(mapRef);
  const [startAddress, setStartAddress] = useState<string>('');
  const [endAddress, setEndAddress] = useState<string>('');
  const startPlaces = usePlaceSearch(startAddress);
  const endPlaces = usePlaceSearch(endAddress);
  const [startIsSearching, setStartIsSearching] = useState<boolean>(false);
  const [endIsSearching, setEndIsSearching] = useState<boolean>(false);

  useEffect(() => {
    if (!currentPosition) return;

    // 현재 위치 마커 생성 및 추가
    const currentPositionMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude,
      ),
      image: new kakao.maps.MarkerImage(location, new kakao.maps.Size(16, 22)),
    });
    currentPositionMarker.setMap(map);

    for (let i = 0; i < POSITIONS.length; i++) {
      const imageSrc = getImageSrc(POSITIONS[i].title);
      const imageSize = new kakao.maps.Size(16, 16);

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map,
        position: POSITIONS[i].latlng,
        title: POSITIONS[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
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
