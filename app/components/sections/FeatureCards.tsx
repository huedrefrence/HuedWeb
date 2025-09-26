// app/components/sections/FeatureCards.tsx
import Link from "next/link";

const cards = [
  {
    title: "Meet Our Fashion Luminaries",
    body:
      "Connect with industry leaders, emerging designers, and fashion visionaries who are shaping the future of style and innovation.",
    href: "/luminaries",
    headerBg: "bg-[#2F7DE1]",
    cta: "Meet the Experts →",
  },
  {
    title: "Our Mission",
    body:
      "Learn about our commitment to democratizing fashion knowledge and building an inclusive community where everyone can learn and grow.",
    href: "/our-mission",
    headerBg: "bg-[#E9724C]",
    cta: "Discover More →",
  },
  {
    title: "See Monthly Highlights",
    body:
      "Stay updated with our curated monthly editions featuring trending topics, expert interviews, and community spotlights.",
    href: "/highlights",
    headerBg: "bg-[#2FBF9B]",
    cta: "View Highlights →",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p
  className="
    mb-10 
    text-center 
    font-['Euclid Circular B',sans-serif] 
    font-medium 
    text-[28px] 
    leading-[32px] 
    tracking-[0px] 
    text-[#444444] 
    max-w-[820px] 
    mx-auto
  "
>
  Explore our curated content, meet industry leaders,
  <br />
  and stay updated with the latest fashion insights
</p>



        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-[20px] bg-[#FFF6EF] shadow-md ring-1 ring-black/5
                         transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* colored header */}
              <div
                className={`${c.headerBg} px-6 py-4 text-white`}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
              >
                <h3 className="text-[18px] font-semibold leading-tight">
                  {c.title}
                </h3>
              </div>

              {/* body */}
              <div className="space-y-4 px-6 py-6">
                <p className="text-[15px] leading-7 text-[#444444]">{c.body}</p>
                <Link
                  href={c.href}
                  className="inline-flex items-center text-[15px] font-semibold text-[#444444] underline-offset-4 hover:underline"
                >
                  {c.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
