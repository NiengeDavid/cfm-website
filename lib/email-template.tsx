import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  registrationCode: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  flyerUrl?: string;
  qrDataUri?: string;
}

export function EmailTemplate({
  firstName,
  registrationCode,
  eventDate,
  eventTime,
  venue,
  flyerUrl,
  qrDataUri,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        {flyerUrl && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={flyerUrl}
              alt="SOMA 2025 Flyer"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          Welcome to the State of the Ministry Awards (SOMA) & Dinner Night 2025
        </h1>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          Hi <strong>{firstName}</strong>,
        </p>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          Congratulations on being registered to be a part of SOMA 2025.
        </p>

        <h3
          style={{
            color: "#2c3e50",
            fontSize: "18px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Please take note of the following important details for the event:
        </h3>

        <p style={{ margin: "10px 0", color: "#34495e" }}>
          <strong>1. Date:</strong> {eventDate}
        </p>
        <p style={{ margin: "10px 0", color: "#34495e" }}>
          <strong>2. Time:</strong> {eventTime}
        </p>
        <p style={{ margin: "10px 0", color: "#34495e" }}>
          <strong>3. Venue:</strong> {venue}
        </p>

        <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
          4. Attendance & Punctuality
        </h4>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          SOMA 2025 starts with a Red Carpet and Photography session by 5:30pm
          prompt.
        </p>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          Punctuality is very important as the event will start promptly at the
          stated time.
        </p>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          Please arrive early at the venue to complete your check-in and settle
          before sessions begin.
        </p>

        <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
          5. Access & Entry
        </h4>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          Each participant has been assigned a unique QR code and passcode.
          These credentials are strictly personal and non-transferable. Your QR
          code grants you quick entry at the venue gate — please have it ready
          upon arrival.
        </p>

        {qrDataUri && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src={qrDataUri}
              alt="QR Code"
              style={{
                maxWidth: "200px",
                height: "auto",
                margin: "0 auto",
                display: "block",
              }}
            />
          </div>
        )}

        <div
          style={{
            backgroundColor: "#e8f4f8",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            margin: "20px 0",
            border: "2px dashed #3498db",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "16px",
              color: "#34495e",
            }}
          >
            Your Assigned Passcode:
          </p>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#e74c3c",
              margin: "10px 0",
              letterSpacing: "2px",
            }}
          >
            {registrationCode}
          </p>
        </div>

        <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
          6. Seating Arrangement:
        </h4>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          Each Table is numbered to accommodate 10 persons and your table number
          has been sent to you via WhatsApp or SMS directly from the Coordinator
          of the event.
        </p>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          Do well to coorperate with the Ushers as they assist you to your
          table.
        </p>

        <h4 style={{ margin: "20px 0 10px 0", color: "#2c3e50" }}>
          7. Dresscode:
        </h4>
        <p style={{ color: "#34495e", lineHeight: "1.6" }}>
          Black or Royal Blue Suit for the Gents while Black or Gold Gown for
          the ladies.
        </p>

        <p
          style={{
            color: "#34495e",
            fontSize: "16px",
            lineHeight: "1.6",
            backgroundColor: "#fff3cd",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ffc107",
            marginTop: "20px",
          }}
        >
          Kindly note that <strong>CHILDREN are NOT ALLOWED</strong> to attend
          this event.
        </p>

        <p
          style={{
            color: "#34495e",
            fontSize: "16px",
            lineHeight: "1.6",
            marginTop: "20px",
          }}
        >
          As stated earlier, this event is an exclusive meeting. You have been
          assigned a passcode. Please note, it admits only you and it is
          non-transferable.
        </p>

        <p style={{ color: "#34495e", fontSize: "16px", lineHeight: "1.6" }}>
          Save this information securely. We look forward to having you at SOMA
          2025.
        </p>

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <p style={{ margin: "5px 0", color: "#34495e", fontWeight: "bold" }}>
            Pastor Isaac Ikyurior,
          </p>
          <p style={{ margin: "5px 0", color: "#7f8c8d", fontSize: "14px" }}>
            Coordinator, SOMA 2025
          </p>
        </div>
      </div>
    </div>
  );
}
