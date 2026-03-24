'use client';

import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function Footer() {
  const { content } = useLanguage();
  const f = content.footer as any;
  const [email, setEmail] = useState('');

  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
  };

  return (
    <footer className="footer-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">

        {/* ── Top grid: 5 columns ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Col 1 — Brand */}
          <motion.div
            className="col-span-2 md:col-span-1"
            custom={0} variants={columnVariants} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <div className="text-2xl font-serif italic mb-4 text-white">{f.logo}</div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">{f.description}</p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook,  href: f.social?.facebook  || '#' },
                { Icon: Instagram, href: f.social?.instagram || '#' },
                { Icon: Linkedin,  href: f.social?.linkedin  || '#' },
                { Icon: Youtube,   href: f.social?.youtube   || '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-full bg-white/10 hover:bg-PRIMARY flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — À Propos */}
          <motion.div custom={1} variants={columnVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">{f.sections.about.title}</h4>
            <ul className="space-y-2">
              {f.sections.about.links.map((link: any, i: number) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-gray-300 hover:text-PRIMARY transition-colors">{link.text}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Pour les Clients */}
          <motion.div custom={2} variants={columnVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">{f.sections.clients.title}</h4>
            <ul className="space-y-2">
              {f.sections.clients.links.map((link: any, i: number) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-gray-300 hover:text-PRIMARY transition-colors">{link.text}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Pour les Prestataires */}
          <motion.div custom={3} variants={columnVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">{f.sections.providers.title}</h4>
            <ul className="space-y-2">
              {f.sections.providers.links.map((link: any, i: number) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-gray-300 hover:text-PRIMARY transition-colors">{link.text}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 5 — Contact + Legal */}
          <motion.div custom={4} variants={columnVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h4 className="font-semibold text-white mb-4">{f.contact.title}</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-PRIMARY mt-0.5" />
                {f.contact.address}
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-PRIMARY" />
                {f.contact.phone}
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-PRIMARY" />
                {f.contact.email}
              </li>
            </ul>

            <h4 className="font-semibold text-white mb-3 text-sm">{f.sections.legal.title}</h4>
            <ul className="space-y-1">
              {f.sections.legal.links.map((link: any, i: number) => (
                <li key={i}>
                  <a href={link.href} className="text-xs text-gray-400 hover:text-PRIMARY transition-colors">{link.text}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Copyright ── */}
        <motion.div
          className="border-t border-gray-700 pt-8 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-sm text-gray-400">{f.copyright}</p>
        </motion.div>
      </div>

      {/* Parallax animated stars background */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </footer>
  );
}
