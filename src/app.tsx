import { useState, useCallback, useEffect } from 'preact/hooks';

import { ModeButton, Results, StatCard, TypingText } from './components';
import { useTypingGame } from './hooks';
import { calculateStats, formatSeconds } from './utils';
import { MODE_KEYS } from './constants/modes';

import type { TypingStats, GameMode } from './types';

export function App() {
  const [mode, setMode] = useState<GameMode>('classic');
  const [roundStats, setRoundStats] = useState<TypingStats | null>(null);

  const {
    targetText,
    userInput,
    currentIndex,
    gameState,
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

  const formattedTime =
    mode === 'timer' ? formatSeconds(remainingTime) : formatSeconds(elapsedTime);

  const stats = calculateStats(userInput, targetText, elapsedTime, mode);

  const progress = targetText.length
    ? Math.min(100, (userInput.length / targetText.length) * 100)
    : 0;

  const handleModeChange = useCallback(
    (modeKey: GameMode) => {
      if (modeKey !== mode) setMode(modeKey);
    },
    [mode]
  );

  const handleReset = () => {
    setRoundStats(null);
    resetGame();
  };

  useEffect(() => {
    if (gameState !== 'finished' || !stats || roundStats) return;

    setRoundStats(stats);
  }, [gameState, stats, roundStats]);

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
              {MODE_KEYS.map((modeKey) => (
                <ModeButton
                  key={modeKey}
                  modeKey={modeKey}
                  currentMode={mode}
                  disabled={gameState === 'typing'}
                  onClick={handleModeChange}
                />
              ))}
            </div>

            <button
              onClick={handleReset}
              className="cursor-pointer self-end rounded-2xl border border-amber-500/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition-colors hover:border-amber-400 hover:bg-amber-400/20 md:self-auto"
            >
              Reiniciar
            </button>
          </div>
        </header>

        <div className="pt-2 pb-8">
          {gameState !== 'finished' ? (
            <>
              <section className="my-4 rounded-3xl border border-white/5 bg-zinc-950/70 p-8">
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4 text-sm text-zinc-400 md:grid-cols-4">
                    <StatCard
                      title="Ritmo"
                      value={stats.wpm}
                      subtitle="Palabras por minuto"
                      color="amber"
                    />
                    <StatCard
                      title="Precisión"
                      value={`${stats.accuracy}%`}
                      subtitle={`${stats.correctChars} correctos`}
                      color="emerald"
                    />
                    <StatCard
                      title={mode === 'classic' ? 'Tiempo' : 'Tiempo restante'}
                      value={formattedTime}
                      subtitle={mode === 'classic' ? 'En progreso' : 'Tiempo restante'}
                    />
                    <StatCard
                      title="Errores"
                      value={stats.errors}
                      subtitle={`${userInput.length} caracteres`}
                      color="rose"
                    />
                  </div>

                  <ProgressBar progress={progress} />
                </div>
              </section>

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
            <Results roundStats={roundStats} gameState={gameState} resetGame={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs tracking-widest text-zinc-500 uppercase">
        <span>Progreso</span>
        <span className="text-amber-200">{progress.toFixed(0)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 transition-all"
          style={{ width: `${progress.toFixed(0)}%` }}
        />
      </div>
    </div>
  );
}
