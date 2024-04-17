import React from 'react';
import { WrapperContainer } from './style';

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return <WrapperContainer>{children}</WrapperContainer>;
}

export default Wrapper;
