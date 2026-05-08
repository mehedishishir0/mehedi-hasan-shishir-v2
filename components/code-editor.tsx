"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippets = {
  javascript: `
const success = () => {
  let hardWork = true;
  let consistency = true;
  let excuses = false;

  if (hardWork && consistency && !excuses) {
    return "Dreams turn into reality";
  } else {
    return "Keep pushing, you’re closer than you think ";
  }
};

console.log(success());`,

  cpp: `#include <iostream>
using namespace std;

string success() {
    bool hardWork = true;
    bool consistency = true;
    bool excuses = false;
    
    if (hardWork && consistency && !excuses) {
        return "Dreams turn into reality";
    } else {
        return "Keep pushing, you're closer than you think ";
    }
}

int main() {
    cout << success() << endl;
    return 0;
}
`,
};

function tokenizeCode(code: string, language: "javascript" | "cpp") {
  const tokens: Array<{ text: string; color: string }> = [];
  const lines = code.split("\n");

  const jsKeywords = /\b(function|const|let|var|if|else|for|while|class|new|import|export|from|async|await|return)\b/;
  const jsBuiltins = /\b(console|Math|JSON)\b/;
  const jsMethods = /\b(map|log|push|pop|filter|reduce|forEach)\b/;
  const cppKeywords = /\b(class|public|private|const|auto|void|int|return|for|while|if|else)\b/;
  const cppTypes = /\b(Developer|vector|string|cout|endl)\b/;

  lines.forEach((line, lineIndex) => {
    let remaining = line;
    while (remaining.length > 0) {
      let matched = false;

      if (language === "javascript") {
        const regexes = [
          { reg: jsKeywords, color: "#C586C0" }, 
          { reg: jsBuiltins, color: "#4EC9B0" }, 
          { reg: jsMethods, color: "#DCDCAA" },  
          { reg: /^'[^']*'|^"[^"]*"/, color: "#CE9178" }, 
          { reg: /^\d+/, color: "#B5CEA8" },
          { reg: /^\/\/.*/, color: "#6A9955" },
        ];
        for (const { reg, color } of regexes) {
          const match = remaining.match(reg);
          if (match && match.index === 0) {
            tokens.push({ text: match[0], color });
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
      } else {
        const regexes = [
          { reg: /^#include/, color: "#C586C0" },
          { reg: cppKeywords, color: "#569CD6" }, 
          { reg: cppTypes, color: "#4EC9B0" },
          { reg: /^"[^"]*"|^<[^>]+>/, color: "#CE9178" },
          { reg: /^\d+/, color: "#B5CEA8" },
          { reg: /^\/\/.*/, color: "#6A9955" },
        ];
        for (const { reg, color } of regexes) {
          const match = remaining.match(reg);
          if (match && match.index === 0) {
            tokens.push({ text: match[0], color });
            remaining = remaining.slice(match[0].length);
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        tokens.push({ text: remaining[0], color: "#D4D4D4" });
        remaining = remaining.slice(1);
      }
    }
    if (lineIndex < lines.length - 1)
      tokens.push({ text: "\n", color: "#D4D4D4" });
  });

  return tokens;
}

export default function CodeEditor() {
  const [activeTab, setActiveTab] = useState<"javascript" | "cpp">("javascript");
  const [displayedTokens, setDisplayedTokens] = useState<Array<{ text: string; color: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [allTokens, setAllTokens] = useState<Array<{ text: string; color: string }>>(() => 
    tokenizeCode(codeSnippets["javascript"], "javascript")
  );
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const tokens = tokenizeCode(codeSnippets[activeTab], activeTab);
      setAllTokens(tokens);
      setDisplayedTokens([]);
      setCurrentIndex(0);
      setIsTyping(true);
    } else {
      isMounted.current = true;
    }
  }, [activeTab]);

  useEffect(() => {
    if (currentIndex < allTokens.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayedTokens((prev) => [...prev, allTokens[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 15); 
      return () => clearTimeout(timeout);
    } else if (currentIndex >= allTokens.length) {
      setIsTyping(false);
    }
  }, [currentIndex, allTokens, isTyping]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 relative">
      {/* Background Accent for Glass Depth */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      
      <Card className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-0 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-2xl">
        
        {/* Glass Header */}
        <div className="bg-white/[0.05] border-b border-white/[0.08] px-5 py-0 flex items-center justify-between h-11">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/20" />
          </div>

          <div className="flex h-full">
            {(['javascript', 'cpp'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 h-full text-[11px] font-mono transition-all duration-300 flex items-center tracking-tight ${
                  activeTab === tab ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="relative z-10 uppercase">{tab === 'javascript' ? 'portfolio.js' : 'developer.cpp'}</span>
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeGlassTab"
                    className="absolute inset-0 bg-white/[0.05] backdrop-blur-sm border-x border-white/[0.05]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Glass Code Content */}
        <div className="px-8 py-8 font-mono text-[13px] leading-[1.7] min-h-[350px] overflow-x-auto selection:bg-blue-500/20">
          <pre>
            <code className="block">
              {displayedTokens.map((token, index) => (
                <span 
                    key={index} 
                    style={{ 
                        color: token.color,
                        opacity: 0.9,
                        filter: token.color !== '#D4D4D4' ? 'drop-shadow(0 0 8px rgba(255,255,255,0.1))' : 'none'
                    }}
                >
                  {token.text}
                </span>
              ))}
              {isTyping && (
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-[2px] h-[15px] bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.5)] align-middle ml-1"
                />
              )}
            </code>
          </pre>
        </div>

        {/* Minimalist Glass Footer */}
        <div className="bg-white/[0.02] border-t border-white/[0.05] px-6 py-2 flex justify-between items-center text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-4">
                <span>Ln {currentIndex > 0 ? (allTokens.slice(0, currentIndex).filter(t => t.text === '\n').length + 1) : 1}</span>
                <span className="hidden sm:inline opacity-50">||</span>
                <span>Col {currentIndex % 20}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className={isTyping ? "text-amber-500/70" : "text-emerald-500/70"}>
                    ● {isTyping ? "Encoding" : "Compiled"}
                </span>
            </div>
        </div>
      </Card>
    </div>
  );
}