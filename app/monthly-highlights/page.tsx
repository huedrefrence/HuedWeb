"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Footer from "../components/layout/Footer";

function IconComment(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 4h16v12H7l-3 3V4zm2 2v9.17L6.83 14H18V6H6z"
      />
    </svg>
  );
}

function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 21s-7.05-4.35-9.33-8.2C.6 9.6 2.1 6.5 5.4 6.05c1.7-.23 3.14.52 4.1 1.6.96-1.08 2.4-1.83 4.1-1.6 3.3.45 4.8 3.55 2.73 6.75C19.05 16.65 12 21 12 21z"
      />
    </svg>
  );
}

function IconBookmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 2h12v20l-6-4-6 4V2zm2 2v14.3l4-2.67 4 2.67V4H8z"
      />
    </svg>
  );
}

function IconMegaphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 10v4c0 .55.45 1 1 1h2l4 4v-4h6l5 3V6l-5 3H10V5l-4 4H4c-.55 0-1 .45-1 1zm15.5 5.17L16 13.7V10.3l2.5-1.47v6.34z"
      />
    </svg>
  );
}

function IconTShirt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 4l3 2 3 2-2 4-2-1v11H6V11l-2 1-2-4 3-2 3-2 2 2h4l2-2zm-6 4H8l-3 2 1 2 2-1v9h8v-9l2 1 1-2-3-2h-2l-1 1h-2l-1-1z"
      />
    </svg>
  );
}

function IconBrain(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.5 3C7.6 3 6 4.6 6 6.5c0 .3.03.6.1.88C4.8 7.9 4 9.1 4 10.5c0 1.1.5 2.1 1.3 2.8-.2.4-.3.9-.3 1.4 0 1.7 1.1 3.1 2.6 3.6.2 1.6 1.6 2.7 3.2 2.7.8 0 1.6-.3 2.2-.8.6.5 1.4.8 2.2.8 1.6 0 3-.9 3.2-2.7 1.5-.5 2.6-1.9 2.6-3.6 0-.5-.1-1-.3-1.4.8-.7 1.3-1.7 1.3-2.8 0-1.4-.8-2.6-2.1-3.12.07-.28.1-.58.1-.88C18 4.6 16.4 3 14.5 3c-1 0-1.9.4-2.5 1.1C11.4 3.4 10.5 3 9.5 3z"
      />
    </svg>
  );
}

function IconWand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M2 21l10-10 1 1L3 22H2v-1zm12.3-11.3l-1-1 6.4-6.4c.4-.4 1-.4 1.4 0l.6.6c.4.4.4 1 0 1.4l-6.4 6.4zM14 5l1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1z"
      />
    </svg>
  );
}

function IconScissors(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.64 7.64a3 3 0 10-1.28 1.28L11 11.56l-2.64 2.64a3 3 0 101.28 1.28L12.28 13l4.72 4.72 1.41-1.41L13.7 11.59l4.71-4.71-1.41-1.41L12.29 10.18 9.64 7.64zM7 6a1 1 0 110 2 1 1 0 010-2zm0 10a1 1 0 110 2 1 1 0 010-2z"
      />
    </svg>
  );
}

function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
      />
    </svg>
  );
}

function IconStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

export default function MonthlyFeatures() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    reason: "",
  });

  const [status, setStatus] = useState<null | string>(null);

  const categories = [
    "Influencer",
    "Model",
    "Entrepreneur",
    "Techno",
    "Stylist",
    "Fashion Enthusiast",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/routeMonth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.status === "success") {
        setStatus("Form submitted successfully!");
        setFormData({ name: "", category: "", email: "", reason: "" });
      } else {
        setStatus("Error submitting form. Try again.");
        console.log(result);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error submitting form. Try again.");
    }
  };

  return (
    <main className="bg-white text-[#111] flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Hued"
              width={36}
              height={36}
              priority
            />
            <span className="sr-only">Hued</span>
          </Link>

          <ul className="hidden md:flex gap-6 text-sm font-medium font-['Euclid Circular B']">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/knowledge-hub">Knowledge Hub</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
            <li><Link href="/community">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
            <li><Link href="/mission" className="text-[#2F80ED]">Our Mission</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="w-full relative flex justify-center items-center">
        <Image
          src="/images/Frame125.png"
          alt="Fashion collage"
          width={1920}
          height={1080}
          priority
          className="object-cover w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="font-['Euclid Circular B'] text-white font-medium text-[57px] leading-[64px] tracking-[-0.25px] drop-shadow-lg">
            MONTHLY
            <br />
            HIGHLIGHTS
          </h1>
          <p className="font-['Euclid Circular B'] text-white font-medium text-[24px] leading-[32px] mt-3 drop-shadow-md">
            March 2025
          </p>
        </div>
      </section>

      {/* Heading */}
      <section className="w-full py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-['Euclid Circular B'] text-3xl text-[#111]">
            Fashion Knowledge Contributors
          </h2>
        </div>
      </section>

      {/* Placards */}
      <section className="w-full flex justify-center items-start pt-2 pb-12 bg-white">
        <div className="w-full max-w-6xl px-4 grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Maria Rodriguez",
              profession: "Sustainable Fashion Advocate",
              image: "/images/Frame121.png",
              alt: "Fashion Icon",
              date: "March 28, 2025",
              description:
                "Celebrating innovators who redefine fashion with creativity and sustainability.",
              tags: ["Sustainable", "Recolution", "Minimalist"],
            },
            {
              name: "Maria Rodriguez",
              profession: "Sustainable Fashion Advocate",
              image: "/images/Frame121.png",
              alt: "Tech Entrepreneur",
              date: "March 28, 2025",
              description:
                "Spotlighting tech leaders who are shaping the future of digital experiences.",
              tags: ["Sustainable", "Recolution", "Minimalist"],
            },
            {
              name: "Jessica Wang",
              profession: "Influencer",
              image: "/images/Frame127.png",
              alt: "Community Leader",
              date: "Oct 12, 2025",
              description:
                "Highlighting changemakers making meaningful social and cultural impact.",
              tags: ["Sustainable", "Recolution", "Minimalist"],
            },
          ].map((placard, i) => (
            <div
              key={i}
              className="flex flex-col bg-[#FDF8F1] rounded-lg shadow-md overflow-hidden"
            >
              <div className="w-full h-50 relative">
                <Image
                  src={placard.image}
                  alt={placard.alt}
                  fill
                  className="object-cover w-full rounded-t-lg"
                />
              </div>

              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold">
                    {placard.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {placard.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {placard.profession}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{placard.date}</span>
              </div>

              <div className="p-3 flex flex-col">
                <p className="text-sm text-gray-800 mb-2 line-clamp-2">
                  {placard.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {placard.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#E5E3DD] text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="border-t border-gray-300 my-2" />

                <div className="flex justify-end gap-3 text-gray-500">
                  <IconComment className="h-5 w-5 hover:text-blue-500 cursor-pointer" />
                  <IconHeart className="h-5 w-5 hover:text-red-500 cursor-pointer" />
                  <IconBookmark className="h-5 w-5 hover:text-yellow-500 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nomination Form */}
      <section className="w-full flex justify-center items-center py-12 bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-6xl flex flex-col gap-4 bg-[#FDF8F1] p-6 rounded-lg shadow-md"
        >
          <h1 className="text-3xl font-['Euclid Circular B'] mb-4 text-[#F9AA31]">
            Nominate an Innovator
          </h1>

          {/* Nominee Name */}
          <label className="flex flex-col text-sm font-medium">
            Nominee Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="font-['Euclid Circular B'] mt-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Full name"
              required
            />
          </label>

          {/* Category Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Category</span>

            <div className="font-['Euclid Circular B'] grid grid-cols-3 gap-2">
              {categories.map((cat) => {
                const isSelected = formData.category === cat;

                const Icon = (() => {
                  if (cat === "Influencer") return IconMegaphone;
                  if (cat === "Model") return IconTShirt;
                  if (cat === "Entrepreneur") return IconBrain;
                  if (cat === "Techno") return IconWand;
                  if (cat === "Stylist") return IconScissors;
                  return IconUser;
                })();

                return (
                  <div
                    key={cat}
                    className={`rounded-lg p-[2px] ${
                      isSelected
                        ? "bg-gradient-to-r from-[#F7A171] via-[#915CD4] via-[#E177A8] to-[#98F8B4]"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleCategorySelect(cat)}
                      className={`flex flex-col items-center justify-center px-4 py-2 rounded font-medium border-none w-full ${
                        isSelected
                          ? "bg-white text-gray-900 border-transparent"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <div className="relative mb-1">
                        <Icon className="h-6 w-6" />
                        {cat === "Fashion Enthusiast" && (
                          <IconStar className="h-4 w-4 absolute -top-1 -right-1 text-yellow-400" />
                        )}
                      </div>
                      <span>{cat}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email */}
          <label className="flex flex-col text-sm font-medium">
            Email ID
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white mt-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              required
            />
          </label>

          {/* Reason */}
          <label className="font-['Euclid Circular B'] flex flex-col text-sm font-medium">
            Why should they be featured
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="bg-white mt-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share their unique story and impact"
              rows={5}
              required
            />
          </label>

          <button
            type="submit"
            className="font-['Euclid Circular B'] mt-4 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition self-start"
          >
            Submit
          </button>

          {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
        </form>
      </section>

      <Footer />
    </main>
  );
}
