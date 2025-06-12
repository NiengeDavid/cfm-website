"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./container";

const navLinksRow1 = ["Home", "About", "Centres", "Ministries"];
const navLinksRow2 = ["Partnership", "Leadership", "Sermons"];
const navLinksRow3 = ["Give", "Articles", "Media Centre", "Testify"];

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
        className={`text-black px-3 py-1 text-lg hover:border-b-2 ${
          isActive ? "border-b-2 border-yellow-400" : ""
        }`}
      >
        {text}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="text-xl text-black font-bold">LOGO</div>

          {/* Hamburger */}
          <button onClick={() => setIsOpen(true)} aria-label="Open Menu">
            <Menu size={28} className="text-black" />
          </button>
        </div>

        {/* Fullscreen Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-sky-400 text-black flex flex-col items-center justify-center z-50 mx-auto max-w-md lg:max-w-screen-2xl md:max-w-screen-md max-h-[50vh] shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6"
                aria-label="Close Menu"
              >
                <X size={28} />
              </button>

              <h2 className="text-xl font-bold mb-6">MENU</h2>

              <div className="space-y-8 text-center">
                <div className="flex flex-wrap justify-center gap-4">
                  {navLinksRow1.map(navLink)}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {navLinksRow2.map(navLink)}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {navLinksRow3.map(navLink)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
}
