// app/components/sections/FeatureCards.tsx


const cards = [
    {
    title: "Our Mission",
    body:
      "Learn about our commitment to democratizing fashion knowledge and building an inclusive community where everyone can learn and grow.",
    headerBg: "bg-[#E9724C]",
    cta: "Discover More →",
  },
  {
    title: "See Monthly Highlights",
    body:
      "Stay updated with our curated monthly editions featuring trending topics, expert interviews, and community spotlights.",
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



        <section className="w-full py-16">
      {/* OUTER WRAPPER – centers everything */}
      <div className="flex justify-center">
        {/* GRID – controls spacing & columns */}
        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((card, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className="block w-[320px] rounded-xl overflow-hidden border border-gray-200 shadow-md transition hover:shadow-lg"
            >
              {/* HEADER */}
              <div
                className={`${card.headerBg} px-6 py-4 text-white font-semibold`}
              >
                {card.title}
              </div>

              {/* BODY */}
              <div className="px-6 py-5 bg-white">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {card.body}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-[#0E6FFF]">
                  {card.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  
  </div>
  </section>
  );
}
