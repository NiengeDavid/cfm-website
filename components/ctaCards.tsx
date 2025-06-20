import Image from "next/image";
import Container from "./container";
import TextProvider from "./textProvider";

interface CtaCards {
  title: string;
  description: string;
  image: string;
}

interface CtaCardsProps {
  ctaCards: CtaCards[];
  isCard?: boolean;
}

export default function CtaCards({ ctaCards, isCard = false }: CtaCardsProps) {
  return (
    <section className="bg-transparent py-24 lg:py-32">
      <Container>
        <div className="mx-auto space-y-20">
          {ctaCards.map((card, index) => (
            <div
              key={index}
              className={`
                flex flex-col gap-10 w-full items-center
                ${isCard ? "lg:flex-row bg-gray-50 p-0 shadow-xl rounded-xl" : "lg:flex-row"}
                ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}
              `}
            >
              {/* Text Content - Always comes first in DOM for mobile */}
              <div
                className={`
                flex-1 max-w-screen-md lg:w-full
                ${isCard ? "p-8 lg:p-8" : "text-center lg:text-left"}
              `}
              >
                <h3 className="text-5xl font-bold">{card.title}</h3>
                <TextProvider
                  className={`mt-2 font-extralight  ${isCard ? "text-black" : "text-black"}`}
                >
                  {card.description}
                </TextProvider>
              </div>

              {/* Image - Position swaps on desktop based on index */}
              <div
                className={`
                flex-1 overflow-hidden p-0 
                ${
                  isCard
                    ? index % 2 === 0
                      ? "w-full rounded-r-xl lg:rounded-l-none"
                      : "w-full rounded-l-xl lg:rounded-r-none"
                    : "rounded-lg"
                }
              `}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={728}
                  height={484}
                  className={`
                    w-full h-full object-cover
                    ${
                      isCard
                        ? index % 2 === 0
                          ? "rounded-r-xl lg:rounded-l-none"
                          : "rounded-l-xl lg:rounded-r-none"
                        : "rounded-lg"
                    }
                  `}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
