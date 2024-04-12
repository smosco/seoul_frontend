import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      kakao: any;
    }
  }

const { kakao } = window;

function useMap(containerRef: React.RefObject<HTMLDivElement>, lat: number | undefined, lng: number | undefined) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    if (containerRef.current) {
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const Map = new kakao.maps.Map(containerRef.current, options);
      setMap(Map);
    }
  }, [lat, lng]);
  return { map };
}

export default useMap;
