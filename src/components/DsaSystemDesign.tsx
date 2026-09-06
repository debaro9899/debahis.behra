import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Network, Layers, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface TopicItem {
  id: string;
  title: string;
  badge: string;
  complexity: string;
  concept: string;
  implementation: string;
  tradeoffs: string;
  codeSnippet: string;
}

const DSA_TOPICS: TopicItem[] = [
  {
    id: 'lru-cache',
    title: 'Thread-Safe LRU Cache with Lock-Striping',
    badge: 'Data Structures & Concurrency',
    complexity: 'O(1) Get · O(1) Put',
    concept:
      'Combines a Doubly-Linked List (for eviction ordering) with a ConcurrentHashMap (for O(1) lookups). In high-concurrency backend services, standard synchronized locks cause contention. Lock-striping or ReadWriteLock allows multiple threads to read concurrently while isolating write updates to specific buckets.',
    implementation:
      'Implemented in Java using ReentrantReadWriteLock over segmented nodes. When capacity is exceeded, the least recently used node from tail is evicted in O(1) and purged from the lookup map.',
    tradeoffs:
      'Space vs Latency: Maintains two pointers per node plus map references. Yields predictable <1ms access times under high concurrent read loads.',
    codeSnippet: `// Thread-Safe LRU Segment Concept
class LRUNode<K, V> {
    K key; V val;
    LRUNode<K, V> prev, next;
}
public V get(K key) {
    readLock.lock();
    try {
        LRUNode<K, V> node = map.get(key);
        if (node == null) return null;
        moveToHeadAsync(node); // O(1)
        return node.val;
    } finally { readLock.unlock(); }
}`,
  },
  {
    id: 'rate-limiter',
    title: 'Sliding Window Counter & Token Bucket',
    badge: 'Algorithms & API Security',
    complexity: 'O(log N) Redis ZSet / O(1) Memory',
    concept:
      'Protects downstream microservices against traffic spikes and DDoS attacks. Unlike fixed-window counters that allow 2x bursts at boundaries, sliding-window log uses Redis sorted sets with timestamped scores to accurately rate-limit across rolling 1-minute windows.',
    implementation:
      'Atomic Redis Lua script removes timestamps older than (now - window), counts remaining members via ZCARD, and appends the current request only if count < limit.',
    tradeoffs:
      'Memory footprint of timestamp logs vs precision. For ultra-high throughput (>50k req/s), token bucket with atomic decrement is chosen to keep memory O(1).',
    codeSnippet: `-- Atomic Redis Rate-Limiter (Lua)
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

redis.call('ZREMRANGEBYSCORE', key, 0, now - window)
local current = redis.call('ZCARD', key)
if current < limit then
    redis.call('ZADD', key, now, now)
    return 1 -- Allowed
else
    return 0 -- Throttled (429)
end`,
  },
  {
    id: 'consistent-hashing',
    title: 'Consistent Hashing Ring with Virtual Nodes',
    badge: 'Distributed Systems & Hashing',
    complexity: 'O(log K) Lookup via TreeMap',
    concept:
      'Standard modulo hashing (hash(key) % N) causes massive cache invalidation (~99% keys moved) whenever a node is added or removed. Consistent hashing maps both servers and keys onto a 360° ring [0, 2^32 - 1]. Adding a node only redistributes K/N keys.',
    implementation:
      'Used MurmurHash3 to hash node identifiers into a TreeMap in Java. Added 100-150 virtual nodes per physical host to ensure balanced partition distribution and prevent hotspot skew.',
    tradeoffs:
      'Virtual node bookkeeping overhead vs variance reduction. Delivers smooth linear rebalancing during autoscaling events.',
    codeSnippet: `// Consistent Hash Ring in Java
private final SortedMap<Integer, String> ring = new TreeMap<>();
private final int virtualNodes = 128;

public void addNode(String server) {
    for (int i = 0; i < virtualNodes; i++) {
        int hash = hashFunc(server + "#" + i);
        ring.put(hash, server);
    }
}
public String getNode(String key) {
    if (ring.isEmpty()) return null;
    int hash = hashFunc(key);
    SortedMap<Integer, String> tail = ring.tailMap(hash);
    int targetHash = tail.isEmpty() ? ring.firstKey() : tail.firstKey();
    return ring.get(targetHash); // O(log K)
}`,
  },
  {
    id: 'bounded-queue',
    title: 'Lock-Free RingBuffer & Bounded Queue',
    badge: 'Low-Level Concurrency',
    complexity: 'O(1) Enqueue / Dequeue',
    concept:
      'High-throughput asynchronous event ingestion between thread boundaries without lock contention or thread sleep overheads. Utilizes memory barriers and AtomicLong sequence counters.',
    implementation:
      'Employs power-of-2 buffer sizing with bitwise modulo (sequence & (capacity - 1)) and padding to avoid CPU cache line false sharing (Cache Line Ping-Pong).',
    tradeoffs:
      'Fixed capacity limits require explicit backpressure policy (drop, caller-runs, or dead-letter queue) when consumers slow down.',
    codeSnippet: `// Cache-line aligned sequence padding
public class Sequence {
    // 56 bytes padding to prevent False Sharing
    protected long p1, p2, p3, p4, p5, p6, p7;
    protected volatile long value;
    protected long p8, p9, p10, p11, p12, p13, p14;
    
    public boolean compareAndSet(long expected, long update) {
        return UNSAFE.compareAndSwapLong(this, VALUE_OFFSET, expected, update);
    }
}`,
  },
];

const LLD_TOPICS: TopicItem[] = [
  {
    id: 'plugin-pattern',
    title: 'Extensible Plugin & Extension Architecture',
    badge: 'Design Patterns · Used at Verizon',
    complexity: 'Open-Closed Principle (SOLID)',
    concept:
      'On Verizon’s "Connect IT" platform, third-party integrations needed to be added dynamically without modifying core enterprise platform services. Applied the Strategy + Plugin Provider pattern with dependency injection.',
    implementation:
      'Defined strict interface contracts (PluginSPI). Third-party vendors register plugins via metadata descriptors; Spring discovers and injects plugins into the pipeline dynamically.',
    tradeoffs:
      'Requires strict contract versioning and sandboxed error isolation so faulty plugins do not degrade core platform availability.',
    codeSnippet: `public interface IntegrationPlugin {
    String getProviderId();
    PluginResponse execute(PluginContext ctx) throws PluginException;
    boolean supports(EventType event);
}

@Service
public class PluginRegistry {
    private final Map<String, IntegrationPlugin> plugins = new ConcurrentHashMap<>();
    
    public PluginResponse dispatch(String provider, PluginContext ctx) {
        return Optional.ofNullable(plugins.get(provider))
            .orElseThrow(() -> new ProviderNotFoundException(provider))
            .execute(ctx);
    }
}`,
  },
  {
    id: 'saga-pattern',
    title: 'Distributed Saga: Orchestration vs Choreography',
    badge: 'Distributed Transactions',
    complexity: 'Eventually Consistent (BASE)',
    concept:
      'In microservice architectures, 2-Phase Commit (2PC) creates synchronous lock bottlenecks and availability anti-patterns across services. The Saga pattern breaks multi-service workflows into local ACID transactions with compensatory rollbacks.',
    implementation:
      'For complex payment workflows at PhonePe, orchestrator services emit state-change events over Kafka/RabbitMQ. If an inventory or ledger step fails, compensating events trigger automatic refunds and rollback transactions.',
    tradeoffs:
      'Eventual consistency requires idempotent event handlers and handling transient dirty reads via pending-state markers.',
    codeSnippet: `// Saga Step with Compensation Definition
public interface SagaStep<T> {
    CompletableFuture<StepResult> execute(T context);
    CompletableFuture<Void> compensate(T context);
}

// Orchestrator executes steps sequentially:
// On Step[i] failure -> triggers compensate() on Step[i-1] down to Step[0]`,
  },
  {
    id: 'circuit-breaker',
    title: 'Circuit Breaker with Graceful Degradation',
    badge: 'Fault Tolerance & Resilience',
    complexity: 'State Machine: Closed -> Open -> Half-Open',
    concept:
      'Cascading failures occur when a slow downstream dependency consumes thread pools across upstream services. Circuit breakers detect failure rates exceeding thresholds (e.g. >50% timeouts in 10s) and fast-fail subsequent calls immediately.',
    implementation:
      'Integrated Resilience4j with Micrometer metrics. Fast-fails with cached fallback or default response while periodically probing health in half-open state.',
    tradeoffs:
      'Fallbacks must provide acceptable degraded user experience rather than silent data corruption.',
    codeSnippet: `@CircuitBreaker(name = "paymentService", fallbackMethod = "cachedFallback")
@Retry(name = "paymentRetry")
public PaymentResponse processTransaction(PaymentRequest req) {
    return restTemplate.postForObject(PAYMENT_URL, req, PaymentResponse.class);
}

public PaymentResponse cachedFallback(PaymentRequest req, Throwable t) {
    log.warn("Payment service degraded, routing to async retry queue: {}", t.getMessage());
    return PaymentResponse.queued(req.getTransactionId());
}`,
  },
];

const HLD_TOPICS: TopicItem[] = [
  {
    id: 'sub50ms-sla',
    title: 'Architecting for Sub-50ms Latency SLAs',
    badge: 'High-Level Design & Scaling',
    complexity: 'p99 Latency Optimization',
    concept:
      'Maintaining sub-50ms API response times across high-concurrency systems requires minimizing network round-trips, eliminating synchronous database writes on critical read paths, and leveraging layered caching.',
    implementation:
      'L1 in-memory Caffeine cache (sub-millisecond) + L2 distributed Redis Cluster (1-2ms) + asynchronous Kafka event pipeline for write offloading. Database queries tuned with covering composite indexes and query execution plan analysis.',
    tradeoffs:
      'Cache invalidation complexity. Addressed using TTLs combined with Kafka cache-invalidation pub/sub topics.',
    codeSnippet: `// Layered Cache Pattern (L1 -> L2 -> DB)
public UserProfile getProfile(String userId) {
    return l1Cache.get(userId, k -> {
        UserProfile cached = redisCluster.get(userId);
        if (cached != null) return cached;
        UserProfile dbData = userRepository.findById(userId)
            .orElseThrow();
        redisCluster.setex(userId, 300, dbData);
        return dbData;
    });
}`,
  },
  {
    id: 'idempotency-keys',
    title: 'Idempotency & At-Least-Once Delivery',
    badge: 'Data Integrity & Consistency',
    complexity: 'Exactly-Once Business Semantics',
    concept:
      'Kafka and RabbitMQ guarantee at-least-once delivery; network partitions or consumer restarts can deliver identical events twice. Without idempotency, duplicate payments or order creation would occur.',
    implementation:
      'Every client request provides a unique UUID idempotency key. A Redis SETNX lock reserves the key during execution; the final response payload is persisted with a 24-hour TTL to return identical results for repeated calls.',
    tradeoffs:
      'Storage overhead for deduplication records vs absolute prevention of duplicate financial transactions.',
    codeSnippet: `// Distributed Idempotency Guard
public TransactionResult executeIdempotent(String idempotencyKey, Supplier<TransactionResult> action) {
    boolean acquired = redis.setIfAbsent("lock:" + idempotencyKey, "LOCKED", 60, TimeUnit.SECONDS);
    if (!acquired) {
        return fetchExistingResult(idempotencyKey);
    }
    try {
        TransactionResult result = action.get();
        saveResult(idempotencyKey, result);
        return result;
    } finally {
        redis.delete("lock:" + idempotencyKey);
    }
}`,
  },
];

export default function DsaSystemDesign() {
  const [activeTab, setActiveTab] = useState<'dsa' | 'lld' | 'hld'>('dsa');
  const [selectedTopic, setSelectedTopic] = useState<TopicItem>(DSA_TOPICS[0]);

  const topics =
    activeTab === 'dsa' ? DSA_TOPICS : activeTab === 'lld' ? LLD_TOPICS : HLD_TOPICS;

  const handleTabChange = (tab: 'dsa' | 'lld' | 'hld') => {
    setActiveTab(tab);
    if (tab === 'dsa') setSelectedTopic(DSA_TOPICS[0]);
    if (tab === 'lld') setSelectedTopic(LLD_TOPICS[0]);
    if (tab === 'hld') setSelectedTopic(HLD_TOPICS[0]);
  };

  return (
    <section id="systems-dsa" className="section relative overflow-hidden py-24 px-4 sm:px-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 mb-3">
            <Cpu size={13} />
            ENGINEERING DEPTH · DATA STRUCTURES & SYSTEM DESIGN
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            <span className="gradient-text">Systems, DSA & LLD Architecture</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            How I apply rigorous algorithmic foundations, concurrent programming patterns, and distributed system trade-offs to build production systems that survive peak load.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
          {[
            { id: 'dsa' as const, label: 'Data Structures & Concurrency', icon: <Cpu size={15} /> },
            { id: 'lld' as const, label: 'Low-Level Design (LLD)', icon: <Layers size={15} /> },
            { id: 'hld' as const, label: 'Distributed Systems (HLD)', icon: <Network size={15} /> },
          ].map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-lg shadow-cyan-950/50'
                    : 'glass text-gray-400 hover:text-white border-white/5'
                }`}
              >
                {t.icon}
                <span className="hidden xs:inline">{t.label}</span>
                <span className="xs:hidden">{t.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Topic List */}
          <div className="lg:col-span-4 space-y-3">
            {topics.map((item) => {
              const isSelected = selectedTopic.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedTopic(item)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-400/50 shadow-md shadow-cyan-950/40'
                      : 'glass border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">{item.badge}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                      {item.complexity}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                    <span>Explore architecture</span>
                    <ChevronRight size={12} className={isSelected ? 'text-cyan-400' : 'text-gray-600'} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep Architectural Breakdown */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTopic.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-strong rounded-2xl border border-cyan-400/20 p-6 sm:p-8 space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-cyan-400">{selectedTopic.badge}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs font-mono text-emerald-400">{selectedTopic.complexity}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedTopic.title}</h3>
                  </div>
                </div>

                {/* Concept & Why it matters */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap size={13} className="text-cyan-400" />
                    Problem Space & Algorithmic Core
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{selectedTopic.concept}</p>
                </div>

                {/* Production Implementation */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-cyan-400" />
                    Production Implementation Details
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{selectedTopic.implementation}</p>
                </div>

                {/* Code Snippet */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Architecture Blueprint</span>
                    <span className="text-[11px] font-mono text-cyan-400">Java / Distributed Systems</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-cyan-500/20 bg-[#03070d]">
                    <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <span className="text-[11px] font-mono text-gray-500 ml-2">architecture-spec.java</span>
                    </div>
                    <pre className="p-4 text-xs font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                      <code>{selectedTopic.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Engineering Trade-offs */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    ⚖️ Architectural Trade-off Considerations
                  </span>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{selectedTopic.tradeoffs}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
