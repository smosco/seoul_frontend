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
import sp from '../assets/images/sp.png';
import ep from '../assets/images/ep.png';
import pp from '../assets/images/pp.png';

import {
  FacilitiesType,
  SearchState,
  Tmapv2,
  Coord,
  Place,
} from '../types/mapTypes';

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
    default:
      return location;
  }
};

export function setCenter(map: any, lat: number, lng: number) {
  map.setCenter(new Tmapv2.LatLng(lat, lng));
}

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

export function generateInfoWindow(
  map: any,
  lat: number,
  lng: number,
  msg: string,
) {
  const content = `<div style="position:relative;padding:5px; text-align:center">${msg}</div>`;
  const infoWindow = new Tmapv2.InfoWindow({
    map,
    content,
    position: new Tmapv2.LatLng(lat, lng),
    type: 2,
  });
  return infoWindow;
}

export const drawCircle = (map: any, lat: number, lng: number) => {
  const circle = new Tmapv2.Circle({
    map,
    center: new Tmapv2.LatLng(lat, lng),
    radius: 250,
    strokeWeight: 1,
    strokeColor: '#007470',
    strokeOpacity: 1,
    fillColor: '#007470',
    fillOpacity: 0.15,
  });
  return circle;
};

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
      endName: '도착지',
      endX: String(endPosition.longitude),
      endY: String(endPosition.latitude),
      passList: waypoints
        .map((waypoint) => `${waypoint.longitude},${waypoint.latitude}`)
        .join('_'),
      reqCoordType: 'WGS84GEO',
      resCoordType: 'WGS84GEO',
      searchOption: 0,
    };

    const response = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
      requestData,
      { headers },
    );

    const { features } = response.data;
    const polylines: any[] = [];

    features.forEach((feature: any) => {
      const { geometry, properties } = feature;
      if (geometry.type === 'LineString') {
        const coordinates = geometry.coordinates.map(
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
      } else {
        let markerImg = '';
        const size = new Tmapv2.Size(26, 34);

        if (properties.pointType === 'SP') {
          markerImg = sp;
        }
        if (properties.pointType === 'EP') {
          markerImg = ep;
        }
        if (properties.pointType !== 'EP' && properties.pointType !== 'SP') {
          return;
        }

        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(
            geometry.coordinates[1],
            geometry.coordinates[0],
          ),
          icon: markerImg,
          iconSize: size,
          map,
        });
      }

      waypoints.map((waypoint) => {
        const marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(waypoint.latitude, waypoint.longitude),
          icon: pp,
          iconSize: new Tmapv2.Size(26, 34),
          map,
        });
        return marker;
      });
    });

    return polylines;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
