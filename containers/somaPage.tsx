"use client";

import { useRef } from "react";
import SomaHero from "@/components/soma-hero";
import SomaRegistrationForm from "@/components/soma-registration-form";

export default function SomaPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background">
      <SomaHero onCtaClick={scrollToForm} />
      <div ref={formRef} className="bg-background">
        <SomaRegistrationForm />
      </div>
    </main>
  );
}
