/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import { Coord } from '../types/mapTypes';
import RouteCarousel from '../components/RouteCarousel';
import Wrapper from '../components/common/Wrapper';
import { endNameState } from '../recoil/atoms';

function RouteExplorer() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const [startPosition, setStartPosition] = useState<Coord>({
    latitude: undefined,
    longitude: undefined,
  });
  const [endPosition, setEndPosition] = useState<Coord>({
    latitude: undefined,
    longitude: undefined,
  });
  const [polylines, setPolylines] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [routeInfo, setRouteInfo] = useState<{
    time: string;
    distance: string;
  }>();
  const [endName, setEndName] = useRecoilState(endNameState);

  const [waypoints] = useState([
    {
      id: 16684.0,
      longitude: 127.013,
      latitude: 37.4932,
      rank_score: 56.84,
      emergency_bell_and_distance_score: 11.89,
      safety_center_and_distacne_score: 19.85,
      grid_shelter_distance_score: 77.78,
      grid_facilities_distance_score: 55.56,
      number_of_cctv_score: 5.48,
    },
    {
      id: 17009.0,
      longitude: 127.018,
      latitude: 37.4554,
      rank_score: 98.97,
      emergency_bell_and_distance_score: 49.88,
      safety_center_and_distacne_score: 52.04,
      grid_shelter_distance_score: 100.0,
      grid_facilities_distance_score: 100.0,
      number_of_cctv_score: 24.94,
    },
    {
      id: 17161.0,
      longitude: 127.02,
      latitude: 37.4554,
      rank_score: 98.76,
      emergency_bell_and_distance_score: 49.76,
      safety_center_and_distacne_score: 50.22,
      grid_shelter_distance_score: 100.0,
      grid_facilities_distance_score: 100.0,
      number_of_cctv_score: 100.0,
    },
  ]);

  useEffect(() => {
    if (state && state.endPosition) {
      setEndPosition(state.endPosition);
    }
  }, [state]);

  useEffect(() => {
    if (!currentPosition) return;

    // 현재 위치 마커 생성 및 추가
    generateMarker(
      map,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );
  }, [map]);

  useEffect(() => {
    if (!map) return;

    drawRoute(map, startPosition, endPosition, waypoints, polylines, markers)
      .then(({ newPolylines, newMarkers, tTime, tDistance }) => {
        setPolylines(newPolylines);
        setMarkers(newMarkers);

        // 시간과 거리를 저장
        const newRouteInfos = {
          time: tTime,
          distance: tDistance,
        };
        setRouteInfo(newRouteInfos);
      })
      .catch((error) => console.error('Error drawing route:', error));
  }, [map, startPosition, endPosition, waypoints]);

  const onClick = () => {
    navigate('/route-detail', {
      state: { endPosition },
    });
  };

  return (
    <Wrapper>
      <SearchContainer
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
        endName={endName}
        setEndName={setEndName}
      />

      <div id="map_div" ref={mapRef} />

      {routeInfo && (
        <RouteCarousel
          routeInfo={routeInfo}
          waypoints={waypoints}
          onClick={onClick}
        />
      )}
    </Wrapper>
  );
}

export default RouteExplorer;
