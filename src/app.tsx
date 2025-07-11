import { TypingText, Results } from './components';
import { useTypingGame } from './hooks';

export function App() {
  const {
    targetText,
    userInput,
    currentIndex,
    gameState,
    startTime,
    stats,
    textLines,
    isTextFocused,
    hiddenInputRef,
    textContainerRef,
    textAreaRef,
    handleInputChange,
    handleKeyDown,
    focusTextArea,
    blurTextArea,
    resetGame,
    setIsTextFocused,
  } = useTypingGame();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-800 p-4">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Type Hero</h1>
        </div>

        {/* Área principal de tipeo */}
        <div className="pt-2 pb-8">
          {gameState !== 'finished' ? (
            <>
              <div>
                {gameState === 'waiting' && (
                  <div className="m-4 p-4 text-center">
                    <span className="text-lg font-medium text-white">
                      🔽 Haz click en el texto para empezar a tipear 🔽
                    </span>
                  </div>
                )}
                {gameState === 'typing' && (
                  <div className="m-4 rounded-lg bg-zinc-900 p-4 shadow-sm">
                    <div className="flex items-center justify-between text-sm text-white">
                      <div className="font-medium">
                        Progreso: {userInput.length}/{targetText.length} caracteres
                      </div>
                      <div className="flex items-center gap-4">
                        {startTime && (
                          <span className="font-medium">
                            Tiempo: {Math.floor((Date.now() - startTime) / 1000)}s
                          </span>
                        )}
                        <button
                          onClick={resetGame}
                          className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                        >
                          Reiniciar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Texto a escribir */}
              <div
                ref={textAreaRef}
                className={`max-h-[400px] min-h-[300px] cursor-text overflow-y-auto rounded-lg p-8 transition-colors ${
                  isTextFocused ? 'border border-white' : ''
                }`}
                onClick={focusTextArea}
              >
                <div ref={textContainerRef} className="font-mono text-2xl tracking-wide">
                  <TypingText
                    textLines={textLines}
                    userInput={userInput}
                    currentIndex={currentIndex}
                    gameState={gameState}
                    isTextFocused={isTextFocused}
                  />
                </div>
              </div>

              {/* Input oculto */}
              <input
                ref={hiddenInputRef}
                type="text"
                value={userInput}
                onInput={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsTextFocused(true)}
                onBlur={blurTextArea}
                className="absolute -left-[9999px] opacity-0"
                autoComplete="off"
              />
            </>
          ) : (
            <Results stats={stats} gameState={gameState} resetGame={resetGame} />
          )}
        </div>
      </div>
    </div>
  );
}
