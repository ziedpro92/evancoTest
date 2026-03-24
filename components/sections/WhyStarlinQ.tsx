'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhyStarlinQ() {
  const { content } = useLanguage();
  const why = (content as any).whyStarlinQ;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(var(--primary-color-rgb),0.8), transparent)' }} />
        <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(var(--primary-color-rgb),0.6), transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {why.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title">
            {why.title}
          </h2>
        </motion.div>

        {/* Vertical advantage cards — alternating white / primary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {why.advantages.map((adv: any, index: number) => {
            const isPrimary = index % 2 === 1;
            return (
              <motion.div
                key={adv.id}
                className={`advantage-card${isPrimary ? ' advantage-card-primary' : ''} flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group min-h-[300px] justify-start`}
                style={{ background: isPrimary ? 'var(--primary-color)' : '#ffffff' }}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110 flex-shrink-0"
                  style={
                    isPrimary
                      ? { background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }
                      : { background: 'rgba(var(--primary-color-rgb), 0.1)', border: '2px solid rgba(var(--primary-color-rgb), 0.2)' }
                  }
                >
                  {adv.icon}
                </div>
                {/* Title */}
                <h3
                  className="text-lg font-bold mb-3 leading-snug"
                  style={{ color: isPrimary ? '#ffffff' : '#111827' }}
                >
                  {adv.title}
                </h3>
                {/* Description */}
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: isPrimary ? 'rgba(255,255,255,0.82)' : '#6b7280' }}
                >
                  {adv.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
