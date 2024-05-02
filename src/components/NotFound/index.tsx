import React from 'react';
import Wrapper from '../common/Wrapper';
import logo from '../../assets/images/logo.png';
import { ErrorContainer, Logo, ErrorText, ErrorTitle } from './style';

function NotFound() {
  return (
    <Wrapper>
      <ErrorContainer>
        <Logo src={logo} alt="logo" />
        <ErrorTitle>404 ERROR</ErrorTitle>
        <ErrorText>
          죄송합니다. 페이지를 찾을 수 없습니다. <br />
          존재하지 않는 주로를 입력하셨거나 요청하신 페이지의 주소가 변경,
          삭제되어 찾을 수 없습니다.
        </ErrorText>
      </ErrorContainer>
    </Wrapper>
  );
}

export default NotFound;
