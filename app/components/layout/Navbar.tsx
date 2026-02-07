"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Our Mission" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/faq", label: "FAQ" },
  { href: "/monthly-highlights", label: "Monthly Highlights" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/community", label: "Community Engagement" },
  { href: "/beta", label: "Hued Beta" },
];


export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#232323] text-white border-b border-[#2F80ED]">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Hued logo"
            width={36}
            height={36}
            priority
          />
          <span className="sr-only">Hued</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded px-3 py-2 ring-1 ring-white/20"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>

        {/* Desktop Links */}
        <ul
          id="main-nav"
          className={`${open ? "block" : "hidden"} md:flex items-center gap-10 text-[15px] font-['Euclid Circular B']`}
        >
          {links.map(({ href, label }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`transition-colors ${
                    isActive ? "text-[#2F80ED]" : "text-white hover:opacity-75"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

      </nav>
    </header>
  );
}
