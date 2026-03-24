'use client';

import { Button } from '@/components/ui/button';
import MobileSwiper from '@/components/ui/mobile-swiper';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';


export default function EventsGallery() {
  const { content, ui } = useLanguage();
  return (
    <section className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {content.eventsGallery.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title">
            {content.eventsGallery.title}
          </h2>
        </motion.div>

        <MobileSwiper
          gridClassName="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          swiperClassName="mb-12 w-full"
          breakpoint={768}
          itemsPerView={1}
          spaceBetween={16}
          showDots={true}
        >
          {content.eventsGallery.images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg group cursor-pointer ${image.span}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Original image — unchanged */}
              <img
                src={image.url}
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Pastel overlay — fades in on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ backgroundColor: image.overlay }}
              />

              {/* Caption — Centered both ways and larger */}
             <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <p
                  className="
                    translate-y-6 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100
                    transition-all duration-500 ease-out
                    text-white text-3xl md:text-4xl font-serif italic tracking-wide
                    text-center leading-tight
                  "
                  style={{ 
                    textShadow: '2px 4px 12px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)' 
                  }}
                >
                  {image.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </MobileSwiper>

        <motion.div
          className="hidden md:block text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            variant="outline"
            className="border-PRIMARY text-PRIMARY hover:bg-PRIMARY hover:text-white rounded-full px-8"
          >
            {ui.eventsGallery.loadMoreButton}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
