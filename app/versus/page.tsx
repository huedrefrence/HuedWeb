'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../components/layout/Footer";

export default function VersusPage() {
  const [activeTab, setActiveTab] = useState("blog");

  return (
    <main className="bg-white text-[#111]">
      {/* ✅ NAVBAR */}
      <header className="relative w-full bg-gradient-to-b from-white via-white to-[#FFF6EF] py-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6">
          {/* Left logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.webp"
              alt="Hued"
              width={36}
              height={36}
              priority
            />
          </Link>

          {/* Right nav links */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm text-[#111827] font-[Euclid Circular B]">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/beta">Hued Beta</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li>
                <Link href="/versus" className="text-[#2F80ED] font-medium">
                  Versus
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ✅ HERO SECTION BELOW NAVBAR */}
      <section className="relative w-full h-[880px] flex items-center justify-center overflow-hidden m-0 p-0">
  <Image
    src="/images/Frame124.png"
    alt="Hued Ecosystem"
    fill
    priority
    className="object-cover"
  />

  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-white text-[48px] sm:text-[57px] font-semibold leading-[64px] font-[Euclid Circular B] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
      HUED <br/>
      Ecosystem
    </h1>
    <p className="mt-4 text-white text-[20px] leading-[30px] max-w-2xl font-[Euclid Circular B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
      Discover which HUED platform is perfect for your fashion <br/>
       journey. Compareour knowledge-sharing blog with our <br/>
       interactive community app.
    </p>
  </div>
</section>

      {/* ✅ COMPARISON SECTION WITH TOGGLE */}
      <section className="relative bg-[#0C0C0C] py-24 flex flex-col items-center justify-center text-center">
        {/* Toggle Buttons */}
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

        {/* Content Swap */}
       {/* Content Swap */}
{activeTab === "blog" ? (
  <>
    {/* 🧡 HUED BLOG SECTION — glassmorphism style */}
    <div className="relative max-w-3xl w-full rounded-[24px] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] p-10 text-left border border-[rgba(255,255,255,0.08)] transition-all duration-300">
      <h2 className="text-[36px] font-semibold text-[#F27A5D] text-center mb-3 font-[Euclid Circular B]">
        HUED Blog
      </h2>
      <p className="text-gray-300 text-center mb-10 text-[18px] font-[Euclid Circular B]">
        Fashion Journalism & Style Theory
      </p>
      <div className="space-y-5">
        {[
          { icon: "📰", title: "Thought Leadership", desc: "In-depth articles and fashion insights from industry experts." },
          { icon: "🧠", title: "Fashion Knowledge Quiz", desc: "Interactive assessments to identify your style knowledge gaps." },
          { icon: "⭐", title: "Fashion Luminary Spotlight", desc: "Recognition system for valuable fashion contributors." },
          { icon: "🔍", title: "SEO-Optimized Content", desc: "Easily discoverable fashion resources and FAQs." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[rgba(255,255,255,0.06)] px-6 py-5 rounded-[16px] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition"
          >
            <span className="text-[22px]">{item.icon}</span>
            <div>
              <h3 className="text-white text-lg font-medium font-[Euclid Circular B]">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1 font-[Euclid Circular B]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
) : (
  <>
    {/* ✨ HUED BETA APP SECTION — glassmorphism style */}
    <div className="relative max-w-3xl w-full rounded-[24px] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] p-10 text-left border border-[rgba(255,255,255,0.08)] transition-all duration-300">
      <h2 className="text-[36px] font-semibold text-[#5ACCB6] text-center mb-3 font-[Euclid Circular B]">
        HUED Beta App
      </h2>
      <p className="text-gray-300 text-center mb-10 text-[18px] font-[Euclid Circular B]">
        Community & Interactive Learning
      </p>
      <div className="space-y-5">
        {[
          { icon: "🗂️", title: "Searchable Fashion Database", desc: "Comprehensive, categorized fashion knowledge system." },
          { icon: "💬", title: "Peer-to-Peer Exchange", desc: "Direct community interaction and knowledge sharing." },
          { icon: "🎞️", title: "Multimedia Learning", desc: "Text, photos, and videos organized by fashion topics." },
          { icon: "🔄", title: "Continuous Refinement", desc: "User feedback system for evolving content and categories." },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[rgba(255,255,255,0.06)] px-6 py-5 rounded-[16px] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] transition"
          >
            <span className="text-[22px]">{item.icon}</span>
            <div>
              <h3 className="text-white text-lg font-medium font-[Euclid Circular B]">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1 font-[Euclid Circular B]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
)}
      </section>

      {/* 🧭 STILL DECIDING SECTION */}
      {/* 🧭 STILL DECIDING SECTION – hover popup between title/cards, CTA outside the box */}
{/* 🧭 STILL DECIDING SECTION – consistent beige background, golden highlight */}
<section className="w-full bg-white py-28 text-center">
  <div className="max-w-[1200px] mx-auto px-6">
    {/* Section Heading */}
    <h2 className="text-[32px] sm:text-[38px] font-semibold text-[#111] font-[Euclid Circular B] mb-10">
      Still Deciding?
    </h2>

    {/* Beige Box */}
    <div className="w-full bg-[#FDF9F0] rounded-[24px] p-10 sm:p-14">
      {(() => {
        const [selected, setSelected] = React.useState(null);
        return (
          <>
            {/* Subtitle */}
            <h3 className="text-[20px] font-semibold mb-6 text-[#111] font-[Euclid Circular B]">
              What’s your primary fashion goal?
            </h3>

            {/* Popup between title & cards */}
            <div className="h-[60px] flex justify-center items-center mb-8 transition-all duration-300">
              {selected === "learn" && (
                <div className="bg-[#F9AA31] text-white text-sm sm:text-base font-semibold rounded-[12px] px-6 py-3 shadow-md font-[Euclid Circular B] transition-all duration-300">
                  Perfect match! The HUED Blog offers the deep fashion insights you’re looking for.
                </div>
              )}
              {selected === "build" && (
                <div className="bg-[#F9AA31] text-white text-sm sm:text-base font-semibold rounded-[12px] px-6 py-3 shadow-md font-[Euclid Circular B] transition-all duration-300">
                  Excellent choice! The HUED App will help you build your style community and discover your unique voice.
                </div>
              )}
            </div>

            {/* Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {/* Left Card – Learn & Analyze */}
              <div
                onMouseEnter={() => setSelected("learn")}
                onMouseLeave={() => setSelected(null)}
                onClick={() => setSelected("learn")}
                className={`mx-auto w-full max-w-[480px] border-2 border-[#F9AA31] rounded-[16px] p-6 cursor-pointer transition-all duration-300 ${
                  selected === "learn"
                    ? "bg-[rgba(249,170,49,0.25)]"
                    : "bg-[#FDF9F0] hover:bg-[rgba(249,170,49,0.15)]"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-[#111] font-[Euclid Circular B]">
                  🧷 Learn & Analyze
                </h4>
                <p className="text-gray-700 text-sm leading-[22px] font-[Euclid Circular B]">
                  I want to understand fashion <br />
                  theory, read expert analysis, and <br />
                  dive deep into style history and trends.
                </p>
              </div>

              {/* Right Card – Build & Create */}
              <div
                onMouseEnter={() => setSelected("build")}
                onMouseLeave={() => setSelected(null)}
                onClick={() => setSelected("build")}
                className={`mx-auto w-full max-w-[480px] border-2 border-[#F9AA31] rounded-[16px] p-6 cursor-pointer transition-all duration-300 ${
                  selected === "build"
                    ? "bg-[rgba(249,170,49,0.25)]"
                    : "bg-[#FDF9F0] hover:bg-[rgba(249,170,49,0.15)]"
                }`}
              >
                <h4 className="text-lg font-semibold mb-3 text-[#111] font-[Euclid Circular B]">
                  ✨ Build & Create
                </h4>
                <p className="text-gray-700 text-sm leading-[22px] font-[Euclid Circular B]">
                  I want to build my personal style, <br />
                  connect with others, and learn <br />
                  through interactive experiences.
                </p>
              </div>
            </div>
          </>
        );
      })()}
    </div>

    {/* ✅ CTA Section – Outside Beige Box */}
    <div className="mt-16 text-center">
      <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#111] font-[Euclid Circular B] mb-6">
        Ready to Start Your Fashion Journey?
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/blog"
          className="bg-[#111] text-white text-sm px-6 py-3 rounded-full hover:bg-[#333] transition font-[Euclid Circular B]"
        >
          Explore HUED Blog
        </Link>
       <Link
  href="/beta"
  className="bg-[#5ACCB6] text-[#111] text-sm px-6 py-3 rounded-full 
             hover:bg-[#4AB7A1] transition-colors duration-300 font-[Euclid Circular B]"
>
  Try HUED Beta App
</Link>
      </div>
    </div>
  </div>
</section>
      <Footer />
    </main>
  );
}