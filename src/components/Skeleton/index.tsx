import React from 'react';
import { SkeletonWrapper, SkeletonText } from './style';

function Skeleton() {
  return (
    <SkeletonWrapper>
      <SkeletonText />
      <SkeletonText />
    </SkeletonWrapper>
  );
}

export default Skeleton;
