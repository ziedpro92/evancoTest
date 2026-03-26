/**
 * data/en/content.ts
 * ──────────────────────────────────────────────────────────
 * StarlinQ — English content
 */

export const siteContent = {

  // ── Header / Navigation ─────────────────────────────────
  header: {
    logo: 'StarlinQ',
    nav: [
      { label: 'Our Providers', href: '/prestataires' },
      { label: 'How It Works', href: '#howItWorks' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  // ── Hero Carousel ───────────────────────────────────────
  carrouselContent: [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
      eventType: '💍 Wedding',
      title: 'Find the perfect team for your wedding',
      description: 'Verified vendors to make your wedding unforgettable. Photographers, DJs, caterers and decorators at the best price.',
      sponsored: true,
      ctaText: 'View Profile',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop',
      eventType: '🎵 DJ & Music',
      title: 'Music to make your guests dance all night',
      description: 'Professional DJs and musicians for all your events. A guaranteed atmosphere from start to finish.',
      sponsored: true,
      ctaText: 'View Profile',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=800&fit=crop',
      eventType: '🍽️ Catering',
      title: 'Chef-quality flavors for your guests',
      description: 'Gourmet caterers and impeccable service. Refined cuisine for all your events in Quebec.',
      sponsored: true,
      ctaText: 'View Profile',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1169&auto=format&fit=crop',
      eventType: '✨ Events',
      title: 'Create unforgettable moments',
      description: 'All the professionals you need for a perfect event. Simple, fast, secure.',
      sponsored: true,
      ctaText: 'View Profile',
    },
  ],

  // ── Quick Search Section (NEW) ──────────────────────────
  quickSearch: {
    title: 'Plan the perfect event',
    subtitle: 'Find the best vendors in Quebec in just a few clicks',
    searchPlaceholder: 'Search for a photographer, DJ, caterer, decorator...',
    searchButton: 'Search',
    quickFilters: ['Photographer', 'DJ', 'Caterer', 'Decorator', 'Chef', 'Musician'],
  },

  // ── Hero Section ────────────────────────────────────────
  hero: {
    title: 'Connect with Quebec\'s best event professionals',
    description: 'StarlinQ simplifies event planning by connecting you with verified and passionate professionals. Wedding, festival, corporate or private party — we have the experts you need.',
    cta: {
      primary: 'Find a vendor',
      secondary: 'Learn more',
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
        alt: 'Elegant wedding',
      },
      {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=500&fit=crop',
        alt: 'Festive event',
      },
      {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop',
        alt: 'Table setting',
      },
      {
        src: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=400&fit=crop',
        alt: 'Special moment',
      },
    ],
  },

  // ── About Section ───────────────────────────────────────
  about: {
    subtitle: 'What is StarlinQ?',
    title: 'The platform connecting organizers and vendors',
    paragraph1:
      'StarlinQ is THE platform that connects event organizers with the best vendors in Quebec. Whether you\'re organizing a wedding, festival, corporate event or private party, we connect you with verified and passionate professionals.',
    paragraph2:
      'Simple, fast, secure — organize the event of your dreams with complete confidence. No more hours of searching, everything is centralized on StarlinQ.',
    pillars: [
      {
        icon: '🎯',
        title: 'Simple',
        description: 'Search, compare, book — all in one place',
      },
      {
        icon: '⭐',
        title: 'Quality',
        description: 'Verified vendors with authentic client reviews',
      },
      {
        icon: '🔒',
        title: 'Secure',
        description: 'Protected payments and dedicated customer support',
      },
    ],
    stats: {
      events: { value: '500+', label: 'Verified Vendors' },
      clients: { value: '5,000+', label: 'Successful Events' },
      awards: { value: '98%', label: 'Client Satisfaction' },
    },
  },

  // ── Services / Event Types Section ──────────────────────
  services: {
    subtitle: 'Event Types',
    title: 'What type of event are you planning?',
    items: [
      {
        title: 'Weddings',
        description: 'Photographers, DJs, caterers and decorators for the most beautiful day of your life.',
        tag: 'Popular',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
      },
      {
        title: 'Festivals & Corporate',
        description: 'Stages, sound systems, lighting and entertainment for your large-scale events.',
        tag: 'Premium',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      },
      {
        title: 'Private Parties',
        description: 'Birthdays, christenings, showers — professionals for every occasion.',
        tag: 'Festive',
        image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop',
      },
      {
        title: 'Fine Dining',
        description: 'Gourmet chefs and caterers for an unforgettable culinary experience.',
        tag: 'Exclusive',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
      },
    ],
  },

  // ── Events Gallery Section ──────────────────────────────
  eventsGallery: {
    subtitle: 'Events Gallery',
    title: 'Our Most Beautiful Events',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(251, 207, 232, 0.45)',
        caption: 'Where love stories begin',
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
        span: 'col-span-1 row-span-2',
        overlay: 'rgba(254, 240, 138, 0.40)',
        caption: 'Evenings that linger forever',
      },
      {
        url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(221, 214, 254, 0.45)',
        caption: 'Every beat, a memory',
      },
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(186, 230, 253, 0.45)',
        caption: 'Connections that inspire',
      },
      {
        url: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=800&fit=crop',
        span: 'col-span-1 row-span-2',
        overlay: 'rgba(254, 215, 170, 0.45)',
        caption: 'Celebrating the ones you love',
      },
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(187, 247, 208, 0.45)',
        caption: 'Energy in every moment',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1169&auto=format&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(153, 246, 228, 0.45)',
        caption: 'Style that speaks for itself',
      },
    ],
  },

  // ── Statistics Section ──────────────────────────────────
  statistics: {
    stats: [
      { value: '500+', label: 'Verified Vendors' },
      { value: '5,000+', label: 'Successful Events' },
      { value: '98%', label: 'Satisfaction Rate' },
      { value: '4.9/5', label: 'Average Rating' },
    ],
  },

  // ── Best Providers Section ──────────────────────────────
  bestProviders: {
    subtitle: 'Verified Vendors',
    title: 'Our Top-Rated Vendors',
    description: 'Discover the verified professionals who make a difference in Quebec',
    items: [
      {
        id: 1,
        name: 'Studio Photo Pro',
        location: 'Montreal, QC',
        specialty: 'Photographer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
        price: '800',
        duration: 'event',
        rating: 4.9,
        reviewCount: 142,
      },
      {
        id: 2,
        name: 'DJ Elite Sound',
        location: 'Montreal, QC',
        specialty: 'Professional DJ',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
        price: '600',
        duration: 'event',
        rating: 4.8,
        reviewCount: 98,
      },
      {
        id: 3,
        name: 'Gourmet Catering',
        location: 'Laval, QC',
        specialty: 'Caterer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
        price: '45',
        duration: 'person',
        rating: 5.0,
        reviewCount: 211,
      },
      {
        id: 4,
        name: 'Chef Prestige',
        location: 'Montreal, QC',
        specialty: 'Private Chef',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&h=400&fit=crop',
        price: '120',
        duration: 'person',
        rating: 4.7,
        reviewCount: 76,
      },
    ],
  },

  // ── Why StarlinQ Section (NEW) ──────────────────────────
  whyStarlinQ: {
    subtitle: 'Our Advantages',
    title: 'Why Choose StarlinQ?',
    advantages: [
      {
        id: 1,
        icon: '✓',
        title: '100% Verified Vendors',
        description: 'All our vendors are manually verified. Insurance, licenses, portfolio — we check everything for your peace of mind.',
      },
      {
        id: 2,
        icon: '⭐',
        title: 'Authentic Client Reviews',
        description: 'Only clients who have actually booked can leave a review. Transparent ratings, detailed comments, zero fake reviews.',
      },
      {
        id: 3,
        icon: '💰',
        title: 'Best Price Guaranteed',
        description: 'Compare prices in full transparency. No hidden fees. Save an average of 20% vs traditional agencies.',
      },
      {
        id: 4,
        icon: '🔒',
        title: '100% Secure Payment',
        description: 'Payments protected by Stripe. Money held until service completion. Guaranteed refund in case of problems.',
      },
    ],
  },

  // ── Testimonials Section ────────────────────────────────
  testimonials: {
    subtitle: 'Testimonials',
    title: 'What Our Clients Say About Us',
    description: 'Over 5,000 successful events thanks to StarlinQ',
    items: [
      {
        name: 'Sarah & Marc Dubois',
        role: 'Married in June 2025',
        content:
          'StarlinQ made organizing our wedding so simple! The vendors are qualified, prices are transparent, and customer service is impeccable. We found our photographer, DJ and caterer in less than a week. I recommend 100%!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        event: 'Wedding (150 guests)',
      },
      {
        name: 'Jean-François Rousseau',
        role: 'Festival Organizer',
        content:
          'As a corporate event organizer, I need reliable and professional vendors. StarlinQ saved me so much time — everything is centralized, reviews are authentic, and booking is instant.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        event: 'Summer Festival (2,000+ attendees)',
      },
      {
        name: 'Gabrielle Lemieux',
        role: 'HR Director',
        content:
          'For our corporate events, StarlinQ has become our go-to partner. The quality of vendors, ease of use, and customer support are exceptional.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        event: 'Christmas Party (300 employees)',
      },
      {
        name: 'Marie-Ève Tremblay',
        role: 'Bride, August 2025',
        content:
          'Thanks to StarlinQ, planning my wedding was a real pleasure! I found all my vendors in one place and the reviews helped me choose with confidence. Result: a perfect day!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
        event: 'Country Wedding (80 guests)',
      },
      {
        name: 'Alexandre Bergeron',
        role: 'Creative Director',
        content:
          'I\'ve been organizing events for 10 years and StarlinQ is by far the best tool I\'ve used. Vendor search is smooth, profiles are detailed and bookings are simple.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        event: 'Annual Gala (500 people)',
      },
      {
        name: 'Isabelle Côté',
        role: 'Event Coordinator',
        content:
          'Intuitive platform, quality vendors, responsive support. StarlinQ has revolutionized the way I work. I recommend it to all my colleagues in the event industry.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        event: 'Corporate Conference (400 delegates)',
      },
      {
        name: 'Mathieu Lavoie',
        role: 'Startup Founder',
        content:
          'StarlinQ allowed us to organize our launch party on a tight budget with impressive results. The verified vendors gave us confidence from the start.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        event: 'Product Launch (120 guests)',
      },
      {
        name: 'Sophie Nguyen',
        role: 'Wedding Planner',
        content:
          'As a professional, I trust StarlinQ to find reliable and innovative partners. The platform is a true goldmine for serious organizers.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
        event: 'Luxury Wedding (200 guests)',
      },
    ],
  },

  // ── How It Works Section ────────────────────────────────
  howItWorks: {
    subtitle: 'How It Works',
    title: 'Find your vendors in 3 clicks',
    description: 'Three simple steps to organize the perfect event',
    video: {
      subtitle: 'Discover StarlinQ on video',
      title: 'Understand everything in 2 minutes',
      description: 'A guided tour of our platform to organize your perfect event',
      cta: 'Watch the demo',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&h=800&fit=crop',
    },
    steps: [
      {
        id: 1,
        title: 'Find',
        description:
          'Browse categories or use search to find the perfect vendor. Filter by location, budget and availability.',
        image: '/images/choice.png',
        imageAlt: 'Find a vendor',
        icon: 'fa:FaMagnifyingGlass',
        reverse: false,
      },
      {
        id: 2,
        title: 'Compare',
        description:
          'View detailed profiles, portfolios, pricing and authentic client reviews. Compare multiple vendors side by side.',
        image: '/images/compare.png',
        imageAlt: 'Compare vendors',
        icon: 'fa:FaChartBar',
        reverse: true,
      },
      {
        id: 3,
        title: 'Book!',
        description:
          'Contact directly or book online with complete security. Protected payment and customer support at every step.',
        image: '/images/book.png',
        imageAlt: 'Book a vendor',
        icon: 'fa:FaCircleCheck',
        reverse: false,
      },
    ],
  },

  // ── Become Provider Section (NEW) ───────────────────────
  becomeProvider: {
    subtitle: 'For Vendors',
    title: 'Are you an event professional?',
    description: 'Join over 500 professionals who trust StarlinQ',
    pitch:
      'Photographer, DJ, caterer, decorator, chef or other event professional? StarlinQ connects you with thousands of potential clients every month. No more spending fortunes on advertising.',
    advantages: [
      'Maximum visibility — Appear in front of thousands of clients every month',
      'Simplified management — Integrated calendar, automated bookings',
      'Zero risk — 3 first months FREE with code FOUNDER2026',
      'Dedicated support — Free training and technical assistance included',
    ],
    offer: {
      badge: '🎉 LAUNCH OFFER 🎉',
      title: 'First 50 vendors registered',
      benefits: [
        '3 months 100% FREE',
        'Permanent "Founding Member" badge',
        'Priority profile in searches',
        'Only $70/month after (instead of $120)',
      ],
      code: 'FOUNDER2026',
    },
    cta: {
      primary: 'Create my free profile',
      secondary: 'Learn more',
    },
    images: {
      main1:     'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=500&fit=crop',
      main2:     'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=700&fit=crop',
      floating1: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop',
      floating2: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=300&fit=crop',
      offerBg:   'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    },
  },

  // ── Contact Section ─────────────────────────────────────
  contact: {
    subtitle: 'Need Help?',
    title: 'Contact Us',
    heading: 'A question? Our team responds in under 24 hours',
    description:
      'Fill out the form below and we will get back to you quickly. We are here to help you organize the perfect event!',
    image: {
      src: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=800&h=800&fit=crop',
      alt: 'StarlinQ customer support',
    },
  },

  // ── Insights / Blog Section ─────────────────────────────
  insights: {
    subtitle: 'Tips & Inspiration',
    title: 'News & Articles',
    description:
      'Expert advice, trends and inspiration to organize your next event in Quebec.',
    items: [
      {
        title: 'How to Choose the Best Photographer for Your Wedding',
        date: 'March 15, 2026',
        category: 'Wedding',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
      },
      {
        title: 'Complete Guide to Organizing a Successful Corporate Event',
        date: 'March 10, 2026',
        category: 'Corporate',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      },
      {
        title: 'Top 10 Event Trends in Quebec for 2026',
        date: 'March 5, 2026',
        category: 'Trends',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
      },
      {
        title: 'DJ or Live Band: Which Music for Your Event?',
        date: 'February 28, 2026',
        category: 'Music',
        image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop',
      },
    ],
  },

  // ── Final CTA Section (NEW) ─────────────────────────────
  finalCta: {
    title: 'Ready to organize your perfect event?',
    subtitle: 'Join thousands of organizers who have simplified their lives with StarlinQ',
    buttons: {
      primary: 'Find my vendor',
      secondary: 'Become a vendor',
    },
    reassurance: 'Free • No commitment • Easy cancellation',
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    logo: 'StarlinQ',
    description: 'The event platform connecting organizers and vendors in Quebec since 2024.',
    sections: {
      about: {
        title: 'About Us',
        links: [
          { text: 'Who are we?', href: '#about' },
          { text: 'Our mission', href: '#' },
          { text: 'The team', href: '#' },
          { text: 'Careers', href: '#' },
          { text: 'Press', href: '#' },
        ],
      },
      clients: {
        title: 'For Clients',
        links: [
          { text: 'How it works', href: '#howItWorks' },
          { text: 'Find a vendor', href: '#' },
          { text: 'Event types', href: '#services' },
          { text: 'FAQ', href: '#' },
          { text: 'Support', href: '#contact' },
        ],
      },
      providers: {
        title: 'For Vendors',
        links: [
          { text: 'Become a vendor', href: '#becomeProvider' },
          { text: 'Pricing', href: '#' },
          { text: 'Getting started guide', href: '#' },
          { text: 'Resources', href: '#' },
          { text: 'Help center', href: '#contact' },
        ],
      },
      legal: {
        title: 'Legal',
        links: [
          { text: 'Terms of use', href: '#' },
          { text: 'Privacy policy', href: '#' },
          { text: 'Cookies', href: '#' },
          { text: 'Legal notice', href: '#' },
        ],
      },
    },
    contact: {
      title: 'Contact Us',
      address: 'Montreal, Quebec, Canada',
      phone: '1-855-STARLINQ',
      email: 'info@starlinq.ca',
    },
    copyright: '© 2026 StarlinQ Events Inc. All rights reserved.',
  },
};
