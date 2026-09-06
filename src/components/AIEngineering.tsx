import React from 'react';
import { motion } from 'framer-motion';
import { Bot, GitBranch, CheckCircle, Zap, Shield } from 'lucide-react';

const AIEngineering: React.FC = () => {
  const steps = [
    { icon: <Bot size={20} />, label: 'AI Generates', desc: 'Copilot / ChatGPT produces code scaffold, test cases, boilerplate', color: '#7c3aed' },
    { icon: <GitBranch size={20} />, label: 'Review Architecture', desc: 'I validate design decisions, edge cases, concurrency, and data flows', color: '#00d4ff' },
    { icon: <Shield size={20} />, label: 'Security & Quality', desc: 'Manual review for auth, injection risks, data validation, error handling', color: '#f59e0b' },
    { icon: <CheckCircle size={20} />, label: 'Test & Validate', desc: 'TDD approach: unit tests, integration tests, performance benchmarks', color: '#00ff88' },
    { icon: <Zap size={20} />, label: 'Production Ship', desc: 'Monitored rollout with observability: Prometheus, Grafana, alerts', color: '#00d4ff' },
  ];

  const useCases = [
    { title: 'Code Scaffolding', desc: 'Generate boilerplate for Spring Boot services, REST controllers, repository patterns', tag: 'Efficiency' },
    { title: 'Test Case Generation', desc: 'AI drafts JUnit/Mockito test skeletons; I fill domain logic and edge cases', tag: 'Quality' },
    { title: 'Code Review Assistance', desc: 'Identify potential issues, redundant patterns, optimization opportunities', tag: 'Architecture' },
    { title: 'Documentation', desc: 'API documentation, README generation, architecture decision records', tag: 'Communication' },
    { title: 'Debugging Support', desc: 'Trace analysis, error pattern recognition, stack trace interpretation', tag: 'Problem Solving' },
    { title: 'SQL Optimization', desc: 'Query analysis, index suggestions, execution plan review', tag: 'Performance' },
  ];

  return (
    <section id="ai-engineering" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-purple-400 tracking-widest uppercase">Modern Engineering</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 gradient-text">
            AI-Native Engineering
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I use AI as an accelerator for engineering velocity — not as a replacement for engineering judgment.
          </p>
        </motion.div>

        {/* Philosophy banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-strong p-8 rounded-2xl mb-16 text-center neon-border"
        >
          <p className="text-2xl font-bold text-white leading-relaxed">
            "AI accelerates my engineering workflow.
            <span className="gradient-text"> It does not replace engineering judgment."</span>
          </p>
          <p className="text-gray-500 mt-4 text-sm font-mono">— Debashis Behera, Senior Backend Engineer</p>
        </motion.div>

        {/* Workflow diagram */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">My AI-Assisted Workflow</h3>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent hidden md:block" />

            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="glass p-5 rounded-xl text-center hover:scale-105 transition-transform duration-300 h-full"
                       style={{ borderColor: `${step.color}30` }}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                         style={{ background: `${step.color}20`, color: step.color }}>
                      {step.icon}
                    </div>
                    <div className="text-sm font-bold text-white mb-2">{step.label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                    {i < steps.length - 1 && (
                      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-cyan-400/50 text-xl hidden md:block z-10">→</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Use cases grid */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">How I Use AI Day-to-Day</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass p-6 rounded-xl neon-border hover:border-purple-400/40 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{uc.title}</h4>
                  <span className="text-xs font-mono px-2 py-1 rounded-full"
                        style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
                    {uc.tag}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm mb-4 font-mono uppercase tracking-wider">AI Tools I Use</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['GitHub Copilot', 'ChatGPT', 'Claude', 'Gemini', 'Cursor'].map(tool => (
              <span key={tool} className="skill-tag">{tool}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIEngineering;
