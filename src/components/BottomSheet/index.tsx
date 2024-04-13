import React from 'react';
import { BottomSheetContent, Wrapper } from './style';
import BottomSheetHeader from '../BottomSheetHeader';
import Content from '../BottomSheetContents';
import useBottomSheet from '../../hooks/useBottomSheet';

function BottomSheet() {
  const { sheet, content } = useBottomSheet();

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
