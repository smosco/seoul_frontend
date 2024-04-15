import { atom } from 'recoil';

const filterState = atom<{[key:string] : boolean}>({
  key: 'filterState',
  default: {
    cctv: false,
    fireStation: false,
    safetyFacility: false,
    saftyCenter: false,
    emergencyBell: false,
    heatShelter: false
  }
});

export default filterState;
