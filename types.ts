
export enum FreshnessState {
  FRESH = 'Fresh',
  RIPE = 'Ripe',
  OVERRIPE = 'Overripe',
  ROTTEN = 'Rotten'
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PredictionResult {
  id: string;
  label: string;
  confidence: number;
  freshness: FreshnessState;
  daysRemaining: number;
  timestamp: string;
  bbox: BoundingBox;
}

export interface AppState {
  view: 'home' | 'scanner' | 'report' | 'history';
  currentScan?: PredictionResult;
  history: PredictionResult[];
}

export interface MLMetadata {
  modelVersion: string;
  stage: 'Staging' | 'Production';
  accuracy: number;
  latency: number;
}
