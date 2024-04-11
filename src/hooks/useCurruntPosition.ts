import { useEffect, useState } from 'react';

function useCurrentPosition() {
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
  return { currentPosition };
}

export default useCurrentPosition;
