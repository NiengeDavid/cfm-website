import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Event = {
  title: string;
  image: string;
  date?: string;
  link?: string;
};

type EventsCarouselProps = {
  events: Event[];
};

export default function EventsCarousel({ events }: EventsCarouselProps) {
  return (
    <Container className="py-8 mt-10">
      <h2 className="text-3xl max-w-md md:text-6xl text-black scroll-m-20 font-semibold tracking-tight first:mt-0 mb-6">
        Upcoming Events
      </h2>
      <div className="flex justify-center">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {events.map((event, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="p-1 group relative h-full">
                  <div className="relative aspect-square overflow-hidden rounded-xl h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {/* Only show Register button if link exists AND is not empty */}
                    {event.link?.trim() && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/50 to-transparent h-1/3 flex items-end">
                        <Button
                          asChild
                          className="w-full bg-white text-black hover:bg-accent1 transition-colors"
                        >
                          <Link href={event.link.trim()}>Register Now</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </div>
    </Container>
  );
}
