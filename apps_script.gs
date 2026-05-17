// ============================================================================
// JFF イベント診断ツール — 問い合わせ受信 Apps Script
// ============================================================================
// セットアップ手順: docs/APPS_SCRIPT_SETUP.md を参照
//
// このスクリプトは index.html の問い合わせフォームからPOSTを受け取り、
// アクティブなスプレッドシートに行を追加します。
//
// スプレッドシートの1行目には以下のヘッダーを設定してください:
//   timestamp / name / email / message / eventType / capacity / venueType
//   / env / options / eventDate / diagnosis_summary / user_agent / referrer
// ============================================================================

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
