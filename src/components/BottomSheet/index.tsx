import React from 'react';
import useBottomSheetTouch from '../../hooks/useBottomSheetTouch';
import { BottomSheetContent, Wrapper } from './style';
import BottomSheetHeader from '../BottomSheetHeader';
import Content from '../BottomSheetContents';

function BottomSheet() {
  const { sheet, content } = useBottomSheetTouch();

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
