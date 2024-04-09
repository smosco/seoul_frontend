import React, { useEffect } from 'react';
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
  const positions = [
    {
      title: 'cctv',
      latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    },
    {
      title: 'safetyFacility',
      latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    },
    {
      title: 'fireStation',
      latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    },
    {
      title: 'heatShelter',
      latlng: new kakao.maps.LatLng(33.450705, 126.572323),
    },
    {
      title: 'saftyCenter',
      latlng: new kakao.maps.LatLng(33.451502, 126.570766),
    },
    {
      title: 'emergencyBell',
      latlng: new kakao.maps.LatLng(33.449802, 126.570722),
    },
  ];

  useEffect(() => {
    const container = document.getElementById('map');
    const option = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const map = new kakao.maps.Map(container, option);

    for (let i = 0; i < positions.length; i++) {
      const imageSrc = getImageSrc(positions[i].title);
      const imageSize = new kakao.maps.Size(32, 32);

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const marker = new kakao.maps.Marker({
        map,
        position: positions[i].latlng,
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage,
      });
    }
  }, []);

  return <div id="map" style={{ width: '500px', height: '500px' }} />;
}

export default Home;
