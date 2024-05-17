/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import {
  WaypointMean,
  FacilitiesType,
  SearchState,
  Tmapv2,
  Coord,
  Place,
  WaypointInfo,
} from '../types/mapTypes';
import cctv from '../assets/images/cctv.png';
import emergencyBell from '../assets/images/emergencybell.png';
import safetFacility from '../assets/images/safetyfacility.png';
import safetCenter from '../assets/images/safetycenter.png';
import fireStation from '../assets/images/firestation.png';
import heatShelter from '../assets/images/heatshelter.png';
import location from '../assets/images/location.png';
import sp from '../assets/images/sp.png';
import ep from '../assets/images/ep.png';
import pp1 from '../assets/images/pp1.png';
import pp2 from '../assets/images/pp2.png';
import pp3 from '../assets/images/pp3.png';
import pp4 from '../assets/images/pp4.png';
import pp5 from '../assets/images/pp5.png';

const getImageSrc = (facilities?: FacilitiesType) => {
  switch (facilities) {
    case 'cctv':
      return cctv;
    case 'firestation':
      return fireStation;
    case 'safetyfacility':
      return safetFacility;
    case 'safetycenter':
      return safetCenter;
    case 'emergencybell':
      return emergencyBell;
    case 'heatshelter':
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
  element: string,
) {
  const infoWindow = new Tmapv2.InfoWindow({
    map,
    content: element,
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
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>,
  searchState: SearchState,
  setPosition: React.Dispatch<React.SetStateAction<Coord>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
) {
  if (!currentPosition) return;

  const response = await reverseGeo(
    currentPosition?.coords.longitude,
    currentPosition?.coords.latitude,
  );

  // console.log('좌표를 주소로 변환중', 'selectedName:', response);

  // TODO: response가 null이 되지 않게
  setSearchState({
    ...searchState,
    isSearching: false,
    selectedName: response!,
  });

  setName(response!);

  setPosition({
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

const getMarkerIcon = (rankScore: number) => {
  let iconUrl;
  // rank score에 따라 다른 아이콘 선택
  if (rankScore >= 97) {
    iconUrl = pp5;
  } else if (rankScore >= 95) {
    iconUrl = pp4;
  } else if (rankScore >= 92) {
    iconUrl = pp3;
  } else if (rankScore >= 90) {
    iconUrl = pp2;
  } else {
    iconUrl = pp1;
  }

  return iconUrl;
};

export const drawRoute = async (
  map: any,
  startPosition: Coord,
  endPosition: Coord,
  waypoints: WaypointInfo[],
  prevPolylines: any[],
  prevMarkers: any[],
  setSelectedMarkerId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >,
) => {
  try {
    // 이전 경로, 마커 제거
    prevPolylines.forEach((polyline) => {
      polyline.setMap(null);
    });
    prevMarkers.forEach((marker) => {
      marker.setMap(null);
    });

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
      ...(waypoints.length > 0 && {
        passList: waypoints
          .map((waypoint) => `${waypoint.longitude},${waypoint.latitude}`)
          .join('_'),
      }),
      reqCoordType: 'WGS84GEO',
      resCoordType: 'WGS84GEO',
      searchOption: 0,
    };

    const response = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
      requestData,
      { headers },
    );

    const polylines: any[] = [];
    const markers: any[] = [];
    let tTime: string = '';
    let tDistance: string = '';

    const { features } = response.data;

    const { totalTime, totalDistance } = features[0].properties;
    tDistance = `${(totalDistance / 1000).toFixed(1)}km`;
    tTime = `${(totalTime / 60).toFixed(0)}분`;

    waypoints.forEach((waypoint) => {
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(waypoint.latitude, waypoint.longitude),
        icon: getMarkerIcon(waypoint.rank_score),
        iconSize: new Tmapv2.Size(26, 34),
        map,
      });
      if (setSelectedMarkerId) {
        marker.addListener('click', () => {
          setSelectedMarkerId(waypoint.id);
        });
        marker.addListener('touchstart', () => {
          setSelectedMarkerId(waypoint.id);
        });
      }
      markers.push(marker);
    });

    features.forEach((feature: any) => {
      const { geometry, properties } = feature;

      if (geometry.type === 'LineString') {
        const coordinates = geometry.coordinates.map(
          ([lng, lat]: [lng: number, lat: number]) =>
            new window.Tmapv2.LatLng(lat, lng),
        );
        const newPolyline = new window.Tmapv2.Polyline({
          path: coordinates,
          strokeColor: '#FF0000',
          strokeWeight: 8,
          map,
        });
        polylines.push(newPolyline);
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

        markers.push(marker);
      }
    });

    return { newPolylines: polylines, newMarkers: markers, tTime, tDistance };
  } catch (error) {
    console.error('Error:', error);
    return { newPolylines: [], newMarkers: [], tTime: '', tDistance: '' };
  }
};

export function isWaypointInfo(data: any): data is WaypointInfo {
  return (
    typeof data === 'object' &&
    data !== null &&
    'emergency_bell_and_distance_score' in data &&
    'safety_center_and_distacne_score' in data &&
    'grid_shelter_distance_score' in data &&
    'grid_facilities_distance_score' in data &&
    'number_of_cctv_score' in data &&
    'human_density_score' in data
  );
}

export function isWaypointMean(data: any): data is WaypointMean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'emergency_bell_and_distance_score_mean' in data &&
    'safety_center_and_distacne_score_mean' in data &&
    'grid_shelter_distance_score_mean' in data &&
    'grid_facilities_distance_score_mean' in data &&
    'number_of_cctv_score_mean' in data &&
    'human_density_mean' in data
  );
}

export const transformData = (
  data: WaypointInfo | WaypointMean | undefined,
  type: 'info' | 'mean',
) => {
  if (!data) return [];
  if (type === 'info' && isWaypointInfo(data)) {
    return [
      { risk: '응급상황벨', A: data.emergency_bell_and_distance_score },
      { risk: '안전센터', A: data.safety_center_and_distacne_score },
      { risk: '보호시설', A: data.grid_shelter_distance_score },
      { risk: '안전시설', A: data.grid_facilities_distance_score },
      { risk: 'CCTV', A: data.number_of_cctv_score },
      { risk: '인구밀도', A: data.human_density_score },
    ];
  }
  if (type === 'mean' && isWaypointMean(data)) {
    return [
      { risk: '응급상황벨', A: data.emergency_bell_and_distance_score_mean },
      { risk: '안전센터', A: data.safety_center_and_distacne_score_mean },
      { risk: '보호시설', A: data.grid_shelter_distance_score_mean },
      { risk: '안전시설', A: data.grid_facilities_distance_score_mean },
      { risk: 'CCTV', A: data.number_of_cctv_score_mean },
      { risk: '인구밀도', A: data.human_density_mean },
    ];
  }
  return [];
};
