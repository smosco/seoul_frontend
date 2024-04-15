/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import { generateMarker, drawRoute } from '../utils/mapUtils';
import SearchContainer from '../components/SearchInput';
import { Coord } from '../types/mapTypes';

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
  const [routeInfos, setRouteInfos] = useState<
    { time: string; distance: string }[]
  >([]);

  const [waypoints] = useState([
    [
      { latitude: 37.48157254, longitude: 126.94072362 },
      { latitude: 37.48083481, longitude: 126.94321739 },
      { latitude: 37.48248228, longitude: 126.94212616 },
    ],
    [
      { latitude: 37.48261084, longitude: 126.94111939 },
      { latitude: 37.48329818, longitude: 126.94290856 },
      { latitude: 37.48182206, longitude: 126.94061092 },
    ],
    [
      { latitude: 37.48211807, longitude: 126.94151563 },
      { latitude: 37.48334492, longitude: 126.94311689 },
      { latitude: 37.48161125, longitude: 126.94127377 },
    ],
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

    Promise.all(
      waypoints.map((waypoint, index) =>
        drawRoute(
          map,
          startPosition,
          endPosition,
          waypoint,
          polylines[index],
          markers[index],
        ),
      ),
    )
      .then((routes) => {
        const newPolylines = routes.map((route) => route.newPolylines);
        const newMarkers = routes.map((route) => route.newMarkers);
        setPolylines(newPolylines);
        setMarkers(newMarkers);

        // 시간과 거리를 저장
        const newRouteInfos = routes.map((route) => ({
          time: route.tTime,
          distance: route.tDistance,
        }));
        setRouteInfos(newRouteInfos);
      })
      .catch((error) => console.error('Error drawing route:', error));
  }, [map, startPosition, endPosition, waypoints]);

  return (
    <>
      <SearchContainer
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
        endName={state?.endName}
      />
      <div
        id="map_div"
        style={{ width: '500px', height: '500px' }}
        ref={mapRef}
      />
      <div>
        {routeInfos.map((info, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <p>Route {index + 1}</p>
            <p>Time: {info.time}</p>
            <p>Distance: {info.distance}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default RouteExplorer;
