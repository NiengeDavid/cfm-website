import Container from "@/components/container";
import CtaCards from "@/components/ctaCards";
import HeroCard from "@/components/heroCard";
import Ministries from "@/components/ministries";
import { leadershipDetails } from "@/data/leadershipDetails";

export default function LeadershipPage() {
  return (
    <div className="bg-bg w-full">
      <HeroCard
        title={leadershipDetails?.title}
        bgImage={leadershipDetails?.bgImage}
        center={leadershipDetails?.center}
      />
      <CtaCards ctaCards={leadershipDetails?.seniorPastors} isCard={false} />
      <div className="w-full bg-bg py-24 lg:py-36">
        <Container>
          <h2 className="w-fit mx-auto text-3xl text-center md:text-6xl font-bold border-b pb-3 border-primary-accent">
            Meet Our Resident Pastors
          </h2>
          <div className="w-full">
            <Ministries content={leadershipDetails?.residentPastors} />
          </div>
        </Container>
      </div>
    </div>
  );
}
