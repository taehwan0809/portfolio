"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",      href: "about" },
  { label: "Skills",     href: "skills" },
  { label: "Projects",   href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Awards",     href: "awards" },
  { label: "Contact",    href: "contact" },
];

function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const sections = ["hero", ...navLinks.map((l) => l.href)];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= window.scrollY + 80) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
        >
          박태환
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
                active === link.href ? "text-white" : "text-white/35 hover:text-white/70"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-white/50 hover:text-white transition-colors"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 bg-[#111116]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col py-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => { scrollTo(link.href); setMenuOpen(false); }}
                  className="text-left px-6 py-3 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
