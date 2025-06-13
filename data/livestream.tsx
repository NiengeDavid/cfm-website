interface LiveStreamItem {
  name: string;
  label: string;
  logo: string;
  color: string;
  link?: string; // Optional link for the live stream}
}

interface LiveStreamProps {
  items: LiveStreamItem[];
}

export const livestreamItems: LiveStreamItem[] = [
  {
    name: "cfm-live",
    label: "Click to play",
    logo: "/assets/mixlr.svg",
    color: "red",
    link: "https://www.cfm.org/live", // Example link, replace with actual
  },
  {
    name: " Christ family ministry",
    label: "Click to play",
    logo: "/assets/fblive.svg",
    color: "blue",
    link: "https://www.facebook.com/cfm.org/live", // Example link, replace with actual
  },
  {
    name: "Christ family ministry",
    label: "Click to play",
    logo: "/assets/yt.svg",
    color: "red",
    link: "https://www.youtube.com/c/cfmorg/live", // Example link, replace with actual
  },
];
