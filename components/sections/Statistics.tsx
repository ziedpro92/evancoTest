'use client';

import { motion, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericStr = value.replace(/[^0-9.]/g, '');
  const numericValue = parseFloat(numericStr) || 0;
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const controls = animate(0, numericValue, {
      duration: 2, ease: 'easeOut',
      onUpdate(latest) {
        if (ref.current) {
          const formatted = numericValue % 1 !== 0
            ? latest.toFixed(1)
            : Math.floor(latest).toLocaleString();
          ref.current.textContent = formatted + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, numericValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Statistics() {
  const { content } = useLanguage();
  return (
    <section className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.statistics.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-5xl font-serif text-PRIMARY mb-2">
                <Counter value={stat.value} />
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
