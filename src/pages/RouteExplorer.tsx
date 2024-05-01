/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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
import useFilteringMarker from '../hooks/useFilteringMarker';

function RouteExplorer() {
  const navigate = useNavigate();
  const { currentPosition } = useCurrentPosition();
  const mapRef = useRef(null);
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const [currentMarker, setCurrentMarker] = useState<any>(null);
  const startPosition = useRecoilValue(startPositionState);
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
    // console.log('지금', data);
    if (!data || data.length === 0) {
      return [];
    }
    if (data.length >= 4) {
      return data.slice(1, -2);
    }
    return [];
  }, [data]);

  useFilteringMarker({
    map,
    lat: currentPosition?.coords.latitude,
    lng: currentPosition?.coords.longitude,
  });

  useEffect(() => {
    if (!currentPosition) return;

    const marker = generateMarker(
      map,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    );

    if (currentMarker) {
      currentMarker.setMap(null);
    }

    setCurrentMarker(marker);
  }, [map]);

  useEffect(() => {
    // !data => 경유지 응답이 안 왔는데 티맵에 경로 요청 해서 먼저 그리는 것 방지
    // !end || !start => 출도착지 없는데 티맵에 경로 요청 방지
    if (!map || !endPosition.latitude || !startPosition.latitude || !data)
      return;

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
    if (waypoints.length > 0) navigate('/route-detail');
  };

  return (
    <Wrapper>
      <SearchContainer type="start" />

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
