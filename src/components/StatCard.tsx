export function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: any;
  subtitle: string;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    amber: 'text-amber-300',
    emerald: 'text-emerald-400',
    rose: 'text-rose-500',
    default: 'text-zinc-100',
  };

  const colorClass = color ? (colorMap[color] ?? colorMap.default) : colorMap.default;

  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="text-xs tracking-widest text-zinc-500 uppercase">{title}</div>
      <div className={`mt-2 text-3xl font-semibold ${colorClass}`}>{value}</div>
      <p className="text-xs text-zinc-500">{subtitle}</p>
    </div>
  );
}
