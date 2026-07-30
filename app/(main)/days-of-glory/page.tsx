import { Metadata } from "next";
import DaysOfGloryPage from "@/containers/daysOfGloryPage";

export const metadata: Metadata = {
  title: "Days of Glory | CFM Publications",
  description:
    "Explore dynamic Days of Glory publications, study guides, and inspired PDF documents.",
};

export default function DaysOfGlory() {
  return (
    <div className="w-full">
      <DaysOfGloryPage />
    </div>
  );
}
