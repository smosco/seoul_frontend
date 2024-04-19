import { useSetRecoilState } from 'recoil';
import { toastState } from '../recoil/atoms';
import { ToastStateType } from '../types/toastTypes';

export default function useToast() {
  const setToasts = useSetRecoilState<ToastStateType | null>(toastState);

  const LAST_SECONDS = 2;

  const createToast = (toast: ToastStateType) => {
    setToasts(toast);

    setTimeout(() => {
      setToasts(null);
    }, LAST_SECONDS * 1000);
  };

  return { createToast };
};
