import React, { useEffect, useState } from 'react';
import { Tmapv2 } from '../types/mapTypes';

function useMap(
  containerRef: React.RefObject<HTMLDivElement>,
  lat: number | undefined,
  lng: number | undefined,
) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    if (containerRef.current) {
      const options = {
        center: new Tmapv2.LatLng(lat, lng),
        zoom: 15,
      };
      const newMap = new Tmapv2.Map(containerRef.current, options);
      setMap(newMap);
    }
  }, [lat, lng]);
  return { map };
}

export default useMap;
