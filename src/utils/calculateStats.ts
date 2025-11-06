import type { GameMode, TypingStats } from '../types';

export function calculateStats(
  input: string,
  target: string,
  elapsedSeconds: number,
  mode: GameMode
): TypingStats {
  const correctChars = [...input].filter((c, i) => c === target[i]).length;

  const errors = Math.max(0, input.length - correctChars);

  const accuracy = input.length ? Math.round((correctChars / input.length) * 100) : 100;

  const minutesElapsed = elapsedSeconds / 60;

  const wpm = minutesElapsed > 0 ? Math.round(correctChars / 5 / minutesElapsed) : 0;

  return {
    wpm,
    accuracy,
    timeElapsed: Math.round(elapsedSeconds),
    correctChars,
    totalChars: target.length,
    errors,
    mode,
  };
}
