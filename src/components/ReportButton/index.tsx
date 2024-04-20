import React from 'react';
import { useMutation } from '@tanstack/react-query';
import Button from './style';
import useCurrentPosition from '../../hooks/useCurruntPosition';
import { getCurrentTimestamp } from '../../utils/commonUtils';
import useToast from '../../hooks/useToast';
import { postReportData } from '../../api/reportAPI';

function ReportButton() {
  const { currentPosition } = useCurrentPosition();
  const { createToast } = useToast();
  const mutation = useMutation({
    mutationFn: postReportData
  });

  const handleClick = () => {
    if(!currentPosition) return;
    const data = {
      'time' : getCurrentTimestamp(),
      'longitude' : currentPosition.coords.longitude,
      'latitude': currentPosition.coords.latitude
    };
    mutation.mutate(data, {
      onSuccess: () => {
        createToast({
          msg: '성공적으로 처리되었습니다.',
          type: 'success',
        });
      },
      onError: () => {
        createToast({
          msg: '네트워크 에러로 신고 접수가 불가합니다.',
          type: 'error'
        });
      }
    });
  };

  return (
    <Button onMouseDown={handleClick}>신고하기</Button>
  );
}

export default ReportButton;
