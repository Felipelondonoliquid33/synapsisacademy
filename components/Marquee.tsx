
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MarqueeProps {
  text: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <div className="w-full py-16 bg-[#CCFF00] text-[#1E1B4B] overflow-hidden flex items-center">
      <div className="relative w-full flex overflow-x-hidden border-y border-[#1E1B4B]/10">
        <motion.div
          className="flex whitespace-nowrap py-6"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          <span className="text-4xl md:text-7xl font-bold uppercase tracking-tight mx-4 heading-font text-[#1E1B4B]">
            {text.repeat(10)}
          </span>
        </motion.div>
      </div>
    </div>
  );
};
