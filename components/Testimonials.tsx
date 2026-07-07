
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const TESTIMONIAL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Students smiling in class" },
  { src: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Student focused on sports" },
  { src: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Students collaborating on project" },
];

const DECORS: Array<'top-left' | 'bottom-right' | 'top-left' | 'bottom-right'> = [
  'top-left', 'bottom-right', 'top-left', 'bottom-right'
];

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const tst = t.testimonials;

  // Interleave text and image items
  const items: Array<{ type: 'text'; item: typeof tst.items[0]; decor: 'top-left' | 'bottom-right' } | { type: 'image'; src: string; alt: string }> = [
    { type: 'text',  item: tst.items[0], decor: DECORS[0] },
    { type: 'image', src: TESTIMONIAL_IMAGES[0].src, alt: TESTIMONIAL_IMAGES[0].alt },
    { type: 'text',  item: tst.items[1], decor: DECORS[1] },
    { type: 'image', src: TESTIMONIAL_IMAGES[1].src, alt: TESTIMONIAL_IMAGES[1].alt },
    { type: 'text',  item: tst.items[2], decor: DECORS[2] },
    { type: 'image', src: TESTIMONIAL_IMAGES[2].src, alt: TESTIMONIAL_IMAGES[2].alt },
    { type: 'text',  item: tst.items[3], decor: DECORS[3] },
  ];

  return (
    <section className="pt-24 md:pt-32 pb-40 bg-white overflow-hidden relative border-t border-[#FDFBF7] rounded-b-[3rem] md:rounded-b-[5rem] shadow-2xl z-20 mx-2 md:mx-4">
        
        <div className="relative z-20 max-w-[1800px] mx-auto px-6 md:px-12 text-center pointer-events-none">
             <h2 className="text-[15vw] md:text-[13vw] font-[800] text-[#1E1B4B] leading-[0.8] tracking-tighter uppercase mb-12 select-none mix-blend-hard-light relative">
               {tst.heading}
             </h2>
        </div>

        <div ref={containerRef} className="w-full relative pl-6 md:pl-[10vw] z-10 -mt-10 md:-mt-20">
            <motion.div
               className="flex gap-6 md:gap-12 w-max pr-[10vw] py-12 items-center cursor-grab active:cursor-grabbing"
               drag="x"
               dragConstraints={{ right: 0, left: -2600 }}
               whileTap={{ cursor: 'grabbing' }}
            >
               {items.map((item, index) => (
                  <Card key={index} item={item} index={index} viewDetails={tst.viewDetails} />
               ))}
            </motion.div>
        </div>
    </section>
  );
};

type CardItem =
  | { type: 'text';  item: { name: string; role: string; content: string }; decor: 'top-left' | 'bottom-right' }
  | { type: 'image'; src: string; alt: string };

const Card: React.FC<{ item: CardItem; index: number; viewDetails: string }> = ({ item, index, viewDetails }) => {
    const randomDuration = 4 + Math.random() * 3;
    const rotateDir = index % 2 === 0 ? 1 : -1;

    const motionProps = {
        animate: { rotate: [0, rotateDir * 1.5, 0, -rotateDir * 1.5, 0], y: [0, -4, 0, 4, 0] },
        transition: { duration: randomDuration, repeat: Infinity, ease: 'easeInOut' as const },
        whileHover: { scale: 1.03, rotate: rotateDir * -2, transition: { type: 'spring' as const, stiffness: 400, damping: 15 } },
        whileTap:   { scale: 0.96, rotate: 0,            transition: { type: 'spring' as const, stiffness: 400, damping: 15 } },
    };

    if (item.type === 'image') {
        return (
            <motion.div {...motionProps}
               className="relative flex-shrink-0 w-[240px] md:w-[320px] h-[240px] md:h-[320px] rounded-[2rem] overflow-hidden group shadow-xl shadow-[#1E1B4B]/10"
            >
                <div className="absolute inset-0 bg-[#1E1B4B]/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </motion.div>
        );
    }

    return (
        <motion.div {...motionProps}
           className="relative flex-shrink-0 w-[300px] md:w-[550px] min-h-[300px] md:h-[360px] bg-[#FDFBF7] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between shadow-lg overflow-hidden group border border-[#1E1B4B]/5"
        >
             {item.decor === 'top-left' && (
                 <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-4 -left-4 w-32 h-32 bg-[#C084FC] rounded-full mix-blend-multiply opacity-60"
                    style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                 />
             )}
             {item.decor === 'bottom-right' && (
                 <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-8 -right-8 w-48 h-40 bg-[#CCFF00] rounded-full mix-blend-multiply opacity-80"
                    style={{ borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%' }}
                 />
             )}
             <div className="relative z-10">
                 <p className="text-[#1E1B4B] text-lg md:text-2xl font-medium leading-relaxed group-hover:text-black transition-colors">
                   "{item.item.content}"
                 </p>
             </div>
             <div className="relative z-10 mt-6 flex items-end justify-between">
                 <div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#1E1B4B] heading-font uppercase tracking-tight">
                    {item.item.name}
                    </h4>
                    <span className="text-xs font-bold text-[#1E1B4B] uppercase tracking-[0.2em] mt-1 block opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.item.role}
                    </span>
                 </div>
                 <div className="w-10 h-1 bg-[#1E1B4B]/10 group-hover:bg-[#1E1B4B] transition-colors rounded-full mb-2"></div>
             </div>
        </motion.div>
    );
};
