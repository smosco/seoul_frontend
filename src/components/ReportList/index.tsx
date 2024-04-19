import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentsWrapper, Wrapper } from './style';
import timeStamp from '../../constant/mockingTimeStamp';

export function convertDateFormat(isoDateString:string):string {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function ReportList() {
  const navigate = useNavigate();

  const handleClick = (id:number) => {
    navigate(`/emergency/${id}`);
  };

  return (
    <Wrapper>
      {timeStamp.map((item) => (
        <ContentsWrapper onMouseDown={() => handleClick(item.id)} key={item.id}>
          <span>{`${convertDateFormat(item.timestamp)} 긴급 신고`}</span>
        </ContentsWrapper>
      ))}
    </Wrapper>
  );
}

export default ReportList;
