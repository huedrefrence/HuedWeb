"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/knowledge-hub", label: "Knowledge Hub" },
  { href: "/luminaries", label: "Luminaries" },
  { href: "/monthly-features", label: "Monthly Highlights" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/community", label: "Community Engagement" },
  { href: "/beta", label: "Hued Beta" },
  { href: "/mission", label: "Our Mission" }, 
  
];


export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const baseItem =
    "block rounded-md px-3 py-2 transition-colors font-[Euclid Circular B]";
  const activeItem = "text-[#2F80ED]"; // active color like your designs
  const inactiveItem = "text-[#111827] hover:bg-black/5";

  return (
    <header className="sticky top-0 z-50 bg-white text-[#111827] border-b border-black/5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.webp"
            alt="Hued logo"
            width={32}
            height={32}
            priority
          />
          <span className="sr-only">Hued</span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden rounded px-3 py-2 ring-1 ring-black/10"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="main-nav"
        >
          Menu
        </button>

        {/* Links */}
        <ul
          id="main-nav"
          className={`${open ? "block" : "hidden"} md:flex gap-6 text-sm`}
        >
          {links.map((l) => {
            // consider a link active if pathname === href or starts with it
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href));

            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${baseItem} ${
                    isActive ? activeItem : inactiveItem
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
