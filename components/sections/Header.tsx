'use client';

import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import StarlinqLogoSVG from '@/components/StarlinqLogoSVG';
import ColorPicker from '@/components/ui/ColorPicker';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  logoVisible: boolean;
}

export default function Header({ logoVisible }: HeaderProps) {
  const { content, ui } = useLanguage();

  const navLinks = (content.header.nav as { label: string; href: string }[]).map(n => ({
    name: n.label,
    href: n.href,
  }));

  return (
    <motion.header
      className="fixed w-full top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
      style={{ zIndex: 100 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">

          {/* Logo */}
          <motion.a
            href="/"
            layoutId="brand-logo"
            className="flex items-center flex-shrink-0 h-[67px] md:h-[72px] w-[200px] md:w-[240px]"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <StarlinqLogoSVG animated={false} style={{ height: '100%', width: '100%' }} />
          </motion.a>

          {/* Mobile Search Bar */}
          <motion.div
            className="flex md:hidden flex-1 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: logoVisible ? 1 : 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none z-10" /> */}
            {/* <input
              type="text"
              placeholder={ui.header.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary-color-rgb),0.2)] focus:border-PRIMARY transition-all text-sm bg-white/80"
            /> */}
          </motion.div>

          {/* Desktop Nav */}
          <motion.nav
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: logoVisible ? 1 : 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-700 hover:text-PRIMARY transition-colors"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: logoVisible ? 1 : 0, y: logoVisible ? 0 : -8 }}
                transition={{ duration: 0.3, delay: 0.45 + index * 0.07 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* Desktop Search + Language + Color + CTA */}
          <motion.div
            className="hidden md:flex items-center space-x-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: logoVisible ? 1 : 0, x: logoVisible ? 0 : 16 }}
            transition={{ duration: 0.45, delay: 0.5 }}
          >
            <div className="relative">
              {/* <input
                type="text"
                placeholder={ui.header.searchPlaceholder}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgba(var(--primary-color-rgb),0.2)] focus:border-PRIMARY transition-all w-48"
              /> */}
              {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
            </div>
            <LanguageSelector />
            {/* <ColorPicker /> */}
            <Button variant="default" className="bg-PRIMARY hover:bg-PRIMARY-dark text-white rounded-full px-6">
              {ui.header.ctaButton}
            </Button>
          </motion.div>

          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden flex-shrink-0 z-[110]">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-PRIMARY" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-xl z-[105] pt-20">
              <nav className="flex flex-col space-y-6 pb-8 px-4">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-xl font-medium text-gray-800 hover:text-PRIMARY transition-colors">
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-sm text-gray-500">Langue / Language</span>
                  <LanguageSelector />
                </div>
                {/* <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{ui.colorPicker.mobileLabel}</span>
                  <ColorPicker />
                </div> */}
                <Button className="bg-PRIMARY hover:bg-PRIMARY-dark text-white rounded-full py-6 text-lg">
                  {ui.header.ctaButton}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </motion.header>
  );
}
