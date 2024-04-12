import React, { useEffect, useState } from 'react';
import usePlaceSearch from '../hooks/usePlaceSearch';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { updateAddressFromCurrentCoordinates } from '../utils/mapUtils';
import { AddressInfo, SearchState } from '../types/mapTypes';

interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface SearchBoxProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  placeholder: string;
  places: Place[];
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressInfo>>;
}

interface ContainerProps {
  setStart: React.Dispatch<React.SetStateAction<AddressInfo>>;
  setEnd: React.Dispatch<React.SetStateAction<AddressInfo>>;
}

function SearchBox({
  searchState,
  setSearchState,
  placeholder,
  places,
  setAddressInfo,
}: SearchBoxProps) {
  const { keyword, isSearching, selectedName } = searchState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({
      ...searchState,
      isSearching: true,
      keyword: e.target.value,
    });
  };

  return (
    <>
      <input
        type="text"
        value={isSearching ? keyword : selectedName}
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
                  setSearchState({
                    ...searchState,
                    isSearching: false,
                    selectedName: place.name,
                  });
                  setAddressInfo({
                    address: place.address,
                    coord: {
                      lat: place.latitude,
                      lng: place.longitude,
                    },
                  });
                }}
              >
                <div>{place.name}</div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function SearchContainer({ setStart, setEnd }: ContainerProps) {
  const { currentPosition } = useCurrentPosition();
  const [startSearchState, setStartSearchState] = useState<SearchState>({
    keyword: '',
    isSearching: false,
    selectedName: '',
  });
  const startPlaces = usePlaceSearch(startSearchState.keyword);
  const [endSearchState, setEndSearchState] = useState<SearchState>({
    keyword: '',
    isSearching: false,
    selectedName: '',
  });
  const endPlaces = usePlaceSearch(endSearchState.keyword);

  // 혹시 나중에 출발지나 도착지를 현재 위치로 변경하는 기능을 추가할 때 유용할 것 같습니다.
  useEffect(() => {
    updateAddressFromCurrentCoordinates(
      currentPosition,
      setStartSearchState,
      startSearchState,
      setStart,
    );
  }, [currentPosition]);

  return (
    <>
      <SearchBox
        searchState={startSearchState}
        setSearchState={setStartSearchState}
        placeholder="출발지를 입력하세요"
        places={startPlaces}
        setAddressInfo={setStart}
      />
      <SearchBox
        searchState={endSearchState}
        setSearchState={setEndSearchState}
        placeholder="도착지를 입력하세요"
        places={endPlaces}
        setAddressInfo={setEnd}
      />
    </>
  );
}

export default SearchContainer;
