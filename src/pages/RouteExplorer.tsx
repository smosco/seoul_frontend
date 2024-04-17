/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import { Coord } from '../types/mapTypes';
import RouteCarousel from '../components/RouteCarousel';
import Wrapper from '../components/common/Wrapper';

function RouteExplorer() {
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

  const [waypoints] = useState([
    { latitude: 37.48211807, longitude: 126.94151563 },
    { latitude: 37.48334492, longitude: 126.94311689 },
    { latitude: 37.48161125, longitude: 126.94127377 },
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

  return (
    <Wrapper>
      <SearchContainer
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
        endName={state?.endName}
      />

      <div id="map_div" ref={mapRef} />

      {routeInfo && (
        <RouteCarousel routeInfo={routeInfo} waypoints={waypoints} />
      )}
    </Wrapper>
  );
}

export default RouteExplorer;
