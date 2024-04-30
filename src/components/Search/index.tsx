import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
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
  MyPositionButton,
} from './style';
import {
  endNameState,
  startNameState,
  endPositionState,
  startPositionState,
} from '../../recoil/atoms';
import ep from '../../assets/images/ep.png';
import near_me from '../../assets/images/near_me.png';

interface SearchBoxProps {
  currentPosition: GeolocationPosition | undefined;
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  placeholder: string;
  places: Place[];
  setPosition: React.Dispatch<React.SetStateAction<Coord>>;
  // eslint-disable-next-line react/require-default-props
  setName: React.Dispatch<React.SetStateAction<string>>;
}

interface ContainerProps {
  // eslint-disable-next-line react/require-default-props
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  map?: any;
}

function SearchBox({
  currentPosition,
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

  const selectCurrent = () => {
    updateAddressFromCurrentCoordinates(
      currentPosition,
      setSearchState,
      searchState,
      setPosition,
      setName,
    );
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
          <MyPositionButton onClick={selectCurrent}>
            <img src={near_me} alt="near_me" />
            내위치
          </MyPositionButton>
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

                setName(place.name);
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

function SearchContainer({ type, map }: ContainerProps) {
  const navigate = useNavigate();
  const setStartPosition = useSetRecoilState(startPositionState);
  const [endPosition, setEndPosition] = useRecoilState(endPositionState);
  const [endName, setEndName] = useRecoilState(endNameState);
  const [startName, setStartName] = useRecoilState(startNameState);
  const { currentPosition } = useCurrentPosition();
  const [startSearchState, setStartSearchState] = useState<SearchState>({
    keyword: '',
    isSearching: false,
    selectedName: startName || '',
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

  // console.log(startSearchState, endSearchState, startName, endName);

  // 혹시 나중에 출발지나 도착지를 현재 위치로 변경하는 기능을 추가할 때 유용할 것 같습니다.
  useEffect(() => {
    if (startName) return;

    const fetchAddress = async () => {
      await updateAddressFromCurrentCoordinates(
        currentPosition,
        setStartSearchState,
        startSearchState,
        setStartPosition,
        setStartName,
      );
    };
    fetchAddress();
  }, [currentPosition]);

  useEffect(() => {
    if (type === 'end' && map && endSearchState.selectedName) {
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
      {type === 'start' && (
        <SearchBox
          currentPosition={currentPosition}
          searchState={startSearchState}
          setSearchState={setStartSearchState}
          placeholder="출발지를 입력하세요"
          places={startPlaces}
          setPosition={setStartPosition}
          setName={setStartName}
        />
      )}
      <SearchBox
        currentPosition={currentPosition}
        searchState={endSearchState}
        setSearchState={setEndSearchState}
        placeholder="도착지를 입력하세요"
        places={endPlaces}
        setPosition={setEndPosition}
        setName={setEndName}
      />
      {type === 'end' && (
        <Button type="button" onClick={findRoute}>
          길찾기
        </Button>
      )}
    </SearchWrapper>
  );
}

export default SearchContainer;
