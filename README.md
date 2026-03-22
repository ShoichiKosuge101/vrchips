# VR Papers (Mock Frontend)

NotebookLM 連携を考えずに、**「今日の重要3本」＋「新着一覧」＋「詳細」**までを体験できるフロントモックです。
記事データはローカルのダミー（2〜3件）で、APIはまだありません。

## 画面

- ホーム: `app/page.tsx`
  - 検索
  - タグフィルタ
  - ソート（新着順 / 関連度順）
  - あとで読む（保存）
- 詳細: `app/article/[id]/page.tsx`

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## メモ

- 保存状態は Zustand のメモリ上だけです（リロードで消えます）。
- iPhone アプリとして作る場合は、このモックのコンポーネント構造を React Native / Expo に移植できます。
