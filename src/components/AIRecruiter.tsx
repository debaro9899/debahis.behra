import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const getAIResponse = (input: string): string => {
  const q = input.toLowerCase();
  if (q.includes('20+') || q.includes('framework') || q.includes('gateway')) {
    return 'At PhonePe (via Codevyasa), Debashis designed and delivered a secure, centralized REST API-first integration framework consumed by 20+ engineering teams, standardizing data access patterns and boosting developer productivity. At Arrise, he works with a core platform engineering team of 6+ members.';
  }
  if (q.includes('arrise') || q.includes('current') || q.includes('hyderabad')) {
    return 'At Arrise Solutions (Mar 2025 – Present, Hyderabad), Debashis architects high-throughput, fault-tolerant backend microservices in Java 17 and Spring Boot under strict sub-50ms SLAs, building reusable backend libraries and Kafka event pipelines alongside a core team of 6+ members.';
  }
  if (q.includes('phonepe') || q.includes('codevyasa')) {
    return 'At PhonePe via Codevyasa (Jun 2024 – Feb 2025, Bangalore), Debashis delivered the centralized API gateway for 20+ engineering teams, refactored monolithic services into modular Java 17 Dropwizard microservices (+40% maintainability), and reduced post-release defects by 30%.';
  }
  if (q.includes('verizon') || q.includes('agreeya') || q.includes('connect it')) {
    return 'At AgreeYa Solutions for client Verizon (Jul 2023 – May 2024), Debashis engineered carrier-grade backend services for Verizon\'s "Connect IT" enterprise platform and designed an extensible plugin architecture that boosted user engagement by 25%.';
  }
  if (q.includes('rakuten')) {
    return 'At Rakuten (Jun 2021 – Jun 2023), he built automated approval workflows for an internal Change Management platform (+25% operational efficiency) and tuned relational schemas across PostgreSQL, MySQL, and Oracle (+20% query retrieval speed).';
  }
  if (q.includes('dsa') || q.includes('data structure') || q.includes('algorithm') || q.includes('lld')) {
    return 'Debashis has strong computer science foundations in Data Structures & Algorithms, concurrent programming, and low-level design: thread-safe LRU caching with lock-striping, sliding-window rate limiters with Redis, consistent hashing with virtual nodes, and distributed Saga patterns.';
  }
  if (q.includes('distributed')) {
    return 'Debashis has 5+ years of backend engineering with fault-tolerant microservices, distributed caching with Redis, async event processing with Kafka/RabbitMQ, and high-availability architecture design. He has maintained <50ms latency SLAs across production systems.';
  }
  if (q.includes('kafka') || q.includes('event')) {
    return 'He has built event-driven architectures using Apache Kafka and RabbitMQ across Arrise Solutions and PhonePe. His work includes high-throughput pipelines, consumer group management, dead-letter queue handling, and async processing for payment systems processing millions of events.';
  }
  if (q.includes('senior') || q.includes('why hire') || q.includes('interview')) {
    return 'Debashis combines 5+ years of backend architecture experience with measurable business impact: 20+ engineering teams consuming his framework, 30% defect reduction, 25% API performance gains, and 20% revenue contribution. He has senior-level ownership across design, implementation, observability, and production support.';
  }
  if (q.includes('cloud') || q.includes('aws') || q.includes('kubernetes')) {
    return 'He has hands-on experience with AWS, Docker containerization, Kubernetes orchestration, and CI/CD automation pipelines. He builds resilient cloud-native systems with Prometheus, Grafana, and Jaeger distributed tracing.';
  }
  if (q.includes('system design') || q.includes('architecture')) {
    return 'Debashis approaches system design starting from scale requirements and SLA targets, then chooses appropriate patterns: synchronous REST for low-latency reads, async Kafka/RabbitMQ for high-throughput events, Redis for caching, PostgreSQL/MongoDB for persistence. He has designed systems handling millions of daily transactions.';
  }
  if (q.includes('java') || q.includes('spring')) {
    return 'Java and Spring Boot are his primary stack. He has 5+ years building production microservices with Java (8/11/17), Spring Boot, Spring Data JPA, Spring Security, and Dropwizard. His expertise includes concurrent programming, JVM tuning, and performance optimization.';
  }
  if (q.includes('test') || q.includes('quality') || q.includes('defect')) {
    return 'He practices Test-Driven Development (TDD) with JUnit, Mockito, and integration test frameworks. His testing approach reduced post-release defects by 30% across multiple companies.';
  }
  return "Debashis is a Senior Backend & Distributed Systems Engineer with 5+ years experience spanning Arrise Solutions, PhonePe, Verizon (AgreeYa), and Rakuten. His core expertise is distributed systems, cloud-native microservices, event-driven architecture with Kafka/RabbitMQ, and performance engineering. What area would you like to explore?";
};

const SUGGESTED = [
  'Does Debashis know distributed systems?',
  'Tell me about Kafka experience',
  'Why hire for Senior Backend role?',
  'What cloud platforms has he used?',
  'How does he approach system design?',
];

const TypingIndicator: React.FC = () => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2 mb-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
         style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', boxShadow: '0 0 12px rgba(0,212,255,0.4)' }}>DB</div>
    <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: 'rgba(10,18,32,0.9)', border: '1px solid rgba(0,212,255,0.2)' }}>
      <span className="flex gap-1 items-center h-4">
        {[0, 1, 2].map(i => (
          <motion.span key={i} className="block w-1.5 h-1.5 rounded-full bg-cyan-400"
                       animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </span>
    </div>
  </motion.div>
);

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
             style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', boxShadow: '0 0 12px rgba(0,212,255,0.4)' }}>DB</div>
      )}
      <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${isUser ? 'rounded-2xl rounded-br-sm text-white' : 'rounded-2xl rounded-bl-sm text-gray-200'}`}
           style={isUser
             ? { background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,120,255,0.15))', border: '1px solid rgba(0,212,255,0.3)' }
             : { background: 'rgba(10,18,32,0.9)', border: '1px solid rgba(0,212,255,0.15)' }}>
        {message.text}
      </div>
    </motion.div>
  );
};

const AIRecruiter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'init', role: 'ai',
    text: "Hi! I'm Debashis AI 👋 — grounded in his real experience. Ask me anything about his skills, projects, or why he'd be a great fit for your team.",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: Message = { id: `a-${Date.now()}`, role: 'ai', text: getAIResponse(text), timestamp: new Date() };
      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <section className="py-20 px-4" id="ai">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.6 }} className="text-center mb-10">
          <span className="font-mono text-sm text-cyan-400 tracking-widest uppercase">AI Assistant</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-3 gradient-text">Ask Debashis AI 🤖</h2>
          <p className="text-gray-400 text-base">Grounded in real experience. No hallucinations.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }} className="rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(8,14,28,0.95)', border: '1px solid rgba(0,212,255,0.25)', boxShadow: '0 0 40px rgba(0,212,255,0.08), 0 0 80px rgba(124,58,237,0.06)' }}>
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(0,212,255,0.12)', background: 'rgba(0,0,0,0.3)' }}>
            <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
            <span className="ml-3 text-xs text-gray-500 font-mono tracking-widest uppercase">debashis-ai — recruiter terminal</span>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="overflow-y-auto px-4 pt-4 pb-2" style={{ maxHeight: '400px', scrollbarWidth: 'thin' }}>
            <AnimatePresence initial={false}>
              {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
              {isTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>
          </div>

          {/* Suggested chips */}
          <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => sendMessage(q)} disabled={isTyping}
                      className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 disabled:opacity-40"
                      style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.2)', color: '#67e8f9' }}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ borderColor: 'rgba(0,212,255,0.12)' }}>
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                   placeholder="Ask me about Debashis…" disabled={isTyping}
                   className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none disabled:opacity-50" />
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => sendMessage(input)}
                           disabled={!input.trim() || isTyping}
                           className="flex items-center justify-center w-9 h-9 rounded-full disabled:opacity-30"
                           style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', boxShadow: '0 0 12px rgba(0,212,255,0.3)' }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
        <p className="text-center text-xs text-gray-600 mt-4">Responses are based on Debashis's real résumé & experience.</p>
      </div>
    </section>
  );
};

export default AIRecruiter;
