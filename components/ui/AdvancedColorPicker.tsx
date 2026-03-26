'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── Color math ──────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] | null {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] : null;
}
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
}
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const v = max;
  const s = max === 0 ? 0 : (max - min) / max;
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === r)      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else                h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s, v];
}
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h = h / 360;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const cases: [number, number, number][] = [
    [v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q],
  ];
  const [r, g, b] = cases[i % 6];
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hexToHsv(hex: string): [number, number, number] {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsv(...rgb) : [0, 1, 1];
}
function hsvToHex(h: number, s: number, v: number): string {
  return rgbToHex(...hsvToRgb(h, s, v));
}

// ── Component ────────────────────────────────────────────────────────────
interface Props {
  color: string;
  onChange: (hex: string) => void;
  presets?: string[];
}

export default function AdvancedColorPicker({ color, onChange, presets = [] }: Props) {
  const hsvRef = useRef<[number, number, number]>(hexToHsv(color));
  const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(color));
  const [hexInput, setHexInput] = useState(color);
  const svRef  = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<'sv' | 'hue' | null>(null);

  // Sync from outside
  useEffect(() => {
    const next = hexToHsv(color);
    hsvRef.current = next;
    setHsv([...next]);
    setHexInput(color);
  }, [color]);

  // ── SV picker helpers ────────────────────────────────────────────────
  const applySV = useCallback((clientX: number, clientY: number) => {
    if (!svRef.current) return;
    const rect = svRef.current.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
    const [h] = hsvRef.current;
    const next: [number, number, number] = [h, s, v];
    hsvRef.current = next;
    setHsv([...next]);
    const hex = hsvToHex(h, s, v);
    setHexInput(hex);
    onChange(hex);
  }, [onChange]);

  // ── Hue helpers ──────────────────────────────────────────────────────
  const applyHue = useCallback((clientX: number) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const h = Math.max(0, Math.min(360, ((clientX - rect.left) / rect.width) * 360));
    const [, s, v] = hsvRef.current;
    const next: [number, number, number] = [h, s, v];
    hsvRef.current = next;
    setHsv([...next]);
    const hex = hsvToHex(h, s, v);
    setHexInput(hex);
    onChange(hex);
  }, [onChange]);

  // ── Global pointer tracking ───────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      if (dragging.current === 'sv') applySV(clientX, clientY);
      else applyHue(clientX);
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove',  onMove, { passive: false });
    window.addEventListener('mouseup',   onUp);
    window.addEventListener('touchend',  onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove',  onMove);
      window.removeEventListener('mouseup',   onUp);
      window.removeEventListener('touchend',  onUp);
    };
  }, [applySV, applyHue]);

  const handleHexInput = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-f]{6}$/i.test(val)) {
      const next = hexToHsv(val);
      hsvRef.current = next;
      setHsv([...next]);
      onChange(val);
    }
  };

  const selectPreset = (p: string) => {
    const next = hexToHsv(p);
    hsvRef.current = next;
    setHsv([...next]);
    setHexInput(p);
    onChange(p);
  };

  // Pure hue color (full S+V) for gradient backgrounds
  const hueHex = hsvToHex(hsv[0], 1, 1);
  const cursorLeft = `${hsv[1] * 100}%`;
  const cursorTop  = `${(1 - hsv[2]) * 100}%`;
  const hueLeft    = `${(hsv[0] / 360) * 100}%`;

  return (
    <div className="select-none">
      {/* ── SV picker canvas ────────────────────────────────────────── */}
      <div
        ref={svRef}
        className="relative w-full rounded-xl mb-3 cursor-crosshair overflow-hidden"
        style={{
          height: '180px',
          background: `linear-gradient(to top, #000 0%, transparent 100%),
                       linear-gradient(to right, #fff 0%, ${hueHex} 100%)`,
        }}
        onMouseDown={e => { e.preventDefault(); dragging.current = 'sv'; applySV(e.clientX, e.clientY); }}
        onTouchStart={e => { dragging.current = 'sv'; applySV(e.touches[0].clientX, e.touches[0].clientY); }}
      >
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ left: cursorLeft, top: cursorTop, background: color }}
        />
      </div>

      {/* ── Hue slider ──────────────────────────────────────────────── */}
      <div
        ref={hueRef}
        className="relative w-full h-4 rounded-full mb-4 cursor-pointer"
        style={{
          background: 'linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)',
        }}
        onMouseDown={e => { e.preventDefault(); dragging.current = 'hue'; applyHue(e.clientX); }}
        onTouchStart={e => { dragging.current = 'hue'; applyHue(e.touches[0].clientX); }}
      >
        <div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg pointer-events-none -translate-x-1/2 -translate-y-0.5"
          style={{ left: hueLeft, background: hueHex }}
        />
      </div>

      {/* ── Hex input ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-9 h-9 rounded-lg border border-gray-200 shadow-sm flex-shrink-0"
          style={{ background: color }}
        />
        <input
          type="text"
          value={hexInput}
          onChange={e => handleHexInput(e.target.value)}
          placeholder="#000000"
          spellCheck={false}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono text-gray-700 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* ── Presets ─────────────────────────────────────────────────── */}
      {presets.length > 0 && (
        <>
          <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
            Couleurs prédéfinies
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => selectPreset(p)}
                title={p}
                className="w-8 h-8 rounded-full transition-transform hover:scale-110 shadow-sm"
                style={{
                  background: p,
                  outline: color.toLowerCase() === p.toLowerCase() ? '3px solid #1e293b' : '2px solid transparent',
                  outlineOffset: '2px',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
