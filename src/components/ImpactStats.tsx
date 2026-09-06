import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  Zap,
  TrendingUp,
  ShieldCheck,
  Gauge,
  Wrench,
  Smile,
  Calendar,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Metric {
  id: string;
  value: string;          // display value (already formatted, e.g. "20+")
  numericTarget: number;  // numeric target for counter animation
  suffix: string;         // appended after the animated number  e.g. "+"  "<"  "%"
  prefix: string;         // prepended before number e.g. "" or "<" or "+"
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const METRICS: Metric[] = [
  {
    id: 'teams',
    value: '20+',
    numericTarget: 20,
    suffix: '+',
    prefix: '',
    label: 'Teams',
    description: 'Centralized API integration framework consumed by 20+ engineering teams',
    icon: <Users size={20} />,
    color: '#00d4ff',
  },
  {
    id: 'latency',
    value: '<50ms',
    numericTarget: 50,
    suffix: 'ms',
    prefix: '<',
    label: 'API Latency SLA',
    description: 'API latency SLA maintained across all production systems',
    icon: <Zap size={20} />,
    color: '#a855f7',
  },
  {
    id: 'query-perf',
    value: '+20%',
    numericTarget: 20,
    suffix: '%',
    prefix: '+',
    label: 'Query Performance',
    description: 'Data retrieval performance and schema indexing optimization across PostgreSQL & Oracle',
    icon: <TrendingUp size={20} />,
    color: '#10b981',
  },
  {
    id: 'defects',
    value: '-30%',
    numericTarget: 30,
    suffix: '%',
    prefix: '-',
    label: 'Defects',
    description: 'Reduction in post-release defects via TDD and quality frameworks',
    icon: <ShieldCheck size={20} />,
    color: '#ef4444',
  },
  {
    id: 'api-speed',
    value: '+25%',
    numericTarget: 25,
    suffix: '%',
    prefix: '+',
    label: 'API Speed',
    description: 'API response time improvement through performance optimization',
    icon: <Gauge size={20} />,
    color: '#f59e0b',
  },
  {
    id: 'maintainability',
    value: '+40%',
    numericTarget: 40,
    suffix: '%',
    prefix: '+',
    label: 'Maintainability',
    description: 'Code maintainability improvement via architectural refactoring',
    icon: <Wrench size={20} />,
    color: '#00ffcc',
  },
  {
    id: 'engagement',
    value: '+25%',
    numericTarget: 25,
    suffix: '%',
    prefix: '+',
    label: 'Engagement',
    description: 'User engagement and satisfaction improvement',
    icon: <Smile size={20} />,
    color: '#06b6d4',
  },
  {
    id: 'experience',
    value: '5+',
    numericTarget: 5,
    suffix: '+',
    prefix: '',
    label: 'Years',
    description: 'Backend engineering across fintech, telecom, gaming, and e-commerce',
    icon: <Calendar size={20} />,
    color: '#8b5cf6',
  },
];

// ─── Counter hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

// ─── Single metric card ───────────────────────────────────────────────────────

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useCountUp(metric.numericTarget, 1500, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="metric-card relative p-6 flex flex-col gap-3 group overflow-hidden"
    >
      {/* corner glow */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${metric.color}22 0%, transparent 70%)`,
        }}
      />

      {/* icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `${metric.color}14`,
          border: `1px solid ${metric.color}28`,
          color: metric.color,
        }}
      >
        {metric.icon}
      </div>

      {/* metric value with count-up */}
      <div
        className="text-4xl font-black font-mono-code leading-none tracking-tight"
        style={{
          color: metric.color,
          textShadow: `0 0 24px ${metric.color}55`,
        }}
      >
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>

      {/* label */}
      <p
        className="text-xs font-bold font-mono-code tracking-widest uppercase"
        style={{ color: metric.color, opacity: 0.7 }}
      >
        {metric.label}
      </p>

      {/* description */}
      <p className="text-xs text-gray-500 leading-relaxed flex-1">
        {metric.description}
      </p>

      {/* bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, ${metric.color}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ImpactStats() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="impact"
      className="section relative overflow-hidden"
      style={{ background: 'var(--bg-card)' }}
    >
      {/* grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* heading */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400 opacity-50" />
            <span className="text-xs font-mono-code tracking-widest text-cyan-400 uppercase opacity-70">
              By the numbers
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400 opacity-50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
            Engineering Impact
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Measurable outcomes delivered across production systems over 5+ years of
            backend engineering.
          </p>
        </motion.div>

        {/* grid of cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.id} metric={metric} index={i} />
          ))}
        </div>

        {/* source note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-xs text-gray-600 font-mono-code"
        >
          * Source: Professional Experience — metrics are approximate, derived from
          retrospectives, APM tools, and peer reviews.
        </motion.p>
      </div>
    </section>
  );
}
