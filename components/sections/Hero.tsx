'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const imageFade: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const { content, ui } = useLanguage();
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-serif leading-tight text-gray-900">
              {content.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed max-w-xl">
              {content.hero.description}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button className="bg-PRIMARY hover:bg-PRIMARY-dark text-white rounded-full px-8 py-6 text-base">
                {(content.hero as any).cta?.primary ?? ui.hero.primaryButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-PRIMARY text-PRIMARY hover:bg-PRIMARY hover:text-white rounded-full px-8 py-6 text-base">
                {(content.hero as any).cta?.secondary ?? ui.hero.secondaryButton}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div variants={imageFade} className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={content.hero.images[0].src} alt={content.hero.images[0].alt} className="w-full h-64 object-cover" />
                </motion.div>
              </div>
              <div className="space-y-4 mt-8">
                <motion.div variants={imageFade} className="rounded-2xl overflow-hidden shadow-lg">
                  <img src={content.hero.images[1].src} alt={content.hero.images[1].alt} className="w-full h-80 object-cover" />
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
              className="absolute -top-4 -right-4 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg z-10"
            >
              <img src={content.hero.images[2].src} alt={content.hero.images[2].alt} className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              className="absolute bottom-[-5rem] left-[6rem] w-40 lg:w-[19rem] h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-10"
            >
              <img src={content.hero.images[3].src} alt={content.hero.images[3].alt} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
