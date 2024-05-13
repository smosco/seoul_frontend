import axios from 'axios';
import { ReportData } from '../types/reportTypes';

export const getReportData = async () => {
  try {
    const response = await axios.get('https://wemate.site/api/report');
    return response.data;
  } catch (error) {
    throw new Error('신고 데이터를 불러오는데 실패했습니다.');
  }
};

export const postReportData = async (data: ReportData) => {
  try {
    const response = await axios.post('https://wemate.site/api/report', data);
    return response;
  } catch (error) {
    throw new Error(
      '네트워크 오류로 인해 신고하는데 실패했습니다. 다시 시도해주세요.',
    );
  }
};
