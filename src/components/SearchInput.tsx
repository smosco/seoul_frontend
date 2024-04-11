import React, { useEffect, useState } from 'react';
import usePlaceSearch from '../hooks/usePlaceSearch';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { updateAddressFromCurrentCoordinates } from '../utils/mapUtils';

interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface SearchState {
  address: string;
  isSearching: boolean;
}

interface SearchBoxProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  placeholder: string;
  places: Place[];
}

function SearchBox({ searchState, setSearchState, placeholder, places }: SearchBoxProps) {
  const { address, isSearching } = searchState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({ ...searchState, isSearching: true, address: e.target.value });
  };

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isSearching && (
        <ul>
          {places.map((place, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  setSearchState({ address: place.address, isSearching: false });
                }}
              >
                <div>{place.address}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function SearchContainer() {
  const { currentPosition } = useCurrentPosition();
  const [startSearchState, setStartSearchState] = useState<SearchState>({
    address: '',
    isSearching: false,
  });
  const startPlaces = usePlaceSearch(startSearchState.address);
  const [endSearchState, setEndSearchState] = useState<SearchState>({
    address: '',
    isSearching: false,
  });
  const endPlaces = usePlaceSearch(endSearchState.address);

  // 혹시 나중에 출발지나 도착지를 현재 위치로 변경하는 기능을 추가할 때 유용할 것 같습니다.
  useEffect(() => {
    updateAddressFromCurrentCoordinates(currentPosition, setStartSearchState, startSearchState);
  }, [currentPosition]);

  return (
    <>
      <SearchBox
        searchState={startSearchState}
        setSearchState={setStartSearchState}
        placeholder="출발지를 입력하세요"
        places={startPlaces}
      />
      <SearchBox
        searchState={endSearchState}
        setSearchState={setEndSearchState}
        placeholder="도착지를 입력하세요"
        places={endPlaces}
      />
    </>
  );
}

export default SearchContainer;
