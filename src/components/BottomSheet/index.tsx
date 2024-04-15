import React from 'react';
import { BottomSheetContent, Wrapper } from './style';
import BottomSheetHeader from '../BottomSheetHeader';
import Content from '../BottomSheetContents';
import useBottomSheet from '../../hooks/useBottomSheet';
import { EXTRAPOSITIONS } from '../../constant/mockingPositions';
import useFilteringMarker from '../../hooks/useFilteringMarker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BottomSheet({map}:any) {
  const { sheet, content } = useBottomSheet();
  useFilteringMarker(map, EXTRAPOSITIONS);

  return (
    <Wrapper ref={sheet}>
      <BottomSheetHeader />
      <BottomSheetContent ref={content}>
        <Content />
      </BottomSheetContent>
    </Wrapper>
  );
}

export default BottomSheet;
