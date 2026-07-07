import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const loaderVariants: Variants = {
  initial: { opacity: 1 },
  exit: { opacity: 1 } // Keeps container mounted while inner SVG animates
};

const circleVariants: Variants = {
  initial: { r: 0 },
  exit: (customRadius) => ({
    r: customRadius,
    transition: { 
      duration: 1.5, 
      ease: [0.76, 0, 0.24, 1] // Smooth "easeOutQuart" style curve
    }
  })
};

export const Loader: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate necessary radius to clear the screen from the center
  // Use a fallback of 4000px if dimensions aren't ready to ensure coverage
  const radius = dimensions.width > 0 
    ? Math.sqrt(Math.pow(dimensions.width, 2) + Math.pow(dimensions.height, 2)) 
    : 4000;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent pointer-events-none"
      variants={loaderVariants}
      initial="initial"
      exit="exit"
    >
      <svg className="w-full h-full absolute inset-0 pointer-events-auto">
        <defs>
          <mask id="hole-mask">
            {/* White pixels are visible (the dark overlay), Black pixels are transparent (the hole) */}
            <rect width="100%" height="100%" fill="white" />
            <motion.circle
              cx="50%"
              cy="50%"
              variants={circleVariants}
              custom={radius}
              fill="black"
            />
          </mask>
        </defs>
        {/* The solid dark overlay */}
        <rect width="100%" height="100%" fill="#52524B" mask="url(#hole-mask)" />
      </svg>
    </motion.div>
  );
};
