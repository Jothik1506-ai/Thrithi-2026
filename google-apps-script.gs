function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations") ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet("Registrations");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Mobile Number",
        "Email ID",
        "Institution Name",
        "Event Name",
        "Amount"
      ]);
    }

    var data = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.mobileNumber || "",
      data.emailId || "",
      data.institutionName || "",
      data.eventName || "",
      data.amount || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
