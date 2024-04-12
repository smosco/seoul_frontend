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
