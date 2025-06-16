import Image from "next/image";
import Link from "next/link";
import Container from "./container";

interface ResourceItem {
  title: string;
  image: string;
  link: string;
}

interface ResourcesSectionProps {
  resources: ResourceItem[];
}

export default function ResourcesSection({ resources }: ResourcesSectionProps) {
  return (
    <section className="bg-bg py-12 pb-28">
      <Container>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-18">
            Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {resources.map((item, index) => (
              <a
                href={item.link}
                key={index}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl lg:text-3xl text-start font-bold mb-3">
                    {item.title}
                  </h3>
                  <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium w-max self-start group-hover:bg-gray-100 transition cursor-pointer">
                    See more
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
