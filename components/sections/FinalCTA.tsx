'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function FinalCTA() {
  const { content } = useLanguage();
  const cta = (content as any).finalCta;

  return (
    <section className="relative pt-10 pb-16 overflow-hidden" style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}>

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-4rem] right-[-4rem] w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-[-4rem] w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(var(--primary-color-rgb), 0.06)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Subtitle pill */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white text-sm font-medium mb-6"
          style={{ background: 'rgba(var(--primary-color-rgb), 0.25)', border: '1px solid rgba(var(--primary-color-rgb), 0.4)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <Users className="w-4 h-4" />
          {cta.subtitle}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          {cta.title}
        </motion.h2>

        {/* Buttons — same pattern as BecomeProvider / Hero section */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            className="bg-PRIMARY hover:bg-PRIMARY-dark text-white rounded-full px-10 py-6 text-base font-bold shadow-lg"
          >
            {cta.buttons.primary}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
         <Button
            variant="outline"
            className="
              rounded-full px-10 py-6 text-base font-bold border-2
              bg-white text-[var(--primary-color)] border-[var(--primary-color)]
              transition-all duration-200 ease-in-out
              hover:bg-[var(--primary-color)] hover:text-white 
            "
          >
            {cta.buttons.secondary}
          </Button>
        </motion.div>

        {/* Reassurance */}
        <motion.p
          className="text-sm tracking-wide" style={{ color: 'rgba(255,255,255,0.7)' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
        >
          {cta.reassurance}
        </motion.p>

      </div>
    </section>
  );
}
