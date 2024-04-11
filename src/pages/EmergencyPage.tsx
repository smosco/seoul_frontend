import React, { useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import { generateCircle, generateInfoWindow, generateMarker } from '../utils/mapUtils';
import useCurrentPosition from '../hooks/useCurruntPosition';

function EmergencyPage() {
  const mapRef = useRef(null);
  const { currentPosition } = useCurrentPosition();
  const coordinate = currentPosition ? {
    lat: currentPosition.coords.latitude,
    lng: currentPosition.coords.longitude
  } : null;
  const { map } = useMap(mapRef, coordinate);

  useEffect(() => {
    if(!map || !currentPosition) return;

    const lat = currentPosition.coords.latitude;
    const lng = currentPosition.coords.longitude;

    const marker = generateMarker(lat, lng);
    marker.setMap(map);

    const infoWindow = generateInfoWindow(lat, lng);
    infoWindow.open(map, marker);

    const circle = generateCircle(lat, lng);
    circle.setMap(map);
  }, [map, currentPosition]);

  return (
    <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef}>
      {/* TODO : 이런식으로 맵 로딩 화면을 만들면 좋을 것 같습니다!! */}
      {/* {!currentPosition && !map && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <span role="img" aria-label="loading">⏳</span> 위치 정보를 가져오는 중입니다...
        </div>
      )} */}
    </div>
  );
};

export default EmergencyPage;
