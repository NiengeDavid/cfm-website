import HeroCard from "@/components/heroCard";
import Ministries from "@/components/ministries";
import { ministriesDetails } from "@/data/ministriesDetails";

export default function MinistriesPage() {
  return (
    <div className="w-full bg-bg">
      <HeroCard
        title={ministriesDetails?.title}
        bgImage={ministriesDetails?.bgImage}
        center={ministriesDetails?.center}
      />
      <Ministries content={ministriesDetails?.ministries} />
    </div>
  );
}
