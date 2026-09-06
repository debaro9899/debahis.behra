import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ExternalLink, Terminal } from 'lucide-react';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecruiterModal: React.FC<RecruiterModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl border border-cyan-500/40 p-6 md:p-8 z-10 shadow-2xl shadow-cyan-950/50"
            style={{ background: 'rgba(8, 14, 24, 0.95)' }}
          >
            {/* Header bar */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 mb-3">
                  <span className="status-dot"></span>
                  RECRUITER 30-SECOND DOSSIER
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  Debashis Behera
                </h2>
                <p className="text-cyan-400 font-mono text-sm md:text-base mt-1 font-medium">
                  Senior Backend & Distributed Systems Engineer
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Pitch */}
            <div className="py-6 border-b border-white/10">
              <h3 className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-2">Executive Summary</h3>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                Backend specialist with <strong className="text-white font-semibold">5+ years of production experience</strong> building fault-tolerant microservices, high-throughput Kafka event pipelines, and cloud-native systems on AWS and Kubernetes. Designed a centralized REST API integration framework adopted across <strong className="text-cyan-400 font-semibold">20+ engineering teams</strong> while enforcing strict <strong className="text-cyan-400 font-semibold">&lt;50ms SLAs</strong>.
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="py-6 border-b border-white/10">
              <h3 className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-3">Verified Impact</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-center">
                  <div className="text-2xl font-black font-mono text-cyan-400">20+</div>
                  <div className="text-xs text-gray-400 mt-1">Teams Consuming API Framework</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-center">
                  <div className="text-2xl font-black font-mono text-purple-400">&lt;50ms</div>
                  <div className="text-xs text-gray-400 mt-1">Strict Production SLA</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                  <div className="text-2xl font-black font-mono text-emerald-400">-30%</div>
                  <div className="text-xs text-gray-400 mt-1">Post-Release Defects via TDD</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
                  <div className="text-2xl font-black font-mono text-amber-400">+40%</div>
                  <div className="text-xs text-gray-400 mt-1">Maintainability via Microservices</div>
                </div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="py-6 border-b border-white/10">
              <h3 className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-3">Primary Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['Java 17 / 21', 'Spring Boot', 'Apache Kafka', 'AWS Cloud', 'Kubernetes / Docker', 'Redis Caching', 'PostgreSQL', 'RabbitMQ', 'Prometheus & Grafana', 'Microservice Architecture', 'TDD (JUnit/Mockito)', 'REST / gRPC APIs'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-cyan-400/20 text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Companies */}
            <div className="py-6 border-b border-white/10">
              <h3 className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-3">Engineering History</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">Arrise Solutions (India)</span>
                    <span className="text-xs text-cyan-400 font-mono">Mar 2025 – Present</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Software Engineer · Core Platform Team (6+ members) · Java 17, Spring Boot, Kafka, &lt;50ms SLA</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">PhonePe (via Codevyasa)</span>
                    <span className="text-xs text-purple-400 font-mono">Jun 2024 – Feb 2025</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Backend Engineer · Unified API Gateway adopted by 20+ Eng Teams · +40% maintainability</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">AgreeYa (Client: Verizon)</span>
                    <span className="text-xs text-blue-400 font-mono">Jul 2023 – May 2024</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Backend Engineer · Verizon "Connect IT" enterprise platform · Extensible Plugin Layer (+25% engagement)</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">Rakuten</span>
                    <span className="text-xs text-amber-400 font-mono">Jun 2021 – Jun 2023</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Backend Engineer · Change Management workflows (+25% efficiency) · Postgres/Oracle/MySQL indexing (+20%)</p>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <a
                  href="mailto:debaro9899@gmail.com?subject=Interview%20Invitation%20for%20Debashis%20Behera"
                  className="btn-primary flex-1 sm:flex-none text-center"
                >
                  <Mail size={16} />
                  Email Debashis
                </a>
                <a
                  href="https://www.linkedin.com/in/debashis99/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 sm:flex-none text-center"
                >
                  <ExternalLink size={16} />
                  LinkedIn Profile
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Terminal size={14} />
                Explore Deep Technical Architecture →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecruiterModal;
