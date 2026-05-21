# イベントカルテ（イベカル）

イベント準備診断サービス — イベントの不安を、準備リストと実行手順に変える。

公開URL: https://kneogf.github.io/event-diagnosis/

---

## サービス概要

- **対象**: 初めてイベントを主催する有志・コミュニティオーナー
- **入力**: 3問の質問（イベントタイプ・キャパ・会場タイプ）+ 任意の詳細2問
- **出力**: 必要機材リスト・主要リスク・会場確認リスト・スタッフ配置案・PDF出力
- **対応イベントタイプ**: トーク / 映画上映 / 音楽・DJ（順次拡張予定）

## ブランド

- **正式名**: イベントカルテ
- **愛称**: イベカル
- **運営**: JustForFun株式会社

### カラーパレット

| 用途 | カラー | 値 |
|------|--------|-----|
| Primary（見出し・本文） | Deep Navy | `#061A3D` |
| Accent 1（CTA・チェック） | Teal | `#10B8B8` / `#0EA5A0` |
| Accent 2（リスク・差し色） | Coral | `#FF5A45` |
| Background | Warm White | `#FAFAF7` |
| Card | White | `#FFFFFF` |
| Border | Light Gray Blue | `#E5EAF0` |

### タイポグラフィ

- 日本語: Noto Sans JP（Google Fonts）
- 数値・英字: Inter

---

## ファイル構成

```
06_PROJECTS/EVENT_DIAGNOSIS/
├── README.md                       # このファイル
├── index.html                      # LP + 診断ツール本体（自己完結HTML）
├── apps_script.gs                  # 問い合わせ受信用のGoogle Apps Scriptコード
├── assets/
│   ├── README.md                   # アセット配置ガイド
│   └── logo.png                    # ロゴ画像（要配置）
├── docs/
│   └── APPS_SCRIPT_SETUP.md        # 問い合わせフォーム→スプレッドシート連携手順
└── rules/
    └── diagnosis_rules.md          # 診断ルール定義の人間可読版
```

---

## LPセクション構成

| # | セクション | 役割 |
|---|----------|------|
| 1 | Hero | ファーストインプレッション・主要CTA |
| 2 | Problem | 「音が出ない」「映らない」など失敗の具体像 |
| 3 | Solution | 3軸のベネフィット（機材／会場／タイムライン） |
| 4 | Flow | 3ステップの使い方 |
| 5 | Result Preview | 診断結果のサンプル表示 |
| 6 | Event Types | 対応イベントタイプ一覧 |
| 7 | Plans | 規模別の準備レベル提案（Min/Std/Pro） |
| 8 | Paid Review | 有料レビュー3プラン（Light/Standard/Pro） |
| 9 | FAQ | よくある質問 |
| 10 | Form | 診断フォーム本体（3問必須+詳細2問） |
| 11 | Result | 診断結果表示（診断後にreveal） |
| 12 | Contact | 問い合わせフォーム（DB送信） |
| 13 | Final CTA | 最終クロージング |

---

## 動作確認

ブラウザで `index.html` を直接開くか、公開URLにアクセス。
3パターン（トーク・映画上映・音楽）+ 屋外・物販・配信などのオプションで診断が出ることを確認。

問い合わせフォームは Google Apps Script 経由で Google Sheets に行追加されます。
**初回セットアップ必須**: [docs/APPS_SCRIPT_SETUP.md](docs/APPS_SCRIPT_SETUP.md)

---

## ロゴ画像の配置

`assets/logo.png` に「イベントカルテ」ロゴ画像を配置してください。配置されていない場合はSVGで描画された簡易ロゴが表示されます。

詳細は [assets/README.md](assets/README.md) 参照。

---

## 更新ログ

| 日付 | 内容 |
|------|------|
| 2026-05-18 | v0.1 — JFF イベント診断ツールとして公開 |
| 2026-05-18 | v0.2 — LPセクション拡張・問い合わせフォーム+Apps Script連携 |
| 2026-05-18 | v0.3 — 「イベントカルテ」へ全面ブランドリニューアル（Navy/Teal/Coral、10セクション構成） |
