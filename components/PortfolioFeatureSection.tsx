
"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Code2, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Layers 
} from "lucide-react";

const SequentialFlow = () => {
  // SVG Paths
  const trunkL = "M 500 400 H 350";
  const trunkR = "M 500 400 H 650";

  const branchesL = [
    "M 350 400 V 250 H 220",
    "M 350 400 H 220",
    "M 350 400 V 550 H 220"
  ];

  const branchesR = [
    "M 650 400 V 250 H 780",
    "M 650 400 H 780",
    "M 650 400 V 550 H 780"
  ];

  // Timing Logic (Slow & Smooth)
  const trunkDur = 1.5;    
  const branchDur = 1.2;   
  const pause = 0.8;       
  
  const dotDash = "1 1000"; 

  return (
    <div className="relative min-h-screen bg-[#fafafa] flex items-center justify-center p-10 overflow-hidden font-sans">
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
        
        {/* Background Lines */}
        <g stroke="#eef0f2" strokeWidth="2" fill="none">
          <path d={trunkL} />
          <path d={trunkR} />
          {[...branchesL, ...branchesR].map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* --- ANIMATED DOTS (DevFlow to Cards) --- */}
        <g stroke="red" strokeWidth="6" fill="none" strokeLinecap="round">
          
          {/* LEFT SIDE: Center to Left Junction */}
          <motion.path
            d={trunkL}
            strokeDasharray={dotDash}
            animate={{ strokeDashoffset: [150, 0], opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: trunkDur, 
              repeat: Infinity, 
              repeatDelay: branchDur + pause, 
              ease: "linear" 
            }}
            style={{ filter: "drop-shadow(0 0 6px red)" }}
          />
          
          {/* LEFT SIDE: Junction to 3 Cards (Fires after trunkDur) */}
          {branchesL.map((d, i) => (
            <motion.path
              key={`L-branch-${i}`}
              d={d}
              strokeDasharray={dotDash}
              animate={{ strokeDashoffset: [350, 0], opacity: [0, 1, 1, 0] }}
              transition={{ 
                duration: branchDur, 
                delay: trunkDur, 
                repeat: Infinity, 
                repeatDelay: trunkDur + pause, 
                ease: "linear" 
              }}
              style={{ filter: "drop-shadow(0 0 6px red)" }}
            />
          ))}

          {/* RIGHT SIDE: Center to Right Junction */}
          <motion.path
            d={trunkR}
            strokeDasharray={dotDash}
            animate={{ strokeDashoffset: [-150, 0], opacity: [0, 1, 1, 0] }}
            transition={{ 
              duration: trunkDur, 
              repeat: Infinity, 
              repeatDelay: branchDur + pause, 
              ease: "linear" 
            }}
            style={{ filter: "drop-shadow(0 0 6px red)" }}
          />

          {/* RIGHT SIDE: Junction to 3 Cards (Fires after trunkDur) */}
          {branchesR.map((d, i) => (
            <motion.path
              key={`R-branch-${i}`}
              d={d}
              strokeDasharray={dotDash}
              animate={{ strokeDashoffset: [-350, 0], opacity: [0, 1, 1, 0] }}
              transition={{ 
                duration: branchDur, 
                delay: trunkDur, 
                repeat: Infinity, 
                repeatDelay: trunkDur + pause, 
                ease: "linear" 
              }}
              style={{ filter: "drop-shadow(0 0 6px red)" }}
            />
          ))}
        </g>
      </svg>

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 items-center z-10">
        <div className="space-y-24">
          <FeatureCard title="Full-Stack Dev" icon={<Code2 />} />
          <FeatureCard title="Performance" icon={<Zap />} />
          <FeatureCard title="Architecture" icon={<Layers />} />
        </div>

        <div className="flex flex-col items-center">
          <div className="w-48 h-36 bg-red-500 rounded-[2.8rem] flex flex-col items-center justify-center text-white shadow-2xl relative">
            <h2 className="text-xl font-bold tracking-tight">DevFlow</h2>
            <span className="text-[10px] uppercase tracking-widest opacity-90 font-semibold">Software Engineer</span>
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 -z-10 animate-pulse" />
          </div>
        </div>

        <div className="space-y-24">
          <FeatureCard title="UI/UX Engineering" icon={<Globe />} />
          <FeatureCard title="Cloud Security" icon={<ShieldCheck />} />
          <FeatureCard title="Integrations" icon={<Cpu />} />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col items-center md:items-start max-w-[280px] mx-auto group transition-all duration-500 hover:shadow-xl">
    <div className="bg-black text-white p-4 rounded-2xl mb-6 group-hover:bg-red-500 transition-colors duration-300 shadow-lg">
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <h6 className="font-bold text-gray-800 text-sm mb-2">{title}</h6>
    <p className="text-[11px] text-gray-400 leading-relaxed font-medium">Developing pixel-perfect systems with modern standards.</p>
  </div>
);

export default SequentialFlow;

