import { atom } from 'recoil';

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
