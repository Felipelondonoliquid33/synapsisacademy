
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Matter from 'matter-js';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// --- Constants & Colors ---
const COLORS = {
  bg: '#1E1B4B',        // Deep Indigo
  lime: '#CCFF00',      // Acid Volt
  pastel: '#E0C3FC',    // Pastel Lavender
  gold: '#F4E747',      // Still nice, maybe slightly more neon? Let's keep Gold/Yellow as accent
  salmon: '#FF3366',    // Neon Raspberry
  text: '#FFFFFF',
};

// --- Footer Component ---

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const ft = t.footer;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  
  // Trigger animation earlier to ensure they are falling when user arrives
  const isInView = useInView(containerRef, { amount: 0.1, once: false });
  const [hasTriggered, setHasTriggered] = useState(false);

  // --- Physics Effect ---
  useEffect(() => {
    if (!isInView || !canvasRef.current || hasTriggered) return;
    
    setHasTriggered(true);

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events,
      Common = Matter.Common;

    // 1. Cleanup previous instance if any
    if (engineRef.current) {
      Engine.clear(engineRef.current);
      if (renderRef.current) {
        Render.stop(renderRef.current);
        if (renderRef.current.canvas) renderRef.current.canvas.remove();
      }
      if (runnerRef.current) Runner.stop(runnerRef.current);
    }

    // 2. Setup Engine
    const engine = Engine.create();
    engine.gravity.y = 1; 
    engineRef.current = engine;

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // 3. Boundaries
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.8,
      restitution: 0.2
    };

    // Floor and Walls to trap blobs in bottom-right
    const floor = Bodies.rectangle(width / 2, height + 60, width, 120, wallOptions);
    const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height * 2, wallOptions);
    // Left wall invisible, positioned to keep blobs on the right ~40% of screen
    const leftWall = Bodies.rectangle(width * 0.4, height / 2, 20, height * 2, wallOptions); 

    Composite.add(engine.world, [floor, rightWall, leftWall]);

    // 4. Custom Shapes Helpers
    
    // Starburst
    const createStar = (x: number, y: number, radius: number, color: string) => {
      return Bodies.circle(x, y, radius * 0.6, {
        restitution: 0.4,
        friction: 0.6,
        label: 'Star',
        angle: Math.PI / 8,
        render: { fillStyle: 'transparent' }, 
        plugin: { radius, color, points: 12 }
      });
    };

    // Flower/Cloud
    const createFlower = (x: number, y: number, radius: number, color: string) => {
      return Bodies.circle(x, y, radius * 0.8, {
        restitution: 0.2,
        friction: 0.8,
        label: 'Flower',
        render: { fillStyle: 'transparent' },
        plugin: { radius, color }
      });
    };

    // Cross
    const createCross = (x: number, y: number, size: number, color: string) => {
      const thickness = size * 0.35;
      const partA = Bodies.rectangle(x, y, size, thickness, { 
        chamfer: { radius: 10 }, 
        render: { fillStyle: color } 
      });
      const partB = Bodies.rectangle(x, y, thickness, size, { 
        chamfer: { radius: 10 }, 
        render: { fillStyle: color } 
      });
      return Body.create({
        parts: [partA, partB],
        restitution: 0.3,
        friction: 0.7,
        label: 'Cross',
        angle: Math.PI / 4 
      });
    };

    // Leaf
    const createLeaf = (x: number, y: number, w: number, h: number, color: string) => {
      return Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: w * 0.8 }, // Heavy rounding
        restitution: 0.3,
        friction: 0.6,
        angle: -Math.PI / 4,
        label: 'Leaf',
        render: { fillStyle: 'transparent' }, // Custom render
        plugin: { width: w, height: h, color }
      });
    };

    // 5. Spawn Elements
    // Spawning closer to view (y: -50 to -500) so they appear quickly
    const startX = width * 0.75; 
    
    const blobs = [
      // Enlarge existing ones slightly (+10-15px)
      createFlower(startX - 50, -50, 145, COLORS.pastel), // was 130
      createStar(startX + 80, -200, 135, COLORS.gold),    // was 120
      createCross(startX + 20, -350, 165, COLORS.lime),   // was 150
      createLeaf(startX - 100, -500, 100, 180, COLORS.pastel), // was 90, 160
      
      // Enlarge extras
      Bodies.circle(startX + 120, -600, 95, {  // was 80
        render: { fillStyle: COLORS.lime }, 
        restitution: 0.5 
      }),
      createCross(startX - 60, -750, 110, COLORS.gold), // was 90

      // --- NEW BLOBS ADDED ---
      
      // 1. Hexagon (Salmon)
      Bodies.polygon(startX + 40, -900, 6, 85, {
        render: { fillStyle: COLORS.salmon },
        restitution: 0.4,
        friction: 0.5,
        angle: Math.PI / 6
      }),

      // 2. Large Circle (Lime)
      Bodies.circle(startX - 80, -1000, 75, {
        render: { fillStyle: COLORS.lime },
        restitution: 0.5
      }),

      // 3. Extra Star (Pastel)
      createStar(startX + 100, -1150, 110, COLORS.pastel)
    ];

    // Randomize initial rotation and slight velocity
    blobs.forEach(b => {
      Body.setAngularVelocity(b, Common.random(-0.05, 0.05));
    });

    Composite.add(engine.world, blobs);

    // 6. Custom Render Loop
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      
      Composite.allBodies(engine.world).forEach((body) => {
        if (!body.render.visible) return;
        
        const { position, angle, label, plugin } = body;
        
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        if (label === 'Star') {
          const { radius, color, points } = plugin;
          const innerRadius = radius * 0.45;
          ctx.beginPath();
          ctx.fillStyle = color;
          for (let i = 0; i < points * 2; i++) {
             const r = i % 2 === 0 ? radius : innerRadius;
             const a = (Math.PI * i) / points;
             ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.closePath();
          ctx.fill();
        }
        else if (label === 'Flower') {
           const { radius, color } = plugin;
           ctx.fillStyle = color;
           const petalCount = 7;
           const petalSize = radius * 0.6;
           
           // Draw petals
           for(let i = 0; i < petalCount; i++) {
             const theta = (i / petalCount) * Math.PI * 2;
             const px = (radius * 0.5) * Math.cos(theta);
             const py = (radius * 0.5) * Math.sin(theta);
             ctx.beginPath();
             ctx.arc(px, py, petalSize, 0, Math.PI * 2);
             ctx.fill();
           }
           // Center
           ctx.beginPath();
           ctx.arc(0, 0, radius * 0.75, 0, Math.PI * 2);
           ctx.fill();
        }
        else if (label === 'Leaf') {
          const { width, height, color } = plugin;
          ctx.fillStyle = color;
          
          // Draw leaf shape manually
          ctx.beginPath();
          ctx.ellipse(0, 0, width/2, height/2, 0, 0, 2 * Math.PI);
          ctx.fill();

          // Leaf vein
          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(0, -height/2 + 10);
          ctx.lineTo(0, height/2 - 10);
          ctx.stroke();
        }

        ctx.restore();
      });
    });

    // 7. Interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    });
    
    // Disable scroll hijacking
    (mouseConstraint.mouse.element as any).removeEventListener("mousewheel", (mouseConstraint.mouse as any).mousewheel);
    (mouseConstraint.mouse.element as any).removeEventListener("DOMMouseScroll", (mouseConstraint.mouse as any).mousewheel);

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Run
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

  }, [isInView, hasTriggered]);

  return (
    <footer ref={containerRef} className="relative bg-[#1E1B4B] text-white pt-48 pb-40 px-6 md:px-12 overflow-hidden min-h-[105vh] flex flex-col justify-between -mt-24 md:-mt-32 z-0">
      
      {/* 1. CONTENT SECTION (Higher z-index) */}
      <div className="relative z-20 max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 h-full">
        
        {/* Left: Logo */}
        <div className="lg:col-span-2">
          <div className="w-24 h-24 md:w-32 md:h-32 relative mb-6">
              {/* New Synapsis Logo SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] fill-current">
                 <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C80 95 95 75 95 50 C95 25 80 5 50 5 Z" fill="#CCFF00" opacity="0.1" />
                 <circle cx="70" cy="25" r="8" fill="currentColor" />
                 <circle cx="30" cy="75" r="8" fill="currentColor" />
                 <path 
                    d="M70 25 C 20 25 80 75 30 75" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                 />
              </svg>
          </div>
        </div>

        {/* Center: Main Nav - Platform focused */}
        <div className="lg:col-span-4 flex flex-col justify-start space-y-8">
          {ft.navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white hover:text-[#CCFF00] transition-colors origin-left hover:scale-105 duration-300 heading-font"
            >
              {item.label}
            </a>
          ))}
          
          <div className="flex gap-8 mt-12">
             {[
               { icon: Facebook, href: '#' },
               { icon: Instagram, href: '#' },
               { icon: Linkedin, href: '#' },
               { icon: Twitter, href: '#' }
             ].map((social, i) => (
               <a key={i} href={social.href} className="text-white/60 hover:text-[#CCFF00] transition-colors">
                 <social.icon size={24} />
               </a>
             ))}
          </div>
        </div>

        {/* Right: Secondary & CTA */}
        <div className="lg:col-span-6 flex flex-col lg:items-start pl-0 lg:pl-12">
            
            {/* Secondary Menu */}
             <div className="grid grid-cols-1 gap-6 mb-16 w-full max-w-sm">
                <div className="space-y-4">
                   {ft.secondaryLinks.map((link, i) => (
                     <a key={i} href="#" className="block text-xl font-medium hover:text-[#CCFF00] transition-colors">
                       {link}
                       {i === 4 && <span className="w-2 h-2 rounded-full bg-[#CCFF00] ml-2 animate-pulse inline-block" />}
                     </a>
                   ))}
                </div>
             </div>

            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-4">{ft.startLabel}</span>
              <button className="bg-white text-[#1E1B4B] rounded-full pl-2 pr-8 py-2 flex items-center gap-4 hover:bg-[#CCFF00] transition-colors group shadow-lg">
                <div className="w-12 h-12 bg-[#FF3366] rounded-full flex items-center justify-center text-[#1E1B4B] font-serif font-bold text-xl group-hover:scale-110 transition-transform">
                  S
                </div>
                <span className="font-bold text-lg">{ft.ctaBtn}</span>
              </button>
            </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-20 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-white/40 text-sm font-medium">
         <div className="flex gap-8 mb-4 md:mb-0">
           <a href="#" className="hover:text-white">{ft.privacy}</a>
           <a href="#" className="hover:text-white">{ft.terms}</a>
         </div>
         <div className="flex flex-col items-start md:items-end gap-1">
           <span>{ft.copyright}</span>
           <span className="text-white/25 text-xs">{ft.devCredit}</span>
         </div>
      </div>

      {/* 2. PHYSICS CANVAS (Background Layer) */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-auto z-10 opacity-100"
      />

    </footer>
  );
};
