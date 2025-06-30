import CtaCards from "@/components/ctaCards";
import HeroCard from "@/components/heroCard";
import { leadershipDetails } from "@/data/leadershipDetails";

export default function LeadershipPage() {
  return (
    <div>
      <HeroCard
        title={leadershipDetails?.title}
        bgImage={leadershipDetails?.bgImage}
        center={leadershipDetails?.center}
      />
      <CtaCards ctaCards={leadershipDetails?.seniorPastors} isCard={false} />
    </div>
  );
}
