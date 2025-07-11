export function splitTextIntoLines(text: string, containerWidth: number): string[] {
  if (!containerWidth || containerWidth === 0) return [text];

  const charWidth = 18;
  const maxCharsPerLine = Math.floor(containerWidth / charWidth);

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines;
}
