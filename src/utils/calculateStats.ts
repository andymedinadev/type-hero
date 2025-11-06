import type { GameMode, TypingStats } from '../types';

export function calculateStats(
  input: string,
  target: string,
  timeMs: number,
  mode: GameMode
): TypingStats {
  const timeMinutes = timeMs / 60000 || 1 / 60;
  let correctChars = 0;
  let errors = 0;

  for (let i = 0; i < Math.min(input.length, target.length); i++) {
    if (input[i] === target[i]) correctChars++;
    else errors++;
  }

  if (input.length < target.length) {
    errors += target.length - input.length;
  }

  const wpm = Math.round(correctChars / 5 / timeMinutes);
  const accuracy = Math.round((correctChars / target.length) * 100);

  return {
    wpm: wpm || 0,
    accuracy: accuracy || 0,
    timeElapsed: Math.round(timeMs / 1000),
    correctChars,
    totalChars: target.length,
    errors,
    mode,
  };
}
