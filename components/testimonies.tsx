import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    id: 1,
    greeting: "Good morning Sir,",
    content: "Thank you sir for the labour Room on Friday. I was truly blessed... I had severe back and chest pains on Friday. During the labour room, while praying, I kept stretching as I couldn't pace for long... You gave a word concerning healing from a back pain and I received it! I slept and woke up sweating but with no pain, continued with activities for the day, then I remembered the prophecy. I am fine and I feel better than I've felt in days!",
    closing: "God forever be praised",
    thankYou: "Thank you sir",
    signature: "Sis SI"
  },
  {
    id: 2,
    greeting: "Dear Pastor,",
    content: "I want to testify of God's goodness in my life. Last month during the prayer session, you prophesied about breakthrough in my business. I'm happy to report that my business has experienced unprecedented growth. Orders are coming in from different quarters and I can barely keep up with the demand.",
    closing: "To God be the glory",
    thankYou: "Thank you for your prayers",
    signature: "Bro. Michael"
  },
  {
    id: 3,
    greeting: "Good evening Pastor,",
    content: "I write to appreciate God for what He has done in my family. During the last service, you prayed for my husband's job situation. I'm excited to inform you that he got a call for an interview and has been offered a better position with a significant salary increase.",
    closing: "God is faithful",
    thankYou: "We are grateful",
    signature: "Mrs. Grace"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Testimonies
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 lg:p-12 text-white min-h-[400px] flex flex-col justify-between">
                        {/* Opening Quote */}
                        <div className="absolute top-6 left-8 text-6xl lg:text-8xl font-serif opacity-30">
                          "
                        </div>

                        {/* Testimonial Content */}
                        <div className="relative z-10 space-y-4">
                          <p className="text-lg font-medium">
                            {testimonial.greeting}
                          </p>
                          
                          <p className="text-base leading-relaxed">
                            {testimonial.content}
                          </p>
                          
                          <p className="text-lg font-medium">
                            {testimonial.closing}
                          </p>
                          
                          <p className="text-base">
                            {testimonial.thankYou}
                          </p>
                          
                          <p className="text-base font-medium">
                            {testimonial.signature}
                          </p>
                        </div>

                        {/* Closing Quote */}
                        <div className="absolute bottom-6 right-8 text-6xl lg:text-8xl font-serif opacity-30 rotate-180">
                          "
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 right-12 w-3 h-3 bg-white/20 rounded-full"></div>
                        <div className="absolute top-1/3 right-20 w-2 h-2 bg-white/30 rounded-full"></div>
                        <div className="absolute bottom-1/3 left-12 w-4 h-4 bg-white/10 rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Carousel Navigation */}
            <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
            <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-blue-200 hover:bg-blue-400 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}