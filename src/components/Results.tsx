import { formatSeconds } from '../utils';

import type { GameState, TypingStats } from '../types';

interface ResultsProps {
  stats: TypingStats | null;
  gameState: GameState;
  resetGame: () => void;
}

export function Results({ stats, gameState, resetGame }: ResultsProps) {
  if (!stats) return null;

  const mainStats = [
    {
      label: 'Velocidad',
      value: `${stats.wpm}`,
      description: 'Palabras por minuto',
      accent: 'from-amber-400/20 via-amber-400/10 to-transparent',
    },
    {
      label: 'Precisión',
      value: `${stats.accuracy}%`,
      description: 'Exactitud total',
      accent: 'from-emerald-400/20 via-emerald-400/10 to-transparent',
    },
    {
      label: 'Tiempo usado',
      value: formatSeconds(stats.timeElapsed),
      description: '',
      accent: 'from-indigo-400/20 via-indigo-400/10 to-transparent',
    },
  ] as const;

  const detailStats = [
    { label: 'Caract. escritos', value: stats.totalChars },
    { label: 'Correctos', value: stats.correctChars },
    { label: 'Errores', value: stats.errors },
    { label: 'Palabras', value: Math.round(stats.totalChars / 5) },
  ] as const;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 rounded-3xl border border-white/5 bg-zinc-950/80 p-10 text-center shadow-xl shadow-black/20 backdrop-blur">
      <div>
        <p className="text-sm tracking-[0.4em] text-amber-300 uppercase">Sesión completada</p>
        <h2 className="mt-4 text-4xl font-semibold text-zinc-100">
          {stats?.mode === 'timer' ? 'Modo temporizador' : 'Modo clásico'}
        </h2>
      </div>

      {stats && (
        <>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {mainStats.map((item) => (
              <ResultMainStatCard key={item.label} {...item} />
            ))}
          </div>

          <div className="grid w-full grid-cols-2 gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 text-left text-sm text-zinc-400 md:grid-cols-3 lg:grid-cols-4">
            {detailStats.map((item) => (
              <ResultDetailStatCard key={item.label} {...item} />
            ))}
          </div>
        </>
      )}

      {gameState === 'finished' && (
        <button
          onClick={resetGame}
          className="cursor-pointer rounded-2xl border border-amber-400/60 bg-amber-400/10 px-8 py-3 text-sm font-medium text-amber-100 transition-colors hover:border-amber-300 hover:bg-amber-400/20"
        >
          Practicar de nuevo
        </button>
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
