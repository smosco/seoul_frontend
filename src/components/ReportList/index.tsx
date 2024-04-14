import React from 'react';
import { ContentsWrapper, Wrapper } from './style';
import timeStamp from '../../constant/mockingTimeStamp';

function convertDateFormat(isoDateString:string) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function ReportList() {
  return (
    <Wrapper>
      {timeStamp.map((item) => (
        <ContentsWrapper key={item.id}>
          <span>{`${convertDateFormat(item.timestamp)} 긴급 신고`}</span>
        </ContentsWrapper>
      ))}
    </Wrapper>
  );
}

export default ReportList;
