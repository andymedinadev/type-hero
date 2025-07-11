import { ENGLISH_WORDS } from '../constants/englishWords';

export function generateRandomText(): string {
  const wordCount = 60;
  return Array.from({ length: wordCount })
    .map(() => ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)])
    .join(' ');
}
