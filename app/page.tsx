'use client';

import { useMemo, useState } from 'react';
import { TopNav, type MainTab } from './components/TopNav';
import { ArticleCard } from './components/ArticleCard';
import { TagChip } from './components/TagChip';
import { allTags, sampleArticles } from './data/sampleArticles';
import { useSavedStore } from './state/useSavedStore';
import clsx from 'clsx';

type SortMode = 'newest' | 'score';

function sortArticles(mode: SortMode, a: typeof sampleArticles) {
  const copy = [...a];
  copy.sort((x, y) => {
    if (mode === 'score') return y.score - x.score;
    return Date.parse(y.publishedAt) - Date.parse(x.publishedAt);
  });
  return copy;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('newest');
  const [tab, setTab] = useState<MainTab>('digest');
  const savedIds = useSavedStore((s) => s.savedIds);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = sampleArticles;
    if (selectedTag) items = items.filter((a) => a.tags.includes(selectedTag));
    if (q) {
      items = items.filter((a) => {
        const hay = `${a.title} ${a.abstract} ${a.tags.join(' ')} ${a.whyPicked}`.toLowerCase();
        return hay.includes(q);
      });
    }
    return sortArticles(sortMode, items);
  }, [query, selectedTag, sortMode]);

  const important = useMemo(() => {
    const top = [...filtered].sort((a, b) => b.score - a.score);
    return top.slice(0, 3);
  }, [filtered]);

  const rest = useMemo(() => {
    const importantIds = new Set(important.map((a) => a.id));
    return filtered.filter((a) => !importantIds.has(a.id));
  }, [filtered, important]);

  const saved = useMemo(() => {
    const ids = new Set(Object.keys(savedIds));
    return sampleArticles
      .filter((a) => ids.has(a.id))
      .sort((a, b) => b.score - a.score);
  }, [savedIds]);

  return (
    <main className="min-h-screen">
      <TopNav
        title={tab === 'digest' ? '今日のダイジェスト' : '保存した記事'}
        query={query}
        onQuery={setQuery}
        tab={tab}
        onTabChange={setTab}
        savedCount={saved.length}
      />

      {tab === 'digest' ? (
        <>
          <section className="px-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">フィルタ</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortMode('newest')}
                  className={clsx(
                    'text-xs px-3 py-1 rounded-full border transition',
                    sortMode === 'newest'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200'
                  )}
                >
                  新着順
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode('score')}
                  className={clsx(
                    'text-xs px-3 py-1 rounded-full border transition',
                    sortMode === 'score'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200'
                  )}
                >
                  関連度順
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <TagChip
                label="すべて"
                active={!selectedTag}
                onClick={() => setSelectedTag(null)}
              />
              {allTags.map((t) => (
                <TagChip key={t} label={t} active={selectedTag === t} onClick={() => setSelectedTag(t)} />
              ))}
            </div>
          </section>

          <section className="px-4 pt-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-muted">今日まず見る</div>
                <div className="text-lg font-semibold">重要3本</div>
              </div>
              <div className="text-xs text-muted">{important.length} / {filtered.length} 件</div>
            </div>
            <div className="mt-3 grid gap-3">
              {important.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>

          <section className="px-4 pt-6 pb-10">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm text-muted">残り</div>
                <div className="text-lg font-semibold">新着一覧</div>
              </div>
              <div className="text-xs text-muted">{rest.length} 件</div>
            </div>
            <div className="mt-3 grid gap-3">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
              {rest.length === 0 && (
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-sm text-muted">
                  条件に一致する記事がありません。
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="px-4 pt-6 pb-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-muted">あとで読む</div>
              <div className="text-lg font-semibold">保存した記事</div>
            </div>
            <div className="text-xs text-muted">{saved.length} 件</div>
          </div>
          <div className="mt-3 grid gap-3">
            {saved.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
            {saved.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-muted">
                まだ保存した記事はありません。ダイジェスト画面のブックマークから追加できます。
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
