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
              src="/images/logo.webp"
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
          <div className="relative max-w-3xl w-full rounded-[24px] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl p-10 border border-[rgba(255,255,255,0.08)]">
            <h2 className="text-[36px] font-semibold text-[#F27A5D] text-center mb-3">
              HUED Blog
            </h2>
            <p className="text-gray-300 text-center mb-10 text-[18px]">
              Fashion Journalism & Style Theory
            </p>
          </div>
        ) : (
          <div className="relative max-w-3xl w-full rounded-[24px] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl p-10 border border-[rgba(255,255,255,0.08)]">
            <h2 className="text-[36px] font-semibold text-[#5ACCB6] text-center mb-3">
              HUED Beta App
            </h2>
            <p className="text-gray-300 text-center mb-10 text-[18px]">
              Community & Interactive Learning
            </p>
          </div>
        )}
      </section>

      {/* 🧭 STILL DECIDING */}
      <section className="w-full bg-white py-28 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[38px] font-semibold mb-10">
            Still Deciding?
          </h2>

          <div className="bg-[#FDF9F0] rounded-[24px] p-14">
            <h3 className="text-[20px] font-semibold mb-6">
              What’s your primary fashion goal?
            </h3>

            <div className="h-[60px] flex justify-center items-center mb-8">
              {selected === "learn" && (
                <div className="bg-[#F9AA31] text-white rounded-[12px] px-6 py-3 font-semibold">
                  Perfect match! The HUED Blog is for deep fashion insights.
                </div>
              )}
              {selected === "build" && (
                <div className="bg-[#F9AA31] text-white rounded-[12px] px-6 py-3 font-semibold">
                  Excellent choice! HUED Beta helps you build and connect.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div
                onMouseEnter={() => setSelected("learn")}
                onMouseLeave={() => setSelected(null)}
                onClick={() => setSelected("learn")}
                className={`border-2 border-[#F9AA31] rounded-[16px] p-6 cursor-pointer transition ${
                  selected === "learn"
                    ? "bg-[rgba(249,170,49,0.25)]"
                    : "bg-[#FDF9F0] hover:bg-[rgba(249,170,49,0.15)]"
                }`}
              >
                <h4 className="font-semibold mb-2">🧷 Learn & Analyze</h4>
                <p className="text-sm text-gray-700">
                  Deep fashion theory, expert insights, and trends.
                </p>
              </div>

              <div
                onMouseEnter={() => setSelected("build")}
                onMouseLeave={() => setSelected(null)}
                onClick={() => setSelected("build")}
                className={`border-2 border-[#F9AA31] rounded-[16px] p-6 cursor-pointer transition ${
                  selected === "build"
                    ? "bg-[rgba(249,170,49,0.25)]"
                    : "bg-[#FDF9F0] hover:bg-[rgba(249,170,49,0.15)]"
                }`}
              >
                <h4 className="font-semibold mb-2">✨ Build & Create</h4>
                <p className="text-sm text-gray-700">
                  Community, interaction, and hands-on learning.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-[26px] font-semibold mb-6">
              Ready to Start Your Fashion Journey?
            </h3>
            <div className="flex justify-center gap-4">
              <Link
                href="/blog"
                className="bg-black text-white px-6 py-3 rounded-full"
              >
                Explore HUED Blog
              </Link>
              <Link
                href="/beta"
                className="bg-[#5ACCB6] text-black px-6 py-3 rounded-full"
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
