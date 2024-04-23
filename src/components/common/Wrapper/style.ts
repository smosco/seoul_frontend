// Wrapper/styles.ts
import styled from 'styled-components';
import device from '../../../constant/device';

const WrapperContainer = styled.div`
  position: relative;
  /* 공통 스타일링 */
  /* max-width: 360px; */
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  #map_div {
    width: 100%;
    height: 100%;
  }

  ${device.desktop} {
    max-width: 600px;
  }

`;

export default WrapperContainer;
