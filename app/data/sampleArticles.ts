export type Article = {
  id: string;
  title: string;
  abstract: string;
  publishedAt: string; // ISO
  source: 'arXiv' | 'PubMed' | 'OpenAlex';
  tags: string[];
  whyPicked: string;
  score: number; // 0-100
};

export const sampleArticles: Article[] = [
  {
    id: 'vr-locomotion-2026',
    title: '低遅延ハンドトラッキングと視点予測を組み合わせたVR歩行インタラクションの提案',
    abstract:
      '本稿では、VR歩行における酔いと操作負荷を同時に下げるため、視点予測とハンドトラッキングのジェスチャ入力を組み合わせた新しいロコモーション手法を提案する。小規模ユーザスタディにより、従来のスティック移動と比べて主観酔いスコアが低下し、タスク完了時間も同等であることを示した。',
    publishedAt: '2026-03-21T09:00:00.000Z',
    source: 'arXiv',
    tags: ['locomotion', 'hand tracking', 'presence'],
    whyPicked: 'ロコモーション × ハンドトラッキング。ゲーム実装に直結しやすい。',
    score: 92,
  },
  {
    id: 'haptics-avatar-2026',
    title: 'アバター同調と触覚フィードバックが没入感に与える影響の定量評価',
    abstract:
      '触覚グローブとアバターの指先同調精度が没入感・身体所有感に与える影響を検証した。遅延・位置ずれを段階的に付与し、各条件での主観評価と行動指標を収集した結果、指先の位置ずれが一定値を超えると身体所有感が急激に低下し、タスク成功率も悪化することが分かった。',
    publishedAt: '2026-03-20T15:30:00.000Z',
    source: 'OpenAlex',
    tags: ['haptics', 'avatar', 'embodiment'],
    whyPicked: 'アバター/触覚/身体所有感。XR体験の品質指標づくりに役立つ。',
    score: 88,
  },
  {
    id: 'vr-rehab-2026',
    title: '家庭環境でのVRリハビリにおける継続率を改善するデザイン要因の探索',
    abstract:
      '家庭で実施するVRリハビリの継続率向上を目的に、UIの分かりやすさ・達成フィードバック・セッション長の設計要因を探索した。行動ログとインタビューから、短い成功体験の積み重ねと、次回への期待を作る進行設計が継続に寄与することが示唆された。',
    publishedAt: '2026-03-18T12:10:00.000Z',
    source: 'PubMed',
    tags: ['XR adjacent', 'UX', 'rehab'],
    whyPicked: '医療寄りだが、継続設計やフィードバック設計はゲームにも転用しやすい。',
    score: 75,
  },
];

export const allTags = Array.from(new Set(sampleArticles.flatMap((a) => a.tags))).sort();
