import EventsCarousel from "@/components/eventsCarousel";
import GrowthTrack from "@/components/growthTrack";
import HeroCard from "@/components/heroCard";
import LatestSermon from "@/components/latestSermon";
import LiveStream from "@/components/livestream";
import Newsletter from "@/components/newsletter";
import Partnership from "@/components/partnership";
import RelevantChurch from "@/components/relevantChurch";
import ResourcesSection from "@/components/resourceSection";
import SeniorPastors from "@/components/seniorPastors";
import Testimonials from "@/components/testimonies";
import { homeDetails } from "@/data/homeDetails";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroCard
        bgImage={homeDetails?.bgImage}
        title={homeDetails?.title}
        center={homeDetails?.center}
      />
      <div className="w-full">
        <LatestSermon data={homeDetails?.latestSermon} />
      </div>
      <LiveStream items={homeDetails?.livestreamItems} />
      <SeniorPastors seniorPastors={homeDetails?.seniorPastors} />
      <RelevantChurch data={homeDetails?.relevantChurch} />
      <ResourcesSection resources={homeDetails?.resources} />
      <EventsCarousel events={homeDetails?.events} />
      <Partnership />
      <Testimonials testimonials={homeDetails?.testimonials} />
      <GrowthTrack />
      <Newsletter data={homeDetails?.newsletter} />
    </div>
  );
}
