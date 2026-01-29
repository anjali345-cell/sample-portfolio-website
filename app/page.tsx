"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, Sun, Moon, Monitor } from 'lucide-react';

// Aceternity UI - Spotlight Effect
const Spotlight = ({ className = "", fill = "white" }) => {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};

// Aceternity UI - Moving Border Button
const MovingBorder = ({ children, duration = 2000, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-[1px] overflow-hidden rounded-full ${className}`}
      style={{
        background: 'linear-gradient(90deg, #e11d48, #be123c, #e11d48)',
        backgroundSize: '200% 100%',
        animation: `gradient ${duration}ms linear infinite`,
      }}
    >
      <span className="relative z-10 flex items-center justify-center w-full h-full bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-full px-8 py-4">
        {children}
      </span>
    </button>
  );
};

// Aceternity UI - Parallax Stars Background
const StarsBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      velocity: Math.random() * 0.5,
    }));
    
    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme === 'dark' ? 'rgba(244, 114, 182, 0.6)' : 'rgba(251, 113, 133, 0.4)';
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        star.y -= star.velocity;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);
  
  return <canvas ref={canvasRef} className="fixed inset-0 -z-5 pointer-events-none" />;
};

// Aceternity UI - 3D Card Effect
const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Aceternity UI - Text Reveal Animation
const TextReveal = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const styles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
  .animation-delay-3000 { animation-delay: 3s; }
  .animation-delay-4000 { animation-delay: 4s; }
  @keyframes spotlight {
    0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
    100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
  }
  .animate-spotlight { animation: spotlight 2s ease 0.75s 1 forwards; }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [actualTheme, setActualTheme] = useState('light');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    if (theme === 'device') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setActualTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e) => setActualTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setActualTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

  const skills = [
    { name: 'HTML5', category: 'Frontend' },
    { name: 'CSS3', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Backend' },
    { name: 'Git', category: 'Tools' },
    { name: 'Responsive Design', category: 'Frontend' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'Framer Motion', category: 'Frontend' }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce web application with shopping cart, payment integration, and admin dashboard.',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, drag-and-drop functionality, and team features.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      tech: ['React', 'Tailwind CSS', 'Weather API'],
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      title: 'Portfolio Generator',
      description: 'Dynamic portfolio website generator allowing users to create and customize their professional portfolios.',
      tech: ['Next.js', 'React', 'Tailwind CSS'],
      github: 'https://github.com',
      live: 'https://example.com'
    }
  ];

  const experience = [
    {
      role: 'Frontend Developer Intern',
      company: 'Tech Startup Inc.',
      duration: 'Jun 2024 - Present',
      description: 'Developing responsive web applications using React and Next.js. Collaborated with design team to implement pixel-perfect UI components and improved page load times by 40%.'
    },
    {
      role: 'Web Development Intern',
      company: 'Digital Agency',
      duration: 'Jan 2024 - May 2024',
      description: 'Built client websites using modern web technologies. Worked on accessibility improvements and implemented SEO best practices across multiple projects.'
    },
    {
      role: 'MERN Stack Project',
      company: 'University Capstone',
      duration: 'Aug 2023 - Dec 2023',
      description: 'Led a team of 4 to develop a full-stack social media platform. Designed the frontend architecture and implemented real-time features using WebSockets.'
    }
  ];

  const FadeInSection = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${actualTheme === 'dark' ? 'dark' : ''}`}>
        <StarsBackground theme={actualTheme} />
        
        <div className="fixed inset-0 -z-10">
          <div className={`absolute inset-0 transition-colors duration-300 ${
            actualTheme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-rose-50 via-white to-amber-50'
          }`}></div>
          <div className={`absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob ${
            actualTheme === 'dark' ? 'bg-rose-900' : 'bg-rose-300'
          }`}></div>
          <div className={`absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 ${
            actualTheme === 'dark' ? 'bg-amber-900' : 'bg-amber-300'
          }`}></div>
          <div className={`absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 ${
            actualTheme === 'dark' ? 'bg-pink-900' : 'bg-pink-300'
          }`}></div>
        </div>

        <nav className={`fixed top-0 w-full backdrop-blur-md shadow-sm z-50 transition-colors duration-300 ${
          actualTheme === 'dark' ? 'bg-gray-900/70' : 'bg-white/70'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-2xl font-serif font-bold transition-colors ${
                actualTheme === 'dark' ? 'text-rose-400' : 'text-rose-700'
              }`}>
                Anjali
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? actualTheme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                        : actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => setTheme('light')} className={`p-2 rounded-lg transition-colors ${
                    theme === 'light' ? actualTheme === 'dark' ? 'bg-gray-800 text-rose-400' : 'bg-rose-100 text-rose-600' : actualTheme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-500 hover:text-rose-600'
                  }`} title="Light theme">
                    <Sun size={18} />
                  </button>
                  <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? actualTheme === 'dark' ? 'bg-gray-800 text-rose-400' : 'bg-rose-100 text-rose-600' : actualTheme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-500 hover:text-rose-600'
                  }`} title="Dark theme">
                    <Moon size={18} />
                  </button>
                  <button onClick={() => setTheme('device')} className={`p-2 rounded-lg transition-colors ${
                    theme === 'device' ? actualTheme === 'dark' ? 'bg-gray-800 text-rose-400' : 'bg-rose-100 text-rose-600' : actualTheme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-500 hover:text-rose-600'
                  }`} title="Device theme">
                    <Monitor size={18} />
                  </button>
                </div>
              </div>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden transition-colors ${
                actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
              }`}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 pb-4 space-y-3">
                {navItems.map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400 hover:bg-gray-800' : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50'
                  }`}>
                    {item}
                  </button>
                ))}
                
                <div className="flex items-center gap-2 px-4 pt-4">
                  <button onClick={() => setTheme('light')} className={`p-2 rounded-lg transition-colors ${
                    theme === 'light' ? actualTheme === 'dark' ? 'bg-gray-800 text-rose-400' : 'bg-rose-100 text-rose-600' : actualTheme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-500 hover:text-rose-600'
                  }`}>
                    <Sun size={18} />
                  </button>
                  <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? actualTheme === 'dark' ? 'bg-gray-800 text-rose-400' : 'bg-rose-100 text-rose-600' : actualTheme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-500 hover:text-rose-600'
                  }`}>
                    <Moon size={18} />
                  </button>
                  <button onClick={() => setTheme('device')} className={`p-2 rounded-lg transition-colors ${
                    theme === 'device' ? actualTheme === 'dark' ? 'bg-gray-800 text-rose-400' : 'bg-rose-100 text-rose-600' : actualTheme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-500 hover:text-rose-600'
                  }`}>
                    <Monitor size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill={actualTheme === 'dark' ? 'rgba(244, 114, 182, 0.5)' : 'rgba(251, 113, 133, 0.3)'} />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div style={{ opacity }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <TextReveal>
                <h1 className={`text-5xl md:text-7xl font-serif font-bold mb-6 transition-colors ${
                  actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  Frontend Developer
                </h1>
              </TextReveal>
              <TextReveal>
                <p className={`text-xl md:text-2xl font-light mb-8 transition-colors ${
                  actualTheme === 'dark' ? 'text-rose-400' : 'text-rose-700'
                }`}>
                  Building clean & beautiful web experiences
                </p>
              </TextReveal>
              <TextReveal>
                <p className={`text-lg mb-12 max-w-2xl mx-auto transition-colors ${
                  actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Passionate about creating elegant, user-friendly interfaces with modern technologies.
                  Specializing in React, Next.js, and the MERN stack.
                </p>
              </TextReveal>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <MovingBorder duration={3000} onClick={() => scrollToSection('projects')}>
                  <span className="font-medium">View My Work</span>
                </MovingBorder>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors ${
                actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                About Me
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <Card3D className={`rounded-2xl shadow-md p-8 md:p-12 mb-8 transition-colors ${
                actualTheme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
              }`}>
                <div>
                  <p className={`text-lg leading-relaxed mb-6 transition-colors ${
                    actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Hello! I'm Anjali, a frontend developer with a passion for creating beautiful, 
                    functional web experiences. I love the intersection of design and code, where 
                    creativity meets logic to build products that users love.
                  </p>
                  <p className={`text-lg leading-relaxed transition-colors ${
                    actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    My journey in web development started with a curiosity about how websites work, 
                    and has evolved into a deep appreciation for clean code, thoughtful design, and 
                    user-centered development.
                  </p>
                </div>
              </Card3D>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <Card3D className={`rounded-2xl shadow-md p-8 md:p-12 transition-colors ${
                actualTheme === 'dark' ? 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-sm' : 'bg-gradient-to-br from-rose-50/80 to-amber-50/80 backdrop-blur-sm'
              }`}>
                <div>
                  <h3 className={`text-2xl font-serif font-bold mb-6 transition-colors ${
                    actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}>Education</h3>
                  <div className="border-l-4 border-rose-600 pl-6">
                    <h4 className={`text-xl font-semibold mb-2 transition-colors ${
                      actualTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      Bachelor of Technology in Computer Science
                    </h4>
                    <p className={`font-medium mb-2 transition-colors ${
                      actualTheme === 'dark' ? 'text-rose-400' : 'text-rose-700'
                    }`}>XYZ University</p>
                    <p className={`transition-colors ${
                      actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>2021 - 2025 | CGPA: 8.5/10</p>
                  </div>
                </div>
              </Card3D>
            </FadeInSection>
          </div>
        </section>

        <section id="experience" className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors ${
                actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Experience
              </h2>
            </FadeInSection>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <FadeInSection key={index} delay={index * 0.1}>
                  <Card3D className={`rounded-2xl shadow-md p-8 transition-all ${
                    actualTheme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
                  }`}>
                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className={`text-xl font-bold mb-1 transition-colors ${
                            actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}>{exp.role}</h3>
                          <p className={`font-medium transition-colors ${
                            actualTheme === 'dark' ? 'text-rose-400' : 'text-rose-700'
                          }`}>{exp.company}</p>
                        </div>
                        <span className={`text-sm mt-2 md:mt-0 transition-colors ${
                          actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{exp.duration}</span>
                      </div>
                      <p className={`leading-relaxed transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{exp.description}</p>
                    </div>
                  </Card3D>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="relative py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <FadeInSection>
              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors ${
                actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Skills
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className={`rounded-xl shadow-md p-6 text-center transition-all ${
                      actualTheme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
                    }`}
                  >
                    <p className={`font-semibold mb-1 transition-colors ${
                      actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>{skill.name}</p>
                    <p className={`text-xs transition-colors ${
                      actualTheme === 'dark' ? 'text-rose-400' : 'text-rose-600'
                    }`}>{skill.category}</p>
                  </motion.div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        <section id="projects" className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors ${
                actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Projects
              </h2>
            </FadeInSection>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <FadeInSection key={index} delay={index * 0.1}>
                  <Card3D className={`rounded-2xl overflow-hidden transition-all ${
                    actualTheme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm shadow-lg' : 'bg-white/80 backdrop-blur-sm shadow-md'
                  }`}>
                    <div>
                      <div className={`h-48 transition-colors ${
                        actualTheme === 'dark' ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-rose-100 to-amber-100'
                      }`}></div>
                      <div className="p-8">
                        <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                          actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                        }`}>{project.title}</h3>
                        <p className={`mb-4 leading-relaxed transition-colors ${
                          actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                actualTheme === 'dark' ? 'bg-gray-700 text-rose-400' : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 transition-colors ${
                              actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
                            }`}
                          >
                            <Github size={20} />
                            <span className="font-medium">Code</span>
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 transition-colors ${
                              actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
                            }`}
                          >
                            <ExternalLink size={20} />
                            <span className="font-medium">Live Demo</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <FadeInSection>
              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-12 text-center transition-colors ${
                actualTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Get In Touch
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <Card3D className={`rounded-2xl shadow-md p-8 md:p-12 transition-colors ${
                actualTheme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'
              }`}>
                <div>
                  <div className="space-y-6">
                    <div>
                      <label className={`block font-medium mb-2 transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Name</label>
                      <input
                        type="text"
                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                          actualTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200'
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className={`block font-medium mb-2 transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Email</label>
                      <input
                        type="email"
                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                          actualTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className={`block font-medium mb-2 transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Message</label>
                      <textarea
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border outline-none transition-all resize-none ${
                          actualTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'bg-white border-gray-300 text-gray-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200'
                        }`}
                        placeholder="Your message..."
                      />
                    </div>
                    <MovingBorder
                      duration={2000}
                      className="w-full"
                      onClick={() => alert('Contact form submitted! (Connect to your backend to handle submissions)')}
                    >
                      <span className="font-medium">Send Message</span>
                    </MovingBorder>
                  </div>

                  <div className="flex justify-center gap-6 mt-8">
                    <motion.a
                      whileHover={{ scale: 1.2, rotateZ: 5 }}
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
                      }`}
                    >
                      <Linkedin size={28} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotateZ: -5 }}
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
                      }`}
                    >
                      <Github size={28} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotateZ: 5 }}
                      href="mailto:anjali@example.com"
                      className={`transition-colors ${
                        actualTheme === 'dark' ? 'text-gray-300 hover:text-rose-400' : 'text-gray-700 hover:text-rose-600'
                      }`}
                    >
                      <Mail size={28} />
                    </motion.a>
                  </div>
                </div>
              </Card3D>
            </FadeInSection>
          </div>
        </section>

        <footer className="relative py-8 px-6">
          <p className={`text-center font-light transition-colors ${
            actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © Anjali — Built with love & code
          </p>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;