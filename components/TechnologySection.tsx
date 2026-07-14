// components/TechnologyNetwork.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// ==========================================
// 1. DATA CONFIGURATION (10 SYMMETRIC CARDS)
// ==========================================
interface TechnologyNode {
  id: string;
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'systems';
  x: number; 
  y: number; 
}

const rawTechnologies = [
  { id: 'nextjs', name: 'Next.js', description: 'Production SSR framework', category: 'frontend' },
  { id: 'react', name: 'React', description: 'Component architecture UI', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', description: 'Strict type safety layer', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', description: 'Web engine core runtime', category: 'frontend' },
  { id: 'nodejs', name: 'Node.js', description: 'Asynchronous V8 runtime', category: 'backend' },
  { id: 'express', name: 'Express', description: 'Minimalist API framework', category: 'backend' },
  { id: 'csharp', name: 'C#', description: 'Enterprise system engine', category: 'backend' },
  { id: 'cpp', name: 'C++', description: 'Low-level performance core', category: 'systems' },
  { id: 'postgresql', name: 'PostgreSQL', description: 'Advanced relational DB', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', description: 'Document NoSQL engine', category: 'database' },
];

// Increased radius dimensions to explicitly spread out the cards across the space
const technologyNodes: TechnologyNode[] = rawTechnologies.map((tech, index) => {
  const totalNodes = rawTechnologies.length;
  const radiusX = 460; // Increased from 380 for wider horizontal spread
  const radiusY = 320; // Increased from 250 for taller vertical spread
  
  const angle = (index / totalNodes) * 2 * Math.PI;
  return {
    ...tech,
    x: Math.round(Math.cos(angle) * radiusX),
    y: Math.round(Math.sin(angle) * radiusY),
  } as TechnologyNode;
});

const getCurvedPath = (startX: number, startY: number) => {
  const controlX = startX * 0.4;
  const controlY = startY * 0.4;
  return `M ${startX} ${startY} Q ${controlX} ${controlY}, 0 0`;
};

// ==========================================
// 2. BACKGROUND EFFECTS LAYER
// ==========================================
const BackgroundEffects: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#02000e]">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        style={{ 
          maskImage: 'radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)', 
          WebkitMaskImage: 'radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)' 
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full bg-cyan-500/[0.02] blur-[160px]" />
    </div>
  );
};

// ==========================================
// 3. TRANSPARENT MINIMAL CARD (NO BACKGROUND AT ALL)
// ==========================================
const TechnologyCard: React.FC<{ tech: TechnologyNode }> = ({ tech }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative w-48 h-24 rounded-[20px] border border-white/[0.04] p-4 flex flex-col justify-between group select-none cursor-pointer transition-all duration-300 "
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(34,211,238,0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="flex items-center justify-between" style={{ transform: 'translateZ(10px)' }}>
        <h3 className="text-sm font-semibold tracking-tight text-white/80 group-hover:text-cyan-400 transition-colors duration-300">{tech.name}</h3>
        <span className="text-[8px] tracking-wider uppercase text-white/20 font-medium">{tech.category}</span>
      </div>

      <p className="text-[11px] text-white/40 line-clamp-2 leading-tight" style={{ transform: 'translateZ(15px)' }}>
        {tech.description}
      </p>

      {isHovered && (
        <motion.div 
          layoutId="glowLaserLine"
          className="absolute inset-0 p-[1px] rounded-[20px] "
          style={{ 
            maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
            WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
            maskComposite: 'exclude', 
            WebkitMaskComposite: 'xor' 
          }}
        />
      )}
    </motion.div>
  );
};

// ==========================================
// 4. CORE GOLANG CENTER HUB NODE
// ==========================================
const CenterHubNode: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handlePulse = () => {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3, ease: 'easeOut' }
      });
    };
    window.addEventListener('networkHubPulse', handlePulse);
    return () => window.removeEventListener('networkHubPulse', handlePulse);
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ scale: 1 }} // Initial state theke filter asset-ti completely removed
      className="relative w-28 h-28 rounded-full border border-white/[0.06] bg-[#02000e] flex flex-col items-center justify-center group"
    >
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
        Go
      </span>
      <span className="text-[8px] font-bold tracking-widest text-white/30 uppercase mt-0.5 z-10 group-hover:text-purple-400 transition-colors">
        CORE ENGINE
      </span>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }} 
        className="absolute -inset-2.5 border border-dashed border-sky-300 rounded-full pointer-events-none" 
      />
    </motion.div>
  );
};

// ==========================================
// 5. DATA STREAM ENGINE LAYER
// ==========================================
const NetworkEngineLayer: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);
    const timelines: gsap.core.Timeline[] = [];

    technologyNodes.forEach((node) => {
      const dotId = `#dot-${node.id}`;
      const pathData = getCurvedPath(node.x, node.y);
      const delay = Math.random() * 3;
      const duration = 2.5 + Math.random() * 1.2;

      const tl = gsap.timeline({ repeat: -1, delay });
      tl.to(dotId, {
        duration,
        ease: 'power1.inOut',
        motionPath: { path: pathData, alignOrigin: [0.5, 0.5] },
        onComplete: () => {
          window.dispatchEvent(new CustomEvent('networkHubPulse'));
        }
      });
      timelines.push(tl);
    });

    return () => timelines.forEach(tl => tl.kill());
  }, []);

  return (
    <svg width="100%" height="100%" viewBox="-650 -450 1300 900" fill="none" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 pointer-events-none">
      {technologyNodes.map((node) => (
        <path
          key={`wire-${node.id}`}
          d={getCurvedPath(node.x, node.y)}
          stroke="url(#wireGradient)"
          strokeWidth="1.2"
          className="opacity-[0.15]"
        />
      ))}

      {technologyNodes.map((node) => (
        <circle
          key={`dot-${node.id}`}
          id={`dot-${node.id}`}
          cx="0"
          cy="0"
          r="3"
          fill="#22d3ee"
          style={{ filter: 'drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 16px #a855f7)' }}
        />
      ))}

      <defs>
        <linearGradient id="wireGradient" gradientUnits="userSpaceOnUse" x1="-400" y1="-400" x2="400" y2="400">
          <stop stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="0.5" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// ==========================================
// 6. MAIN SYSTEM WRAPPED IN CONTAINER
// ==========================================
export default function TechnologyNetwork() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 overflow-hidden bg-[#02000e]">
      <BackgroundEffects />

      {/* Main Structural Portfolio Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col items-center">
        
        {/* Structured Header Text */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Technologies I Use
          </h2>
          <p className="text-xs md:text-sm text-white/40 max-w-md mx-auto leading-relaxed">
            The tools and technologies I use to build fast, scalable and modern web applications.
          </p>
        </div>

        {/* Expanded Network Diagram View Box Canvas */}
        <div className="relative w-full max-w-6xl h-[800px] flex justify-center items-center overflow-visible">
          <NetworkEngineLayer />

          <div className="absolute z-30">
            <CenterHubNode />
          </div>

          {technologyNodes.map((tech) => (
            <div
              key={tech.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500"
              style={{ 
                left: `calc(50% + ${tech.x}px)`, 
                top: `calc(50% + ${tech.y}px)` 
              }}
            >
              <TechnologyCard tech={tech} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}