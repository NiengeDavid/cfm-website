import GenCarousel from "@/components/carousel";
import EventsCarousel from "@/components/eventsCarousel";
import HeroCard from "@/components/heroCard";
import LatestSermon from "@/components/latestSermon";
import LiveStream from "@/components/livestream";
import Partnership from "@/components/partnership";
import RelevantChurch from "@/components/relevantChurch";
import ResourcesSection from "@/components/resourceSection";
import SeniorPastors from "@/components/seniorPastors";
import { homeDetails } from "@/data/homeDetails";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroCard bgImage={homeDetails?.bgImage} title={homeDetails?.title} />
      <div className="w-full">
        <LatestSermon data={homeDetails?.latestSermon} />
      </div>
      <LiveStream items={homeDetails?.livestreamItems} />
      <SeniorPastors seniorPastors={homeDetails?.seniorPastors} />
      <RelevantChurch data={homeDetails?.relevantChurch} />
      <ResourcesSection resources={homeDetails?.resources} />
      <EventsCarousel events={homeDetails?.events} />
      <Partnership />
    </div>
  );
}
