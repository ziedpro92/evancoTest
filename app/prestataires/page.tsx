'use client';

import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, MapPin, Star, Bookmark,
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Navigation,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import FinalCTA from '@/components/sections/FinalCTA';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CARDS_PER_PAGE = 4;

interface Prestataire {
  id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  avatar_url: string;
  cover_image_url: string;
  price_min: number;
  price_max: number;
  price_unit: string;
  rating_avg: number;
  review_count: number;
  availability_status: string;
  verified: boolean;
  featured: boolean;
  created_at: string;
  categories: Array<{ name_fr: string; name_en: string; slug: string; icon: string }>;
  event_types: Array<{ name_fr: string; name_en: string; slug: string }>;
}

interface Category {
  id: string;
  name_fr: string;
  name_en: string;
  slug: string;
  icon: string;
}

interface EventType {
  id: string;
  name_fr: string;
  name_en: string;
  slug: string;
}

interface FilterState {
  categories: string[];
  eventTypes: string[];
  budgetRange: string | null;
  minRating: number | null;
  availability: string | null;
  proximityKm: number | null;
}

/** Haversine distance in km between two lat/lng points */
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function PrestatairesPage() {
  const { language, ui } = useLanguage();
  const t = (ui as any).prestataires;
  const searchParams = useSearchParams();

  const [prestataires, setPrestataires]   = useState<Prestataire[]>([]);
  const [categories,   setCategories]     = useState<Category[]>([]);
  const [eventTypes,   setEventTypes]     = useState<EventType[]>([]);
  const [loading,      setLoading]        = useState(true);
  const [searchQuery,  setSearchQuery]    = useState('');
  const [sortBy,       setSortBy]         = useState('rating');
  const [page,         setPage]           = useState(1);
  const [logoVisible,  setLogoVisible]    = useState(true);
  const [heroSlide,    setHeroSlide]      = useState(0);
  const scrollYRef = useRef<number | null>(null);

  // Geolocation state
  const [userCoords,   setUserCoords]     = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus,    setGeoStatus]      = useState<'idle' | 'locating' | 'ok' | 'error'>('idle');

  const [filters, setFilters] = useState<FilterState>({
    categories: searchParams.get('category')?.split(',').filter(Boolean) || [],
    eventTypes:  searchParams.get('event')?.split(',').filter(Boolean)    || [],
    budgetRange: null,
    minRating:   null,
    availability: null,
    proximityKm: null,
  });

  // Fetch categories + event types
  useEffect(() => {
    async function fetchFilters() {
      const [{ data: cats }, { data: events }] = await Promise.all([
        supabase.from('categories').select('*').order('name_fr'),
        supabase.from('event_types').select('*').order('name_fr'),
      ]);
      if (cats)   setCategories(cats);
      if (events) setEventTypes(events);
    }
    fetchFilters();
  }, []);

  // Fetch prestataires
  useEffect(() => {
    async function fetchPrestataires() {
      setLoading(true);
      const { data } = await supabase
        .from('prestataires')
        .select(`
          *,
          categories:prestataire_categories(category:categories(name_fr, name_en, slug, icon)),
          event_types:prestataire_event_types(event_type:event_types(name_fr, name_en, slug))
        `);

      if (data) {
        setPrestataires(
          data.map((p: any) => ({
            ...p,
            categories:  p.categories.map((c: any)  => c.category),
            event_types: p.event_types.map((e: any)  => e.event_type),
          }))
        );
      }
      setLoading(false);
    }
    fetchPrestataires();
  }, []);

  // Request geolocation
  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) { setGeoStatus('error'); return; }
    setGeoStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus('ok');
      },
      () => setGeoStatus('error'),
      { timeout: 8000 }
    );
  }, []);

  // Auto-request when proximity filter is first activated
  useEffect(() => {
    if (filters.proximityKm && geoStatus === 'idle') requestGeolocation();
  }, [filters.proximityKm, geoStatus, requestGeolocation]);

  // Featured prestataires for hero carousel
  const featuredPrestataires = useMemo(() => {
    const featured = prestataires.filter(p => p.featured && p.cover_image_url);
    return featured.length > 0 ? featured : prestataires.filter(p => p.cover_image_url).slice(0, 6);
  }, [prestataires]);

  // Auto-advance hero carousel
  useEffect(() => {
    if (featuredPrestataires.length <= 1) return;
    const timer = setInterval(() => {
      setHeroSlide(i => (i + 1) % featuredPrestataires.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredPrestataires.length]);

  // Filter + sort
  const filteredPrestataires = useMemo(() => {
    let result = [...prestataires];

    const q = searchQuery.toLowerCase();
    if (q) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.categories.some(c => c.name_fr.toLowerCase().includes(q) || c.name_en.toLowerCase().includes(q))
      );
    }

    if (filters.categories.length > 0)
      result = result.filter(p => p.categories.some(c => filters.categories.includes(c.slug)));

    if (filters.eventTypes.length > 0)
      result = result.filter(p => p.event_types.some(e => filters.eventTypes.includes(e.slug)));

    if (filters.budgetRange) {
      const ranges: Record<string, [number, number]> = {
        'under-500':  [0, 500],
        '500-1000':   [500, 1000],
        '1000-2000':  [1000, 2000],
        '2000-3000':  [2000, 3000],
        'over-3000':  [3000, 999999],
      };
      const [min, max] = ranges[filters.budgetRange] || [0, 999999];
      result = result.filter(p => p.price_min >= min && p.price_min <= max);
    }

    if (filters.minRating)
      result = result.filter(p => p.rating_avg >= filters.minRating!);

    if (filters.availability)
      result = result.filter(p => p.availability_status === filters.availability);

    // Proximity filter
    if (filters.proximityKm && userCoords) {
      result = result.filter(p => {
        if (p.latitude == null || p.longitude == null) return false;
        return haversineKm(userCoords.lat, userCoords.lng, p.latitude, p.longitude) <= filters.proximityKm!;
      });
    }

    switch (sortBy) {
      case 'rating':     result.sort((a, b) => b.rating_avg - a.rating_avg); break;
      case 'price-low':  result.sort((a, b) => a.price_min - b.price_min);   break;
      case 'price-high': result.sort((a, b) => b.price_min - a.price_min);   break;
      case 'newest':     result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
    }

    return result;
  }, [prestataires, searchQuery, filters, sortBy, userCoords]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPrestataires.length / CARDS_PER_PAGE));
  const paginatedPrestataires = filteredPrestataires.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [searchQuery, filters, sortBy]);

  // Restore scroll position after page change — runs after DOM commit, before browser paint
  useLayoutEffect(() => {
    if (scrollYRef.current !== null) {
      window.scrollTo(0, scrollYRef.current);
      scrollYRef.current = null;
    }
  }, [page]);

  const goToPage = (newPage: number) => {
    scrollYRef.current = window.scrollY;
    setPage(newPage);
  };

  const clearAllFilters = () => {
    setFilters({ categories: [], eventTypes: [], budgetRange: null, minRating: null, availability: null, proximityKm: null });
    setSearchQuery('');
  };

  const hasActiveFilters =
    filters.categories.length > 0 || filters.eventTypes.length > 0 ||
    filters.budgetRange || filters.minRating || filters.availability ||
    filters.proximityKm || searchQuery;

  const getContextLabel = () => {
    if (filters.categories.length === 1 && filters.eventTypes.length === 1) {
      const cat = categories.find(c => c.slug === filters.categories[0]);
      const evt = eventTypes.find(e => e.slug === filters.eventTypes[0]);
      return `${cat?.[language === 'fr' ? 'name_fr' : 'name_en']} ${language === 'fr' ? 'pour' : 'for'} ${evt?.[language === 'fr' ? 'name_fr' : 'name_en']}`;
    }
    if (filters.categories.length === 1) {
      const cat = categories.find(c => c.slug === filters.categories[0]);
      return cat?.[language === 'fr' ? 'name_fr' : 'name_en'];
    }
    if (filters.eventTypes.length === 1) {
      const evt = eventTypes.find(e => e.slug === filters.eventTypes[0]);
      return `${language === 'fr' ? 'Prestataires pour' : 'Providers for'} ${evt?.[language === 'fr' ? 'name_fr' : 'name_en']}`;
    }
    return t.hero.title;
  };

  return (
    <>
      <Header logoVisible={logoVisible} />

      <main className="min-h-screen bg-gray-50">

        {/* ── Filters + Cards ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
          <div className="flex gap-8 items-start">

            {/* Desktop Filters — sticky, scrolls internally */}
            <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
              <FilterWidget
                categories={categories}
                eventTypes={eventTypes}
                filters={filters}
                setFilters={setFilters}
                clearAllFilters={clearAllFilters}
                hasActiveFilters={!!hasActiveFilters}
                t={t}
                resultCount={filteredPrestataires.length}
                geoStatus={geoStatus}
                onRequestGeo={requestGeolocation}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">

              {/* ── Provider Directory banner: slider as background ── */}
              <div className="relative rounded-2xl overflow-hidden mb-5 shadow-lg" style={{ minHeight: '260px' }}>

                {/* Background: cycling featured prestataire images */}
                {loading ? (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse" />
                ) : featuredPrestataires.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={heroSlide}
                      src={featuredPrestataires[heroSlide % featuredPrestataires.length].cover_image_url}
                      alt=""
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                ) : (
                  <div className="absolute inset-0 bg-gray-700" />
                )}

                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                {/* Text content */}
                <div className="relative z-10 flex flex-col justify-center h-full p-8" style={{ minHeight: '260px' }}>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-2"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                  >
                    {t.hero.subtitle}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-2xl lg:text-3xl font-serif text-white mb-3 leading-snug"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
                  >
                    {getContextLabel()}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-sm text-white/75 mb-5 max-w-md"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                  >
                    {t.hero.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex gap-6"
                  >
                    {[
                      { value: '500+', label: language === 'fr' ? 'Prestataires vérifiés' : 'Verified providers' },
                      { value: '4.9★', label: language === 'fr' ? 'Note moyenne' : 'Avg rating' },
                      { value: '5k+',  label: language === 'fr' ? 'Événements' : 'Events' },
                    ].map(stat => (
                      <div key={stat.value}>
                        <div className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>{stat.value}</div>
                        <div className="text-xs text-white/75 ">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Provider spotlight (bottom-right) */}
                {!loading && featuredPrestataires.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`spot-${heroSlide}`}
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute bottom-4 right-4 z-10 text-right"
                    >
                      <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2">
                        <div className="text-right">
                          <div className="text-white text-xs font-semibold leading-tight">
                            {featuredPrestataires[heroSlide % featuredPrestataires.length].name}
                          </div>
                          <div className="flex items-center justify-end gap-1.5 mt-0.5 text-white/70 text-xs">
                            <MapPin className="h-2.5 w-2.5" />
                            {featuredPrestataires[heroSlide % featuredPrestataires.length].city}
                            {featuredPrestataires[heroSlide % featuredPrestataires.length].rating_avg > 0 && (
                              <>
                                <span>·</span>
                                <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                                {featuredPrestataires[heroSlide % featuredPrestataires.length].rating_avg.toFixed(1)}
                              </>
                            )}
                          </div>
                        </div>
                        <span className="text-white text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--primary-color)' }}>
                          {t.card.featured}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Slide dots */}
                {!loading && featuredPrestataires.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {featuredPrestataires.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroSlide(i)}
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: i === heroSlide ? '1.5rem' : '0.375rem',
                          background: i === heroSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Search + Sort bar */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t.results.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="sm:w-52">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                    >
                      <option value="rating">{t.results.sort.rating}</option>
                      <option value="price-low">{t.results.sort.priceLow}</option>
                      <option value="price-high">{t.results.sort.priceHigh}</option>
                      <option value="newest">{t.results.sort.newest}</option>
                    </select>
                  </div>
                  {/* Mobile filter sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden border-PRIMARY text-PRIMARY">
                        <SlidersHorizontal className="h-5 w-5 mr-2" />
                        {t.results.filtersButton}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                      <FilterWidget
                        categories={categories}
                        eventTypes={eventTypes}
                        filters={filters}
                        setFilters={setFilters}
                        clearAllFilters={clearAllFilters}
                        hasActiveFilters={!!hasActiveFilters}
                        t={t}
                        resultCount={filteredPrestataires.length}
                        geoStatus={geoStatus}
                        onRequestGeo={requestGeolocation}
                      />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Active filter tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {filters.categories.map(slug => {
                    const cat = categories.find(c => c.slug === slug);
                    return cat ? (
                      <FilterTag key={slug}
                        label={cat[language === 'fr' ? 'name_fr' : 'name_en']}
                        onRemove={() => setFilters(f => ({ ...f, categories: f.categories.filter(c => c !== slug) }))}
                      />
                    ) : null;
                  })}
                  {filters.eventTypes.map(slug => {
                    const evt = eventTypes.find(e => e.slug === slug);
                    return evt ? (
                      <FilterTag key={slug}
                        label={evt[language === 'fr' ? 'name_fr' : 'name_en']}
                        onRemove={() => setFilters(f => ({ ...f, eventTypes: f.eventTypes.filter(e => e !== slug) }))}
                      />
                    ) : null;
                  })}
                  {filters.proximityKm && (
                    <FilterTag
                      label={t.filters.proximityOptions.label(filters.proximityKm)}
                      onRemove={() => setFilters(f => ({ ...f, proximityKm: null }))}
                    />
                  )}
                  {searchQuery && (
                    <FilterTag label={`"${searchQuery}"`} onRemove={() => setSearchQuery('')} />
                  )}
                </div>
              )}

              {/* Count */}
              <p className="text-sm text-gray-600 mb-5">
                <span className="font-semibold">{filteredPrestataires.length}</span>{' '}
                {t.results.count(filteredPrestataires.length).replace(/^\d+ /, '')}
              </p>

              {/* Cards grid */}
              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(CARDS_PER_PAGE)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredPrestataires.length === 0 ? (
                <EmptyState t={t} onClearFilters={clearAllFilters} />
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {paginatedPrestataires.map((p) => (
                      <PrestataireCard key={p.id} prestataire={p} t={t} language={language} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                      <button
                        onClick={() => goToPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-PRIMARY hover:text-PRIMARY disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        {t.pagination.prev}
                      </button>

                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                          .reduce<(number | '...')[]>((acc, n, idx, arr) => {
                            if (idx > 0 && typeof arr[idx - 1] === 'number' && (n as number) - (arr[idx - 1] as number) > 1)
                              acc.push('...');
                            acc.push(n);
                            return acc;
                          }, [])
                          .map((item, idx) =>
                            item === '...' ? (
                              <span key={`ellipsis-${idx}`} className="px-2 py-2 text-gray-400 text-sm">…</span>
                            ) : (
                              <button
                                key={item}
                                onClick={() => goToPage(item as number)}
                                className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                                  page === item
                                    ? 'text-white shadow-sm'
                                    : 'border border-gray-300 text-gray-700 hover:border-PRIMARY hover:text-PRIMARY'
                                }`}
                                style={page === item ? { background: 'var(--primary-color)' } : {}}
                              >
                                {item}
                              </button>
                            )
                          )}
                      </div>

                      <button
                        onClick={() => goToPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-PRIMARY hover:text-PRIMARY disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        {t.pagination.next}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <FinalCTA />
      <Footer />
    </>
  );
}

// ─────────────────────────── Filter Widget ───────────────────────────

function FilterWidget({ categories, eventTypes, filters, setFilters, clearAllFilters, hasActiveFilters, t, resultCount, geoStatus, onRequestGeo }: any) {
  const toggleCategory  = (slug: string) => setFilters((f: FilterState) => ({ ...f, categories:  f.categories.includes(slug)  ? f.categories.filter(c => c !== slug)  : [...f.categories, slug]  }));
  const toggleEventType = (slug: string) => setFilters((f: FilterState) => ({ ...f, eventTypes:  f.eventTypes.includes(slug)  ? f.eventTypes.filter(e => e !== slug)  : [...f.eventTypes,  slug]  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">{t.filters.title}</h3>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-sm text-PRIMARY hover:underline">
            {t.filters.clearAll}
          </button>
        )}
      </div>

      <div className="space-y-5">

        {/* Categories */}
        <FilterGroup title={t.filters.category}>
          {categories.map((cat: Category) => (
            <FilterCheckbox
              key={cat.id}
              label={`${cat.icon} ${cat.name_fr}`}
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggleCategory(cat.slug)}
            />
          ))}
        </FilterGroup>

        {/* Event types */}
        <FilterGroup title={t.filters.eventType}>
          {eventTypes.map((evt: EventType) => (
            <FilterCheckbox
              key={evt.id}
              label={evt.name_fr}
              checked={filters.eventTypes.includes(evt.slug)}
              onChange={() => toggleEventType(evt.slug)}
            />
          ))}
        </FilterGroup>

        {/* Budget */}
        <FilterGroup title={t.filters.budget}>
          {[
            { value: 'under-500',  label: t.filters.budgetOptions.under500 },
            { value: '500-1000',   label: '500$ – 1 000$' },
            { value: '1000-2000',  label: '1 000$ – 2 000$' },
            { value: '2000-3000',  label: '2 000$ – 3 000$' },
            { value: 'over-3000',  label: t.filters.budgetOptions.over3000 },
          ].map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.budgetRange === opt.value}
              onChange={() => setFilters((f: FilterState) => ({ ...f, budgetRange: f.budgetRange === opt.value ? null : opt.value }))}
            />
          ))}
        </FilterGroup>

        {/* Rating */}
        <FilterGroup title={t.filters.minRating}>
          {[{ value: 3, label: '3+ ⭐' }, { value: 4, label: '4+ ⭐⭐' }, { value: 4.5, label: '4.5+ ⭐⭐⭐' }].map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.minRating === opt.value}
              onChange={() => setFilters((f: FilterState) => ({ ...f, minRating: f.minRating === opt.value ? null : opt.value }))}
            />
          ))}
        </FilterGroup>

        {/* Availability */}
        <FilterGroup title={t.filters.availability}>
          {[
            { value: 'available', label: t.filters.availabilityOptions.available },
            { value: 'limited',   label: t.filters.availabilityOptions.limited },
            { value: 'complet',   label: t.filters.availabilityOptions.complet },
          ].map((opt) => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={filters.availability === opt.value}
              onChange={() => setFilters((f: FilterState) => ({ ...f, availability: f.availability === opt.value ? null : opt.value }))}
            />
          ))}
        </FilterGroup>

        {/* Geographic proximity */}
        <FilterGroup title={t.filters.proximity}>
          {/* Request location button */}
          {geoStatus === 'idle' && (
            <button
              onClick={onRequestGeo}
              className="flex items-center gap-2 text-sm text-PRIMARY hover:underline mb-2"
            >
              <Navigation className="h-4 w-4" />
              {t.filters.proximityOptions.locating.replace('…', '')}
              {' '}ma position
            </button>
          )}
          {geoStatus === 'locating' && (
            <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
              <Navigation className="h-3 w-3 animate-pulse text-PRIMARY" />
              {t.filters.proximityOptions.locating}
            </p>
          )}
          {geoStatus === 'error' && (
            <p className="text-xs text-red-500 mb-2">{t.filters.proximityOptions.error}</p>
          )}

          {(geoStatus === 'ok' || geoStatus === 'error') && t.filters.proximityKmOptions.map((km: number) => (
            <FilterCheckbox
              key={km}
              label={t.filters.proximityOptions.label(km)}
              checked={filters.proximityKm === km}
              onChange={() => setFilters((f: FilterState) => ({ ...f, proximityKm: f.proximityKm === km ? null : km }))}
            />
          ))}

          {geoStatus === 'idle' && t.filters.proximityKmOptions.map((km: number) => (
            <FilterCheckbox
              key={km}
              label={t.filters.proximityOptions.label(km)}
              checked={filters.proximityKm === km}
              onChange={() => {
                onRequestGeo();
                setFilters((f: FilterState) => ({ ...f, proximityKm: f.proximityKm === km ? null : km }));
              }}
            />
          ))}
        </FilterGroup>

      </div>
    </div>
  );
}

// ─────────────────────────── Sub-components ───────────────────────────

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="font-medium text-sm text-gray-900">{title}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300"
        style={{ accentColor: 'var(--primary-color)' }}
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
  );
}

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
      style={{ background: 'rgba(var(--primary-color-rgb),0.1)', color: 'var(--primary-color)' }}
    >
      {label}
      <button onClick={onRemove} className="rounded-full p-0.5 hover:bg-black/10">
        <X className="h-3 w-3" />
      </button>
    </motion.span>
  );
}

function PrestataireCard({ prestataire, t, language }: { prestataire: Prestataire; t: any; language: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
    >
      {/* Cover */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={prestataire.cover_image_url}
          alt={prestataire.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {prestataire.featured && (
          <span className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--primary-color)' }}>
            {t.card.featured}
          </span>
        )}
        {prestataire.verified && (
          <span className="absolute top-3 right-3 bg-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1" style={{ color: 'var(--primary-color)' }}>
            ✓ {t.card.verified}
          </span>
        )}
        <button className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow">
          <Bookmark className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <img src={prestataire.avatar_url} alt={prestataire.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 truncate">{prestataire.name}</h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" style={{ fill: 'var(--primary-color)', color: 'var(--primary-color)' }} />
                <span className="font-semibold text-gray-900">{prestataire.rating_avg.toFixed(1)}</span>
                <span>({prestataire.review_count})</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {prestataire.city}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{prestataire.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {prestataire.categories.slice(0, 2).map(cat => (
            <span key={cat.slug} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {cat.icon} {cat[language === 'fr' ? 'name_fr' : 'name_en']}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-sm text-gray-500">{t.card.from}</div>
            <div className="text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
              {prestataire.price_min}${' '}
              <span className="text-sm font-normal text-gray-500">/ {prestataire.price_unit}</span>
            </div>
          </div>
          <Button className="text-white rounded-full text-sm" style={{ background: 'var(--primary-color)' }}>
            {t.card.viewProfile}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3">
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            prestataire.availability_status === 'available' ? 'bg-green-100 text-green-700' :
            prestataire.availability_status === 'limited'   ? 'bg-yellow-100 text-yellow-700' :
                                                              'bg-red-100 text-red-700'
          }`}>
            {prestataire.availability_status === 'available' ? t.card.available :
             prestataire.availability_status === 'limited'   ? t.card.limited   : t.card.fullyBooked}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
          <div className="flex-1 space-y-2 pt-1">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-12" />
            <div className="h-5 bg-gray-200 rounded w-20" />
          </div>
          <div className="h-9 w-28 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ t, onClearFilters }: { t: any; onClearFilters: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.empty.title}</h3>
      <p className="text-gray-600 mb-6">{t.empty.description}</p>
      <Button onClick={onClearFilters} variant="outline" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>
        {t.empty.clearButton}
      </Button>
    </div>
  );
}
