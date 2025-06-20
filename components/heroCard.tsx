import Container from "@/components/container";
import { ArrowDownToDot } from "lucide-react";
import Image from "next/image";

interface HeroCardProps {
  bgImage?: string;
  title?: string;
  center?: boolean;
  description?: string;
}

const bottomImage = "/assets/banner.png";

export default function HeroCard({
  bgImage,
  title,
  center,
  description,
}: HeroCardProps) {
  return (
    <div
      className={`relative h-full bg-cover bg-center`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-gradient-overlay"></div>
      <Container className="relative z-10">
        <div className="w-full mx-auto py-10 md:py-36">
          <div className="max-w-screen-sm mx-auto p-4">
            <h1 className="text-5xl font-serif font-normal leading-16 text-bg text-center max-w-sm mx-auto md:leading-28 md:max-w-xl md:text-7xl lg:text-8xl">
              {title}
            </h1>
            <p className="my-4 text-bg text-center text-nowrap overflow-hidden max-w-sm mx-auto font-light text-xl md:text-2xl">
              {description}
            </p>
            <ArrowDownToDot
              size={60}
              className="mt-6 text-bg text-center w-full animate-bounce"
            />
          </div>
        </div>
      </Container>
      {/* The Bottom Bar Image - Positioned Absolutely */}
      {center !== false && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-11/12 max-w-2xl z-20 lg:-bottom-12">
          <Image
            src={bottomImage}
            alt="Details bar"
            width={1024}
            height={176}
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
}
