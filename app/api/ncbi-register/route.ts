import { type NextRequest, NextResponse } from "next/server";
import { appendNCBIToSheet } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const registrationData = {
      timestamp: new Date().toISOString(),
      title: body.title,
      firstName: body.firstName,
      surName: body.surName,
      otherName: body.otherName || "",
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp, // Mapped from whatsapp in schema
      occupation: body.occupation,
      gender: body.gender,
      maritalStatus: body.maritalStatus,
      address: body.address,
      cfcCentre: body.cfcCentre,
      cfcCommunityChurch: body.cfcCommunityChurch,
      serviceTeam: body.serviceTeam,
      growthTrack: body.growthTrack,
      growthTrackYear: body.growthTrackYear || "",
      status: "pending",
    };

    await appendNCBIToSheet(registrationData);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to process registration. Please try again." },
      { status: 500 },
    );
  }
}
