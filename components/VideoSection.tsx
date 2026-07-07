
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const VideoSection: React.FC = () => {
  const { t } = useLanguage();
  const v = t.video;

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FDFBF7] flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Video Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-[#1E1B4B]/5 hover:shadow-2xl hover:shadow-[#1E1B4B]/10 transform transition-all duration-500 hover:-translate-y-2">
          <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] md:aspect-video group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
              alt={v.cardLabel}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#1E1B4B]/0 group-hover:bg-[#1E1B4B]/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1E1B4B]">
                    <Play size={32} fill="currentColor" className="ml-1" />
                </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-6 px-2 pb-2">
            <span className="text-xl md:text-2xl font-bold text-[#1E1B4B] tracking-tight heading-font">
              {v.cardLabel}
            </span>
            
            <a 
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#1E1B4B] text-white pl-3 pr-8 py-3 rounded-full hover:bg-[#CCFF00] hover:text-[#1E1B4B] transition-all duration-300 shadow-lg"
            >
              <div className="w-10 h-10 bg-white text-[#1E1B4B] rounded-full flex items-center justify-center group-hover:bg-[#1E1B4B] group-hover:text-[#CCFF00] transition-colors">
                <Play size={16} fill="currentColor" className="ml-0.5" />
              </div>
              <span className="font-bold text-sm uppercase tracking-widest">{v.watchDemo}</span>
            </a>
          </div>
        </div>

        {/* Right: Text */}
        <div className="flex flex-col gap-8 lg:pl-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1B4B] leading-[1.05] heading-font">
            {v.heading}
          </h2>
          
          <p className="text-lg md:text-xl text-[#1E1B4B] leading-relaxed font-light">
            {v.body}
          </p>
          
          <div className="pt-4">
            <a href="#metodologia" className="inline-flex items-center gap-3 text-[#1E1B4B] font-bold text-lg hover:text-[#FF3366] transition-colors group">
              <span className="border-b-2 border-[#1E1B4B] group-hover:border-[#FF3366] transition-colors">{v.methodLink}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
