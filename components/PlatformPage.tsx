import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Matter from 'matter-js';
import { Play, Check, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// --- Constants ---
const THEME = {
  bgHero: '#ADD9E8',      // Explicit Concept Blue
  bgGreen: '#C8F5A0',     // Concept Pastel Green (User requested)
  text: '#1A3C3C',        // Concept Dark Green/Teal
  xColor: '#0099CC',      // Concept Bright Blue
  blobBlue: '#D6F5FF',
  blobGreen: '#ECFCCB',
};

// Mockup specific colors
const MOCKUP = {
  darkText: '#002626',   // Very dark teal/green from image text
  blueShape: '#009CDA',  // Cyan blue
  appleGreen: '#E3F09B', // Pale yellow-green
  limeShape: '#CEDF00',  // Vibrant lime
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: 'easeOut' } 
  }
};

export const PlatformPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const p = t.platform;
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Matter.js Physics for the Giant X ---
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
      Mouse = Matter.Mouse;

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

    const xSize = isMobile ? 300 : 750;
    const xThickness = xSize * 0.30; 
    
    const startX = width * 0.45; 
    const startY = -1200; 

    const partA = Bodies.rectangle(startX, startY, xSize, xThickness, {
      render: { fillStyle: THEME.xColor },
      chamfer: { radius: isMobile ? 25 : 55 }
    });
    
    const partB = Bodies.rectangle(startX, startY, xThickness, xSize, {
      render: { fillStyle: THEME.xColor },
      chamfer: { radius: isMobile ? 25 : 55 }
    });

    const giantX = Body.create({
      parts: [partA, partB],
      restitution: 0.3,
      friction: 0.5,
      frictionAir: 0.005,
      density: 0.002,
      angle: Math.PI / 4
    });

    Body.setAngularVelocity(giantX, 0.03);

    Composite.add(engine.world, giantX);

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
      
      {/* --- 1. HERO SECTION --- */}
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
              {p.hero.paragraph}
            </p>
            <h1 
              className="text-[13vw] lg:text-[7vw] font-[900] leading-[0.9] tracking-tighter heading-font uppercase"
              style={{ color: THEME.text }}
            >
              {p.hero.heading1} <br/> {p.hero.heading2} <br/> {p.hero.heading3}
            </h1>
          </motion.div>
        </div>

        <div className="relative w-full h-full min-h-[600px] lg:min-h-[85vh] flex items-end">
            <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing" />
            <motion.div
               className="absolute z-20 rounded-[24px] overflow-hidden shadow-2xl border-[4px] border-white rotate-[-6deg]"
               style={{ 
                 width: isMobile ? '120px' : '220px', 
                 height: isMobile ? '120px' : '220px',
                 bottom: '8%',    
                 right: '5%',     
               }}
               initial={{ opacity: 0, scale: 0.5, y: 50 }}
               animate={{
                 opacity: 1, 
                 scale: 1, 
                 y: [0, -10, 0], 
                 rotate: [-6, -4, -6] 
               }}
               transition={{
                 opacity: { duration: 0.6, delay: 1.8 },
                 scale: { type: "spring", stiffness: 200, damping: 15, delay: 1.8 },
                 y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.8 }, 
                 rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }
               }}
            >
               <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt={p.hero.classroomAlt}
                  className="w-full h-full object-cover"
               />
               <div className="absolute top-0 right-0 w-12 h-12 bg-[#CCFF00] rounded-bl-[1.5rem]" />
            </motion.div>
        </div>
      </section>

      {/* --- 2. ADAPTIVE LEARNING SECTION --- */}
      <section className="bg-white py-24 px-4 md:px-12 lg:px-24 overflow-hidden">
        <motion.div 
          className="text-center mb-16 md:mb-32 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
           <h2 
             className="text-[12vw] leading-[0.8] font-[900] tracking-tighter text-center uppercase flex flex-col items-center justify-center gap-2 md:gap-6"
             style={{ 
               fontFamily: "'Oswald', sans-serif",
               color: MOCKUP.darkText 
              }}
           >
              <div className="flex items-center justify-center">
                <span>{p.adaptive.part1}</span>
                <span className="relative inline-block w-[0.3em] h-[0.8em] mx-[0.02em] -mt-[0.1em]">
                   <svg viewBox="0 0 50 120" className="w-full h-full drop-shadow-lg" preserveAspectRatio="none">
                      <path 
                        d="M15 0 L50 15 L40 120 L0 105 Z" 
                        fill={MOCKUP.blueShape} 
                      />
                   </svg>
                </span>
                <span>{p.adaptive.part2}</span>
              </div>
              <span>{p.adaptive.subline}</span>
           </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-8 items-center max-w-[1920px] mx-auto">
            <motion.div 
              className="flex flex-col gap-8 lg:pr-12 relative z-30"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <h3 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: MOCKUP.darkText }}>
                 {p.adaptive.title}
               </h3>
               <p className="text-xl leading-relaxed font-medium opacity-80" style={{ color: MOCKUP.darkText }}>
                 {p.adaptive.desc1}
               </p>
               <p className="text-base leading-relaxed opacity-70" style={{ color: MOCKUP.darkText }}>
                 {p.adaptive.desc2}
               </p>
            </motion.div>

            <div className="relative w-full h-[700px] md:h-[900px] mt-12 lg:mt-0">
               <motion.div 
                 className="absolute top-0 left-[45%] md:left-[40%] -translate-x-1/2 w-[380px] md:w-[600px] aspect-[16/10] flex items-center justify-center p-12 text-center z-20"
                 initial={{ y: -50, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
               >
                  <div className="absolute inset-0 w-full h-full drop-shadow-2xl">
                      <svg viewBox="0 0 500 350" className="w-full h-full" preserveAspectRatio="none">
                         <path d="M0,80 Q250,180 500,80 L500,250 Q250,380 0,250 Z" fill={MOCKUP.blueShape} />
                      </svg>
                  </div>
                  <div className="relative z-10 pt-4 md:pt-10 max-w-[80%]">
                     <h4 className="text-2xl md:text-3xl font-bold mb-3 uppercase tracking-wide" style={{ color: MOCKUP.darkText }}>{p.adaptive.card1Title}</h4>
                     <p className="text-base md:text-lg font-medium leading-tight opacity-90" style={{ color: MOCKUP.darkText }}>
                       {p.adaptive.card1Desc}
                     </p>
                  </div>
               </motion.div>

               <motion.div 
                 className="absolute bottom-20 left-0 md:-left-12 w-[340px] md:w-[520px] aspect-square flex items-center justify-center p-12 text-center z-10"
                 initial={{ scale: 0.8, opacity: 0 }}
                 whileInView={{ scale: 1, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
               >
                   <div className="absolute inset-0 w-full h-full drop-shadow-xl">
                      <svg viewBox="0 0 300 300" className="w-full h-full">
                         <path d="M150,280 C60,280 20,200 40,140 C60,60 140,60 150,100 C160,60 240,60 260,140 C280,200 240,280 150,280 Z" fill={MOCKUP.appleGreen} />
                         <path d="M150,100 Q160,60 190,50" fill="none" stroke={MOCKUP.appleGreen} strokeWidth="16" strokeLinecap="round" />
                      </svg>
                   </div>
                   <div className="relative z-10 pt-16 max-w-[75%]">
                     <h4 className="text-2xl md:text-3xl font-bold mb-2 uppercase" style={{ color: MOCKUP.darkText }}>{p.adaptive.card2Title}</h4>
                     <p className="text-base md:text-lg font-medium leading-tight opacity-90" style={{ color: MOCKUP.darkText }}>
                       {p.adaptive.card2Desc}
                     </p>
                   </div>
               </motion.div>

               <motion.div 
                 className="absolute bottom-0 right-0 md:-right-12 w-[360px] md:w-[580px] aspect-[4/3] flex items-center justify-center p-12 text-center z-10"
                 initial={{ x: 50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.6 }}
               >
                   <div className="absolute inset-0 w-full h-full drop-shadow-xl">
                      <svg viewBox="0 0 320 240" className="w-full h-full">
                         <path d="M40,180 Q0,100 60,60 Q120,0 200,40 Q280,0 320,100 Q340,200 240,220 Q100,240 40,180 Z" fill={MOCKUP.limeShape} />
                      </svg>
                   </div>
                   <div className="relative z-10 max-w-[80%]">
                     <h4 className="text-2xl md:text-3xl font-bold mb-2 uppercase" style={{ color: MOCKUP.darkText }}>{p.adaptive.card3Title}</h4>
                     <p className="text-base md:text-lg font-medium leading-tight opacity-90" style={{ color: MOCKUP.darkText }}>
                       {p.adaptive.card3Desc}
                     </p>
                   </div>
               </motion.div>
            </div>
        </div>
      </section>

      {/* --- 3. APPROACH SECTION (STAIRCASE SIDES) --- */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-white min-h-screen flex flex-col justify-center">
        
        {/* LEFT STAIRS (Green entering from left) */}
        <div className="absolute top-0 left-0 w-[15%] md:w-[25%] h-full z-0 hidden md:block">
           <svg className="w-full h-full drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 100 800">
              <path d="M0 0 H100 V100 H50 V200 H100 V300 H50 V400 H100 V500 H50 V600 H100 V700 H50 V800 H0 Z" fill="#C8F5A0" />
           </svg>
        </div>

        {/* RIGHT STAIRS (Green entering from right) */}
        <div className="absolute top-0 right-0 w-[15%] md:w-[25%] h-full z-0 hidden md:block">
           <svg className="w-full h-full drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 100 800">
              <path d="M100 0 H0 V100 H50 V200 H0 V300 H50 V400 H0 V500 H50 V600 H0 V700 H50 V800 H100 Z" fill="#C8F5A0" />
           </svg>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
           
           {/* TITLE CENTERED IN WHITE SPACE */}
           <motion.div 
             className="text-center mb-16 md:mb-24"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-[13vw] md:text-[8vw] font-[900] text-[#1A3C3C] leading-[0.8] uppercase tracking-tighter">
                 {p.approach.heading1} <br/> {p.approach.heading2}
              </h2>
           </motion.div>

           {/* CONTENT GRID */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* LEFT: IMAGE CARD */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                  <div className="relative rounded-[32px] overflow-hidden shadow-2xl rotate-[-2deg] transition-transform hover:rotate-0 duration-500 bg-white border-[8px] border-white">
                      <img 
                        src="https://images.unsplash.com/photo-1577896337627-8013f3471478?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                        alt="Classroom"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      {/* Floating Label */}
                      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg">
                          <h3 className="text-xl font-bold text-[#1A3C3C]">{p.approach.imageLabel}</h3>
                          <button className="flex items-center gap-2 mt-2 text-sm font-bold uppercase tracking-wider text-[#1A3C3C]/70 hover:text-[#009CDA] transition-colors">
                             <Play size={14} fill="currentColor" /> {p.approach.viewVideo}
                          </button>
                      </div>
                  </div>
              </motion.div>

              {/* RIGHT: TEXT CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-8 text-[#1A3C3C] lg:pl-10"
              >
                 <p className="text-2xl md:text-3xl font-bold leading-tight">
                   {p.approach.title}
                 </p>
                 
                 <p className="text-lg font-medium leading-relaxed opacity-80">
                   {p.approach.desc}
                 </p>

                 <div className="mt-8">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 opacity-100">{p.approach.docTitle}</h3>
                    <div className="flex flex-col items-start gap-3">
                       {p.approach.docs.map((link, i) => (
                         <a 
                           key={i} 
                           href="#" 
                           className="inline-block bg-[#C8F5A0]/30 hover:bg-[#C8F5A0] px-5 py-3 rounded-lg font-bold text-lg transition-all text-[#1A3C3C]"
                         >
                           {link}
                         </a>
                       ))}
                    </div>
                 </div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* --- 4. RESULTS SECTION (REDESIGNED - ROUNDED BOTTOM & REAL LETTERS) --- */}
      <section 
        className="py-24 px-6 md:px-16 min-h-screen flex items-center overflow-hidden relative z-10 rounded-b-[60px] md:rounded-b-[100px]" 
        style={{ backgroundColor: THEME.bgGreen }}
      >
        {/* Background Noise Texture for texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            
            {/* LEFT: Big Poster Letters Composition */}
            <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
                
                {/* 1. Blue "ñ" - Huge Poster Type */}
                <motion.div 
                   className="absolute top-[10%] left-[-5%] z-20"
                   animate={{ 
                     y: [0, -15, 0],
                     rotate: [0, -3, 0]
                   }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                   <span 
                      className="text-[250px] md:text-[350px] leading-none text-[#009CDA] drop-shadow-2xl"
                      style={{ fontFamily: '"Luckiest Guy", cursive' }}
                   >
                     ñ
                   </span>
                </motion.div>

                {/* 2. White "?" - Huge Poster Type */}
                <motion.div 
                   className="absolute top-[-5%] right-[5%] z-10"
                   animate={{ 
                     y: [0, 20, 0],
                     rotate: [0, 5, 0]
                   }}
                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                   <span 
                      className="text-[300px] md:text-[400px] leading-none text-white drop-shadow-lg"
                      style={{ fontFamily: '"Luckiest Guy", cursive' }}
                   >
                     ?
                   </span>
                </motion.div>

                {/* 3. Lime/Dark "oe" - Huge Poster Type */}
                <motion.div 
                   className="absolute bottom-[0%] left-[25%] z-30"
                   animate={{ 
                     scale: [1, 1.05, 1],
                     rotate: [0, -2, 0]
                   }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                   <span 
                      className="text-[200px] md:text-[300px] leading-none text-[#CEDF00] drop-shadow-2xl"
                      style={{ fontFamily: '"Luckiest Guy", cursive' }}
                   >
                     oe
                   </span>
                </motion.div>
            </div>

            {/* RIGHT: Content */}
            <div className="flex flex-col gap-10">
                <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                >
                    <h2 className="text-6xl md:text-8xl font-[900] leading-[0.85] tracking-tighter uppercase text-[#1A3C3C] heading-font mb-8">
                      {p.benefits.heading1} <br/> {p.benefits.heading2}
                    </h2>
                    <div className="space-y-6 text-[#1A3C3C] text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                       <p>
                         {p.benefits.desc1}
                       </p>
                       <p className="opacity-80">
                         {p.benefits.desc2}
                       </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-4">
                    {p.benefits.items.map((benefit, i) => (
                       <motion.div 
                         key={i}
                         className="flex items-center gap-4 group"
                         initial={{ opacity: 0, x: 30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 + (i * 0.05) }}
                       >
                          <div className="w-8 h-8 flex items-center justify-center">
                             <Check size={32} strokeWidth={4} className="text-[#1A3C3C] group-hover:scale-110 transition-transform" />
                          </div>
                          <span className="text-xl font-bold text-[#1A3C3C] tracking-tight">{benefit}</span>
                       </motion.div>
                    ))}
                </div>
            </div>

        </div>
      </section>

    </div>
  );
};
