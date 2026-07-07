
import React from 'react';
import { Menu, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onNavigate: (page: 'home' | 'platform' | 'methodology') => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, onNavigate }) => {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-[1920px] mx-auto px-6 py-4 md:px-12 md:py-6 flex justify-between items-center text-[#1E1B4B]">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-4 relative z-50 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="relative w-14 h-14 md:w-20 md:h-20 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] fill-current drop-shadow-sm">
               <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95 C80 95 95 75 95 50 C95 25 80 5 50 5 Z" fill="#1E1B4B" opacity="0.05" />
               <circle cx="70" cy="25" r="8" className="text-[#1E1B4B]" fill="currentColor" />
               <circle cx="30" cy="75" r="8" className="text-[#1E1B4B]" fill="currentColor" />
               <path 
                  d="M70 25 C 20 25 80 75 30 75" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeLinecap="round"
               />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-2xl md:text-4xl tracking-tight heading-font">Synapsis</span>
            <span className="block text-xs md:text-sm font-bold uppercase tracking-widest leading-none">Academy</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-10 font-semibold text-lg md:text-xl tracking-tight text-[#1E1B4B]">
          
          <button 
            onClick={() => onNavigate('platform')}
            className="hover:text-[#FF3366] transition-colors relative group bg-transparent border-none cursor-pointer"
          >
            {t.nav.platform}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CCFF00] transition-all group-hover:w-full"></span>
          </button>

          <button 
            onClick={() => onNavigate('methodology')}
            className="hover:text-[#FF3366] transition-colors relative group bg-transparent border-none cursor-pointer"
          >
            {t.nav.methodology}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CCFF00] transition-all group-hover:w-full"></span>
          </button>

          {[t.nav.schools, t.nav.pricing, t.nav.contact].map((item) => (
            <a key={item} href="#" className="hover:text-[#FF3366] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CCFF00] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        {/* Right actions */}
        <div className="flex items-center gap-3 md:gap-4 relative z-50">

          {/* ── Language Toggle ── */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center rounded-full border border-[#1E1B4B]/20 overflow-hidden text-sm font-bold tracking-wider shadow-sm hover:shadow-md transition-shadow"
          >
            <span className={`px-3 py-2 transition-all duration-200 ${lang === 'en' ? 'bg-[#1E1B4B] text-[#CCFF00]' : 'text-[#1E1B4B]/40 hover:text-[#1E1B4B]'}`}>
              EN
            </span>
            <span className={`px-3 py-2 transition-all duration-200 ${lang === 'es' ? 'bg-[#1E1B4B] text-[#CCFF00]' : 'text-[#1E1B4B]/40 hover:text-[#1E1B4B]'}`}>
              ES
            </span>
          </button>

          <button className="hidden md:flex items-center gap-3 px-8 py-4 rounded-full bg-[#FDFBF7] border border-[#E5E7EB] hover:border-[#1E1B4B] transition-colors text-lg font-bold shadow-sm">
            <MapPin size={24} className="text-[#1E1B4B]" />
            <span>{t.nav.campus}</span>
          </button>
          
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-3 px-10 py-4 rounded-full bg-[#1E1B4B] text-white hover:bg-[#CCFF00] hover:text-[#1E1B4B] transition-all duration-300 text-lg font-bold"
          >
            <span>{isMenuOpen ? t.nav.close : t.nav.menu}</span>
            {!isMenuOpen && <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
