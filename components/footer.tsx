"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";
import { footerLinks, legalLinks, socialIcons } from "@/data/footer";
import Container from "./container";

function getIcon(name: string) {
  switch (name) {
    case "facebook":
      return <FaFacebook size={20} />;
    case "twitter":
      return <FaTwitter size={20} />;
    case "instagram":
      return <FaInstagram size={20} />;
    case "youtube":
      return <FaYoutube size={20} />;
    case "send":
      return <FaTelegram size={20} />;
    default:
      return null;
  }
}

const logo = "/assets/logowhite.svg";

export default function Footer() {
  return (
    <footer className="bg-secondary text-bg text-sm z-30">
      <Container>
        <div className="py-10">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
            {/* Logo */}
            <Link href={"/"} className="flex-shrink-0">
              <Image src={logo} alt="CFM Logo" width={157} height={38} />
            </Link>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-grow">
              {footerLinks.map(({ title, links }) => (
                <div key={title}>
                  <h4 className="font-bold mb-2">{title}</h4>
                  <ul className="space-y-1">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link href={href} className="hover:text-primary-accent">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Social Icons */}
            <div className="border-t lg:border-0 border-white/30 my-8 pt-6 text-center lg:my-0 lg:pt-0">
              <p className="font-bold text-lg lg:text-start mb-4">
                Stay Connected
              </p>
              <div className="flex justify-center gap-4">
                {socialIcons.map(({ name, icon, href }) => (
                  <a
                    href={href}
                    key={name}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-accent transition-colors"
                  >
                    {getIcon(icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-6 border-white/30 pt-6 text-center text-xs">
            <p className="mb-2">
              © {new Date().getFullYear()} Christ Family Ministry
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {legalLinks.map(({ label, href }) => (
                <Link href={href} key={label} className="hover:underline">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
