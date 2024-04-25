/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { searchPOI } from '../utils/mapUtils';
import { Place } from '../types/mapTypes';

const usePlaceSearch = (keyword: string): Place[] => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword) {
      searchPOI(debouncedKeyword, setPlaces);
    }

    return () => {};
  }, [debouncedKeyword]);

  return places;
};

export default usePlaceSearch;
