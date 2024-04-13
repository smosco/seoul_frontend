import React from 'react';
// import useBottomSheetTouch from '../../hooks/useBottomSheetTouch';
import { BottomSheetContent, Wrapper } from './style';
import BottomSheetHeader from '../BottomSheetHeader';
import Content from '../BottomSheetContents';
import useBottomSheetClick from '../../hooks/useBottomSheetClick';

function BottomSheet() {
  // const { touchSheet, touchContent } = useBottomSheetTouch();
  const { sheet, content } = useBottomSheetClick();

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
