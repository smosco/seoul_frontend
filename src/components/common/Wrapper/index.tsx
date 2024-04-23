import React from 'react';
import Toast from '../../Toast';
import WrapperContainer from './style';

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
