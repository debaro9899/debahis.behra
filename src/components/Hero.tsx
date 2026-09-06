import { motion } from 'framer-motion';


interface HeroProps {
  recruiterMode: boolean;
}

const metrics = [
  { value: '5+',   label: 'Years Experience' },
  { value: '20+',  label: 'Teams Collaborated' },
  { value: '<50ms', label: 'SLA Latency' },
  { value: '30%',  label: 'Fewer Defects' },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

export default function Hero({ recruiterMode }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Floating orbs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,204,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Recruiter Mode Banner */}
      {recruiterMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-16 left-0 right-0 z-10 mx-auto max-w-4xl px-4 mt-4"
        >
          <div
            className="rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))',
              border: '1px solid rgba(0,212,255,0.3)',
              boxShadow: '0 0 30px rgba(0,212,255,0.1)',
            }}
          >
            <span
              className="text-xs font-bold font-mono px-2 py-1 rounded"
              style={{ background: 'rgba(0,212,255,0.2)', color: '#00d4ff' }}
            >
              RECRUITER VIEW
            </span>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
              <span className="font-semibold" style={{ color: '#00d4ff' }}>Debashis Behera</span>
              {' '}— Senior Backend Engineer with 5+ years building distributed systems. Java · Spring Boot · Kafka · AWS · Kubernetes.
              {' '}Open to senior/staff backend roles.{' '}
              <a href="mailto:debaro9899@gmail.com" className="underline" style={{ color: '#00ffcc' }}>
                debaro9899@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div initial="hidden" animate="visible" className="flex flex-col gap-8">
          {/* Badge */}
          <motion.div variants={fadeUp(0)} className="flex">
            <span
              className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] px-4 py-2 rounded"
              style={{
                border: '1px solid rgba(0,212,255,0.4)',
                color: '#00d4ff',
                background: 'rgba(0,212,255,0.05)',
              }}
            >
              BACKEND SYSTEMS ENGINEER
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={fadeUp(0.1)} className="flex flex-col leading-none">
            <h1
              className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight gradient-text"
              style={{ lineHeight: 0.95 }}
            >
              Debashis
            </h1>
            <h1
              className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight"
              style={{ lineHeight: 0.95, color: 'var(--text-primary)' }}
            >
              Behera<span className="gradient-text">.</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            variants={fadeUp(0.2)}
            className="text-xl sm:text-2xl font-medium max-w-2xl"
            style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}
          >
            I design and build reliable backend systems that scale.
          </motion.p>

          {/* Tech stack */}
          <motion.p
            variants={fadeUp(0.25)}
            className="font-mono text-sm tracking-widest text-cyan-400/90"
          >
            Java 17 • Spring Boot • Apache Kafka • AWS • Kubernetes • Redis • Distributed Systems
          </motion.p>

          {/* Career Objective / Professional Summary Card */}
          <motion.div
            variants={fadeUp(0.3)}
            className="glass-strong p-5 sm:p-6 rounded-2xl border border-cyan-400/25 max-w-3xl relative overflow-hidden"
            style={{ background: 'rgba(8, 14, 26, 0.85)' }}
          >
            <div className="flex items-center gap-2 mb-2.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Professional Summary & Core Objective</span>
            </div>
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
              Senior Backend Engineer with <strong className="text-white font-semibold">5+ years of experience</strong> architecting and delivering highly scalable, fault-tolerant distributed systems, cloud-native microservices, and API-first backend platforms. Strong foundations in <strong className="text-cyan-300 font-semibold">Data Structures & Algorithms, concurrent programming, and system design trade-offs</strong> with proven end-to-end feature ownership from architecture design documentation through production deployment.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp(0.35)} className="flex flex-wrap gap-3 sm:gap-4">
            <button
              className="btn-primary"
              onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Engineering Journey ↓
            </button>
            <a href="mailto:debaro9899@gmail.com?subject=Senior%20Backend%20Engineering%20Discussion" className="btn-outline inline-block text-center">
              Schedule Interview
            </a>
          </motion.div>

          {/* Metric cards */}
          <motion.div
            variants={fadeUp(0.5)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 max-w-2xl"
          >
            {metrics.map((m) => (
              <div key={m.label} className="metric-card px-5 py-4 flex flex-col gap-1">
                <span
                  className="text-2xl sm:text-3xl font-black font-mono glow-text"
                  style={{ color: '#00d4ff' }}
                >
                  {m.value}
                </span>
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#00d4ff' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
