import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import usePlaceSearch from '../../hooks/usePlaceSearch';
import useCurrentPosition from '../../hooks/useCurruntPosition';
import { updateAddressFromCurrentCoordinates } from '../../utils/mapUtils';
import { Coord, SearchState, Place, Tmapv2 } from '../../types/mapTypes';
import {
  SearchWrapper,
  SearchInput,
  SearchResultContainer,
  SearchResultList,
  Button,
} from './style';
import { endNameState, endPositionState } from '../../recoil/atoms';
import ep from '../../assets/images/ep.png';

interface SearchBoxProps {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  placeholder: string;
  places: Place[];
  setPosition: React.Dispatch<React.SetStateAction<Coord>>;
  // eslint-disable-next-line react/require-default-props
  setName?: React.Dispatch<React.SetStateAction<string>>;
}

interface ContainerProps {
  // eslint-disable-next-line react/require-default-props
  setStartPosition?: React.Dispatch<React.SetStateAction<Coord>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  map?: any;
}

function SearchBox({
  searchState,
  setSearchState,
  placeholder,
  places,
  setPosition,
  setName,
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
    <SearchInput>
      <input
        type="text"
        value={isSearching ? keyword : selectedName}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isSearching && (
        <SearchResultContainer>
          {places.map((place, index) => (
            <SearchResultList
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => {
                setSearchState({
                  ...searchState,
                  isSearching: false,
                  selectedName: place.name,
                });
                setPosition({
                  longitude: place.longitude,
                  latitude: place.latitude,
                });
                if (setName) {
                  setName(place.name);
                }
              }}
            >
              {place.name}
            </SearchResultList>
          ))}
        </SearchResultContainer>
      )}
    </SearchInput>
  );
}

function SearchContainer({ setStartPosition, map }: ContainerProps) {
  const navigate = useNavigate();
  const [endPosition, setEndPosition] = useRecoilState(endPositionState);
  const [endName, setEndName] = useRecoilState(endNameState);
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
    selectedName: endName || '',
  });
  const endPlaces = usePlaceSearch(endSearchState.keyword);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previousMarker, setPreviousMarker] = useState<any>(null);
  const findRoute = () => {
    navigate('/routes');
  };

  // 혹시 나중에 출발지나 도착지를 현재 위치로 변경하는 기능을 추가할 때 유용할 것 같습니다.
  useEffect(() => {
    if (!setStartPosition) return;
    updateAddressFromCurrentCoordinates(
      currentPosition,
      setStartSearchState,
      startSearchState,
      setStartPosition,
    );
  }, [currentPosition]);

  useEffect(() => {
    if (!setStartPosition && map && endSearchState.selectedName) {
      if (previousMarker) {
        previousMarker.setMap(null);
      }

      map.setCenter(
        new Tmapv2.LatLng(endPosition.latitude, endPosition.longitude),
      );
      map.setZoom(17);

      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(
          endPosition.latitude,
          endPosition.longitude,
        ),
        icon: ep,
        iconSize: new Tmapv2.Size(26, 34),
        map,
      });

      setPreviousMarker(marker);
    }
  }, [endSearchState.selectedName]);

  return (
    <SearchWrapper>
      {setStartPosition && (
        <SearchBox
          searchState={startSearchState}
          setSearchState={setStartSearchState}
          placeholder="출발지를 입력하세요"
          places={startPlaces}
          setPosition={setStartPosition}
        />
      )}
      <SearchBox
        searchState={endSearchState}
        setSearchState={setEndSearchState}
        placeholder="도착지를 입력하세요"
        places={endPlaces}
        setPosition={setEndPosition}
        setName={setEndName}
      />
      {!setStartPosition && (
        <Button type="button" onClick={findRoute}>
          길찾기
        </Button>
      )}
    </SearchWrapper>
  );
}

export default SearchContainer;
