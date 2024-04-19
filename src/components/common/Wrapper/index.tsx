import React from 'react';
import { WrapperContainer } from './style';
import Toast from '../../Toast';

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <WrapperContainer>
      <Toast />
      {children}
    </WrapperContainer>
  );
}

export default Wrapper;
