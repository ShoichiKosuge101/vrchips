'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { sampleArticles } from '../../data/sampleArticles';
import { TagChip } from '../../components/TagChip';
import { useSavedStore } from '../../state/useSavedStore';
import clsx from 'clsx';

function scoreTone(score: number) {
  if (score >= 90) return 'bg-emerald-100 text-emerald-800';
  if (score >= 80) return 'bg-sky-100 text-sky-800';
  if (score >= 70) return 'bg-amber-100 text-amber-800';
  return 'bg-slate-100 text-slate-700';
}

export default function ArticleDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = decodeURIComponent(params.id);

  const article = useMemo(() => sampleArticles.find((a) => a.id === id), [id]);
  const toggleSaved = useSavedStore((s) => s.toggleSaved);
  const isSaved = useSavedStore((s) => s.isSaved(id));

  if (!article) {
    return (
      <main className="min-h-screen">
        <div className="sticky top-0 bg-bg/90 backdrop-blur border-b border-slate-200 px-4 py-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" /> 戻る
          </button>
        </div>
        <div className="p-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-4">
            <div className="text-sm text-muted">記事が見つかりません</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-slate-200 px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> 戻る
        </button>
      </div>

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      'text-xs font-semibold px-2 py-1 rounded-full',
                      scoreTone(article.score)
                    )}
                  >
                    {article.score}
                  </span>
                  <span className="text-xs text-muted">
                    {article.source} · {format(new Date(article.publishedAt), 'yyyy/M/d (EEE) HH:mm', { locale: ja })}
                  </span>
                </div>
                <h1 className="mt-2 text-xl font-semibold leading-snug">{article.title}</h1>
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
              {article.tags.map((t) => (
                <TagChip key={t} label={t} />
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3">
              <div className="text-xs font-semibold text-slate-700">なぜ拾った？</div>
              <div className="mt-1 text-sm text-slate-700 leading-relaxed">{article.whyPicked}</div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-semibold">要旨（サンプル）</div>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {article.abstract}
              </p>
            </div>

            <div className="mt-5 grid gap-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium"
              >
                原文を開く（ダミー） <ExternalLink className="h-4 w-4 text-slate-500" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium"
              >
                引用をコピー（ダミー） <ExternalLink className="h-4 w-4 text-slate-500" />
              </a>
            </div>

            <div className="mt-6 text-xs text-muted">
              ※ NotebookLM 連携や実際のリンクは、後でバックエンドやメタデータ整備と一緒に追加できます。
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-4 pb-10">
        <div className="rounded-2xl bg-white border border-slate-200 p-4">
          <div className="text-sm font-semibold">次にやると良いこと</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>記事データをAPI取得に置き換える（C#側 or TS側）</li>
            <li>スワイプで保存/除外（モバイル実装）</li>
            <li>比較ビュー（3本並べて差分を見る）</li>
          </ul>
          <div className="mt-3">
            <Link href="/" className="text-sm font-medium text-accent hover:underline">
              ホームに戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
