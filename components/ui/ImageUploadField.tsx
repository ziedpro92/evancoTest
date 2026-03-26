'use client';

import { useRef, useState } from 'react';
import { Upload, Link, X } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  previewHeight?: string;
}

/**
 * Reusable image field: URL input or file upload (auto-compressed to JPEG ≤1200px via canvas).
 */
export default function ImageUploadField({
  label, value, onChange, previewHeight = 'h-28',
}: ImageUploadFieldProps) {
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const [loading, setLoading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show blob URL immediately for instant feedback
    const blobUrl = URL.createObjectURL(file);
    setLocalPreview(blobUrl);
    setLoading(true);

    // Compress via canvas, then call onChange with base64 data URI
    const img = new window.Image();
    img.onload = () => {
      const MAX_W = 1200, MAX_H = 900;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX_W) { h = Math.round(h * MAX_W / w); w = MAX_W; }
      if (h > MAX_H) { w = Math.round(w * MAX_H / h); h = MAX_H; }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      URL.revokeObjectURL(blobUrl);
      setLocalPreview(null);
      setLoading(false);
      onChange(dataUrl);
      if (fileRef.current) fileRef.current.value = '';
    };
    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      setLocalPreview(null);
      setLoading(false);
    };
    img.src = blobUrl;
  };

  const displaySrc = localPreview || value;
  const inputCls = 'w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-400 transition-colors';

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">{label}</label>

      <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-2">
        <button type="button" onClick={() => setMode('url')}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium transition-colors ${mode === 'url' ? 'bg-slate-800 text-white' : 'text-gray-500 hover:text-gray-700 bg-white'}`}>
          <Link size={11} /> URL
        </button>
        <button type="button" onClick={() => setMode('file')}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium transition-colors ${mode === 'file' ? 'bg-slate-800 text-white' : 'text-gray-500 hover:text-gray-700 bg-white'}`}>
          <Upload size={11} /> Fichier
        </button>
      </div>

      {mode === 'url' ? (
        <input type="url" value={value} onChange={e => onChange(e.target.value)} placeholder="https://..." className={inputCls} />
      ) : (
        <>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()}
            className={`w-full px-3 py-2.5 bg-white border border-dashed rounded-lg text-sm transition-colors text-center ${
              loading ? 'border-blue-300 text-blue-500' : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {loading ? 'Compression en cours...' : 'Cliquer pour choisir un fichier image'}
          </button>
        </>
      )}

      {displaySrc && (
        <div className="relative mt-2">
          <img
            src={displaySrc}
            alt=""
            className={`w-full ${previewHeight} object-cover rounded-lg border border-gray-200`}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {!localPreview && value && (
            <button type="button" onClick={() => onChange('')}
              className="absolute top-1 right-1 w-5 h-5 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
              <X size={10} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
