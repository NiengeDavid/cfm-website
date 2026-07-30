import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export interface DaysOfGloryPost {
  _id: string;
  title: string;
  day: string;
  slug: { current: string };
  coverImageUrl?: string;
  descriptionText?: string;
  descriptionRaw?: any;
  pdfUrl: string;
  metaTitle?: string;
  metaDescription?: string;
}

// GROQ queries
export const daysOfGloryPostsQuery = `*[_type == "daysOfGlory"] | order(_createdAt desc) {
  _id,
  title,
  day,
  slug,
  coverImage,
  description,
  "pdfUrl": file.asset->url,
  metaTitle,
  metaDescription
}`;

export const daysOfGloryBySlugQuery = `*[_type == "daysOfGlory" && slug.current == $slug][0] {
  _id,
  title,
  day,
  slug,
  coverImage,
  description,
  "pdfUrl": file.asset->url,
  metaTitle,
  metaDescription
}`;

export const daysOfGlorySlugsQuery = `*[_type == "daysOfGlory" && defined(slug.current)][].slug.current`;

// Helper to extract plain text from Sanity blockContent
export function extractPlainText(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block: any) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

// Fetch helper functions
export async function getAllDaysOfGloryPosts(): Promise<DaysOfGloryPost[]> {
  try {
    const rawData = await client.fetch(daysOfGloryPostsQuery);
    if (!rawData || !Array.isArray(rawData)) return [];

    return rawData.map((item: any) => ({
      _id: item._id,
      title: item.title,
      day: item.day || "",
      slug: item.slug || { current: "" },
      coverImageUrl: item.coverImage ? urlFor(item.coverImage).url() : undefined,
      descriptionText: extractPlainText(item.description),
      descriptionRaw: item.description,
      pdfUrl: item.pdfUrl || "",
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
    }));
  } catch (error) {
    console.error("Error fetching Days of Glory posts:", error);
    return [];
  }
}

export async function getDaysOfGloryPostBySlug(
  slug: string
): Promise<DaysOfGloryPost | null> {
  try {
    const item = await client.fetch(daysOfGloryBySlugQuery, { slug });
    if (!item) return null;

    return {
      _id: item._id,
      title: item.title,
      day: item.day || "",
      slug: item.slug || { current: slug },
      coverImageUrl: item.coverImage ? urlFor(item.coverImage).url() : undefined,
      descriptionText: extractPlainText(item.description),
      descriptionRaw: item.description,
      pdfUrl: item.pdfUrl || "",
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
    };
  } catch (error) {
    console.error(`Error fetching Days of Glory post for slug "${slug}":`, error);
    return null;
  }
}

export async function getAllDaysOfGlorySlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(daysOfGlorySlugsQuery);
    return Array.isArray(slugs) ? slugs : [];
  } catch (error) {
    console.error("Error fetching Days of Glory slugs:", error);
    return [];
  }
}
