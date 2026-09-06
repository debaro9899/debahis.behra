import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Zap, CheckCircle2, AlertTriangle, BarChart3, Users2, MapPin } from 'lucide-react';

interface ArchNode { label: string; }
interface ImpactMetric { value: string; label: string; }
interface Company {
  id: string;
  name: string;
  clientSubtitle?: string;
  role: string;
  years: string;
  location: string;
  teamContext?: string;
  tags: string[];
  headline: string;
  problem: string;
  archNodes: ArchNode[];
  impactMetrics: ImpactMetric[];
  impactSummary: string;
  bullets: string[];
  accentHex: string;
}

const companies: Company[] = [
  {
    id: 'arrise',
    name: 'ARRISE SOLUTIONS (INDIA) PVT. LTD',
    role: 'Software Engineer',
    years: 'Mar 2025 – Present',
    location: 'Hyderabad, India',
    teamContext: 'Core Platform Engineering Team (6+ Members) driving cloud-native architecture',
    tags: ['Java 17', 'Spring Boot', 'Apache Kafka', 'AWS Cloud', 'PostgreSQL', 'Redis', 'Docker/K8s', 'Prometheus'],
    headline: 'High-throughput cloud-native microservices & event-driven pipelines under <50ms SLAs',
    problem: 'Architecting high-concurrency, fault-tolerant backend services handling peak event volumes while maintaining strong multi-node consistency and sub-50ms latency.',
    archNodes: [
      { label: 'Client / API' },
      { label: 'Java 17 Microservices' },
      { label: 'Kafka Event Bus' },
      { label: 'Redis / PostgreSQL' },
      { label: 'Prometheus / Grafana' },
    ],
    impactMetrics: [
      { value: '<50ms', label: 'Strict SLA Latency' },
      { value: 'Java 17', label: 'Microservices' },
      { value: '-30%', label: 'Post-Release Defects' },
      { value: '6+ Eng', label: 'Core Team Connect' },
    ],
    impactSummary: '<50ms SLA Latency · Java 17 Cloud-Native Microservices · -30% Defects via TDD',
    bullets: [
      'Architected and developed high-throughput, fault-tolerant backend microservices and API-first distributed services using Java 17 and Spring Boot, handling high-concurrency workloads under strict sub-50ms latency SLAs.',
      'Built shared backend service libraries and reusable integration frameworks consumed across multiple platform teams, accelerating feature delivery and reducing code duplication.',
      'Engineered robust asynchronous data pipelines using Kafka, RabbitMQ, PostgreSQL, and Redis caching to process high-throughput event streams with strong multi-node data consistency.',
      'Implemented comprehensive system monitoring (Prometheus/Grafana), distributed tracing (Jaeger), and alerting — owning features from design through deployment and production support.',
      'Mentored junior engineers, led architectural code reviews, and established automated CI/CD testing guardrails (JUnit/Mockito), reducing post-release defects by 30%.',
      'Leveraged LLM-based coding tools (Copilot/ChatGPT) for rapid code generation and automated test scaffolding, rigorously validating AI output for production reliability.',
    ],
    accentHex: '#00d4ff',
  },
  {
    id: 'phonepe',
    name: 'PHONEPE (VIA CODEVYASA)',
    role: 'Backend Engineer',
    years: 'Jun 2024 – Feb 2025',
    location: 'Bangalore, India',
    teamContext: 'Central API Platform & Modernization Initiative',
    tags: ['Java 17', 'Dropwizard', 'Unified API Gateway', 'RESTful APIs', 'Microservices', 'TDD', 'Security'],
    headline: 'Unified API integration framework adopted across 20+ engineering teams & monolith modernization',
    problem: 'Standardizing disparate data access patterns across 20+ matrixed engineering teams and modernizing legacy monolithic services without breaking critical SLAs.',
    archNodes: [
      { label: '20+ Eng Teams' },
      { label: 'Unified API Gateway' },
      { label: 'Dropwizard Java 17' },
      { label: 'Auth & Validation' },
      { label: 'Data Layer' },
    ],
    impactMetrics: [
      { value: '20+', label: 'Teams Consuming Framework' },
      { value: '+25%', label: 'API Response Time' },
      { value: '+40%', label: 'Code Maintainability' },
      { value: '-30%', label: 'Defects via TDD' },
    ],
    impactSummary: '20+ Teams Integrated · +25% API Speed · +40% Maintainability · -30% Defects',
    bullets: [
      'Designed and delivered a secure, centralized REST API-first integration framework consumed by 20+ engineering teams, standardizing data access patterns and boosting developer velocity across a large matrixed SaaS organization.',
      'Drove system design discussions, authored comprehensive technical design documentation (LLD/HLD), and guided architectural trade-offs to ensure long-term scalability, security, and reliability.',
      'Refactored legacy monolithic services into clean, modular Java 17 microservices using Dropwizard, elevating codebase maintainability and readability by 40%.',
      'Enforced robust API authentication, access control, and strict input validation; reduced API response times by 25% and post-release defects by 30% through disciplined TDD practices and peer reviews.',
    ],
    accentHex: '#a855f7',
  },
  {
    id: 'verizon',
    name: 'AGREEYA SOLUTIONS',
    clientSubtitle: 'Client: Verizon',
    role: 'Backend Engineer',
    years: 'Jul 2023 – May 2024',
    location: 'Bangalore, India',
    teamContext: 'Enterprise Telecom Platform "Connect IT"',
    tags: ['Java', 'REST APIs', 'Plugin Architecture', 'OOA/OOD', 'AWS', 'Design Patterns', 'Cross-Team'],
    headline: 'Enterprise telecom platform engineering & extensible plugin architecture for Verizon "Connect IT"',
    problem: 'Enabling third-party service integration and custom business workflows on Verizon\'s enterprise telecom platform while maintaining strict carrier-grade reliability.',
    archNodes: [
      { label: 'Telecom Clients' },
      { label: 'Connect IT Core' },
      { label: 'Plugin Ext Layer' },
      { label: '3rd-Party Integrations' },
    ],
    impactMetrics: [
      { value: '+25%', label: 'User Engagement' },
      { value: '-30%', label: 'Post-Release Defects' },
      { value: 'Enterprise', label: 'Carrier Grade' },
    ],
    impactSummary: '+25% User Engagement Boost via Plugins · -30% Post-Release Defects · OOA/OOD Excellence',
    bullets: [
      'Developed scalable, modular Java backend services and RESTful APIs for Verizon\'s "Connect IT" enterprise platform, following OOA/OOD principles, design patterns, and cloud-native best practices.',
      'Designed a plugin-based extension layer for third-party service integration, increasing platform customizability and boosting user engagement and satisfaction by 25%.',
      'Conducted peer code reviews, expanded unit test automation, and collaborated across product, QA, and infra teams — achieving a 30% reduction in post-release defects.',
    ],
    accentHex: '#3b82f6',
  },
  {
    id: 'rakuten',
    name: 'RAKUTEN',
    role: 'Backend Engineer',
    years: 'Jun 2021 – Jun 2023',
    location: 'Indore, India',
    teamContext: 'Internal Change Management & Platform Automation',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL', 'Oracle', 'Python', 'Shell', 'CI/CD', 'GitLab'],
    headline: 'Automated backend workflow microservices & high-performance database schema optimization',
    problem: 'Automating multi-step approval pipelines for internal enterprise change management and tuning high-frequency database queries across relational stores.',
    archNodes: [
      { label: 'Workflow Requests' },
      { label: 'Spring Boot Engine' },
      { label: 'Approval Automation' },
      { label: 'Postgres / Oracle / MySQL' },
    ],
    impactMetrics: [
      { value: '+25%', label: 'Operational Efficiency' },
      { value: '+20%', label: 'Data Retrieval Speed' },
      { value: '3 DBMS', label: 'Schema Optimization' },
    ],
    impactSummary: '+25% Operational Efficiency · +20% Query Performance · Schema Tuning (PostgreSQL/Oracle/MySQL)',
    bullets: [
      'Engineered backend microservices and automated approval workflows for an internal Change Management platform using Java, Spring Boot, and REST APIs, improving operational efficiency by 25%.',
      'Designed relational schemas (PostgreSQL/MySQL/Oracle) and optimized high-frequency queries with proper indexing, improving data retrieval performance and storage efficiency by 20%.',
      'Wrote Python and Shell scripts for operational task automation in Unix/Linux; actively participated in Agile/Scrum ceremonies and maintained source code configuration in Git/GitLab.',
    ],
    accentHex: '#f59e0b',
  },
];

function ArchDiagram({ nodes, accentHex }: { nodes: ArchNode[]; accentHex: string }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-center gap-1.5">
          <div
            className="px-2.5 py-1 rounded text-xs font-mono font-semibold border whitespace-nowrap shadow-sm"
            style={{
              borderColor: `${accentHex}55`,
              backgroundColor: `${accentHex}12`,
              color: accentHex,
              boxShadow: `0 0 10px ${accentHex}20`,
            }}
          >
            {node.label}
          </div>
          {i < nodes.length - 1 && (
            <span style={{ color: accentHex, opacity: 0.6, fontSize: 13 }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ImpactBadge({ value, label, accentHex }: { value: string; label: string; accentHex: string }) {
  return (
    <div
      className="flex flex-col items-center px-4 py-2.5 rounded-lg border text-center min-w-[90px]"
      style={{ borderColor: `${accentHex}40`, backgroundColor: `${accentHex}0e` }}
    >
      <span className="font-mono font-bold text-lg leading-tight" style={{ color: accentHex }}>
        {value}
      </span>
      <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">{label}</span>
    </div>
  );
}

function TimelineCard({ company, index }: { company: Company; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Glowing timeline dot */}
      <div
        className="absolute -left-[25px] top-6 w-3 h-3 rounded-full border-2 z-10"
        style={{
          borderColor: company.accentHex,
          backgroundColor: company.accentHex,
          boxShadow: `0 0 10px ${company.accentHex}, 0 0 20px ${company.accentHex}66`,
        }}
      />

      {/* Card */}
      <div
        className="glass rounded-xl overflow-hidden border-l-4 transition-all duration-300"
        style={{
          borderLeftColor: company.accentHex,
          boxShadow: open ? `0 0 30px ${company.accentHex}20` : undefined,
        }}
      >
        {/* Header Toggle */}
        <button onClick={() => setOpen((v) => !v)} className="w-full text-left px-5 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="text-base sm:text-lg font-bold tracking-wide font-mono" style={{ color: company.accentHex }}>
                  {company.name}
                </h3>
                {company.clientSubtitle && (
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                    {company.clientSubtitle}
                  </span>
                )}
                <span className="text-gray-400 text-xs font-mono border border-white/10 px-2 py-0.5 rounded">
                  {company.years}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 mb-2">
                <span className="font-semibold text-white text-sm">{company.role}</span>
                <span className="text-gray-500 flex items-center gap-1">
                  <MapPin size={12} /> {company.location}
                </span>
                {company.teamContext && (
                  <span className="text-cyan-400/90 flex items-center gap-1 font-mono text-[11px] bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                    <Users2 size={12} /> {company.teamContext}
                  </span>
                )}
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed hidden sm:block">
                {company.headline}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-start text-xs font-mono" style={{ color: company.accentHex }}>
              <span>{open ? 'Hide details' : 'View impact'}</span>
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {company.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border"
                style={{
                  borderColor: `${company.accentHex}35`,
                  backgroundColor: `${company.accentHex}0d`,
                  color: company.accentHex,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {!open && (
            <p className="text-[11px] text-gray-400 mt-3 font-mono flex items-center gap-1.5">
              <BarChart3 size={12} className="text-cyan-400" />
              {company.impactSummary}
            </p>
          )}
        </button>

        {/* Expanded View */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-white/5">
                <p className="text-gray-300 text-sm leading-relaxed pt-4">
                  {company.headline}
                </p>

                {/* Problem Statement */}
                <div
                  className="flex gap-3 p-3.5 rounded-lg border"
                  style={{ borderColor: `${company.accentHex}25`, backgroundColor: `${company.accentHex}08` }}
                >
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" style={{ color: company.accentHex }} />
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      Engineering Problem & Scope
                    </p>
                    <p className="text-xs text-white leading-relaxed">{company.problem}</p>
                  </div>
                </div>

                {/* Architecture Diagram */}
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
                    <Zap size={12} style={{ color: company.accentHex }} /> System Architecture Flow
                  </p>
                  <div
                    className="p-3.5 rounded-lg border overflow-x-auto"
                    style={{ borderColor: `${company.accentHex}22`, backgroundColor: `${company.accentHex}06` }}
                  >
                    <ArchDiagram nodes={company.archNodes} accentHex={company.accentHex} />
                  </div>
                </div>

                {/* Impact Metrics */}
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
                    <BarChart3 size={12} style={{ color: company.accentHex }} /> Measured Production Impact
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {company.impactMetrics.map((m) => (
                      <ImpactBadge key={m.label} value={m.value} label={m.label} accentHex={company.accentHex} />
                    ))}
                  </div>
                </div>

                {/* Verified Contributions */}
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-2.5">
                    Verified Key Contributions (From Master Resume)
                  </p>
                  <ul className="space-y-2.5">
                    {company.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 items-start">
                        <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" style={{ color: company.accentHex }} />
                        <span className="text-xs text-gray-200 leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function EngineeringJourney() {
  return (
    <section className="section relative py-24 px-4 sm:px-6" id="journey">
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 mb-3">
            VERIFIED WORK EXPERIENCE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            <span className="gradient-text">Engineering Journey</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Real architectural decisions, high-concurrency systems, and quantified production outcomes grounded in 5+ years of verified backend engineering experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-7 sm:pl-8">
          <div
            className="absolute left-0 top-4 bottom-4 w-px"
            style={{
              background: 'linear-gradient(to bottom, #00d4ff, #a855f7 40%, #3b82f6 70%, #f59e0b)',
              boxShadow: '0 0 12px rgba(0,212,255,0.5)',
            }}
          />
          <div className="space-y-6">
            {companies.map((company, index) => (
              <TimelineCard key={company.id} company={company} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
