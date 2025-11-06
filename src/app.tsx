import { useState } from 'preact/hooks';

import { TypingText, Results } from './components';
import { useTypingGame } from './hooks';
import type { GameMode } from './types';

export function App() {
  const [mode, setMode] = useState<GameMode>('classic');

  const {
    targetText,
    userInput,
    currentIndex,
    gameState,
    stats,
    textLines,
    isTextFocused,
    hiddenInputRef,
    textContainerRef,
    textAreaRef,
    elapsedTime,
    remainingTime,
    handleInputChange,
    handleKeyDown,
    focusTextArea,
    blurTextArea,
    resetGame,
    setIsTextFocused,
  } = useTypingGame(mode);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto w-full max-w-4xl">
        <header className="flex flex-col gap-5 rounded-3xl border border-white/5 bg-zinc-950/70 px-6 py-5 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/20 text-2xl text-amber-300">
              🙌
            </span>
            <div>
              <h1 className="text-lg font-semibold tracking-wide text-zinc-100">Type Hero</h1>
              <p className="text-sm text-zinc-400">Domina tu velocidad y precisión</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="flex flex-wrap justify-end gap-2 rounded-3xl border border-white/5 bg-white/5 p-1 text-xs font-medium tracking-widest text-zinc-400 uppercase">
              {['classic', 'timer'].map((modeKey) => {
                const isActive = modeKey === mode;
                const label = modeKey;
                return (
                  <button
                    key={modeKey}
                    onClick={() => {
                      if (modeKey !== mode) {
                        setMode(modeKey as GameMode);
                      }
                    }}
                    className={`rounded-2xl px-3 py-1 transition-colors ${
                      isActive
                        ? 'bg-amber-400/20 text-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.25)]'
                        : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                    aria-pressed={isActive}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Área principal de tipeo */}
        <div className="pt-2 pb-8">
          {gameState !== 'finished' ? (
            <>
              <div className="m-4 rounded-lg bg-zinc-950 p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm text-white">
                  <div className="font-medium">
                    Progreso: {userInput.length}/{targetText.length} caracteres
                  </div>
                  <div className="flex items-center gap-4">
                    {gameState === 'typing' && elapsedTime !== null && (
                      <>
                        {mode === 'classic' && (
                          <span className="font-medium">Tiempo: {elapsedTime}s</span>
                        )}
                        {mode === 'timer' && (
                          <span className="font-medium">{remainingTime}s restantes</span>
                        )}
                      </>
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

              {/* Texto a escribir */}
              <div
                ref={textAreaRef}
                className={`max-h-[400px] min-h-[300px] cursor-text rounded-3xl bg-black/40 p-8 focus-within:border-amber-300/60 ${
                  isTextFocused
                    ? 'border-amber-400/50 shadow-[0_0_0_2px_rgba(251,191,36,0.15)]'
                    : ''
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
