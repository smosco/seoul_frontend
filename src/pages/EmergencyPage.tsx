import React, { useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import {
  generateMarker,
  drawCircle,
  generateInfoWindow,
} from '../utils/mapUtils';

import useCurrentPosition from '../hooks/useCurruntPosition';
import BottomSheet from '../components/BottomSheet';

function EmergencyPage() {
  const mapRef = useRef(null);
  const { currentPosition } = useCurrentPosition();
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );

  useEffect(() => {
    if (!map || !currentPosition) return;

    const lat = currentPosition.coords.latitude;
    const lng = currentPosition.coords.longitude;

    generateMarker(map, lat, lng);
    generateInfoWindow(map, lat, lng, '2024.4.14');
    drawCircle(map, lat, lng);
  }, [map, currentPosition]);

  return (
    <>
      <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef}>
        {/* TODO : 이런식으로 맵 로딩 화면을 만들면 좋을 것 같습니다!! */}
        {/* {!currentPosition && !map && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <span role="img" aria-label="loading">⏳</span> 위치 정보를 가져오는 중입니다...
          </div>
        )} */}
      </div>
      <BottomSheet />
    </>
  );
}

export default EmergencyPage;
