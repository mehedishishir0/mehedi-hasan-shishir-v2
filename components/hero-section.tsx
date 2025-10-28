"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import TypewriterEffect from "@/components/typewriter-effect";
import CodeEditor from "@/components/code-editor";
import { Mail } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Welcome to my portfolio
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
                Hi, I&apos;m <span className="text-primary">M.H SHISHIR</span>
              </h1>
            </div>

            <div className="text-2xl sm:text-3xl font-semibold text-muted-foreground min-h-[40px]">
              {mounted && (
                <TypewriterEffect
                  texts={[
                    "Full-Stack Developer",
                    "Frontend Developer",
                    "Problem Solver",
                    "Tech Innovator",
                  ]}
                />
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Passionate about creating beautiful, functional, and user-friendly
              applications. I turn ideas into reality with clean code and modern
              technologies.
            </p>

            {/* <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="group">
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Download CV
              </Button>
            </div> */}
            <div>
              <div className="mt-6 flex gap-10">
                {/* Facebook */}
                <a
                  href="https://facebook.com/mehedishishir0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
                >
                  <FaFacebookF size={18} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/mehedi-hasan-shishir0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
                >
                  <FaLinkedinIn size={18} />
                </a>

                {/* Gmail */}
                <a
                  href="mailto:mehedihasanshishir.info@gmail.com"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow-md"
                >
                  <Mail size={18} />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/mehedishishir0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-900 transition shadow-md"
                >
                  <FaGithub size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
            <CodeEditor />
          </div>
        </div>
      </div>
    </section>
  );
}
