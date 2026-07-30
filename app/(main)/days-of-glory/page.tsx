import { Metadata } from "next";
import DaysOfGloryPage from "@/containers/daysOfGloryPage";

export const metadata: Metadata = {
  title: "21 Days of Glory | FA'26",
  description:
    "Daily Prayer Focus by Rev. Arome E. Tokula - Pray with these guides daily to maximally partake of FA'26",
};

export default function DaysOfGlory() {
  return (
    <div className="w-full">
      <DaysOfGloryPage />
    </div>
  );
}
