'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import DynamicIcon from '@/components/ui/DynamicIcon';

export default function About() {
  const { content } = useLanguage();
  return (
    <section id="about" className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

          {/* LEFT IMAGE */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="blob-container">
              <div className="blob-border"></div>
              <img
                src="https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=800&fit=crop"
                alt="Event venue"
                className="blob-image"
              />
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
                {content.about.subtitle}
              </h3>
              <h2 className="text-5xl font-serif text-gray-900 mb-4">
                {content.about.title}
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{content.about.paragraph1}</p>
            <p className="text-gray-600 leading-relaxed">{content.about.paragraph2}</p>

            {/* 3 Pillars */}
            {'pillars' in content.about && Array.isArray((content.about as any).pillars) && (
              <div className="grid grid-cols-3 gap-4 pt-4">
                {(content.about as any).pillars.map((pillar: any, i: number) => (
                  <motion.div
                    key={i}
                    className="text-center p-4 bg-PRIMARY/5 rounded-xl border border-PRIMARY/10"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <div className="text-3xl mb-2 flex justify-center"><DynamicIcon value={pillar.icon} size={30} /></div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">{pillar.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{pillar.description}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
