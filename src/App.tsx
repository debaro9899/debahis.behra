import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EngineeringJourney from './components/EngineeringJourney';
import ImpactStats from './components/ImpactStats';
import DsaSystemDesign from './components/DsaSystemDesign';
import ArchitectureLab from './components/ArchitectureLab';
import SystemsUniverse from './components/SystemsUniverse';
import AIRecruiter from './components/AIRecruiter';
import AIEngineering from './components/AIEngineering';
import Contact from './components/Contact';
import FloatingChatbot from './components/FloatingChatbot';
import RecruiterModal from './components/RecruiterModal';

function App() {
  const [recruiterMode, setRecruiterMode] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)' }}>
      <Navbar recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode} />
      <Hero recruiterMode={recruiterMode} />
      {/* Engineering Journey is positioned FIRST right after Hero & Objective */}
      <EngineeringJourney />
      <ImpactStats />
      <DsaSystemDesign />
      <ArchitectureLab />
      <SystemsUniverse />
      <AIRecruiter />
      <AIEngineering />
      <Contact />
      <FloatingChatbot />
      <RecruiterModal isOpen={recruiterMode} onClose={() => setRecruiterMode(false)} />
    </div>
  );
}

export default App;
