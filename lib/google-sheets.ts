import { google } from "googleapis";

interface RegistrationRow {
  timestamp: string;
  title: string;
  firstName: string;
  surName: string;
  phone: string;
  email: string;
  center: string;
  maritalStatus: string;
  spouse: string;
  registrationCode: string;
  status: string;
}

async function getSheetClient() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set",
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(serviceAccountKey),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendToSheet(row: RegistrationRow) {
  const sheets = await getSheetClient();
  const sheetId = process.env.SHEET_ID;

  if (!sheetId) {
    throw new Error("SHEET_ID environment variable is not set");
  }

  const values = [
    [
      row.timestamp,
      row.title,
      row.firstName,
      row.surName,
      row.phone,
      row.email,
      row.center,
      row.maritalStatus,
      row.spouse,
      row.registrationCode,
      "pending",
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:K",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw new Error("Failed to save registration to database");
  }
}

export interface NCBIRegistrationRow {
  timestamp: string;
  title: string;
  firstName: string;
  surName: string;
  otherName: string;
  email: string;
  phone: string;
  whatsapp: string;
  occupation: string;
  gender: string;
  maritalStatus: string;
  address: string;
  cfcCentre: string;
  cfcCommunityChurch: string;
  serviceTeam: string;
  growthTrack: string;
  growthTrackYear: string;
  status: string;
}

export async function appendNCBIToSheet(row: NCBIRegistrationRow) {
  const sheets = await getSheetClient();
  const sheetId = process.env.NCBI_SHEET_ID;

  if (!sheetId) {
    throw new Error("NCBI_SHEET_ID environment variable is not set");
  }

  const values = [
    [
      row.timestamp,
      row.title,
      row.firstName,
      row.surName,
      row.otherName,
      row.email,
      row.phone,
      row.whatsapp,
      row.occupation,
      row.gender,
      row.maritalStatus,
      row.address,
      row.cfcCentre,
      row.cfcCommunityChurch,
      row.serviceTeam,
      row.growthTrack,
      row.growthTrackYear,
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:Q",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw new Error("Failed to save registration to database");
  }
}
