import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogPage() {
 
  return (
    <>
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-[#FFF6EF] min-h-screen flex flex-col items-center justify-center">
      {/* HEADER */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Image
          src="/images/logo.webp"
          alt="Hued"
          width={36}
          height={36}
          priority
        />
      </div>

      <nav className="absolute top-6 right-6 hidden md:block">
        <ul className="flex items-center gap-8 text-sm text-[#111827]">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/beta">Hued Beta</Link></li>
          <li>
            <Link href="/blog" className="text-[#2F80ED] font-medium">
              Blog
            </Link>
          </li>
          <li><Link href="/versus">Versus</Link></li>
        </ul>
      </nav>

      {/* MAIN HERO */}
      <div className="relative z-10 text-center -mt-20"> {/* pushes up a little */}
        <h1
  className="font-[Euclid Circular B] font-semibold text-[57px] leading-[64px] tracking-[-0.25px] text-black text-center"
>
  Hued Blog
</h1>

        <p className="mt-4 max-w-2xl mx-auto text-[24px] leading-[32px] font-medium font-[Euclid Circular B]">
  <span className="bg-gradient-to-r from-[#F27A5D] via-[#A486BE] to-[#5FAAE3] bg-clip-text text-transparent">
    Explore curated fashion content, connect with industry luminaries,
    and dive deep into style theory with our intelligent discovery
    platform.
  </span>
</p>


        {/* Search bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search fashion topics, creators, or styles..."
              className="w-full rounded-full bg-gray-100 pl-12 pr-4 py-4 text-sm text-gray-700 outline-none ring-1 ring-transparent focus:ring-gray-300"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href="/community"
            className="inline-block rounded-xl bg-[#F27A5D] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
          >
            Join the Community
          </Link>
        </div>
      </div>

      {/* ILLUSTRATION BOTTOM RIGHT */}
      <div className="absolute bottom-0 right-8">
        <Image
          src="/images/Dress.png"
          alt="Stylists illustration"
          width={300}
          height={280}
          className="object-contain"
          priority
        />
      </div>
    </section>

     

            {/* What We Cover Section */}
      <section className="bg-[#FFF9F1] py-20">
  <div className="mx-auto max-w-6xl px-4">
    <h2
      className="
        font-semibold 
        text-[45px] 
        leading-[52px] 
        tracking-[-0.25px] 
        text-black
        font-['Euclid Circular B',sans-serif]
        mb-14   /* slightly less bottom margin than 16 */
      "
    >
      What We Cover
    </h2>

    {/* Adjusted grid spacing */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mx-auto max-w-fit">
  {[
    "/images/Frame1.png",
    "/images/Frame2.png",
    "/images/Frame3.png",
    "/images/Frame4.png",
    "/images/Frame5.png",
    "/images/Frame6.png",
    "/images/Frame7.png",
    "/images/Frame8.png",
    "/images/Frame9.png",
  ].map((src, idx) => (
    <Image
      key={idx}
      src={src}
      alt={`Square ${idx + 1}`}
      width={220}
      height={220}
      className="object-contain"
    />
  ))}
</div>

  </div>
</section>

   
<section className="bg-[#5ACCB6] py-24 flex flex-col items-center justify-center text-center">
 <h2 className="font-semibold text-[57px] leading-[52px] tracking-[-0.25px] text-black">
    Join Our Fashion Community
  </h2>
  <p className="mt-6 max-w-2xl text-[24px] leading-[32px] font-normal tracking-normal text-[#444444] text-center">
    Connect with fashion enthusiasts, industry professionals, and emerging designers. 
    Share knowledge, discover trends, and shape the future of fashion together.
  </p>

  {/* Buttons */}
  <div className="mt-8 flex gap-4">
    <button className="px-6 py-3 rounded-md bg-black text-white font-medium hover:opacity-90">
      Join Community
    </button>
    <button className="px-6 py-3 rounded-md border border-black text-black font-medium hover:bg-gray-100">
      Submit Content
    </button>
  </div>
</section>

{/* =============
      FOOTER
============== */}
<footer className="bg-[#1E1E1E] text-white py-12">
  <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-start">
    {/* Left side logo + tagline */}
    <div className="mb-8 md:mb-0">
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo.webp"
          alt="Hued Logo"
          width={36}
          height={36}
        />
        <span className="text-xl font-semibold">Hued</span>
      </div>
      <p className="text-sm mt-2 text-gray-300">
        “Inspiring Fashion Knowledge”
      </p>
    </div>

    {/* Right side links */}
    <div className="flex gap-16 md:gap-24 ml-auto">
      {/* Quick Links */}
      <div>
        <h3 className="text-[#5ACCB6] font-semibold mb-4 uppercase text-sm tracking-wide font-euclid">
          Quick Links
        </h3>
        <ul className="space-y-2 text-sm font-euclid">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/mission">Our Mission</Link></li>
          <li><Link href="/knowledge">Knowledge Hub</Link></li>
          <li><Link href="/luminaries">Luminaries</Link></li>
          <li><Link href="/monthly-features">Monthly Highlights</Link></li>
          <li><Link href="/involved">Get Involved</Link></li>
          <li><Link href="/engagement">Community Engagement</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-[#5ACCB6] font-semibold mb-4 uppercase text-sm tracking-wide">
          Contact
        </h3>
        <p className="text-sm">Huemanite@Icloud.com</p>
        <p className="text-sm mt-1">+1 480-529-6306</p>
      </div>
    </div>
  </div>
</footer>
</>




  );
}
