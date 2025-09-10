import GiveCard from "@/components/giveCard";
import GiveForm from "@/components/giveForm";
import HeroCard from "@/components/heroCard";
import { giveDetails } from "@/data/giveDetails";

export default function GivePage() {
  return (
    <div className="w-full bg-bg">
      <HeroCard
        title={giveDetails?.title}
        bgImage={giveDetails?.bgImage}
        center={giveDetails?.center}
      />
      <GiveCard data={giveDetails.giveCardData} />
      <GiveForm />
    </div>
  );
}
