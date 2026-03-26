/**
 * data/fr/dataUi.ts
 * ──────────────────────────────────────────────────────────
 * StarlinQ — Labels UI en français
 */

export const uiContent = {

  // ── Header ──────────────────────────────────────────────
  header: {
    searchPlaceholder: 'Rechercher...',
    ctaButton: 'Commencer',
  },

  // ── Loader ──────────────────────────────────────────────
  loader: {
    loadingText: 'Préparation de votre expérience',
  },

  // ── Hero ────────────────────────────────────────────────
  hero: {
    primaryButton: 'Trouver un prestataire',
    secondaryButton: 'En savoir plus',
  },

  // ── Carousel ────────────────────────────────────────────
  carousel: {
    featuredLabel: 'Prestataire vedette',
    specialLabel: 'Événement spécial',
    discoverButton: 'Voir le profil',
    prevAriaLabel: 'Slide précédente',
    nextAriaLabel: 'Slide suivante',
  },

  // ── Quick Search ────────────────────────────────────────
  quickSearch: {
    placeholder: 'Chercher un photographe, DJ, traiteur...',
    button: 'Rechercher',
  },

  // ── Services ────────────────────────────────────────────
  services: {
    cardCta: 'Explorer',
    viewAllButton: 'Voir tous les types',
  },

  // ── Events Gallery ──────────────────────────────────────
  eventsGallery: {
    loadMoreButton: 'Voir plus',
  },

  // ── Best Providers ──────────────────────────────────────
  bestProviders: {
    viewProfileButton: 'Voir le profil',
    currencySymbol: '$',
    prevAriaLabel: 'Prestataire précédent',
    nextAriaLabel: 'Prestataire suivant',
    dotAriaLabel: 'Aller au prestataire',
  },

  // ── Insights ────────────────────────────────────────────
  insights: {
    viewAllButton: 'Voir tous les articles',
  },

  // ── Contact form ────────────────────────────────────────
  contact: {
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'Adresse courriel',
    phonePlaceholder: 'Numéro de téléphone',
    eventTypePlaceholder: 'Type d\'événement',
    messagePlaceholder: 'Parlez-nous de votre événement...',
    submitButton: 'Envoyer le message',
  },

  // ── Color picker (theme switcher) ───────────────────────
  colorPicker: {
    title: 'Changer la couleur du thème',
    mobileLabel: 'Couleur du thème',
  },

  // ── Language selector ───────────────────────────────────
  languageSelector: {
    label: 'Langue',
  },

  // ── Generic mobile swiper ───────────────────────────────
  swiper: {
    prevAriaLabel: 'Slide précédente',
    nextAriaLabel: 'Slide suivante',
    goToSlideAriaLabel: 'Aller à la slide',
  },

  // ── Become Provider ────────────────────────────────────
  becomeProvider: {
    verifiedBadge: 'VÉRIFIÉ',
  },

  // ── Prestataires page ───────────────────────────────────
  prestataires: {
    hero: {
      subtitle: 'Annuaire des prestataires',
      title: 'Trouvez le prestataire parfait pour votre événement',
      description: 'Des centaines de professionnels vérifiés, prêts à faire de votre événement un moment inoubliable.',
      searchPlaceholder: 'Rechercher un prestataire, une ville…',
      searchButton: 'Rechercher',
    },
    filters: {
      title: 'Filtres',
      clearAll: 'Tout effacer',
      category: 'Catégorie',
      eventType: 'Type d\'événement',
      budget: 'Budget',
      minRating: 'Note minimale',
      availability: 'Disponibilité',
      proximity: 'Proximité',
      budgetOptions: {
        under500: 'Moins de 500$',
        over3000: 'Plus de 3000$',
      },
      availabilityOptions: {
        available: 'Disponible',
        limited: 'Limité',
        complet: 'Complet',
      },
      proximityOptions: {
        locating: 'Localisation…',
        error: 'Localisation refusée',
        label: (km: number) => `≤ ${km} km`,
      },
      proximityKmOptions: [10, 25, 50, 100],
    },
    results: {
      sort: {
        label: 'Trier',
        rating: 'Mieux notés',
        priceLow: 'Prix croissant',
        priceHigh: 'Prix décroissant',
        newest: 'Plus récents',
      },
      searchPlaceholder: 'Rechercher…',
      filtersButton: 'Filtres',
      count: (n: number) => `${n} prestataire${n !== 1 ? 's' : ''} trouvé${n !== 1 ? 's' : ''}`,
    },
    card: {
      featured: 'Vedette',
      verified: 'Vérifié',
      from: 'À partir de',
      viewProfile: 'Voir le profil',
      available: '✓ Disponible',
      limited: '⚠ Disponibilité limitée',
      fullyBooked: '✗ Complet',
    },
    empty: {
      title: 'Aucun prestataire trouvé',
      description: 'Essayez d\'élargir votre recherche en ajustant ou supprimant certains filtres.',
      clearButton: 'Effacer tous les filtres',
    },
    pagination: {
      prev: 'Précédent',
      next: 'Suivant',
      of: 'sur',
    },
  },
};
