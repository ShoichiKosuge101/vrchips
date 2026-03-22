import clsx from 'clsx';
import { Search } from 'lucide-react';

export type MainTab = 'digest' | 'saved';

export function TopNav({
  title,
  query,
  onQuery,
  tab,
  onTabChange,
  savedCount,
}: {
  title: string;
  query: string;
  onQuery: (v: string) => void;
  tab: MainTab;
  onTabChange: (tab: MainTab) => void;
  savedCount: number;
}) {
  return (
    <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-slate-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="text-sm text-muted">VR Papers</div>
            <div className="text-lg font-semibold">{title}</div>
          </div>
          <div className="flex-1" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => onTabChange('digest')}
            className={clsx(
              'rounded-xl px-3 py-2 text-sm font-medium transition',
              tab === 'digest' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            )}
          >
            ダイジェスト
          </button>
          <button
            type="button"
            onClick={() => onTabChange('saved')}
            className={clsx(
              'rounded-xl px-3 py-2 text-sm font-medium transition',
              tab === 'saved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            )}
          >
            保存した記事
            <span className="ml-1 text-xs text-muted">{savedCount}</span>
          </button>
        </div>

        {tab === 'digest' && (
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="キーワード検索（例: locomotion / haptics）"
              className="w-full rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        )}
      </div>
    </div>
  );
}
