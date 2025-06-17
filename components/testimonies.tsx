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

interface Testimonial {
  id: number;
  greeting: string;
  content: string;
  closing: string;
  thankYou: string;
  signature: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
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
                {testimonials?.map((testimonial) => (
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
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
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
