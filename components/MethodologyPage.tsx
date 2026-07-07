import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Matter from 'matter-js';
import { Play, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// --- Constants ---
const THEME = {
  bgHero: '#FEFCE8',      // Pastel Yellow (Yellow-50)
  starColor: '#F59E0B',   // Amber-500 - Deep orange/amber that contrasts with pastel yellow
  text: '#1A3C3C',        // Dark Teal/Green
  greenStep: '#C8F5A0',   // Pastel Green for the side steps
  blueSearch: '#009CDA',  // Bright Blue for search bubble
  cloudBlue: '#D6F5FF',   // Light Blue for cloud bubble
  limeGreen: '#CCFF00',   // Lime for well-being bubble
};

export const MethodologyPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const m = t.methodology;
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  // --- Matter.js Physics for the Giant Star ---
  useEffect(() => {
    // 1. Setup & Checks
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!sceneRef.current) return;

    sceneRef.current.innerHTML = '';

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events; // Needed for custom star drawing

    const engine = Engine.create();
    engine.gravity.y = 1.0; 
    engine.gravity.x = 0;
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    const wallThick = 200;
    const floor = Bodies.rectangle(width / 2, height + 50, width * 4, 100, { 
      isStatic: true,
      render: { visible: false },
      label: 'floor'
    });
    
    const leftWall = Bodies.rectangle(0 - wallThick * 2, height / 2, wallThick, height * 10, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + wallThick * 2, height / 2, wallThick, height * 10, { isStatic: true, render: { visible: false } });

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    // --- The Giant Star ---
    const xSize = isMobile ? 250 : 620;
    const starRadius = xSize * 0.4;
    
    const startX = width * 0.45; 
    const startY = -1200; 

    // Create a transparent circle body for physics (star will be drawn on top)
    const giantStar = Bodies.circle(startX, startY, starRadius, {
      restitution: 0.3,
      friction: 0.5,
      frictionAir: 0.005,
      density: 0.002,
      render: { 
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
        lineWidth: 0
      }
    });

    Body.setAngularVelocity(giantStar, 0.03);

    Composite.add(engine.world, giantStar);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } }
    });
    
    (mouseConstraint.mouse.element as any).removeEventListener("mousewheel", (mouseConstraint.mouse as any).mousewheel);
    (mouseConstraint.mouse.element as any).removeEventListener("DOMMouseScroll", (mouseConstraint.mouse as any).mousewheel);
    (mouseConstraint.mouse.element as any).removeEventListener("wheel", (mouseConstraint.mouse as any).mousewheel);

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // --- Custom Render Loop for 12-pointed Starburst ---
    Events.on(render, 'afterRender', () => {
        const ctx = render.context;
        const { position, angle } = giantStar;
        const points = 12;
        const innerRadius = starRadius * 0.5;

        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.fillStyle = THEME.starColor;
        
        for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? starRadius : innerRadius;
            const a = (Math.PI * i) / points;
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        
        ctx.closePath();
        ctx.fill();
        
        // Add stroke for better visibility
        ctx.strokeStyle = '#92400E';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.restore();
    });

    const updateDimensions = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      
      Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 50 });
      Body.setPosition(leftWall, { x: -400, y: newHeight / 2 });
      Body.setPosition(rightWall, { x: newWidth + 400, y: newHeight / 2 });
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(sceneRef.current);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    setTimeout(updateDimensions, 100);
    setTimeout(updateDimensions, 500);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkMobile);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Engine.clear(engine);
    };
  }, [isMobile]);

  return (
    <div className="w-full bg-[#FDFBF7] pt-20">
      
      {/* --- HERO SECTION --- */}
      <section 
        className="relative grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-0 items-center overflow-hidden" 
        style={{ backgroundColor: THEME.bgHero, minHeight: '85vh' }}
      >
        <div className="relative z-30 px-6 md:px-16 py-12 lg:py-0 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-auto"
          >
            <p className="text-lg md:text-xl font-normal mb-8 leading-relaxed max-w-lg" style={{ color: THEME.text }}>
              {m.hero.paragraph}
            </p>
            <h1 
              className="text-[13vw] lg:text-[7vw] font-[900] leading-[0.9] tracking-tighter heading-font uppercase"
              style={{ color: THEME.text }}
            >
              {m.hero.heading1} <br/> {m.hero.heading2} <br/> {m.hero.heading3}
            </h1>
          </motion.div>
        </div>

        <div className="relative w-full h-full min-h-[600px] lg:min-h-[85vh] flex items-end">
            <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing" />
            
            <motion.div
               className="absolute z-20 rounded-[24px] overflow-hidden shadow-2xl border-[4px] border-white rotate-[6deg]"
               style={{ 
                 width: isMobile ? '120px' : '220px', 
                 height: isMobile ? '120px' : '220px',
                 bottom: '15%',    
                 right: '10%',     
               }}
               initial={{ opacity: 0, scale: 0.5, y: 50 }}
               animate={{
                 opacity: 1, 
                 scale: 1, 
                 y: [0, 10, 0], 
                 rotate: [6, 4, 6] 
               }}
               transition={{
                 opacity: { duration: 0.6, delay: 1.8 },
                 scale: { type: "spring", stiffness: 200, damping: 15, delay: 1.8 },
                 y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }, 
                 rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
               }}
            >
               <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt={m.hero.learningAlt}
                  className="w-full h-full object-cover"
               />
               <div className="absolute top-0 right-0 w-12 h-12 bg-[#FACC15] rounded-bl-[1.5rem]" />
            </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: PHILOSOPHY (Green Stepped Borders) --- */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white min-h-[90vh] flex flex-col justify-center">
        
        {/* LEFT STAIRS (Green entering from left) */}
        <div className="absolute top-0 left-0 w-[8%] md:w-[15%] h-full z-0">
           <svg className="w-full h-full drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 100 800">
              <path d="M0 0 H100 V100 H50 V200 H100 V300 H50 V400 H100 V500 H50 V600 H100 V700 H50 V800 H0 Z" fill={THEME.greenStep} />
           </svg>
        </div>

        {/* RIGHT STAIRS (Green entering from right) */}
        <div className="absolute top-0 right-0 w-[8%] md:w-[15%] h-full z-0">
           <svg className="w-full h-full drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 100 800">
              <path d="M100 0 H0 V100 H50 V200 H0 V300 H50 V400 H0 V500 H50 V600 H0 V700 H50 V800 H100 Z" fill={THEME.greenStep} />
           </svg>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
           
           {/* HEADER TEXT */}
           <motion.div 
             className="text-center mb-16 md:mb-24"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-[12vw] md:text-[8vw] font-[900] text-[#1A3C3C] leading-[0.8] tracking-tighter mb-8">
                 {m.philosophy.heading1} <br/> {m.philosophy.heading2}
              </h2>
              <p className="max-w-3xl mx-auto text-lg md:text-2xl font-medium text-[#1A3C3C] leading-relaxed">
                {m.philosophy.subtitle}
              </p>
           </motion.div>

           {/* SPLIT CONTENT */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              {/* LEFT: IMAGE CARD */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                  <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
                      <div className="relative aspect-[4/3] group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                          alt={m.philosophy.imageLabel}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      </div>
                      
                      <div className="p-6 md:p-8 flex items-center justify-between">
                         <span className="font-bold text-[#1A3C3C] text-lg md:text-xl">{m.philosophy.imageLabel}</span>
                         <button className="flex items-center gap-2 bg-[#1A3C3C] text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#FACC15] hover:text-[#1A3C3C] transition-colors">
                            <Play size={14} fill="currentColor" /> {m.philosophy.viewBtn}
                         </button>
                      </div>
                  </div>
              </motion.div>

              {/* RIGHT: TEXT CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 pt-4 lg:pt-8"
              >
                 <h3 className="text-4xl md:text-5xl font-bold text-[#1A3C3C] heading-font leading-tight">
                   {m.philosophy.title}
                 </h3>
                 <p className="text-lg leading-relaxed text-[#1A3C3C]/80">
                   {m.philosophy.desc1}
                 </p>
                 <p className="text-lg leading-relaxed text-[#1A3C3C]/80">
                   {m.philosophy.desc2}
                 </p>
                 <div className="mt-8 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A3C3C]/60 mb-2">{m.philosophy.docTitle}</h4>
                    {m.philosophy.docs.map((item, i) => (
                      <a key={i} href="#" className="flex items-center gap-2 text-[#1A3C3C] font-bold text-lg hover:text-[#FF3366] transition-colors group w-fit">
                        {item} <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* --- SECTION 3: HEALTHY HABITS (BUBBLES & MAGNIFIER) --- */}
      <section className="relative py-24 md:py-32 px-6 bg-white overflow-hidden rounded-b-[60px] md:rounded-b-[100px] z-10">
         <div className="max-w-[1400px] mx-auto">

            {/* Title */}
            <motion.div 
               className="text-center mb-12 md:mb-20"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <h2 className="text-[14vw] md:text-[8vw] font-[900] leading-[0.85] text-[#1A3C3C] uppercase tracking-tighter">
                  {m.habits.heading1} <br />
                  {m.habits.heading2Part1}<span className="italic text-[#009CDA]">I</span>{m.habits.heading2Part2} <br />
                  <span className="relative inline-block z-10">
                    {m.habits.heading3}
                    {/* Stylized 'V' Blue Triangle Background */}
                    <div className="absolute -z-10 w-[120%] h-[120%] top-[-10%] left-[-10%] pointer-events-none">
                       <svg viewBox="0 0 100 100" className="w-full h-full text-[#009CDA] fill-current opacity-90">
                          <path d="M0 0 L100 0 L50 100 Z" />
                       </svg>
                    </div>
                  </span>
               </h2>
            </motion.div>

            {/* Layout for text and bubbles */}
            <div className="relative min-h-[900px] md:min-h-[1100px] lg:min-h-[1000px] w-full">
               
               {/* Intro Text (Left Top) */}
               <motion.div 
                 className="relative md:absolute top-0 left-0 md:left-[5%] max-w-sm z-20 mb-12 md:mb-0"
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
               >
                  <p className="text-xl md:text-2xl font-semibold text-[#1A3C3C] leading-snug">
                    {m.habits.intro}
                  </p>
               </motion.div>

               {/* Bubbles Composition Container */}
               <div className="relative w-full h-[800px] md:h-full">
                  
                  {/* 1. Cloud Bubble (Top Right) */}
                  <motion.div 
                     className="absolute top-[0%] right-[5%] md:right-[10%] w-[280px] md:w-[420px] aspect-square flex items-center justify-center text-center z-10"
                     initial={{ scale: 0.8, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                  >
                     <div className="absolute inset-0 bg-[#D6F5FF] w-full h-full" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}></div>
                     {/* Bumps for cloud effect */}
                     <div className="absolute -top-4 left-1/4 w-1/2 h-16 bg-[#D6F5FF] rounded-full"></div>
                     <div className="absolute -left-4 top-1/4 w-16 h-1/2 bg-[#D6F5FF] rounded-full"></div>
                     <div className="absolute -right-4 top-1/4 w-16 h-1/2 bg-[#D6F5FF] rounded-full"></div>

                     <div className="relative z-10 p-10 md:p-14">
                         <h3 className="font-bold text-2xl md:text-3xl text-[#1A3C3C] mb-3 leading-tight">{m.habits.bubble1Title}</h3>
                         <p className="text-base md:text-lg text-[#1A3C3C]/80 font-medium leading-tight">
                            {m.habits.bubble1Desc}
                         </p>
                     </div>
                  </motion.div>

                  {/* 2. Magnifying Glass (Center Left) - Blue */}
                  <motion.div 
                     className="absolute top-[28%] md:top-[30%] left-[0%] md:left-[15%] z-20"
                     initial={{ scale: 0.8, opacity: 0, x: -30 }}
                     whileInView={{ scale: 1, opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.4 }}
                  >
                      {/* The Handle */}
                      <div className="absolute bottom-[-20px] left-[-20px] w-[140px] h-[300px] bg-[#009CDA] origin-top-right transform rotate-[45deg] rounded-b-full -z-10 border-4 border-white shadow-xl"></div>
                      
                      {/* The Lens Circle */}
                      <div className="relative w-[300px] md:w-[450px] aspect-square rounded-full bg-[#009CDA] flex items-center justify-center p-8 md:p-14 text-center text-white shadow-2xl border-[8px] border-white">
                          <div className="relative z-10">
                             <h3 className="font-bold text-3xl md:text-4xl mb-4 leading-none">{lang === 'es' ? <>Enfoque <br/>Profundo</> : <>Deep <br/>Focus</>}</h3>
                             <p className="text-lg md:text-xl opacity-90 font-medium leading-tight">
                               {m.habits.bubble2Desc}
                             </p>
                          </div>
                      </div>
                  </motion.div>

                  {/* 3. Green Circle (Bottom Right) */}
                  <motion.div 
                     className="absolute top-[65%] md:top-[60%] right-[0%] md:right-[20%] w-[260px] md:w-[380px] aspect-square rounded-full bg-[#CCFF00] flex items-center justify-center p-8 md:p-12 text-center z-30 shadow-xl border-[6px] border-white"
                     initial={{ scale: 0.8, opacity: 0, y: 30 }}
                     whileInView={{ scale: 1, opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.6 }}
                  >
                      <div>
                         <h3 className="font-bold text-2xl md:text-3xl text-[#1A3C3C] mb-3 leading-tight">{m.habits.bubble3Title}</h3>
                         <p className="text-base md:text-lg text-[#1A3C3C] font-medium leading-tight">
                            {m.habits.bubble3Desc}
                         </p>
                      </div>
                  </motion.div>

               </div>
            </div>

            {/* Bottom Card Section (Video/Image) */}
            <div className="mt-24 md:mt-32 flex flex-col md:flex-row items-end gap-12">
               {/* THE CARD */}
               <motion.div 
                 className="w-full md:w-1/2"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                  <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 transform transition-transform hover:-translate-y-1 duration-500">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] group cursor-pointer">
                        <img 
                          src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          alt="Niños corriendo en la naturaleza" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      </div>
                      
                      {/* Card Footer */}
                      <div className="flex items-center justify-between px-2 py-6">
                           <h4 className="text-xl md:text-2xl font-bold text-[#1A3C3C] tracking-tight">
                             {m.habits.cardTitle}
                           </h4>
                           <button className="flex items-center gap-3 bg-[#1A3C3C] text-white px-6 py-3 rounded-full hover:bg-[#CCFF00] hover:text-[#1A3C3C] transition-all duration-300 group shadow-lg cursor-pointer">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:bg-[#1A3C3C] transition-colors">
                                 <Play size={14} fill="currentColor" className="text-[#1A3C3C] group-hover:text-white ml-0.5" />
                              </div>
                              <span className="font-bold text-sm uppercase tracking-wide pr-1">{m.habits.watchVideo}</span>
                           </button>
                      </div>
                  </div>
               </motion.div>

               {/* Description Text */}
               <motion.div 
                 className="w-full md:w-1/2 pb-12 md:pl-8"
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
               >
                   <p className="text-lg md:text-xl font-medium text-[#1A3C3C] max-w-md leading-relaxed">
                      {m.habits.desc}
                   </p>
               </motion.div>
            </div>

         </div>
      </section>

    </div>
  );
};
