import HeroCard from "@/components/heroCard";
import PartnershipCTA from "@/components/partnershipCTA";
import { partnershipDetails } from "@/data/partnershipDetails";
import { PartnerForm } from "@/components/partnerForm";
import { giveDetails } from "@/data/giveDetails";
import GiveCard from "@/components/giveCard";

export default function PartnershipPage() {
  return (
    <div className="w-full bg-bg">
      <HeroCard
        title={partnershipDetails?.title}
        bgImage={partnershipDetails?.bgImage}
        center={partnershipDetails?.center}
      />
      <PartnershipCTA
        heading={partnershipDetails?.cta?.heading}
        paragraphs={partnershipDetails?.cta?.paragraphs}
        brochureUrl={partnershipDetails?.cta?.brochureUrl}
        image={partnershipDetails?.cta?.image}
        className="bg-bg"
      />
      <GiveCard data={partnershipDetails?.giveCardData} />
      <PartnerForm />
    </div>
  );
}
