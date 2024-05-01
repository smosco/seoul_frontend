import { useState, useEffect } from 'react';

export default function useRandomPosition() {
  const [randomPosition, setRandomPosition] = useState<{
    latr: number | undefined;
    lngr: number | undefined;
  }>({ latr: undefined, lngr: undefined });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLat = 37 + Math.random();
      const randomLng = 126 + Math.random();
      setRandomPosition({ latr: randomLat, lngr: randomLng });
    }, 10000); // 10초마다 새로운 랜덤한 위치 생성

    return () => clearInterval(interval);
  }, []);

  return randomPosition;
}
