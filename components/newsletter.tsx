import Image from "next/image";
import { Input } from "@/components/ui/input";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";

const photo = "/assets/hug.png";

interface Newsletters {
  description: string;
  image: string;
}

interface NewsletterProps {
  data: Newsletters;
}

export default function Newsletter({ data }: NewsletterProps) {
  return (
    <section className="bg-bg py-24 pb-40">
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text and Input */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Get Daily <br className="hidden md:inline" /> Scriptures To{" "}
              <br className="hidden md:inline" /> Your Inbox
            </h2>
            <p className="text-black font-extralight mb-6 max-w-md mx-auto md:mx-0">
              {data?.description}
            </p>
            <form className="flex max-w-md mx-auto md:mx-0">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary/20 flex-1 px-4 py-6 rounded-r-none focus:outline-none text-black placeholder:text-primary selection:bg-primary border-primary/20 border-2 focus-visible:border-primary focus-visible:ring-primary/50"
              />
              <Button
                type="submit"
                className="bg-secondary hover:bg-primary text-white px-4 py-6.5 rounded-l-none"
              >
                &rarr;
              </Button>
            </form>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={data?.image || photo}
                alt="Smiling woman hugging in church"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
