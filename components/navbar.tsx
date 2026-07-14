

"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "/blogs" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`relative flex items-center justify-between px-6 h-16 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo with Gradient Text */}
          <a
            href="/#home"
            className="text-xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="inline-block mr-2"
            />

            <span className=" tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              SHISHIR
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
            <div className="ml-4 h-6 w-[1px] bg-white/10" /> {/* Divider */}
            <Button
              size="sm"
              className="ml-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white border-none shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="md:hidden mt-2 overflow-hidden rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col p-4 gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="p-2 pt-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 h-12 text-lg">
                    Hire Me
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
