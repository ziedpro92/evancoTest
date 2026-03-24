'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuickSearch() {
  const { content } = useLanguage();
  const qs = (content as any).quickSearch;
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(var(--primary-color-rgb),0.6), transparent)' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(var(--primary-color-rgb),0.4), transparent)' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          {qs.title}
        </motion.h2>
        <motion.p
          className="text-xl text-gray-500 mb-10"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          {qs.subtitle}
        </motion.p>

        {/* Search bar */}
        <motion.div
          className="flex items-center gap-2 bg-white rounded-full shadow-2xl border-2 max-w-2xl mx-auto mb-8 overflow-hidden"
          style={{ borderColor: 'rgba(var(--primary-color-rgb), 0.25)' }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Search className="ml-5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={qs.searchPlaceholder}
            className="flex-1 px-3 py-4 outline-none text-base text-gray-700 bg-transparent"
          />
          <button
            className="m-1.5 px-7 py-3 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ background: 'var(--primary-color)' }}
          >
            {qs.searchButton}
          </button>
        </motion.div>

        {/* Quick filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}
        >
          {qs.quickFilters.map((filter: string) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter === activeFilter ? '' : filter)}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
              style={
                activeFilter === filter
                  ? { background: 'var(--primary-color)', color: '#fff', borderColor: 'var(--primary-color)' }
                  : { background: '#fff', color: '#374151', borderColor: '#e5e7eb' }
              }
            >
              {filter}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
