'use client';

import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import Loader         from '@/components/sections/Loader';
import Header         from '@/components/sections/Header';
import Carrousel      from '@/components/sections/Carousel';
import QuickSearch    from '@/components/sections/QuickSearch';
import Hero           from '@/components/sections/Hero';
import About          from '@/components/sections/About';
import Statistics     from '@/components/sections/Statistics';
import EventSteps     from '@/components/sections/howItWorks';
import Services       from '@/components/sections/Services';
import WhyStarlinQ    from '@/components/sections/WhyStarlinQ';
import BestPrestaires from '@/components/sections/BestPrestataires/BestPrestaires';
import Testimonials   from '@/components/sections/Testimonials';
import BecomeProvider from '@/components/sections/BecomeProvider';
import EventsGallery  from '@/components/sections/EventsGallery';
import Contact        from '@/components/sections/Contact';
import Insights       from '@/components/sections/Insights';
import FinalCTA       from '@/components/sections/FinalCTA';
import Footer         from '@/components/sections/Footer';

// ── Skeleton screen shown on cached/subsequent loads ──────────────────────────
function SkeletonLoader({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 350);
    const t2 = setTimeout(onDone, 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white pointer-events-none overflow-hidden"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* Navbar */}
      <div className="h-16 border-b border-gray-100 flex items-center px-6 gap-4">
        <div className="w-28 h-7 rounded-lg bg-gray-200 animate-pulse" />
        <div className="flex-1 hidden md:flex justify-center gap-8">
          {[1,2,3,4].map(i => <div key={i} className="w-16 h-3.5 rounded bg-gray-200 animate-pulse" />)}
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-24 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
      {/* Hero carousel */}
      <div className="w-full bg-gray-200 animate-pulse" style={{ height: 'calc(100vh - 64px)' }} />
    </motion.div>
  );
}

type LoadMode = 'full' | 'skeleton' | 'done';

export default function Home() {
  // null = not yet determined (avoids flash before useLayoutEffect fires)
  const [loadMode,    setLoadMode]    = useState<LoadMode | null>(null);
  const [logoVisible, setLogoVisible] = useState(false);

  // useLayoutEffect fires synchronously before the browser paints — no flash
  useLayoutEffect(() => {
    try {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      // Hard reload (Ctrl+Shift+R): type='reload' AND transferSize>0 (fetched from network, not cache)
      const isHardReload = nav?.type === 'reload' && (nav?.transferSize ?? 0) > 0;
      const hasLoaded    = Boolean(localStorage.getItem('starlinq_loaded'));

      if (!hasLoaded || isHardReload) {
        // First ever visit OR hard reload → full logo animation
        setLoadMode('full');
      } else {
        // Cached reload / soft navigation → skeleton only
        setLoadMode('skeleton');
        setLogoVisible(true);
      }
    } catch {
      setLoadMode('done');
      setLogoVisible(true);
    }
  }, []);

  const handleLoaderDone = useCallback(() => {
    try { localStorage.setItem('starlinq_loaded', '1'); } catch {}
    setLogoVisible(true);
    setLoadMode('done');
  }, []);

  const handleSkeletonDone = useCallback(() => {
    setLoadMode('done');
  }, []);

  return (
    <LayoutGroup>
      {loadMode === 'full'     && <Loader        onDone={handleLoaderDone}   />}
      {loadMode === 'skeleton' && <SkeletonLoader onDone={handleSkeletonDone} />}
      {(logoVisible || loadMode === 'done') && <Header logoVisible={true} />}

      <main className="min-h-screen">
        {/* 1. Hero carousel with sponsored slides */}
        <div id="section-carousel"><Carrousel /></div>

        {/* 2. Quick search bar */}
        <div id="section-quicksearch"><QuickSearch /></div>

        {/* 3. Hero with images */}
        <div id="section-hero"><Hero /></div>

        {/* 4. About / Qu'est-ce que StarlinQ */}
        <div id="section-about"><About /></div>

        {/* 5. Key statistics */}
        <div id="section-statistics"><Statistics /></div>

        {/* 6. How it works — 3 steps */}
        <div id="section-howitworks"><EventSteps /></div>

        {/* 7. Event types / Services */}
        <div id="section-services"><Services /></div>

        {/* 8. Why StarlinQ — 4 advantages */}
        <div id="section-why"><WhyStarlinQ /></div>

        {/* 9. Best providers carousel */}
        <div id="section-bestproviders"><BestPrestaires /></div>

        {/* 10. Testimonials marquee */}
        <div id="section-testimonials"><Testimonials /></div>

        {/* 11. Become a provider CTA */}
        <div id="section-becomeprovider"><BecomeProvider /></div>

        {/* 12. Events gallery (optional — kept) */}
        <div id="section-gallery"><EventsGallery /></div>

        {/* 13. Contact form */}
        <div id="section-contact"><Contact /></div>

        {/* 14. Blog / Insights (optional — kept) */}
        <div id="section-insights"><Insights /></div>

        {/* 15. Final double CTA before footer */}
        <div id="section-finalcta"><FinalCTA /></div>

        {/* 16. Footer — 5 columns */}
        <div id="section-footer"><Footer /></div>
      </main>
    </LayoutGroup>
  );
}
