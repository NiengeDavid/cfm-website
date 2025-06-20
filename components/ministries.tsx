import Image from "next/image";
import Container from "./container";

interface MinistryUnit {
  name: string;
  image: string;
}

interface MinistryUnitsProps {
  content: MinistryUnit[];
}

export default function Ministries({ content }: MinistryUnitsProps) {
  return (
    <section className="bg-bg py-24 px-4 lg:py-40">
      <Container>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {content?.map((unit, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md overflow-hidden text-center flex flex-col"
            >
              <Image
                src={unit.image}
                width={300}
                height={300}
                alt={unit.name}
                className="w-full h-80 object-cover"
              />
              <div className="flex-grow flex items-center justify-center p-4">
                <h4 className="text-lg py-3 font-light text-black">
                  {unit.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
