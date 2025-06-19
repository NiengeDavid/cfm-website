import Image from "next/image";
import Container from "./container";

interface CoreValue {
  title: string;
  description: string;
}

interface CoreValuesContent {
  sectionTitle: string;
  imageSrc: string;
  values: CoreValue[];
}

interface CoreValuesProps {
  content: CoreValuesContent;
}

export default function CoreValuesSection({ content }: CoreValuesProps) {
  return (
    <section className="bg-white py-24 px-4 lg:py-36">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center md:text-6xl font-bold mb-16">
            {content.sectionTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col gap-8 text-center md:text-start">
              {content.values.slice(0, 3).map((value, idx) => (
                <div key={idx}>
                  <h4 className="text-2xl text-black font-light mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-black font-extralight md:max-w-xs">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Image
                src={content.imageSrc}
                width={534}
                height={355}
                alt="Core Values"
                className="w-48 h-48 object-cover rounded-full shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-8 text-center md:text-start">
              {content.values.slice(3).map((value, idx) => (
                <div key={idx}>
                  <h4 className="text-2xl text-black font-light mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-black font-extralight md:max-w-xs">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
