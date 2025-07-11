import type { GameState, TypingStats } from '../types';

interface ResultsProps {
  stats: TypingStats | null;
  gameState: GameState;
  resetGame: () => void;
}

export function Results({ stats, gameState, resetGame }: ResultsProps) {
  return (
    <div className="rounded-lg bg-zinc-900 px-4 py-8 text-center">
      <h2 className="mb-8 text-3xl font-bold text-white">¡Excelente trabajo!</h2>

      {stats && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-zinc-800 p-6">
              <div className="mb-2 text-3xl font-bold text-blue-600">{stats.wpm}</div>
              <div className="font-medium text-blue-800">Palabras por minuto</div>
            </div>
            <div className="rounded-lg bg-zinc-800 p-6">
              <div className="mb-2 text-3xl font-bold text-green-600">{stats.accuracy}%</div>
              <div className="font-medium text-green-800">Precisión</div>
            </div>
            <div className="rounded-lg bg-zinc-800 p-6">
              <div className="mb-2 text-3xl font-bold text-purple-600">{stats.timeElapsed}s</div>
              <div className="font-medium text-purple-800">Tiempo total</div>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-zinc-800 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Estadísticas detalladas</h3>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <div className="font-medium text-white">Total de caracteres</div>
                <div className="text-xl font-bold text-white">{stats.totalChars}</div>
              </div>
              <div>
                <div className="font-medium text-white">Caracteres correctos</div>
                <div className="text-xl font-bold text-green-600">{stats.correctChars}</div>
              </div>
              <div>
                <div className="font-medium text-white">Errores</div>
                <div className="text-xl font-bold text-red-600">{stats.errors}</div>
              </div>
              <div>
                <div className="font-medium text-white">Velocidad promedio</div>
                <div className="text-xl font-bold text-blue-600">{stats.wpm} ppm</div>
              </div>
            </div>
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Practicar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
