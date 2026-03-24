/**
 * data/fr/content.ts
 * ──────────────────────────────────────────────────────────
 * StarlinQ — Contenu en français
 */

export const siteContent = {

  // ── Header / Navigation ─────────────────────────────────
  header: {
    logo: 'StarlinQ',
    nav: {
      providers: 'Nos prestataires',
      howItWorks: 'Comment ça marche',
      testimonials: 'Témoignages',
      contact: 'Contact',
    },
  },

  // ── Hero Carousel ───────────────────────────────────────
  carrouselContent: [
    {
      id: 1,
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop',
      eventType: '💍 Mariage',
      title: 'Trouvez l\'équipe parfaite pour votre mariage',
      description: 'Des prestataires vérifiés pour rendre votre mariage inoubliable. Photographes, DJ, traiteurs et décorateurs au meilleur prix.',
      sponsored: true,
      ctaText: 'Voir le profil',
    },
    {
      id: 2,
      img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop',
      eventType: '🎵 DJ & Musique',
      title: 'Musique pour faire vibrer vos invités',
      description: 'DJ professionnels et musiciens pour tous vos événements. Une ambiance garantie du début à la fin.',
      sponsored: true,
      ctaText: 'Voir le profil',
    },
    {
      id: 3,
      img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=800&fit=crop',
      eventType: '🍽️ Traiteur',
      title: 'Des saveurs de chefs pour vos invités',
      description: 'Traiteurs gastronomiques et service impeccable. Cuisine raffinée pour tous vos événements au Québec.',
      sponsored: true,
      ctaText: 'Voir le profil',
    },
    {
      id: 4,
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1169&auto=format&fit=crop',
      eventType: '✨ Événements',
      title: 'Créez des moments inoubliables',
      description: 'Tous les professionnels dont vous avez besoin pour un événement parfait. Simple, rapide, sécurisé.',
      sponsored: true,
      ctaText: 'Voir le profil',
    },
  ],

  // ── Quick Search Section (NEW) ──────────────────────────
  quickSearch: {
    title: 'Organisez l\'événement parfait',
    subtitle: 'Trouvez les meilleurs prestataires du Québec en quelques clics',
    searchPlaceholder: 'Chercher un photographe, DJ, traiteur, décorateur...',
    searchButton: 'Rechercher',
    quickFilters: ['Photographe', 'DJ', 'Traiteur', 'Décorateur', 'Chef', 'Musicien'],
  },

  // ── Hero Section ────────────────────────────────────────
  hero: {
    title: 'Connectez-vous aux meilleurs prestataires du Québec',
    description: 'StarlinQ simplifie l\'organisation de vos événements en vous mettant en contact avec des professionnels vérifiés et passionnés. Mariage, festival, corporatif ou fête privée — nous avons les experts qu\'il vous faut.',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
        alt: 'Mariage élégant',
      },
      {
        src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=500&fit=crop',
        alt: 'Événement festif',
      },
      {
        src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop',
        alt: 'Table dressée',
      },
      {
        src: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400&h=400&fit=crop',
        alt: 'Moment spécial',
      },
    ],
  },

  // ── About Section ───────────────────────────────────────
  about: {
    subtitle: 'Qu\'est-ce que StarlinQ ?',
    title: 'La plateforme qui connecte organisateurs et prestataires',
    paragraph1:
      'StarlinQ est LA plateforme qui connecte les organisateurs d\'événements aux meilleurs prestataires du Québec. Que vous organisiez un mariage, un festival, un événement corporatif ou une fête privée, nous vous mettons en contact avec des professionnels vérifiés et passionnés.',
    paragraph2:
      'Simple, rapide, sécurisé — organisez l\'événement de vos rêves en toute confiance. Plus besoin de chercher pendant des heures, tout est centralisé sur StarlinQ.',
    pillars: [
      {
        icon: '🎯',
        title: 'Simple',
        description: 'Recherchez, comparez, réservez — tout en un endroit',
      },
      {
        icon: '⭐',
        title: 'Qualité',
        description: 'Prestataires vérifiés avec avis clients authentiques',
      },
      {
        icon: '🔒',
        title: 'Sécurisé',
        description: 'Paiements protégés et support client dédié',
      },
    ],
    stats: {
      events: { value: '500+', label: 'Prestataires vérifiés' },
      clients: { value: '5 000+', label: 'Événements réussis' },
      awards: { value: '98%', label: 'Satisfaction client' },
    },
  },

  // ── Services / Event Types Section ──────────────────────
  services: {
    subtitle: 'Types d\'événements',
    title: 'Quel type d\'événement organisez-vous ?',
    items: [
      {
        title: 'Mariages',
        description: 'Photographes, DJ, traiteurs et décorateurs pour le plus beau jour de votre vie.',
        tag: 'Populaire',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
      },
      {
        title: 'Festivals & Corporatifs',
        description: 'Scènes, sonorisation, éclairage et animation pour vos grands événements.',
        tag: 'Premium',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      },
      {
        title: 'Fêtes Privées',
        description: 'Anniversaires, baptêmes, showers — des professionnels pour chaque occasion.',
        tag: 'Festif',
        image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop',
      },
      {
        title: 'Gastronomie',
        description: 'Chefs et traiteurs gastronomiques pour une expérience culinaire inoubliable.',
        tag: 'Exclusif',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
      },
    ],
  },

  // ── Events Gallery Section ──────────────────────────────
  eventsGallery: {
    subtitle: 'Galerie d\'événements',
    title: 'Nos plus beaux événements',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(251, 207, 232, 0.45)',
        caption: 'Là où les histoires d\'amour commencent',
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
        span: 'col-span-1 row-span-2',
        overlay: 'rgba(254, 240, 138, 0.40)',
        caption: 'Des soirées gravées à jamais',
      },
      {
        url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(221, 214, 254, 0.45)',
        caption: 'Chaque note, un souvenir',
      },
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(186, 230, 253, 0.45)',
        caption: 'Des connexions qui inspirent',
      },
      {
        url: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=800&fit=crop',
        span: 'col-span-1 row-span-2',
        overlay: 'rgba(254, 215, 170, 0.45)',
        caption: 'Célébrer ceux que vous aimez',
      },
      {
        url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(187, 247, 208, 0.45)',
        caption: 'L\'énergie dans chaque moment',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1169&auto=format&fit=crop',
        span: 'col-span-1 row-span-1',
        overlay: 'rgba(153, 246, 228, 0.45)',
        caption: 'Un style qui parle de lui-même',
      },
    ],
  },

  // ── Statistics Section ──────────────────────────────────
  statistics: {
    stats: [
      { value: '500+', label: 'Prestataires vérifiés' },
      { value: '5 000+', label: 'Événements réussis' },
      { value: '98%', label: 'Taux de satisfaction' },
      { value: '4.9/5', label: 'Note moyenne' },
    ],
  },

  // ── Best Providers Section ──────────────────────────────
  bestProviders: {
    subtitle: 'Prestataires vérifiés',
    title: 'Nos prestataires les mieux notés',
    description: 'Découvrez les professionnels vérifiés qui font la différence au Québec',
    items: [
      {
        id: 1,
        name: 'Studio Photo Pro',
        location: 'Montréal, QC',
        specialty: 'Photographe',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
        price: '800',
        duration: 'événement',
        rating: 4.9,
        reviewCount: 142,
      },
      {
        id: 2,
        name: 'DJ Elite Sound',
        location: 'Montréal, QC',
        specialty: 'DJ Professionnel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
        price: '600',
        duration: 'événement',
        rating: 4.8,
        reviewCount: 98,
      },
      {
        id: 3,
        name: 'Traiteur Gourmet',
        location: 'Laval, QC',
        specialty: 'Traiteur',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
        price: '45',
        duration: 'pers.',
        rating: 5.0,
        reviewCount: 211,
      },
      {
        id: 4,
        name: 'Chef Prestige',
        location: 'Montréal, QC',
        specialty: 'Chef à domicile',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        eventImage: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=600&h=400&fit=crop',
        price: '120',
        duration: 'pers.',
        rating: 4.7,
        reviewCount: 76,
      },
    ],
  },

  // ── Why StarlinQ Section (NEW) ──────────────────────────
  whyStarlinQ: {
    subtitle: 'Nos avantages',
    title: 'Pourquoi choisir StarlinQ ?',
    advantages: [
      {
        id: 1,
        icon: '✓',
        title: 'Prestataires 100% Vérifiés',
        description: 'Tous nos prestataires sont vérifiés manuellement. Assurance, licences, portfolio — nous vérifions tout pour votre tranquillité d\'esprit.',
      },
      {
        id: 2,
        icon: '⭐',
        title: 'Avis Clients Authentiques',
        description: 'Seuls les clients ayant réellement réservé peuvent laisser un avis. Notes transparentes, commentaires détaillés, zéro faux avis.',
      },
      {
        id: 3,
        icon: '💰',
        title: 'Meilleurs Prix Garantis',
        description: 'Comparez les prix en toute transparence. Aucun frais caché. Économisez en moyenne 20% vs agences traditionnelles.',
      },
      {
        id: 4,
        icon: '🔒',
        title: 'Paiement 100% Sécurisé',
        description: 'Paiements protégés par Stripe. Argent bloqué jusqu\'à la prestation. Remboursement garanti en cas de problème.',
      },
    ],
  },

  // ── Testimonials Section ────────────────────────────────
  testimonials: {
    subtitle: 'Témoignages',
    title: 'Ce que nos clients disent de nous',
    description: 'Plus de 5 000 événements réussis grâce à StarlinQ',
    items: [
      {
        name: 'Sarah & Marc Dubois',
        role: 'Mariés en juin 2025',
        content:
          'StarlinQ a rendu l\'organisation de notre mariage si simple! Les prestataires sont qualifiés, les prix transparents, et le service client impeccable. Nous avons trouvé notre photographe, DJ et traiteur en moins d\'une semaine. Je recommande à 100%!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        event: 'Mariage (150 invités)',
      },
      {
        name: 'Jean-François Rousseau',
        role: 'Organisateur de festivals',
        content:
          'En tant qu\'organisateur d\'événements corporatifs, j\'ai besoin de prestataires fiables et professionnels. StarlinQ m\'a fait gagner un temps précieux — tout est centralisé, les avis sont authentiques, et la réservation est instantanée.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        event: 'Festival d\'été (2 000+ participants)',
      },
      {
        name: 'Gabrielle Lemieux',
        role: 'Directrice RH',
        content:
          'Pour nos événements d\'entreprise, StarlinQ est devenu notre partenaire incontournable. La qualité des prestataires, la facilité d\'utilisation, et le support client sont exceptionnels.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        event: 'Party de Noël (300 employés)',
      },
      {
        name: 'Marie-Ève Tremblay',
        role: 'Mariée en août 2025',
        content:
          'Grâce à StarlinQ, organiser mon mariage a été un vrai plaisir ! J\'ai trouvé tous mes prestataires en un seul endroit et les avis m\'ont aidée à choisir en toute confiance. Résultat : une journée parfaite !',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
        event: 'Mariage champêtre (80 invités)',
      },
      {
        name: 'Alexandre Bergeron',
        role: 'Directeur artistique',
        content:
          'J\'organise des événements depuis 10 ans et StarlinQ est de loin le meilleur outil que j\'ai utilisé. La recherche de prestataires est fluide, les profils sont détaillés et les réservations sont simples.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        event: 'Gala annuel (500 personnes)',
      },
      {
        name: 'Isabelle Côté',
        role: 'Coordinatrice d\'événements',
        content:
          'Platform intuitive, prestataires de qualité, support réactif. StarlinQ a révolutionné ma façon de travailler. Je recommande à tous mes collègues dans l\'industrie événementielle.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
        event: 'Conférence corporative (400 délégués)',
      },
      {
        name: 'Mathieu Lavoie',
        role: 'Fondateur de startup',
        content:
          'StarlinQ nous a permis d\'organiser notre fête de lancement avec un budget serré et un résultat impressionnant. Les prestataires vérifiés nous ont donné confiance dès le départ.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
        event: 'Lancement de produit (120 invités)',
      },
      {
        name: 'Sophie Nguyen',
        role: 'Organisatrice de mariage',
        content:
          'En tant que professionnelle, je fais confiance à StarlinQ pour trouver des partenaires fiables et innovants. La plateforme est une vraie mine d\'or pour les organisateurs sérieux.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
        event: 'Mariage de luxe (200 invités)',
      },
    ],
  },

  // ── How It Works Section ────────────────────────────────
  howItWorks: {
    subtitle: 'Comment ça marche',
    title: 'Trouvez vos prestataires en 3 clics',
    description: 'Trois étapes simples pour organiser l\'événement parfait',
    video: {
      subtitle: 'Découvrez StarlinQ en vidéo',
      title: 'Tout comprendre en 2 minutes',
      description: 'Une visite guidée de notre plateforme pour organiser votre événement parfait',
      cta: 'Regarder la démo',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&h=800&fit=crop',
    },
    steps: [
      {
        id: 1,
        title: 'Trouvez',
        description:
          'Parcourez les catégories ou utilisez la recherche pour trouver le prestataire parfait. Filtrez par localisation, budget et disponibilité.',
        image: '/images/choice.png',
        imageAlt: 'Chercher un prestataire',
        reverse: false,
      },
      {
        id: 2,
        title: 'Comparez',
        description:
          'Consultez les profils détaillés, portfolios, tarifs et avis clients authentiques. Comparez plusieurs prestataires côte à côte.',
        image: '/images/compare.png',
        imageAlt: 'Comparer les prestataires',
        reverse: true,
      },
      {
        id: 3,
        title: 'Réservez!',
        description:
          'Contactez directement ou réservez en ligne en toute sécurité. Paiement protégé et support client à chaque étape.',
        image: '/images/book.png',
        imageAlt: 'Réserver un prestataire',
        reverse: false,
      },
    ],
  },

  // ── Become Provider Section (NEW) ───────────────────────
  becomeProvider: {
    subtitle: 'Pour les prestataires',
    title: 'Vous êtes prestataire événementiel ?',
    description: 'Rejoignez plus de 500 professionnels qui font confiance à StarlinQ',
    pitch:
      'Photographe, DJ, traiteur, décorateur, chef ou autre professionnel de l\'événementiel ? StarlinQ vous connecte avec des milliers de clients potentiels chaque mois. Plus besoin de dépenser des fortunes en publicité.',
    advantages: [
      'Visibilité maximale — Apparaissez devant des milliers de clients chaque mois',
      'Gestion simplifiée — Calendrier intégré, réservations automatisées',
      'Zéro risque — 3 premiers mois GRATUITS avec code FONDATEUR2026',
      'Support dédié — Formation gratuite, assistance technique incluse',
    ],
    offer: {
      badge: '🎉 OFFRE DE LANCEMENT 🎉',
      title: '50 premiers prestataires inscrits',
      benefits: [
        '3 mois 100% GRATUITS',
        'Badge "Membre Fondateur" permanent',
        'Profil prioritaire dans les recherches',
        'Seulement 70$/mois après (au lieu de 120$)',
      ],
      code: 'FONDATEUR2026',
    },
    cta: {
      primary: 'Créer mon profil gratuitement',
      secondary: 'En savoir plus',
    },
    image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=800&h=800&fit=crop',
  },

  // ── Contact Section ─────────────────────────────────────
  contact: {
    subtitle: 'Besoin d\'aide ?',
    title: 'Contactez-nous',
    heading: 'Une question ? Notre équipe répond en moins de 24h',
    description:
      'Remplissez le formulaire ci-dessous et nous reviendrons vers vous rapidement. Nous sommes là pour vous aider à organiser l\'événement parfait !',
    image: {
      src: 'https://images.unsplash.com/photo-1553775282-20af80779df7?w=800&h=800&fit=crop',
      alt: 'Support client StarlinQ',
    },
  },

  // ── Insights / Blog Section ─────────────────────────────
  insights: {
    subtitle: 'Conseils & Inspirations',
    title: 'Actualités & Articles',
    description:
      'Conseils d\'experts, tendances et inspirations pour organiser votre prochain événement au Québec.',
    items: [
      {
        title: 'Comment choisir le meilleur photographe pour votre mariage',
        date: '15 mars 2026',
        category: 'Mariage',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
      },
      {
        title: 'Guide complet pour organiser un événement corporatif réussi',
        date: '10 mars 2026',
        category: 'Corporatif',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
      },
      {
        title: 'Top 10 des tendances événementielles au Québec en 2026',
        date: '5 mars 2026',
        category: 'Tendances',
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop',
      },
      {
        title: 'DJ ou groupe live : quelle musique pour votre événement ?',
        date: '28 février 2026',
        category: 'Musique',
        image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop',
      },
    ],
  },

  // ── Final CTA Section (NEW) ─────────────────────────────
  finalCta: {
    title: 'Prêt à organiser votre événement parfait ?',
    subtitle: 'Rejoignez des milliers d\'organisateurs qui ont simplifié leur vie avec StarlinQ',
    buttons: {
      primary: 'Trouver mon prestataire',
      secondary: 'Devenir prestataire',
    },
    reassurance: 'Gratuit • Sans engagement • Annulation facile',
  },

  // ── Footer ──────────────────────────────────────────────
  footer: {
    logo: 'StarlinQ',
    description: 'La plateforme événementielle qui connecte organisateurs et prestataires au Québec depuis 2024.',
    sections: {
      about: {
        title: 'À Propos',
        links: [
          { text: 'Qui sommes-nous ?', href: '#about' },
          { text: 'Notre mission', href: '#' },
          { text: 'L\'équipe', href: '#' },
          { text: 'Carrières', href: '#' },
          { text: 'Presse', href: '#' },
        ],
      },
      clients: {
        title: 'Pour les Clients',
        links: [
          { text: 'Comment ça marche', href: '#howItWorks' },
          { text: 'Trouver un prestataire', href: '#' },
          { text: 'Types d\'événements', href: '#services' },
          { text: 'FAQ', href: '#' },
          { text: 'Support', href: '#contact' },
        ],
      },
      providers: {
        title: 'Pour les Prestataires',
        links: [
          { text: 'Devenir prestataire', href: '#becomeProvider' },
          { text: 'Tarifs', href: '#' },
          { text: 'Guide de démarrage', href: '#' },
          { text: 'Ressources', href: '#' },
          { text: 'Centre d\'aide', href: '#contact' },
        ],
      },
      legal: {
        title: 'Légal',
        links: [
          { text: 'Conditions d\'utilisation', href: '#' },
          { text: 'Confidentialité', href: '#' },
          { text: 'Cookies', href: '#' },
          { text: 'Mentions légales', href: '#' },
        ],
      },
    },
    contact: {
      title: 'Nous contacter',
      address: 'Montréal, Québec, Canada',
      phone: '1-855-STARLINQ',
      email: 'info@starlinq.ca',
    },
    copyright: '© 2026 StarlinQ Events Inc. Tous droits réservés.',
  },
};
