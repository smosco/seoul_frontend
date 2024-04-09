import React, { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const { kakao } = window;

const MOCKED_LAT = 33.450701;
const MOCKED_LNG = 126.570667;

function EmergencyPage() {
  useEffect(() => {
    const container = document.getElementById('map');
    const option = {
      center: new kakao.maps.LatLng(MOCKED_LAT, MOCKED_LNG), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const map = new kakao.maps.Map(container, option);

    // 마커 표시하는 로직
    const markerPosition = new kakao.maps.LatLng(MOCKED_LAT, MOCKED_LNG);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    // 인포 윈도우 생성 로직
    const iwContent = '<div style="padding:5px;">Hello World!</div>';
    const iwPosition = new kakao.maps.LatLng(MOCKED_LAT, MOCKED_LNG);
    const infoWindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infoWindow.open(map, marker);

    // 원 생성하는 로직
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(MOCKED_LAT, MOCKED_LNG),
      // 미터 단위의 원의 반지름 (250m = 지름이 500m인 원)
      radius: 250,
      strokeWeight: 1,
      strokeColor: '#007470',
      strokeStyle: 'solid',
      fillColor: '#007470',
      fillOpacity: 0.15,
    });

    circle.setMap(map);
  }, []);

  return (
    <div id="map" style={{ width: '500px', height: '500px' }} />
  );
};

export default EmergencyPage;
