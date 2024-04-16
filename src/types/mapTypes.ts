declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tmapv2: any;
  }
}

export const { Tmapv2 } = window;

export type FacilitiesType =
  | 'cctv'
  | 'firestation'
  | 'safetyfacility'
  | 'saftycenter'
  | 'emergencybell'
  | 'heatshelter'
  | 'way';

export interface SearchState {
  keyword: string;
  isSearching: boolean;
  selectedName: string;
}

export interface Coord {
  longitude: number | undefined;
  latitude: number | undefined;
}

export interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
