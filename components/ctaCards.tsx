import Image from "next/image";
import Container from "./container";
import TextProvider from "./textProvider";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";

interface CtaCards {
  title?: string;
  description: string;
  socialIcons?: { name: string; href: string; icon: string }[];
  image: string;
}

interface CtaCardsProps {
  ctaCards: CtaCards[];
  isCard?: boolean;
}

function getIcon(name: string) {
  switch (name) {
    case "facebook":
      return <FaFacebook size={28} />;
    case "twitter":
      return <FaTwitter size={28} />;
    case "instagram":
      return <FaInstagram size={28} />;
    case "youtube":
      return <FaYoutube size={28} />;
    case "send":
      return <FaTelegram size={28} />;
    default:
      return null;
  }
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
                <h3
                  className={`w-fit mx-auto text-5xl font-bold lg:mx-0 ${!isCard ? "border-b pb-2 border-primary-accent" : "border-0"}`}
                >
                  {card.title}
                </h3>
                <TextProvider
                  className={`mt-2 font-extralight  ${isCard ? "text-black" : "text-black"}`}
                >
                  {card.description}
                </TextProvider>
                {card.socialIcons && card.socialIcons.length > 0 && (
                  <div className="flex justify-center gap-4 mt-8 lg:justify-start">
                    {card.socialIcons.map(({ name, icon, href }) => (
                      <a
                        href={href}
                        key={name}
                        aria-label={name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-black transition-colors"
                      >
                        {getIcon(icon)}
                      </a>
                    ))}
                  </div>
                )}
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
                  alt={card.title || "CTA Card Image"}
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
