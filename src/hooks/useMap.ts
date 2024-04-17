import React, { useEffect, useState } from 'react';
import { Tmapv2 } from '../types/mapTypes';

function useMap(
  containerRef: React.RefObject<HTMLDivElement>,
  lat: number | undefined,
  lng: number | undefined,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (map) return;
    if (!lat || !lng || !containerRef.current) return;
    if (containerRef.current) {
      const options = {
        center: new Tmapv2.LatLng(lat, lng),
        zoom: 14,
      };
      const newMap = new Tmapv2.Map(containerRef.current, options);
      setMap(newMap);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, [lat, lng, containerRef]);
  return { map };
}

export default useMap;
