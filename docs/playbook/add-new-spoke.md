# 新スポーク追加 Playbook

`game.fujioha.com` や `hokkaido.fujioha.com` のような **ハブ** から飛んだ先の、個別のゲーム・サイトを **スポーク** と呼びます。このドキュメントは新しいスポークを追加する標準手順です。

---

## 用語

| 用語 | 意味 | 例 |
|---|---|---|
| **ハブ (hub)** | 一覧・カテゴリページ。本リポジトリの `apps/*` 配下 | `apps/game`, `apps/hokkaido` |
| **スポーク (spoke)** | ハブからリンクされる個別の独立サイト/ゲーム。独立リポジトリ | `palette` (color-sense), `omote-navi` (chitose-sapporo) |
| **レジストリ** | ハブが読むスポーク定義の JSON 群 | `apps/<hub>/src/content/<collection>/*.json` |

## 設計原則（守ること）

1. **1スポーク = 1 リポジトリ = 1 サブドメイン**: 例 `color-sense.fujioha.com`
2. **パスベース統合は禁止**: `game.fujioha.com/color-sense` のような同一オリジン相乗りはしない。理由はオリジン分離によるセキュリティ・運用上の利益（XSS隔離、Service Worker のスコープ衝突回避、Cookie漏洩防止、ブラスト半径限定）
3. **ネストサブドメイン (`color-sense.game.fujioha.com`) は使わない**: Cloudflare Universal SSL が `*.fujioha.com` までしか覆わないため
4. **スポーク同士は知らない関係**: 共有はあくまで `@fujioha/ui` / `@fujioha/tokens` 経由

---

## 手順

### 1. スポークリポジトリを作る

スタックは自由（Astro / Vite / Next.js / Phaser / 純粋HTML、なんでも可）。以下だけ満たす:

- **Node 22+ で `npm ci && npm run build`** が成功する
- ビルド出力ディレクトリは **`dist/`**
- `_headers` ファイルでセキュリティヘッダを設定
- `@fujioha/ui` または `@fujioha/tokens` を取り込んでブランド一貫性を確保（任意だが推奨）

```bash
gh repo create fuji18/<spoke-name> --private --clone
cd <spoke-name>
# プロジェクト初期化(例: vite)
npm create vite@latest . -- --template vanilla-ts
```

`_headers` の例:

```
/*
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### 2. Cloudflare Pages に接続

1. Cloudflare ダッシュボード → **Workers & Pages** → 「Pages プロジェクトを作成」
2. **GitHub から接続** → リポジトリを選択
3. ビルド設定:
   - **プロダクションブランチ**: `main`
   - **ビルドコマンド**: `npm ci && npm run build`
   - **ビルド出力**: `dist`
   - **ルートディレクトリ**: `/`（リポジトリルート）
4. 環境変数: `NODE_VERSION=22`
5. 「保存してデプロイ」

初回ビルドが緑になることを確認。

### 3. カスタムドメインを設定

1. Pages プロジェクト → **カスタム ドメイン** → 「カスタム ドメインを設定」
2. `<spoke-name>.fujioha.com` を入力
3. Cloudflare DNS で `fujioha.com` ゾーンを管理しているため、CNAME は自動追加される
4. SSL 発行待ち（通常 1〜5 分）
5. https://<spoke-name>.fujioha.com で表示確認

### 4. レジストリにスポークを登録

このリポジトリ (`fujioha-platform`) に PR を出します。

#### ゲームの場合: `apps/game/src/content/games/<id>.json`

スキーマ: `apps/game/src/content/config.ts` を参照。

```json
{
  "id": "<id>",
  "jp": "日本語のゲーム名",
  "en": "English name",
  "genre": "パズル",
  "genreEn": "Puzzle",
  "time": "~1 min",
  "tag": "new",
  "icon": "palette",
  "hue": "#c79ad6",
  "url": "https://<id>.fujioha.com",
  "status": "published",
  "featured": false,
  "publishedAt": "2026-05-31"
}
```

フィールドの意味:

| フィールド | 必須 | 説明 |
|---|---|---|
| `id` | ✅ | 英小文字とハイフンのみ。ファイル名と一致させる |
| `tag` | | `"new"` / `"wip"` / `null` |
| `icon` | ✅ | `kanji`/`clock`/`map`/`rhythm`/`palette` のいずれか。新規追加は `GameIcon.astro` に SVG を実装してから |
| `hue` | ✅ | アクセント色 (`#rrggbb`) |
| `url` | | スポークURL。未デプロイなら `null` |
| `status` | ✅ | `published` のみが一覧に表示される |
| `featured` | | トップ目立たせ表示用 |

#### 北海道サイト (姉妹サイト) の場合: `apps/hokkaido/src/content/companions/<id>.json`

スキーマ: `apps/hokkaido/src/content/config.ts` を参照。

```json
{
  "id": "<id>",
  "jp": "日本語のサイト名",
  "en": "English name",
  "lead": "日本語の説明文 (1〜2行)",
  "leadEn": "Short English description",
  "area": "chitose",
  "url": "https://<id>.fujioha.com",
  "hue": "#7fb0d6",
  "status": "published",
  "publishedAt": "2026-05-31"
}
```

`area` は `sapporo`/`chitose`/`asahikawa`/`hakodate`/`kushiro`/`shiretoko`/`furano`/`other` のいずれか。

### 5. PR を作る・マージする

```bash
git checkout -b add-spoke-<id>
# JSONファイル追加
git add apps/<hub>/src/content/<collection>/<id>.json
git commit -m "registry: add <id> to <hub>"
git push origin add-spoke-<id>
gh pr create --fill
```

CI でスキーマバリデーション (`npm run typecheck`) が通ることを確認 → マージ。マージで該当ハブの Cloudflare Pages が自動再デプロイされ、一覧に新スポークが表示される。

---

## 動作確認チェックリスト

リリース前に必ず:

- [ ] スポーク URL に直接アクセスして表示される
- [ ] HTTPS で配信されている (SSL 発行済み)
- [ ] `_headers` の CSP が機能している（DevTools Console にエラーが出ない範囲で）
- [ ] Lighthouse スコア: Performance / Accessibility / Best Practices / SEO すべて 90+
- [ ] スマホ表示が崩れていない
- [ ] localStorage / Cookie に PII を保存していない
- [ ] 外部スクリプトを読んでいる場合、サブリソース完全性 (SRI) を検討
- [ ] ハブのトップに新スポークのカードが表示される
- [ ] ハブからのリンクが新規タブで開く (target="_blank" rel="noopener noreferrer")

---

## トラブルシュート

| 症状 | 対処 |
|---|---|
| ハブに表示されない | レジストリJSONの `status: "published"` か確認、該当ハブの Pages を手動再デプロイ |
| SSL未発行 (ERR_CERT) | Cloudflare DNS で CNAME が刺さっているか確認、最大 15 分待つ |
| 一部のリソースが CSP で blocked | スポーク側の `_headers` を見直す |
| ハブのビルドが失敗 | JSON スキーマ違反の可能性。`apps/<hub>/src/content/config.ts` の zod 定義と照合 |
| `getCollection` の型がでない | `astro sync` を一度走らせる: `npm run astro -- sync --workspace=@fujioha/<hub>` |

---

## スケール時の自動化（参考）

スポークが 10 を超えたら検討:

- **テンプレートリポジトリ** `fujioha-spoke-template` を作り、`gh repo create --template` で即座にスポーク雛形を生成
- **Terraform Cloudflare Provider** で Pages プロジェクト/DNS/カスタムドメインをコード化
- **Renovate** を全スポークに自動配布して依存更新を自動化
- **Changesets** で `@fujioha/ui` のバージョン管理と自動 publish

---

## 参考: なぜこの構成か

- **同一オリジン相乗り (`game.fujioha.com/color-sense`) を避ける理由**: XSS の被害が全スポークに波及、Service Worker のスコープ衝突、Cookie 漏洩、ブラスト半径拡大
- **ネスト (`color-sense.game.fujioha.com`) を避ける理由**: Cloudflare Universal SSL が wildcard 2 段に対応していない (Advanced Certificate Manager は有料)
- **フラットなサブドメイン (`color-sense.fujioha.com`) を選ぶ理由**: 無料SSL、独立デプロイ、独立スタック、独立ブランド、SEO/レピュテーション隔離
