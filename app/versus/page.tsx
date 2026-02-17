'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../components/layout/Footer";

type SelectedGoal = "learn" | "build" | null;

export default function VersusPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "beta">("blog");
  const [selected, setSelected] = useState<SelectedGoal>(null);

  return (
    <main className="bg-white text-[#111]">
      {/* ✅ NAVBAR */}
      <header className="relative w-full bg-gradient-to-b from-white via-white to-[#FFF6EF] py-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Hued"
              width={36}
              height={36}
              priority
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm text-[#111827] font-[Euclid Circular B]">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/beta">Hued Beta</Link></li>
              <li><Link href="/beta">Blog</Link></li>
              <li>
                <Link href="/versus" className="text-[#2F80ED] font-medium">
                  Versus
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ✅ HERO */}
      <section className="relative w-full h-[880px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/Frame124.png"
          alt="Hued Ecosystem"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-[48px] sm:text-[57px] font-semibold leading-[64px] font-[Euclid Circular B] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            HUED <br /> Ecosystem
          </h1>
          <p className="mt-4 text-white text-[20px] leading-[30px] max-w-2xl font-[Euclid Circular B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            Discover which HUED platform is perfect for your fashion journey.
            Compare our knowledge-sharing blog with our interactive community app.
          </p>
        </div>
      </section>

      {/* ✅ COMPARISON */}
      {/* ✅ COMPARISON */}
<section className="relative bg-[#0C0C0C] py-24 flex flex-col items-center text-center">
  <div className="flex items-center justify-center bg-[#1A1A1A] rounded-full p-1 mb-12">
    <button
      onClick={() => setActiveTab("blog")}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
        activeTab === "blog"
          ? "bg-[#F9AA31] text-black"
          : "text-gray-300 hover:text-white"
      }`}
    >
      Hued Blog
    </button>

    <button
      onClick={() => setActiveTab("beta")}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
        activeTab === "beta"
          ? "bg-[#F9AA31] text-black"
          : "text-gray-300 hover:text-white"
      }`}
    >
      Hued Beta App
    </button>
  </div>

  {activeTab === "blog" ? (
    <div className="relative max-w-3xl w-full rounded-[24px] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] p-10 text-left border border-[rgba(255,255,255,0.08)] transition-all duration-300">
      <h2 className="text-[36px] font-semibold text-[#F27A5D] text-center mb-3 font-[Euclid Circular B]">
        HUED Blog
      </h2>

      <p className="text-gray-300 text-center mb-10 text-[18px] font-[Euclid Circular B]">
        Fashion Journalism &amp; Style Theory
      </p>

      <div className="space-y-5">
        {[
          {
            icon: "📰",
            title: "Thought Leadership",
            desc: "In-depth articles and fashion insights from industry experts.",
          },
          {
            icon: "🧠",
            title: "Fashion Knowledge Quiz",
            desc: "Interactive assessments to identify your style knowledge gaps.",
          },
          {
            icon: "💬",
            title: "Peer-to-Peer Exchange",
            desc: "Direct community interaction and knowledge sharing.",
          },
          {
            icon: "⭐",
            title: "Fashion Luminary Spotlight",
            desc: "Recognition system for valuable fashion contributors.",
          },
          {
            icon: "🔍",
            title: "SEO-Optimized Content",
            desc: "Easily discoverable fashion resources and FAQs.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[rgba(255,255,255,0.06)] px-6 py-5 rounded-[16px] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition"
          >
            <span className="text-[22px]">{item.icon}</span>
            <div>
              <h3 className="text-white text-lg font-medium font-[Euclid Circular B]">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-[Euclid Circular B]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="relative max-w-3xl w-full rounded-[24px] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] p-10 text-left border border-[rgba(255,255,255,0.08)] transition-all duration-300">
      <h2 className="text-[36px] font-semibold text-[#5ACCB6] text-center mb-3 font-[Euclid Circular B]">
        HUED Beta App
      </h2>

      <p className="text-gray-300 text-center mb-10 text-[18px] font-[Euclid Circular B]">
        Community &amp; Interactive Learning
      </p>

      <div className="space-y-5">
        {[
          {
            icon: "🗂️",
            title: "Searchable Fashion Database",
            desc: "Comprehensive, categorized fashion knowledge system.",
          },
          {
            icon: "🎞️",
            title: "Multimedia Learning",
            desc: "Text, photos, and videos organized by fashion topics.",
          },
          {
            icon: "🔄",
            title: "Continuous Refinement",
            desc: "User feedback system for evolving content and categories.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[rgba(255,255,255,0.06)] px-6 py-5 rounded-[16px] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition"
          >
            <span className="text-[22px]">{item.icon}</span>
            <div>
              <h3 className="text-white text-lg font-medium font-[Euclid Circular B]">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-[Euclid Circular B]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</section>


      <Footer />
    </main>
  );
}
