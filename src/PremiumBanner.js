import React, { useEffect, useRef } from 'react';
import './PremiumBanner.css';
import { initElusiveElement } from './chaos';

function PremiumBanner() {
  const closeRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const closeBtn = closeRef.current;
    const banner = bannerRef.current;
    if (!closeBtn || !banner) return undefined;

    const resetBanner = () => {
      banner.classList.remove(
        'premiumBanner--shrunk',
        'premiumBanner--camouflage',
        'premiumBanner--dodged'
      );
      banner.style.transform = '';
      banner.style.opacity = '';
      banner.style.filter = '';
    };

    const onCloseEscape = (mode) => {
      if (mode === 'shrink') {
        banner.classList.add('premiumBanner--shrunk');
        banner.style.transform = 'scale(0.55) translateY(-30px)';
        banner.style.opacity = '0.85';
      } else if (mode === 'camouflage') {
        banner.classList.add('premiumBanner--camouflage');
        banner.style.opacity = '0.15';
        banner.style.filter = 'blur(1px)';
      } else {
        banner.classList.add('premiumBanner--dodged');
        banner.style.transform = `translateX(${(Math.random() > 0.5 ? 1 : -1) * (80 + Math.random() * 120)}px)`;
      }

      setTimeout(resetBanner, 2000);
    };

    const cleanupClose = initElusiveElement(closeBtn, {
      approachRadius: 90,
      onEscape: onCloseEscape,
    });

    return cleanupClose;
  }, []);

  return (
    <div ref={bannerRef} className="premiumBanner">
      <div className="premiumBanner__glow" />
      <div className="premiumBanner__content">
        <div className="premiumBanner__badge">GOLD</div>
        <div className="premiumBanner__text">
          <strong>Upgrade to Chaos Gold™</strong>
          <span>See who likes you & get unlimited likes</span>
        </div>
        <button type="button" className="premiumBanner__cta">Upgrade</button>
        <button
          ref={closeRef}
          type="button"
          className="premiumBanner__close elusive-close"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default PremiumBanner;
