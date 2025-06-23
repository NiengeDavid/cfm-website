import Container from "./container";
import Image from "next/image";

export default function GrowthTrack() {
  return (
    <div className="w-full bg-bg py-16 lg:py-24">
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          {/* Text and Input */}
          <div className="md:w-full flex flex-col justify-end text-center md:text-right">
            <h2 className="text-4xl ml-auto max-w-lg lg:text-6xl font-bold text-gray-900 mb-4">
              Commit to Membership
            </h2>
            <p className="text-black font-extralight mb-6 max-w-lg ml-auto">
              Discover Jesus' love and begin the journey of becoming all that
              God has called you to be and grow strong in faith.
            </p>
            <div className="max-w-lg md:ml-auto">
              <a
                href="https://growth.christfamilyministries.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-accent transition"
              >
                Start Today
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={"/assets/growth.jpg"}
                alt="Smiling woman hugging in church"
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
