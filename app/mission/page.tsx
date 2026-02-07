// app/mission/page.tsx
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";



export default function MissionPage() {
  return (
    <main className="bg-white text-[#111]">
      {/* Page header (local to this page) */}
      <header className="bg-white">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Hued" width={36} height={36} priority />
            <span className="sr-only">Hued</span>
          </Link>

          <ul className="hidden md:flex gap-6 text-sm font-medium font-['Euclid Circular B']
            [&>li>a]:hover:text-[#2F80ED] [&>li>a]:transition-colors">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/mission" >Our Mission</Link></li>
            <li><Link href="/knowledge-hub">Knowledge Hub</Link></li>
            <li><Link href="/monthly-features">Monthly Highlights</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
            <li><Link href="/community">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
          </ul>
        </nav>
      </header>

<section
  className="relative w-full"
  style={{ '--header-h': '64px' } as React.CSSProperties}
>
  <div className="mx-auto w-full max-w-[1440px] px-[clamp(16px,4vw,32px)]">
    <div className="relative h-[calc(100svh-var(--header-h))] rounded-[42px] bg-[#FDF8F1] overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(16px,2.4vw,28px)] w-[92%] text-center">
        <p className="text-[13px] sm:text-sm text-black mb-2">Our mission</p>
        <h1 className="font-['Euclid Circular B'] font-semibold tracking-[-0.25px]
                       text-[clamp(28px,4.2vw,57px)]
                       leading-[clamp(34px,5vw,64px)] text-black">
          Elevating the
          <br className="hidden sm:block" /> knowledge of fashion
        </h1>
      </div>

      {/* Image stage */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-[28%] w-[88%] h-[62%]">

          {/* LEFT (taller rectangle) */}
          <div
            className="absolute left-[14%] top-[20%] w-[18%] h-[88%] rounded-[20px] overflow-hidden"
            style={{
              transform: 'rotate(-4.62deg) translateX(-6px) translateZ(0)',
              willChange: 'transform',
            }}
          >
            <Image
              src="/images/Frame23.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* MIDDLE (wide horizontal) */}
          <div
            className="absolute left-[36%] top-[22%] w-[26%] h-[38%] rounded-[20px] overflow-hidden"
            style={{
              transform: 'rotate(-3.37deg) translateX(-8px) translateZ(0)',
              willChange: 'transform',
            }}
          >
            <Image
              src="/images/Frame26.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT (taller rectangle) */}
          <div
            className="absolute right-[16%] top-[20%] w-[18%] h-[88%] rounded-[20px] overflow-hidden"
            style={{
              // Figma’s 177.38° ≈ -2.62°
              transform: 'rotate(4.62deg) translateX(-6px) translateZ(0)',
              willChange: 'transform',
            }}
          >
            <Image
              src="/images/Frame24.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* BOTTOM (wide, centered) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-4%] w-[26%] h-[38%] rounded-[20px] overflow-hidden"
            style={{
              transform: 'rotate(1.24deg) translateX(-10px) translateZ(0)',
              willChange: 'transform',
            }}
          >
            <Image
              src="/images/Frame25.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== Second design section (Figma-accurate) ===== */}
<section className="relative w-full my-[clamp(32px,6vw,80px)]">

  <div className="relative w-full max-w-[1440px] mx-auto aspect-[1440/899]">

    {/* ORANGE CARD — centered; exact Figma line breaks and centered text */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="w-[595px] h-[567px] rounded-[24px] bg-[#EB6C4A] shadow-lg px-10 py-12
                      flex items-center justify-center">
        <div className="w-full max-w-[520px] text-justify text-white font-['Euclid Circular B'] text-[28px] leading-[44px] pl-10">
          {/* paragraph 1 (exact breaks) */}
          <p >
            <span className="block">At Hued, our core mission is to</span>
            <span className="block">elevate fashion knowledge and</span>
            <span className="block">awareness by fostering a dynamic</span>
            <span className="block">trends, and expertise.</span>
          </p>

          <div className="h-6" />

          {/* paragraph 2 (exact breaks) */}
          <p>
            <span className="block">We believe that fashion is more</span>
            <span className="block">than just style-it’s a powerful form</span>
            <span className="block">peer-to-peer exchange of insights,</span>
            <span className="block">of self-expression, culture, and</span>
            <span className="block">innovation.</span>
          </p>
        </div>
      </div>
    </div>

    {/* TOP-LEFT PERSON (143×193 at 175,105) */}
    <div
      className="absolute"
      style={{ left: "12.15%", top: "11.68%", width: "9.93%", height: "21.47%" }}
    >
      <Image src="/images/chart-top-left.png" alt="" fill className="object-contain pointer-events-none select-none" priority />
    </div>

    {/* BOTTOM-LEFT DUO (178×287 at 105,445) */}
    <div
      className="absolute"
      style={{ left: "7.29%", top: "49.50%", width: "12.36%", height: "31.92%" }}
    >
      <Image src="/images/chart-left-pair.png" alt="" fill className="object-contain pointer-events-none select-none" />
    </div>

    {/* TOP-RIGHT PERSON (206×267 at 1166,124) */}
    <div
      className="absolute"
      style={{ left: "80.97%", top: "13.79%", width: "14.31%", height: "29.70%" }}
    >
      <Image src="/images/chart-top-right.png" alt="" fill className="object-contain pointer-events-none select-none" />
    </div>

    {/* BOOM-BOX (297×102 at 1057,475) */}
    <div
      className="absolute"
      style={{ left: "73.40%", top: "52.84%", width: "20.63%", height: "11.35%" }}
    >
      <Image src="/images/boom-box.png" alt="" fill className="object-contain pointer-events-none select-none" />
    </div>
  </div>
  {/* Curvy ribbons (background) */}
  <div className="pointer-events-none select-none absolute inset-0 z-0">
    {/* LEFT ribbon */}
    <div
      className="absolute left-[-6%] w-[54%] md:w-[50%] lg:w-[46%]"
      style={{
        top: "12%",
        WebkitMaskImage:
          "radial-gradient(120% 80% at 50% 50%, #000 65%, transparent 100%)",
        maskImage:
          "radial-gradient(120% 80% at 50% 50%, #000 65%, transparent 100%)",
      }}
    >
      <Image
        src="/images/curvy-ribbon.png"
        alt=""
        width={1800}
        height={900}
        sizes="100vw"
        className="h-auto w-full"
      />
    </div>

    {/* RIGHT ribbon (mirrored) */}
    <div
      className="absolute right-[-8%] w-[56%] md:w-[52%] lg:w-[48%] -scale-x-100"
      style={{
        top: "26%", // keep the same downward offset
        WebkitMaskImage:
          "radial-gradient(120% 80% at 50% 50%, #000 65%, transparent 100%)",
        maskImage:
          "radial-gradient(120% 80% at 50% 50%, #000 65%, transparent 100%)",
      }}
    >
      <Image
        src="/images/curvy-ribbon.png"
        alt=""
        width={1800}
        height={900}
        sizes="100vw"
        className="h-auto w-full"
      />
    </div>
  </div>

{/* ===== Our Values ===== */}
<section id="values" className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
  {/* Title */}
  <h2 className="text-center font-['Euclid Circular B'] text-[clamp(24px,4vw,40px)] font-semibold tracking-[-0.02em] text-[#111]">
  Our Values
</h2>

  {/* Cards */}
  <div className="relative z-10 mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        // Democratizing fashion knowledge for all
        icon: "/images/CoatHanger.png",
        strong: "Democratizing",
        soft: " fashion knowledge for all",
        desc:
          "We strive to make fashion knowledge available to all, breaking down barriers that often limit understanding and expression.",
      },
      {
        // Amplifying every voice in fashion
        icon: "/images/UserSound.png",
        strong: "Amplifying every",
        soft: " voice in fashion",
        desc:
          "We celebrate diversity in fashion and aim to create an environment where every voice is heard and valued.",
      },
      {
        // Fashion as a story: connecting past, present, and future
        icon: "/images/Record.png",
        strong: "Fashion as a story:",
        soft: " connecting past, present, and future",
        desc:
          "Fashion connects our past, reflects our identities, and influences our future. We encourage sharing stories and experiences.",
      },
      {
        // Collaborate, learn, and define your style together
        icon: "/images/ArrowsIn.png",
        strong: "Collaborate, learn,",
        soft: " and define your style together",
        desc:
          "By fostering collaboration, we create opportunities for individuals to learn from one another and achieve their desired styles together.",
      },
      {
        // Your go-to hub for fashion knowledge and support
        icon: "/images/Note.png",
        strong: "Your go-to hub for fashion",
        soft: " knowledge and support",
        desc:
          "We simplify the search for relevant fashion knowledge, providing a dedicated space where users can easily find support and resources.",
      },
      {
        // Commitment to reducing fast fashion consumption
        icon: "/images/Recycle.png",
        strong: "Commitment to reducing",
        soft: " fast fashion consumption",
        desc:
          "Empowering users to make smarter, more informed choices that support responsible and conscious fashion consumption.",
      },
    ].map((item, idx) => (
      <article
        key={idx}
        className="font-['Euclid Circular B'] rounded-2xl border border-black/10 bg-white p-6 md:p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
      >
        <div className="mb-4 h-9 w-9">
          <Image
            src={item.icon}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority={false}
          />
        </div>

       <h3 className="text-[20px] leading-[28px] tracking-[-0.02em] text-[#111] font-normal">
  <span className="font-semibold">{item.strong}</span>
  <span className="text-[#6B7280]">{item.soft}</span>
</h3>

       <p className="mt-3 text-[15px] leading-[22px] tracking-[-0.02em] text-[#6B7280]">
  {item.desc}
</p>
      </article>
    ))}
  </div>

  
</section>
</section>

<footer className="bg-[#1A1A1A] m-0">
  <div
    className="
      max-w-7xl mx-auto
      px-6 pt-12 pb-0 md:pt-16 md:pb-0
    "
    /* iOS safe-area, but still minimal */
    style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
  >
    {/* Left: Logo + Hued + tagline */}
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
      <div className="flex flex-col items-start space-y-3">
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="Hued Logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-white font-['Euclid Circular B'] text-[28px] font-semibold">
            Hued
          </span>
        </div>
        <p className="text-white/90 font-['Euclid Circular B'] text-[14px]">
          “Inspiring Fashion Knowledge”
        </p>
      </div>

      {/* Right: Quick Links + Contact */}
      <div className="flex flex-col md:flex-row justify-end gap-20">
        <div>
          <h4 className="font-['Euclid Circular B'] text-[22px] font-medium text-[#5ACCB6] uppercase">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-white font-['Euclid Circular B'] text-[16px] leading-[32px]">
            <li>Home</li>
            <li>Our Mission</li>
            <li>Knowledge Hub</li>
            <li>Resources</li>
            <li>Get Involved</li>
            <li>Community Engagement</li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Euclid Circular B'] text-[22px] font-medium text-[#5ACCB6] uppercase">
            Contact
          </h4>
          <p className="mt-4 text-white font-['Euclid Circular B'] text-[16px] leading-[32px]">
            Huemanite@Icloud.com <br />
            +1480-529-6306
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>




    </main>
  );
}
