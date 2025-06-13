import HeroCard from "@/components/heroCard";
import LatestSermon from "@/components/latestSermon";
import LiveStream from "@/components/livestream";
import { homeDetails } from "@/data/homeDetails";
import { livestreamItems } from "@/data/livestream";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroCard bgImage={homeDetails?.bgImage} title={homeDetails?.title} />
      <div className="w-full">
        <LatestSermon data={homeDetails?.latestSermon} />
      </div>
      <LiveStream items={livestreamItems} />
    </div>
  );
}
