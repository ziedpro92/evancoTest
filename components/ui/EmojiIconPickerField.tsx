'use client';

/**
 * EmojiIconPickerField — reusable admin field for emoji or FA6 icon.
 *
 * Value formats:
 *   Emoji  → the character itself  e.g. "💍"
 *   FA icon → "fa:<IconKey>"       e.g. "fa:FaHeart"
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { EmojiClickData } from 'emoji-picker-react';
import DynamicIcon from '@/components/ui/DynamicIcon';
import { ICON_LIST, isFaIcon, getFaKey } from '@/lib/icon-map';
import { Smile, Grid3X3, ChevronDown } from 'lucide-react';

// Lazy-load the heavy EmojiPicker only when the popover is opened
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[400px] text-sm text-gray-400">
      Chargement des emojis…
    </div>
  ),
});

type Tab = 'emoji' | 'icon';

interface EmojiIconPickerFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function EmojiIconPickerField({
  label, value, onChange,
}: EmojiIconPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('emoji');
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isIcon = isFaIcon(value);
  const iconKey = isIcon ? getFaKey(value) : null;

  // Recalculate position on open / scroll / resize
  const updateRect = useCallback(() => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
  }, []);

  const handleToggle = () => {
    updateRect();
    setOpen(v => !v);
  };

  useEffect(() => {
    if (!open) return;
    // Close on outside click
    const onMouseDown = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) setOpen(false);
    };
    // Reposition on scroll / resize
    const onScrollResize = () => updateRect();
    document.addEventListener('mousedown', onMouseDown);
    window.addEventListener('scroll', onScrollResize, true);
    window.addEventListener('resize', onScrollResize);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('scroll', onScrollResize, true);
      window.removeEventListener('resize', onScrollResize);
    };
  }, [open, updateRect]);

  // Compute popover position (fixed, so relative to viewport)
  const popoverStyle = (() => {
    if (!rect) return { display: 'none' };
    const POPOVER_H = 440;
    const POPOVER_W = Math.max(rect.width, 340);
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const top = spaceBelow >= POPOVER_H
      ? rect.bottom + 4
      : rect.top - POPOVER_H - 4;
    // Keep within viewport horizontally
    const left = Math.min(rect.left, window.innerWidth - POPOVER_W - 8);
    return { top, left, width: POPOVER_W };
  })();

  const handleEmoji = (data: EmojiClickData) => {
    onChange(data.emoji);
    setOpen(false);
  };

  const handleIcon = (key: string) => {
    onChange(`fa:${key}`);
    setOpen(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
        {label}
      </label>

      {/* Trigger row */}
      <div ref={triggerRef} className="flex gap-2 items-center">
        {/* Current value preview */}
        <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg flex-shrink-0"
          style={{ color: 'var(--primary-color)' }}>
          {value
            ? <DynamicIcon value={value} size={22} />
            : <span className="text-gray-300 text-xl">?</span>}
        </div>

        {/* Manual text input */}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="emoji ou fa:FaHeart"
          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-400 transition-colors"
        />

        {/* Toggle button */}
        <button
          type="button"
          onClick={handleToggle}
          className={`h-10 px-3 flex items-center gap-1 border rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
            open
              ? 'bg-slate-800 border-slate-800 text-white'
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          Choisir <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Popover — rendered via fixed positioning to escape overflow:hidden ancestors */}
      {open && rect && (
        <div
          ref={popoverRef}
          style={{ position: 'fixed', zIndex: 9999, ...popoverStyle }}
          className="bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex border-b border-gray-100 bg-white">
            <button type="button" onClick={() => setTab('emoji')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
                tab === 'emoji' ? 'text-slate-800 border-b-2 border-slate-800' : 'text-gray-400 hover:text-gray-600'
              }`}>
              <Smile size={14} /> Emoji
            </button>
            <button type="button" onClick={() => setTab('icon')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors ${
                tab === 'icon' ? 'text-slate-800 border-b-2 border-slate-800' : 'text-gray-400 hover:text-gray-600'
              }`}>
              <Grid3X3 size={14} /> Icônes FA6
            </button>
          </div>

          {/* Emoji tab */}
          {tab === 'emoji' && (
            <EmojiPicker
              onEmojiClick={handleEmoji}
              width="100%"
              height={390}
              searchPlaceholder="Rechercher un emoji…"
              previewConfig={{ showPreview: false }}
            />
          )}

          {/* Icons tab */}
          {tab === 'icon' && (
            <div className="p-3 overflow-y-auto" style={{ maxHeight: 390 }}>
              <div className="grid grid-cols-6 gap-1">
                {ICON_LIST.map(({ key, Component, label: iconLabel }) => {
                  const active = isIcon && iconKey === key;
                  return (
                    <button key={key} type="button" title={iconLabel} onClick={() => handleIcon(key)}
                      className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-xl text-xs transition-colors ${
                        active ? 'bg-slate-800 text-white' : 'hover:bg-gray-100'
                      }`}
                      style={active ? {} : { color: 'var(--primary-color)' }}
                    >
                      <Component size={20} />
                      <span className={`text-[9px] leading-none truncate w-full text-center ${active ? 'text-white' : 'text-gray-500'}`}>
                        {iconLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
