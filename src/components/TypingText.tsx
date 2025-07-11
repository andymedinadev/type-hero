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
            let className = 'text-gray-400';

            if (globalIndex < userInput.length) {
              const userChar = userInput[globalIndex];
              if (userChar === originalChar) {
                className = originalChar === ' ' ? 'text-gray-400' : 'text-green-500';
              } else {
                displayChar = userChar === ' ' ? '_' : userChar;
                className = 'text-red-500';
              }
            } else if (globalIndex === currentIndex && (gameState === 'typing' || isTextFocused)) {
              className = 'text-gray-800 bg-blue-200';
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
                    ? 'bg-blue-200 text-gray-800'
                    : charIndex < userInput.length
                      ? (() => {
                          const userChar = userInput[charIndex];
                          if (userChar === ' ') return 'text-gray-400';
                          else return 'text-red-500';
                        })()
                      : 'text-gray-400'
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
