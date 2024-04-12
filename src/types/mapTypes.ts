export type FacilitiesType =
  | 'cctv'
  | 'fireStation'
  | 'safetyFacility'
  | 'saftyCenter'
  | 'emergencyBell'
  | 'heatShelter';

export interface SearchState {
  keyword: string;
  isSearching: boolean;
  selectedName: string;
}

export interface AddressInfo {
  address: string;
  coord: { lat: number | undefined; lng: number | undefined };
}
