"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/layout/Footer";

export default function GetInvolvedPage() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    source: "",
    contribute: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch(
        "/api", // replace with your deployed Google Apps Script URL
        {
          method: "POST",
          mode: "no-cors", // Required for public Google Apps Script
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      alert("Thanks for joining Hued! Your response has been recorded.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        source: "",
        contribute: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="bg-white text-[#111] flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Hued" width={36} height={36} priority />
            <span className="sr-only">Hued</span>
          </Link>
          <ul className="hidden md:flex gap-6 text-sm font-medium font-['Euclid Circular B']">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/knowledge-hub">Knowledge Hub</Link></li>
            <li><Link href="/monthly-highlights">Monthly Highlights</Link></li>
            <li><Link href="/get-involved" className="text-[#2F80ED]">Get Involved</Link></li>
            <li><Link href="/community">Community Engagement</Link></li>
            <li><Link href="/beta">Hued Beta</Link></li>
            <li><Link href="/mission">Our Mission</Link></li>
          </ul>
        </nav>
      </header>

      {/* Content */}
      <div className="flex-grow flex flex-col font-['Euclid Circular B']">
        {/* Top Half: Image + Text */}
        <div className="relative w-[95%] mx-auto my-4 h-[90vh] sm:h-[100vh] md:h-[110vh] lg:h-[135vh] overflow-hidden rounded-lg">
          <Image
            src="/images/Frame_64.png"
            alt="Get Involved"
            fill
            className="object-contain"
            priority
          />

          {/* Top Text */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center text-[#444444] px-4 sm:px-6 md:px-8">
            <h1
              className="text-[5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.5vw] font-semibold drop-shadow-lg leading-tight
              bg-gradient-to-r from-[#F27A5D] via-[#F9AA31] via-[#A587D1] to-[#6AB0E5] bg-clip-text text-transparent"
            >
              Interested in Joining Hued?
            </h1>
            <p className="text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] mt-2 sm:mt-3 drop-shadow-md">
              Are you a Stylist, Designer, or Fashion<br />
              Tech Enthusiast? <br />
            </p>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center text-[#232323] px-4 sm:px-6 md:px-8 max-w-[80%] md:max-w-3xl">
            <p className="text-[2.5vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.25vw] leading-relaxed drop-shadow-md">
              At Hued, we&apos;re building something meaningful, but we can&apos;t do it <br />
              alone. We&apos;re looking for individuals who understand that fashion <br />
              is more than just an aesthetic — it&apos;s a journey.
            </p>
          </div>
        </div>

        {/* Bottom Half: Form */}
        <div className="w-full flex-1 flex items-start justify-start bg-white px-8 py-16">
          <div className="bg-white rounded-2xl p-10 w-3/4 md:w-3/4 lg:w-3/4">
            <h2 className="text-2xl font-semibold text-[#F27A5D] mb-6 text-left">
              Tell Us How You Can Contribute.
            </h2>
            <p className="text-left text-gray-600 mb-6">
              Use the form below to share your details and explain how you could make <br />
              an impact at Hued. <br />
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["firstName", "lastName", "email", "phone", "source"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field === "firstName"
                      ? "First Name *"
                      : field === "lastName"
                      ? "Last Name *"
                      : field === "email"
                      ? "Email *"
                      : field === "phone"
                      ? "Phone Number (Optional)"
                      : "How did you hear about Hued? (Optional)"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    required={["firstName", "lastName", "email"].includes(field)}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none bg-white"
                  />
                </div>
              ))}

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-[#EFEFEF] focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                >
                  <option value="">Select your role</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friend or Colleague">Friend or Colleague</option>
                  <option value="Fashion Event">Fashion Event</option>
                  <option value="Article or Publication">Article or Publication</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Contribution */}
              <div>
                <label htmlFor="contribute" className="block text-sm font-medium text-gray-700">
                  How can you contribute? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contribute"
                  name="contribute"
                  rows={8}
                  required
                  value={formData.contribute}
                  onChange={handleChange}
                  placeholder="Tell us about your skills, experience, and vision for the team..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none bg-white"
                ></textarea>
              </div>

              <div className="flex flex-col items-start">
                <button
                  type="submit"
                  className="bg-[#232323] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#444444] transition-all"
                >
                  Join the Hued Team
                </button>
                <div className="h-16"></div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
