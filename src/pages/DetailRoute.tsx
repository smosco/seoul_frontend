/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import { Coord, WaypointInfo } from '../types/mapTypes';
import Wrapper from '../components/common/Wrapper';
import { endPositionState } from '../recoil/atoms';
import Chart from '../components/Chart';
import ReportButton from '../components/ReportButton';
import getWaypoints from '../api/routeAPI';

function DetailRoute() {
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
  const endPosition = useRecoilValue(endPositionState);
  const [polylines, setPolylines] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [, setRouteInfo] = useState<{
    time: string;
    distance: string;
  }>();
  const [selectedMarkerId, setSelectedMarkerId] = useState<
    number | undefined
  >();

  const { data } = useQuery({
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

  const mean = data ? data[data.length - 1][0] : null;

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

    drawRoute(
      map,
      startPosition,
      endPosition,
      waypoints,
      polylines,
      markers,
      setSelectedMarkerId,
    )
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
      <SearchContainer setStartPosition={setStartPosition} />

      <div id="map_div" ref={mapRef} />
      {selectedMarkerId !== undefined ? (
        <Chart
          data={waypoints.find(
            (waypoint: WaypointInfo) => waypoint.id === selectedMarkerId,
          )}
          type="info"
        />
      ) : (
        <Chart data={mean} type="mean" />
      )}
      <ReportButton />
    </Wrapper>
  );
}

export default DetailRoute;
