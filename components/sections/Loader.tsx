'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarlinqLogoSVG from '@/components/StarlinqLogoSVG';

const SHOW_DURATION = 4200;
const EXIT_DURATION = 800;

interface LoaderProps {
  onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const [phase, setPhase] = useState<'visible' | 'exiting' | 'gone'>('visible');

  useEffect(() => {
    const notifyTimer = setTimeout(() => { onDone(); }, SHOW_DURATION);
    const exitTimer   = setTimeout(() => { setPhase('exiting'); }, SHOW_DURATION + 80);
    const goneTimer   = setTimeout(() => { setPhase('gone'); }, SHOW_DURATION + EXIT_DURATION + 80);
    return () => { clearTimeout(notifyTimer); clearTimeout(exitTimer); clearTimeout(goneTimer); };
  }, [onDone]);

  if (phase === 'gone') return null;

  return (
    <motion.div
      animate={{ opacity: phase === 'exiting' ? 0 : 1 }}
      transition={{ duration: EXIT_DURATION / 1000, ease: 'easeInOut' }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', pointerEvents: phase === 'exiting' ? 'none' : 'all', overflow: 'hidden' }}
    >
      <div id="stars"  style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div id="stars2" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div id="stars3" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <motion.div layoutId="brand-logo" style={{ width: 'min(70vw, 400px)', position: 'relative', zIndex: 1 }}>
        <StarlinqLogoSVG animated={true} width="100%" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.7 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid rgba(16, 185, 129, 0.2)', borderTopColor: '#10B981', animation: 'loaderSpin 0.9s linear infinite' }} />
        <p style={{ color: 'rgba(167, 243, 208, 0.7)', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, margin: 0 }}>
          Préparation de votre expérience
        </p>
      </motion.div>
    </motion.div>
  );
}
