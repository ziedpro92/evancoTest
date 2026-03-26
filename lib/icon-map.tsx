/**
 * lib/icon-map.tsx
 * Curated list of FA6 icons used in the emoji/icon picker.
 * Named imports ensure proper tree-shaking when used in site components.
 */

import {
  FaHeart, FaStar, FaTrophy, FaCrown, FaGem, FaAward, FaRing, FaCakeCandles,
  FaBolt, FaWandMagicSparkles, FaMusic, FaMicrophone, FaFilm, FaPalette,
  FaHatWizard, FaMartiniGlass, FaUtensils, FaWineGlass, FaCameraRetro,
  FaFeather, FaUsers, FaUserGroup, FaPeopleGroup, FaHandshake, FaThumbsUp,
  FaDove, FaShield, FaLock, FaCircleCheck, FaCertificate, FaStarOfLife,
  FaRocket, FaLightbulb, FaBullhorn, FaMoneyBillWave, FaBriefcase,
  FaLocationDot, FaMapPin, FaCalendarDays, FaClock, FaGlobe, FaCity,
  FaPhone, FaEnvelope, FaComments, FaGraduationCap, FaFire, FaTag,
  FaPercent, FaTicket, FaDiamond, FaLeaf, FaSun, FaSnowflake, FaCamera,
  FaMagnifyingGlass, FaChartBar,
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export interface IconEntry {
  key: string;
  Component: IconType;
  label: string;
}

/** Ordered list of all icons available in the picker */
export const ICON_LIST: IconEntry[] = [
  // ── Célébration ──────────────────
  { key: 'FaHeart',            Component: FaHeart,            label: 'Cœur' },
  { key: 'FaStar',             Component: FaStar,             label: 'Étoile' },
  { key: 'FaTrophy',           Component: FaTrophy,           label: 'Trophée' },
  { key: 'FaCrown',            Component: FaCrown,            label: 'Couronne' },
  { key: 'FaGem',              Component: FaGem,              label: 'Gemme' },
  { key: 'FaAward',            Component: FaAward,            label: 'Récompense' },
  { key: 'FaRing',             Component: FaRing,             label: 'Bague' },
  { key: 'FaCakeCandles',      Component: FaCakeCandles,      label: 'Gâteau' },
  { key: 'FaBolt',             Component: FaBolt,             label: 'Éclair' },
  { key: 'FaWandMagicSparkles',Component: FaWandMagicSparkles,label: 'Magie' },
  { key: 'FaDiamond',          Component: FaDiamond,          label: 'Diamant' },
  { key: 'FaTicket',           Component: FaTicket,           label: 'Ticket' },
  // ── Musique & Divertissement ─────
  { key: 'FaMusic',            Component: FaMusic,            label: 'Musique' },
  { key: 'FaMicrophone',       Component: FaMicrophone,       label: 'Micro' },
  { key: 'FaFilm',             Component: FaFilm,             label: 'Film' },
  { key: 'FaPalette',          Component: FaPalette,          label: 'Art' },
  { key: 'FaHatWizard',        Component: FaHatWizard,        label: 'Magie' },
  { key: 'FaMartiniGlass',     Component: FaMartiniGlass,     label: 'Cocktail' },
  // ── Nourriture & Service ─────────
  { key: 'FaUtensils',         Component: FaUtensils,         label: 'Repas' },
  { key: 'FaWineGlass',        Component: FaWineGlass,        label: 'Vin' },
  { key: 'FaCameraRetro',      Component: FaCameraRetro,      label: 'Photo' },
  { key: 'FaCamera',           Component: FaCamera,           label: 'Appareil' },
  { key: 'FaFeather',          Component: FaFeather,          label: 'Plume' },
  // ── Personnes & Communauté ───────
  { key: 'FaUsers',            Component: FaUsers,            label: 'Équipe' },
  { key: 'FaUserGroup',        Component: FaUserGroup,        label: 'Groupe' },
  { key: 'FaPeopleGroup',      Component: FaPeopleGroup,      label: 'Foule' },
  { key: 'FaHandshake',        Component: FaHandshake,        label: 'Partenariat' },
  { key: 'FaThumbsUp',         Component: FaThumbsUp,         label: 'Approuvé' },
  { key: 'FaDove',             Component: FaDove,             label: 'Paix' },
  // ── Sécurité & Qualité ───────────
  { key: 'FaShield',           Component: FaShield,           label: 'Protection' },
  { key: 'FaLock',             Component: FaLock,             label: 'Sécurité' },
  { key: 'FaCircleCheck',      Component: FaCircleCheck,      label: 'Validé' },
  { key: 'FaCertificate',      Component: FaCertificate,      label: 'Certifié' },
  { key: 'FaStarOfLife',       Component: FaStarOfLife,       label: 'Excellence' },
  // ── Business & Croissance ────────
  { key: 'FaRocket',           Component: FaRocket,           label: 'Lancement' },
  { key: 'FaLightbulb',        Component: FaLightbulb,        label: 'Idée' },
  { key: 'FaBullhorn',         Component: FaBullhorn,         label: 'Annonce' },
  { key: 'FaMoneyBillWave',    Component: FaMoneyBillWave,    label: 'Économies' },
  { key: 'FaBriefcase',        Component: FaBriefcase,        label: 'Professionnel' },
  // ── Localisation & Temps ─────────
  { key: 'FaLocationDot',      Component: FaLocationDot,      label: 'Lieu' },
  { key: 'FaMapPin',           Component: FaMapPin,           label: 'Épingle' },
  { key: 'FaCalendarDays',     Component: FaCalendarDays,     label: 'Calendrier' },
  { key: 'FaClock',            Component: FaClock,            label: 'Horaires' },
  { key: 'FaGlobe',            Component: FaGlobe,            label: 'Mondial' },
  { key: 'FaCity',             Component: FaCity,             label: 'Ville' },
  // ── Communication ────────────────
  { key: 'FaPhone',            Component: FaPhone,            label: 'Téléphone' },
  { key: 'FaEnvelope',         Component: FaEnvelope,         label: 'Email' },
  { key: 'FaComments',         Component: FaComments,         label: 'Discussion' },
  // ── Autres ───────────────────────
  { key: 'FaGraduationCap',    Component: FaGraduationCap,    label: 'Formation' },
  { key: 'FaFire',             Component: FaFire,             label: 'Tendance' },
  { key: 'FaTag',              Component: FaTag,              label: 'Étiquette' },
  { key: 'FaPercent',          Component: FaPercent,          label: 'Promotion' },
  { key: 'FaLeaf',             Component: FaLeaf,             label: 'Nature' },
  { key: 'FaSun',              Component: FaSun,              label: 'Soleil' },
  { key: 'FaSnowflake',        Component: FaSnowflake,        label: 'Hiver' },
  { key: 'FaMagnifyingGlass',  Component: FaMagnifyingGlass,  label: 'Recherche' },
  { key: 'FaChartBar',         Component: FaChartBar,         label: 'Comparaison' },
];

/** Map from icon key → component for fast lookup in DynamicIcon */
export const ICON_MAP: Record<string, IconType> = Object.fromEntries(
  ICON_LIST.map(e => [e.key, e.Component])
);

/** Returns true when a value represents an FA6 icon reference */
export function isFaIcon(value: string): boolean {
  return typeof value === 'string' && value.startsWith('fa:');
}

/** Extract the icon key from a stored value like "fa:FaHeart" */
export function getFaKey(value: string): string {
  return value.slice(3);
}
