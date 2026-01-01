import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/lib/email-template";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      registrationCode,
      eventDate = "Thursday 1st January, 2026",
      eventTime = "5:30pm (WAT)",
      venue = "Theatre of Faith, Christ Family Center Gboko, Benue State",
      qrDataUri,
    } = body;

    // Read flyer as base64
    const flyerPath = path.join(process.cwd(), "public", "flyer.png");
    // Check if flyer exists, otherwise don't attach it or use a placeholder logic if needed.
    // For now we assume it might not exist, so we wrap in try/catch or just let it fail if the user expects it.
    // However, to prevent 500 errors if missing, let's check.
    let flyerBuffer: Buffer | undefined;
    try {
      if (fs.existsSync(flyerPath)) {
        flyerBuffer = fs.readFileSync(flyerPath);
      }
    } catch (e) {
      console.warn("Flyer not found");
    }

    // Convert QR code data URI to buffer
    const qrBase64 = qrDataUri.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrBase64, "base64");

    const attachments = [
      {
        filename: "qrcode.png",
        content: qrBuffer as any,
        contentId: "qrcode",
      },
    ];

    if (flyerBuffer) {
      attachments.push({
        filename: "flyer.jpeg",
        content: flyerBuffer as any,
        contentId: "flyer",
      });
    }

    const data = await resend.emails.send({
      from: "SOMA 2025 Team <soma.registration@theconclave.com.ng>",
      to: email,
      subject: "CONGRATULATIONS!!! YOU'RE REGISTERED FOR SOMA",
      react: EmailTemplate({
        firstName: firstName,
        registrationCode,
        eventDate,
        eventTime,
        venue,
        flyerUrl: flyerBuffer ? "cid:flyer" : undefined,
        qrDataUri: "cid:qrcode",
      }),
      attachments,
      replyTo: "SOMA 2025 Coordinator <isaac.ikyurior@gmail.com>",
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
