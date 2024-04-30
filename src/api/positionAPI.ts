import axios from 'axios';

const getPositionData = async (key: string, lat: number, lng: number) => {
  try {
    const url = `https://wemate.site/api/${key}?userLat=${lat}&userLon=${lng}`;
    const response = await axios.get(url);
    return { key, data: response.data };
  } catch (error) {
    throw new Error('마커 데이터를 불러오는데 실패했습니다!!');
  }
};

export default getPositionData;
