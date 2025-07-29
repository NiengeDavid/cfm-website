import Image from "next/image";
import Container from "./container";

export default function Partnership() {
  return (
    <section className="bg-white mt-24">
      <div className="relative bg-gradient-to-r from-primary-accent to-primary overflow-hidden min-h-[400px] flex items-center">
        {/* Background Curved Elements */}
        <div className="hidden lg:block absolute inset-0">
          {/* Large yellow curved shape */}
          <div className="absolute -left-20 top-0 w-96 h-96 bg-yellow-400 rounded-full transform -translate-y-1/3"></div>

          {/* White curved accent */}
          <div className="absolute left-40 top-10 w-80 h-80 bg-white/20 rounded-full transform rotate-12"></div>

          {/* Yellow accent curve */}
          <div className="absolute left-60 top-20 w-60 h-60 bg-accent1 rounded-full transform -rotate-45 opacity-80"></div>

          {/* Bottom white curve */}
          <div className="absolute -bottom-20 left-20 w-72 h-36 bg-white rounded-full transform rotate-12"></div>
        </div>

        {/* Content */}
        <Container>
          <div className="container mx-auto pt-20 relative z-10">
            <div className="flex flex-col-reverse mx-auto justify-between lg:flex-row lg:gap-8 gap-6 items-center">
              {/* Left side - Image */}
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Background circle for image */}
                  <div className="absolute -inset-4 bg-white/10 rounded-full"></div>
                  <Image
                    src="/assets/partner.png"
                    alt="Partnership representative"
                    width={659}
                    height={440}
                    className="relative z-10 rounded-lg w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="text-white text-center lg:text-right space-y-6 pb-10">
                <h2 className="text-4xl lg:text-5xl font-bold">Partnership</h2>

                <p className="leading-relaxed max-w-xl">
                  When you partner with us, you're not just giving — you're
                  going with us. Every soul reached, every life transformed,
                  every message preached is fruit that abounds to your account.
                  Your partnership helps us preach Christ, raise mature
                  believers, and bring hope to nations. Join us in this kingdom
                  assignment. Be a part of something eternal.
                </p>

                <a href="/partnership">
                  <button className="bg-accent2 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
                    Partner today!
                  </button>
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* Background Curved Elements */}
        <div className="lg:hidden absolute inset-0">
          {/* Large yellow curved shape */}
          <div className="absolute -left-20 -bottom-60 w-96 h-96 bg-yellow-400 rounded-full transform -translate-y-1/3"></div>

          {/* White curved accent */}
          <div className="absolute left-40 bottom-10 w-80 h-80 bg-white/20 rounded-full transform rotate-12"></div>

          {/* Yellow accent curve */}
          <div className="absolute left-60 bottom-20 w-60 h-60 bg-accent1 rounded-full transform -rotate-45 opacity-80"></div>

          {/* Bottom white curve */}
          <div className="absolute -bottom-20 left-20 w-72 h-36 bg-white rounded-full transform rotate-12"></div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-20 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-32 w-6 h-6 bg-white/30 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-yellow-400/50 rounded-full"></div>
      </div>
    </section>
  );
}
