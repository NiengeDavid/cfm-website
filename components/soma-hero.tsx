"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface SomaHeroProps {
  onCtaClick: () => void;
}

export default function SomaHero({ onCtaClick }: SomaHeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image / Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder for actual background image */}
        <div className="absolute inset-0 bg-[url('/assets/flyer.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

        {/* Decorative elements to mimic the lighting */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[100px] rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center h-full pt-20">
        <div className="animate-in fade-in zoom-in duration-1000 space-y-6 max-w-4xl">
          {/* Logo / Title Area */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-2 drop-shadow-2xl">
              SOMA
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/90 font-bold tracking-widest text-sm md:text-xl uppercase">
              <span className="h-[1px] w-12 bg-white/50 hidden md:block"></span>
              <span>State Of the Ministry</span>
              <span className="h-[1px] w-12 bg-white/50 hidden md:block"></span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight mt-2">
              AWARDS
            </h2>
          </div>

          {/* Date / Location Placeholder */}
          <div className="text-white/80 font-medium text-lg md:text-xl tracking-wide mb-8">
            <p>1st Jan. 2026 | Theatre of Faith | Gboko</p>
          </div>

          {/* Main CTA */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Registration Open Now.
            </h3>
            <Button
              onClick={onCtaClick}
              size="lg"
              className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              REGISTER NOW <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
