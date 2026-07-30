"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import PDFReader from "./pdfReader";

interface PDFReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
}

export default function PDFReaderModal({
  isOpen,
  onClose,
  title,
  pdfUrl,
}: PDFReaderModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    openerRef.current = document.activeElement as HTMLElement | null;

    const focusInitialElement = () => {
      closeButtonRef.current?.focus();
    };

    const getFocusableElements = () => {
      const dialog = dialogRef.current;
      if (!dialog) return [] as HTMLElement[];

      return Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") && element.tabIndex !== -1,
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        e.preventDefault();
        focusInitialElement();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (
          !activeElement ||
          activeElement === firstFocusable ||
          !dialogRef.current?.contains(activeElement)
        ) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else if (
        !activeElement ||
        activeElement === lastFocusable ||
        !dialogRef.current?.contains(activeElement)
      ) {
        e.preventDefault();
        firstFocusable.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(focusInitialElement, 0);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);

      const opener = openerRef.current;
      openerRef.current = null;
      if (opener && typeof opener.focus === "function") {
        window.setTimeout(() => opener.focus(), 0);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} PDF reader`}
    >
      <div className="relative flex flex-col w-full max-w-6xl h-[94vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Close Button Overlay */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close reader modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded Canvas Reader */}
        <div className="w-full h-full">
          <PDFReader
            pdfUrl={pdfUrl}
            title={title}
            className="h-full border-0 rounded-none"
          />
        </div>
      </div>
    </div>
  );
}
