/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { searchPOI } from '../utils/mapUtils';
import { Place } from '../types/mapTypes';

const usePlaceSearch = (keyword: string): Place[] => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (keyword) {
      searchPOI(keyword, setPlaces);
    }

    return () => {};
  }, [keyword]);

  return places;
};

export default usePlaceSearch;
