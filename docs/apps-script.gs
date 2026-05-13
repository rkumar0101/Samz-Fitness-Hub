/**
 * Samz Fitness Hub — Google Sheets leads webhook
 * --------------------------------------------------------------
 * Paste this entire file into your Apps Script project
 * (Sheet → Extensions → Apps Script), save, then deploy:
 *   1. Click "Deploy" → "Manage deployments"
 *   2. If a deployment already exists, click the pencil icon to
 *      edit it; otherwise click "New deployment".
 *   3. Type: "Web app"
 *      Execute as: "Me"
 *      Who has access: "Anyone"
 *   4. Deploy. The Web app URL stays the same across edits as
 *      long as you update an existing deployment (instead of
 *      creating a brand new one).
 *   5. Copy the Web app URL into the SHEETS_WEBHOOK_URL env var.
 *
 * Expected columns in row 1 of the sheet:
 *   Timestamp | Source | Name | Phone | Branch / Area | Message | Goal | Consent
 */

// Optional: pin a specific tab name. Leave as "" to use the first tab.
const SHEET_NAME = "";

function getTargetSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (SHEET_NAME) {
    const named = ss.getSheetByName(SHEET_NAME);
    if (named) return named;
  }
  return ss.getSheets()[0];
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) || "{}";
    const body = JSON.parse(raw);

    const sheet = getTargetSheet();
    sheet.appendRow([
      new Date(), // Timestamp (local to script timezone)
      body.source || "",
      body.name || "",
      body.phone || "",
      body.branch || body.area || "",
      body.message || "",
      body.goal || "",
      body.consent ? "Yes" : ""
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

function doGet() {
  // Simple health check — open the Web app URL in a browser to see this.
  return ContentService
    .createTextOutput("Samz Fitness Hub leads webhook is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
