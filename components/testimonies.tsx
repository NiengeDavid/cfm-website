"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Container from "./container";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    greeting: "Good morning Sir,",
    content:
      "Thank you sir for the labour Room on Friday. I was truly blessed... I had severe back and chest pains on Friday. During the labour room, while praying, I kept stretching as I couldn't pace for long... You gave a word concerning healing from a back pain and I received it! I slept and woke up sweating but with no pain, continued with activities for the day, then I remembered the prophecy. I am fine and I feel better than I've felt in days!",
    closing: "God forever be praised",
    thankYou: "Thank you sir",
    signature: "Sis SI",
  },
  {
    id: 2,
    greeting: "Dear Pastor,",
    content:
      "I want to testify of God's goodness in my life. Last month during the prayer session, you prophesied about breakthrough in my business. I'm happy to report that my business has experienced unprecedented growth. Orders are coming in from different quarters and I can barely keep up with the demand.",
    closing: "To God be the glory",
    thankYou: "Thank you for your prayers",
    signature: "Bro. Michael",
  },
  {
    id: 3,
    greeting: "Good evening Pastor,",
    content:
      "I write to appreciate God for what He has done in my family. During the last service, you prayed for my husband's job situation. I'm excited to inform you that he got a call for an interview and has been offered a better position with a significant salary increase.",
    closing: "God is faithful",
    thankYou: "We are grateful",
    signature: "Mrs. Grace",
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl text-black scroll-m-20 font-semibold tracking-tight first:mt-0 mb-6">
              Testimonies
            </h2>
          </div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <Card className="border-0 shadow-none">
                      <CardContent className="p-0">
                        <div className="relative bg-primary rounded-2xl p-8 lg:p-12 text-white min-h-[400px] flex flex-col justify-between">
                          {/* Opening Quote */}
                          <div className="absolute top-6 left-8">
                            <Image
                              width={198}
                              height={149}
                              src="/assets/quoteopen.png"
                              alt="Opening Quote"
                              className="w-12 h-12 opacity-80"
                            />
                          </div>

                          {/* Testimonial Content */}
                          <div className="relative z-10 space-y-6 px-4 py-8">
                            <p className="text-lg font-medium italic">
                              {testimonial.greeting}
                            </p>

                            <div className="relative">
                              <p className="text-lg leading-relaxed px-8">
                                {testimonial.content}
                              </p>
                            </div>

                            <div className="space-y-4">
                              <p className="text-lg font-medium italic">
                                {testimonial.closing}
                              </p>
                              <p className="text-base italic">
                                {testimonial.thankYou}
                              </p>
                              <p className="text-base font-medium">
                                {testimonial.signature}
                              </p>
                            </div>
                          </div>

                          {/* Closing Quote */}
                          <div className="absolute bottom-6 right-8">
                            <Image
                              width={198}
                              height={149}
                              src="/assets/quoteclose.png"
                              alt="Closing Quote"
                              className="w-12 h-12 opacity-80"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Navigation */}
              <CarouselPrevious className="-left-4 hidden sm:flex" />
              <CarouselNext className="-right-4 hidden sm:flex" />
            </Carousel>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === index + 1 ? "bg-primary w-6" : "bg-blue-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
