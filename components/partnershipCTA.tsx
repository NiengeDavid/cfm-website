import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TextProvider from "@/components/textProvider";
import Container from "@/components/container";

interface CovenantPartnershipSectionProps {
  heading: string;
  paragraphs: string;
  brochureUrl: string;
  image: {
    src: string;
    alt: string;
  };
  className?: string;
}

export default function PartnershipCTA({
  heading,
  paragraphs,
  brochureUrl,
  image,
  className,
}: CovenantPartnershipSectionProps) {
  return (
    <section className={cn("bg-bg py-16 md:py-28 px-4", className)}>
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="scroll-m-20 text-4xl md:text-5xl lg:text-7xl font-bold tracking-loose text-balance text-center md:text-start">
              {heading}
            </h2>
            <TextProvider className="py-2 text-center font-extralight md:text-start">
              {paragraphs}
            </TextProvider>
            <Button asChild className="w-full py-6 bg-accent2 hover:bg-red-700">
              <a href={brochureUrl} download>
                Download brochure
              </a>
            </Button>
          </div>

          <div className="rounded-xl overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
