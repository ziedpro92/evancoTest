'use client';

import { useState, useCallback } from 'react';
import { LayoutGroup } from 'framer-motion';

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

export default function Home() {
  const [logoVisible, setLogoVisible] = useState(false);
  const handleLoaderDone = useCallback(() => { setLogoVisible(true); }, []);

  return (
    <LayoutGroup>
      <Loader onDone={handleLoaderDone} />
      {logoVisible && <Header logoVisible={logoVisible} />}

      <main className="min-h-screen">
        {/* 1. Hero carousel with sponsored slides */}
        <Carrousel />

        {/* 2. Quick search bar */}
        <QuickSearch />

        {/* 3. Hero with images */}
        <Hero />

        {/* 4. About / Qu'est-ce que StarlinQ */}
        <About />

        {/* 5. Key statistics */}
        <Statistics />

        {/* 6. How it works — 3 steps */}
        <EventSteps />

        {/* 7. Event types / Services */}
        <Services />

        {/* 8. Why StarlinQ — 4 advantages */}
        <WhyStarlinQ />

        {/* 9. Best providers carousel */}
        <BestPrestaires />

        {/* 10. Testimonials marquee */}
        <Testimonials />

        {/* 11. Become a provider CTA */}
        <BecomeProvider />

        {/* 12. Events gallery (optional — kept) */}
        <EventsGallery />

        {/* 13. Contact form */}
        <Contact />

        {/* 14. Blog / Insights (optional — kept) */}
        <Insights />

        {/* 15. Final double CTA before footer */}
        <FinalCTA />

        {/* 16. Footer — 5 columns */}
        <Footer />
      </main>
    </LayoutGroup>
  );
}
