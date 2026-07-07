
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MenuOverlay } from './components/MenuOverlay';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { VideoSection } from './components/VideoSection';
import { InteractiveCarousel } from './components/InteractiveCarousel';
import { NetworkInfographic } from './components/NetworkInfographic'; 
import { Testimonials } from './components/Testimonials'; 
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { PlatformPage } from './components/PlatformPage';
import { MethodologyPage } from './components/MethodologyPage';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

type PageType = 'home' | 'platform' | 'methodology';

// Inner app — has access to language context
const AppInner: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading]   = useState(true);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#1E1B4B] selection:bg-[#CCFF00] selection:text-[#1E1B4B]">
      
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <Header 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        onNavigate={handleNavigate}
      />
      
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay 
            key="menu" 
            closeMenu={() => setIsMenuOpen(false)} 
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>

      <main>
        {currentPage === 'home' && (
          <>
            <Hero isLoading={isLoading} />
            <Marquee text={t.marquee} />
            <VideoSection />
            <InteractiveCarousel />
            <NetworkInfographic />
            <Testimonials />
          </>
        )}
        
        {currentPage === 'platform' && (
          <PlatformPage key="platform" />
        )}

        {currentPage === 'methodology' && (
          <MethodologyPage key="methodology" />
        )}
        
        <Footer />
      </main>
    </div>
  );
};

// Outer wrapper with provider
import { Analytics } from '@vercel/analytics/react';

const App: React.FC = () => (
  <LanguageProvider>
    <AppInner />
    <Analytics />
  </LanguageProvider>
);

export default App;
