"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  BookOpen,
  ShieldAlert,
  Loader2,
} from "lucide-react";

interface PDFReaderProps {
  pdfUrl: string;
  title?: string;
  className?: string;
}

export default function PDFReader({ pdfUrl, title, className = "" }: PDFReaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load PDF.js engine
  useEffect(() => {
    let isMounted = true;

    async function loadPdfJs() {
      try {
        setLoading(true);
        setErrorMsg(null);

        if (typeof window !== "undefined" && !(window as any).pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = () => {
              const pdfjs = (window as any).pdfjsLib;
              if (pdfjs) {
                pdfjs.GlobalWorkerOptions.workerSrc =
                  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
              }
              resolve();
            };
            script.onerror = () => reject(new Error("Failed to load PDF engine"));
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) throw new Error("PDF Reader engine failed to load");

        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const loadedDoc = await pdfjsLib.getDocument(pdfUrl).promise;

        if (isMounted) {
          setPdfDoc(loadedDoc);
          setNumPages(loadedDoc.numPages);
          setActivePage(1);

          // Calculate initial scale to fit container width nicely
          if (scrollContainerRef.current) {
            const containerWidth = scrollContainerRef.current.clientWidth - 48;
            if (containerWidth > 300) {
              const page1 = await loadedDoc.getPage(1);
              const unscaledViewport = page1.getViewport({ scale: 1.0 });
              const calculatedScale = Math.min(
                Math.max(0.6, containerWidth / unscaledViewport.width),
                1.5
              );
              setScale(calculatedScale);
            }
          }
          setLoading(false);
        }
      } catch (err: any) {
        console.error("Error loading PDF:", err);
        if (isMounted) {
          setErrorMsg(err.message || "Failed to load document");
          setLoading(false);
        }
      }
    }

    if (pdfUrl) loadPdfJs();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);

  // Jump to page using scrollIntoView
  const scrollToPage = useCallback((pNum: number) => {
    const targetEl = pageRefs.current[pNum];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setActivePage(pNum);
    }
  }, []);

  // Track active page while scrolling using IntersectionObserver
  useEffect(() => {
    if (!scrollContainerRef.current || numPages === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageIndex = Number(entry.target.getAttribute("data-page-number"));
            if (pageIndex) {
              setActivePage(pageIndex);
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.3,
      }
    );

    Object.values(pageRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [numPages, loading]);

  // Keyboard navigation & security shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "S", "p", "P"].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        scrollToPage(Math.min(activePage + 1, numPages));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        scrollToPage(Math.max(activePage - 1, 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePage, numPages, scrollToPage]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleFitWidth = async () => {
    if (scrollContainerRef.current && pdfDoc) {
      const containerWidth = scrollContainerRef.current.clientWidth - 48;
      if (containerWidth > 0) {
        try {
          const page1 = await pdfDoc.getPage(1);
          const unscaledViewport = page1.getViewport({ scale: 1.0 });
          setScale(containerWidth / unscaledViewport.width);
        } catch {
          setScale(1.0);
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative flex flex-col w-full bg-secondary rounded-2xl border border-secondary/80 shadow-2xl overflow-hidden select-none ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "h-[900px]"
      } ${className}`}
    >
      {/* Top Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-secondary backdrop-blur-md border-b border-secondary/80 text-white gap-3 z-20 shadow-md">
        {/* Title */}
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="p-2 rounded-xl bg-red-500/40 text-red-300 border border-red-500/50">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-100 truncate max-w-[180px] sm:max-w-xs">
            {title || "PDF Document"}
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldAlert className="w-3 h-3 mr-1" />
            Protected Read-Only
          </span>
        </div>

        {/* Center: Page Navigation & Input Jump */}
        <div className="flex items-center space-x-1.5 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl shadow-inner">
          <button
            onClick={() => scrollToPage(Math.max(activePage - 1, 1))}
            disabled={activePage <= 1 || loading}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center text-xs font-semibold text-slate-300 font-mono px-1">
            <input
              type="number"
              min={1}
              max={numPages || 1}
              value={activePage}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (val >= 1 && val <= numPages) scrollToPage(val);
              }}
              className="w-10 bg-slate-900 border border-slate-700 text-center rounded-md text-white text-xs py-0.5 font-mono focus:outline-none focus:border-red-500"
            />
            <span className="mx-1 text-slate-500">/</span>
            <span>{numPages || 1}</span>
          </div>

          <button
            onClick={() => scrollToPage(Math.min(activePage + 1, numPages))}
            disabled={activePage >= numPages || loading}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Zoom & Fullscreen Controls */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => setScale((s) => Math.max(s - 0.15, 0.4))}
              disabled={loading}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-semibold text-slate-300 px-2 min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale((s) => Math.min(s + 0.15, 3.0))}
              disabled={loading}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleFitWidth}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fit Width"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Continuous Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="relative flex-1 w-full bg-slate-950/80 overflow-y-auto overflow-x-auto p-4 sm:p-8 space-y-10 flex flex-col items-center"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center my-auto space-y-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            <p className="text-sm font-medium">Preparing document viewer...</p>
          </div>
        )}

        {errorMsg && (
          <div className="flex flex-col items-center justify-center my-auto p-6 text-center max-w-md bg-red-950/40 border border-red-900/50 rounded-2xl">
            <ShieldAlert className="w-10 h-10 text-red-400 mb-2" />
            <p className="text-sm font-semibold text-red-200">Unable to load document</p>
            <p className="text-xs text-red-300/80 mt-1">{errorMsg}</p>
          </div>
        )}

        {!loading && pdfDoc && (
          Array.from({ length: numPages }, (_, idx) => idx + 1).map((pNum) => (
            <PDFCanvasPage
              key={pNum}
              pdfDoc={pdfDoc}
              pageNumber={pNum}
              scale={scale}
              ref={(el) => {
                pageRefs.current[pNum] = el;
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Subcomponent: Renders individual page canvas with exact full page dimensions
const PDFCanvasPage = React.forwardRef<
  HTMLDivElement,
  { pdfDoc: any; pageNumber: number; scale: number }
>(({ pdfDoc, pageNumber, scale }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  const [rendering, setRendering] = useState<boolean>(true);
  const [viewportDims, setViewportDims] = useState<{ width: number; height: number } | null>(null);

  // Synchronously fetch page viewport to reserve exact dimensions immediately
  useEffect(() => {
    let isMounted = true;
    async function loadPageViewport() {
      if (!pdfDoc) return;
      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        if (isMounted) {
          setViewportDims({
            width: Math.floor(viewport.width),
            height: Math.floor(viewport.height),
          });
        }
      } catch (err) {
        console.error(`Page ${pageNumber} viewport error:`, err);
      }
    }
    loadPageViewport();
    return () => {
      isMounted = false;
    };
  }, [pdfDoc, pageNumber, scale]);

  // Render canvas page safely with cancelable renderTask
  useEffect(() => {
    let isMounted = true;

    async function renderPage() {
      if (!pdfDoc || !canvasRef.current) return;

      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore cancel errors
        }
        renderTaskRef.current = null;
      }

      try {
        setRendering(true);
        const page = await pdfDoc.getPage(pageNumber);
        if (!isMounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const outputScale = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale });

        // Set backing canvas pixel resolution
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);

        // Set display CSS size to match full page viewport dimensions exactly
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          transform: transform,
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;

        await task.promise;

        if (isMounted) {
          setRendering(false);
        }
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error(`Page ${pageNumber} render error:`, err);
        }
      }
    }

    renderPage();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div
      ref={ref}
      data-page-number={pageNumber}
      className="relative flex flex-col items-center bg-white shadow-2xl shadow-black/60 rounded-md overflow-hidden border border-slate-700/50 my-2 shrink-0"
      style={
        viewportDims
          ? { width: `${viewportDims.width}px`, height: `${viewportDims.height + 28}px` }
          : { minHeight: "400px", minWidth: "300px" }
      }
    >
      <canvas
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className={`bg-white transition-opacity duration-200 block ${
          rendering ? "opacity-70" : "opacity-100"
        }`}
      />
      <div className="w-full bg-slate-900/90 backdrop-blur text-slate-400 text-[11px] py-1 text-center font-mono font-medium border-t border-slate-800 mt-auto">
        Page {pageNumber}
      </div>
    </div>
  );
});

PDFCanvasPage.displayName = "PDFCanvasPage";
