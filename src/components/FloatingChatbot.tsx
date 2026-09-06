import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, ChevronDown } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['team', '20+', 'framework', 'gateway'],
    answer:
      'At PhonePe (via Codevyasa), Debashis designed and delivered a secure, centralized REST API-first integration framework consumed by 20+ engineering teams, standardizing data access patterns and elevating developer productivity. At Arrise, he is currently contributing to high-impact cloud-native microservices with a core engineering team of 6+ members.',
  },
  {
    keywords: ['distributed', 'systems', 'scale', 'high availability', 'fault'],
    answer:
      'Debashis has 5+ years of experience architecting fault-tolerant distributed systems. He designs asynchronous event pipelines with Kafka and RabbitMQ, enforces multi-node consistency, implements distributed Redis caching, and maintains strict sub-50ms latency SLAs under peak production loads.',
  },
  {
    keywords: ['kafka', 'event', 'rabbitmq', 'stream'],
    answer:
      'He engineered high-throughput Kafka and RabbitMQ pipelines across Arrise Solutions and PhonePe. His work includes partition key ordering strategies, consumer group auto-scaling, dead-letter queue (DLQ) retry topologies, and ensuring exactly-once business semantics with idempotency keys.',
  },
  {
    keywords: ['latency', 'sla', '50ms', 'performance'],
    answer:
      'He has maintained strict sub-50ms production latency SLAs by combining L1 in-memory Caffeine caching, L2 distributed Redis Cluster, composite database indexing, asynchronous write offloading with Kafka, and eliminating synchronous round-trips.',
  },
  {
    keywords: ['why hire', 'interview', 'senior', 'role', 'impact'],
    answer:
      'Debashis combines deep technical architecture with proven business impact: 20+ engineering teams integrated, 30% reduction in post-release defects through TDD, 25% API response time gains, and features contributing to 20%+ business revenue growth. He owns systems end-to-end from technical design through production deployment.',
  },
  {
    keywords: ['arrise', 'current', 'hyderabad'],
    answer:
      'At Arrise Solutions (Mar 2025 – Present, Hyderabad), Debashis architects high-concurrency microservices in Java 17 and Spring Boot under <50ms SLAs, builds reusable backend service libraries, and engineers asynchronous event pipelines with Kafka and Redis alongside a core platform team of 6+ engineers.',
  },
  {
    keywords: ['phonepe', 'codevyasa', 'fintech'],
    answer:
      'At PhonePe via Codevyasa (Jun 2024 – Feb 2025, Bangalore), he designed a unified REST API framework consumed by 20+ engineering teams, refactored monolithic services into modular Java 17 Dropwizard microservices (improving maintainability by 40%), and reduced defects by 30%.',
  },
  {
    keywords: ['verizon', 'agreeya', 'connect it', 'plugin'],
    answer:
      'At AgreeYa Solutions for client Verizon (Jul 2023 – May 2024), he built carrier-grade RESTful backend services for the "Connect IT" enterprise platform and designed an extensible plugin architecture that boosted user engagement by 25%.',
  },
  {
    keywords: ['rakuten', 'database', 'schema', 'oracle', 'workflow'],
    answer:
      'At Rakuten (Jun 2021 – Jun 2023), he developed automated Change Management workflow microservices improving operational efficiency by 25%, and optimized complex relational schemas across PostgreSQL, MySQL, and Oracle to boost data retrieval speed by 20%.',
  },
  {
    keywords: ['dsa', 'data structures', 'algorithms', 'lld', 'system design'],
    answer:
      'Debashis has strong algorithmic foundations in data structures and concurrent programming: thread-safe LRU caches with lock-striping, sliding-window rate limiters with Redis, consistent hashing rings with virtual nodes, lock-free ringbuffers, and distributed Saga patterns.',
  },
  {
    keywords: ['contact', 'email', 'linkedin', 'hire'],
    answer:
      'You can reach Debashis directly at debashis9899@gmail.com or connect on LinkedIn at linkedin.com/in/debashis99/. He is actively open to Senior Backend and Distributed Systems Engineering roles.',
  },
];

function getChatResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return item.answer;
    }
  }
  return "Debashis is a Senior Backend & Distributed Systems Engineer with 5+ years experience spanning Arrise Solutions, PhonePe, Verizon (AgreeYa), and Rakuten. His core stack is Java 17, Spring Boot, Kafka, AWS, Kubernetes, Redis, and PostgreSQL. Feel free to ask about his 20+ teams API framework, Kafka pipelines, or DSA & System Design foundations!";
}

const PROMPT_CHIPS = [
  'Why hire for Senior Backend?',
  'Tell me about the 20+ teams framework',
  'How does he maintain <50ms SLAs?',
  'Kafka & Distributed Systems experience',
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'ai',
      text: "👋 Hi! I'm Debashis AI. Ask me anything about Debashis's engineering background, verified achievements, or systems architecture.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll when messages change
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = { id: String(Date.now()), role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getChatResponse(query);
      const aiMsg: ChatMessage = { id: String(Date.now() + 1), role: 'ai', text: responseText };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating greeting bubble when closed */}
      {!isOpen && showGreeting && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="mb-3 mr-1 relative glass-strong px-4 py-2.5 rounded-2xl rounded-br-sm border border-cyan-400/40 shadow-xl shadow-cyan-950/60 max-w-[260px] cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            setShowGreeting(false);
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGreeting(false);
            }}
            className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center text-[10px]"
          >
            ✕
          </button>
          <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-mono font-bold mb-0.5">
            <Sparkles size={13} className="text-cyan-400" />
            <span>Ask Debashis AI</span>
          </div>
          <p className="text-xs text-gray-300 leading-snug">
            30-sec recruiter questions or deep architecture details? Click to chat!
          </p>
        </motion.div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            setIsOpen(true);
            setShowGreeting(false);
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center border-2 border-cyan-300/40 relative group"
          aria-label="Open Debashis AI Chatbot"
        >
          <span className="status-dot absolute top-1 right-1 border-2 border-[#050a0f]" />
          <Bot size={26} className="group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>
      )}

      {/* Expanded Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] rounded-2xl glass-strong border border-cyan-400/40 shadow-2xl shadow-cyan-950/70 flex flex-col overflow-hidden"
            style={{ background: 'rgba(8, 14, 26, 0.97)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Debashis AI</h4>
                  <div className="flex items-center gap-1 text-[11px] text-green-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>Grounded in Resume</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Minimize Chatbot"
                >
                  <ChevronDown size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Chatbot"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                      DB
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[82%] ${
                      m.role === 'user'
                        ? 'bg-cyan-500/20 border border-cyan-400/40 text-white rounded-br-none'
                        : 'bg-white/5 border border-white/10 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono p-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] text-gray-400">Analyzing engineering background...</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-white/5 bg-black/20 flex gap-1.5 overflow-x-auto no-scrollbar">
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/40 text-gray-300 hover:text-cyan-300 transition-colors flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Row */}
            <div className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about 20+ teams, Kafka, DSA..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-lg bg-cyan-500 text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
