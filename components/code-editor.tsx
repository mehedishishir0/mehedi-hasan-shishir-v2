"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const codeSnippets = {
  javascript: `
const success = () => {
  let hardWork = true;
  let consistency = true;
  let excuses = false;

  if (hardWork && consistency && !excuses) {
    return "Dreams turn into reality 💻✨";
  } else {
    return "Keep pushing, you’re closer than you think 🚀";
  }
};

console.log(success());`,

  cpp: `#include <bits/stdc++.h>
using namespace std;

string success() {
    bool hardWork = true;
    bool consistency = true;
    bool excuses = false;
    if (hardWork && consistency && !excuses) {
        return "Dreams turn into reality 💻✨";
    } else {
        return "Keep pushing, you're closer than you think 🚀";
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
  const [displayedTokens, setDisplayedTokens] = useState<
    Array<{ text: string; color: string }>
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [allTokens, setAllTokens] = useState<
    Array<{ text: string; color: string }>
  >(() => tokenizeCode(codeSnippets["javascript"], "javascript"));
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
      }, 40);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= allTokens.length) {
      setIsTyping(false);
    }
  }, [currentIndex, allTokens, isTyping]);

  return (
    <Card className="bg-card border-border p-0 overflow-hidden shadow-xl w-full max-w-4xl mx-auto rounded-2xl">
      {/* Header */}
      <div className="bg-muted border-b border-border px-4 py-2 flex flex-wrap items-center gap-3 justify-between sm:justify-start">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div className="flex gap-1 ml-2 sm:ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("javascript")}
            className={`h-8 px-3 text-xs sm:text-sm font-mono transition-colors ${
              activeTab === "javascript"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            portfolio.js
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab("cpp")}
            className={`h-8 px-3 text-xs sm:text-sm font-mono transition-colors ${
              activeTab === "cpp"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            developer.cpp
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm bg-card min-h-[300px] sm:min-h-[400px] overflow-x-auto whitespace-pre-wrap">
        <pre className="leading-relaxed">
          <code>
            {displayedTokens.map((token, index) => (
              <span key={index} style={{ color: token.color }}>
                {token.text}
              </span>
            ))}
            {isTyping && <span className="animate-pulse text-red-500">|</span>}
          </code>
        </pre>
      </div>
    </Card>
  );
}
