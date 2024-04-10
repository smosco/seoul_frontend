/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const usePlaceSearch = (keyword: string): Place[] => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !keyword) {
      setPlaces([]);
      return;
    }

    const placesSearch = new kakao.maps.services.Places();

    placesSearch.keywordSearch(keyword, (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const newPlaces = data.map((place: any) => ({
          name: place.place_name,
          address: place.address_name,
          latitude: place.y,
          longitude: place.x,
        }));
        setPlaces(newPlaces);
      } else {
        setPlaces([]);
      }
    });
  }, [keyword]);

  return places;
};

export default usePlaceSearch;
