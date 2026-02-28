export interface Mudra {
  id: string;
  name: string;
  sanskritName: string;
  meaning: string;
  confidence: number;
  timestamp: string;
  imageUrl: string;
}

export interface TelemetryData {
  latency: number;
  bhavasScore: string;
  confidence: number;
  activeMudra: string;
  meaning: string;
}
