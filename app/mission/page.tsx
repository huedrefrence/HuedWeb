// app/mission/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function MissionPage() {
  return (
    <main className="bg-white text-[#111]">
      {/* Page-specific header (kept simple so it won't conflict) */}
      <header className="bg-white border-b border-black/5">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.webp" alt="Hued" width={36} height={36} priority />
            <span className="sr-only">Hued</span>
          </Link>
          <ul className="hidden md:flex gap-6 text-sm font-medium font-['Euclid Circular B']">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/knowledge-hub">Knowledge Hub</Link></li>
            <li><Link href="/luminaries">Luminaries</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
            <li><Link href="/community">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
            <li><Link href="/mission" className="text-[#2F80ED]">Our Mission</Link></li>
          </ul>
        </nav>
      </header>

      {/* Screen-fitting section with cross-platform viewport handling */}
      <section className="mx-auto max-w-6xl px-4">
        <div
          className="
            mt-6 rounded-[32px] bg-[#FDF8F1]
            px-5 sm:px-8 pt-[calc(env(safe-area-inset-top,0px)+20px)] pb-6
            shadow-[0_1px_0_rgba(0,0,0,0.05)]
            flex flex-col items-center
          "
         
          style={{
            minHeight:
              "min(100dvh, 100svh, 100vh)", 
          }}
        >
          {/* Text */}
          <div className="text-center px-2">
            <p className="text-[13px] sm:text-sm text-black/60 mb-2">Our mission</p>
            <h1
              className="
                font-['Euclid Circular B'] font-semibold tracking-[-0.25px]
                /* clamp(min, preferred, max) -> scales smoothly */
                text-[clamp(28px,4.2vw,57px)]
                leading-[clamp(34px,5vw,64px)]
              "
            >
              Elevating the
              <br className="hidden sm:block" />
              {" "}knowledge of fashion
            </h1>
          </div>

          {/* Image wrapper that always fits and shows entire collage */}
          <div
            className="
              mt-6 w-full flex-1 flex items-center justify-center
            "
           
            style={{
              height: "clamp(260px, 60svh, 720px)",
              
              blockSize: "clamp(260px, 60vh, 720px)",
            }}
          >
            <div className="relative w-full max-w-[1100px] h-full">
              <Image
                src="/images/hero2.png" 
                alt="Elevating the knowledge of fashion"
                fill
                priority
                sizes="(min-width:1280px) 1100px, (min-width:768px) 92vw, 96vw"
                className="object-contain rounded-[24px]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
