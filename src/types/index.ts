export interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  correctChars: number;
  totalChars: number;
  errors: number;
}

export type GameState = 'waiting' | 'typing' | 'finished';

export type GameMode = 'classic' | 'timer';
