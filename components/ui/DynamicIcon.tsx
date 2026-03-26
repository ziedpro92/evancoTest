/**
 * DynamicIcon
 * Renders either:
 *   - A plain emoji / text  (e.g.  "💍",  "✓")
 *   - A FA6 icon identified by the prefix "fa:" (e.g. "fa:FaHeart")
 *
 * Usage:
 *   <DynamicIcon value={pillar.icon} size={32} className="text-PRIMARY" />
 */

import { ICON_MAP, isFaIcon, getFaKey } from '@/lib/icon-map';

interface DynamicIconProps {
  value: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({ value, size = 24, className }: DynamicIconProps) {
  if (!value) return null;

  if (isFaIcon(value)) {
    const Icon = ICON_MAP[getFaKey(value)];
    if (Icon) return <Icon size={size} className={className} />;
    // Fallback: show raw string if key not found
    return <span className={className} style={{ fontSize: size }}>{value}</span>;
  }

  // Plain emoji or text
  return (
    <span className={className} style={{ fontSize: size, lineHeight: 1 }}>
      {value}
    </span>
  );
}
