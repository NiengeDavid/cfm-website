"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";
import PDFReader from "@/components/pdfReader";
import {
  DaysOfGloryPost,
  getDaysOfGloryPostBySlug,
} from "@/sanity/queries/daysOfGlory";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface DaysOfGloryDetailPageProps {
  slug: string;
  initialPost?: DaysOfGloryPost | null;
}

export default function DaysOfGloryDetailPage({
  slug,
  initialPost,
}: DaysOfGloryDetailPageProps) {
  const [post, setPost] = useState<DaysOfGloryPost | null>(initialPost || null);
  const [loading, setLoading] = useState<boolean>(!initialPost);

  useEffect(() => {
    if (!initialPost && slug) {
      async function loadPost() {
        setLoading(true);
        const data = await getDaysOfGloryPostBySlug(slug);
        setPost(data);
        setLoading(false);
      }
      loadPost();
    }
  }, [slug, initialPost]);

  if (loading) {
    return (
      <div className="w-full bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4" />
            <div className="h-12 bg-slate-200 rounded w-3/4" />
            <div className="h-96 bg-slate-200 rounded-2xl" />
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full bg-slate-50 min-h-screen py-20 flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900">
              Publication Not Found
            </h2>
            <p className="text-slate-500 text-sm mt-2 mb-6">
              We couldn&apos;t find a Days of Glory post matching &quot;{slug}
              &quot;.
            </p>
            <Link
              href="/days-of-glory"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Days of Glory
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* Header Bar */}
      <div className="bg-secondary text-white py-10 border-b border-slate-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Link
              href="/days-of-glory"
              className="inline-flex items-center gap-2 text-sm  hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Publications</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              {post.day && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/50 text-red-200 text-xs font-bold uppercase tracking-wider border border-red-500/30">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.day}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {/* <Sparkles className="w-3.5 h-3.5 text-amber-400" /> */}
                21 Days of Glory - FA'26
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </Container>
      </div>

      {/* Main Content & PDF Reader */}
      <Container className="pt-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Post Description & Info Card */}
          {(post.descriptionText || post.coverImageUrl) && (
            <div className="bg-white rounded-3xl p-2 border border-slate-200/80 shadow-sm flex flex-col gap-6 items-start">
              {post.coverImageUrl && (
                <div className="relative w-full h-64 sm:h-80 md:h-128 rounded-2xl shadow-md overflow-hidden">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="flex-1 space-y-3">
                {/* <div className="flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider">
                  <FileText className="w-4 h-4" /> Publication Notes & Summary
                </div> */}
                <h2 className="text-2xl font-bold text-slate-900">
                  {post.title}
                </h2>
                {post.descriptionText && (
                  <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                    {post.descriptionText}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Canvas PDF Reader Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" /> Today's Focus
              </h2>
              <span className="text-xs font-medium text-slate-500">
                Read-Only Canvas View
              </span>
            </div>

            {post.pdfUrl ? (
              <PDFReader
                pdfUrl={post.pdfUrl}
                title={`${post.day ? post.day + " - " : ""}${post.title}`}
              />
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500">
                No PDF file attached to this post.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
