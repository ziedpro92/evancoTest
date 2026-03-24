'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BecomeProvider() {
  const { content } = useLanguage();
  const bp = (content as any).becomeProvider;

  return (
    <section id="becomeProvider" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">

        {/* ── ROW 1: Stacked Images (left) + Text (right) ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Hero-style stacked image grid */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=500&fit=crop"
                    alt=""
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=700&fit=crop"
                    alt=""
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating circle accent — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-4 -right-4 w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating card accent — bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-8 left-12 w-44 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right — subtitle + title + description + pitch */}
          <motion.div
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div>
              <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
                {bp.subtitle}
              </h3>
              <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-3">{bp.title}</h2>
              <p className="text-xl text-gray-500 font-medium">{bp.description}</p>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">{bp.pitch}</p>
          </motion.div>
        </div>

        {/* ── ROW 2: Advantages + CTA (left) + Tilted Offer Card (right) ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — advantages list + CTA buttons */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <ul className="space-y-4">
              {bp.advantages.map((adv: string, i: number) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-700"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <CheckCircle className="w-5 h-5 text-PRIMARY flex-shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-PRIMARY hover:bg-PRIMARY-dark text-white rounded-full px-8 py-6 text-base">
                {bp.cta.primary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-PRIMARY text-PRIMARY hover:bg-PRIMARY hover:text-white rounded-full px-8 py-6 text-base">
                {bp.cta.secondary}
              </Button>
            </div>
          </motion.div>

          {/* Right — tilted offer card with image background */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95, rotate: 0 }} whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ rotate: 0, scale: 1.01, transition: { duration: 0.3 } }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {/* Background image with brand color overlay */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(var(--primary-color-rgb), 0.88)' }} />
              </div>

              {/* Card content */}
              <div className="relative z-10 p-8 text-white">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold tracking-wide uppercase">{bp.offer.title}</h3>
                </div>
                <ul className="space-y-3 mb-7">
                  {bp.offer.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                      <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <span className="inline-block px-6 py-3 rounded-xl font-mono font-bold text-xl tracking-widest bg-white/20 text-white border border-white/30">
                    {bp.offer.code}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
