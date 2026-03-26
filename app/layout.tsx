import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

// Pre-load Cormorant Garamond so the loader can use it without a runtime @import
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'StarlinQ — La plateforme événementielle du Québec',
  description: 'StarlinQ connecte les organisateurs d\'événements avec les meilleurs prestataires du Québec.',
  openGraph: {
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Restore saved theme color before first paint — prevents flash of default color */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{
            var c=localStorage.getItem('primary-color');
            if(!c)return;
            var r=/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(c);
            if(!r)return;
            var rgb=parseInt(r[1],16)+', '+parseInt(r[2],16)+', '+parseInt(r[3],16);
            var d=function(x){return Math.max(0,Math.min(255,parseInt(x,16)-20)).toString(16).padStart(2,'0');};
            var dark='#'+d(r[1])+d(r[2])+d(r[3]);
            var s=document.documentElement.style;
            s.setProperty('--primary-color',c);
            s.setProperty('--primary-color-dark',dark);
            s.setProperty('--primary-color-rgb',rgb);
          }catch(e){}})();
        `}} />
      </head>
      <body className={`${inter.className} ${cormorant.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}