/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/Search';
import { Coord, WaypointInfo, WaypointMean } from '../types/mapTypes';
import Wrapper from '../components/common/Wrapper';
import { endPositionState } from '../recoil/atoms';
import Chart from '../components/Chart';
import ReportButton from '../components/ReportButton';

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

  const [waypoints, setWaypoints] = useState<WaypointInfo[]>([]);
  const [mean, setMean] = useState<WaypointMean | undefined>(undefined);
  const [selectedMarkerId, setSelectedMarkerId] = useState<
    number | undefined
  >();

  const fetchWaypoints = async () => {
    try {
      const response = await axios.get(
        `https://jcigc40pak.execute-api.ap-northeast-2.amazonaws.com/seoul-public/route?start_lon=${startPosition.longitude}&start_lat=${startPosition.latitude}&arrival_lon=${endPosition.longitude}&arrival_lat=${endPosition.latitude}`,
      );
      const data = response.data.body;
      const extractedWaypoints = data.slice(0, 5);
      setWaypoints(extractedWaypoints);
      setMean(data[data.length - 1][0]);
    } catch (error) {
      console.error('Error fetching waypoints:', error);
    }
  };

  useEffect(() => {
    if (
      !startPosition.latitude ||
      !startPosition.longitude ||
      !endPosition.latitude ||
      !endPosition.longitude
    )
      return;
    fetchWaypoints();
  }, [endPosition, startPosition]);

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
          data={
            waypoints.find(
              (waypoint) => waypoint.id === selectedMarkerId,
            ) as WaypointInfo
          }
          type="info"
        />
      ) : (
        <Chart data={mean as WaypointMean} type="mean" />
      )}
      <ReportButton />
      {/* <button type="button">신고하기</button> */}
    </Wrapper>
  );
}

export default DetailRoute;
