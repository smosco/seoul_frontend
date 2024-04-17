// Wrapper/styles.ts
import styled from 'styled-components';

export const WrapperContainer = styled.div`
  /* 공통 스타일링 */
  max-width: 360px;
  /* background-color: yellow; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  #map_div {
    /* position: fixed;
    top: 0;
    left: 0; */
    width: 360px;
    height: 100%;
  }
`;

export const MobileWrapperContainer = styled(WrapperContainer)`
  /* 모바일 화면에 대한 스타일링 */
  @media (min-width: 768px) {
    display: none;
  }
`;

export const DesktopWrapperContainer = styled(WrapperContainer)`
  /* 데스크톱 화면에 대한 스타일링 */
  @media (max-width: 767px) {
    display: none;
  }
`;
