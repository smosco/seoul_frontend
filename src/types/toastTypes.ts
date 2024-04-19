export type ToastType = 'error' | 'success' | 'warning' | 'info' | undefined;

export interface ToastStateType {
  msg: string | undefined;
  type: ToastType | undefined;
};
