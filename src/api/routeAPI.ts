import axios from 'axios';
import { Coord } from '../types/mapTypes';

const getWaypoints = async (start: Coord, end: Coord) => {
  if (!start || !end) {
    return [];
  }
  try {
    const response = await axios.get(
      `https://jcigc40pak.execute-api.ap-northeast-2.amazonaws.com/seoul-public/route?start_lon=${start.longitude}&start_lat=${start.latitude}&arrival_lon=${end.longitude}&arrival_lat=${end.latitude}`,
    );
    if (response.data.errorMessage) {
      return [];
    }
    return response.data.body;
  } catch (error) {
    console.error('Error fetching waypoints:', error);
    return [];
  }
};

export default getWaypoints;
