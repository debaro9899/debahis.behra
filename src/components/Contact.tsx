import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Calendar, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:debaro9899@gmail.com?subject=Portfolio Inquiry from ${formState.name} (${formState.company})&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.name + '\nEmail: ' + formState.email + '\nCompany: ' + formState.company)}`;
    window.open(mailto);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-cyan-400 tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6 gradient-text">
            Let's Build Something Scalable.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Looking for a Senior Backend Engineer who ships reliable distributed systems?
            I'm available for roles in backend, platform, and distributed systems engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Debashis Behera</h3>
              <p className="text-cyan-400 font-mono text-sm">Senior Backend & Distributed Systems Engineer</p>
            </div>

            {/* Status */}
            <div className="glass p-5 rounded-xl neon-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="status-dot"></div>
                <span className="text-green-400 font-semibold">Available for opportunities</span>
              </div>
              <p className="text-gray-400 text-sm">
                Open to Senior Backend, Staff Engineer, and Platform Engineering roles.
                Prefer distributed systems, fintech, cloud-native, or high-scale environments.
              </p>
            </div>

            {/* Contact links */}
            <div className="space-y-4">
              <a
                href="mailto:debaro9899@gmail.com"
                className="flex items-center gap-4 glass p-4 rounded-xl neon-border hover:border-cyan-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                  <Mail className="text-cyan-400" size={22} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Email</div>
                  <div className="text-white font-medium">debaro9899@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/debashis99/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass p-4 rounded-xl neon-border hover:border-blue-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <ExternalLink className="text-blue-400" size={22} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">LinkedIn</div>
                  <div className="text-white font-medium">linkedin.com/in/debashis99</div>
                </div>
              </a>

              <a
                href="mailto:debaro9899@gmail.com?subject=Interview Request&body=Hi Debashis, I'd like to schedule a call to discuss a potential opportunity."
                className="flex items-center gap-4 glass p-4 rounded-xl border border-purple-500/20 hover:border-purple-400 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                  <Calendar className="text-purple-400" size={22} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Schedule Interview</div>
                  <div className="text-white font-medium">Send a meeting request →</div>
                </div>
              </a>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-cyan-400 pl-4 text-gray-400 italic text-sm">
              "I design and build reliable backend systems that scale — from API frameworks serving
              20+ teams to event-driven pipelines processing millions of transactions."
            </blockquote>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl neon-border space-y-5">
              <h3 className="text-xl font-bold text-white mb-2">Send a message</h3>

              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="recruiter@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Company</label>
                <input
                  type="text"
                  value={formState.company}
                  onChange={e => setFormState(s => ({ ...s, company: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Hi Debashis, I'm reaching out about a Senior Backend Engineer role at..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-3"
              >
                {sent ? (
                  <>
                    <CheckCircle size={18} />
                    Email Client Opened!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-xs text-gray-600 text-center">
                This will open your email client with a pre-filled message.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-gray-600 text-sm font-mono">
            © 2024 Debashis Behera. Built with React + Vite + TypeScript.
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:debaro9899@gmail.com" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
              debaro9899@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/debashis99/" target="_blank" rel="noopener noreferrer"
               className="text-gray-500 hover:text-blue-400 transition-colors text-sm">
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
