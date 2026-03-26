'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { content, ui } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventType: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {content.contact.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title">
            {content.contact.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <motion.div
            className="flex flex-col justify-between space-y-6"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{content.contact.heading}</h3>
              <p className="text-gray-600 leading-relaxed mb-8">{content.contact.description}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder={ui.contact.namePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border-gray-300 h-12" />
                  <Input type="email" placeholder={ui.contact.emailPlaceholder} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-gray-300 h-12" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder={ui.contact.phonePlaceholder} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="border-gray-300 h-12" />
                  <Input placeholder={ui.contact.eventTypePlaceholder} value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="border-gray-300 h-12" />
                </div>
                <Textarea placeholder={ui.contact.messagePlaceholder} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="border-gray-300 min-h-[150px] resize-none" />
              </div>
              <Button type="submit" className="bg-PRIMARY hover:bg-PRIMARY-dark text-white rounded-full px-8 h-12 w-full md:w-auto">
                {ui.contact.submitButton}
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="hidden lg:block relative h-full min-h-[500px] lg:min-h-[600px]"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src={content.contact.image.src} alt={content.contact.image.alt} className="w-full h-full object-cover rounded-2xl shadow-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
