import React from 'react';
import { Project } from '../types';

// Reusing Project interface for Features to keep types.ts unchanged as requested by implicit instruction to minimize changes
// id -> id, title -> Feature Name, category -> Description tag, year -> Status/Tag
const projects: Project[] = [
  { id: 1, title: 'TUTOR IA', category: 'Personalización', year: 'Beta', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'ANALÍTICA', category: 'Progreso Real', year: 'Live', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'GAMIFICACIÓN', category: 'Engagement', year: 'New', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'STEM + ARTE', category: 'Curriculum', year: 'Core', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
];

export const ProjectGallery: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-[#F4F1EB]">
      <div className="flex justify-between items-end mb-20 border-b border-[#D9D9D7] pb-6">
        <h2 className="text-4xl md:text-6xl font-bold uppercase heading-font text-[#52524B]">Características</h2>
        <span className="hidden md:block text-[#F69449] font-mono font-bold">(04)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
          >
            <div className="relative overflow-hidden rounded-2xl mb-8 aspect-[4/3] bg-[#D4E9F5]">
              <div className="absolute inset-0 bg-[#D4F747]/0 group-hover:bg-[#D4F747]/20 transition-all z-10 duration-500 mix-blend-multiply" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="text-4xl font-bold mb-2 heading-font text-[#52524B] group-hover:text-[#F69449] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#52524B] text-sm uppercase tracking-widest font-mono">{project.category}</p>
              </div>
              <span className="text-[#52524B] font-mono text-sm border px-3 py-1 rounded-full border-[#D9D9D7]">{project.year}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-32 text-center">
        <button className="px-10 py-5 bg-[#D4F747] text-[#52524B] rounded-full hover:bg-[#52524B] hover:text-[#D4F747] transition-all duration-300 text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#D4F747]/30">
          Ver todos los módulos
        </button>
      </div>
    </section>
  );
};