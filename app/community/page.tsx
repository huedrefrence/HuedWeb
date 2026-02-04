// app/mission/page.tsx
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/layout/Footer";

export default function CommunityPage() {
  return (
    <main className="bg-white text-[#111]">
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
            <li><Link href="/monthly-features">Monthly Highlights</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
            <li><Link href="/community" className="text-[#2F80ED]">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
            <li><Link href="/mission" >Our Mission</Link></li>
          </ul>
        </nav>
      </header>

      {/* --- New Early Access Banner Section --- */}
<section
  className="
    relative w-full flex items-center justify-center text-center overflow-hidden
    py-20 sm:py-28
  "
  style={{
    background: "linear-gradient(135deg, #F7A171 0%, #E177A8 50%, #915CD4 100%)",
    borderBottomLeftRadius: "48px",
    borderBottomRightRadius: "48px",
  }}
>
  <div className="px-4 text-white font-['Euclid Circular B'] max-w-2xl z-10">
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-12">
      Want to join the Hued Community early?
    </h1>
    <p className="text-base sm:text-2xl mb-8 leading-relaxed">
      Be part of the conversation on fashion that <br />
      counts. Get early access to the Hued beta.
    </p>
    
    <form className="flex flex-col items-center gap-3">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full max-w-[320px] rounded-[10px] px-4 py-3 bg-white text-black placeholder:text-gray-600 focus:outline-none"
      />
      <button
        type="submit"
        className="w-full max-w-[320px] bg-black text-white rounded-[10px] px-6 py-3 text-sm font-medium hover:bg-gray-800 transition"
      >
        Join the Hued Community
      </button>
    </form>
  </div>
</section>

      {/* --- Beta Launch Countdown Section --- */}
<section className="bg-white flex flex-col items-center justify-center py-6">
  <h2 className="font-['Euclid Circular B'] text-[28px] sm:text-[32px] font-semibold mb-8 text-[#111]">
    Beta Launch Countdown
  </h2>

  {/* Countdown Box */}
  <div
    className="
      flex items-center justify-center gap-8 px-10 py-6 rounded-[16px]
      bg-white shadow-sm
    "
    style={{
      border: "2px solid transparent",
      borderRadius: "16px",
      background:
        "linear-gradient(white, white) padding-box, conic-gradient(from 180deg, #F7A171, #915CD4, #E177A8, #98F8B4, #F7A171) border-box",
    }}
  >
    {/* Days */}
    <div className="flex flex-col items-center justify-center">
      <p className="font-['Euclid Circular B'] font-semibold text-[36px] leading-[44px] text-[#F27A5D]">
        7
      </p>
      <span className="uppercase text-xs font-medium text-[#111] tracking-wide">
        Days
      </span>
    </div>

    {/* Hours */}
    <div className="flex flex-col items-center justify-center">
      <p className="font-['Euclid Circular B'] font-semibold text-[36px] leading-[44px] text-[#F27A5D]">
        11
      </p>
      <span className="uppercase text-xs font-medium text-[#111] tracking-wide">
        Hrs
      </span>
    </div>

    {/* Minutes */}
    <div className="flex flex-col items-center justify-center">
      <p className="font-['Euclid Circular B'] font-semibold text-[36px] leading-[44px] text-[#F27A5D]">
        39
      </p>
      <span className="uppercase text-xs font-medium text-[#111] tracking-wide">
        Mins
      </span>
    </div>

    {/* Seconds */}
    <div className="flex flex-col items-center justify-center">
      <p className="font-['Euclid Circular B'] font-semibold text-[36px] leading-[44px] text-[#F27A5D]">
        24
      </p>
      <span className="uppercase text-xs font-medium text-[#111] tracking-wide">
        Secs
      </span>
    </div>
  </div>
</section>

{/* --- Community Conversation Section --- */}
<section className="bg-white flex flex-col items-center justify-center py-16 px-4">
  {/* Box 1 */}
  <div className="w-full max-w-3xl bg-[#FDF9F0] rounded-[20px] p-8 text-center mb-10 shadow-sm">
    <h3 className="font-['Euclid Circular B'] text-[22px] sm:text-[24px] font-semibold mb-3 text-[#111]">
      Have something to say about fashion? <br/>
    </h3>
    <br />
    <p
      className="
        font-['Euclid Circular B']
        font-normal
        text-[16px]
        leading-[24px]
        tracking-[0.5px]
        text-[#444444]
        text-center
        mb-4
      "
    >
      Join us and be part of the conversation. <br /><br />
      Let’s talk about fashion in a way that<br/> matters. Become an early Hued member.
    </p>

    {/* Image or Illustration */}
    <div className="flex justify-center mt-4">
      <Image
        src="/images/Group12.png" // <-- replace with your uploaded image
        alt="People discussing fashion"
        width={120}
        height={80}
        className="rounded-[12px] object-cover"
      />
    </div>
  </div>

  {/* Box 2 */}
  <div className="w-full max-w-3xl bg-[#FDF9F0] rounded-[20px] p-8 text-center shadow-sm">
  <h3
  className="
    font-['Euclid Circular B']
    font-semibold
    text-[22px]
    leading-[28px]
    tracking-[0.5px]
    text-[#444444]
    text-center
  "
>
      Already part of the conversation?
    </h3>
    <br/>
    <p
      className="
        font-['Euclid Circular B']
        font-normal
        text-[16px]
        leading-[24px]
        tracking-[0.5px]
        text-[#444444]
        text-center
        mb-6
      "
    >
      Follow us on Instagram for sneak peeks!
    </p>

    {/* Social Icons */}
    <div className="flex justify-center gap-4">
      <Link href="https://instagram.com" target="_blank">
        <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
      </Link>
      <Link href="https://twitter.com" target="_blank">
        <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
      </Link>
      <Link href="https://facebook.com" target="_blank">
        <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
      </Link>
      <Link href="https://google.com" target="_blank">
        <Image src="/icons/google.svg" alt="Google" width={24} height={24} />
      </Link>
    </div>
  </div>
</section>

      <Footer />
    </main>
  );
}