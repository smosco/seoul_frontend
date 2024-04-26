/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import getWaypoints from '../api/routeAPI';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import { startPositionState, endPositionState } from '../recoil/atoms';
import RouteCarousel from '../components/RouteCarousel';
import Wrapper from '../components/common/Wrapper';
import Skeleton from '../components/Skeleton';

function RouteExplorer() {
  const navigate = useNavigate();
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const [startPosition, setStartPosition] = useRecoilState(startPositionState);
  const endPosition = useRecoilValue(endPositionState);
  const [polylines, setPolylines] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [routeInfo, setRouteInfo] = useState<{
    time: string;
    distance: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: ['waypoints', startPosition, endPosition],
    queryFn: () => getWaypoints(startPosition, endPosition),
    staleTime: 60000,
  });

  const waypoints = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.slice(1, 4);
  }, [data]);

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
    if (!map || waypoints.length === 0) return;

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
    navigate('/route-detail');
  };

  return (
    <Wrapper>
      <SearchContainer setStartPosition={setStartPosition} />

      <div id="map_div" ref={mapRef} />
      {isLoading ? (
        <Skeleton type="info" />
      ) : (
        routeInfo && (
          <RouteCarousel
            routeInfo={routeInfo}
            waypoints={waypoints}
            onClick={onClick}
          />
        )
      )}
    </Wrapper>
  );
}

export default RouteExplorer;
