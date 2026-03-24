'use client';

import { Button } from '@/components/ui/button';
import MobileSwiper from '@/components/ui/mobile-swiper';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
  const { content, ui } = useLanguage();
  return (
    <section id="services" className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={{ hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {content.services.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title">
            {content.services.title}
          </h2>
        </motion.div>

        <MobileSwiper
          gridClassName="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          swiperClassName="w-full"
          breakpoint={768}
          itemsPerView={1}
          spaceBetween={24}
          showDots={true}
        >
          {content.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ height: '100%' }}
            >
              <div className="service-card group">
                <span className="service-tag">{service.tag}</span>
                <div className="service-image-wrap">
                  <img src={service.image} alt={service.title} className="service-image" />
                </div>
                <div className="service-gradient" />
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-cta-wrap">
                  <button className="service-cta-btn">
                    <span>{ui.services.cardCta}</span>
                    <svg className="service-cta-arrow" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </MobileSwiper>

        <motion.div
          className="hidden md:block text-center mt-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button variant="outline" className="border-PRIMARY text-PRIMARY hover:bg-PRIMARY hover:text-white rounded-full px-8">
            {ui.services.viewAllButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
