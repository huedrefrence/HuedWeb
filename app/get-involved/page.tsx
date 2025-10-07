// app/get-involved/page.tsx
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/layout/Footer";

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

        {/* Bottom half: Form */}
        <div className="w-full flex-1 flex items-center justify-center bg-gray-100 px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Tell Us How You Can Contribute
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Use the form below to share your details and explain how you could make an impact at Hued.
            </p>

            <form className="space-y-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="professional">Professional</option>
                  <option value="researcher">Researcher</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* How did you hear */}
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  How did you hear about Hued?
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  placeholder="e.g., Friend, LinkedIn, Event..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                />
              </div>

              {/* How can you contribute */}
              <div>
                <label htmlFor="contribute" className="block text-sm font-medium text-gray-700">
                  How can you contribute?
                </label>
                <textarea
                  id="contribute"
                  name="contribute"
                  rows={4}
                  placeholder="Tell us how you'd like to be involved..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#2F80ED] focus:outline-none"
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#2F80ED] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2565c9] transition-all"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
