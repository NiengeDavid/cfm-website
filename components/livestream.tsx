import Container from "@/components/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LiveStreamItem {
  name: string;
  label: string;
  logo: string;
  color: string;
  link?: string;
}

interface LiveStreamProps {
  items: LiveStreamItem[];
}

const rev = "/assets/pastoraromeweb.png";

export default function LiveStream({ items }: LiveStreamProps) {
  return (
    <div className="bg-white w-full">
      <Container className="w-full py-6 md:pt-12">
        <h3 className="text-white text-center text-[60px] md:text-[120px] font-bold mb-12 md:mb-7 drop-shadow-lg">
          LiveStream
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto">
          {items.map((item, index) => (
            <Link
              href={item?.link || "#"}
              key={index}
              className="flex items-center-safe justify-around gap-5 border border-primary rounded-xl overflow-visible py-0 bg-white"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center relative",
                    item?.color === "red" && "bg-accent2",
                    item?.color === "blue" && "bg-primary",
                    item?.color === "purple" && "bg-accent1"
                  )}
                  style={{ overflow: "visible" }}
                >
                  <Image
                    src={rev}
                    alt="Pastor"
                    width={171}
                    height={176}
                    className="rounded-full object-cover absolute -top-7.5 z-20"
                  />
                </div>
                <div className="flex flex-col items-center text-sm">
                  <div
                    className={cn(
                      "w-6 h-6 p-1 flex items-center justify-center rounded-full border-2 bg-transparent text-gray-700",
                      item?.color === "red" && "border-accent2",
                      item?.color === "blue" && "border-primary",
                      item?.color === "purple" && "border-accent1"
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={cn(
                        "w-5 h-5",
                        item?.color === "red" && "text-accent2",
                        item?.color === "blue" && "text-primary",
                        item?.color === "purple" && "text-accent1"
                      )}
                    >
                      <path d="M6 4v16l12-8-12-8z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">{item?.label}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end w-24 gap-2">
                <Image
                  src={item?.logo as string}
                  alt={`${item?.name} logo`}
                  width={36}
                  height={13}
                  className="object-contain"
                />
                <span className="text-xs font-light whitespace-nowrap">
                  {item?.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
