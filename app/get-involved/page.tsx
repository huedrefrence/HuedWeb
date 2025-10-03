// app/get-involved/page.tsx
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/layout/Footer"; // adjust path if needed

export default function GetInvolvedPage() {
  return (
    <main className="bg-white text-[#111] flex flex-col min-h-screen">
      {/* Header */}
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
            <li><Link href="/get-involved" className="text-[#2F80ED]">Get Involved</Link></li>
            <li><Link href="/community">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
            <li><Link href="/mission">Our Mission</Link></li>
          </ul>
        </nav>
      </header>

      {/* Content: Split Screen */}
      <div className="flex-grow flex flex-col">
        {/* Top half: Image */}
        <div className="w-full relative h-[135vh] overflow-hidden">
          <Image
            src="/images/Frame_64.png"
            alt="Get Involved"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Bottom half: Form placeholder */}
        <div className="w-full flex-1 flex items-center justify-center bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-700">Form will go here</h2>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
