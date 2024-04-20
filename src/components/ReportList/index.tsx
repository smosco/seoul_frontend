import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ContentsWrapper, ErrorWrapper, Wrapper } from './style';
import { ReportData } from '../../types/reportTypes';
import useToast from '../../hooks/useToast';
import { getReportData } from '../../api/reportAPI';

function ReportList() {
  const navigate = useNavigate();
  const { createToast } = useToast();


  const handleClick = (data: ReportData) => {
    navigate('/report', { state : data });
  };
  const {data: reportData, error} = useQuery({ queryKey: ['report'], queryFn: getReportData});

  if(error) {
    createToast({
      msg: error.message,
      type: 'error'
    });
  }

  return (
    <Wrapper>
      {reportData && reportData.length > 0 ? (
        reportData.map((item: ReportData, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <ContentsWrapper onMouseDown={() => handleClick(item)} key={`report_${index}`}>
            <span>{`${item.time} 긴급 신고`}</span>
          </ContentsWrapper>
        ))
      ) : (
        <ErrorWrapper>
          <span>1시간 내 접수된 신고가 없습니다.</span>
        </ErrorWrapper>
      )}

    </Wrapper>
  );
}

export default ReportList;
