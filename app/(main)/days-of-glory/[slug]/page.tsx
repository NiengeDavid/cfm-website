import { Metadata } from "next";
import DaysOfGloryDetailPage from "@/containers/daysOfGloryDetailPage";
import {
  getDaysOfGloryPostBySlug,
  getAllDaysOfGlorySlugs,
} from "@/sanity/queries/daysOfGlory";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDaysOfGloryPostBySlug(slug);

  if (!post) {
    return {
      title: "Publication Not Found | Days of Glory",
      description: "Days of Glory publication details",
    };
  }

  const pageTitle = post.metaTitle || `${post.day ? post.day + " - " : ""}${post.title} | Days of Glory`;
  const pageDescription =
    post.metaDescription || post.descriptionText || `Read ${post.title} on Days of Glory.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllDaysOfGlorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DaysOfGloryPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getDaysOfGloryPostBySlug(slug);

  return <DaysOfGloryDetailPage slug={slug} initialPost={post} />;
}
