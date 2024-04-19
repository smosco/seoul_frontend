import { useSetRecoilState } from 'recoil';
import { toastState } from '../recoil/atoms';
import { ToastStateType } from '../types/toastTypes';

export default function useToast() {
  const setToasts = useSetRecoilState<ToastStateType | null>(toastState);

  const LAST_SECONDS = 2;

  const createToast = (toast: ToastStateType) => {
    setToasts(toast);

    // 5초 후에 토스트 상태를 초기화합니다.
    setTimeout(() => {
      setToasts(null);
    }, LAST_SECONDS * 1000);
  };

  return { createToast };
};
