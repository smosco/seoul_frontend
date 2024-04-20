import { useEffect, useState } from 'react';
import {
  generateMarker,
  drawCircle,
  generateInfoWindow,
  setCenter,
} from '../utils/mapUtils';
import { ReportData } from '../types/reportTypes';
import { convertDateFormat } from '../utils/commonUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useEmergencyMarker(map: any, data: ReportData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dangerMarker, setDangerMarker] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [circle, setCircle] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [infoWindow, setInfoWindow] = useState<any>(null);

  useEffect(() => {
    if (!map || !data) return;

    // 이전에 있던 마커와 원, 윈도우를 지워야함
    if (dangerMarker) dangerMarker.setMap(null);
    if (circle) circle.setVisible(false);
    if (infoWindow) infoWindow.setMap(null);

    setCenter(map, data.latitude, data.longitude);

    const newMarker = generateMarker(map, data.latitude, data.longitude);
    newMarker.setMap(map);
    setDangerMarker(newMarker);

    const newInfoWindow = generateInfoWindow(map, data.latitude, data.longitude, convertDateFormat(data.time));
    newInfoWindow.setMap(map);
    setInfoWindow(newInfoWindow);

    const newCircle = drawCircle(map, data.latitude, data.longitude);
    newCircle.setMap(map);
    setCircle(newCircle);
  }, [map, data]);
}

export default useEmergencyMarker;
