import { ENGLISH_WORDS } from '../constants/englishWords';

export function generateRandomText(): string {
  const wordCount = 60;
  const words: string[] = [];
  let lastIndex = -1;

  for (let i = 0; i < wordCount; i++) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * ENGLISH_WORDS.length);
    } while (newIndex === lastIndex);

    words.push(ENGLISH_WORDS[newIndex]);
    lastIndex = newIndex;
  }

  return words.join(' ');
}
