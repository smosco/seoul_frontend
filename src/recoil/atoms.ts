import { atom } from 'recoil';
import { Coord } from '../types/mapTypes';
import { ToastStateType } from '../types/toastTypes';

const filterState = atom<{ [key: string]: boolean }>({
  key: 'filterState',
  default: {
    cctv: false,
    firestation: false,
    safetyfacility: false,
    safetycenter: false,
    emergencybell: false,
    heatshelter: false,
  },
});

export default filterState;

export const endNameState = atom<string>({
  key: 'endNameState',
  default: '',
});

export const endPositionState = atom<Coord>({
  key: 'endPositionState',
  default: {
    latitude: undefined,
    longitude: undefined,
  },
});

export const toastState = atom<ToastStateType | null>({
  key: 'toastState',
  default: null
});
