import Container from "./container";
import Image from "next/image";

interface GrowthTrackData {
  title: string;
  description: string;
  cta: {
    text?: string; // Optional with default
    href: string;
  };
  image: {
    url: string;
    alt?: string; // Optional with default
  };
}

interface GrowthTrackProps {
  data: GrowthTrackData;
}

export default function GrowthTrack({ data }: GrowthTrackProps) {
  const {
    title,
    description,
    cta: { text: ctaText = "Start Today", href },
    image: { url: imageUrl, alt: imageAlt = "Growth track illustration" },
  } = data;

  return (
    <div className="w-full bg-bg py-16 lg:py-24">
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          {/* Text and CTA */}
          <div className="md:w-full flex flex-col justify-end text-center md:text-right">
            <h2 className="text-4xl ml-auto max-w-lg lg:text-6xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-black font-extralight mb-6 max-w-lg ml-auto">
              {description}
            </p>
            <div className="max-w-lg md:ml-auto">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-accent transition"
              >
                {ctaText}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
