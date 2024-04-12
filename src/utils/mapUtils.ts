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
import { FacilitiesType, SearchState, AddressInfo } from '../types/mapTypes';

interface AddressResult {
  address: { address_name: string };
  code: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export const { kakao } = window;

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

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
  lat: number,
  lng: number,
  facilities?: FacilitiesType,
) {
  const imgSrc = getImageSrc(facilities);
  const imgSize = facilities
    ? new kakao.maps.Size(16, 16)
    : new kakao.maps.Size(16, 22);
  const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);
  const markerPosition = new kakao.maps.LatLng(lat, lng);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImg,
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

export function updateAddressFromCurrentCoordinates(
  currentPosition: GeolocationPosition | undefined,
  setStartSearchState: React.Dispatch<React.SetStateAction<SearchState>>,
  startSearchState: SearchState,
  setStart: React.Dispatch<React.SetStateAction<AddressInfo>>,
) {
  if (!currentPosition) return;

  const geocoder = new kakao.maps.services.Geocoder();
  const coord = new kakao.maps.LatLng(
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const callback = (result: AddressResult[], status: string) => {
    if (status === kakao.maps.services.Status.OK) {
      setStartSearchState({
        ...startSearchState,
        selectedName: result[0].address.address_name,
      });
      setStart({
        address: result[0].address.address_name,
        coord: {
          x: currentPosition?.coords.longitude,
          y: currentPosition?.coords.latitude,
        },
      });
    }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}

export async function findway(start: AddressInfo, end: AddressInfo) {
  if (start.coord.x === undefined || end.coord.x === undefined)
    return Promise.resolve([]);

  const linePath: any[] = [];

  const { data } = await axios.post(
    'https://apis-navi.kakaomobility.com/v1/waypoints/directions',
    {
      origin: start.coord,
      destination: end.coord,
      waypoints: [
        {
          name: '서울대학교',
          x: 126.9511239870991,
          y: 37.45978574975834,
        },
      ],
      priority: 'RECOMMEND', // 'RECOMMEND'|'TIME'|'DISTANCE'
      car_fuel: 'GASOLINE',
      car_hipass: false,
      alternatives: false,
      road_details: false,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    },
  );

  data.routes[0].sections?.forEach((section: any) => {
    section.roads.forEach((road: any) => {
      road.vertexes.forEach((_: number, index: number) => {
        // 짝수 index: lng, 홀수 index: lat
        if (index % 8 === 0) {
          linePath.push(
            new kakao.maps.LatLng(
              road.vertexes[index + 1],
              road.vertexes[index],
            ),
          );
        }
      });
    });
  });

  return linePath;
}
