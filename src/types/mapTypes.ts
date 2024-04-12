export type FacilitiesType =
  | 'cctv'
  | 'fireStation'
  | 'safetyFacility'
  | 'saftyCenter'
  | 'emergencyBell'
  | 'heatShelter'
  | 'way';

export interface SearchState {
  keyword: string;
  isSearching: boolean;
  selectedName: string;
}

export interface AddressInfo {
  address: string;
  // x: 경도 y: 위도
  coord: { x: number | undefined; y: number | undefined };
}
