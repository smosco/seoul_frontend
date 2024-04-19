import React from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

import { Message, ToastList, Wrapper } from './style';
import { ToastStateType } from '../../types/toastTypes';
import { toastState } from '../../recoil/atoms';

function Toast() {
  const toasts = useRecoilValue<ToastStateType | null>(toastState);

  return (
    createPortal(
      <ToastList>
        {/* TODO : 수정 */}
        {toasts && <Wrapper type={toasts.type || 'defaultType'}>
          <Message>{toasts.msg}</Message>
        </Wrapper>}
      </ToastList>,
      // TODO : div 설정해주기
      // 토스트 메시지를 렌더링할 DOM 요소를 선택합니다.
      document.getElementById('toast')!
    )
  );
}

export default Toast;
