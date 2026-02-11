import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      {/* HERO */}
      <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[520px]">
        <Image
          src="/images/hero.jpg"
  alt="Clothing rack with jackets and a hat"
  fill
  priority
  sizes="100vw"
  style={{ objectFit: "cover", objectPosition: "36% 20%" }}
        />

        {/* left→right darkening so headline pops like the mock */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        {/* headline overlay */}
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-6xl items-center px-4">
            <div className="max-w-xl translate-y-24 -translate-x-16">
              <h1 className="text-white font-[Euclid Circular B] font-semibold leading-[64px] tracking-[-0.25px] text-[32px] sm:text-[44px] lg:text-[57px] text-left">
  {/* Line 1 */}
  <span className="inline-block">
    Elevating{" "}
    <span className="bg-gradient-to-r from-[#F7A171] via-[#915CD4] to-[#E177A8] bg-clip-text text-transparent">
      Fashion
    </span>
  </span>

  <br />

  {/* Line 2 */}
  <span className="inline-block">
    <span className="bg-gradient-to-r from-[#F7A171] via-[#915CD4] to-[#E177A8] bg-clip-text text-transparent">
      Knowledge
    </span>{" "}
    <span className="text-[#F3F3F3]">Through</span>
  </span>

  <br />

  {/* Line 3 */}
  <span className="text-[#F3F3F3]">Community</span>
</h1>





            </div>
          </div>
        </div>
      </div>

      {/* cream band (pattern) */}
      <div className="relative bg-[#FFF6EF]">
  {/* Background image */}
  <Image
    src="/images/Bubble.png"   
    alt="Background pattern"
    fill
    priority
    className="object-cover object-center opacity-90"
  />

  {/* Content over image */}
  <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14 text-center">
    <p
  className="
    mx-auto 
    max-w-[800px] 
    text-center 
    font-['Euclid Circular B',sans-serif] 
    font-medium 
    text-[24px] 
    leading-[32px] 
    tracking-[0px] 
    text-[#232323]
  "
>
  Join a vibrant community of fashion enthusiasts, learn from industry luminaries, 
  and test your fashion knowledge with our interactive quizzes.
</p>

    
          <div className="mt-6 flex justify-center">
            <Link
              href="https://app.quizpro.tech/preview/c2a458ca-ea7d-49d5-9e2d-b392f7495243"
              className="inline-block rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1F2937]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6FFF] focus-visible:ring-offset-2"
            >
              Take the Fashion Knowledge Quiz
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
