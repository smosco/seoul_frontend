import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      kakao: any;
    }
  }

const { kakao } = window;

interface Coordinate {
    lat: number | undefined
    lng: number | undefined
}

function useMap(containerRef: React.RefObject<HTMLDivElement>, coordinate:Coordinate | null) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!coordinate) return;
    if (containerRef.current) {
      const options = {
        center: new kakao.maps.LatLng(coordinate.lat, coordinate.lng),
        level: 3,
      };
      const Map = new kakao.maps.Map(containerRef.current, options);
      setMap(Map);
    }
  }, [coordinate?.lat, coordinate?.lng]);
  return { map };
}

export default useMap;
