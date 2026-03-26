'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut, Save, CheckCircle, Globe, Palette,
  LayoutTemplate, Newspaper, Info, Grid2X2,
  ChevronDown, ChevronUp, ExternalLink, RefreshCw, SlidersHorizontal, Eye,
  Menu, Search, BarChart3, Images, Star, Shield,
  MessageSquare, Workflow, UserPlus, Mail, BookOpen, Zap, PanelBottom, Plus, Trash2,
} from 'lucide-react';
import AdvancedColorPicker from '@/components/ui/AdvancedColorPicker';
import ImageUploadField from '@/components/ui/ImageUploadField';
import EmojiIconPickerField from '@/components/ui/EmojiIconPickerField';
import { siteContent as frContent } from '@/data/fr/content';
import { siteContent as enContent } from '@/data/en/content';

// ── Types ────────────────────────────────────────────────────────────
type Lang = 'fr' | 'en';
type Section =
  | 'header' | 'carousel' | 'quickSearch' | 'hero' | 'about' | 'statistics'
  | 'howItWorks' | 'services' | 'whyStarlinQ' | 'bestProviders' | 'testimonials'
  | 'becomeProvider' | 'eventsGallery' | 'contact' | 'insights' | 'finalCta'
  | 'footer' | 'theme';

const ALLOWED_EMAIL = 'ziedmu1992@gmail.com';

// ── Storage helpers ──────────────────────────────────────────────────
function getOverrides(lang: Lang): Record<string, any> {
  try { const r = localStorage.getItem(`starlinq_override_${lang}`); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
}
function saveOverride(lang: Lang, section: string, data: any) {
  try { const e = getOverrides(lang); e[section] = data; localStorage.setItem(`starlinq_override_${lang}`, JSON.stringify(e)); }
  catch {}
}
function deepClone<T>(v: T): T { return JSON.parse(JSON.stringify(v)); }

const CONTENT_KEY: Partial<Record<Section, string>> = { carousel: 'carrouselContent' };

function getSectionData(section: Section, lang: Lang): any {
  const base: any = lang === 'fr' ? frContent : enContent;
  const key = CONTENT_KEY[section] ?? section;
  const overrides = getOverrides(lang);
  const baseVal = deepClone(base[key]);
  const ov = overrides[section];
  if (!ov) return baseVal;
  if (Array.isArray(baseVal)) return deepClone(ov);
  return { ...baseVal, ...ov };
}

// ── Color helpers ────────────────────────────────────────────────────
function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : null;
}
function darkenHex(hex: string, amount = 0.08) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return hex;
  const c = (v: number) => Math.max(0, Math.min(255, v));
  const d = Math.round(255 * amount);
  return '#' + [1, 2, 3].map(i => c(parseInt(r[i], 16) - d).toString(16).padStart(2, '0')).join('');
}
function applyColor(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  document.documentElement.style.setProperty('--primary-color', hex);
  document.documentElement.style.setProperty('--primary-color-dark', darkenHex(hex));
  document.documentElement.style.setProperty('--primary-color-rgb', rgb);
  try { localStorage.setItem('primary-color', hex); } catch {}
  try { window.dispatchEvent(new CustomEvent('primaryColorChanged')); } catch {}
}

// ── NAV (page order) ─────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'header',        label: 'Menu / Navigation',   icon: <Menu size={16} /> },
  { id: 'carousel',      label: 'Carousel Hero',       icon: <LayoutTemplate size={16} /> },
  { id: 'quickSearch',   label: 'Recherche rapide',    icon: <Search size={16} /> },
  { id: 'hero',          label: 'Section Hero',        icon: <Newspaper size={16} /> },
  { id: 'about',         label: 'À propos',            icon: <Info size={16} /> },
  { id: 'statistics',    label: 'Statistiques',        icon: <BarChart3 size={16} /> },
  { id: 'howItWorks',    label: 'Comment ça marche',   icon: <Workflow size={16} /> },
  { id: 'services',      label: 'Services',            icon: <Grid2X2 size={16} /> },
  { id: 'whyStarlinQ',   label: 'Pourquoi StarlinQ',  icon: <Shield size={16} /> },
  { id: 'bestProviders', label: 'Meilleurs presta.',   icon: <Star size={16} /> },
  { id: 'testimonials',  label: 'Témoignages',         icon: <MessageSquare size={16} /> },
  { id: 'becomeProvider',label: 'Devenir prestataire', icon: <UserPlus size={16} /> },
  { id: 'eventsGallery', label: 'Galerie événements',  icon: <Images size={16} /> },
  { id: 'contact',       label: 'Contact',             icon: <Mail size={16} /> },
  { id: 'insights',      label: 'Articles / Blog',     icon: <BookOpen size={16} /> },
  { id: 'finalCta',      label: 'CTA final',           icon: <Zap size={16} /> },
  { id: 'footer',        label: 'Pied de page',        icon: <PanelBottom size={16} /> },
  { id: 'theme',         label: 'Couleur du thème',    icon: <Palette size={16} /> },
];

const SECTION_ANCHORS: Record<Section, string | null> = {
  header: null,        carousel: 'section-carousel',  quickSearch: 'section-quicksearch',
  hero: 'section-hero', about: 'section-about',       statistics: 'section-statistics',
  howItWorks: 'section-howitworks', services: 'section-services', whyStarlinQ: 'section-why',
  bestProviders: 'section-bestproviders', testimonials: 'section-testimonials',
  becomeProvider: 'section-becomeprovider', eventsGallery: 'section-gallery',
  contact: 'section-contact', insights: 'section-insights',
  finalCta: 'section-finalcta', footer: 'section-footer', theme: null,
};

// ── Field primitives ─────────────────────────────────────────────────
const inputCls = 'w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-400 transition-colors';
const addBtnCls = 'mt-2 w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors';

function Field({ label, value, onChange, multiline = false, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${inputCls} resize-y`} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />}
    </div>
  );
}

function StringArrayField({ label, value, onChange, placeholder }: {
  label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
      <textarea rows={4} value={value.join('\n')} onChange={e => onChange(e.target.value.split('\n'))}
        placeholder={placeholder ?? 'Un élément par ligne...'} className={`${inputCls} resize-y`} />
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false, onDelete }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean; onDelete?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
      <div className={`flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors`}>
        <button type="button" onClick={() => setOpen(!open)} className="flex-1 flex items-center justify-between text-sm font-medium text-gray-700 text-left">
          <span className="truncate pr-2">{title}</span>
          {open ? <ChevronUp size={15} className="flex-shrink-0" /> : <ChevronDown size={15} className="flex-shrink-0" />}
        </button>
        {onDelete && (
          <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }}
            className="ml-2 w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0">
            <Trash2 size={13} />
          </button>
        )}
      </div>
      {open && <div className="px-4 py-4 bg-white">{children}</div>}
    </div>
  );
}

// ── Section editors ──────────────────────────────────────────────────

function HeaderEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const setNav = (i: number, key: string, val: string) => {
    const nav = deepClone(data.nav);
    nav[i][key] = val;
    setData({ ...data, nav });
  };
  const addLink = () => setData({ ...data, nav: [...(data.nav ?? []), { label: '', href: '' }] });
  const removeLink = (i: number) => setData({ ...data, nav: data.nav.filter((_: any, j: number) => j !== i) });
  return (
    <>
      <Field label="Nom du logo" value={data.logo} onChange={v => setData({ ...data, logo: v })} />
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Liens de navigation</p>
      {(data.nav ?? []).map((link: any, i: number) => (
        <Accordion key={i} title={link.label || `Lien ${i + 1}`} defaultOpen={i === 0} onDelete={() => removeLink(i)}>
          <Field label="Texte du lien" value={link.label} onChange={v => setNav(i, 'label', v)} />
          <Field label="URL ou ancre" value={link.href} onChange={v => setNav(i, 'href', v)} placeholder="/prestataires ou #section" />
        </Accordion>
      ))}
      <button type="button" onClick={addLink} className={addBtnCls}><Plus size={14} /> Ajouter un lien</button>
    </>
  );
}

function CarouselEditor({ data, setData }: { data: any[]; setData: (d: any[]) => void }) {
  const update = (i: number, key: string, val: string) => { const n = deepClone(data); n[i][key] = val; setData(n); };
  const remove = (i: number) => setData(data.filter((_, j) => j !== i));
  const add = () => setData([...data, { id: Date.now(), img: '', eventType: '', title: '', description: '', sponsored: true, ctaText: 'Voir le profil' }]);
  return (
    <>
      {data.map((slide: any, i: number) => (
        <Accordion key={i} title={`Slide ${i + 1} — ${slide.eventType}`} defaultOpen={i === 0} onDelete={() => remove(i)}>
          <Field label="Type d'événement" value={slide.eventType} onChange={v => update(i, 'eventType', v)} placeholder="ex: Mariage, DJ & Musique…" />
          <Field label="Titre" value={slide.title} onChange={v => update(i, 'title', v)} multiline />
          <Field label="Description" value={slide.description} onChange={v => update(i, 'description', v)} multiline />
          <Field label="Texte du bouton" value={slide.ctaText} onChange={v => update(i, 'ctaText', v)} />
          <ImageUploadField label="Image de fond" value={slide.img} onChange={v => update(i, 'img', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={add} className={addBtnCls}><Plus size={14} /> Ajouter un slide</button>
    </>
  );
}

function HeroEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setCta = (key: string, val: string) => setData({ ...data, cta: { ...(data.cta ?? {}), [key]: val } });
  const setImg = (i: number, key: string, val: string) => { const imgs = deepClone(data.images); imgs[i][key] = val; setData({ ...data, images: imgs }); };
  const removeImg = (i: number) => setData({ ...data, images: data.images.filter((_: any, j: number) => j !== i) });
  const addImg = () => setData({ ...data, images: [...(data.images ?? []), { src: '', alt: '' }] });
  return (
    <>
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} multiline />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      <Accordion title="Boutons CTA">
        <Field label="Bouton principal" value={data.cta?.primary ?? ''} onChange={v => setCta('primary', v)} />
        <Field label="Bouton secondaire" value={data.cta?.secondary ?? ''} onChange={v => setCta('secondary', v)} />
      </Accordion>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-2 mb-2">Images</p>
      {data.images?.map((img: any, i: number) => (
        <Accordion key={i} title={`Image ${i + 1}`} defaultOpen={i === 0} onDelete={() => removeImg(i)}>
          <ImageUploadField label="Image" value={img.src} onChange={v => setImg(i, 'src', v)} />
          <Field label="Texte alternatif" value={img.alt} onChange={v => setImg(i, 'alt', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={addImg} className={addBtnCls}><Plus size={14} /> Ajouter une image</button>
    </>
  );
}

function AboutEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setStat = (key: string, field: string, val: string) =>
    setData({ ...data, stats: { ...data.stats, [key]: { ...data.stats[key], [field]: val } } });
  const setPillar = (i: number, key: string, val: string) => {
    const p = deepClone(data.pillars); p[i][key] = val; setData({ ...data, pillars: p });
  };
  const removePillar = (i: number) => setData({ ...data, pillars: data.pillars.filter((_: any, j: number) => j !== i) });
  const addPillar = () => setData({ ...data, pillars: [...(data.pillars ?? []), { icon: '✨', title: '', description: '' }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Paragraphe 1" value={data.paragraph1} onChange={v => set('paragraph1', v)} multiline />
      <Field label="Paragraphe 2" value={data.paragraph2} onChange={v => set('paragraph2', v)} multiline />
      <Accordion title="Statistiques">
        {Object.entries(data.stats || {}).map(([key, stat]: [string, any]) => (
          <div key={key} className="mb-3">
            <p className="text-xs text-gray-400 mb-1 capitalize">{key}</p>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Valeur" value={stat.value} onChange={v => setStat(key, 'value', v)} />
              <Field label="Libellé" value={stat.label} onChange={v => setStat(key, 'label', v)} />
            </div>
          </div>
        ))}
      </Accordion>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-2 mb-2">Piliers</p>
      {data.pillars?.map((p: any, i: number) => (
        <Accordion key={i} title={`${p.icon} ${p.title}`} defaultOpen={i === 0} onDelete={() => removePillar(i)}>
          <EmojiIconPickerField label="Icône" value={p.icon} onChange={v => setPillar(i, 'icon', v)} />
          <Field label="Titre" value={p.title} onChange={v => setPillar(i, 'title', v)} />
          <Field label="Description" value={p.description} onChange={v => setPillar(i, 'description', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={addPillar} className={addBtnCls}><Plus size={14} /> Ajouter un pilier</button>
    </>
  );
}

function QuickSearchEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: any) => setData({ ...data, [key]: val });
  return (
    <>
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} multiline />
      <Field label="Placeholder de recherche" value={data.searchPlaceholder} onChange={v => set('searchPlaceholder', v)} />
      <Field label="Texte du bouton" value={data.searchButton} onChange={v => set('searchButton', v)} />
      <StringArrayField label="Filtres rapides (un par ligne)" value={data.quickFilters ?? []}
        onChange={v => set('quickFilters', v.filter(Boolean))} placeholder="Photographe&#10;DJ&#10;Traiteur..." />
    </>
  );
}

function StatisticsEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const setStat = (i: number, key: string, val: string) => { const s = deepClone(data.stats); s[i][key] = val; setData({ ...data, stats: s }); };
  const removeStat = (i: number) => setData({ ...data, stats: data.stats.filter((_: any, j: number) => j !== i) });
  const addStat = () => setData({ ...data, stats: [...(data.stats ?? []), { value: '', label: '' }] });
  return (
    <>
      {data.stats?.map((stat: any, i: number) => (
        <Accordion key={i} title={`Stat ${i + 1} — ${stat.value}`} defaultOpen={i === 0} onDelete={() => removeStat(i)}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Valeur" value={stat.value} onChange={v => setStat(i, 'value', v)} />
            <Field label="Libellé" value={stat.label} onChange={v => setStat(i, 'label', v)} />
          </div>
        </Accordion>
      ))}
      <button type="button" onClick={addStat} className={addBtnCls}><Plus size={14} /> Ajouter une statistique</button>
    </>
  );
}

function HowItWorksEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setVideo = (key: string, val: string) => setData({ ...data, video: { ...data.video, [key]: val } });
  const setStep = (i: number, key: string, val: string) => { const s = deepClone(data.steps); s[i][key] = val; setData({ ...data, steps: s }); };
  const removeStep = (i: number) => setData({ ...data, steps: data.steps.filter((_: any, j: number) => j !== i) });
  const addStep = () => {
    const nextId = (data.steps?.length ?? 0) + 1;
    setData({ ...data, steps: [...(data.steps ?? []), { id: nextId, title: '', description: '', image: '', imageAlt: '', icon: '', reverse: false }] });
  };
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      <Accordion title="Section vidéo">
        <Field label="Sous-titre" value={data.video?.subtitle} onChange={v => setVideo('subtitle', v)} />
        <Field label="Titre" value={data.video?.title} onChange={v => setVideo('title', v)} />
        <Field label="Description" value={data.video?.description} onChange={v => setVideo('description', v)} multiline />
        <Field label="Texte du bouton" value={data.video?.cta} onChange={v => setVideo('cta', v)} />
        <ImageUploadField label="Image de couverture" value={data.video?.image} onChange={v => setVideo('image', v)} />
      </Accordion>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-2 mb-2">Étapes</p>
      {data.steps?.map((step: any, i: number) => (
        <Accordion key={i} title={`Étape ${i + 1} — ${step.title}`} defaultOpen={i === 0} onDelete={() => removeStep(i)}>
          <Field label="Titre" value={step.title} onChange={v => setStep(i, 'title', v)} />
          <Field label="Description" value={step.description} onChange={v => setStep(i, 'description', v)} multiline />
          <EmojiIconPickerField label="Icône" value={step.icon ?? ''} onChange={v => setStep(i, 'icon', v)} />
          <Field label="Texte alt" value={step.imageAlt} onChange={v => setStep(i, 'imageAlt', v)} />
          <ImageUploadField label="Image" value={step.image} onChange={v => setStep(i, 'image', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={addStep} className={addBtnCls}><Plus size={14} /> Ajouter une étape</button>
    </>
  );
}

function ServicesEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setItem = (i: number, key: string, val: string) => { const it = deepClone(data.items); it[i][key] = val; setData({ ...data, items: it }); };
  const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_: any, j: number) => j !== i) });
  const addItem = () => setData({ ...data, items: [...(data.items ?? []), { title: '', description: '', tag: '', image: '' }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      {data.items?.map((item: any, i: number) => (
        <Accordion key={i} title={item.title || `Service ${i + 1}`} defaultOpen={i === 0} onDelete={() => removeItem(i)}>
          <Field label="Titre" value={item.title} onChange={v => setItem(i, 'title', v)} />
          <Field label="Description" value={item.description} onChange={v => setItem(i, 'description', v)} multiline />
          <Field label="Badge" value={item.tag} onChange={v => setItem(i, 'tag', v)} />
          <ImageUploadField label="Image" value={item.image} onChange={v => setItem(i, 'image', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={addItem} className={addBtnCls}><Plus size={14} /> Ajouter un service</button>
    </>
  );
}

function WhyStarlinQEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setAdv = (i: number, key: string, val: string) => { const a = deepClone(data.advantages); a[i][key] = val; setData({ ...data, advantages: a }); };
  const removeAdv = (i: number) => setData({ ...data, advantages: data.advantages.filter((_: any, j: number) => j !== i) });
  const addAdv = () => setData({ ...data, advantages: [...(data.advantages ?? []), { id: Date.now(), icon: '✨', title: '', description: '' }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      {data.advantages?.map((adv: any, i: number) => (
        <Accordion key={i} title={`${adv.icon} ${adv.title}`} defaultOpen={i === 0} onDelete={() => removeAdv(i)}>
          <EmojiIconPickerField label="Icône" value={adv.icon} onChange={v => setAdv(i, 'icon', v)} />
          <Field label="Titre" value={adv.title} onChange={v => setAdv(i, 'title', v)} />
          <Field label="Description" value={adv.description} onChange={v => setAdv(i, 'description', v)} multiline />
        </Accordion>
      ))}
      <button type="button" onClick={addAdv} className={addBtnCls}><Plus size={14} /> Ajouter un avantage</button>
    </>
  );
}

function BestProvidersEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setItem = (i: number, key: string, val: string) => { const it = deepClone(data.items); it[i][key] = val; setData({ ...data, items: it }); };
  const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_: any, j: number) => j !== i) });
  const addItem = () => setData({ ...data, items: [...(data.items ?? []), { id: Date.now(), name: '', location: '', specialty: '', avatar: '', eventImage: '', price: '', duration: '', rating: 5, reviewCount: 0 }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      {data.items?.map((item: any, i: number) => (
        <Accordion key={i} title={`${item.name || `Prestataire ${i + 1}`} — ${item.specialty}`} defaultOpen={i === 0} onDelete={() => removeItem(i)}>
          <Field label="Nom" value={item.name} onChange={v => setItem(i, 'name', v)} />
          <Field label="Ville" value={item.location} onChange={v => setItem(i, 'location', v)} />
          <Field label="Spécialité" value={item.specialty} onChange={v => setItem(i, 'specialty', v)} />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Prix" value={item.price} onChange={v => setItem(i, 'price', v)} />
            <Field label="Unité" value={item.duration} onChange={v => setItem(i, 'duration', v)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Note (ex: 4.9)" value={String(item.rating)} onChange={v => setItem(i, 'rating', v)} />
            <Field label="Nb avis" value={String(item.reviewCount)} onChange={v => setItem(i, 'reviewCount', v)} />
          </div>
          <ImageUploadField label="Avatar" value={item.avatar} onChange={v => setItem(i, 'avatar', v)} previewHeight="h-20" />
          <ImageUploadField label="Image événement" value={item.eventImage} onChange={v => setItem(i, 'eventImage', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={addItem} className={addBtnCls}><Plus size={14} /> Ajouter un prestataire</button>
    </>
  );
}

function TestimonialsEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setItem = (i: number, key: string, val: string) => { const it = deepClone(data.items); it[i][key] = val; setData({ ...data, items: it }); };
  const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_: any, j: number) => j !== i) });
  const addItem = () => setData({ ...data, items: [...(data.items ?? []), { name: '', role: '', content: '', rating: 5, image: '', event: '' }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      {data.items?.map((item: any, i: number) => (
        <Accordion key={i} title={item.name || `Témoignage ${i + 1}`} defaultOpen={i === 0} onDelete={() => removeItem(i)}>
          <Field label="Nom" value={item.name} onChange={v => setItem(i, 'name', v)} />
          <Field label="Rôle / occasion" value={item.role} onChange={v => setItem(i, 'role', v)} />
          <Field label="Événement" value={item.event} onChange={v => setItem(i, 'event', v)} />
          <Field label="Témoignage" value={item.content} onChange={v => setItem(i, 'content', v)} multiline />
          <Field label="Note (/5)" value={String(item.rating)} onChange={v => setItem(i, 'rating', v)} />
          <ImageUploadField label="Photo" value={item.image} onChange={v => setItem(i, 'image', v)} previewHeight="h-20" />
        </Accordion>
      ))}
      <button type="button" onClick={addItem} className={addBtnCls}><Plus size={14} /> Ajouter un témoignage</button>
    </>
  );
}

function BecomeProviderEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: any) => setData({ ...data, [key]: val });
  const setOffer = (key: string, val: any) => setData({ ...data, offer: { ...data.offer, [key]: val } });
  const setCta = (key: string, val: string) => setData({ ...data, cta: { ...data.cta, [key]: val } });
  const setImg = (key: string, val: string) => setData({ ...data, images: { ...data.images, [key]: val } });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      <Field label="Argumentaire" value={data.pitch} onChange={v => set('pitch', v)} multiline />
      <StringArrayField label="Avantages (un par ligne)" value={data.advantages ?? []} onChange={v => set('advantages', v.filter(Boolean))} />
      <Accordion title="Offre de lancement">
        <Field label="Badge" value={data.offer?.badge} onChange={v => setOffer('badge', v)} />
        <Field label="Titre" value={data.offer?.title} onChange={v => setOffer('title', v)} />
        <Field label="Code promo" value={data.offer?.code} onChange={v => setOffer('code', v)} />
        <StringArrayField label="Bénéfices (un par ligne)" value={data.offer?.benefits ?? []} onChange={v => setOffer('benefits', v.filter(Boolean))} />
      </Accordion>
      <Accordion title="Boutons CTA">
        <Field label="Bouton principal" value={data.cta?.primary} onChange={v => setCta('primary', v)} />
        <Field label="Bouton secondaire" value={data.cta?.secondary} onChange={v => setCta('secondary', v)} />
      </Accordion>
      <Accordion title="Images (5 photos de la section)" defaultOpen>
        <ImageUploadField label="Image principale gauche (haut)" value={data.images?.main1} onChange={v => setImg('main1', v)} />
        <ImageUploadField label="Image principale gauche (bas)" value={data.images?.main2} onChange={v => setImg('main2', v)} />
        <ImageUploadField label="Cercle flottant (haut droite)" value={data.images?.floating1} onChange={v => setImg('floating1', v)} previewHeight="h-20" />
        <ImageUploadField label="Carte flottante (bas)" value={data.images?.floating2} onChange={v => setImg('floating2', v)} previewHeight="h-20" />
        <ImageUploadField label="Fond de la carte offre" value={data.images?.offerBg} onChange={v => setImg('offerBg', v)} />
      </Accordion>
    </>
  );
}

function EventsGalleryEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setImg = (i: number, key: string, val: string) => { const imgs = deepClone(data.images); imgs[i][key] = val; setData({ ...data, images: imgs }); };
  const removeImg = (i: number) => setData({ ...data, images: data.images.filter((_: any, j: number) => j !== i) });
  const addImg = () => setData({ ...data, images: [...(data.images ?? []), { url: '', span: 'col-span-1 row-span-1', overlay: 'rgba(221, 214, 254, 0.45)', caption: '' }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      {data.images?.map((img: any, i: number) => (
        <Accordion key={i} title={`Image ${i + 1} — ${img.caption?.slice(0, 28) || 'sans légende'}`} defaultOpen={i === 0} onDelete={() => removeImg(i)}>
          <ImageUploadField label="Image" value={img.url} onChange={v => setImg(i, 'url', v)} />
          <Field label="Légende" value={img.caption} onChange={v => setImg(i, 'caption', v)} />
          <Field label="Overlay couleur (rgba)" value={img.overlay} onChange={v => setImg(i, 'overlay', v)} placeholder="rgba(221, 214, 254, 0.45)" />
        </Accordion>
      ))}
      <button type="button" onClick={addImg} className={addBtnCls}><Plus size={14} /> Ajouter une image</button>
    </>
  );
}

function ContactEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setImg = (key: string, val: string) => setData({ ...data, image: { ...data.image, [key]: val } });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="En-tête" value={data.heading} onChange={v => set('heading', v)} multiline />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      <ImageUploadField label="Image" value={data.image?.src} onChange={v => setImg('src', v)} />
      <Field label="Texte alt" value={data.image?.alt} onChange={v => setImg('alt', v)} />
    </>
  );
}

function InsightsEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setItem = (i: number, key: string, val: string) => { const it = deepClone(data.items); it[i][key] = val; setData({ ...data, items: it }); };
  const removeItem = (i: number) => setData({ ...data, items: data.items.filter((_: any, j: number) => j !== i) });
  const addItem = () => setData({ ...data, items: [...(data.items ?? []), { title: '', date: '', category: '', image: '' }] });
  return (
    <>
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} />
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      {data.items?.map((item: any, i: number) => (
        <Accordion key={i} title={`Article ${i + 1}`} defaultOpen={i === 0} onDelete={() => removeItem(i)}>
          <Field label="Titre" value={item.title} onChange={v => setItem(i, 'title', v)} multiline />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Date" value={item.date} onChange={v => setItem(i, 'date', v)} placeholder="15 mars 2026" />
            <Field label="Catégorie" value={item.category} onChange={v => setItem(i, 'category', v)} />
          </div>
          <ImageUploadField label="Image" value={item.image} onChange={v => setItem(i, 'image', v)} />
        </Accordion>
      ))}
      <button type="button" onClick={addItem} className={addBtnCls}><Plus size={14} /> Ajouter un article</button>
    </>
  );
}

function FinalCtaEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setBtn = (key: string, val: string) => setData({ ...data, buttons: { ...data.buttons, [key]: val } });
  return (
    <>
      <Field label="Titre" value={data.title} onChange={v => set('title', v)} multiline />
      <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} multiline />
      <Field label="Texte de réassurance" value={data.reassurance} onChange={v => set('reassurance', v)} />
      <Accordion title="Boutons" defaultOpen>
        <Field label="Bouton principal" value={data.buttons?.primary} onChange={v => setBtn('primary', v)} />
        <Field label="Bouton secondaire" value={data.buttons?.secondary} onChange={v => setBtn('secondary', v)} />
      </Accordion>
    </>
  );
}

function FooterEditor({ data, setData }: { data: any; setData: (d: any) => void }) {
  const set = (key: string, val: string) => setData({ ...data, [key]: val });
  const setContact = (key: string, val: string) => setData({ ...data, contact: { ...data.contact, [key]: val } });
  const setSectionTitle = (sk: string, val: string) =>
    setData({ ...data, sections: { ...data.sections, [sk]: { ...data.sections[sk], title: val } } });
  const setLink = (sk: string, i: number, key: string, val: string) => {
    const sections = deepClone(data.sections);
    sections[sk].links[i][key] = val;
    setData({ ...data, sections });
  };
  const removeLink = (sk: string, i: number) => {
    const sections = deepClone(data.sections);
    sections[sk].links = sections[sk].links.filter((_: any, j: number) => j !== i);
    setData({ ...data, sections });
  };
  const addLink = (sk: string) => {
    const sections = deepClone(data.sections);
    sections[sk].links = [...(sections[sk].links ?? []), { text: '', href: '#' }];
    setData({ ...data, sections });
  };
  return (
    <>
      <Field label="Nom du logo" value={data.logo} onChange={v => set('logo', v)} />
      <Field label="Description" value={data.description} onChange={v => set('description', v)} multiline />
      <Field label="Copyright" value={data.copyright} onChange={v => set('copyright', v)} />
      <Accordion title="Informations de contact" defaultOpen>
        <Field label="Titre" value={data.contact?.title} onChange={v => setContact('title', v)} />
        <Field label="Adresse" value={data.contact?.address} onChange={v => setContact('address', v)} />
        <Field label="Téléphone" value={data.contact?.phone} onChange={v => setContact('phone', v)} />
        <Field label="Email" value={data.contact?.email} onChange={v => setContact('email', v)} />
      </Accordion>
      {Object.entries(data.sections || {}).map(([sk, section]: [string, any]) => (
        <Accordion key={sk} title={`Colonne : ${section.title}`}>
          <Field label="Titre de la colonne" value={section.title} onChange={v => setSectionTitle(sk, v)} />
          <p className="text-xs text-gray-400 mb-2 mt-1">Liens</p>
          {(section.links ?? []).map((link: any, i: number) => (
            <div key={i} className="flex gap-2 items-start mb-2 pb-2 border-b border-gray-100 last:border-0">
              <div className="flex-1 space-y-1">
                <input type="text" value={link.text} onChange={e => setLink(sk, i, 'text', e.target.value)}
                  placeholder="Texte du lien" className={`${inputCls} text-xs py-1.5`} />
                <input type="text" value={link.href} onChange={e => setLink(sk, i, 'href', e.target.value)}
                  placeholder="/page ou #section" className={`${inputCls} text-xs py-1.5`} />
              </div>
              <button type="button" onClick={() => removeLink(sk, i)}
                className="mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addLink(sk)} className={addBtnCls}><Plus size={13} /> Ajouter un lien</button>
        </Accordion>
      ))}
    </>
  );
}

const THEME_PRESETS = ['#10B981','#7a74d9','#3b82f6','#f59e0b','#ef4444','#8b5cf6','#ec4899','#14b8a6'];
function ThemeEditor() {
  const [color, setColor] = useState('#10B981');
  useEffect(() => { try { const s = localStorage.getItem('primary-color'); if (s) { setColor(s); applyColor(s); } } catch {} }, []);
  const handleChange = (hex: string) => { setColor(hex); applyColor(hex); };
  return (
    <div>
      <p className="text-sm text-gray-600 mb-5">Choisissez la couleur principale du site. Le changement s&apos;applique immédiatement.</p>
      <AdvancedColorPicker color={color} onChange={handleChange} presets={THEME_PRESETS} />
      <div className="mt-5 p-4 rounded-xl border border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 mb-3">Aperçu rapide</p>
        <div className="flex gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-full text-white text-sm font-medium" style={{ background: color }}>Bouton principal</div>
          <div className="px-4 py-2 rounded-full text-sm font-medium border" style={{ color, borderColor: color }}>Bouton secondaire</div>
          <div className="text-sm font-semibold" style={{ color }}>Lien / accent</div>
        </div>
      </div>
    </div>
  );
}

// ── Main dashboard ───────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('header');
  const [activeLang, setActiveLang] = useState<Lang>('fr');
  const [formData, setFormData] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  const [mobileTab, setMobileTab] = useState<'fields' | 'preview'>('fields');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const anchorId = SECTION_ANCHORS[activeSection];
    if (!anchorId || !iframeRef.current) return;
    const tryScroll = () => {
      try { iframeRef.current?.contentWindow?.document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch {}
    };
    tryScroll(); const t = setTimeout(tryScroll, 600); return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  useEffect(() => {
    try { const auth = sessionStorage.getItem('admin_auth'); if (!auth || auth !== ALLOWED_EMAIL) router.replace('/admin'); }
    catch { router.replace('/admin'); }
  }, [router]);

  useEffect(() => {
    if (activeSection === 'theme') return;
    setFormData(getSectionData(activeSection, activeLang));
  }, [activeSection, activeLang]);

  const handleSave = useCallback(() => {
    if (!formData || activeSection === 'theme') return;
    saveOverride(activeLang, activeSection, formData);
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  }, [formData, activeSection, activeLang]);

  const handleLogout = () => { try { sessionStorage.removeItem('admin_auth'); } catch {} router.push('/admin'); };
  const sectionTitle = NAV.find(n => n.id === activeSection)?.label ?? '';

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-slate-800">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="text-lg font-bold tracking-tight">StarLinQ</div>
          <div className="text-xs text-slate-500 mt-0.5">Superadmin</div>
        </div>
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Globe size={12} /> Langue à modifier</p>
          <div className="flex rounded-lg overflow-hidden border border-slate-700">
            {(['fr', 'en'] as Lang[]).map(l => (
              <button key={l} onClick={() => { setFormData(null); setActiveLang(l); }}
                className={`flex-1 py-1.5 text-xs font-semibold transition-colors ${activeLang === l ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(item => (
            <button key={item.id} onClick={() => { setFormData(null); setActiveSection(item.id); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeSection === item.id ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}>
              {item.icon}{item.label}
            </button>
          ))}
        </nav>
        <div className="px-2 py-3 border-t border-slate-800 space-y-1">
          <a href="/" target="_blank" rel="noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ExternalLink size={15} /> Voir le site
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors">
            <LogOut size={15} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
          <div>
            <h1 className="text-base font-semibold text-gray-900">{sectionTitle}</h1>
            <p className="text-xs text-gray-500 mt-0.5">Contenu · {activeLang === 'fr' ? 'Français' : 'English'}</p>
          </div>
          {activeSection !== 'theme' && (
            <button onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 hover:bg-slate-700 text-white'}`}>
              {saved ? <CheckCircle size={15} /> : <Save size={15} />}
              {saved ? 'Sauvegardé !' : 'Sauvegarder'}
            </button>
          )}
        </header>

        <div className="lg:hidden flex border-b border-gray-200 bg-white flex-shrink-0">
          <button onClick={() => setMobileTab('fields')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors border-b-2 ${mobileTab === 'fields' ? 'border-slate-800 text-slate-900' : 'border-transparent text-gray-500'}`}>
            <SlidersHorizontal size={14} /> Champs
          </button>
          <button onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors border-b-2 ${mobileTab === 'preview' ? 'border-slate-800 text-slate-900' : 'border-transparent text-gray-500'}`}>
            <Eye size={14} /> Aperçu
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Fields panel */}
          <div className={`flex-shrink-0 overflow-y-auto bg-gray-50 ${mobileTab === 'fields' ? 'flex-1' : 'hidden'} lg:flex lg:flex-col lg:w-2/5 lg:border-r lg:border-gray-200`}>
            <div className="px-6 py-6">
              {activeSection === 'theme' && <ThemeEditor />}
              {activeSection !== 'theme' && !formData && (
                <div className="flex items-center justify-center h-48">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                </div>
              )}
              {activeSection === 'header'         && formData && <HeaderEditor         data={formData} setData={setFormData} />}
              {activeSection === 'carousel'        && formData && <CarouselEditor        data={formData} setData={setFormData} />}
              {activeSection === 'quickSearch'     && formData && <QuickSearchEditor     data={formData} setData={setFormData} />}
              {activeSection === 'hero'            && formData && <HeroEditor            data={formData} setData={setFormData} />}
              {activeSection === 'about'           && formData && <AboutEditor           data={formData} setData={setFormData} />}
              {activeSection === 'statistics'      && formData && <StatisticsEditor      data={formData} setData={setFormData} />}
              {activeSection === 'howItWorks'      && formData && <HowItWorksEditor      data={formData} setData={setFormData} />}
              {activeSection === 'services'        && formData && <ServicesEditor        data={formData} setData={setFormData} />}
              {activeSection === 'whyStarlinQ'     && formData && <WhyStarlinQEditor     data={formData} setData={setFormData} />}
              {activeSection === 'bestProviders'   && formData && <BestProvidersEditor   data={formData} setData={setFormData} />}
              {activeSection === 'testimonials'    && formData && <TestimonialsEditor    data={formData} setData={setFormData} />}
              {activeSection === 'becomeProvider'  && formData && <BecomeProviderEditor  data={formData} setData={setFormData} />}
              {activeSection === 'eventsGallery'   && formData && <EventsGalleryEditor   data={formData} setData={setFormData} />}
              {activeSection === 'contact'         && formData && <ContactEditor         data={formData} setData={setFormData} />}
              {activeSection === 'insights'        && formData && <InsightsEditor        data={formData} setData={setFormData} />}
              {activeSection === 'finalCta'        && formData && <FinalCtaEditor        data={formData} setData={setFormData} />}
              {activeSection === 'footer'          && formData && <FooterEditor          data={formData} setData={setFormData} />}
            </div>
          </div>

          {/* Preview panel */}
          <div className={`flex-grow flex flex-col overflow-hidden bg-gray-100 ${mobileTab === 'preview' ? 'flex' : 'hidden'} lg:flex`}>
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Aperçu du site</span>
              <button onClick={() => setIframeKey(k => k + 1)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors">
                <RefreshCw size={13} /> Rafraîchir
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe ref={iframeRef} key={iframeKey} src="/" className="w-full h-full border-0" title="Aperçu du site" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
