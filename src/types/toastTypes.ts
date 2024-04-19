type ToastType = 'error' | 'success' | 'warning' | 'info';

export interface ToastStateType {
  msg: string | undefined;
  type: ToastType | undefined;
};
