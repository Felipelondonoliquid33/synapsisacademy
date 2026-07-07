
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';
import { X, ArrowRight, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const PALETTE = {
  lime: '#CCFF00',
  blue: '#C084FC',
  orange: '#FF3366',
  orangeBtn: '#FF85A8',
  text: '#1E1B4B',
  bg: '#FFFFFF',
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

interface MenuOverlayProps {
  closeMenu: () => void;
  onNavigate: (page: 'home' | 'platform' | 'methodology') => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ closeMenu, onNavigate }) => {
  const { t } = useLanguage();
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const NAV_ITEMS = t.menu.navItems.map((label, i) => ({ id: i + 1, label }));

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Common = Matter.Common;

    const engine = Engine.create();
    engine.gravity.y = 0.8;
    engine.gravity.x = 0;
    engineRef.current = engine;

    const width  = sceneRef.current.clientWidth;
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

    const wallOptions = { isStatic: true, render: { visible: false }, friction: 0.8, restitution: 0.2 };
    const floor    = Bodies.rectangle(width / 2, height + 60, width, 120, wallOptions);
    const leftWall = Bodies.rectangle(-60, height / 2, 120, height * 2, wallOptions);
    const rightWall= Bodies.rectangle(width + 60, height / 2, 120, height * 2, wallOptions);

    const blueCloud   = Bodies.polygon(width * 0.5, -200, 8, width * 0.22, {
      label: 'blueCloud', render: { fillStyle: PALETTE.blue },
      chamfer: { radius: 80 }, restitution: 0.4, friction: 0.5, angle: Math.PI / 4
    });
    const limeTriangle = Bodies.polygon(width * 0.55, -500, 3, width * 0.18, {
      label: 'limeTriangle', render: { fillStyle: PALETTE.lime },
      chamfer: { radius: 30 }, restitution: 0.5, friction: 0.6,
      angle: Common.random(0, Math.PI * 2)
    });
    const orangeBlob = Bodies.circle(width * 0.45, -800, width * 0.16, {
      label: 'orangeBlob', render: { fillStyle: PALETTE.orange },
      restitution: 0.6, friction: 0.5,
    });

    Composite.add(engine.world, [floor, leftWall, rightWall, blueCloud, limeTriangle, orangeBlob]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.1, render: { visible: false } },
    });

    (mouseConstraint.mouse.element as any).removeEventListener('mousewheel',     (mouseConstraint.mouse as any).mousewheel);
    (mouseConstraint.mouse.element as any).removeEventListener('DOMMouseScroll', (mouseConstraint.mouse as any).mousewheel);

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Engine.clear(engine);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-white overflow-hidden font-sans"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div ref={sceneRef} className="absolute inset-0 z-0 opacity-80" />

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        
        {/* CLOSE */}
        <button 
          onClick={closeMenu}
          className="absolute top-8 right-8 z-50 flex items-center gap-2 text-[#1E1B4B] font-bold text-lg hover:opacity-70 transition-opacity"
        >
          <X size={28} strokeWidth={2.5} />
          <span>{t.nav.close}</span>
        </button>

        {/* LEFT — Main Nav */}
        <div className="w-full md:w-[60%] h-full flex flex-col justify-center px-8 md:px-24">
          <nav className="flex flex-col gap-2 md:gap-4">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.id}
                href={i === 0 || i === 1 ? undefined : '#'}
                className="block w-fit pointer-events-auto cursor-pointer"
                onClick={(e) => {
                  if (i === 0) { e.preventDefault(); onNavigate('platform'); }
                  else if (i === 1) { e.preventDefault(); onNavigate('methodology'); }
                  else { onNavigate('home'); }
                  closeMenu();
                }}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className={`
                  block text-5xl md:text-[5.5rem] font-bold leading-[1.1] tracking-tight
                  text-[#1E1B4B] transition-transform duration-300 origin-left
                  ${hoveredItem === item.id ? 'scale-105 translate-x-4' : ''}
                `}>
                  {item.label}
                </span>
              </motion.a>
            ))}
          </nav>
        </div>

        {/* RIGHT — Secondary */}
        <div className="w-full md:w-[40%] h-full flex flex-col justify-center px-8 md:px-16 pt-0 md:pt-24 pointer-events-none">
          <div className="pointer-events-auto">
            <div className="flex flex-col gap-6 mb-16">
              {t.menu.secondaryLinks.map((label, i) => (
                <motion.a
                  key={label}
                  href="#"
                  className="text-2xl md:text-3xl font-semibold text-[#1E1B4B] hover:text-[#FF3366] transition-colors w-fit cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  onClick={(e) => {
                    if (i === 0) { e.preventDefault(); onNavigate('methodology'); closeMenu(); }
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <p className="text-sm font-bold tracking-widest uppercase text-[#1E1B4B]/60 mb-4">
                {t.menu.campusLabel}
              </p>
              <button className="flex items-center gap-4 bg-[#FF85A8] pr-8 pl-2 py-2 rounded-full hover:bg-[#FF3366] hover:shadow-lg transition-all duration-300 group cursor-pointer w-fit">
                <div className="w-12 h-12 bg-[#FF3366] rounded-full flex items-center justify-center text-[#1E1B4B] group-hover:bg-white transition-colors">
                  <span className="font-serif font-bold text-xl">S</span>
                </div>
                <span className="text-xl font-bold text-[#1E1B4B] whitespace-nowrap">
                  {t.menu.studentAccess}
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
