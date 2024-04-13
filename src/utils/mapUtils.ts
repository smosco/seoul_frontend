/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import cctv from '../assets/images/cctv.png';
import emergencyBell from '../assets/images/emergencybell.png';
import safetFacility from '../assets/images/safetyfacility.png';
import safetCenter from '../assets/images/safetycenter.png';
import fireStation from '../assets/images/firestation.png';
import heatShelter from '../assets/images/heatshelter.png';
import location from '../assets/images/location.png';
import way from '../assets/images/way.png';
import {
  FacilitiesType,
  SearchState,
  Tmapv2,
  Coord,
  Place,
} from '../types/mapTypes';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export const { kakao } = window;

const getImageSrc = (facilities?: FacilitiesType) => {
  switch (facilities) {
    case 'cctv':
      return cctv;
    case 'fireStation':
      return fireStation;
    case 'safetyFacility':
      return safetFacility;
    case 'saftyCenter':
      return safetCenter;
    case 'emergencyBell':
      return emergencyBell;
    case 'heatShelter':
      return heatShelter;
    case 'way':
      return way;
    default:
      return location;
  }
};

export function generateMarker(
  currentMap: any,
  lat: number,
  lng: number,
  facilities?: FacilitiesType,
) {
  const imgSrc = getImageSrc(facilities);
  const imgSize = facilities
    ? new Tmapv2.Size(16, 16)
    : new Tmapv2.Size(16, 22);
  const markerImg = imgSrc;
  const markerPosition = new Tmapv2.LatLng(lat, lng);
  const marker = new Tmapv2.Marker({
    position: markerPosition,
    icon: markerImg,
    iconSize: imgSize,
    map: currentMap,
  });
  return marker;
}

export function generateInfoWindow(lat: number, lng: number) {
  const iwContent = '<div style="padding:5px;">Hello World!</div>';
  const iwPosition = new kakao.maps.LatLng(lat, lng);
  const infoWindow = new kakao.maps.InfoWindow({
    position: iwPosition,
    content: iwContent,
  });
  return infoWindow;
}

export function generateCircle(lat: number, lng: number) {
  const circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(lat, lng),
    radius: 250,
    strokeWeight: 1,
    strokeColor: '#007470',
    strokeStyle: 'solid',
    fillColor: '#007470',
    fillOpacity: 0.15,
  });
  return circle;
}

export async function reverseGeo(lon: number, lat: number) {
  try {
    const headers = {
      appKey: process.env.REACT_APP_TMAP_API_KEY,
    };

    const response = await axios.get(
      'https://apis.openapi.sk.com/tmap/geo/reversegeocoding',
      {
        params: {
          version: 1,
          format: 'json',
          coordType: 'WGS84GEO',
          addressType: 'A10',
          lon,
          lat,
        },
        headers,
      },
    );

    const arrResult = response.data.addressInfo;
    let newRoadAddr = `${arrResult.city_do} ${arrResult.gu_gun} `;

    const lastLegal = arrResult.legalDong.charAt(
      arrResult.legalDong.length - 1,
    );

    if (
      arrResult.eup_myun === '' &&
      (lastLegal === '읍' || lastLegal === '면')
    ) {
      newRoadAddr += arrResult.legalDong;
    } else {
      newRoadAddr += arrResult.eup_myun;
    }

    newRoadAddr += ` ${arrResult.roadName} ${arrResult.buildingIndex}`;

    if (
      arrResult.legalDong !== '' &&
      lastLegal !== '읍' &&
      lastLegal !== '면'
    ) {
      if (arrResult.buildingName !== '') {
        newRoadAddr += ` (${arrResult.legalDong}, ${arrResult.buildingName}) `;
      } else {
        newRoadAddr += ` (${arrResult.legalDong})`;
      }
    } else if (arrResult.buildingName !== '') {
      newRoadAddr += ` (${arrResult.buildingName}) `;
    }

    const result = newRoadAddr;
    // const result = `새주소 : ${newRoadAddr} <br/>
    //                 지번주소 : ${jibunAddr} <br/>
    //                 위경도좌표 : ${lat}, ${lon}`;

    // 결과 반환
    return result;
  } catch (error) {
    // 에러 처리
    console.error('Error:', error);
    return null;
  }
}

export async function updateAddressFromCurrentCoordinates(
  currentPosition: GeolocationPosition | undefined,
  setStartSearchState: React.Dispatch<React.SetStateAction<SearchState>>,
  startSearchState: SearchState,
  setStartPosition: React.Dispatch<React.SetStateAction<Coord>>,
) {
  if (!currentPosition) return;
  const response = await reverseGeo(
    currentPosition?.coords.longitude,
    currentPosition?.coords.latitude,
  );

  // console.log(response);
  // TODO: response가 null이 되지 않게
  setStartSearchState({
    ...startSearchState,
    selectedName: response!,
  });

  setStartPosition({
    longitude: currentPosition?.coords.longitude,
    latitude: currentPosition?.coords.latitude,
  });
}

export const searchPOI = async (
  keyword: string,
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>,
) => {
  try {
    const headers = {
      appKey: process.env.REACT_APP_TMAP_API_KEY,
    };

    const response = await axios.get('https://apis.openapi.sk.com/tmap/pois', {
      params: {
        version: 1,
        format: 'json',
        searchKeyword: keyword,
        resCoordType: 'WGS84GEO',
        reqCoordType: 'WGS84GEO',
        count: 10,
      },
      headers,
    });

    const resultpoisData = response.data.searchPoiInfo?.pois?.poi;
    if (!resultpoisData) {
      console.error('No POIs');
      return;
    }
    // console.log(resultpoisData);
    const modifiedPlaces = resultpoisData.map((poi: any) => ({
      longitude: Number(poi.noorLon),
      latitude: Number(poi.noorLat),
      name: poi.name,
    }));

    setPlaces(modifiedPlaces);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const drawMarkers = (
  map: any,
  startPosition: Coord,
  endPosition: Coord,
  waypoints: Coord[],
) => {
  const markers: any[] = [];

  const drawMarker = (position: Coord, iconPath: string) => {
    const marker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(position.latitude, position.longitude),
      icon: iconPath,
      iconSize: new window.Tmapv2.Size(24, 38),
      map,
    });
    markers.push(marker);
  };

  drawMarker(startPosition, way);
  drawMarker(endPosition, way);

  waypoints.forEach((waypoint) => {
    drawMarker(waypoint, location);
  });

  return markers;
};

export const drawRoute = async (
  map: any,
  startPosition: Coord,
  endPosition: Coord,
  waypoints: Coord[],
) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      appKey: process.env.REACT_APP_TMAP_API_KEY,
    };

    const requestData = {
      startName: '출발지',
      startX: String(startPosition.longitude),
      startY: String(startPosition.latitude),
      startTime: '202404141010',
      endName: '도착지',
      endX: String(endPosition.longitude),
      endY: String(endPosition.latitude),
      viaPoints: waypoints.map((waypoint, index) => ({
        viaPointId: `test${index + 1}`,
        viaPointName: `name${index + 1}`,
        viaX: String(waypoint.longitude),
        viaY: String(waypoint.latitude),
      })),
      reqCoordType: 'WGS84GEO',
      resCoordType: 'WGS84GEO',
      searchOption: 0,
    };

    const response = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json',
      requestData,
      { headers },
    );
    const { features } = response.data;

    const polylines: any[] = [];
    features.forEach((feature: any) => {
      if (feature.geometry.type === 'LineString') {
        const coordinates = feature.geometry.coordinates.map(
          ([lng, lat]: [lng: number, lat: number]) =>
            new window.Tmapv2.LatLng(lat, lng),
        );
        const polyline = new window.Tmapv2.Polyline({
          path: coordinates,
          strokeColor: '#FF0000',
          strokeWeight: 6,
          map,
        });
        polylines.push(polyline);
      }
    });

    return polylines;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
