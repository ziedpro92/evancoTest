'use client';

import { useEffect, useRef, useState } from 'react';
import { Palette } from 'lucide-react';
import { uiContent } from '@/data/dataUi';

const DEFAULT_PRIMARY = '#10B981';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function darkenHex(hex: string, amount = 0.08): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const d = Math.round(255 * amount);
  const r = clamp(rgb.r - d).toString(16).padStart(2, '0');
  const g = clamp(rgb.g - d).toString(16).padStart(2, '0');
  const b = clamp(rgb.b - d).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function applyColor(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  const root = document.documentElement;
  root.style.setProperty('--primary-color', hex);
  root.style.setProperty('--primary-color-dark', darkenHex(hex));
  root.style.setProperty('--primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  try {
    localStorage.setItem('primary-color', hex);
  } catch {
    // ignore storage errors
  }
}

export default function ColorPicker() {
  const [color, setColor] = useState(DEFAULT_PRIMARY);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore persisted color on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('primary-color');
      if (saved) {
        setColor(saved);
        applyColor(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const hex = e.target.value;
    setColor(hex);
    applyColor(hex);
  }

  return (
    <div className="relative flex items-center" title={uiContent.colorPicker.title}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white hover:scale-110 transition-transform shadow-sm"
        style={{ borderColor: color }}
        aria-label={uiContent.colorPicker.title}
      >
        <Palette className="h-4 w-4" style={{ color }} />
      </button>
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={handleChange}
        className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
