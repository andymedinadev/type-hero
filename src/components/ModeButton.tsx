import clsx from 'clsx';

import type { GameMode } from '../types';

interface ModelButtonProps {
  modeKey: GameMode;
  currentMode: GameMode;
  disabled: boolean;
  onClick: (modeKey: GameMode) => void;
}

const modeLabels: Record<GameMode, string> = { classic: 'Clásico', timer: 'Temporizador' };

export function ModeButton({ modeKey, currentMode, disabled, onClick }: ModelButtonProps) {
  const active = modeKey === currentMode;

  const className = clsx('rounded-2xl px-3 py-1 transition-colors', {
    'cursor-not-allowed opacity-40 text-zinc-500': disabled,
    'cursor-pointer': !disabled,
    'bg-amber-400/20 text-amber-200 shadow-[0_0_0_1px_rgba(251,191,36,0.25)]': active,
    'hover:bg-amber-400/30': active && !disabled,
    'hover:text-zinc-100': !active && !disabled,
    'text-zinc-400': !active,
  });

  return (
    <button
      disabled={disabled}
      onClick={() => onClick(modeKey)}
      className={className}
      aria-pressed={active}
    >
      {modeLabels[modeKey]}
    </button>
  );
}
