'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MobileSwiper from '@/components/ui/mobile-swiper';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Insights() {
  const { content, ui } = useLanguage();
  const insights = content.insights.items;

  return (
    <section id="insights" className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {content.insights.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title mb-4">
            {content.insights.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{content.insights.description}</p>
        </motion.div>

        <MobileSwiper
          gridClassName="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          swiperClassName="w-full"
          breakpoint={768}
          itemsPerView={1}
          spaceBetween={24}
          showDots={true}
        >
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={insight.image} alt={insight.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-PRIMARY font-medium mb-2 uppercase tracking-wider">
                    <span className="bg-PRIMARY/10 px-2 py-0.5 rounded-full">{insight.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3 leading-snug group-hover:text-PRIMARY transition-colors">{insight.title}</h3>
                  <div className="flex items-center text-xs text-gray-400 gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{insight.date}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </MobileSwiper>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button variant="outline" className="border-PRIMARY text-PRIMARY hover:bg-PRIMARY hover:text-white rounded-full px-8">
            {ui.insights.viewAllButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
