import React from 'react';
import cctv from '../assets/images/cctv.png';
import emergencyBell from '../assets/images/emergencybell.png';
import safetFacility from '../assets/images/safetyfacility.png';
import safetCenter from '../assets/images/safetycenter.png';
import fireStation from '../assets/images/firestation.png';
import heatShelter from '../assets/images/heatshelter.png';
import location from '../assets/images/location.png';
import { FacilitiesType, SearchState } from '../types/mapTypes';

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

const { kakao } = window;

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
  currentPosition: GeolocationPosition | null,
  setStartSearchState: React.Dispatch<React.SetStateAction<SearchState>>,
  startSearchState: SearchState,
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
    }
  };

  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
}
