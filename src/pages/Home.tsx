import React, { useState, useEffect } from 'react';
import cctv from '../assets/images/cctv.png';
import emergencyBell from '../assets/images/emergencybell.png';
import safetFacility from '../assets/images/safetyfacility.png';
import safetCenter from '../assets/images/safetycenter.png';
import fireStation from '../assets/images/firestation.png';
import heatShelter from '../assets/images/heatshelter.png';
import location from '../assets/images/location.png';

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
  const [currentPosition, setCurrentPosition] =
    useState<GeolocationPosition | null>(null);
  const [startAddress, setStartAddress] = useState<string>('');

  useEffect(() => {
    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setCurrentPosition(position);
      },
      (error: GeolocationPositionError) => {
        console.error('Error getting current position:', error);
      },
    );
  }, []);

  useEffect(() => {
    if (!currentPosition) return;

    const container = document.getElementById('map');
    const option = {
      center: new kakao.maps.LatLng(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude,
      ),
      level: 3,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const map = new kakao.maps.Map(container, option);

    const positions = [
      {
        title: 'cctv',
        latlng: new kakao.maps.LatLng(37.486592, 126.9409552),
      },
      {
        title: 'safetyFacility',
        latlng: new kakao.maps.LatLng(37.486592, 126.938552),
      },
      {
        title: 'fireStation',
        latlng: new kakao.maps.LatLng(37.485592, 126.9409552),
      },
      {
        title: 'heatShelter',
        latlng: new kakao.maps.LatLng(37.487592, 126.9399552),
      },
      {
        title: 'saftyCenter',
        latlng: new kakao.maps.LatLng(37.486592, 126.9389552),
      },
      {
        title: 'emergencyBell',
        latlng: new kakao.maps.LatLng(37.486592, 126.9389552),
      },
    ];

    // 현재 위치 마커 생성 및 추가
    const currentPositionMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude,
      ),
      image: new kakao.maps.MarkerImage(location, new kakao.maps.Size(16, 22)),
    });
    currentPositionMarker.setMap(map);

    for (let i = 0; i < positions.length; i++) {
      const imageSrc = getImageSrc(positions[i].title);
      const imageSize = new kakao.maps.Size(16, 16);

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map,
        position: positions[i].latlng,
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
      marker.setMap(map);
    }
  }, [currentPosition]);

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
        onChange={(e) => setStartAddress(e.target.value)}
        placeholder="출발지를 입력하세요"
      />
      <div id="map" style={{ width: '500px', height: '500px' }} />
    </>
  );
}

export default Home;
