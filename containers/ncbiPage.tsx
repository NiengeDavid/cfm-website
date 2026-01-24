"use client";

import NcbiHero from "@/components/ncbi-hero";
import NcbiRegistrationForm from "@/components/ncbi-registration-form";

export default function NcbiPage() {
  return (
    <main className="min-h-screen bg-background">
      <NcbiHero />
      <div className="bg-background mb-12 md:mb-24">
        <NcbiRegistrationForm />
      </div>
    </main>
  );
}
