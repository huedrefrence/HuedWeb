"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/layout/Footer";
import { FaBullhorn, FaTshirt, FaBrain } from "react-icons/fa";
import { FaComment, FaHeart, FaBookmark, FaRegStar } from "react-icons/fa";
import { GiMagicLamp, GiScissors } from "react-icons/gi"; // magic wand and scissors
//import { HiOutlineUserStar } from "react-icons/hi"; // user-star icon
import { Megaphone, TShirt, Brain, MagicWand, Scissors, User } from "phosphor-react";
import { Star } from "phosphor-react";

export default function MonthlyFeatures() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    email: "",
    reason: "",
  });

  //const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxO55S5hkgngYSV5E8kBG-esiRpGdYcQgG041yIknvpJX9cC3BN7cHiYIikly-YkSKg/exec";
  const [status, setStatus] = useState<null | string>(null);

  const [category, setCategory] = useState<string | null>(null);
  const categories = [
    "Influencer",
    "Model",
    "Entrepreneur",
    "Techno",
    "Stylist",
    "Fashion Enthusiast",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      console.log(result);
      if (result.status === "success") {
        setStatus("Form submitted successfully!");
        setFormData({ name: "", category: "", email: "", reason: "" });
      } else {
        setStatus("Error submitting form. Try again.");
        console.log(result); // log for debugging
      }
    } catch (err) {
      console.error(err); // log the error
      setStatus("Error submitting form. Try again.");
    }
  };
  

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
            <li><Link href="/monthly-features/">Monthly Features</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
            <li><Link href="/community">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
            <li><Link href="/mission" className="text-[#2F80ED]">Our Mission</Link></li>
          </ul>
        </nav>
      </header>

      {/* Image Section: top half of viewport */}


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
  <h1
    className="font-['Euclid Circular B'] text-white font-medium text-[57px] leading-[64px] tracking-[-0.25px] drop-shadow-lg"
  >
    MONTHLY
    <br />
    HIGHLIGHTS
  </h1>
  <p
    className="font-['Euclid Circular B'] text-white font-medium text-[24px] leading-[32px] tracking-[0px] mt-3 drop-shadow-md"
  >
    <br />
    March 2025
  </p>
</div>

</section>




      {/* Fashion Contributors Heading */}
      <section className="w-full py-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Euclid Circular B'] text-3xl text-[#111]">
            <br />
            <br />
            Fashion Knowledge Contributors
          </h2>
        </div>
      </section>

      {/* Placards Section */}
      <section className="w-full flex justify-center items-start pt-2 pb-12  bg-white">
  <div className="w-full max-w-6xl grid md:grid-cols-3 gap-6">
    {[
      {
        name: "Maria Rodriguez",
        profession: "Sustainable Fashion Advocate",
        image: "/images/Frame121.png",
        alt: "Fashion Icon",
        date: "March 28, 2025",
        description: "Celebrating innovators who redefine fashion with creativity and sustainability.",
        tags: ["Sustainable", "Recolution", "Minimalist"],
      },
      {
        name: "Maria Rodriguez",
        profession: "TSustainable Fashion Advocate",
        image: "/images/Frame121.png",
        alt: "Tech Entrepreneur",
        date: "March 28, 2025",
        description: "Spotlighting tech leaders who are shaping the future of digital experiences.",
        tags: ["Sustainable", "Recolution", "Minimalist"],
      },
      {
        name: "Jessica Wang ",
        profession: "Influencer",
        image: "/images/Frame127.png",
        alt: "Community Leader",
        date: "Oct 12, 2025",
        description: "Highlighting changemakers making meaningful social and cultural impact.",
        tags: ["Sustainable", "Recolution", "Minimalist"],
      },
    ].map((placard, i) => (
      <div
        key={i}
        className="flex flex-col bg-[#FDF8F1] rounded-lg shadow-md overflow-hidden"
      >
        {/* Image */}
        <div className="w-full h-50 relative"> {/* fixed shorter height */}
          <Image
            src={placard.image}
            alt={placard.alt}
            fill
            className="object-cover w-full rounded-t-lg"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between px-3 py-2"> {/* slightly smaller padding */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold">
              {placard.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{placard.name}</span>
              <span className="text-xs text-gray-500">{placard.profession}</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{placard.date}</span>
        </div>

        {/* Description + Tags + Icons */}
        <div className="p-3 flex flex-col"> {/* reduced padding */}
          <p className="text-sm text-gray-800 mb-2 line-clamp-2">{placard.description}</p> {/* clamp lines */}
          <div className="flex flex-wrap gap-1 mb-2">
            {placard.tags.map((tag, idx) => (
              <span
                key={idx}
                className=" bg-[#E5E3DD] text-gray-800 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="border-t border-gray-300 my-2" />
          <div className=" flex justify-end gap-3 text-gray-500">
            <FaComment className="hover:text-blue-500 cursor-pointer" />
            <FaHeart className="hover:text-red-500 cursor-pointer" />
            <FaBookmark className="hover:text-yellow-500 cursor-pointer" />
          </div>
        </div>
      </div>
    ))}
  </div>
</section>




     
{/* Nomination Form Section */}
<section className="w-full flex justify-center items-center py-12 bg-white">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-6xl flex flex-col gap-4 bg-[#FDF8F1] p-6 rounded-lg shadow-md"
  >
    <h1 className="text-3xl font-['Euclid Circular B'] mb-4 text-[#F9AA31]">
      Nominate an Innovator
    </h1>

    {/* Gradient Definition */}
    <svg className="w-0 h-0">
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F7A171" />
          <stop offset="33%" stopColor="#915CD4" />
          <stop offset="66%" stopColor="#E177A8" />
          <stop offset="100%" stopColor="#98F8B4" />
        </linearGradient>
      </defs>
    </svg>

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
                className={`flex flex-col items-center font-['Euclid Circular B'] justify-center px-4 py-2 rounded font-medium border-none w-full ${
                  isSelected
                    ? "bg-white text-gray-900 border-transparent"
                    : "bg-white text-gray-700 border-white-300"
                }`}
              >
                {cat === "Influencer" && (
                  <Megaphone
                    size={24}
                    weight="fill"
                    style={{ fill: "url(#iconGradient)" }}
                    className="mb-1"
                  />
                )}
                {cat === "Model" && (
                  <TShirt
                    size={24}
                    weight="fill"
                    style={{ fill: "url(#iconGradient)" }}
                    className="mb-1"
                  />
                )}
                {cat === "Entrepreneur" && (
                  <Brain
                    size={24}
                    weight="fill"
                    style={{ fill: "url(#iconGradient)" }}
                    className="mb-1"
                  />
                )}
                {cat === "Techno" && (
                  <MagicWand
                    size={24}
                    weight="fill"
                    style={{ fill: "url(#iconGradient)" }}
                    className="mb-1"
                  />
                )}
                {cat === "Stylist" && (
                  <Scissors
                    size={24}
                    weight="fill"
                    style={{ fill: "url(#iconGradient)" }}
                    className="mb-1"
                  />
                )}
                {cat === "Fashion Enthusiastmonth" && (
                  <div className="relative mb-1">
                    <User
                      size={24}
                      weight="fill"
                      style={{ fill: "url(#iconGradient)" }}
                    />
                    <Star
                      size={24}
                      weight="bold"
                      className="absolute -top-1 -right-1 text-yellow-400"
                    />
                  </div>
                )}
                <span>{cat}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>

    {/* Email ID */}
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

    {/* Why should they be featured */}
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

   {/* Upload Media */}
  {/*  <label className="font-['Euclid Circular B'] flex flex-col text-sm font-medium">
      Upload Media
      <input type="file" className="bg-white mt-1" accept="image/*,video/*" />
      </label> */}

    {/* Submit Button */}
    <button
      type="submit"
      className="font-['Euclid Circular B'] mt-4 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition self-start"
    >
      Submit
    </button>

    {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
  </form>
</section>

      

      {/* Footer */}
      <Footer />
    </main>
  );
}
