"use client";

import { useState, useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Camera, XCircle } from "lucide-react";

export default function ScannerPage() {
  const [scanning, setScanning] = useState(true);
  const [processing, setProcessing] = useState(false);
  const processingRef = useRef(false); // Prevent duplicate scans

  const handleScan = async (detectedCodes: any[]) => {
    // The library returns an array of detected codes
    const result = detectedCodes[0];

    // Prevent duplicate processing
    if (!result || processing || processingRef.current) return;

    const scannedText = result.rawValue;
    if (!scannedText) return;

    // Set both state and ref to prevent race conditions
    processingRef.current = true;
    setProcessing(true);
    setScanning(false); // Pause the scanner UI

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationCode: scannedText }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`✅ Welcome ${data.fullName}!`, {
          description: "Entry recorded successfully",
          duration: 5000,
        });
      } else {
        toast.error("❌ Entry Denied", {
          description: data.message,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Scan error:", error);
      toast.error("⚠️ Scan Failed", {
        description: "Please try again",
      });
    } finally {
      setProcessing(false);
      processingRef.current = false;

      // Resume scanning after 4 seconds
      setTimeout(() => {
        setScanning(true);
      }, 4000);
    }
  };

  const handleError = (error: any) => {
    console.error("Scanner error:", error);
    toast.error("Camera Error", { description: "Could not access camera" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center mb-4">
          <Camera className="w-10 h-10 text-purple-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">SOMA 2025</h1>
            <p className="text-gray-600">Entry Scanner</p>
          </div>
        </div>

        <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden mb-6">
          {scanning && !processing ? (
            <Scanner
              onScan={handleScan}
              onError={handleError}
              components={{
                onOff: false,
                torch: false,
                zoom: false,
                finder: true,
              }}
              styles={{
                container: { width: "100%", height: "100%" },
                video: { width: "100%", height: "100%", objectFit: "cover" },
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              {processing ? (
                <div className="text-center">
                  <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
                  <p className="text-white text-sm">Verifying entry...</p>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Camera paused</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 text-center font-medium">
            {processing
              ? "⏳ Verifying entry..."
              : scanning
                ? "📸 Position QR code within the frame"
                : "⏸️ Camera paused"}
          </p>

          <div className="flex gap-2">
            {scanning && !processing && (
              <Button
                onClick={() => setScanning(false)}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                Pause
              </Button>
            )}

            {!scanning && !processing && (
              <Button
                onClick={() => setScanning(true)}
                className="flex-1 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                Resume Scanning
              </Button>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Status:</span>
            <span className="flex items-center">
              {scanning && !processing ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Active
                </>
              ) : processing ? (
                <>
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                  Processing
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                  Paused
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
