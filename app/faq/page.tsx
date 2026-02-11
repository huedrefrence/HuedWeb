
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
    question: 'What influences seasonal trends?',
    defaultOpen: false,
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Several key factors influence seasonal trends: weather dictates fabric choices and how we
          layer; culture shapes themes, colors, and narratives; and social media drives real-time visibility
          and virality. Innovation also plays a major role, with new textiles, production techniques, and
          design ideas pushing fashion forward. Always remember, trends are cyclical. What’s hot today
          may fade, but it often returns in a reimagined form. Fashion constantly reinvents itself.
        </p>
      </div>
    ),    
  },
  {
    id: 'q2',
    question: 'How can I find or define my personal fashion style?',
    defaultOpen: false,
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Try exploring mood boards, reviewing your favorite outfits, and analyzing what makes you
feel confident. Don’t be afraid to experiment with colors, fits, and accessories until you find what
truly resonates.
        </p>
      </div>
    ),   
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
    question: 'What are the essential wardrobe basics everyone should own?',
    defaultOpen: false,
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Timeless basics include a white shirt, tailored blazer, classic cut jeans, neutral sweater, loafers
or sneakers. Build on these pieces for versatility.
        </p>
      </div>
    ),   
  },
  {
    id: 'q5',
    question: 'How do I build a capsule wardrobe that fits my lifestyle?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Choose a limited number of high-quality, easy-to-mix staples in your preferred palette and
silhouette. Update occasionally with one or two trendy accents to keep things fresh.
        </p>
      </div>
    ),
  },
  {
    id: 'q6',
    question: 'How do I combine comfort with style in my wardrobe?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Prioritize soft, breathable fabrics and flexible fits, think loose trousers, knitwear, and relaxed
tailoring combined with a standout accessory.
        </p>
      </div>
    ),
  },
  {
    id: 'q7',
    question: 'How can I mix classic and trendy pieces effectively?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Pair one trendy item (like a bold accessory or statement denim) with classic basics to keep
your look both current and timeless.
        </p>
      </div>
    ),
  },
  {
    id: 'q8',
    question: 'What does sustainable fashion really mean today?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Sustainable fashion means designing, producing, and consuming clothing in ways that
minimize environmental impact, prioritize fair labor, and maximize longevity over fast
disposability.
        </p>
      </div>
    ),
  },
  {
    id: 'q9',
    question: 'How can I recognize brands that are truly eco-friendly and not greenwashing?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Look for transparency in material sourcing, fair trade certifications, carbon offset initiatives,
and the absence of misleading environmental claims on brand sites.
        </p>
      </div>
    ),
  },
  {
    id: 'q14',
    question: 'What are simple ways to make my wardrobe more sustainable?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Buy fewer, higher-quality items, opt for timeless designs, thrift, recycle, and support brands
prioritizing eco-friendly practices.
        </p>
      </div>
    ),
  },
  {
    id: 'q10',
    question: 'How can I style one piece in multiple ways?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Use layering, accessories, and footwear to transform a staple (ex: shift a blazer from office to
evening with jewelry or a statement top).
        </p>
      </div>
    ),
  },
  {
    id: 'q11',
    question: 'What are the best fashion hacks for a polished look?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Invest in tailoring, use double-sided tape for fit fixes, plan outfits by occasion in advance, and
accessorize smartly with scarves and belts.
        </p>
      </div>
    ),
  },
  {
    id: 'q12',
    question: 'How do I choose the right colors and fits for my body type?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Experiment with different shades and silhouettes to find what best complements your shape
and skin tone. Don’t hesitate to use online guides or consult trusted stylists for direction. Try
various fits depending on your mood or the aesthetic. Confidence isn’t just about what fits well,
but also about how your aesthetic reflects how you want to feel and be perceived.
        </p>
      </div>
    ),
  },
  {
    id: 'q13',
    question: 'What are some timeless fashion rules everyone should know?',
    content: (
      <div className="space-y-4 text-[#2B2B2B]">
        <p>
          Fit + utility always comes first: even the most stylish piece won&#39;t work if it doesn&#39;t fit well.
Prioritize quality over quantity: buy fewer items, but make sure each one truly adds value to your
wardrobe. Before purchasing something, ask yourself not just if it looks good, but whether it
complements what you already own. Choose versatile pieces that can be styled in multiple ways
to maximize their utility.
        </p>
      </div>
    ),
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
      <header className="w-full bg-white border-b border-black/10">
  <nav className="mx-auto max-w-[1400px] flex items-center px-10 py-5 gap-50">

    {/* Logo */}
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="Hued Logo"
        width={40}
        height={40}
        priority
      />
    </Link>

    {/* Nav Links */}
    <div className="flex items-center gap-8 text-black font-[Euclid Circular B] text-[15px]">
      <Link href="/" className="hover:text-[#2F80ED]">Home</Link>
      <Link href="/mission" className="hover:text-[#2F80ED]">Our Mission</Link>
      <Link href="/knowledge-hub" className="hover:text-[#2F80ED]">Knowledge Hub</Link>
      <Link href="/faq" className="hover:text-[#2F80ED]">FAQ</Link>
      <Link href="/monthly-highlights" className="hover:text-[#2F80ED]">Monthly Highlights</Link>
      <Link href="/get-involved" className="hover:text-[#2F80ED]">Get Involved</Link>
      <Link href="/community" className="hover:text-[#2F80ED]">Community Engagement</Link>
      <Link href="/beta" className="hover:text-[#2F80ED]">Hued Beta</Link>
    </div>

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
              href="#faq-footer"
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
    className="block h-auto w-full mb-[-35px] mt-100"
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


      <footer id="faq-footer" className="bg-[#1A1A1A]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <Image src="/images/logo.png" alt="Hued" width={36} height={36} />
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
                <li><Link href="/faq" className="hover:opacity-80">Resources</Link></li>
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
                <p>
                  <a href="mailto:Huemanite@Icloud.com" className="hover:opacity-80">
                    Huemanite@Icloud.com
                  </a>
                </p>
                <p>
                  <a href="tel:+14805296306" className="hover:opacity-80">
                    +1480-529-6306
                  </a>
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
