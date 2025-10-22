import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
   <footer className="bg-[#0B1320] text-gray-300">
  <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col md:flex-row justify-between items-start gap-12">
    {/* Left: logo */}
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Image src="/images/logo.webp" alt="Hued logo" width={40} height={40} priority />
        <span className="text-white font-semibold text-lg">Hued</span>
      </div>
      <p className="text-[13px] leading-6 text-white/70">
        “Inspiring Fashion Knowledge”
      </p>
    </div>

    {/* Right group: Quick Links + Contact */}
    <div className="flex flex-col md:flex-row gap-16 md:gap-24">
      {/* Quick Links */}
      <div>
        <h3 className="text-[#3CE3C2] text-[13px] font-semibold tracking-wide mb-3">
          QUICK LINKS
        </h3>
        <ul className="space-y-1.5 text-[13px] leading-6 text-white/80">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/mission">Our Mission</Link></li>
          <li><Link href="/knowledge">Knowledge Hub</Link></li>
          <li><Link href="/luminaries">Luminaries</Link></li>
          <li><Link href="/monthly-features">Monthly Highlights</Link></li>
          <li><Link href="/involved">Get Involved</Link></li>
          <li><Link href="/community">Community Engagement</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="text-left md:text-right">
        <h3 className="text-[#3CE3C2] text-[13px] font-semibold tracking-wide mb-3">
          CONTACT
        </h3>
        <ul className="space-y-1.5 text-[13px] leading-6 text-white/80">
          <li>
            <a href="mailto:Huemanite@Icloud.com" className="hover:text-white/90">
              Huemanite@Icloud.com
            </a>
          </li>
          <li>
            <a href="tel:+14802995805" className="hover:text-white/90">
              +1-480-299-5805
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>


  );
}
