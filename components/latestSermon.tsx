import Container from "./container";

interface LatestSermonProps {
  data?: {
    title: string;
    details: string;
    video: {
      url: string;
      autoplay?: boolean;
    };
  };
}

export default function LatestSermon({ data }: LatestSermonProps) {
  return (
    <section className="w-full bg-bg pt-20 md:pt-28">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {data?.title}
          </h1>
          <p className="font-light text-black">{data?.details}</p>
        </div>

        <div className="w-full max-w-[1016px] mx-auto shadow-lg border border-primary-accent">
          {/* Responsive aspect-ratio container */}
          <div className="relative w-full pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
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
