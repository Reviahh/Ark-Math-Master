
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  OPERATIONS = 'OPERATIONS', // Mission Selection
  TACTICAL_COMPUTER = 'TACTICAL_COMPUTER', // The Lesson View
  ARCHIVES = 'ARCHIVES', 
  SETTINGS = 'SETTINGS',
  PRTS = 'PRTS'
}

export enum SubjectType {
  CALCULUS = 'CALCULUS',
  LINEAR_ALGEBRA = 'LINEAR_ALGEBRA',
  PROBABILITY = 'PROBABILITY'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface OperationMission {
  id: string;
  code: string; // e.g., CA-1
  title: string;
  subtitle?: string; // e.g., "导数与DPS"
  description: string; // Short briefing for selection screen
  longDescription: string; // The full lesson content (Rich Text / HTML)
  subject: SubjectType;
  difficulty: number;
  locked: boolean;
  cost: number; // Sanity cost
  rewards: string[]; // e.g., "Knowledge", "Formula"
}

export interface UserStats {
  sanity: number;
  maxSanity: number;
  lmd: number;
  orundum: number;
  level: number;
  exp: number;
  maxExp: number;
}
