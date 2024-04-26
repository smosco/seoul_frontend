/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import { WaypointInfo } from '../types/mapTypes';
import Wrapper from '../components/common/Wrapper';
import { startPositionState, endPositionState } from '../recoil/atoms';
import Chart from '../components/Chart';
import ReportButton from '../components/ReportButton';
import getWaypoints from '../api/routeAPI';
import ReportModalContents from '../components/ModalContents/ReportModal';
import Modal from '../components/common/Modal';

function DetailRoute() {
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
    // TODO: 거리가 짧아서 받아온 waypoints가 빈 배열인 경우와
    // 경로 데이터를 아직 받아오지 못해서 waypoints가 빈 배열인 경우를 구분해야함
    if (!map || waypoints.length === 0) return;

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
      <Modal>
        <Modal.Toggle>
          <ReportButton />
        </Modal.Toggle>
        <Modal.Content>
          <ReportModalContents />
        </Modal.Content>
      </Modal>
    </Wrapper>
  );
}

export default DetailRoute;
