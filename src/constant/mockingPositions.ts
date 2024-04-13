import { FacilitiesType } from '../types/mapTypes';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tmapv2 } from '../hooks/useMap';

interface MockedPositionType {
  title: FacilitiesType;
  latlng: any;
  lat: number;
  lng: number;
}

const POSITIONS: MockedPositionType[] = [
  {
    title: 'cctv',
    latlng: new Tmapv2.LatLng(37.486592, 126.9409552),
    lat: 37.486592,
    lng: 126.9409552,
  },
  {
    title: 'safetyFacility',
    latlng: new Tmapv2.LatLng(37.486592, 126.938552),
    lat: 37.486592,
    lng: 126.938552,
  },
  {
    title: 'fireStation',
    latlng: new Tmapv2.LatLng(37.485592, 126.9409552),
    lat: 37.485592,
    lng: 126.9409552,
  },
  {
    title: 'heatShelter',
    latlng: new Tmapv2.LatLng(37.487592, 126.9399552),
    lat: 37.487592,
    lng: 126.9399552,
  },
  {
    title: 'saftyCenter',
    latlng: new Tmapv2.LatLng(37.486592, 126.9389552),
    lat: 37.486592,
    lng: 126.9389552,
  },
  {
    title: 'emergencyBell',
    latlng: new Tmapv2.LatLng(37.486592, 126.9389552),
    lat: 37.486592,
    lng: 126.9389552,
  },
];

export default POSITIONS;
