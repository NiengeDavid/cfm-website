import Container from "./container";
import TextProvider from "./textProvider";

interface Belief {
  title: string;
  description: string;
}

interface AboutCFMContent {
  aboutParagraphs: string;
  beliefTitle: string;
  beliefIntro: string;
  beliefs: Belief[];
}

interface AboutCFMProps {
  content: AboutCFMContent;
}

export default function AboutCFMSection({ content }: AboutCFMProps) {
  return (
    <section className="bg-primary text-white py-16 mt-10 lg:py-32 lg:mt-20 lg:px-8">
      <Container>
        <div className="mx-auto text-center">
          <h2 className="text-3xl md:text-6xl font-bold mb-6">About CFM</h2>
          <div className="space-y-4 mb-28 text-sm md:text-base lg:mb-52">
            <TextProvider className="text-white font-extralight">
              {content.aboutParagraphs}
            </TextProvider>
          </div>

          <h3 className="text-3xl md:text-6xl font-bold mb-4">
            {content.beliefTitle}
          </h3>
          <p className="max-w-3xl mx-auto mb-20 text-sm md:text-base">
            {content.beliefIntro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-screen-xl mx-auto">
            {content.beliefs.map((belief, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent1 to-primary z-0" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center bg-primary-accent/20 rounded-full">
                    <span className="text-sm font-semibold text-white px-4 text-center">
                      {belief.title}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed max-w-xs">
                  {belief.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
