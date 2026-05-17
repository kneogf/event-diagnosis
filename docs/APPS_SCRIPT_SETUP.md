# Apps Script + Google Sheets セットアップ手順

このイベント診断ツールの問い合わせフォーム送信先（DB）を設定する手順です。**所要時間 約10分**。

設定後、フォーム送信のたびに指定したGoogleスプレッドシートに自動で行が追加されます。

---

## 完成イメージ

```
Googleスプレッドシート（DB代わり）
┌──────────────┬─────────┬─────────────────┬────────┬──────────┬───────┬──────┬───────────────┐
│ timestamp    │ name    │ email           │message │eventType │capacity│venue│ diagnosis_sum │
├──────────────┼─────────┼─────────────────┼────────┼──────────┼───────┼──────┼───────────────┤
│ 2026/5/18 ...│ 山田太郎│ yamada@a.com    │ 上映会..│ 映画上映 │ 81-200│カフェ│ 機材10/リスク7│
└──────────────┴─────────┴─────────────────┴────────┴──────────┴───────┴──────┴───────────────┘
```

---

## ステップ1: Googleスプレッドシートを作成

1. [Google Sheets](https://sheets.google.com) を開く
2. 新規シートを作成。名前を `JFF イベント診断 - 問い合わせ` などに
3. **1行目のヘッダー**を以下のように設定（コピペでOK）：

```
timestamp	name	email	message	eventType	capacity	venueType	env	options	eventDate	diagnosis_summary	user_agent	referrer
```

タブ区切りで貼り付ければ自動で各列に入ります。

4. スプレッドシートのURLをメモ。`https://docs.google.com/spreadsheets/d/【ここがシートID】/edit` の太字部分が **シートID**。

---

## ステップ2: Apps Script を設定

1. スプレッドシートの上部メニュー **拡張機能 > Apps Script** をクリック
2. デフォルトの `function myFunction() { ... }` を全削除
3. 下記コードを貼り付け（[`apps_script.gs`](../apps_script.gs) と同じ内容）：

```javascript
// JFF イベント診断 — 問い合わせ受信 Apps Script
// このファイルは index.html の問い合わせフォームからPOSTを受け取り、
// スプレッドシートに行を追加します。

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const p = e.parameter || {};

    sheet.appendRow([
      p.timestamp || new Date().toISOString(),
      p.name || "",
      p.email || "",
      p.message || "",
      p.eventType || "",
      p.capacity || "",
      p.venueType || "",
      p.env || "",
      p.options || "",
      p.eventDate || "",
      p.diagnosis_summary || "",
      p.user_agent || "",
      p.referrer || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GETでアクセスされたとき（疎通確認用）
function doGet() {
  return ContentService
    .createTextOutput("JFF Event Diagnosis Contact API — POSTで送信してください")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. プロジェクト名を **JFF Contact API** などに変更
5. 上部 **保存** ボタン（💾）をクリック

---

## ステップ3: ウェブアプリとしてデプロイ

1. 右上の **デプロイ > 新しいデプロイ** をクリック
2. 左上の歯車アイコン > **ウェブアプリ** を選択
3. 設定:
   - **説明**: `JFF Contact API v1`（任意）
   - **次のユーザーとして実行**: `自分（あなたのアカウント）`
   - **アクセスできるユーザー**: **全員** ← 重要
4. **デプロイ** をクリック
5. 初回は権限承認画面が出ます:
   - 「アクセスを承認」→ アカウント選択 → 「詳細」→「JFF Contact API（安全ではないページ）に移動」→「許可」
6. デプロイ完了後、**ウェブアプリのURL** が表示されます。これをコピー（例: `https://script.google.com/macros/s/AKfycby.../exec`）

---

## ステップ4: index.htmlに送信先URLを設定

1. `index.html` を開く
2. ファイル冒頭の `<script>` ブロック内の以下の行を編集：

```javascript
const APPS_SCRIPT_URL = "REPLACE_WITH_DEPLOYED_APPS_SCRIPT_URL";
```

を、ステップ3でコピーしたURLに置き換えます：

```javascript
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";
```

3. 保存して `git push`：

```bash
cd /Users/kyosuke/Claude-Workspace/JustForFun/06_PROJECTS/EVENT_DIAGNOSIS
git add index.html
git commit -m "Apps ScriptデプロイURLを設定"
git push
```

---

## ステップ5: 動作確認

1. https://kneogf.github.io/event-diagnosis/ を開く（数十秒待ってからリロード）
2. テストで診断 → 問い合わせフォームを入力 → 「送信する」
3. スプレッドシートを開く → テスト送信が1行追加されていればOK

---

## トラブルシューティング

| 症状 | 対処 |
|------|------|
| スプレッドシートに何も追加されない | デプロイURLが正しいか確認。Apps Scriptの「実行ログ」（左メニュー > 実行数）でエラーをチェック |
| 「送信に失敗しました」と画面に表示 | `mode: "no-cors"`設定でレスポンスが読めないため、ブラウザ側のネットワーク制限の可能性。コンソールエラーを確認 |
| Apps Scriptを更新後、反映されない | デプロイし直し（**デプロイ > デプロイを管理 > 編集アイコン > 新しいバージョン > デプロイ**）が必要 |
| URLが変わってしまった | 「新しいデプロイ」ではなく「既存デプロイの編集」で更新すればURL不変 |

---

## セキュリティ・運用上の注意

- **Apps Script URLは推測されにくいが公開URL**です。誰でもPOSTでき、シートに行を追加できます。
- スパム送信対策が必要になったら、Apps Script側でCAPTCHA・レート制限・メアド検証などを追加してください。
- 個人情報を扱う本番運用時は、利用規約・プライバシーポリシーの整備を推奨。
- スプレッドシート閲覧権限は、JustForFunの担当者のみに絞ること。

---

## 拡張アイデア

- 送信時にSlackチャンネルへも通知（Apps Script内で `UrlFetchApp.fetch(slackWebhookUrl, ...)` を呼ぶ）
- メールで管理者にも通知（`MailApp.sendEmail(...)`）
- スプレッドシートに日次集計シートを作って、自動でグラフ化
- 重複送信検知（同一メアドが短時間に複数回送ったら警告）
