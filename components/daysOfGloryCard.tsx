"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, ArrowRight, Calendar } from "lucide-react";
import { DaysOfGloryPost } from "@/sanity/queries/daysOfGlory";

interface DaysOfGloryCardProps {
  post: DaysOfGloryPost;
}

export default function DaysOfGloryCard({ post }: DaysOfGloryCardProps) {
  const postUrl = `/days-of-glory/${post.slug?.current || post._id}`;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <Link href={postUrl} className="flex flex-col flex-1">
        {/* Cover Image Container */}
        <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-900 via-slate-900 to-slate-950 text-white/70">
              <FileText className="w-16 h-16 mb-2 opacity-50 text-red-400" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                21 Days of Glory
              </span>
            </div>
          )}

          {/* Day Badge Tag */}
          {post.day && (
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-lg">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>{post.day}</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-6">
          {post.day && (
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">
              {post.day}
            </span>
          )}

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>

          {post.descriptionText && (
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
              {post.descriptionText}
            </p>
          )}

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-red-600 group-hover:translate-x-1 transition-transform">
            <span className="flex items-center gap-1.5 font-bold">
              <FileText className="w-4 h-4" /> Read more
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
}
