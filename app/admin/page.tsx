'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const ALLOWED_EMAIL = 'ziedmu1992@gmail.com';
const ADMIN_PASSWORD = 'Admin@starlinq2024';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('admin_auth')) router.replace('/admin/dashboard');
    } catch {}
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (email.toLowerCase() === ALLOWED_EMAIL && password === ADMIN_PASSWORD) {
        try { sessionStorage.setItem('admin_auth', email); } catch {}
        router.push('/admin/dashboard');
      } else {
        setError('Email ou mot de passe incorrect.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-white tracking-tight mb-1">StarLinQ</div>
          <div className="text-slate-500 text-sm">Panneau d&apos;administration</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-800"
        >
          <h1 className="text-xl font-semibold text-white mb-6">Connexion</h1>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@starlinq.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
