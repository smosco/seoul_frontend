import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tmapv2: any;
  }
}

export const { Tmapv2 } = window;

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
