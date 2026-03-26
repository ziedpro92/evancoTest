'use client';

import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="testimonial-marquee-card">
      <div className="testimonial-marquee-card__quote">
        <Quote className="w-8 h-8" style={{ color: 'var(--primary-color)', opacity: 0.25 }} fill="currentColor" />
      </div>
      <p className="testimonial-marquee-card__content">{testimonial.content}</p>
      <div className="testimonial-marquee-card__footer">
        <div className="testimonial-marquee-card__stars">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4" style={{ fill: 'var(--primary-color)', color: 'var(--primary-color)' }} />
          ))}
        </div>
        <div className="testimonial-marquee-card__author">
          <img src={testimonial.image} alt={testimonial.name} className="testimonial-marquee-card__avatar" />
          <div className="testimonial-marquee-card__author-info">
            <p className="testimonial-marquee-card__name">{testimonial.name}</p>
            <p className="testimonial-marquee-card__role">{testimonial.role}</p>
          </div>
          {/* <span className="testimonial-marquee-card__event">{testimonial.event}</span> */}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { content } = useLanguage();
  const items = content.testimonials.items;
  const row1 = items.slice(0, 4);
  const row2 = items.slice(4, 8);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {content.testimonials.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title mb-4">
            {content.testimonials.title}
          </h2>
        </motion.div>
      </div>

      <div className="testimonials-marquee-wrapper">
        <div className="testimonials-marquee">
          <div className="testimonials-marquee__group">
            {row1.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
          <div className="testimonials-marquee__group" aria-hidden="true">
            {row1.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
        </div>
        <div className="testimonials-marquee testimonials-marquee--reverse">
          <div className="testimonials-marquee__group">
            {row2.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
          <div className="testimonials-marquee__group" aria-hidden="true">
            {row2.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
