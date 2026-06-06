# デプロイ手順

本リポジトリは npm workspaces によるモノレポで、3 つの Astro アプリ (`apps/portal` / `apps/hokkaido` / `apps/game`) をそれぞれ独立した Cloudflare Pages プロジェクトとして配信する。

## 前提

- 各アプリのビルド成果物はそのアプリ配下の `dist/` に出力される
  - 例: `apps/portal/dist/`、`apps/hokkaido/dist/`、`apps/game/dist/`
- ルートには `dist/` は存在しないため、Cloudflare Pages 側で出力先を明示する必要がある
- 各 `apps/[name]/wrangler.toml` で `pages_build_output_dir = "./dist"` を宣言済み

## Cloudflare Pages プロジェクト設定

3 プロジェクトを以下の値で作成（または既存プロジェクトを編集）する。

| 項目 | fujioha-portal | fujioha-hokkaido | fujioha-game |
| --- | --- | --- | --- |
| Production branch | `main` | `main` | `main` |
| Root directory (Advanced) | `apps/portal` | `apps/hokkaido` | `apps/game` |
| Build command | `npm run build` | `npm run build` | `npm run build` |
| Build output directory | `dist`（注） | `dist`（注） | `dist`（注） |
| Install command | `cd ../.. && npm ci` | `cd ../.. && npm ci` | `cd ../.. && npm ci` |
| Node.js version (env var `NODE_VERSION`) | `22` 以上 | `22` 以上 | `22` 以上 |

> 注: `wrangler.toml` に `pages_build_output_dir` を宣言している場合、Cloudflare Pages はダッシュボードの「Build output directory」欄を `wrangler.toml` の値で上書きする。ダッシュボードの値は実質的に参照されないが、UI 上の整合性のため `dist` を入れておくことを推奨する。

### Install command の理由

npm workspaces ではリポジトリルートの `package-lock.json` で依存解決を行う必要があるため、Root directory を `apps/[name]` にすると `npm ci` がそのまま実行できない。Install command でルートに `cd` してから `npm ci` を実行することでこの制約を回避する。

### wrangler.toml

各 `apps/[name]/` に `wrangler.toml` が置かれており、Cloudflare Pages はビルド後にこのファイルを読み `pages_build_output_dir` を解決する。Root directory をアプリ配下に設定している場合のみ参照される点に注意。

```toml
# 例: apps/portal/wrangler.toml
name = "fujioha-portal"
pages_build_output_dir = "./dist"
compatibility_date = "2026-05-30"
```

## トラブルシューティング

### `Error: Output directory "dist" not found.`

| 原因 | 対処 |
| --- | --- |
| Root directory がリポジトリルートのまま | Pages プロジェクト設定で Root directory を `apps/[name]` に変更 |
| Build output directory が空または誤った値 | Pages プロジェクト設定で `dist` を指定 |
| wrangler.toml が読まれていない | Root directory を `apps/[name]` に設定し、その配下に wrangler.toml があるか確認 |

### `npm ci` が失敗する

| 原因 | 対処 |
| --- | --- |
| Install command がアプリ配下のまま | `cd ../.. && npm ci` に変更 |
| `package-lock.json` がルートに無い | リポジトリ直下に `package-lock.json` がコミットされているか確認 |

## デプロイトリガー

- `main` への push でプロダクション配信
- Preview branch を有効にしている場合、Pull Request 作成時に Preview Deployment が自動生成される

## 公開後

公開直後から 1 週間までの確認項目は [docs/post-launch-checklist.md](post-launch-checklist.md) を参照。
