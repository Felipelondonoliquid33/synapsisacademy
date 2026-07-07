
export type Lang = 'en' | 'es';

export const translations = {
  en: {
    // ── HEADER ────────────────────────────────────────────
    nav: {
      platform:   'The Platform',
      methodology:'Methodology',
      schools:    'For Schools',
      pricing:    'Pricing',
      contact:    'Contact',
      campus:     'Campus',
      menu:       'Menu',
      close:      'Close',
    },

    // ── HERO ─────────────────────────────────────────────
    hero: {
      line1:    'Education',
      line2pre: 'with',
      line2post:'Advanced',
      subtitle: 'The future is now',
      body:     'Discover our adaptive platform for primary and secondary levels. Virtual tutors, progress analytics, and content that sparks creativity.',
      cta:      'Try the Demo',
      // Physics shape labels (short & aesthetic)
      shape1:   'Primary',
      shape2:   'Creative',
      shape3:   'Secondary',
    },

    // ── MARQUEE ──────────────────────────────────────────
    marquee: 'ARTIFICIAL INTELLIGENCE • ADAPTIVE LEARNING • FUTURE • ',

    // ── MENU OVERLAY ─────────────────────────────────────
    menu: {
      navItems: [
        'The Platform',
        'Methodology',
        'For Schools',
        'Careers',
        'Contact',
      ],
      secondaryLinks: [
        'Methodology',
        'Visit Us',
        'Admissions',
        'Franchises',
        'Parent Portal',
      ],
      campusLabel:   'OUR VIRTUAL CAMPUS',
      studentAccess: 'Student Access',
    },

    // ── VIDEO SECTION ─────────────────────────────────────
    video: {
      cardLabel:  'Interactive Classes',
      watchDemo:  'Watch Demo',
      heading:    'Technology that adapts to every student\'s pace',
      body:       'Our artificial intelligence analyzes progress in real time to personalize educational content. We transform the traditional classroom into a dynamic space where each student reaches their full potential through unique learning paths.',
      methodLink: 'Discover our methodology',
    },

    // ── INTERACTIVE CAROUSEL ─────────────────────────────
    carousel: {
      tag:      'Synapsis Experience',
      heading1: 'Spaces that',
      heading2: 'inspire.',
      drag:     'Drag to explore',
      viewMore: 'View details +',
      slides: [
        'Discovery',
        'Community',
        'Creativity',
        'Exploration',
        'Technology',
        'Art',
      ],
    },

    // ── NETWORK / IMPACT ─────────────────────────────────
    impact: {
      heading1:  'REAL',
      heading2:  'IMPACT',
      body:      'Proven results across more than 50 institutions. Our AI doesn\'t just teach — it evolves with each student to maximize their potential.',
      btnReport: 'View Report',
      btnMethod: 'Methodology',
      stats: [
        { number: '94%',  label: 'Improvement in academic performance' },
        { number: '12k+', label: 'Active students on the platform' },
        { number: '3x',   label: 'Learning speed vs traditional methods' },
      ],
    },

    // ── TESTIMONIALS ─────────────────────────────────────
    testimonials: {
      heading: 'OUR IMPACT',
      viewDetails: 'View details +',
      items: [
        {
          name:    'Ana María',
          role:    'HEAD TEACHER',
          content: 'Teaching at Synapsis Academy means giving students a real advantage for the future. Our methodology unlocks natural curiosity and enables barrier-free learning.',
        },
        {
          name:    'Isabelle',
          role:    'PARENT',
          content: 'Synapsis is the school we chose for our children — first for language learning, and also for the incredible family the teaching staff represents.',
        },
        {
          name:    'Carlos R.',
          role:    'PARENT',
          content: 'The personalization of learning has been key. My children don\'t just learn concepts — they develop critical thinking I haven\'t seen in other systems.',
        },
        {
          name:    'Sofia L.',
          role:    'ALUMNA',
          content: 'The critical-thinking skills I developed here have served me more than any textbook throughout my university career.',
        },
      ],
    },

    // ── FOOTER ───────────────────────────────────────────
    footer: {
      navLinks: [
        { label: 'Product',       href: '#features'    },
        { label: 'Methodology',   href: '#methodology' },
        { label: 'Success Cases', href: '#cases'       },
        { label: 'Community',     href: '#community'   },
        { label: 'Pricing',       href: '#pricing'     },
      ],
      secondaryLinks: [
        'Teacher Portal',
        'Student Portal',
        'API Documentation',
        'Help Center',
        'System Status',
      ],
      startLabel: 'Get started',
      ctaBtn:     'Schedule Synapsis Demo',
      privacy:    'Privacy Policy',
      terms:      'Terms of Service',
      copyright:  '© 2026 Synapsis AI Academy. All rights reserved.',
      devCredit:  'Developed by Felipe Londoño',
    },

    // ── PLATFORM PAGE ────────────────────────────────────
    platform: {
      hero: {
        paragraph: 'We empower schools and teachers with artificial intelligence tools that personalize each student\'s journey.',
        heading1: 'Digital',
        heading2: 'Educational',
        heading3: 'Revolution',
        classroomAlt: 'Classroom',
      },
      adaptive: {
        part1: 'ADAPT',
        part2: 'VE',
        subline: 'LEARNING',
        title: 'Synapsis stands out as the only platform integrating AI tutoring, predictive analytics, and gamification into a fluid ecosystem.',
        desc1: 'Our common goal: offering primary and secondary students a personalized path from day one, for fluid and natural learning.',
        desc2: 'At the end of each cycle, our students exceed national standards, demonstrating not only academic knowledge but critical skills for the future.',
        card1Title: 'Long-lasting Results',
        card1Desc: 'A majority of subjects adapted in real time, offering a natural immersion.',
        card2Title: '+500 Hours of Practice',
        card2Desc: '3 to 4 times more interactive practice than in traditional systems thanks to gamification.',
        card3Title: 'AI as Personal Tutor',
        card3Desc: 'Oral and written expression is privileged with instant feedback 24 hours a day.',
      },
      approach: {
        heading1: 'Our',
        heading2: 'Approach',
        imageLabel: 'Trilingual in Primary',
        viewVideo: 'Watch Video',
        title: 'Synapsis adopts a unique technological approach in Latin America.',
        desc: 'Beyond academic learning, our tools promote balanced development, combining intellectual growth with vital digital skills, all in a safe and adaptive environment.',
        docTitle: 'Documentation',
        docs: [
          'Digital Immersion Methodology ↗',
          'Benefits of Adaptive Learning ↗',
          'Why choose Synapsis? ↗',
        ],
      },
      benefits: {
        heading1: 'Proven',
        heading2: 'Benefits',
        desc1: 'The benefits of learning with Synapsis go beyond grades. We build a growth mindset.',
        desc2: 'When a student interacts with our AI, they are constantly constructing, comparing, and making connections, developing deep and nuanced competencies.',
        items: [
          'Improvement in reading skills',
          'Deep understanding of concepts',
          'Boosted intellectual development',
          'Increased technological sensitivity',
          'Ability to solve real-world problems',
          'Self-learning capacity',
        ],
      },
    },

    // ── METHODOLOGY PAGE ─────────────────────────────────
    methodology: {
      hero: {
        paragraph: 'A pedagogical framework designed to spark curiosity and foster critical thinking.',
        heading1: 'Our',
        heading2: 'Unique',
        heading3: 'Methodology',
        learningAlt: 'Students Learning',
      },
      philosophy: {
        heading1: 'Our',
        heading2: 'Philosophy',
        subtitle: 'Not all children progress at the same pace. That is why we adapt our approaches to meet individual needs.',
        imageLabel: 'Pedagogical approach',
        viewBtn: 'Watch',
        title: 'A personalized approach',
        desc1: 'We offer a supportive framework that fosters autonomy, self-confidence, and the joy of learning. Our pedagogy respects the learning pace of each student.',
        desc2: 'The integration of smart technologies and the thoughtful organization of classes allow for personalized and enriched teaching, totaling 30 hours per week, which is 20% more hours per year than other schools.',
        docTitle: 'DOCUMENTATION',
        docs: [
          'The pedagogical approach in primary school',
          'Why choose Synapsis Academy?',
          '3-language immersion',
        ],
      },
      habits: {
        heading1: 'HEALTHY',
        heading2Part1: 'STUD',
        heading2Part2: 'ES',
        heading3: 'HABITS',
        intro: 'We foster a smart relationship with technology. We teach how to disconnect to reconnect, prioritizing concentration and mental well-being over screen time.',
        bubble1Title: 'Active Creativity',
        bubble1Desc: 'We transform passive consumption into creation. Less scrolling, more building of ideas and real projects.',
        bubble2Title: 'Deep Focus',
        bubble2Desc: 'Distraction-free design. Tools that protect the student\'s attention for meaningful learning.',
        bubble3Title: 'Mental Balance',
        bubble3Desc: 'Our AI identifies cognitive fatigue and suggests movement breaks to recharge energy.',
        cardTitle: 'Healthy lifestyle habits',
        watchVideo: 'Watch Video',
        desc: 'Success is not just academic. We prepare students to manage their own energy, integrating movement and nature as an essential part of their study routine.',
      },
    },
  },

  // ────────────────────────────────────────────────────────
  es: {
    // ── HEADER ────────────────────────────────────────────
    nav: {
      platform:   'La Plataforma',
      methodology:'Metodología',
      schools:    'Para Colegios',
      pricing:    'Precios',
      contact:    'Contactar',
      campus:     'Campus',
      menu:       'Menú',
      close:      'Cerrar',
    },

    // ── HERO ─────────────────────────────────────────────
    hero: {
      line1:    'Educación',
      line2pre: 'con',
      line2post:'Avanzada',
      subtitle: 'El futuro es ahora',
      body:     'Descubre nuestra plataforma adaptativa para niveles primarios y secundarios. Tutores virtuales, analítica de progreso y contenidos que inspiran creatividad.',
      cta:      'Prueba la Demo',
      shape1:   'Primaria',
      shape2:   'Creatividad',
      shape3:   'Secundaria',
    },

    // ── MARQUEE ──────────────────────────────────────────
    marquee: 'INTELIGENCIA ARTIFICIAL • APRENDIZAJE ADAPTATIVO • FUTURO • ',

    // ── MENU OVERLAY ─────────────────────────────────────
    menu: {
      navItems: [
        'La Plataforma',
        'Metodología',
        'Para Colegios',
        'Carreras',
        'Contacto',
      ],
      secondaryLinks: [
        'Metodología',
        'Visítenos',
        'Admisiones',
        'Franquicias',
        'Portal de Padres',
      ],
      campusLabel:   'NUESTRO CAMPUS VIRTUAL',
      studentAccess: 'Acceso Estudiantes',
    },

    // ── VIDEO SECTION ─────────────────────────────────────
    video: {
      cardLabel:  'Clases Interactivas',
      watchDemo:  'Ver Demo',
      heading:    'Tecnología que se adapta al ritmo de cada estudiante',
      body:       'Nuestra inteligencia artificial analiza el progreso en tiempo real para personalizar el contenido educativo. Transformamos el aula tradicional en un espacio dinámico donde cada alumno alcanza su máximo potencial a través de rutas de aprendizaje únicas.',
      methodLink: 'Conoce nuestra metodología',
    },

    // ── INTERACTIVE CAROUSEL ─────────────────────────────
    carousel: {
      tag:      'Experiencia Synapsis',
      heading1: 'Espacios que',
      heading2: 'inspiran.',
      drag:     'Arrastra para explorar',
      viewMore: 'Ver detalles +',
      slides: [
        'Descubrimiento',
        'Comunidad',
        'Creatividad',
        'Exploración',
        'Tecnología',
        'Arte',
      ],
    },

    // ── NETWORK / IMPACT ─────────────────────────────────
    impact: {
      heading1:  'REAL',
      heading2:  'IMPACTO',
      body:      'Resultados comprobados en más de 50 instituciones. Nuestra IA no solo enseña, sino que evoluciona con cada estudiante para maximizar su potencial.',
      btnReport: 'Ver Reporte',
      btnMethod: 'Metodología',
      stats: [
        { number: '94%',  label: 'Mejora en rendimiento académico' },
        { number: '12k+', label: 'Estudiantes activos en la plataforma' },
        { number: '3x',   label: 'Velocidad de aprendizaje vs tradicional' },
      ],
    },

    // ── TESTIMONIALS ─────────────────────────────────────
    testimonials: {
      heading: 'NUESTRO IMPACTO',
      viewDetails: 'Ver detalles +',
      items: [
        {
          name:    'Ana María',
          role:    'DOCENTE TITULAR',
          content: 'Enseñar en Synapsis Academy es dar a los estudiantes una ventaja real para el futuro. Nuestra metodología desbloquea la curiosidad natural y permite un aprendizaje sin barreras.',
        },
        {
          name:    'Isabelle',
          role:    'MADRE DE FAMILIA',
          content: 'Synapsis es la escuela que elegimos para nuestros hijos. Primero por el aprendizaje de idiomas, pero también por la gran familia que representa el personal docente.',
        },
        {
          name:    'Carlos R.',
          role:    'PADRE',
          content: 'La personalización del aprendizaje ha sido clave. Mis hijos no solo aprenden conceptos, sino que desarrollan un pensamiento crítico que no he visto en otros sistemas.',
        },
        {
          name:    'Sofia L.',
          role:    'EX-ALUMNA',
          content: 'Las habilidades de pensamiento crítico que desarrollé aquí me han servido más que cualquier libro de texto en mi carrera universitaria.',
        },
      ],
    },

    // ── FOOTER ───────────────────────────────────────────
    footer: {
      navLinks: [
        { label: 'Producto',        href: '#features'    },
        { label: 'Metodología',     href: '#methodology' },
        { label: 'Casos de Éxito',  href: '#cases'       },
        { label: 'Comunidad',       href: '#community'   },
        { label: 'Precios',         href: '#pricing'     },
      ],
      secondaryLinks: [
        'Portal Docente',
        'Portal Estudiante',
        'Documentación API',
        'Centro de Ayuda',
        'Estado del Sistema',
      ],
      startLabel: 'Empieza ahora',
      ctaBtn:     'Agendar Synapsis Demo',
      privacy:    'Política de Privacidad',
      terms:      'Términos de Servicio',
      copyright:  '© 2026 Synapsis AI Academy. Todos los derechos reservados.',
      devCredit:  'Desarrollado por Felipe Londoño',
    },

    // ── PLATFORM PAGE ────────────────────────────────────
    platform: {
      hero: {
        paragraph: 'Potenciamos a escuelas y docentes con herramientas de inteligencia artificial que personalizan el viaje de cada estudiante.',
        heading1: 'Revolución',
        heading2: 'Educativa',
        heading3: 'Digital',
        classroomAlt: 'Aula de clases',
      },
      adaptive: {
        part1: 'APREND',
        part2: 'ZAJE',
        subline: 'ADAPTATIVO',
        title: 'Synapsis se destaca como la única plataforma que integra tutoría IA, análisis predictivo y gamificación en un ecosistema fluido.',
        desc1: 'Nuestro objetivo común: ofrecer a estudiantes de primaria y secundaria un camino personalizado desde el primer día, para un aprendizaje fluido y natural.',
        desc2: 'Al finalizar cada ciclo, nuestros alumnos superan los estándares nacionales, demostrando no solo conocimiento académico sino habilidades críticas para el futuro.',
        card1Title: 'Resultados Duraderos',
        card1Desc: 'Una mayoría de materias adaptadas en tiempo real, ofreciendo una inmersión natural.',
        card2Title: '+500 Horas de Práctica',
        card2Desc: '3 a 4 veces más práctica interactiva que en sistemas tradicionales gracias a la gamificación.',
        card3Title: 'IA como Tutor Personal',
        card3Desc: 'La expresión oral y escrita es privilegiada con feedback instantáneo las 24 horas.',
      },
      approach: {
        heading1: 'Nuestra',
        heading2: 'Aproximación',
        imageLabel: 'Trilingüe en Primaria',
        viewVideo: 'Ver Video',
        title: 'Synapsis adopta un enfoque tecnológico único en Latinoamérica.',
        desc: 'Más allá del aprendizaje académico, nuestras herramientas promueven un desarrollo equilibrado, uniendo el crecimiento intelectual con habilidades digitales vitales, todo en un ambiente seguro y adaptativo.',
        docTitle: 'Documentación',
        docs: [
          'Metodología de Inmersión Digital ↗',
          'Beneficios del Aprendizaje Adaptativo ↗',
          '¿Por qué elegir Synapsis? ↗',
        ],
      },
      benefits: {
        heading1: 'Beneficios',
        heading2: 'Comprobados',
        desc1: 'Los beneficios de aprender con Synapsis van más allá de las calificaciones. Construimos una mentalidad de crecimiento.',
        desc2: 'Cuando un estudiante interactúa con nuestra IA, está constantemente construyendo, comparando y estableciendo conexiones, desarrollando competencias profundas y matizadas.',
        items: [
          'Mejora en habilidades de lectura',
          'Comprensión profunda de conceptos',
          'Desarrollo intelectual bonificado',
          'Sensibilidad tecnológica incrementada',
          'Aptitud para resolver problemas reales',
          'Capacidad de auto-aprendizaje',
        ],
      },
    },

    // ── METHODOLOGY PAGE ─────────────────────────────────
    methodology: {
      hero: {
        paragraph: 'Un marco pedagógico diseñado para despertar la curiosidad y fomentar el pensamiento crítico.',
        heading1: 'Nuestra',
        heading2: 'Metodología',
        heading3: 'Única',
        learningAlt: 'Estudiantes Aprendiendo',
      },
      philosophy: {
        heading1: 'Nuestra',
        heading2: 'Filosofía',
        subtitle: 'Todos los niños no progresan al mismo ritmo. Por eso adaptamos nuestros enfoques para responder a las necesidades individuales.',
        imageLabel: 'Enfoque pedagógico',
        viewBtn: 'Ver',
        title: 'Un enfoque personalizado',
        desc1: 'Ofrecemos un marco benevolente que favorece la autonomía, la confianza en uno mismo y el placer de aprender. Nuestra pedagogía respeta el ritmo de aprendizaje de cada alumno.',
        desc2: 'La integración de tecnologías inteligentes y la organización juiciosa de las clases permiten una enseñanza personalizada y enriquecida, totalizando 30 horas por semana, es decir, un 20% más de horas por año que otras escuelas.',
        docTitle: 'DOCUMENTACIÓN',
        docs: [
          'El enfoque pedagógico en primaria',
          '¿Por qué elegir Synapsis Academy?',
          'Inmersión en 3 idiomas',
        ],
      },
      habits: {
        heading1: 'HÁBITOS DE',
        heading2Part1: 'ESTUD',
        heading2Part2: 'O',
        heading3: 'SANOS',
        intro: 'Fomentamos una relación inteligente con la tecnología. Enseñamos a desconectar para reconectar, priorizando la concentración y el bienestar mental sobre el tiempo en pantalla.',
        bubble1Title: 'Creatividad Activa',
        bubble1Desc: 'Transformamos el consumo pasivo en creación. Menos scroll, más construcción de ideas y proyectos reales.',
        bubble2Title: 'Enfoque Profundo',
        bubble2Desc: 'Diseño libre de distracciones. Herramientas que protegen la atención del estudiante para un aprendizaje significativo.',
        bubble3Title: 'Equilibrio Mental',
        bubble3Desc: 'Nuestra IA identifica la fatiga cognitiva y sugiere pausas de movimiento para recargar energía.',
        cardTitle: 'Hábitos de vida saludables',
        watchVideo: 'Ver Video',
        desc: 'El éxito no es solo académico. Preparamos a los estudiantes para gestionar su propia energía, integrando el movimiento y la naturaleza como parte esencial de su rutina de estudio.',
      },
    },
  },
} as const;

export type Translations = typeof translations.en;
