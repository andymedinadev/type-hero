import type { GameState } from '../types';

interface TypingTextProps {
  textLines: string[];
  userInput: string;
  currentIndex: number;
  gameState: GameState;
  isTextFocused: boolean;
}

export function TypingText({
  textLines,
  userInput,
  currentIndex,
  gameState,
  isTextFocused,
}: TypingTextProps) {
  let charIndex = 0;

  return (
    <>
      {textLines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden leading-relaxed">
          {line.split('').map((originalChar, charInLineIndex) => {
            const globalIndex = charIndex++;
            let displayChar = originalChar;
            let className = 'text-zinc-600';

            if (globalIndex < userInput.length) {
              const userChar = userInput[globalIndex];
              if (userChar === originalChar) {
                className = originalChar === ' ' ? 'text-zinc-600' : 'text-emerald-400';
              } else {
                displayChar = userChar === ' ' ? '_' : userChar;
                className = 'text-rose-500';
              }
            } else if (globalIndex === currentIndex && (gameState === 'typing' || isTextFocused)) {
              className = 'text-zinc-950 bg-amber-300 shadow-[0_0_0_4px_rgba(251,191,36,0.1)]';
            }

            return (
              <span
                key={`${lineIndex}-${charInLineIndex}`}
                className={`${className} rounded-sm px-0.5 transition-all duration-200 ease-out`}
              >
                {displayChar === ' ' ? '\u00A0' : displayChar}
              </span>
            );
          })}

          {lineIndex < textLines.length - 1 && (
            <>
              <span
                className={`${
                  charIndex === currentIndex && (gameState === 'typing' || isTextFocused)
                    ? 'bg-amber-300 text-zinc-950 shadow-[0_0_0_4px_rgba(251,191,36,0.1)]'
                    : charIndex < userInput.length
                      ? (() => {
                          const userChar = userInput[charIndex];
                          if (userChar === ' ') return 'text-zinc-600';
                          else return 'text-rose-500';
                        })()
                      : 'text-zinc-600'
                } rounded-sm px-0.5 transition-all duration-200 ease-out`}
              >
                {charIndex < userInput.length
                  ? (() => {
                      const userChar = userInput[charIndex];
                      return userChar === ' ' ? '\u00A0' : '_';
                    })()
                  : '\u00A0'}
              </span>
              {(() => {
                charIndex++;
                return null;
              })()}
            </>
          )}
        </div>
      ))}
    </>
  );
}
