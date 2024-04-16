import { useEffect, useState } from 'react';
import timeStamp from '../constant/mockingTimeStamp';
import {
  generateMarker,
  drawCircle,
  generateInfoWindow,
  setCenter,
} from '../utils/mapUtils';
import { convertDateFormat } from '../components/ReportList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useEmergencyMarker(map: any, emergencyId: string | undefined) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dangerMarker, setDangerMarker] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [circle, setCircle] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [infoWindow, setInfoWindow] = useState<any>(null);

  useEffect(() => {
    if (!map || !emergencyId) return;
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
}

export default useEmergencyMarker;
