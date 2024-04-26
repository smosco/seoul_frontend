import React from 'react';
import { SkeletonWrapper, SkeletonText, SkeletonChart, Group } from './style';

function Skeleton({ type }: { type: string }) {
  return (
    <SkeletonWrapper $type={type}>
      {type === 'chart' && <SkeletonChart />}
      {type === 'chart' ? (
        <Group>
          <SkeletonText />
          <SkeletonText />
        </Group>
      ) : (
        <>
          <SkeletonText />
          <SkeletonText />
        </>
      )}
    </SkeletonWrapper>
  );
}

export default Skeleton;
