import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import useEmergencyMarker from '../hooks/useEmergencyMarker';
import useFilteringMarker from '../hooks/useFilteringMarker';
import EmergencyHeader from '../components/EmergencyHeader';
import Wrapper from '../components/common/Wrapper';

function EmergencyPage() {
  const mapRef = useRef(null);
  const { currentPosition } = useCurrentPosition();
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const location = useLocation();
  useEmergencyMarker(map, location.state);
  useFilteringMarker({
    map,
    lat: 37.4812298,
    lng: 126.9441014,
  });

  return (
    <Wrapper>
      <EmergencyHeader title={location.state?.time} />
      <div id="map_div" ref={mapRef} />
    </Wrapper>
  );
}

export default EmergencyPage;
