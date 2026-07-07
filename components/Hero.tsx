
import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const PALETTE = {
  lime: '#CCFF00',      // Acid Volt
  cyan: '#C084FC',      // Electric Lavender
  lightBlue: '#E0F2FE', // Very Pale Blue
  textMain: '#1E1B4B',  // Deep Indigo
  cream: '#FDFBF7',     // Off White
  white: '#FFFFFF',
  orange: '#FF3366'     // Neon Raspberry
};

interface HeroProps {
  isLoading: boolean;
}

// Safari-safe rounded rectangle helper
function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y,     x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x,     y + h, radius);
  ctx.arcTo(x,     y + h, x,     y,     radius);
  ctx.arcTo(x,     y,     x + w, y,     radius);
  ctx.closePath();
}

export const Hero: React.FC<HeroProps> = ({ isLoading }) => {
  const { lang, t } = useLanguage();
  const sceneRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const engineRef    = useRef<Matter.Engine | null>(null);
  const rafRef       = useRef<number>(0);

  useEffect(() => {
    if (isLoading) return;

    let engine: Matter.Engine;
    let handleResize: () => void;
    let animFrameId: number;

    const initPhysics = () => {
      if (!sceneRef.current) return;

      const {
        Engine, Runner, Bodies, Body, Composite,
        MouseConstraint, Mouse, Common
      } = Matter;

      // ── 1. ENGINE ────────────────────────────────────────
      engine = Engine.create();
      engine.gravity.y = 0.8;
      engine.gravity.x = 0;
      engineRef.current = engine;
      const world = engine.world;

      // ── 2. CANVAS (manual, Safari-safe) ─────────────────
      const container = sceneRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2× for perf

      const canvas = document.createElement('canvas');
      canvas.style.cssText =
        'position:absolute;top:0;left:0;width:100%;height:100%;display:block;';
      container.appendChild(canvas);
      canvasRef.current = canvas;

      const getSize = () => ({
        w: container.clientWidth  || window.innerWidth,
        h: container.clientHeight || window.innerHeight * 1.5,
      });

      const resizeCanvas = () => {
        const { w, h } = getSize();
        canvas.width  = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      };
      resizeCanvas();

      const ctx = canvas.getContext('2d')!;

      // ── 3. BOUNDARIES ────────────────────────────────────
      const wallOpts = { isStatic: true, render: { visible: false }, friction: 0.5, restitution: 0.2 };
      const { w: W, h: H } = getSize();
      const baseWidth  = 1920;
      const scale      = Math.max(W / baseWidth, 0.5);

      const floor    = Bodies.rectangle(W / 2,   H - 25,  W,    100, wallOpts);
      const rightWall= Bodies.rectangle(W + 50,  H / 2,   100,  H * 2, wallOpts);
      const midWall  = Bodies.rectangle(W * 0.5, H / 2,   20,   H * 2, wallOpts);
      Composite.add(world, [floor, rightWall, midWall]);

      // ── 4. BODY FACTORIES ────────────────────────────────
      const createBurst = (x: number, y: number, radius: number, color: string, text?: string) =>
        Bodies.circle(x, y, radius * 0.8, {
          restitution: 0.4, friction: 0.5, label: 'Burst',
          render: { fillStyle: 'transparent' },
          plugin: { radius, color, text, points: 12 }
        });

      const createCloud = (x: number, y: number, cw: number, color: string, text?: string) =>
        Bodies.circle(x, y, cw * 0.4, {
          restitution: 0.4, friction: 0.5, label: 'Cloud',
          render: { fillStyle: 'transparent' },
          plugin: { width: cw, color, text }
        });

      const createCircle = (x: number, y: number, radius: number, color: string, text?: string) =>
        Bodies.circle(x, y, radius, {
          restitution: 0.5, friction: 0.4, label: 'CircleLabel',
          render: { fillStyle: color },
          plugin: { text, color }
        });

      const createCross = (x: number, y: number, size: number, color: string) => {
        const thickness = size * 0.35;
        const r = 10 * scale;
        const partA = Bodies.rectangle(x, y, size, thickness, { chamfer: { radius: r }, render: { fillStyle: color } });
        const partB = Bodies.rectangle(x, y, thickness, size, { chamfer: { radius: r }, render: { fillStyle: color } });
        return Body.create({ parts: [partA, partB], restitution: 0.4, friction: 0.5, label: 'Cross' });
      };

      const createPhoto = (x: number, y: number, pw: number, ph: number, url: string, isRound: boolean) =>
        Bodies.rectangle(x, y, pw, ph, {
          chamfer: { radius: isRound ? 50 * scale : 0 },
          angle: Common.random(-0.5, 0.5),
          restitution: 0.3, friction: 0.8, label: 'Photo',
          render: { fillStyle: 'transparent' },
          plugin: { url, w: pw, h: ph, isRound }
        });

      const createGeo = (x: number, y: number, sides: number, radius: number, color: string) =>
        Bodies.polygon(x, y, sides, radius, {
          restitution: 0.5, friction: 0.5, label: 'Geo',
          render: { fillStyle: color },
          plugin: { sides, radius, color }
        });

      // ── 5. SPAWN ─────────────────────────────────────────
      const elements = [
        createBurst(  W * 0.70, -250  * scale, 160 * scale, PALETTE.lime,      t.hero.shape1),
        createCloud(  W * 0.85, -600  * scale, 280 * scale, PALETTE.cyan,      t.hero.shape2),
        createCircle( W * 0.60, -950  * scale, 140 * scale, PALETTE.lightBlue, t.hero.shape3),
        createCross(  W * 0.90, -1250 * scale, 200 * scale, PALETTE.lime),
        createPhoto(  W * 0.75, -1600 * scale, 200 * scale, 200 * scale, 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', true),
        createPhoto(  W * 0.55, -2000 * scale, 300 * scale, 380 * scale, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', true),
        createPhoto(  W * 0.85, -2400 * scale, 140 * scale, 140 * scale, 'https://images.unsplash.com/photo-1427504746696-ea5abd7dfe8b?auto=format&fit=crop&w=800&q=80', true),
        createGeo(    W * 0.70, -2700 * scale, 3, 130 * scale, PALETTE.orange),
        createGeo(    W * 0.60, -3000 * scale, 6, 100 * scale, PALETTE.textMain),
      ];
      Composite.add(world, elements);

      // ── 6. PRELOAD IMAGES ────────────────────────────────
      const loadedImages: Record<string, HTMLImageElement> = {};
      elements.forEach(body => {
        if (body.label === 'Photo') {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = body.plugin.url;
          loadedImages[body.plugin.url] = img;
        }
      });

      // ── 7. MOUSE INTERACTION ─────────────────────────────
      const mouse = Mouse.create(canvas);
      const mc    = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.1, render: { visible: false } }
      });
      // Restore wheel/scroll events intercepted by Matter
      const mel = mouse.element as HTMLElement;
      mel.style.touchAction = 'pan-y';
      mel.removeEventListener('mousewheel',     (mouse as any).mousewheel);
      mel.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel);
      mel.removeEventListener('wheel',          (mouse as any).mousewheel);
      Composite.add(world, mc);

      // ── 8. RUNNER (physics only, no built-in renderer) ───
      const runner = Runner.create();
      Runner.run(runner, engine);

      // ── 9. CUSTOM DRAW LOOP ──────────────────────────────
      const draw = () => {
        const { w, h } = getSize();
        // Resize if container changed (Safari quirk)
        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
          canvas.width  = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Scale context for HiDPI (critical fix for Retina Macs in Safari)
        ctx.save();
        ctx.scale(dpr, dpr);

        Composite.allBodies(world).forEach(body => {
          if (!body.render.visible) return;
          const { position, angle, label, plugin } = body;

          ctx.save();
          ctx.translate(position.x, position.y);
          ctx.rotate(angle);

          // ── BURST / STAR ──
          if (label === 'Burst') {
            const { radius, color, points, text } = plugin;
            const inner = radius * 0.5;
            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
              const r = i % 2 === 0 ? radius : inner;
              const a = (Math.PI * i) / points;
              const px = Math.cos(a) * r;
              const py = Math.sin(a) * r;
              i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            if (text) {
              ctx.rotate(-angle);
              ctx.fillStyle = PALETTE.textMain;
              ctx.font = `700 ${Math.round(42 * scale)}px Inter,sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(text, 0, 0);
            }
          }

          // ── CLOUD ──
          else if (label === 'Cloud') {
            const { width: cw, color, text } = plugin;
            const r = cw * 0.25;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(-r,     0,       r,       0, Math.PI * 2);
            ctx.arc( r,     0,       r,       0, Math.PI * 2);
            ctx.arc( 0,    -r * 0.8, r * 1.1, 0, Math.PI * 2);
            ctx.arc( 0,     r * 0.5, r * 0.9, 0, Math.PI * 2);
            ctx.fill();
            if (text) {
              ctx.fillStyle = PALETTE.textMain;
              ctx.font = `600 ${Math.round(38 * scale)}px Inter,sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(text, 0, 0);
            }
          }

          // ── CIRCLE LABEL ──
          else if (label === 'CircleLabel') {
            if (plugin.text) {
              ctx.fillStyle = PALETTE.textMain;
              ctx.font = `600 ${Math.round(32 * scale)}px Inter,sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(plugin.text, 0, 0);
            }
          }

          // ── POLYGON (GEO) ──
          else if (label === 'Geo') {
            const { sides, radius, color } = plugin;
            ctx.fillStyle = color;
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
              const theta = (i / sides) * 2 * Math.PI;
              const px = radius * Math.cos(theta);
              const py = radius * Math.sin(theta);
              i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
          }

          // ── PHOTO ──
          else if (label === 'Photo') {
            const { w: pw, h: ph, url, isRound } = plugin;
            const img = loadedImages[url];
            ctx.beginPath();
            if (isRound) {
              roundRectPath(ctx, -pw / 2, -ph / 2, pw, ph, 50 * scale);
            } else {
              ctx.rect(-pw / 2, -ph / 2, pw, ph);
            }
            ctx.clip();
            if (img && img.complete && img.naturalWidth > 0) {
              const s  = Math.max(pw / img.naturalWidth, ph / img.naturalHeight);
              const sw = img.naturalWidth  * s;
              const sh = img.naturalHeight * s;
              ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
            } else {
              ctx.fillStyle = '#DDD';
              ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
            }
          }

          ctx.restore();
        });

        ctx.restore(); // restore dpr scale
        animFrameId = requestAnimationFrame(draw);
        rafRef.current = animFrameId;
      };

      draw();

      // ── 10. RESIZE ───────────────────────────────────────
      handleResize = () => {
        if (!sceneRef.current) return;
        const { w, h } = getSize();
        resizeCanvas();
        Body.setPosition(floor,     { x: w / 2,   y: h - 25 });
        Body.setPosition(rightWall, { x: w + 50,  y: h / 2  });
        Body.setPosition(midWall,   { x: w * 0.5, y: h / 2  });
      };
      window.addEventListener('resize', handleResize);
    };

    // Delay to let loader exit animation finish
    const timer = setTimeout(initPhysics, 800);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (engine) {
        Matter.Engine.clear(engine);
        Matter.Composite.clear(engine.world, false);
      }
      if (canvasRef.current) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
    };
  }, [isLoading]);

  return (
    <section className="relative h-[150vh] bg-[#FDFBF7] overflow-hidden">
      
      {/* 1. Main Title */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-20 px-4">
         <div className="relative text-center w-full">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={!isLoading ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[21vw] lg:text-[13vw] leading-[0.8] font-[800] text-[#1E1B4B] tracking-tighter w-full"
            >
              <span className="block">{t.hero.line1}</span>
              <span className="block whitespace-nowrap">
                {lang === 'es' ? (
                  <>
                    {t.hero.line2pre}{' '}
                    <span className="inline-flex relative mx-[0.2em] pointer-events-auto">
                      {['I', 'A'].map((letter, i) => (
                        <motion.span
                          key={i}
                          className="text-[#C084FC] inline-block cursor-pointer"
                          initial={{ y: 0 }}
                          animate={{ 
                            y: [0, -8, 0],
                            rotate: [0, i % 2 === 0 ? 3 : -3, 0] 
                          }}
                          transition={{ 
                            duration: 3.5 + i * 0.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                          whileHover={{ 
                            scale: 1.25,
                            rotate: i % 2 === 0 ? -12 : 12,
                            transition: { type: "spring", stiffness: 400, damping: 12 } 
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </span>
                    {' '}{t.hero.line2post}
                  </>
                ) : (
                  <>
                    {t.hero.line2pre}{' '}{t.hero.line2post}{' '}
                    <span className="inline-flex relative mx-[0.2em] pointer-events-auto">
                      {['A', 'I'].map((letter, i) => (
                        <motion.span
                          key={i}
                          className="text-[#C084FC] inline-block cursor-pointer"
                          initial={{ y: 0 }}
                          animate={{ 
                            y: [0, -8, 0],
                            rotate: [0, i % 2 === 0 ? 3 : -3, 0] 
                          }}
                          transition={{ 
                            duration: 3.5 + i * 0.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                          whileHover={{ 
                            scale: 1.25,
                            rotate: i % 2 === 0 ? -12 : 12,
                            transition: { type: "spring", stiffness: 400, damping: 12 } 
                          }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </span>
                  </>
                )}
              </span>
            </motion.h1>
            
            {/* Decorative Flower */}
            <motion.div 
               initial={{ scale: 0 }}
               animate={!isLoading ? { scale: 1 } : {}}
               transition={{ delay: 1, type: "spring" }}
               className="absolute -top-8 -right-4 lg:-top-16 lg:right-[5%] w-24 h-24 lg:w-48 lg:h-48 text-[#CCFF00] -z-10 opacity-80"
            >
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full animate-spin-slow">
                 <path d="M50 0 C60 20 80 20 85 15 C90 35 95 40 100 50 C80 60 80 80 85 85 C65 90 60 95 50 100 C40 80 20 80 15 85 C10 65 5 60 0 50 C20 40 20 20 15 15 C35 10 40 5 50 0 Z" />
              </svg>
            </motion.div>
         </div>
      </div>

      {/* 2. Subtitle & CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[84px] left-6 md:left-12 max-w-2xl z-30 pointer-events-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E1B4B]">{t.hero.subtitle}</h2>
        <p className="text-xl md:text-2xl text-[#1E1B4B] mb-8 leading-relaxed">
          {t.hero.body}
        </p>
        
        <button className="group flex items-center gap-3 text-[#1E1B4B] font-bold text-base md:text-lg uppercase tracking-wider hover:text-[#CCFF00] transition-colors">
          <span>{t.hero.cta}</span>
          <ArrowRight size={22} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* 3. Physics Canvas Container */}
      <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10 pointer-events-auto" />
      
    </section>
  );
};
