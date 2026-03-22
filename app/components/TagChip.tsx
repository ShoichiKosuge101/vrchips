import clsx from 'clsx';

export function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-medium border transition',
        active
          ? 'bg-accent text-white border-accent'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
      )}
    >
      {label}
    </button>
  );
}
