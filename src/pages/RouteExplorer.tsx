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
  const [selectedRoute, setSelectedRoute] = useState<number>(0);

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

    const selected = waypoints.map(
      (waypoint, index) => selectedRoute === index,
    );

    Promise.all(
      waypoints.map((waypoint, index) =>
        drawRoute(
          map,
          startPosition,
          endPosition,
          waypoint,
          polylines[index],
          markers[index],
          selected[index],
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
  }, [map, startPosition, endPosition, waypoints, selectedRoute]);

  const handleRouteClick = (index: number) => {
    setSelectedRoute(index); // 선택된 경로 설정
    polylines.forEach((polyline, i) => {
      if (i === index) {
        console.log(i, 'selected');
        // polyline.setColorOptions({ strokeOpacity: 1 }); // 선택된 경로는 진하게 표시
      } else {
        console.log(i, 'not selected');
        // polyline.setColorOptions({ strokeOpacity: 0.1 }); // 선택되지 않은 경로는 연하게 표시
      }
    });
  };

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
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onClick={() => handleRouteClick(index)}
            style={{
              backgroundColor: selectedRoute === index ? '#FF0000' : '#CCCCCC', // 선택된 경로는 빨간색, 선택되지 않은 경로는 회색으로 설정
            }}
          >
            <p>Route {index + 1}</p>
            <p>Time: {info.time}</p>
            <p>Distance: {info.distance}</p>
          </button>
        ))}
      </div>
    </>
  );
}

export default RouteExplorer;
