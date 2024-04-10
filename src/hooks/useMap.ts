import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      kakao: any;
    }
  }

const { kakao } = window;


function useMap(containerRef: React.RefObject<HTMLDivElement>) {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] =
  useState<GeolocationPosition | null>(null);

  useEffect(() => {
    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setCurrentPosition(position);
      },
      (error: GeolocationPositionError) => {
        console.error('Error getting current position:', error);
      },
    );
  }, []);

  useEffect(() => {
    if (!currentPosition) return;
    if (containerRef.current) {
      const options = {
        center: new kakao.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude,),
        level: 3,
      };
      const Map = new kakao.maps.Map(containerRef.current, options);
      setMap(Map);
    }
  }, [containerRef, currentPosition]);
  return { map, currentPosition };
}

export default useMap;
