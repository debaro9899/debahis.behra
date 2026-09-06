import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'kafka' | 'gateway' | 'scaling';

// ─── Kafka Pipeline ───────────────────────────────────────────────────────────

const KAFKA_NODES = [
  { id: 'producers', label: 'PRODUCERS', sub: 'Payment / User / Order', color: 'from-emerald-500 to-teal-600', glow: 'rgba(52,211,153,0.35)', tip: 'Multiple producer services publish events to Kafka topics. Each producer writes to a specific partition key for ordering guarantees.' },
  { id: 'broker', label: 'KAFKA BROKER', sub: 'Partitions · Replication', color: 'from-cyan-500 to-blue-600', glow: 'rgba(0,212,255,0.35)', tip: 'The Kafka broker persists events with configurable replication (RF=3 for HA). Topics are partitioned for parallel consumption.' },
  { id: 'consumers', label: 'CONSUMER GROUP', sub: 'Parallel processing', color: 'from-violet-500 to-purple-700', glow: 'rgba(139,92,246,0.35)', tip: 'Consumer groups allow horizontal scaling — each partition is owned by exactly one consumer, enabling parallel, ordered processing.' },
  { id: 'processing', label: 'PROCESSING', sub: 'Enrich · Validate · Transform', color: 'from-amber-500 to-orange-600', glow: 'rgba(251,191,36,0.35)', tip: 'Business logic: enrichment, deduplication, transformation. Failed events go to Dead Letter Queue for retry.' },
  { id: 'storage', label: 'STORAGE', sub: 'Postgres · Redis · S3', color: 'from-rose-500 to-pink-600', glow: 'rgba(244,63,94,0.35)', tip: 'Processed events are persisted to PostgreSQL, cached in Redis for fast reads, and archived to S3 for long-term retention.' },
];

const KafkaPipeline: React.FC = () => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [particle, setParticle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setParticle(p => (p + 1) % KAFKA_NODES.length), 700);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-0 mt-6 mb-8 relative">
        {KAFKA_NODES.map((node, idx) => (
          <React.Fragment key={node.id}>
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                className={`cursor-pointer rounded-xl px-4 py-3 text-center min-w-[110px] bg-gradient-to-br ${node.color} select-none`}
                style={{ boxShadow: particle === idx ? `0 0 24px ${node.glow}, 0 0 4px ${node.glow}` : '0 0 8px rgba(0,0,0,0.4)', transition: 'box-shadow 0.3s ease' }}
                whileHover={{ scale: 1.06 }}
                onClick={() => setTooltip(t => t === node.id ? null : node.id)}
              >
                <p className="text-[10px] font-black tracking-widest text-white/90 uppercase">{node.label}</p>
                <p className="text-[9px] text-white/60 mt-0.5 leading-tight">{node.sub}</p>
              </motion.div>
              {particle === idx && (
                <motion.div layoutId="flow-dot" className="w-2 h-2 rounded-full bg-white mt-1.5"
                             style={{ boxShadow: `0 0 8px ${node.glow}` }} />
              )}
            </div>
            {idx < KAFKA_NODES.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="relative w-10 md:w-14 h-1 my-4 md:my-0 overflow-hidden rounded-full bg-gray-800">
                  <motion.div className="absolute inset-y-0 left-0 w-6 rounded-full"
                               style={{ background: `linear-gradient(90deg, transparent, ${node.glow}, transparent)` }}
                               animate={{ x: [-24, 56] }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <AnimatePresence>
        {tooltip && (() => {
          const n = KAFKA_NODES.find(x => x.id === tooltip);
          return n ? (
            <motion.div key={n.id} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="rounded-xl px-5 py-4 mb-6 text-sm text-gray-300 leading-relaxed"
                        style={{ background: 'rgba(15,25,40,0.9)', border: `1px solid ${n.glow}`, boxShadow: `0 0 20px ${n.glow}30` }}>
              <span className="font-semibold text-white">{n.label}: </span>{n.tip}
            </motion.div>
          ) : null;
        })()}
      </AnimatePresence>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[{ l: 'Topic Partitions', c: '#67e8f9' }, { l: 'Consumer Group Scaling', c: '#c4b5fd' }, { l: 'Dead Letter Queue', c: '#fde68a' }].map(b => (
          <span key={b.l} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: `${b.c}15`, border: `1px solid ${b.c}40`, color: b.c }}>{b.l}</span>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6 leading-relaxed text-center max-w-2xl mx-auto">
        Event-driven pipelines decouple producers from consumers, enabling independent scaling and fault isolation.
        Kafka guarantees at-least-once delivery; idempotent consumers ensure exactly-once business semantics.
      </p>
    </div>
  );
};

// ─── API Gateway ─────────────────────────────────────────────────────────────

const GATEWAY_STEPS = [
  { id: 'client', label: 'CLIENT', lh: '—', lm: '—', color: '#94a3b8', skip: false },
  { id: 'rate', label: 'RATE LIMITER', lh: '0.8ms', lm: '0.8ms', color: '#34d399', skip: false },
  { id: 'auth', label: 'AUTH / JWT', lh: '2ms', lm: '2ms', color: '#60a5fa', skip: false },
  { id: 'valid', label: 'VALIDATION', lh: '0.5ms', lm: '0.5ms', color: '#a78bfa', skip: false },
  { id: 'service', label: 'SERVICE', lh: '3ms', lm: '3ms', color: '#f59e0b', skip: false },
  { id: 'cache', label: 'CACHE CHECK', lh: '0.5ms ✓', lm: '0.5ms ✗', color: '#00d4ff', skip: false },
  { id: 'db', label: 'DATABASE', lh: '—', lm: '8ms', color: '#f87171', skip: true },
  { id: 'response', label: 'RESPONSE', lh: '~7ms', lm: '~15ms', color: '#4ade80', skip: false },
];

const ApiGateway: React.FC = () => {
  const [cacheHit, setCacheHit] = useState(true);
  const [activeStep, setActiveStep] = useState(-1);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runAnimation = (hit: boolean) => {
    setActiveStep(-1);
    let step = 0;
    if (animRef.current) clearInterval(animRef.current);
    const visible = GATEWAY_STEPS.filter(s => !(hit && s.skip));
    animRef.current = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= visible.length) clearInterval(animRef.current!);
    }, 400);
  };

  useEffect(() => { runAnimation(cacheHit); return () => { if (animRef.current) clearInterval(animRef.current); }; }, [cacheHit]);

  const visible = GATEWAY_STEPS.filter(s => !(cacheHit && s.skip));
  return (
    <div>
      <div className="flex justify-center gap-3 mt-6 mb-8">
        {(['hit', 'miss'] as const).map(mode => {
          const active = (mode === 'hit' && cacheHit) || (mode === 'miss' && !cacheHit);
          return (
            <button key={mode} onClick={() => setCacheHit(mode === 'hit')}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{ background: active ? (mode === 'hit' ? 'linear-gradient(135deg, #00d4ff, #0ea5e9)' : 'linear-gradient(135deg, #f87171, #dc2626)') : 'rgba(255,255,255,0.06)', color: active ? '#fff' : '#94a3b8', border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.1)'}` }}>
              Cache {mode === 'hit' ? 'HIT ⚡' : 'MISS 🐌'}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {visible.map((step, idx) => {
          const isActive = idx <= activeStep;
          const isCurrent = idx === activeStep;
          return (
            <React.Fragment key={step.id}>
              <motion.div layout className="flex flex-col items-center gap-1">
                <motion.div className="rounded-lg px-3 py-2 text-center min-w-[90px]"
                             animate={{ opacity: isActive ? 1 : 0.3, scale: isCurrent ? 1.08 : 1, boxShadow: isCurrent ? `0 0 18px ${step.color}80` : isActive ? `0 0 6px ${step.color}30` : 'none' }}
                             transition={{ duration: 0.3 }}
                             style={{ background: isActive ? `${step.color}18` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? step.color + '60' : 'rgba(255,255,255,0.08)'}` }}>
                  <p className="text-[9px] font-black tracking-widest" style={{ color: isActive ? step.color : '#475569' }}>{step.label}</p>
                  <p className="text-[9px] mt-0.5" style={{ color: isActive ? '#94a3b8' : '#334155' }}>{cacheHit ? step.lh : step.lm}</p>
                </motion.div>
              </motion.div>
              {idx < visible.length - 1 && (
                <motion.div animate={{ opacity: idx < activeStep ? 1 : 0.2 }} transition={{ duration: 0.3 }} className="text-gray-600 text-lg">→</motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex justify-center mb-6">
        <button onClick={() => runAnimation(cacheHit)} className="text-xs px-4 py-1.5 rounded-full border transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(0,212,255,0.2)', color: '#67e8f9' }}>↺ Replay</button>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed text-center max-w-2xl mx-auto">
        A layered API Gateway enforces cross-cutting concerns before hitting business services. Cache HITs avoid DB round-trips, reducing p99 latency from ~15ms to ~7ms.
      </p>
    </div>
  );
};

// ─── Microservice Scaling ─────────────────────────────────────────────────────

const lerp = (min: number, max: number, t: number) => Math.round(min + (max - min) * t);

const MicroserviceScaling: React.FC = () => {
  const [traffic, setTraffic] = useState(10);
  const t = (traffic - 1) / 99;
  const svc = lerp(1, 12, t);
  const kafka = lerp(1, 8, t);
  const db = lerp(0, 5, t);
  const cache = Math.round(lerp(40, 95, t));
  const rps = Math.round(lerp(1, 100, t));

  const boxes = (count: number, grad: string, glow: string) =>
    Array.from({ length: count }).map((_, i) => (
      <motion.div key={i} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22, delay: i * 0.04 }}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: grad, boxShadow: `0 0 8px ${glow}` }}>{i + 1}</motion.div>
    ));

  return (
    <div>
      <div className="mt-6 mb-8 px-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>1k req/s</span>
          <span className="text-cyan-400 font-semibold text-sm">{rps}k req/s</span>
          <span>100k req/s</span>
        </div>
        <input type="range" min={1} max={100} value={traffic} onChange={e => setTraffic(Number(e.target.value))} className="w-full accent-cyan-400 cursor-pointer" />
        <p className="text-center text-[10px] text-gray-600 mt-1">← Drag to simulate traffic load →</p>
      </div>
      <div className="space-y-6">
        {[
          { label: 'Service Instances', count: svc, color: 'text-emerald-400', grad: 'linear-gradient(135deg,#34d399,#059669)', glow: 'rgba(52,211,153,0.4)', suffix: `${svc} pods` },
          { label: 'Kafka Consumer Group', count: kafka, color: 'text-cyan-400', grad: 'linear-gradient(135deg,#00d4ff,#0ea5e9)', glow: 'rgba(0,212,255,0.4)', suffix: `${kafka} consumers` },
        ].map(({ label, count, color, grad, glow, suffix }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold uppercase tracking-widest ${color}`}>{label}</span>
              <span className="text-xs text-gray-400">{suffix}</span>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              <AnimatePresence>{boxes(count, grad, glow)}</AnimatePresence>
            </div>
          </div>
        ))}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">DB Read Replicas</span>
            <span className="text-xs text-gray-400">{db > 0 ? `+${db} replicas` : 'Primary only'}</span>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            <motion.div layout className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                         style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', boxShadow: '0 0 8px rgba(139,92,246,0.5)' }}>P</motion.div>
            <AnimatePresence>
              {Array.from({ length: db }).map((_, i) => (
                <motion.div key={`r-${i}`} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                             transition={{ type: 'spring', stiffness: 320, damping: 22, delay: i * 0.05 }}
                             className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
                             style={{ background: 'linear-gradient(135deg,#c4b5fd,#7c3aed)', boxShadow: '0 0 8px rgba(139,92,246,0.3)', opacity: 0.75 }}>R{i + 1}</motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Redis Cache Hit Rate</span>
            <span className="text-xs text-gray-400">{cache}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div className="h-full rounded-full" animate={{ width: `${cache}%` }} transition={{ duration: 0.4 }}
                         style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', boxShadow: '0 0 10px rgba(251,191,36,0.5)' }} />
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-8 leading-relaxed text-center max-w-2xl mx-auto">
        Horizontal scaling of stateless services is trivial with Kubernetes HPA. Kafka consumer groups scale up to match partition count. Redis cache hit rate naturally improves under high traffic as the working set warms up.
      </p>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'kafka' as Tab, label: 'Kafka Pipeline', icon: '⚡' },
  { id: 'gateway' as Tab, label: 'API Gateway', icon: '🔀' },
  { id: 'scaling' as Tab, label: 'Microservice Scaling', icon: '📈' },
];

const ArchitectureLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('kafka');
  return (
    <section className="py-20 px-4" id="work">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6 }} className="text-center mb-10">
          <span className="font-mono text-sm text-amber-400 tracking-widest uppercase">Interactive Demos</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-3 gradient-text">Architecture Lab</h2>
          <p className="text-gray-400 text-base">Real engineering decisions. Interactive demonstrations.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-0">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className="px-5 py-2.5 rounded-t-xl text-sm font-semibold transition-all duration-200"
                      style={{ background: isActive ? 'rgba(8,14,28,0.95)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderBottom: isActive ? '1px solid rgba(8,14,28,0.95)' : undefined, color: isActive ? '#00d4ff' : '#64748b', boxShadow: isActive ? '0 0 16px rgba(0,212,255,0.12)' : 'none', zIndex: isActive ? 2 : 1, marginBottom: isActive ? '-1px' : '0' }}>
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div key="panel" className="rounded-2xl rounded-tl-none p-6 md:p-8"
                    style={{ background: 'rgba(8,14,28,0.95)', border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 40px rgba(0,212,255,0.06)', position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {activeTab === 'kafka' && <KafkaPipeline />}
              {activeTab === 'gateway' && <ApiGateway />}
              {activeTab === 'scaling' && <MicroserviceScaling />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureLab;
