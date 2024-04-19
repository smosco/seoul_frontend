import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ToastType } from '../../types/toastTypes';

export const Wrapper = styled(motion.div)<{type:ToastType}>`
    background-color: ${props => {
    switch (props.type) {
      case 'error':
        return '#d45d5d';
      case 'warning':
        return '#eba43d';
      case 'success':
        return '#3cc741';
      default:
        return '#e8e8e8';
    }
  }};
  position: absolute;
  width: 80%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const Message = styled.p`
  margin-left: 0.5rem;
`;
