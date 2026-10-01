import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedBrandLogoProps {
  variant?: 'header' | 'footer';
  onClick?: () => void;
}

export const AnimatedBrandLogo: React.FC<AnimatedBrandLogoProps> = ({
  variant = 'header',
  onClick,
}) => {
  const logoWrapRef = useRef<HTMLAnchorElement>(null);
  const outerRingRef = useRef<SVGCircleElement>(null);
  const archPathRef = useRef<SVGPathElement>(null);
  const sunDotRef = useRef<SVGCircleElement>(null);
  const innerLineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // İlk girişte mimari kemerin çizilmesi
      if (archPathRef.current) {
        gsap.fromTo(
          archPathRef.current,
          { strokeDasharray: 120, strokeDashoffset: 120 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power3.out',
          }
        );
      }

      // Güneş küresinin hafif nefes alma (breathing) hareketi
      if (sunDotRef.current) {
        gsap.to(sunDotRef.current, {
          y: -1.8,
          scale: 1.12,
          transformOrigin: 'center center',
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Dış mimari pusula halkasının sürekli zarif dönüşü
      if (outerRingRef.current) {
        gsap.to(outerRingRef.current, {
          rotation: 360,
          transformOrigin: '20px 20px',
          duration: 28,
          repeat: -1,
          ease: 'none',
        });
      }
    }, logoWrapRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (archPathRef.current && sunDotRef.current && innerLineRef.current) {
      gsap.to(archPathRef.current, {
        scale: 1.08,
        transformOrigin: '20px 20px',
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(sunDotRef.current, {
        attr: { cy: 13 },
        fill: '#bda177',
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(innerLineRef.current, {
        scaleY: 1.25,
        transformOrigin: '20px 28px',
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (archPathRef.current && sunDotRef.current && innerLineRef.current) {
      gsap.to(archPathRef.current, {
        scale: 1,
        transformOrigin: '20px 20px',
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.to(sunDotRef.current, {
        attr: { cy: 15.5 },
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.to(innerLineRef.current, {
        scaleY: 1,
        transformOrigin: '20px 28px',
        duration: 0.45,
        ease: 'power3.out',
      });
    }
  };

  const isDark = variant === 'footer';

  return (
    <a
      ref={logoWrapRef}
      href="#top"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="ANA SAYFA"
      className={`group inline-flex items-center gap-3 no-underline select-none whitespace-nowrap shrink-0 ${
        isDark ? 'text-[#f7f6f2]' : 'text-[#111111]'
      }`}
    >
      {/* Özel Tasarım Mimari Monogram SVG Logo */}
      <span
        className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
          isDark
            ? 'bg-white/6 border border-white/15 group-hover:border-[#bda177]'
            : 'bg-[#111111] text-[#f7f6f2] border border-black/10 group-hover:bg-[#1a1c20]'
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Dış Kesikli Güneş Yörüngesi Halkası */}
          <circle
            ref={outerRingRef}
            cx="20"
            cy="20"
            r="16.5"
            stroke="#bda177"
            strokeWidth="1"
            strokeDasharray="3 3.5"
            strokeOpacity="0.65"
          />

          {/* İç Sabit Çerçeve */}
          <circle
            cx="20"
            cy="20"
            r="13.5"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.22"
          />

          {/* Monolitik Mimari Kemer (Portal Arch) */}
          <path
            ref={archPathRef}
            d="M12.5 29V18.5C12.5 14.3579 15.8579 11 20 11C24.1421 11 27.5 14.3579 27.5 18.5V29"
            stroke="#f7f6f2"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* İç Perspektif Kemer Katmanı */}
          <path
            d="M15.5 29V19C15.5 16.5147 17.5147 14.5 20 14.5C22.4853 14.5 24.5 16.5147 24.5 19V29"
            stroke="#bda177"
            strokeWidth="1.1"
            strokeOpacity="0.85"
          />

          {/* Güneş Zenit Küresi */}
          <circle
            ref={sunDotRef}
            cx="20"
            cy="15.5"
            r="2.1"
            fill="#bda177"
          />

          {/* Merkez Işık Koridoru Aksı */}
          <line
            ref={innerLineRef}
            x1="20"
            y1="19.5"
            x2="20"
            y2="29"
            stroke="#bda177"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Ufuk Çizgisi Tabanı */}
          <line
            x1="9.5"
            y1="29"
            x2="30.5"
            y2="29"
            stroke="#f7f6f2"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Marka İsmi */}
      <span className="font-syne font-extrabold text-lg tracking-tight transition-transform duration-300 group-hover:translate-x-0.5">
        Seçkin Sığınaklar
      </span>
    </a>
  );
};
