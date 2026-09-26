import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import config from '../data/config';

export default function Contact() {
  const c = config.contact;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(c.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const name = String(data.get('name') || '');
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${String(data.get('subject') || 'Project Collaboration')}`);
      const body = encodeURIComponent(`From: ${name}\n\n${String(data.get('message') || '')}`);
      setSubmitted(true);
      window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
    },
    [c.email]
  );

  return (
    <section id="contact" className="pt-24 pb-20">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/15 border-l-4 border-cyan-400 text-cyan-300 font-hud text-xs font-bold tracking-widest mb-3">
          <span>SECURE FREQUENCY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          GET IN{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-cyan-400">
            TOUCH
          </span>
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-sky-300 mt-4" />
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Contact Methods (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 ocean-card p-6 sm:p-8 space-y-6"
        >
          <div className="border-b border-cyan-400/20 pb-4">
            <h3 className="font-display text-2xl font-bold text-white">
              Direct Comm Channels
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Looking for a dedicated Full-Stack Developer for your engineering team? Let's connect.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Card with Quick Copy */}
            <div className="p-4 bg-black/50 border border-cyan-400/30 flex items-center justify-between gap-3">
              <div className="overflow-hidden">
                <div className="text-[10px] font-hud text-cyan-400 uppercase">DIRECT EMAIL</div>
                <a
                  href={`mailto:${c.email}`}
                  className="font-hud text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors truncate block"
                >
                  {c.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black font-hud text-xs font-bold border border-cyan-400/50 transition-all flex-shrink-0"
              >
                {copied ? 'COPIED!' : 'COPY'}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href={c.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-black/50 border border-cyan-400/30 hover:border-cyan-400 flex items-center justify-between gap-3 group transition-all block"
            >
              <div>
                <div className="text-[10px] font-hud text-cyan-400 uppercase">LINKEDIN PROFILE</div>
                <div className="font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Jaydeep Chaudhari
                </div>
              </div>
              <span className="text-cyan-400 font-hud text-sm group-hover:translate-x-1 transition-transform">
                CONNECT ➔
              </span>
            </a>

            {/* GitHub */}
            <a
              href={c.github}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-black/50 border border-cyan-400/30 hover:border-cyan-400 flex items-center justify-between gap-3 group transition-all block"
            >
              <div>
                <div className="text-[10px] font-hud text-cyan-400 uppercase">GITHUB REPOSITORIES</div>
                <div className="font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  github.com/jaydeep9881
                </div>
              </div>
              <span className="text-cyan-400 font-hud text-sm group-hover:translate-x-1 transition-transform">
                EXPLORE ➔
              </span>
            </a>

            {/* Resume Download */}
            <a
              href={c.resumeUrl}
              download
              className="p-4 bg-black/50 border border-cyan-400/30 hover:border-cyan-400 flex items-center justify-between gap-3 group transition-all block"
            >
              <div>
                <div className="text-[10px] font-hud text-cyan-400 uppercase">OFFICIAL DOSSIER</div>
                <div className="font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Download Full Resume PDF
                </div>
              </div>
              <span className="text-cyan-400 font-hud text-sm group-hover:translate-y-0.5 transition-transform">
                DOWNLOAD ⬇
              </span>
            </a>
          </div>

          <div className="pt-2 text-xs font-hud text-gray-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span>COMM CHANNEL SECURE • 24H RESPONSE TIME GUARANTEED</span>
          </div>
        </motion.div>

        {/* Transmission Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 ocean-card p-6 sm:p-8"
        >
          <div className="border-b border-cyan-400/20 pb-4 mb-6">
            <h3 className="font-display text-2xl font-bold text-white">
              Transmit Encrypted Message
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              Fill out the form below to initiate direct dispatch to Jaydeep's inbox.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4" aria-label="Contact form">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-hud font-bold text-cyan-400 uppercase mb-1">
                  Agent / Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. John Doe / Tech Recruiter"
                  className="input-base text-sm font-sans"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-hud font-bold text-cyan-400 uppercase mb-1">
                  Return Frequency (Email) *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@company.com"
                  className="input-base text-sm font-sans"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-hud font-bold text-cyan-400 uppercase mb-1">
                Mission Subject *
              </label>
              <input
                id="subject"
                name="subject"
                required
                placeholder="Software Engineering Role / Project Collaboration"
                className="input-base text-sm font-sans"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-hud font-bold text-cyan-400 uppercase mb-1">
                Transmission Briefing *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Describe your project, team opportunity, tech stack requirements, or questions..."
                className="input-base text-sm font-sans resize-y"
              />
            </div>

            {submitted && (
              <div className="p-3 bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-hud text-xs font-bold">
                ✓ TRANSMISSION READY: Launching your mail client...
              </div>
            )}

            <button
              type="submit"
              className="w-full gta-button-primary text-sm py-3.5 tracking-widest mt-2"
            >
              TRANSMIT MESSAGE (SEND) ➔
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
