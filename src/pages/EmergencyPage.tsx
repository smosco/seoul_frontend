import React, { useEffect, useRef } from 'react';
import useMap from '../hooks/useMap';
import { generateCircle, generateInfoWindow, generateMarker } from '../utils/mapUtils';

function EmergencyPage() {
  const mapRef = useRef(null);
  const { map, currentPosition } = useMap(mapRef);

  useEffect(() => {
    if(!map) return;
    if(!currentPosition) return;

    const lat = currentPosition.coords.latitude;
    const lng = currentPosition.coords.longitude;

    const marker = generateMarker(lat, lng);
    marker.setMap(map);

    const infoWindow = generateInfoWindow(lat, lng);
    infoWindow.open(map, marker);

    const circle = generateCircle(lat, lng);
    circle.setMap(map);

  }, [map]);

  return (
    <div id="map" style={{ width: '500px', height: '500px' }} ref={mapRef} />
  );
};

export default EmergencyPage;
