import type { GameMode } from '../types';

export const MODES: Record<GameMode, { label: string }> = {
  classic: { label: 'Clásico' },
  timer: { label: 'Temporizador' },
};

export const MODE_KEYS = Object.keys(MODES) as GameMode[];
