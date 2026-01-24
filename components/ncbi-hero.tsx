"use client";

import { Button } from "@/components/ui/button";

interface NcbiHeroProps {
  onCtaClick?: () => void;
}

export default function NcbiHero({ onCtaClick }: NcbiHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-orange-500 min-h-[500px] flex items-center justify-center p-4 md:p-12">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-orange-400/20 transform skew-x-12" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-800/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 w-full max-w-6xl">
        {/* Left Badge - Training You */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
          <div className="bg-orange-500 text-white p-8 rounded-3xl shadow-2xl transform -rotate-3 border-4 border-yellow-400 relative max-w-sm">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 rounded-full p-3 border-4 border-white shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-open"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xl font-bold mb-1">
                TRAINING <span className="font-black">YOU</span> FOR
              </p>
              <p className="text-lg">
                A LIFE OF{" "}
                <span className="font-extrabold text-3xl block text-yellow-100 drop-shadow-md my-1">
                  HAPPINESS,
                </span>
              </p>
              <p className="font-bold text-xl">SUCCESS AND IMPACT!</p>
            </div>
          </div>
        </div>

        {/* Right Content - Title & Levels */}
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-white leading-[0.9] drop-shadow-xl uppercase">
            TOTAL MAN
            <br />
            DEVELOPMENT
            <br />
            PROGRAM
          </h1>

          {/* Levels Box */}
          <div className="bg-indigo-950/90 text-white p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-sm border-l-4 border-orange-500 text-left w-full max-w-lg">
            <ul className="space-y-2 text-sm md:text-base font-semibold tracking-wide">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span> LEVEL 1 - School of
                the New Life
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span> LEVEL 2 - School of
                the Local Church
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span> LEVEL 3 - School of
                Christ Centered Culture
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span> LEVEL 4 - School of
                Christ Centered Leadership
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span> LEVEL 5 - School of
                Christ Faith Base-Enterprenuership
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
