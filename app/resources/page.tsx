
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type QA = {
  id: string;
  question: string;
  content?: React.ReactNode;
  defaultOpen?: boolean;
};

const qas: QA[] = [
  {
    id: 'q1',
    question: 'What are the latest fashion trends for 2025?',
    // Closed by default (in the Figma, only the third card is open at first)
  },
  {
    id: 'q2',
    question: 'What are the best sustainable fashion brands?',
  },
  {
    id: 'q3',
    question: 'How to build a capsule wardrobe?',
    defaultOpen: true,
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Building a capsule wardrobe means curating a minimal yet versatile collection of clothing
          that can be effortlessly mixed and matched. Here’s how to create one:
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="text-[#4E4E4E]">Essential Pieces</span> – Invest in key wardrobe
            staples like a white shirt, black jeans, and a trench coat, along with other versatile
            items that suit your personal style.
          </li>
          <li>
            <span className="text-[#4E4E4E]">Color Palette</span> – Stick to neutral and
            complementary colors to ensure easy pairing and a cohesive look.
          </li>
          <li>
            <span className="text-[#4E4E4E]">Seasonal Adjustments</span> – Adapt your wardrobe with
            layers for winter and lighter fabrics for summer to maintain comfort and style
            year-round.
          </li>
          <li>
            <span className="font-medium text-[#4E4E4E]">Quality vs. Quantity</span> – Prioritize high-quality,
            timeless pieces over fast fashion, focusing on durability and versatility rather than
            fleeting trends.
          </li>
        </ul>

        <p>
          A well-planned capsule wardrobe simplifies dressing while keeping you stylish and prepared
          for any occasion!
        </p>
      </div>
    ),
  },
  {
    id: 'q4',
    question: 'What are the best fashion hacks or styling tips?',
  },
  {
    id: 'q5',
    question: 'What are the fashion trends for plus-size individuals?',
  },
];

export default function ResourcesPage() {
  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(qas.map(q => [q.id, !!q.defaultOpen]))
  );

  const toggle = (id: string) =>
    setOpen(prev => ({
      ...prev,
      [id]: !prev[id],
    }));

  return (
    <main className="bg-white text-[#111]">
      {/* HEADER (kept lightweight; see snippet in section 2 to reuse your main header) */}
      <header className="mx-auto max-w-6xl px-4 py-5 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.webp" alt="Hued" width={36} height={36} priority />
          <span className="sr-only">Hued</span>
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-7 font-['Euclid Circular B']">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <Link href="/knowledge-hub" className="hover:opacity-70">Knowledge Hub</Link>
          <Link href="/luminaries" className="hover:opacity-70">Luminaries</Link>
          <Link href="/resources" className="text-[#2F80ED]">Resources</Link>
          <Link href="/get-involved" className="hover:opacity-70">Get Involved</Link>
          <Link href="/community" className="hover:opacity-70">Community Engagement</Link>
          <Link href="/beta" className="hover:opacity-70">Hued Beta</Link>
        </nav>
      </header>

      {/* PAGE BODY */}
      <section className="mx-auto max-w-[1200px] px-6 pt-[120px] pb-12 md:pt-[140px] md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,420px)_1fr] gap-10 lg:gap-14">
          {/* LEFT: Title + CTA + Illustration */}
          <div>
            <p className="text-[#65A6F8] text-[12px] tracking-wide font-medium">FAQ</p>

            <h1 className="mt-2 font-['Euclid Circular B'] text-[clamp(28px,5vw,48px)] leading-[1.1] text-[#313131]">
              We have 24/7 <br /> support available.
            </h1>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-[#111] px-5 py-3 text-white font-['Euclid Circular B'] text-[15px]"
            >
              Contact Support
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Floating chair illustration with realistic shadow */}
<div className="relative flex flex-col items-center w-[min(420px,95%)] mx-auto mt-14">
  {/* Main illustration */}
  <Image
    src="/images/WomenOnCouch.png"
    alt="Woman sitting on a couch"
    width={280}
    height={260}
    className="block h-auto w-full mb-[-35px]"
    priority
  />

  <Image
    src="/images/ellipse.png"  
    alt="Shadow"
    width={300}               
    height={70}
    className="block w-[75%] h-auto opacity-80"
    priority
  />
</div>


          </div>

          {/* RIGHT: Accordion */}
          <div className="space-y-6">
            {qas.map(q => (
  <article
    key={q.id}
    className={`rounded-[14px] border border-black/5 transition-colors ${
      open[q.id] ? 'bg-[#FFF9F1]' : 'bg-white'
    }`}
  >
                <button
                  onClick={() => toggle(q.id)}
                  className="w-full flex items-center justify-between text-left px-6 py-5"
                >
                  <h3 className="font-['Euclid Circular B'] text-[18px] md:text-[20px] leading-7 text-[#1E1E1E]">
                    {q.question}
                  </h3>
                  {/* plus / minus */}
                  <span className="ml-4 shrink-0">
                    {open[q.id] ? (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M5 12h14" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 5v14M5 12h14" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>

                {/* Body */}
                {q.content && open[q.id] && (
                  <div className="px-6 pb-6 text-[14.5px] leading-7 text-[#3A3A3A]">
                    {q.content}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-[#1A1A1A]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <Image src="/images/logo.webp" alt="Hued" width={36} height={36} />
                <span className="font-['Euclid Circular B'] text-white text-[28px] font-semibold">
                  Hued
                </span>
              </div>
              <p className="mt-4 text-white/90 font-['Euclid Circular B'] text-[14px]">
                “Inspiring Fashion Knowledge”
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-16 lg:gap-24 text-right md:text-left">
            {/* Quick links */}
            <div>
              <h4 className="font-['Euclid Circular B'] text-[18px] font-medium text-[#5ACCB6] uppercase mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-white font-['Euclid Circular B'] text-[15px] leading-[28px]">
                <li><Link href="/" className="hover:opacity-80">Home</Link></li>
                <li><Link href="/mission" className="hover:opacity-80">Our Mission</Link></li>
                <li><Link href="/knowledge-hub" className="hover:opacity-80">Knowledge Hub</Link></li>
                <li><Link href="/luminaries" className="hover:opacity-80">Luminaries</Link></li>
                <li><Link href="/resources" className="hover:opacity-80">Resources</Link></li>
                <li><Link href="/get-involved" className="hover:opacity-80">Get Involved</Link></li>
                <li><Link href="/community" className="hover:opacity-80">Community Engagement</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-['Euclid Circular B'] text-[18px] font-medium text-[#5ACCB6] uppercase mb-4">
                Contact
              </h4>
              <div className="text-white font-['Euclid Circular B'] text-[15px] leading-[28px]">
                <p>Huemanite@Icloud.com</p>
                <p>+1480-529-6306</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
