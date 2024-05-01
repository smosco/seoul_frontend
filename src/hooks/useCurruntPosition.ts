import { useEffect, useState } from 'react';

function useCurrentPosition() {
  const [currentPosition, setCurrentPosition] = useState<
    GeolocationPosition | undefined
  >();

  useEffect(() => {
    // 위치 정보 요청
    const options = {
      enableHighAccuracy: true,
      timeout: 5000, // 5초
      maximumAge: 10 * 60 * 1000, // 10분
    };

    const successCallback = (position: GeolocationPosition) => {
      setCurrentPosition(position);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error('현위치를 가져오지 못했습니다:', error);
    };

    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options,
    );
    // 컴포넌트가 언마운트될 때 위치 추적 해제
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  return { currentPosition };
}

export default useCurrentPosition;
