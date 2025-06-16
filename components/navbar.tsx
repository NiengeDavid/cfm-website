"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, AlignRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./container";
import { navDetails } from "@/data/navDetails";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLink = (text: string) => {
    const href = `/${text.toLowerCase().replace(/\s+/g, "-")}`;
    const isActive = pathname === href || (text === "Home" && pathname === "/");

    return (
      <Link
        key={text}
        href={href}
        className={`w-fit mx-auto text-black text-base sm:text-lg px-2 py-1 hover:text-white ${
          isActive ? "border-b-2 border-accent1" : ""
        }`}
      >
        {text}
      </Link>
    );
  };

  return (
    <nav className="top-0 left-0 w-full bg-white z-50 shadow-md">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" aria-label="Home">
            <Image
              src={navDetails?.LOGO?.src}
              alt={navDetails?.LOGO?.alt || "Logo"}
              width={navDetails?.LOGO?.width}
              height={navDetails?.LOGO?.height}
              className="w-full h-full object-contain"
              priority
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="cursor-pointer"
          >
            <AlignRight
              size={32}
              className="text-primary hover:text-primary-accent font-extrabold"
            />
          </button>
        </div>

        {/* Custom Height Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full z-50 pb-6"
            >
              <div className="bg-sky-400 p-4 max-w-md sm:max-w-xl md:max-w-screen-md lg:max-w-screen-2xl mx-auto">
                <div className="">
                  {/* Menu Header */}
                  <div className="flex items-center justify-between py-4 border-b border-black">
                    <div className="w-6" /> {/* Placeholder for alignment */}
                    <h2 className="text-lg font-bold text-center flex-1">
                      MENU
                    </h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close Menu"
                    >
                      <X size={24} className="text-black hover:text-white" />
                    </button>
                  </div>

                  {/* Nav Items */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 px-6 py-6 pb-10 text-center">
                    {navDetails?.navItems?.map(navLink)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
}
