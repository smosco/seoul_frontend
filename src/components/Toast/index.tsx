import React from 'react';
import { useRecoilValue } from 'recoil';

import { AnimatePresence } from 'framer-motion';
import { Message, MessageWrapper, Wrapper } from './style';
import { ToastStateType } from '../../types/toastTypes';
import { toastState } from '../../recoil/atoms';

import { ReactComponent as ErrorIcon } from '../../assets/icons/toast/error.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/toast/info.svg';

function Toast() {
  const toasts = useRecoilValue<ToastStateType | null>(toastState);

  return (
    <AnimatePresence>
      {toasts && <Wrapper
        type={toasts.type}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 10 }}
        exit={{ opacity: 0, y: -20 }}>
        <MessageWrapper>
          {(toasts.type === 'error' || toasts.type === 'warning') && <ErrorIcon width="1.2rem" height="1.2rem" />}
          {(toasts.type === 'success' || toasts.type === 'info') && <InfoIcon width="1.2rem" height="1.2rem" />}
          <Message>{toasts.msg}</Message>
        </MessageWrapper>
      </Wrapper>}
    </AnimatePresence>
  );
}

export default Toast;
