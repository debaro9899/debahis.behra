import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';

interface NavbarProps {
  recruiterMode: boolean;
  setRecruiterMode: (v: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ recruiterMode, setRecruiterMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'Journey', id: 'journey' },
    { label: 'Impact', id: 'impact' },
    { label: 'Systems & DSA', id: 'systems-dsa' },
    { label: 'Architecture', id: 'work' },
    { label: 'Tech Stack', id: 'systems' },
    { label: 'Debashis AI', id: 'ai' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,10,15,0.95)' : 'rgba(5,10,15,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(0,212,255,0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-cyan-400/60 flex items-center justify-center"
               style={{ background: 'rgba(0,212,255,0.08)' }}>
            <span className="text-cyan-400 font-black font-mono text-sm">DB</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-sm leading-none">Debashis Behera</div>
            <div className="text-gray-500 font-mono text-xs mt-0.5">Backend Systems Engineer</div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Available badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
               style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
            <div className="status-dot"></div>
            <span className="text-green-400 text-xs font-semibold">Available</span>
          </div>

          {/* Recruiter mode toggle */}
          <button
            onClick={() => setRecruiterMode(!recruiterMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wide transition-all duration-300 ${
              recruiterMode
                ? 'bg-cyan-400 text-black'
                : 'border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10'
            }`}
          >
            {recruiterMode ? '✓ Recruiter Mode' : 'Recruiter Mode'}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(5,10,15,0.98)', borderBottom: '1px solid rgba(0,212,255,0.15)' }}
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left py-3 px-4 text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/5 rounded-lg transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                <a href="mailto:debaro9899@gmail.com"
                   className="flex items-center gap-2 py-2 px-4 text-gray-500 hover:text-cyan-400 text-sm">
                  <ExternalLink size={14} /> debaro9899@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/debashis99/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 py-2 px-4 text-gray-500 hover:text-blue-400 text-sm">
                  <ExternalLink size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
