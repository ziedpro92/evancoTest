/**
 * data/en/dataUi.ts
 * ──────────────────────────────────────────────────────────
 * StarlinQ — English UI labels
 */

export const uiContent = {

  // ── Header ──────────────────────────────────────────────
  header: {
    searchPlaceholder: 'Search...',
    ctaButton: 'Get Started',
  },

  // ── Loader ──────────────────────────────────────────────
  loader: {
    loadingText: 'Preparing your experience',
  },

  // ── Hero ────────────────────────────────────────────────
  hero: {
    primaryButton: 'Find a Vendor',
    secondaryButton: 'Learn More',
  },

  // ── Carousel ────────────────────────────────────────────
  carousel: {
    featuredLabel: 'Featured Vendor',
    specialLabel: 'Special Event',
    discoverButton: 'View Profile',
    prevAriaLabel: 'Previous slide',
    nextAriaLabel: 'Next slide',
  },

  // ── Quick Search ────────────────────────────────────────
  quickSearch: {
    placeholder: 'Search for a photographer, DJ, caterer...',
    button: 'Search',
  },

  // ── Services ────────────────────────────────────────────
  services: {
    cardCta: 'Explore',
    viewAllButton: 'View All Types',
  },

  // ── Events Gallery ──────────────────────────────────────
  eventsGallery: {
    loadMoreButton: 'Load More',
  },

  // ── Best Providers ──────────────────────────────────────
  bestProviders: {
    viewProfileButton: 'View Profile',
    currencySymbol: '$',
    prevAriaLabel: 'Previous vendor',
    nextAriaLabel: 'Next vendor',
    dotAriaLabel: 'Go to vendor',
  },

  // ── Insights ────────────────────────────────────────────
  insights: {
    viewAllButton: 'View All Articles',
  },

  // ── Contact form ────────────────────────────────────────
  contact: {
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Email Address',
    phonePlaceholder: 'Phone Number',
    eventTypePlaceholder: 'Event Type',
    messagePlaceholder: 'Tell us about your event...',
    submitButton: 'Send Message',
  },

  // ── Color picker (theme switcher) ───────────────────────
  colorPicker: {
    title: 'Change theme color',
    mobileLabel: 'Theme color',
  },

  // ── Language selector ───────────────────────────────────
  languageSelector: {
    label: 'Language',
  },

  // ── Generic mobile swiper ───────────────────────────────
  swiper: {
    prevAriaLabel: 'Previous slide',
    nextAriaLabel: 'Next slide',
    goToSlideAriaLabel: 'Go to slide',
  },

  // ── Become Provider ────────────────────────────────────
  becomeProvider: {
    verifiedBadge: 'VERIFIED',
  },

  // ── Prestataires page ───────────────────────────────────
  prestataires: {
    hero: {
      subtitle: 'Provider Directory',
      title: 'Find the perfect provider for your event',
      description: 'Hundreds of verified professionals, ready to make your event an unforgettable moment.',
      searchPlaceholder: 'Search a provider, a city…',
      searchButton: 'Search',
    },
    filters: {
      title: 'Filters',
      clearAll: 'Clear all',
      category: 'Category',
      eventType: 'Event Type',
      budget: 'Budget',
      minRating: 'Minimum Rating',
      availability: 'Availability',
      proximity: 'Proximity',
      budgetOptions: {
        under500: 'Under $500',
        over3000: 'Over $3,000',
      },
      availabilityOptions: {
        available: 'Available',
        limited: 'Limited',
        complet: 'Fully booked',
      },
      proximityOptions: {
        locating: 'Locating…',
        error: 'Location denied',
        label: (km: number) => `≤ ${km} km`,
      },
      proximityKmOptions: [10, 25, 50, 100],
    },
    results: {
      sort: {
        label: 'Sort',
        rating: 'Highest rated',
        priceLow: 'Price: Low to High',
        priceHigh: 'Price: High to Low',
        newest: 'Newest first',
      },
      searchPlaceholder: 'Search…',
      filtersButton: 'Filters',
      count: (n: number) => `${n} provider${n !== 1 ? 's' : ''} found`,
    },
    card: {
      featured: 'Featured',
      verified: 'Verified',
      from: 'From',
      viewProfile: 'View profile',
      available: '✓ Available',
      limited: '⚠ Limited availability',
      fullyBooked: '✗ Fully booked',
    },
    empty: {
      title: 'No providers found',
      description: 'Try broadening your search by adjusting or removing some filters.',
      clearButton: 'Clear all filters',
    },
    pagination: {
      prev: 'Previous',
      next: 'Next',
      of: 'of',
    },
  },
};
