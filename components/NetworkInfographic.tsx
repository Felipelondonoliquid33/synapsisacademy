
import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const NetworkInfographic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });
  const { lang, t } = useLanguage();
  const imp = t.impact;

  const statsVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.8 + index * 0.15, duration: 0.8, ease: 'easeOut' as const },
    }),
  };

  const fallingNumberVariants: Variants = {
    hidden: { y: -1000, rotate: -5, opacity: 0 },
    visible: (custom: { delay: number; rotate: number }) => ({
      y: 0,
      rotate: custom.rotate,
      opacity: [0, 0.8, 0.8, 0.05],
      transition: {
        y:       { type: 'spring', stiffness: 60, damping: 18, mass: 2.5, delay: custom.delay, duration: 1.8 },
        rotate:  { delay: custom.delay, duration: 1.8 },
        opacity: { times: [0, 0.3, 0.6, 1], duration: 4, delay: custom.delay, ease: 'easeInOut' },
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 bg-[#FDFBF7] overflow-hidden min-h-[100vh] flex items-center"
    >
      {/* Background numbers */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <div className="relative w-full h-full max-w-[1600px] mx-auto">

          <motion.div className="absolute left-[1%] md:left-[13%] bottom-[-6%] md:bottom-[-3%]"
            variants={fallingNumberVariants} initial="hidden"
            animate={isInView ? 'visible' : 'hidden'} custom={{ delay: 0.1, rotate: -8 }}
          >
            <span className="font-bold text-[250px] md:text-[410px] leading-none text-[#C084FC] tracking-tighter drop-shadow-sm mix-blend-multiply"
              style={{ fontFamily: '"Luckiest Guy", cursive' }}>1</span>
          </motion.div>

          <motion.div className="absolute left-[41%] md:left-[43%] bottom-[-6%] md:bottom-[-3%]"
            variants={fallingNumberVariants} initial="hidden"
            animate={isInView ? 'visible' : 'hidden'} custom={{ delay: 0.4, rotate: 6 }}
          >
            <span className="font-bold text-[250px] md:text-[410px] leading-none text-[#FF3366] tracking-tighter mix-blend-multiply"
              style={{ fontFamily: '"Luckiest Guy", cursive' }}>3</span>
          </motion.div>

          <motion.div className="absolute left-[21%] md:left-[28%] bottom-[-3%] md:bottom-[1%] z-10"
            variants={fallingNumberVariants} initial="hidden"
            animate={isInView ? 'visible' : 'hidden'} custom={{ delay: 0.25, rotate: 0 }}
          >
            <span className="font-bold text-[260px] md:text-[430px] leading-none text-[#CCFF00] tracking-tighter mix-blend-multiply"
              style={{ fontFamily: '"Luckiest Guy", cursive' }}>2</span>
          </motion.div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-20">
        
        {/* Left */}
        <div className="flex flex-col justify-center min-h-[400px] pt-10 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 relative"
          >
            <div className="relative">
              <h2 className="text-6xl md:text-8xl font-black text-[#1E1B4B] heading-font leading-[0.9] mb-6 drop-shadow-sm">
                {lang === 'es' ? (
                  <>
                    {imp.heading2}<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#FF3366]">
                      {imp.heading1}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#FF3366]">
                      {imp.heading1}
                    </span><br/>
                    {imp.heading2}
                  </>
                )}
              </h2>
              <p className="text-lg md:text-xl text-[#1E1B4B] font-semibold leading-relaxed max-w-lg">
                {imp.body}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 mb-20 md:mb-0 relative">
             <button className="flex items-center gap-3 bg-[#1E1B4B] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#FF3366] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
               <span>{imp.btnReport}</span>
               <ArrowRight size={20} />
             </button>
             <span className="text-[#1E1B4B] font-bold underline cursor-pointer hover:text-[#FF3366] transition-colors bg-[#FDFBF7]/60 px-2 rounded">
               {imp.btnMethod}
             </span>
          </div>
        </div>

        {/* Right — Statistics */}
        <div className="flex flex-col justify-center gap-8 mt-32 lg:mt-0">
          {imp.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              variants={statsVariants}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="flex items-start gap-6 p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-[#FDFBF7] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                 <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FDFBF7] text-[#1E1B4B] group-hover:bg-[#CCFF00] transition-colors duration-300 shrink-0">
                    <Plus size={24} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-6xl md:text-8xl font-black text-[#1E1B4B] leading-[0.8] tracking-tighter mb-2"
                      style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {stat.number}
                    </span>
                    <span className="text-lg text-[#1E1B4B] font-medium leading-tight">
                      {stat.label}
                    </span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
