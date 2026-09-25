// Game Types
export interface PlayerState {
  position: [number, number, number];
  rotation: number;
  health: number;
  inVehicle: boolean;
  currentMission?: string;
}

export interface VehicleData {
  id: string;
  name: string;
  position: [number, number, number];
  type: 'car' | 'bike' | 'boat';
}

export interface MissionData {
  id: string;
  title: string;
  description: string;
  location: [number, number, number];
  reward: string;
  completed: boolean;
}

export interface InteractiveZone {
  id: string;
  type: 'project' | 'skill' | 'about' | 'contact';
  position: [number, number, number];
  radius: number;
  data: any;
}
