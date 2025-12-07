最先端のスタックを勉強するために制作したブログです。

Vercel で公開してみました。→ [デモページ](https://my-dev-blog-six.vercel.app/)

## 技術

- [Next.js 16](https://nextjs.org/)
- [React 19.2](https://ja.react.dev/)
- [Node.js 24](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)：サイト全般のスタイリング
- [Sass](https://sass-lang.com/)：記事ページ、メニューのスタイリング（CSS Modules）
- 楽しむ心

## 環境

Node.js をインストールした環境で、開発サーバを動作させてください。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## プロジェクトについて

プライベートで運用しているブログを公開用に移植したものです。機能は同じです。

ブログの制作を通して、現在主要とされるフロントエンドのライブラリ、フレームワークを学びました。

## 特徴

- 表示が速い！
- レスポンシブ対応

## 主な機能

- MDX による記事コンテンツ管理
- ファイルべースでカテゴリーによる記事分類
- 記事一覧ページ
- 記事の検索
- サムネイル画像生成
- RSS XML の自動生成
- SEO 対策

## テスト

手動でのテストのほかに、Vitest を使いました。

参考：[Vitest で React のテストを書いてみる](https://zenn.dev/collabostyle/articles/15883dcd38c9ff)

テストデータの mock 化がうまくできず、課題です。

## 気づき

React を使ってみて、開発スピードの向上を感じました。機能や役割ごとにコンポーネントを分割して、保守性や再利用性を高められるのはとても便利です。特に、「何を表示するか」がわかりやすいところが好きです。  
[React Hooks](https://ja.react.dev/reference/react/hooks) は、もっと勉強する必要があると思いました。

Next.js も、設定などが複雑ではなく、SSG を実現するための機能もわかりやすく、表示の速い Web サイトを作成できて楽しく開発ができました。

他の開発言語やフレームワークを学ぶ時と同じですが、最初はわからなくても、とりあえず手を動かして書いてみようというスタンスで挑みました。HTML や JavaScript の経験があるため 0 からのスタートではないですが、今まで触ってきたフレームワークやライブラリ（Django、ASP.NET、jQuery、etc…）よりも、パズルがはまっていくような感覚で理解しやすかったです。

## 課題

- 動的サムネイル画像の表示が遅い。フォント読み込みの最適化をしたい。
- サイトマップができていない（SEO 対策の一部）。
- Vitest のテストが足りていない。
- デザイン。オリジナリティと使いやすさを両立したい。

## 参考サイト

- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)
- [チュートリアル：三目並べ – React](https://ja.react.dev/learn/tutorial-tic-tac-toe)
- [[Next.js]App Router 時代の静的サイトの作り方](https://zenn.dev/hiromu617/articles/1ed6811dc6cf26)
