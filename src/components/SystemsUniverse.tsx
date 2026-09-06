import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Server, Zap, Database, Cloud, Activity, Bot } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tech {
  name: string;
  detail: string;
}

interface Category {
  id: string;
  label: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  angle: number;
  radius: number;
  techs: Tech[];
  summary: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: 'backend',
    label: 'BACKEND',
    color: '#00d4ff',
    glowColor: 'rgba(0,212,255,0.35)',
    icon: <Server size={14} />,
    angle: 0,
    radius: 220,
    summary:
      'Built highly-scalable REST and GraphQL microservices with Spring Boot, coordinating 20+ engineering teams through a shared API integration framework. Applied JPA/Hibernate ORM patterns, layered caching, and clean-architecture principles to keep services maintainable at scale.',
    techs: [
      { name: 'Java', detail: 'Primary language for all backend services; leveraged Java 17 features (records, sealed classes) in production.' },
      { name: 'Spring Boot', detail: 'Bootstrapped all microservices; used Spring Security, Spring Data, Spring Cloud for full-stack server-side engineering.' },
      { name: 'REST APIs', detail: 'Designed and documented OpenAPI-compliant endpoints consumed by web, mobile, and third-party partners.' },
      { name: 'Microservices', detail: 'Decomposed monoliths into independently deployable services with well-defined bounded contexts.' },
      { name: 'JPA/Hibernate', detail: 'Mapped domain models with custom fetch strategies and second-level caching to hit sub-50 ms SLAs.' },
    ],
  },
  {
    id: 'event-driven',
    label: 'EVENT DRIVEN',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.35)',
    icon: <Zap size={14} />,
    angle: 60,
    radius: 220,
    summary:
      'Designed event-driven pipelines with Kafka and RabbitMQ to decouple services, handle peak traffic, and guarantee at-least-once delivery. Applied event sourcing patterns to build auditable, replay-capable systems for fintech and gaming domains.',
    techs: [
      { name: 'Kafka', detail: 'Streamed millions of daily events between microservices with consumer groups, dead-letter topics, and schema registry.' },
      { name: 'RabbitMQ', detail: 'Used AMQP for task queues and fanout exchanges in notification and payment processing flows.' },
      { name: 'Async Processing', detail: 'Offloaded heavy computations (report generation, email dispatch) to async workers, improving API response times by 25%.' },
      { name: 'Event Sourcing', detail: 'Implemented event-store patterns for audit trails in financial transaction services.' },
    ],
  },
  {
    id: 'databases',
    label: 'DATABASES',
    color: '#00ffcc',
    glowColor: 'rgba(0,255,204,0.35)',
    icon: <Database size={14} />,
    angle: 120,
    radius: 220,
    summary:
      'Operated polyglot persistence across five database engines, choosing the right store for each access pattern. Tuned queries, managed migrations with Flyway/Liquibase, and leveraged Redis Cluster for distributed caching that kept API latency under 50 ms.',
    techs: [
      { name: 'PostgreSQL', detail: 'Primary RDBMS for transactional workloads; used CTEs, window functions, and JSONB for flexible schemas.' },
      { name: 'MongoDB', detail: 'Document store for product catalogues and user-preference data with aggregation pipelines.' },
      { name: 'Redis', detail: 'In-memory cache and session store; used Lua scripts for atomic rate-limiting.' },
      { name: 'MySQL', detail: 'Legacy service migrations and read-replica setups for reporting workloads.' },
      { name: 'DynamoDB', detail: 'Serverless key-value store for high-throughput user-session and feature-flag data on AWS.' },
    ],
  },
  {
    id: 'cloud',
    label: 'CLOUD',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.35)',
    icon: <Cloud size={14} />,
    angle: 180,
    radius: 220,
    summary:
      'Provisioned and managed production infrastructure on AWS using EC2 auto-scaling groups, S3 lifecycle policies, SQS/SNS for async messaging, and IAM role-based access. Containerised every service with Docker and orchestrated deployments through Kubernetes with Helm charts and GitOps pipelines.',
    techs: [
      { name: 'AWS (EC2, S3, SQS, SNS)', detail: 'End-to-end cloud deployment: compute, storage, messaging, and notifications all on AWS.' },
      { name: 'Docker', detail: 'Containerised services with multi-stage Dockerfiles, reducing image size by 60%.' },
      { name: 'Kubernetes', detail: 'Managed cluster deployments with Helm, HPA, and pod disruption budgets for zero-downtime releases.' },
      { name: 'CI/CD', detail: 'Built pipelines with Jenkins and GitHub Actions covering build, test, SAST scan, and blue-green deploy.' },
    ],
  },
  {
    id: 'observability',
    label: 'OBSERVABILITY',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.35)',
    icon: <Activity size={14} />,
    angle: 240,
    radius: 220,
    summary:
      'Instrumented every service with Micrometer + Prometheus metrics, visualised SLI/SLO dashboards in Grafana, and shipped structured logs to the ELK Stack. Integrated distributed tracing (Jaeger/Zipkin) to pinpoint latency bottlenecks across service hops.',
    techs: [
      { name: 'Prometheus', detail: 'Scraped JVM and custom business metrics; wrote alerting rules for p99 latency and error-rate breaches.' },
      { name: 'Grafana', detail: 'Built 12+ dashboards tracking throughput, saturation, errors, and latency (RED method) per service.' },
      { name: 'Distributed Tracing', detail: 'Integrated OpenTelemetry SDK with Jaeger to trace requests across 8+ microservices.' },
      { name: 'ELK Stack', detail: 'Shipped structured JSON logs to Elasticsearch via Logstash; built Kibana dashboards for ops triage.' },
    ],
  },
  {
    id: 'ai-tools',
    label: 'AI & TOOLS',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.35)',
    icon: <Bot size={14} />,
    angle: 300,
    radius: 220,
    summary:
      "Accelerated delivery with AI pair-programming tools (GitHub Copilot, ChatGPT) while staying firmly in the driver's seat on architecture. Used Git/GitHub for trunk-based development, Maven/Gradle for build automation, and IntelliJ IDEA with a curated plugin stack for maximum productivity.",
    techs: [
      { name: 'GitHub Copilot', detail: 'Used daily for boilerplate generation and test scaffolding, increasing feature velocity by ~30%.' },
      { name: 'ChatGPT', detail: 'Prototyped algorithms, generated SQL explanations, and reviewed code for edge cases.' },
      { name: 'Git', detail: 'Managed mono-repo and multi-repo strategies with feature flags and conventional commits.' },
      { name: 'Maven / Gradle', detail: 'Maintained multi-module build configurations and published internal libraries to Nexus.' },
      { name: 'IntelliJ IDEA', detail: 'Primary IDE with custom live templates, code style profiles, and a curated plugin toolkit.' },
    ],
  },
];

// ─── SVG layout constants ─────────────────────────────────────────────────────

const CX = 380;
const CY = 380;
const VB = 760;
const CENTRAL_R = 52;
const NODE_R = 44;

function toXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

// ─── Animated data-flow line ──────────────────────────────────────────────────

function FlowLine({
  x1, y1, x2, y2, color, active,
}: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; active: boolean;
}) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={active ? 2 : 1}
        strokeOpacity={active ? 0.7 : 0.25}
      />
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={2.5}
        strokeOpacity={0.9}
        strokeDasharray={`${len * 0.18} ${len * 0.82}`}
        strokeDashoffset={0}
        style={{
          animation: 'data-flow 2.2s linear infinite',
          filter: `drop-shadow(0 0 4px ${color})`,
        }}
      />
    </g>
  );
}

// ─── Category node ────────────────────────────────────────────────────────────

function CategoryNode({
  cat, selected, onClick,
}: {
  cat: Category;
  selected: boolean;
  onClick: () => void;
}) {
  const pos = toXY(cat.angle, cat.radius);
  return (
    <motion.g
      onClick={onClick}
      style={{ cursor: 'pointer', transformOrigin: `${pos.x}px ${pos.y}px` }}
      whileHover={{ scale: 1.12 }}
      animate={{ scale: selected ? 1.1 : 1 }}
    >
      {selected && (
        <circle
          cx={pos.x} cy={pos.y} r={NODE_R + 10}
          fill="none"
          stroke={cat.color}
          strokeWidth={2}
          strokeOpacity={0.5}
          style={{ filter: 'blur(3px)' }}
        />
      )}
      <circle
        cx={pos.x} cy={pos.y} r={NODE_R}
        fill="rgba(5,10,15,0.92)"
        stroke={cat.color}
        strokeWidth={selected ? 2.5 : 1.5}
        style={{
          filter: selected
            ? `drop-shadow(0 0 14px ${cat.color})`
            : `drop-shadow(0 0 6px ${cat.glowColor})`,
        }}
      />
      <text
        x={pos.x} y={pos.y - 6}
        textAnchor="middle"
        fill={cat.color}
        fontSize={9}
        fontWeight={700}
        fontFamily="'JetBrains Mono', monospace"
        style={{ userSelect: 'none' }}
      >
        {cat.label}
      </text>
      <text
        x={pos.x} y={pos.y + 8}
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize={8}
        fontFamily="'Inter', sans-serif"
        style={{ userSelect: 'none' }}
      >
        {cat.techs.length} techs
      </text>
    </motion.g>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ cat, onClose }: { cat: Category; onClose: () => void }) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="glass-strong rounded-2xl p-6 flex flex-col gap-4 relative overflow-y-auto"
      style={{ border: `1px solid ${cat.color}40`, maxHeight: 560 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <div className="flex items-center gap-3">
        <span
          className="p-2 rounded-lg"
          style={{ background: `${cat.color}18`, color: cat.color }}
        >
          {cat.icon}
        </span>
        <h3
          className="text-lg font-bold font-mono-code tracking-wider"
          style={{ color: cat.color }}
        >
          {cat.label}
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-gray-400">{cat.summary}</p>

      <div className="flex flex-col gap-3">
        {cat.techs.map((t) => (
          <div
            key={t.name}
            className="rounded-xl p-3"
            style={{
              background: `${cat.color}08`,
              border: `1px solid ${cat.color}22`,
            }}
          >
            <p
              className="text-xs font-bold font-mono-code mb-1"
              style={{ color: cat.color }}
            >
              {t.name}
            </p>
            <p className="text-xs leading-relaxed text-gray-400">{t.detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Mobile accordion cards ───────────────────────────────────────────────────

function MobileCards() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4">
      {CATEGORIES.map((cat) => {
        const isOpen = open === cat.id;
        return (
          <motion.div
            key={cat.id}
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${cat.color}30` }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 transition-colors"
              style={{ background: isOpen ? `${cat.color}12` : 'rgba(10,18,32,0.7)' }}
              onClick={() => setOpen(isOpen ? null : cat.id)}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: cat.color }}>{cat.icon}</span>
                <span
                  className="font-bold font-mono-code text-sm tracking-widest"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-gray-500 text-base leading-none"
              >
                ▾
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-3 flex flex-col gap-3">
                    <p className="text-xs text-gray-400 leading-relaxed mb-1">
                      {cat.summary}
                    </p>
                    {cat.techs.map((t) => (
                      <div
                        key={t.name}
                        className="rounded-xl p-3"
                        style={{
                          background: `${cat.color}08`,
                          border: `1px solid ${cat.color}22`,
                        }}
                      >
                        <p
                          className="text-xs font-bold font-mono-code mb-1"
                          style={{ color: cat.color }}
                        >
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SystemsUniverse() {
  const [selected, setSelected] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const selectedCat = CATEGORIES.find((c) => c.id === selected) ?? null;

  const handleNodeClick = (id: string) =>
    setSelected((prev) => (prev === id ? null : id));

  return (
    <section
      id="systems"
      className="section relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* radial ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* headings */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400 opacity-50" />
            <span className="text-xs font-mono-code tracking-widest text-cyan-400 uppercase opacity-70">
              Architecture
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400 opacity-50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
            Systems Universe
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A map of every technology I've built production systems with
          </p>
        </motion.div>

        {/* ── Desktop SVG diagram ── */}
        <div className="hidden md:flex items-start gap-8">
          {/* SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
            style={{ width: 560 }}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VB} ${VB}`}
              width="100%"
              style={{ overflow: 'visible' }}
              aria-label="Systems Universe diagram"
            >
              {/* decorative rings */}
              <circle
                cx={CX} cy={CY} r={CATEGORIES[0].radius + 62}
                fill="none"
                stroke="rgba(0,212,255,0.05)"
                strokeWidth={1}
                strokeDasharray="6 4"
              />
              <circle
                cx={CX} cy={CY} r={CATEGORIES[0].radius - 55}
                fill="none"
                stroke="rgba(0,212,255,0.04)"
                strokeWidth={1}
                strokeDasharray="4 6"
              />

              {/* animated flow lines */}
              {CATEGORIES.map((cat) => {
                const pos = toXY(cat.angle, cat.radius);
                const dx = pos.x - CX;
                const dy = pos.y - CY;
                const dist = Math.hypot(dx, dy);
                const ux = dx / dist;
                const uy = dy / dist;
                return (
                  <FlowLine
                    key={cat.id}
                    x1={CX + ux * CENTRAL_R}
                    y1={CY + uy * CENTRAL_R}
                    x2={pos.x - ux * NODE_R}
                    y2={pos.y - uy * NODE_R}
                    color={cat.color}
                    active={selected === cat.id}
                  />
                );
              })}

              {/* category nodes */}
              {CATEGORIES.map((cat) => (
                <CategoryNode
                  key={cat.id}
                  cat={cat}
                  selected={selected === cat.id}
                  onClick={() => handleNodeClick(cat.id)}
                />
              ))}

              {/* central DEBASHIS node */}
              <g>
                <circle
                  cx={CX} cy={CY} r={CENTRAL_R + 18}
                  fill="none"
                  stroke="rgba(0,212,255,0.18)"
                  strokeWidth={1.5}
                  style={{ animation: 'pulse-blue 2.5s ease-in-out infinite' }}
                />
                <circle
                  cx={CX} cy={CY} r={CENTRAL_R + 34}
                  fill="none"
                  stroke="rgba(0,212,255,0.06)"
                  strokeWidth={1}
                  style={{ animation: 'pulse-blue 3.5s ease-in-out infinite' }}
                />
                <circle
                  cx={CX} cy={CY} r={CENTRAL_R}
                  fill="rgba(0,8,18,0.96)"
                  stroke="#00d4ff"
                  strokeWidth={2.5}
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.65))',
                  }}
                />
                <text
                  x={CX} y={CY - 6}
                  textAnchor="middle"
                  fill="#00d4ff"
                  fontSize={11}
                  fontWeight={800}
                  fontFamily="'JetBrains Mono', monospace"
                >
                  DEBASHIS
                </text>
                <text
                  x={CX} y={CY + 9}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.38)"
                  fontSize={8}
                  fontFamily="'Inter', sans-serif"
                >
                  Backend Systems
                </text>
              </g>
            </svg>
          </motion.div>

          {/* detail panel / hint */}
          <div className="flex-1 min-w-0 pt-4" style={{ minHeight: 420 }}>
            <AnimatePresence mode="wait">
              {selectedCat ? (
                <DetailPanel
                  key={selectedCat.id}
                  cat={selectedCat}
                  onClose={() => setSelected(null)}
                />
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-5 text-center pt-28"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.2)',
                    }}
                  >
                    <Activity size={28} style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Click any node on the diagram to explore technologies and how
                    they've been used in production systems.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: accordion list ── */}
        <div className="block md:hidden">
          <MobileCards />
        </div>

        {/* legend pills (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="hidden md:flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleNodeClick(cat.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code transition-all duration-200"
              style={{
                background:
                  selected === cat.id ? `${cat.color}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selected === cat.id ? cat.color : cat.color + '30'}`,
                color: cat.color,
              }}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
