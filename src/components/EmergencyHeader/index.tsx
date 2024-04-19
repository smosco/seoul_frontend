import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackBtn, Wrapper } from './style';

function EmergencyHeader({title} : {title: string}) {
  const navigate = useNavigate();

  const handleClick= () => {
    navigate(-1);
  };

  return (
    <Wrapper>
      <BackBtn onMouseDown={handleClick}>&lt;</BackBtn>
      <p>{title} 신고</p>
    </Wrapper>
  );
}

export default EmergencyHeader;
