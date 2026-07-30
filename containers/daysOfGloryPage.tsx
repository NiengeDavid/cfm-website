"use client";

import React, { useEffect, useState } from "react";
import HeroCard from "@/components/heroCard";
import Container from "@/components/container";
import DaysOfGloryCard from "@/components/daysOfGloryCard";
import { DaysOfGloryPost, getAllDaysOfGloryPosts } from "@/sanity/queries/daysOfGlory";
import { BookOpen, Sparkles } from "lucide-react";

export default function DaysOfGloryPage() {
  const [posts, setPosts] = useState<DaysOfGloryPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await getAllDaysOfGloryPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error loading Days of Glory posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <HeroCard
        title="21 Days of Glory"
        description="Kindle The Flame - FA'26"
        bgImage="/assets/confession.png"
        center={false}
      />

      {/* Main Content Section */}
      <Container className="pt-12 pb-16">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>By Rev. Arome E. Tokula</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Daily Prayer Focus
          </h2>
          <p className="text-slate-600 mt-2 max-w-xl text-base">
            Pray with these guides daily to maximally partake of FA'26.
          </p>
        </div>

        {/* Loading State Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 p-4 h-96 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full h-48 bg-slate-200 rounded-xl" />
                <div className="space-y-3 mt-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
                <div className="h-4 bg-slate-200 rounded w-1/3 mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 text-center p-8 max-w-2xl mx-auto shadow-sm">
            <div className="p-4 rounded-full bg-red-50 text-red-500 mb-4">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              No Days of Glory Publications Yet
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-md">
              Publications will appear here once uploaded in Sanity Studio. Check back soon!
            </p>
          </div>
        )}

        {/* Dynamic Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <DaysOfGloryCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
