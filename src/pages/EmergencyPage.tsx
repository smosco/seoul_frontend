import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMap from '../hooks/useMap';
import {
  generateMarker,
  drawCircle,
  generateInfoWindow,
  setCenter,
} from '../utils/mapUtils';

import useCurrentPosition from '../hooks/useCurruntPosition';
import BottomSheet from '../components/BottomSheet';
import timeStamp from '../constant/mockingTimeStamp';
import { convertDateFormat } from '../components/ReportList';
import useFilteringMarker from '../hooks/useFilteringMarker';

function EmergencyPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dangerMarker, setDangerMarker] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [circle, setCircle] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [infoWindow, setInfoWindow] = useState<any>(null);

  const mapRef = useRef(null);
  const { currentPosition } = useCurrentPosition();
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const { emergencyId } = useParams();
  useFilteringMarker(map);

  useEffect(() => {
    if (!map) return;
    const { lat, lng } = timeStamp.filter(item => item.id === Number(emergencyId)).map(item => ({ lat: item.lat, lng: item.lng }))[0];
    const { timestamp } = timeStamp.filter(item => item.id === Number(emergencyId))[0];

    // 이전에 있던 마커와 원, 윈도우를 지워야함
    if (dangerMarker) dangerMarker.setMap(null);
    if (circle) circle.setVisible(false);
    if (infoWindow) infoWindow.setMap(null);

    setCenter(map, lat, lng);

    const newMarker = generateMarker(map, lat, lng);
    newMarker.setMap(map);
    setDangerMarker(newMarker);

    const newInfoWindow = generateInfoWindow(map, lat, lng, convertDateFormat(timestamp));
    newInfoWindow.setMap(map);
    setInfoWindow(newInfoWindow);

    const newCircle = drawCircle(map, lat, lng);
    newCircle.setMap(map);
    setCircle(newCircle);
  }, [map, emergencyId]);

  return (
    <>
      <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef} />
      <BottomSheet />
    </>
  );
}

export default EmergencyPage;
