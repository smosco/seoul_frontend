import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, Main, Title, Wrapper } from './style';
import useCurrentPosition from '../../../hooks/useCurruntPosition';
import useToast from '../../../hooks/useToast';
import { postReportData } from '../../../api/reportAPI';
import { getCurrentTimestamp } from '../../../utils/commonUtils';
import { useModal } from '../../common/Modal';

function ReportModalContents() {

  const [reportContents, setReportContents] = useState<string>('');
  const { currentPosition } = useCurrentPosition();
  const { createToast } = useToast();
  const mutation = useMutation({
    mutationFn: postReportData
  });
  const { setIsOpen } = useModal();

  function handleListClick(e : React.MouseEvent) {
    if((e.target as HTMLElement).tagName === 'LI') {
      setReportContents((e.target as HTMLElement).innerText);
    }
  }

  const handleButtonClick = () => {
    // eslint-disable-next-line no-alert
    if(window.confirm('신고를 하시겠습니까?')) {
      if(!currentPosition) return;
      const data = {
        'time' : getCurrentTimestamp(),
        'longitude' : currentPosition.coords.longitude,
        'latitude': currentPosition.coords.latitude,
        'contents' : reportContents
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
        },
        onSettled: () => {
          setIsOpen(false);
        }
      });
    }
  };

  return (
    <Wrapper>
      <Title>무슨 일 있나요?</Title>
      <Input>
        <input type='text' onChange={(e) => setReportContents(e.target.value)} value={reportContents} maxLength={100} />
        <p>{reportContents.length >= 100 && '신고 내용은 최대 100자까지 가능합니다.'}</p>
      </Input>
      <Main>
        <p>상황을 알려주세요!!</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <ul onMouseDown={(e) => handleListClick(e)}>
          <li>🚨 수상한 물건이 있어요!!</li>
          <li>🚨 수상한 사람이 있어요!!</li>
          <li>🚨 싸움이 일어났어요!!</li>
          <li>🚨 불법 주차 차량이 있어요!!</li>
        </ul>
      </Main>
      <Button onMouseDown={handleButtonClick} type='button'>신고</Button>
    </Wrapper>
  );
}

export default ReportModalContents;
