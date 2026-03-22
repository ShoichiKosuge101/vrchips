import Link from 'next/link';
import { Bookmark, BookmarkCheck, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Article } from '../data/sampleArticles';
import { TagChip } from './TagChip';
import { useSavedStore } from '../state/useSavedStore';
import clsx from 'clsx';

function scoreTone(score: number) {
  if (score >= 90) return 'bg-emerald-100 text-emerald-800';
  if (score >= 80) return 'bg-sky-100 text-sky-800';
  if (score >= 70) return 'bg-amber-100 text-amber-800';
  return 'bg-slate-100 text-slate-700';
}

export function ArticleCard({ article }: { article: Article }) {
  const toggleSaved = useSavedStore((s) => s.toggleSaved);
  const isSaved = useSavedStore((s) => s.isSaved(article.id));

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={clsx('text-xs font-semibold px-2 py-1 rounded-full', scoreTone(article.score))}>
                {article.score}
              </span>
              <span className="text-xs text-muted">
                {article.source} · {format(new Date(article.publishedAt), 'M/d (EEE)', { locale: ja })}
              </span>
            </div>
            <Link href={`/article/${encodeURIComponent(article.id)}`} className="block mt-2">
              <div className="text-base font-semibold leading-snug hover:underline">
                {article.title}
              </div>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => toggleSaved(article.id)}
            className={clsx(
              'shrink-0 rounded-xl border px-2.5 py-2 transition',
              isSaved
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            )}
            aria-label={isSaved ? '保存済み' : 'あとで読むに追加'}
          >
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {article.tags.slice(0, 4).map((t) => (
            <TagChip key={t} label={t} />
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 p-3">
          <div className="text-xs font-semibold text-slate-700">なぜ拾った？</div>
          <div className="mt-1 text-sm text-slate-700 leading-relaxed">
            {article.whyPicked}
          </div>
        </div>

        <Link
          href={`/article/${encodeURIComponent(article.id)}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          詳細を見る <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
