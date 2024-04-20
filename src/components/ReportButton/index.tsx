import React from 'react';
import axios from 'axios';
import Button from './style';
import useCurrentPosition from '../../hooks/useCurruntPosition';
import { getCurrentTimestamp } from '../../utils/commonUtils';

function ReportButton() {
  const { currentPosition } = useCurrentPosition();

  const postReport = async () => {
    if (!currentPosition) return;
    try {
      await axios.post('http://3.34.25.245:80/api/report', {
        time: getCurrentTimestamp(),
        longitude: currentPosition?.coords.longitude,
        latitude: currentPosition?.coords.latitude,
      });
      // TODO : 정상 처리 시 신고 완료되었다는 toastUI가 있으면 좋겠다.
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onMouseDown={postReport}>신고하기</Button>;
}

export default ReportButton;
