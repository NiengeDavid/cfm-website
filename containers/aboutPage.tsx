import CtaCards from "@/components/ctaCards";
import HeroCard from "@/components/heroCard";
import { aboutDetails } from "@/data/aboutDetails";

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <HeroCard
        bgImage={aboutDetails?.bgImage}
        title={aboutDetails?.title}
        center={aboutDetails?.center}
      />
      <CtaCards ctaCards={aboutDetails?.visionMission} />
    </div>
  );
}
