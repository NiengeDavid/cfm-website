import Image from "next/image";
import Container from "./container";
import { Button } from "./ui/button";
import Link from "next/link";

interface SeniorPastorsProps {
  seniorPastors: {
    title: string;
    description: string;
    btnText: string;
    image: string;
  };
}

export default function SeniorPastors({ seniorPastors }: SeniorPastorsProps) {
  return (
    <section className="relative bg-bg pt-2 pb-12 mt-8 lg:mt-50">
      <Container>
        <div className="relative container w-full mx-auto px-4 flex flex-col justify-between lg:flex-row items-center gap-4 lg:gap-2">
          {/* Text Section */}
          <div className="lg:w-5/12 text-center lg:text-left z-20 pt-12 lg:py-12">
            <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
              {seniorPastors?.title.split(" ")[0]}{" "}
              <br className="hidden md:inline" />
              {seniorPastors?.title.split(" ").slice(1).join(" ")}
            </h2>
            <p className="text-gray-700 mb-6 max-w-full mx-auto lg:mx-0">
              {seniorPastors?.description}
            </p>
            <Link href={"/leadership"}>
              <Button className="bg-accent2 text-white p-6 rounded-md hover:bg-red-700 cursor-pointer transition">
                {seniorPastors?.btnText}
              </Button>
            </Link>
          </div>

          {/* Image Section - Modified for overflow */}
          <div className="lg:w-7/12 flex justify-center relative z-10 lg:-mt-48 lg:-mb-8">
            <div className="relative">
              <Image
                src={seniorPastors?.image}
                alt={seniorPastors?.title}
                width={752}
                height={752}
                className="w-full h-full object-cover rounded-lg"
                priority
              />
              {/* Blur mask overlaying the base of the image */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-50 via-blue-50/80 to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
