import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Volume2,
  VolumeX,
  Play,
  ArrowUpRight,
  Compass,
  Check,
  X,
  SlidersHorizontal,
  MoveHorizontal,
  ArrowRight,
} from 'lucide-react';
import {
  HERO_SANCTUARIES,
  SIGNATURE_SUITES,
  ANATOMY_SPECS,
  CURATED_EXPERIENCES,
  MONOGRAPH_REVIEWS,
  IMAGES,
  Sanctuary,
  AnatomyTabKey,
  CuratedExperience,
  MonographReview,
  RegionKey,
} from './data/sanctuaries';
import { ResilientImage } from './components/ResilientImage';
import { SanctuaryDossierModal } from './components/SanctuaryDossierModal';
import { SanctuaryFilmModal } from './components/SanctuaryFilmModal';
import { ReservationDrawer } from './components/ReservationDrawer';
import { AnimatedBrandLogo } from './components/AnimatedBrandLogo';
import { SocialJournalSection } from './components/SocialJournalSection';
import { soundscape } from './utils/soundscape';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorCircleRef = useRef<HTMLDivElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const lastMouseXRef = useRef<number>(0);

  // İnteraktif Durumlar
  const [activeAnatomyTab, setActiveAnatomyTab] =
    useState<AnatomyTabKey>('Monolitik Yapı');
  const [selectedSanctuary, setSelectedSanctuary] = useState<Sanctuary | null>(
    null
  );
  const [bookingSanctuary, setBookingSanctuary] = useState<Sanctuary | null>(
    SIGNATURE_SUITES[0]
  );
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);
  const [activeExperienceModal, setActiveExperienceModal] =
    useState<CuratedExperience | null>(null);
  const [activeMonographModal, setActiveMonographModal] =
    useState<MonographReview | null>(null);
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>([
    'zen-tea-ritual',
  ]);
  const [hoveredExpImage, setHoveredExpImage] = useState<string>(IMAGES.kyoto);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Awwwards Gündüz/Gece Mimari Işık Perdesi Durumu (0 - 100)
  const [curtainPercent, setCurtainPercent] = useState<number>(52);

  // İnteraktif Atlas Filtre Durumu
  const [regionFilter, setRegionFilter] = useState<'Tümü' | RegionKey>('Tümü');
  const [sortBy, setSortBy] = useState<'rating' | 'acoustic' | 'elevation'>(
    'rating'
  );

  // Mimari Monografi Bülteni (Newsletter) Durumu
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle');

  const leftColCards = useMemo(
    () => HERO_SANCTUARIES.filter((s) => s.column === 'left'),
    []
  );
  const centerColCards = useMemo(
    () => HERO_SANCTUARIES.filter((s) => s.column === 'center'),
    []
  );
  const rightColCards = useMemo(
    () => HERO_SANCTUARIES.filter((s) => s.column === 'right'),
    []
  );

  const allSanctuaries = useMemo(
    () => [...SIGNATURE_SUITES, ...HERO_SANCTUARIES],
    []
  );

  const filteredAtlas = useMemo(() => {
    const base =
      regionFilter === 'Tümü'
        ? allSanctuaries
        : allSanctuaries.filter((s) => s.region === regionFilter);

    return [...base].sort((a, b) => {
      if (sortBy === 'acoustic') return a.acousticDb - b.acousticDb;
      if (sortBy === 'elevation') return b.elevationM - a.elevationM;
      return parseFloat(b.rating) - parseFloat(a.rating);
    });
  }, [allSanctuaries, regionFilter, sortBy]);

  const currentAnatomy = ANATOMY_SPECS[activeAnatomyTab];

  const handleToggleExperience = (id: string) => {
    setSelectedExperienceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenReserveFor = (sanctuary: Sanctuary) => {
    setSelectedSanctuary(null);
    setBookingSanctuary(sanctuary);
    setIsReservationOpen(true);
  };

  const handleToggleAudio = () => {
    const playing = soundscape.toggle();
    setIsAudioActive(playing);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  // GSAP ScrollTrigger & Awwwards Koreografisi
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 0. AWWWARDS ÜST KAYDIRMA İLERLEME ÇUBUĞU
      gsap.to('.top-scroll-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });

      // 1. HERO SABİTLENMİŞ ZAMAN ÇİZGİSİ
      const maskTarget = { percent: -25 };
      const heroTitleEl = document.querySelector(
        '.hero-title'
      ) as HTMLElement | null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-wrapper',
          start: 'top top',
          end: '+=280%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        maskTarget,
        {
          percent: 110,
          duration: 0.9,
          ease: 'none',
          onUpdate: () => {
            if (heroTitleEl) {
              heroTitleEl.style.setProperty(
                '--mask-percent',
                `${maskTarget.percent}%`
              );
            }
          },
        },
        0.2
      );

      tl.to(
        '.hero-container',
        {
          y: -80,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        },
        0.7
      );

      tl.fromTo(
        ['.card-col-left', '.card-col-right'],
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        1.25
      );

      tl.fromTo(
        '.card-col-center',
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' },
        1.35
      );

      tl.fromTo(
        '.card-col-left',
        { x: 0, y: '115vh', rotate: 0 },
        { x: -28, y: '-88vh', rotate: -1.5, ease: 'power1.out', duration: 1.8 },
        1.25
      );

      tl.fromTo(
        '.card-col-right',
        { x: 0, y: '115vh', rotate: 0 },
        { x: 28, y: '-88vh', rotate: 1.5, ease: 'power1.out', duration: 1.8 },
        1.25
      );

      tl.fromTo(
        '.card-col-center',
        { y: '130vh' },
        { y: '-78vh', ease: 'power1.out', duration: 1.8 },
        1.35
      );

      // 2. HIZA DUYARLI (VELOCITY-REACTIVE) KİNETİK MARQUEE SKEW
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skewAmount = gsap.utils.clamp(-10, 10, velocity / 300);
          gsap.to('.marquee-track', {
            skewX: skewAmount,
            duration: 0.35,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });

      // 3. AWWWARDS 3B BAŞLIK & BÖLÜM GİRİŞ ANİMASYONLARI
      gsap.utils.toArray<HTMLElement>('.gsap-reveal-block').forEach((block) => {
        gsap.fromTo(
          block,
          {
            y: 48,
            opacity: 0,
            rotateX: 8,
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 4. ARKA PLAN AMBİYANS & PARALLAX VIGNETTE GÖRSELLERİ
      gsap.to('.blob-1', {
        x: '12vw',
        y: '14vh',
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.blob-2', {
        x: '-14vw',
        y: '-12vh',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      document.querySelectorAll('.bg-vignette').forEach((vignette) => {
        const speed = parseFloat(vignette.getAttribute('data-speed') || '1');
        gsap.to(vignette, {
          y: -140 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: vignette,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Uydu Dairelerin (Satellites) Bağımsız Parallax ve Dönüş Hareketi
      document.querySelectorAll('.satellite-ball').forEach((ball, idx) => {
        const speed = parseFloat(
          ball.getAttribute('data-parallax-speed') || '0.5'
        );
        gsap.to(ball, {
          y: -115 * speed,
          rotate: idx % 2 === 0 ? 8 : -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cluster-stage',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // 5. SİNEMATİK PORTAL ANİMASYONU
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.portal-wrapper',
            start: 'top top',
            end: '+=160%',
            scrub: 1,
            pin: true,
          },
        })
        .to('.portal-frame', {
          clipPath: 'inset(0% 0% round 0px)',
          ease: 'power2.inOut',
        })
        .to(
          '.portal-bg-img',
          {
            scale: 1,
            ease: 'power2.inOut',
          },
          0
        )
        .from(
          '.portal-content',
          {
            y: 60,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.4
        );

      // 6. YATAY GALERİ KAYDIRMA + PENCERE İÇİ PARALLAX (AWWWARDS WINDOW EFFECT)
      const track = document.querySelector(
        '.horizontal-track'
      ) as HTMLElement | null;
      const reelProgress = document.querySelector(
        '#reelProgress'
      ) as HTMLElement | null;
      const reelCounter = document.querySelector(
        '#reelCounter'
      ) as HTMLElement | null;

      if (track) {
        const horizontalTween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 120),
          ease: 'none',
          scrollTrigger: {
            trigger: '.horizontal-pin-section',
            start: 'top top',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (reelProgress) {
                reelProgress.style.width = `${Math.max(
                  15,
                  self.progress * 100
                )}%`;
              }
              if (reelCounter) {
                const currentSlide = Math.min(
                  4,
                  Math.floor(self.progress * 4) + 1
                );
                reelCounter.textContent = `0${currentSlide} / 04`;
              }
            },
          },
        });

        // Kartların içindeki görsellerin yatay harekete ters yönde kayması
        gsap.utils
          .toArray<HTMLElement>('.reel-parallax-img')
          .forEach((imgEl) => {
            gsap.fromTo(
              imgEl,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.horizontal-pin-section',
                  start: 'top top',
                  end: () => `+=${track.scrollWidth}`,
                  scrub: 1,
                  containerAnimation: horizontalTween,
                },
              }
            );
          });
      }

      // 7. DENEYİM LİSTESİ KADEMELİ GİRİŞ ANİMASYONU
      gsap.fromTo(
        '.exp-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-list',
            start: 'top 82%',
          },
        }
      );

      // 8. BENTO MONOGRAFİ KARTLARI KADEMELİ 3B GİRİŞ
      gsap.fromTo(
        '.bento-card',
        { y: 45, opacity: 0, rotateY: 6 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bento-grid',
            start: 'top 82%',
          },
        }
      );
    }, mainRef);

    // 9. ÖZEL İMLEÇ & MANYETİK BUTON ETKİLEŞİMİ
    const cursorDot = cursorDotRef.current;
    const cursorCircle = cursorCircleRef.current;
    const magneticBtn = magneticBtnRef.current;

    let cleanupCursor: (() => void) | undefined;

    if (
      cursorDot &&
      cursorCircle &&
      window.matchMedia('(hover: hover)').matches
    ) {
      const setDotX = gsap.quickTo(cursorDot, 'x', {
        duration: 0.1,
        ease: 'power3',
      });
      const setDotY = gsap.quickTo(cursorDot, 'y', {
        duration: 0.1,
        ease: 'power3',
      });
      const setCircleX = gsap.quickTo(cursorCircle, 'x', {
        duration: 0.32,
        ease: 'power3',
      });
      const setCircleY = gsap.quickTo(cursorCircle, 'y', {
        duration: 0.32,
        ease: 'power3',
      });

      const onMouseMove = (e: MouseEvent) => {
        setDotX(e.clientX);
        setDotY(e.clientY);
        setCircleX(e.clientX);
        setCircleY(e.clientY);

        gsap.to('.blob-3', {
          x: (e.clientX - window.innerWidth / 2) * 0.08,
          y: (e.clientY - window.innerHeight / 2) * 0.08,
          duration: 1.8,
          ease: 'power2.out',
        });

        const target = e.target as HTMLElement | null;
        const cursorTarget = target?.closest('[data-cursor]');
        if (cursorTarget) {
          cursorCircle.classList.add('active-hover');
          cursorCircle.textContent =
            cursorTarget.getAttribute('data-cursor') || '';
        } else {
          cursorCircle.classList.remove('active-hover');
          cursorCircle.textContent = '';
        }
      };

      window.addEventListener('mousemove', onMouseMove);

      const onMagneticMove = (e: MouseEvent) => {
        if (!magneticBtn) return;
        const rect = magneticBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.38;
        const deltaY = (e.clientY - centerY) * 0.38;

        gsap.to(magneticBtn, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMagneticLeave = () => {
        if (!magneticBtn) return;
        gsap.to(magneticBtn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      magneticBtn?.addEventListener('mousemove', onMagneticMove);
      magneticBtn?.addEventListener('mouseleave', onMagneticLeave);

      cleanupCursor = () => {
        window.removeEventListener('mousemove', onMouseMove);
        magneticBtn?.removeEventListener('mousemove', onMagneticMove);
        magneticBtn?.removeEventListener('mouseleave', onMagneticLeave);
      };
    }

    return () => {
      ctx.revert();
      cleanupCursor?.();
    };
  }, []);

  // Awwwards 3B Kart Eğim (Tilt) Etkileşimi
  const handleCard3DTilt = (e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: relX * 7,
      rotateX: -relY * 7,
      y: -5,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleCard3DReset = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  // Yüzen Deneyim Önizleme (Hıza Duyarlı Eğim ile)
  const handleExpMouseEnter = (img: string) => {
    setHoveredExpImage(img);
    if (
      floatingPreviewRef.current &&
      window.matchMedia('(hover: hover)').matches
    ) {
      gsap.to(floatingPreviewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleExpMouseMove = (e: React.MouseEvent) => {
    if (
      floatingPreviewRef.current &&
      window.matchMedia('(hover: hover)').matches
    ) {
      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;
      const tiltAngle = gsap.utils.clamp(-8, 8, deltaX * 0.35);

      gsap.to(floatingPreviewRef.current, {
        x: e.clientX + 28,
        y: e.clientY - 120,
        rotation: tiltAngle,
        duration: 0.22,
        ease: 'power2.out',
      });
    }
  };

  const handleExpMouseLeave = () => {
    if (floatingPreviewRef.current) {
      gsap.to(floatingPreviewRef.current, {
        opacity: 0,
        scale: 0.85,
        rotation: 0,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    }
  };

  // Awwwards Gündüz/Gece Perde Kaydırıcı Hareketi
  const handleCurtainMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const pct = Math.max(4, Math.min(96, (xPos / rect.width) * 100));
    setCurtainPercent(pct);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={mainRef} className="relative min-h-screen">
      {/* Awwwards Üst Kaydırma İlerleme Çubuğu */}
      <div className="top-scroll-progress">
        <div className="top-scroll-progress-bar" />
      </div>

      {/* Arka Plan Katmanları */}
      <div className="bg-noise" />

      <div className="bg-grid-lines">
        <div className="bg-grid-line" />
        <div className="bg-grid-line" />
        <div className="bg-grid-line" />
        <div className="bg-grid-line" />
        <div className="bg-grid-line" />
      </div>

      <div className="ambient-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Özel İmleç & Yüzen Deneyim Önizlemesi */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorCircleRef} id="cursorCircle" className="cursor-circle" />

      <div
        ref={floatingPreviewRef}
        id="floatingPreview"
        className="floating-preview"
      >
        <ResilientImage
          src={hoveredExpImage}
          alt="Deneyim Önizlemesi"
          className="w-full h-full object-cover"
        />
      </div>

      {/* =========================================================
           ÜST GEZİNME ÇUBUĞU (3 BÖLGE: Animasyonlu Logo | 5 Bağlantı | 2 Eylem)
      ========================================================== */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-3.5 flex items-center justify-between bg-[#f7f6f2]/85 backdrop-blur-md border-b border-black/6">
        {/* Bölge 1: Animasyonlu Mimari Monogram Logo + Marka İsmi */}
        <AnimatedBrandLogo
          variant="header"
          onClick={() => scrollToSection('top')}
        />

        {/* Bölge 2: 5 Temiz Metin Gezinme Bağlantısı */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#55534e]">
          <button
            type="button"
            onClick={() => scrollToSection('anatomy')}
            className="hover:text-[#111111] transition-colors cursor-pointer whitespace-nowrap"
          >
            Anatomi
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pavilions')}
            className="hover:text-[#111111] transition-colors cursor-pointer whitespace-nowrap"
          >
            Pavyonlar
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('experiences')}
            className="hover:text-[#111111] transition-colors cursor-pointer whitespace-nowrap"
          >
            Deneyimler
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('atlas')}
            className="hover:text-[#111111] transition-colors cursor-pointer whitespace-nowrap"
          >
            Mimari Atlas
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('social-journal')}
            className="hover:text-[#111111] transition-colors cursor-pointer whitespace-nowrap"
          >
            Sosyal Günlük
          </button>
        </nav>

        {/* Bölge 3: Birincil Eylemler (Akustik Mod + Rezervasyon) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label="Sığınak Akustik Frekansını Aç veya Kapat"
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
              isAudioActive
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white/80 text-[#4a4845] border-black/10 hover:border-black/30'
            }`}
          >
            {isAudioActive ? (
              <Volume2 className="w-3.5 h-3.5 text-[#bda177]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {isAudioActive ? '174Hz Tınısı Açık' : 'Akustik Mod'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsReservationOpen(true)}
            className="px-4 py-2 rounded-full bg-[#111111] text-white font-syne text-xs font-bold hover:bg-[#bda177] transition-colors cursor-pointer whitespace-nowrap"
          >
            Sığınak Ayırt
          </button>
        </div>
      </header>

      {/* =========================================================
           HERO SABİTLENMİŞ ANİMASYON BÖLÜMÜ
      ========================================================== */}
      <section id="top" className="hero-wrapper">
        <div className="hero-section">
          <div className="hero-container">
            <span className="hero-subtitle-top">
              Mimari Sığınak Koleksiyonu · 24 Küresel Rezidans
            </span>
            <h1 className="hero-title">
              Zamansız bir yaşam için arındırılmış mekânlar.
            </h1>
            <p className="hero-desc">
              Keşif ve dinginliğin buluştuğu seçkin butik rotalar. Aşağı
              kaydırarak koleksiyonu görüntüleyin veya doğrudan mimari dosyaları
              inceleyin.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsReservationOpen(true)}
                data-cursor="AYIRT"
                className="px-6 py-3 rounded-full bg-[#111111] text-white font-syne text-xs font-bold hover:bg-[#bda177] transition-colors cursor-pointer whitespace-nowrap"
              >
                Özel Konaklama Planla
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('atlas')}
                className="px-5 py-3 rounded-full bg-white/80 border border-black/10 text-[#111111] text-xs font-semibold hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
              >
                16 Sığınağın Tümünü İncele
              </button>
            </div>
          </div>

          <div className="grid-viewport">
            <div className="grid-container">
              {/* Sol Sütun */}
              <div className="card-col card-col-left">
                {leftColCards.map((card) => (
                  <article
                    key={card.id}
                    className="card-item"
                    data-cursor="İNCELE"
                    onClick={() => setSelectedSanctuary(card)}
                  >
                    <div className="card-image-wrap">
                      <ResilientImage
                        src={card.image}
                        alt={card.title}
                        objectPosition={card.imagePosition}
                      />
                    </div>
                    <div className="card-info">
                      <div>
                        <h3 className="card-title">{card.title}</h3>
                        <span className="card-meta">
                          {card.location} · {card.acousticDb} dBA
                        </span>
                      </div>
                      <span className="card-rate">
                        ★ {card.rating} · €{card.nightlyRate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Orta Sütun */}
              <div className="card-col card-col-center">
                {centerColCards.map((card) => (
                  <article
                    key={card.id}
                    className="card-item"
                    data-cursor="İNCELE"
                    onClick={() => setSelectedSanctuary(card)}
                  >
                    <div className="card-image-wrap">
                      <ResilientImage
                        src={card.image}
                        alt={card.title}
                        objectPosition={card.imagePosition}
                      />
                    </div>
                    <div className="card-info">
                      <div>
                        <h3 className="card-title">{card.title}</h3>
                        <span className="card-meta">
                          {card.location} · {card.acousticDb} dBA
                        </span>
                      </div>
                      <span className="card-rate">
                        ★ {card.rating} · €{card.nightlyRate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Sağ Sütun */}
              <div className="card-col card-col-right">
                {rightColCards.map((card) => (
                  <article
                    key={card.id}
                    className="card-item"
                    data-cursor="İNCELE"
                    onClick={() => setSelectedSanctuary(card)}
                  >
                    <div className="card-image-wrap">
                      <ResilientImage
                        src={card.image}
                        alt={card.title}
                        objectPosition={card.imagePosition}
                      />
                    </div>
                    <div className="card-info">
                      <div>
                        <h3 className="card-title">{card.title}</h3>
                        <span className="card-meta">
                          {card.location} · {card.acousticDb} dBA
                        </span>
                      </div>
                      <span className="card-rate">
                        ★ {card.rating} · €{card.nightlyRate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
           KİNETİK TİPOGRAFİ MARQUEE (KAYDIRMA HIZINA DUYARLI)
      ========================================================== */}
      <section className="marquee-container" aria-label="Mimari Felsefe">
        <div className="marquee-track">
          <div className="marquee-item">
            Mimari Sessizlik <span className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Özel Tasarım Yaşam <span className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Seçkin Sığınaklar <span className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Zamansız Uyum <span className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Mimari Sessizlik <span className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Özel Tasarım Yaşam <span className="marquee-dot" />
          </div>
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 1: EDİTORYAL ZITLIK KARTLARI (KÜRATÖRYEL ANATOMİ)
      ========================================================== */}
      <section id="anatomy" className="split-feature-section">
        <div className="split-top-bar gsap-reveal-block">
          <div>
            <span className="hero-subtitle-top" style={{ marginBottom: '6px' }}>
              Mekânsal Temeller
            </span>
            <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight">
              Küratöryel Anatomi
            </h2>
          </div>

          {/* İnteraktif Sekmeli Filtre Kontrolü */}
          <div
            role="tablist"
            aria-label="Mimari Anatomi Boyutları"
            className="flex items-center gap-1.5 p-1.5 bg-white/90 rounded-xl border border-black/8 flex-wrap"
          >
            {(
              [
                'Monolitik Yapı',
                'Akustik Yalıtım',
                'Termal Taş',
                'Ham Meşe',
              ] as const
            ).map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                role="tab"
                aria-selected={activeAnatomyTab === tabKey}
                onClick={() => setActiveAnatomyTab(tabKey)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeAnatomyTab === tabKey
                    ? 'bg-[#111111] text-white'
                    : 'text-[#686662] hover:text-[#111111]'
                }`}
              >
                {tabKey}
              </button>
            ))}
          </div>
        </div>

        <div className="split-cards-grid gsap-reveal-block">
          {/* Kart 1 (Açık Tema - 3B Tilt Destekli) */}
          <article
            className="split-card split-card-light"
            data-cursor="KEŞFET"
            onMouseMove={handleCard3DTilt}
            onMouseLeave={handleCard3DReset}
            onClick={() => setSelectedSanctuary(HERO_SANCTUARIES[1])}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#686662] font-medium mb-4">
                <span>{currentAnatomy.lightCard.index}</span>
                <span className="font-mono-tabular text-[#111111] font-semibold">
                  {currentAnatomy.lightCard.metricValue}
                </span>
              </div>
              <h3 className="split-card-title">
                {currentAnatomy.lightCard.title}
              </h3>
              <p className="split-card-desc">
                {currentAnatomy.lightCard.description}
              </p>

              <ul className="mt-5 space-y-2 border-t border-black/8 pt-4">
                {currentAnatomy.lightCard.details.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-[#4a4845] flex items-start gap-2"
                  >
                    <span className="text-[#bda177] font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="split-card-media">
              <ResilientImage
                src={currentAnatomy.lightCard.image}
                alt={currentAnatomy.lightCard.title}
              />
            </div>
          </article>

          {/* Kart 2 (Koyu Tema - 3B Tilt Destekli) */}
          <article
            className="split-card split-card-dark"
            data-cursor="KEŞFET"
            onMouseMove={handleCard3DTilt}
            onMouseLeave={handleCard3DReset}
            onClick={() => setIsFilmModalOpen(true)}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#e5ded4]/80 font-medium mb-4">
                <span>{currentAnatomy.darkCard.index}</span>
                <span className="font-mono-tabular text-[#bda177] font-semibold">
                  {currentAnatomy.darkCard.metricValue}
                </span>
              </div>
              <h3 className="split-card-title">
                {currentAnatomy.darkCard.title}
              </h3>
              <p className="split-card-desc">
                {currentAnatomy.darkCard.description}
              </p>

              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {currentAnatomy.darkCard.details.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-white/75 flex items-start gap-2"
                  >
                    <span className="text-[#bda177] font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="split-card-media">
              <ResilientImage
                src={currentAnatomy.darkCard.image}
                alt={currentAnatomy.darkCard.title}
              />
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 2: METİN İÇİ FOTOĞRAF KAPSÜLLERİ
      ========================================================== */}
      <section className="inline-typography-section gsap-reveal-block">
        <h2 className="inline-title">
          Dinginlik
          <span
            className="inline-img-pill"
            data-cursor="GÖZ AT"
            onClick={() => setSelectedSanctuary(SIGNATURE_SUITES[0])}
            title="Komorebi Cam Pavyonu'nu İncele"
          >
            <ResilientImage src={IMAGES.kyoto} alt="Kyoto Onsen Sığınağı" />
          </span>
          ve zamansız form
          <br />
          <span
            className="inline-img-pill wide"
            data-cursor="GÖZ AT"
            onClick={() => setSelectedSanctuary(SIGNATURE_SUITES[1])}
            title="Vals Kuvarsit Dağ Evi'ni İncele"
          >
            <ResilientImage src={IMAGES.swiss} alt="Vals Alp Dağ Evi" />
          </span>
          bizim zanaatımızdır.
        </h2>
        <p className="inline-subtitle">
          Dünya çapında seçkin 24 sığınakta mimari sessizlik, 15 dBA akustik
          izolasyon ve dingin konaklama sanatı.
        </p>
      </section>

      {/* =========================================================
           BÖLÜM 3: MERKEZİ OVAL & YÜZEN UYDU GÖRSELLER
      ========================================================== */}
      <section id="sanctuary-glance" className="satellite-cluster-section">
        <div className="satellite-header gsap-reveal-block">
          <span className="hero-subtitle-top">
            Görsel Rezonans · İnteraktif Günlük Işık Simülasyonu
          </span>
          <h2 className="satellite-title">Sığınağımıza yakından bir bakış.</h2>
        </div>

        <div className="cluster-stage">
          {/* Merkez Oval Kart -> İnteraktif Işık ve Mekân Simülatörünü Açar */}
          <div
            className="center-oval-card"
            data-cursor="OYNAT"
            onClick={() => setIsFilmModalOpen(true)}
          >
            <ResilientImage
              src={IMAGES.swiss}
              alt="Ana Sığınak Işık İncelemesi Kapağı"
            />
            <div className="oval-play-badge">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>

          {/* Yüzen Uydu Daireler */}
          <div
            className="satellite-ball sat-1"
            data-parallax-speed="0.8"
            data-cursor="İNCELE"
            onClick={() => setSelectedSanctuary(SIGNATURE_SUITES[0])}
          >
            <ResilientImage src={IMAGES.kyoto} alt="Kyoto Detayı" />
          </div>

          <div
            className="satellite-ball sat-2"
            data-parallax-speed="-0.7"
            data-cursor="İNCELE"
            onClick={() => setSelectedSanctuary(HERO_SANCTUARIES[1])}
          >
            <ResilientImage src={IMAGES.travertine} alt="Traverten Detayı" />
          </div>

          <div
            className="satellite-ball sat-3"
            data-parallax-speed="0.9"
            data-cursor="İNCELE"
            onClick={() => setSelectedSanctuary(SIGNATURE_SUITES[2])}
          >
            <ResilientImage src={IMAGES.amalfi} alt="Amalfi Detayı" />
          </div>

          <div
            className="satellite-ball sat-4"
            data-parallax-speed="-0.6"
            data-cursor="İNCELE"
            onClick={() => setSelectedSanctuary(SIGNATURE_SUITES[3])}
          >
            <ResilientImage src={IMAGES.nordic} alt="Kuzey Fiyordu Detayı" />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#686662]">
          <button
            type="button"
            onClick={() => setIsFilmModalOpen(true)}
            className="inline-flex items-center gap-2 font-semibold text-[#111111] hover:text-[#bda177] transition-colors cursor-pointer"
          >
            <span>
              İnteraktif Güneş Işığı Simülatörünü Başlat (06:15 – 22:00)
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 4: SİNEMATİK PORTAL (CLIP-PATH GENİŞLEME)
      ========================================================== */}
      <section className="portal-wrapper">
        <div className="portal-frame">
          <ResilientImage
            src={IMAGES.travertine}
            alt="Mimari Başyapıt"
            className="portal-bg-img"
          />
          <div className="portal-overlay" />
          <div className="portal-content">
            <span className="portal-tag">Biçimin Felsefesi</span>
            <h2 className="portal-heading">
              Dinginliğin saf mimariyle buluştuğu yer.
            </h2>
            <p className="portal-text">
              Sadece konaklama değil; ışığın, gölgenin ve doğal materyallerin
              yarattığı dingin bir mekânsal deneyim.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 5: YATAY KAYDIRMA GALERİSİ (İMZA SÜİTLER)
      ========================================================== */}
      <section id="pavilions" className="horizontal-pin-section">
        <div className="horizontal-header">
          <div>
            <span className="hero-subtitle-top">Seçkin Pavyonlar</span>
            <h2 className="horizontal-title">İmza Süitler</h2>
          </div>
          <div className="horizontal-counter" id="reelCounter">
            01 / 04
          </div>
        </div>

        <div className="horizontal-track-wrap">
          <div className="horizontal-track">
            {SIGNATURE_SUITES.map((suite, index) => (
              <article
                key={suite.id}
                className="reel-card"
                data-cursor="DETAY"
                onClick={() => setSelectedSanctuary(suite)}
              >
                <div className="reel-image-box">
                  <ResilientImage
                    src={suite.image}
                    alt={suite.title}
                    className="reel-parallax-img"
                  />
                </div>
                <div className="reel-card-body">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#686662] mb-2">
                      <span>
                        0{index + 1}. {suite.subtitle} · {suite.location}
                      </span>
                      <span className="font-mono-tabular font-semibold text-[#111111]">
                        €{suite.nightlyRate}/gece
                      </span>
                    </div>
                    <h3 className="reel-card-title">{suite.title}</h3>
                    <p className="reel-card-desc">{suite.description}</p>
                  </div>

                  <div className="pt-3 border-t border-black/6 flex items-center justify-between text-xs text-[#4a4845]">
                    <span className="font-mono-tabular">
                      {suite.areaSqm} m² · {suite.acousticDb} dBA ·{' '}
                      {suite.elevationM}m
                    </span>
                    <span className="font-syne font-bold text-[#111111] inline-flex items-center gap-1">
                      Dosyayı İncele <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="reel-progress-bar">
          <div className="reel-progress-indicator" id="reelProgress" />
        </div>
      </section>

      {/* =========================================================
           AWWWARDS BÖLÜMÜ: GÜNDÜZ & GECE MİMARİ IŞIK PERDESİ
      ========================================================== */}
      <section className="curtain-compare-section gsap-reveal-block">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="hero-subtitle-top" style={{ marginBottom: '6px' }}>
              İnteraktif Işık Kırılması · Gündüz ve Gece Karşılaştırması
            </span>
            <h2 className="font-syne text-2xl md:text-4xl font-extrabold tracking-tight">
              Güneşin ve Gecenin Mimari Dönüşümü
            </h2>
          </div>
          <p className="text-xs text-[#686662] max-w-sm">
            İmlecinizi sahne üzerinde sağa ve sola gezdirerek 5600K öğle
            ışığındaki monolitik traverten ile 2200K gece termal atmosferi
            arasındaki geçişi deneyimleyin.
          </p>
        </div>

        <div
          className="curtain-stage"
          data-cursor="KAYDIR"
          onMouseMove={handleCurtainMove}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.max(
                4,
                Math.min(
                  96,
                  ((e.touches[0].clientX - rect.left) / rect.width) * 100
                )
              );
              setCurtainPercent(pct);
            }
          }}
        >
          {/* Alt Katman: Gece Modu (22:00 Termal Gece) */}
          <div className="absolute inset-0">
            <ResilientImage
              src={IMAGES.nordic}
              alt="Gece Atmosferi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35" />
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-right text-white">
              <span className="font-mono-tabular text-xs text-[#bda177] block mb-1">
                22:00 · 2200K TERMAL GECE &amp; AURORA
              </span>
              <h3 className="font-syne text-xl md:text-2xl font-bold">
                Lofoten Ayna Kabini — Gece Sirkadiyen Modu
              </h3>
            </div>
          </div>

          {/* Üst Katman: Gündüz Modu (12:30 Öğle Zeniti - Clip-Path ile Kesilen) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - curtainPercent}% 0 0)`,
            }}
          >
            <ResilientImage
              src={IMAGES.amalfi}
              alt="Gündüz Atmosferi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-left text-white">
              <span className="font-mono-tabular text-xs text-[#e5ded4] block mb-1">
                12:30 · 5600K DOĞAL GÜNEŞ ZENİTİ
              </span>
              <h3 className="font-syne text-xl md:text-2xl font-bold">
                Amalfi Deniz Pavyonu — Kireçtaşı Teras Işığı
              </h3>
            </div>
          </div>

          {/* Dikey Ayırıcı Çizgi ve Tutamaç */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/90 pointer-events-none z-10"
            style={{ left: `${curtainPercent}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#111111] flex items-center justify-center shadow-lg border border-black/10">
              <MoveHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 6: İNTERAKTİF DENEYİM LİSTESİ
      ========================================================== */}
      <section
        id="experiences"
        className="experience-section"
        onMouseLeave={handleExpMouseLeave}
      >
        <div className="bg-vignette vignette-1" data-speed="0.75">
          <ResilientImage
            src={IMAGES.travertine}
            alt="Spiral Mimari Form"
            className="vignette-img"
          />
          <div className="vignette-label">
            <span>ŞEKİL 01</span>
            <span>43.7° K</span>
          </div>
        </div>

        <div className="bg-vignette vignette-2" data-speed="1.2">
          <ResilientImage
            src={IMAGES.kyoto}
            alt="Traverten Detayı"
            className="vignette-img"
          />
          <div className="vignette-label">
            <span>TAŞ 02</span>
            <span>KYOTO</span>
          </div>
        </div>

        <div className="gsap-reveal-block">
          <span className="exp-sub">Eşsiz Anlar · Özel Ritüeller</span>
          <h2 className="exp-title">
            Özel olarak tasarlanan butik deneyimler.
          </h2>
        </div>

        <ul className="exp-list">
          {CURATED_EXPERIENCES.map((exp) => {
            const isAdded = selectedExperienceIds.includes(exp.id);
            return (
              <li
                key={exp.id}
                className="exp-item"
                data-cursor="DETAY"
                onMouseEnter={() => handleExpMouseEnter(exp.image)}
                onMouseMove={handleExpMouseMove}
                onMouseLeave={handleExpMouseLeave}
                onClick={() => setActiveExperienceModal(exp)}
              >
                <div>
                  <span className="exp-name block">{exp.name}</span>
                  <span className="text-xs text-[#686662] mt-1 block">
                    Küratör: {exp.curator}
                  </span>
                </div>
                <div className="exp-details">
                  <span className="font-mono-tabular">
                    {exp.location} · {exp.duration} · €{exp.pricePerGuest}
                  </span>
                  {isAdded && (
                    <span className="text-xs font-semibold text-[#8c7046] hidden sm:inline">
                      ✓ Programa Eklendi
                    </span>
                  )}
                  <span className="exp-arrow">→</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* =========================================================
           BÖLÜM 7: BENTO PERSPEKTİFLER / KÜRATÖR MONOGRAFİLERİ
      ========================================================== */}
      <section className="bento-reviews-section">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 gsap-reveal-block">
          <div>
            <span className="hero-subtitle-top">
              Perspektifler · Kanıtlanmış Konaklama Kayıtları
            </span>
            <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight">
              Küratör ve Konuk Monografileri
            </h2>
          </div>
          <p className="text-xs text-[#686662] max-w-sm">
            Her monografi, konuklarımızın ve mimari eleştirmenlerin
            sığınaklarımızda gerçekleştirdiği akustik ve mekânsal gözlemleri
            belgeler.
          </p>
        </div>

        <div className="bento-grid">
          {MONOGRAPH_REVIEWS.map((review) => (
            <article
              key={review.id}
              className={`bento-card ${review.themeClass}`}
              data-cursor="OKU"
              onMouseMove={handleCard3DTilt}
              onMouseLeave={handleCard3DReset}
              onClick={() => setActiveMonographModal(review)}
            >
              <div>
                <div className="text-xs font-mono-tabular opacity-75 mb-4 flex items-center justify-between">
                  <span>{review.tag}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <p className="bento-quote">{review.quote}</p>
                <div className="text-xs font-mono-tabular opacity-80 mb-6 pt-3 border-t border-current/10">
                  {review.metricHighlight}
                </div>
              </div>

              <div className="bento-author">
                <div
                  className="bento-avatar flex items-center justify-center text-white font-syne text-xs font-bold"
                  style={{ background: review.avatarGradient }}
                >
                  {review.initials}
                </div>
                <div>
                  <div className="bento-name">{review.author}</div>
                  <div className="bento-role">{review.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 8: İNTERAKTİF SIĞINAK ATLASI VE TEKNİK MATRİS
      ========================================================== */}
      <section
        id="atlas"
        className="max-w-[1200px] mx-auto px-6 pb-28 relative z-10 gsap-reveal-block"
      >
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-black/8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/8">
            <div>
              <span className="hero-subtitle-top" style={{ marginBottom: '6px' }}>
                Tam Mimari Dizin
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-extrabold">
                Sığınak Atlası ve Teknik Matris
              </h2>
            </div>

            {/* Bölge Filtresi ve Sıralama Kontrolleri */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-[#f3f1eb] rounded-xl flex-wrap">
                {(
                  [
                    'Tümü',
                    'Japonya ve Doğu Asya',
                    'Alp Avrupa',
                    'Akdeniz Havzası',
                    'Kuzey Avrupa',
                  ] as const
                ).map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => setRegionFilter(reg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      regionFilter === reg
                        ? 'bg-[#111111] text-white'
                        : 'text-[#686662] hover:text-[#111111]'
                    }`}
                  >
                    {reg === 'Tümü' ? 'Tüm Bölgeler (16)' : reg}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#686662] bg-[#f3f1eb] px-3 py-1.5 rounded-xl">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as 'rating' | 'acoustic' | 'elevation'
                    )
                  }
                  className="bg-transparent font-semibold text-[#111111] focus:outline-none cursor-pointer"
                >
                  <option value="rating">Sırala: Konuk Puanı</option>
                  <option value="acoustic">Sırala: En Sessiz (dBA)</option>
                  <option value="elevation">Sırala: Rakım (m)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Atlas Izgarası */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-8">
            {filteredAtlas.map((item) => (
              <div
                key={item.id}
                data-cursor="İNCELE"
                onClick={() => setSelectedSanctuary(item)}
                className="group rounded-2xl border border-black/8 overflow-hidden bg-[#faf9f6] hover:border-black/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-[#e5e0d5]">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      objectPosition={item.imagePosition}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-[11px] text-[#686662] mb-1">
                      <span>{item.location}</span>
                      <span className="font-mono-tabular font-semibold text-[#111111]">
                        ★ {item.rating}
                      </span>
                    </div>
                    <h3 className="font-syne text-base font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#686662] line-clamp-2">
                      {item.materiality}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-black/6 flex items-center justify-between text-xs font-mono-tabular bg-white">
                  <span className="text-[#686662]">
                    {item.acousticDb} dBA · {item.areaSqm}m²
                  </span>
                  <span className="font-semibold text-[#111111]">
                    €{item.nightlyRate}/gece
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
           BÖLÜM 9: SOSYAL MEDYA VE GÖRSEL GÜNLÜK BÖLÜMÜ
      ========================================================== */}
      <SocialJournalSection
        onSelectSanctuary={(s) => setSelectedSanctuary(s)}
        onCard3DTilt={handleCard3DTilt}
        onCard3DReset={handleCard3DReset}
      />

      {/* =========================================================
           GECE MODU & ZENGİNLEŞTİRİLMİŞ MİMARİ ALT BİLGİ (FOOTER)
      ========================================================== */}
      <footer className="dark-cta-section">
        <div className="dark-cta-glow" />

        <span
          className="hero-subtitle-top"
          style={{ color: 'var(--accent)' }}
        >
          Rezervasyon ve Özel Talepler
        </span>
        <h2 className="dark-cta-title">Sessiz yolculuğunuza başlayın.</h2>
        <p className="dark-cta-desc">
          Özgün mimarinin doğayla buluştuğu seçkin rotalarda yerinizi ayırtın.
        </p>

        <div className="magnetic-wrap">
          <button
            ref={magneticBtnRef}
            type="button"
            id="magneticBtn"
            data-cursor="AYIRT"
            onClick={() => setIsReservationOpen(true)}
            className="magnetic-btn"
          >
            Sığınağınızı Ayırtın
          </button>
        </div>

        {/* Profesyonel Kurumsal Alt Grid: Marka & Bülten & Küresel Ofisler */}
        <div className="max-w-[1200px] mx-auto text-left pt-12 pb-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sol: Animasyonlu Logo ve Mimari Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <AnimatedBrandLogo
              variant="footer"
              onClick={() => scrollToSection('top')}
            />
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Seçkin Sığınaklar; akustik izolasyon, ham doğal taş ve sirkadiyen
              ışık mimarisini bir araya getiren küresel bir rezidans ve
              kürasyon kolektifidir.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-tabular text-[#bda177]">
              <span>KYOTO</span>
              <span>·</span>
              <span>ZÜRİH</span>
              <span>·</span>
              <span>MİLANO</span>
              <span>·</span>
              <span>İSTANBUL</span>
            </div>
          </div>

          {/* Orta: Hızlı Erişim & Sosyal Medya Ağları */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-2.5">
              <div className="font-syne font-bold text-white mb-3">
                Koleksiyon
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('anatomy')}
                className="block text-white/65 hover:text-white transition-colors cursor-pointer"
              >
                Küratöryel Anatomi
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('pavilions')}
                className="block text-white/65 hover:text-white transition-colors cursor-pointer"
              >
                İmza Süitler
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('experiences')}
                className="block text-white/65 hover:text-white transition-colors cursor-pointer"
              >
                Özel Ritüeller
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('atlas')}
                className="block text-white/65 hover:text-white transition-colors cursor-pointer"
              >
                Teknik Matris
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="font-syne font-bold text-white mb-3">
                Sosyal Medya
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('social-journal')}
                className="block text-white/65 hover:text-[#bda177] transition-colors cursor-pointer"
              >
                Instagram
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('social-journal')}
                className="block text-white/65 hover:text-[#bda177] transition-colors cursor-pointer"
              >
                YouTube 4K
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('social-journal')}
                className="block text-white/65 hover:text-[#bda177] transition-colors cursor-pointer"
              >
                Pinterest Arşivi
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('social-journal')}
                className="block text-white/65 hover:text-[#bda177] transition-colors cursor-pointer"
              >
                Spotify 174Hz
              </button>
            </div>
          </div>

          {/* Sağ: Mimari Monografi Bülteni */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-syne font-bold text-sm text-white">
              Mimari Monografi Bülteni
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Yeni açılan sığınaklar, mevsimsel ışık incelemeleri ve özel
              rezidans davetleri için bültenimize kaydolun.
            </p>

            {newsletterStatus === 'success' ? (
              <div className="p-3.5 rounded-2xl bg-white/8 border border-[#bda177]/40 text-xs text-[#e5ded4] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#bda177] shrink-0" />
                <span>
                  Kaydınız alındı. İlk basılı ve dijital monografi sayımız
                  e-posta adresinize iletilecektir.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') {
                        setNewsletterStatus('idle');
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-full bg-white/8 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#bda177]"
                  />
                  <button
                    type="submit"
                    aria-label="Bültene Kaydol"
                    className="px-4 py-2.5 rounded-full bg-[#bda177] text-[#0e0f12] font-syne text-xs font-bold hover:bg-white transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1"
                  >
                    <span>Katıl</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {newsletterStatus === 'error' && (
                  <p className="text-[11px] text-red-400 pl-2">
                    Lütfen geçerli bir e-posta adresi girin.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="footer-bar">
          <div>
            © 2026 Seçkin Sığınaklar A.Ş. Zamansız Yaşam Kolektifi. Tüm hakları
            saklıdır.
          </div>
          <ul className="footer-nav">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('pavilions')}
              >
                Pavyonlar
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('social-journal')}
              >
                Sosyal Ağlar
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToSection('experiences')}
              >
                Deneyimler
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setIsReservationOpen(true)}
              >
                Özel Konsiyerj
              </button>
            </li>
          </ul>
        </div>
      </footer>

      {/* =========================================================
           MODALLAR VE ÇEKMECELER
      ========================================================== */}
      <SanctuaryDossierModal
        sanctuary={selectedSanctuary}
        onClose={() => setSelectedSanctuary(null)}
        onReserve={handleOpenReserveFor}
      />

      <SanctuaryFilmModal
        isOpen={isFilmModalOpen}
        onClose={() => setIsFilmModalOpen(false)}
        onOpenBooking={() => setIsReservationOpen(true)}
      />

      <ReservationDrawer
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        selectedSanctuary={bookingSanctuary}
        selectedExperienceIds={selectedExperienceIds}
        onToggleExperience={handleToggleExperience}
        onSelectSanctuary={(s) => setBookingSanctuary(s)}
      />

      {/* Deneyim Detay Modalı */}
      {activeExperienceModal && (
        <div
          className="fixed inset-0 z-[215] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={() => setActiveExperienceModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#f7f6f2] text-[#111111] rounded-3xl overflow-hidden border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-60 w-full">
              <ResilientImage
                src={activeExperienceModal.image}
                alt={activeExperienceModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono-tabular text-white/90 bg-black/40 px-3 py-1 rounded-md">
                    {activeExperienceModal.location} ·{' '}
                    {activeExperienceModal.duration}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveExperienceModal(null)}
                    aria-label="Kapat"
                    className="w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-white">
                  <h3 className="font-syne text-2xl font-extrabold">
                    {activeExperienceModal.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    Ev Sahibi Küratör: {activeExperienceModal.curator}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <p className="text-sm text-[#4a4845] leading-relaxed">
                {activeExperienceModal.summary}
              </p>

              <div>
                <h4 className="font-syne text-xs font-bold tracking-wider text-[#686662] mb-3">
                  Ritüel Akışı ve Programı
                </h4>
                <ul className="space-y-2.5">
                  {activeExperienceModal.itinerary.map((step, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#111111] bg-white p-3 rounded-xl border border-black/6 font-medium"
                    >
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#686662] block">
                    Özel Ritüel Bedeli
                  </span>
                  <span className="font-syne text-xl font-extrabold font-mono-tabular">
                    €{activeExperienceModal.pricePerGuest}
                  </span>
                  <span className="text-xs text-[#686662]">
                    {' '}
                    / kişi (Maks. {activeExperienceModal.maxGuests} Konuk)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleExperience(activeExperienceModal.id)
                    }
                    className={`px-4 py-3 rounded-full text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      selectedExperienceIds.includes(activeExperienceModal.id)
                        ? 'bg-[#e9ede6] text-[#1f2b20] border-[#1f2b20]/20'
                        : 'bg-white text-[#111111] border-black/15'
                    }`}
                  >
                    {selectedExperienceIds.includes(activeExperienceModal.id) ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Programa Eklendi
                      </span>
                    ) : (
                      '+ Konaklamaya Ekle'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        !selectedExperienceIds.includes(activeExperienceModal.id)
                      ) {
                        handleToggleExperience(activeExperienceModal.id);
                      }
                      setActiveExperienceModal(null);
                      setIsReservationOpen(true);
                    }}
                    className="px-5 py-3 rounded-full bg-[#111111] text-white font-syne text-xs font-bold hover:bg-[#bda177] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Rezervasyona Geç
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monografi Makale Okuma Modalı */}
      {activeMonographModal && (
        <div
          className="fixed inset-0 z-[215] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={() => setActiveMonographModal(null)}
        >
          <div
            className="w-full max-w-xl bg-[#f7f6f2] text-[#111111] rounded-3xl p-6 md:p-10 border border-black/10 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-5">
              <div>
                <span className="text-xs font-mono-tabular text-[#686662] block mb-1">
                  {activeMonographModal.tag} ·{' '}
                  {activeMonographModal.residencyDate}
                </span>
                <h3 className="font-syne text-2xl font-extrabold">
                  {activeMonographModal.author}
                </h3>
                <p className="text-xs text-[#686662]">
                  {activeMonographModal.role} —{' '}
                  {activeMonographModal.sanctuaryVisited} Konaklaması
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveMonographModal(null)}
                aria-label="Kapat"
                className="w-9 h-9 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <blockquote className="font-syne text-lg font-bold text-[#111111] leading-snug border-l-2 border-[#bda177] pl-4">
              {activeMonographModal.quote}
            </blockquote>

            <div className="space-y-3 text-sm text-[#4a4845] leading-relaxed">
              {activeMonographModal.fullEssay.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono-tabular font-semibold text-[#686662]">
                <Compass className="w-3.5 h-3.5 inline mr-1 text-[#bda177]" />
                {activeMonographModal.metricHighlight}
              </span>

              <button
                type="button"
                onClick={() => {
                  setActiveMonographModal(null);
                  setIsReservationOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#111111] text-white font-syne text-xs font-bold hover:bg-[#bda177] transition-colors cursor-pointer"
              >
                Bu Sığınağı Ayırt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
