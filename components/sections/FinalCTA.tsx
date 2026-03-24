'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FinalCTA() {
  const { content } = useLanguage();
  const cta = (content as any).finalCta;

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Gradient background using CSS variables for consistency with theme */}
      <div
        className="absolute inset-0"
        
      />

      {/* Decorative white blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-4rem] right-[-4rem] w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-[-4rem] w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-PRIMARY text-sm font-medium mb-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <Users className="w-4 h-4" />
          {cta.subtitle}
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          {cta.title}
        </motion.h2>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="bg-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            style={{ color: 'var(--primary-color)' }}
          >
            {cta.buttons.primary}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white text-black/75 font-bold text-lg px-10 py-4 rounded-full hover:bg-white transition-all">
            {cta.buttons.secondary}
          </button>
        </motion.div>

        <motion.p
          className="text-black/75 text-sm tracking-wide"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
        >
          {cta.reassurance}
        </motion.p>
      </div>
    </section>
  );
}
