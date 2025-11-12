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
          <div className="mb-8 flex gap-6">
            <div className="flex-1 rounded-lg bg-zinc-800 p-6">
              <div className="mb-2 text-3xl font-bold text-blue-600">{stats.wpm}</div>
              <div className="font-medium text-blue-800">Palabras por minuto</div>
            </div>
            <div className="flex-1 rounded-lg bg-zinc-800 p-6">
              <div className="mb-2 text-3xl font-bold text-green-600">{stats.accuracy}%</div>
              <div className="font-medium text-green-800">Precisión</div>
            </div>
            {stats.mode === 'classic' && (
              <div className="flex-1 rounded-lg bg-zinc-800 p-6">
                <div className="mb-2 text-3xl font-bold text-purple-600">{stats.timeElapsed}s</div>
                <div className="font-medium text-purple-800">Tiempo total</div>
              </div>
            )}
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

interface ResultMainStatCardProps {
  label: string;
  value: string | number;
  description: string;
  accent: string;
}

export function ResultMainStatCard({ label, value, description, accent }: ResultMainStatCardProps) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${accent} p-6`}>
      <div className="text-xs tracking-widest text-zinc-200/70 uppercase">{label}</div>
      <div className="mt-3 text-4xl font-semibold text-zinc-100">{value}</div>
      <p className="text-xs text-zinc-200/60">{description}</p>
    </div>
  );
}

interface ResultDetailStatCardProps {
  label: string;
  value: string | number;
}

export function ResultDetailStatCard({ label, value }: ResultDetailStatCardProps) {
  return (
    <div className="flex justify-center">
      <div className="text-center">
        <p className="text-xs tracking-widest text-zinc-500 uppercase">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-100">{value}</p>
      </div>
    </div>
  );
}
