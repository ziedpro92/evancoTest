'use client';
import "./bestPrestataires.css"
import { MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';


import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';



export default function BestPrestaires() {
  const { content, ui } = useLanguage();
  const prestaires = content.bestProviders.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    
    // Change index immediately for smooth transition
    setCurrentIndex((prev) => (prev + 1) % prestaires.length);
    
    // Clear direction and animation state after animation completes
    setTimeout(() => {
      setDirection('');
      setIsAnimating(false);
    }, 850); // Slightly longer than CSS transition
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    
    // Change index immediately for smooth transition
    setCurrentIndex((prev) => (prev - 1 + prestaires.length) % prestaires.length);
    
    // Clear direction and animation state after animation completes
    setTimeout(() => {
      setDirection('');
      setIsAnimating(false);
    }, 850); // Slightly longer than CSS transition
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 2; i++) {
      const index = (currentIndex + i + prestaires.length) % prestaires.length;
      cards.push({
        provider: prestaires[index],
        position: i,
        index: index
      });
    }
    return cards;
  };

  return (
    <section className="py-20 px-6 lg:px-8 relative provider-section">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {(content.bestProviders as any).subtitle}
          </h3>
          <h2 className="text-5xl lg:text-6xl font-serif mb-4 text-gray-900 section-title">
            {content.bestProviders.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {content.bestProviders.description}
          </p>
        </motion.div>

        <motion.div 
          className="provider-carousel-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`provider-cards-container ${direction}`}>
            {getVisibleCards().map(({ provider, position, index }) => (
              <div
                key={`${provider.id}-${index}`}
                className={`provider-card-item position-${position} ${position === 0 ? 'active' : ''}`}
                style={{
                  '--position': position
                } as any}
              >
                <div className="provider-card">
                  {/* Event Image at top */}
                  <div className="provider-event-image">
                    <img src={provider.eventImage} alt={provider.specialty} />
                    <div className="event-image-overlay"></div>
                  </div>

                  {/* Provider Avatar with Instagram-style ring */}
                  <div className="provider-avatar-wrap">
                    <div className="story-ring">
                      <div className="story-ring-inner">
                        <img src={provider.avatar} alt={provider.name} />
                      </div>
                    </div>
                  </div>

                  {/* Content below avatar */}
                  <div className="provider-content">
                    <h4 className="provider-name">{provider.name}</h4>
                    <h2 className="provider-price">
                      <sup>{ui.bestProviders.currencySymbol}</sup>{provider.price}
                      <sup>/{provider.duration}</sup>
                    </h2>
                    <p className="provider-specialty">{provider.specialty}</p>
                    {/* Stars + Location in same row */}
                    <div className="provider-meta-row">
                      {(provider as any).rating && (
                        <div className="provider-stars-group">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-3 h-3"
                              style={{
                                fill: star <= Math.round((provider as any).rating) ? 'var(--primary-color)' : 'transparent',
                                color: 'var(--primary-color)',
                              }}
                            />
                          ))}
                          <span className="provider-rating-text">{(provider as any).rating.toFixed(1)}</span>
                        </div>
                      )}
                      <div className="provider-location-group">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                    <a href="#0" className="provider-cta-button">
                      {ui.bestProviders.viewProfileButton}
                    </a>
                  </div>

                  {/* Decorative floating elements */}
                  <div className="floating-decoration deco-1"></div>
                  <div className="floating-decoration deco-2"></div>
                  <div className="floating-decoration deco-3"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            className="provider-nav-btn prev-btn" 
            onClick={handlePrev}
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="provider-nav-btn next-btn" 
            onClick={handleNext}
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="provider-indicators">
            {prestaires.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  if (!isAnimating && index !== currentIndex) {
                    const newDirection = index > currentIndex ? 'next' : 'prev';
                    setDirection(newDirection);
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => {
                      setDirection('');
                      setIsAnimating(false);
                    }, 850);
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}