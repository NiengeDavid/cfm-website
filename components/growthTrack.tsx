import Container from "./container";
import Image from "next/image";
import { Button } from "./ui/button";

export default function GrowthTrack() {
  return (
    <div className="w-full bg-bg py-16 lg:py-24">
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-8">
          {/* Text and Input */}
          <div className="md:w-full text-center md:text-right">
            <h2 className="text-4xl max-w-lg lg:text-6xl font-bold text-gray-900 mb-4">
              Commit to Membership
            </h2>
            <p className="text-black font-extralight mb-6 max-w-lg mx-auto md:mx-0">
              Discover how you can grow and make an impact. Our Growth Track is
              designed to help you find your purpose and connect with others.
            </p>
            <div className="max-w-lg max-auto">
              <a
                href="https://example.com/growth-track"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Learn More
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
