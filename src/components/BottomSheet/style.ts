import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  BOTTOM_SHEET_DEFAULT_HEIGHT,
  BOTTOM_SHEET_HEIGHT,
} from '../../constant/bottomSheetPosition';
import device from '../../constant/device';

export const Wrapper = styled(motion.div)`
  width: 600px;

  ${device.mobile} {
    width: 100%
  }

  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: calc(
    100% - ${BOTTOM_SHEET_DEFAULT_HEIGHT}px
  ); /*시트가 얼마나 높이 위치할지*/
  left: 50%;
  transform: translateX(-50%);
  right: 0;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: ${BOTTOM_SHEET_HEIGHT}px;

  /* background: linear-gradient(359.26deg, #3C41C7 0.02%, #3742B2 83.23%, #3642AE 98.76%); */
  background: #fff;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);

  transition: transform 650ms ease-out; /*바텀시트 애니메이션 속도*/
`;

export const BottomSheetContent = styled.div`
overflow: none;
`;
