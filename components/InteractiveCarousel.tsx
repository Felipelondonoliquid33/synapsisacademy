
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
];

const SLIDE_TYPES = ['left', 'center', 'right', 'left', 'center', 'right'] as const;
const SLIDE_ORIENTATIONS = ['portrait', 'landscape', 'portrait', 'landscape', 'portrait', 'landscape'] as const;

const CLIP_PATH_JAGGED = `polygon(
  0% 8%, 2% 0%, 4% 8%, 8% 4%, 12% 0%, 16% 4%, 20% 0%, 24% 4%, 28% 0%, 32% 4%, 36% 0%,
  40% 4%, 44% 0%, 48% 4%, 52% 0%, 56% 4%, 60% 0%, 64% 4%, 68% 0%, 72% 4%, 76% 0%, 80% 4%, 
  84% 0%, 88% 4%, 92% 0%, 96% 4%, 100% 8%, 100% 12%, 100% 20%, 96% 24%, 100% 28%, 96% 32%,
  100% 40%, 96% 44%, 100% 48%, 96% 52%, 100% 60%, 96% 64%, 100% 68%, 96% 72%, 100% 80%, 
  96% 84%, 100% 88%, 100% 92%, 100% 100%, 96% 100%, 92% 96%, 88% 100%, 84% 96%, 80% 100%, 
  76% 96%, 72% 100%, 68% 96%, 64% 100%, 60% 96%, 56% 100%, 52% 96%, 48% 100%, 44% 96%, 
  40% 100%, 36% 96%, 32% 100%, 28% 96%, 24% 100%, 20% 96%, 16% 100%, 12% 96%, 8% 100%, 
  4% 96%, 0% 92%, 0% 88%, 4% 84%, 0% 80%, 4% 76%, 0% 72%, 4% 68%, 0% 64%, 4% 60%, 0% 56%, 
  4% 52%, 0% 48%, 4% 44%, 0% 40%, 4% 36%, 0% 32%, 4% 28%, 0% 24%, 4% 20%, 0% 16%, 4% 12%
)`;

interface SlideData {
  image: string;
  title: string;
  type: typeof SLIDE_TYPES[number];
  orientation: typeof SLIDE_ORIENTATIONS[number];
}

const JaggedCard: React.FC<{ slide: SlideData; viewMore: string }> = ({ slide, viewMore }) => {
  const isLeft      = slide.type === 'left';
  const isRight     = slide.type === 'right';
  const isCenter    = slide.type === 'center';
  const isLandscape = slide.orientation === 'landscape';
  const baseRotate  = isLeft ? -4 : isRight ? 4 : 0;
  const randomDuration = 4 + Math.random() * 2;
  const randomDelay    = Math.random() * 2;
  const sizeClasses    = isLandscape
    ? 'w-[300px] h-[220px] md:w-[600px] md:h-[400px]'
    : 'w-[260px] h-[360px] md:w-[400px] md:h-[560px]';

  return (
    <motion.div
      className="relative flex-shrink-0 mx-4 md:mx-6 group cursor-grab active:cursor-grabbing"
      animate={{ y: [0, -12, 0], rotate: [baseRotate, baseRotate + 1.5, baseRotate - 1.5, baseRotate] }}
      transition={{ duration: randomDuration, repeat: Infinity, ease: 'easeInOut', delay: randomDelay }}
      whileHover={{ scale: 1.02, zIndex: 40, transition: { duration: 0.3 } }}
    >
      <div
        className={`relative flex items-center justify-center ${sizeClasses} ${isCenter ? 'rounded-[40px] shadow-2xl' : ''}`}
        style={{
          clipPath: !isCenter ? CLIP_PATH_JAGGED : undefined,
          backgroundColor: isLeft ? '#C084FC' : isRight ? '#CCFF00' : 'white',
          padding: !isCenter ? '16px' : '0',
        }}
      >
        <div className={`w-full h-full overflow-hidden bg-white ${isCenter ? 'rounded-[40px]' : ''} ${!isCenter ? 'rounded-lg' : ''} relative`}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
              <span className="text-white font-bold text-3xl md:text-4xl heading-font uppercase tracking-wider block">{slide.title}</span>
              <span className="text-white/80 text-sm font-mono mt-2 block">{viewMore}</span>
            </div>
          </div>
        </div>
      </div>
      {!isCenter && (
        <div className="absolute inset-0 bg-black/20 -z-10 blur-xl translate-y-8 rounded-full opacity-50"
          style={{ transform: `rotate(${baseRotate}deg) translateY(20px) scale(0.9)` }}
        />
      )}
    </motion.div>
  );
};

export const InteractiveCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const c = t.carousel;

  const slides: SlideData[] = SLIDE_IMAGES.map((image, i) => ({
    image,
    title: c.slides[i],
    type:  SLIDE_TYPES[i],
    orientation: SLIDE_ORIENTATIONS[i],
  }));

  return (
    <section className="py-32 bg-[#FDFBF7] overflow-hidden relative">
      
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
           <span className="text-[#FF3366] font-bold tracking-widest uppercase mb-2 block">{c.tag}</span>
           <h2 className="text-4xl md:text-6xl font-bold text-[#1E1B4B] heading-font leading-none">
             {c.heading1}<br/>
             <span className="text-[#C084FC] italic">{c.heading2}</span>
           </h2>
        </div>
        <div className="flex items-center gap-2 text-[#1E1B4B]/50 text-sm font-medium animate-pulse">
           <MoveLeft size={16} />
           <span>{c.drag}</span>
           <MoveRight size={16} />
        </div>
      </div>

      <div ref={containerRef} className="w-full relative z-10">
        <motion.div
          className="flex px-[5vw] py-20 items-center cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -2600 }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {slides.map((slide, index) => (
            <JaggedCard key={index} slide={slide} viewMore={c.viewMore} />
          ))}
        </motion.div>
      </div>

    </section>
  );
};
