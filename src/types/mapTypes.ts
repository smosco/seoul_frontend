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
  | 'safetycenter'
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

export interface WaypointInfo {
  id: number;
  longitude: number;
  latitude: number;
  rank_score: number;
  emergency_bell_and_distance_score: number;
  safety_center_and_distacne_score: number;
  grid_shelter_distance_score: number;
  grid_facilities_distance_score: number;
  number_of_cctv_score: number;
  human_density_score: number;
}

export interface WaypointMean {
  rank_score_mean: number;
  emergency_bell_and_distance_score_mean: number;
  safety_center_and_distacne_score_mean: number;
  grid_shelter_distance_score_mean: number;
  grid_facilities_distance_score_mean: number;
  number_of_cctv_score_mean: number;
  human_density_mean: number;
}
