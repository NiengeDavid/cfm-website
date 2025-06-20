import HeroCard from "@/components/heroCard";
import { centersDetails } from "@/data/centersDetails";

export default function CentersPage() {
  return (
    <div className="w-full bg-bg">
      <HeroCard
        title={centersDetails?.title}
        bgImage={centersDetails?.bgImage}
        center={centersDetails?.center}
        description={centersDetails?.description}
      />
    </div>
  );
}
