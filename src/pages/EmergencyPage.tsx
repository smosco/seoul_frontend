import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import useMap from '../hooks/useMap';
import useCurrentPosition from '../hooks/useCurruntPosition';
import useEmergencyMarker from '../hooks/useEmergencyMarker';
import useFilteringMarker from '../hooks/useFilteringMarker';
import EmergencyHeader from '../components/EmergencyHeader';
import timeStamp from '../constant/mockingTimeStamp';
import { convertDateFormat } from '../components/ReportList';
import Wrapper from '../components/common/Wrapper';

function EmergencyPage() {
  const mapRef = useRef(null);
  const { currentPosition } = useCurrentPosition();
  const { map } = useMap(
    mapRef,
    currentPosition?.coords.latitude,
    currentPosition?.coords.longitude,
  );
  const { emergencyId } = useParams();
  useEmergencyMarker(map, emergencyId);
  useFilteringMarker({
    map,
    lat: 37.598,
    lng: 127.073,
  });

  const STAMP = timeStamp.filter(item => item.id === Number(emergencyId))[0];

  return (
    <Wrapper>
      <EmergencyHeader title={convertDateFormat(STAMP.timestamp)} />
      <div id="map_div" ref={mapRef} />
    </Wrapper>
  );
}

export default EmergencyPage;
