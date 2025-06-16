import Container from "./container";

interface RelevantChurchProps {
  data?: {
    title: string;
    details: string;
    video: {
      url: string;
      autoplay?: boolean;
    };
  };
}

export default function RelevantChurch({ data }: RelevantChurchProps) {
  return (
    <section className="w-full bg-bg py-20 md:py-36">
      <Container className="flex flex-col mx-auto gap-4 items-center justify-between md:flex-row md:gap-6">
        <div className="text-center md:text-start mb-8 lg:mb-0">
          <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold text-black mb-2">
            {data?.title}
          </h1>
          <p className="font-light text-black">{data?.details}</p>
        </div>

        <div className="w-full max-w-[1016px] mx-auto shadow-lg border border-primary-accent rounded-lg">
          {/* Responsive aspect-ratio container */}
          <div className="relative w-full pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={data?.video.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
