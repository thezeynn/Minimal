import React, { useState } from 'react';
import { X, Sun, Sunrise, Sunset, Moon, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/sanctuaries';
import { ResilientImage } from './ResilientImage';

interface SanctuaryFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

interface DiurnalPhase {
  id: 'dawn' | 'zenith' | 'golden' | 'nocturne';
  time: string;
  label: string;
  kelvin: string;
  lux: string;
  image: string;
  filterStyle: string;
  overlayStyle: string;
  caption: string;
}

const PHASES: DiurnalPhase[] = [
  {
    id: 'dawn',
    time: '06:15',
    label: 'Şafak Sisi',
    kelvin: '4800K Serin Sis Işığı',
    lux: '320 Lüks',
    image: IMAGES.kyoto,
    filterStyle: 'brightness(0.95) contrast(1.05) saturate(0.85)',
    overlayStyle: 'linear-gradient(180deg, rgba(25,38,48,0.28) 0%, rgba(12,16,20,0.75) 100%)',
    caption:
      'Sabah sisi bambu korusunun arasından yükselirken, 41.5°C bazalt onsen su yüzeyinden yükselen buhar doğu cephesinden süzülen ilk yatay ışıkla buluşur.',
  },
  {
    id: 'zenith',
    time: '12:30',
    label: 'Öğle Zeniti',
    kelvin: '5600K Saf Gün Işığı',
    lux: '1.450 Lüks',
    image: IMAGES.travertine,
    filterStyle: 'brightness(1.06) contrast(1.08) saturate(1.0)',
    overlayStyle: 'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(15,14,12,0.68) 100%)',
    caption:
      'Güneş en tepe noktaya ulaştığında, 14 derecelik tavan yarıklarından süzülen dikey ışık huzmesi ham Roma traverteni duvarlarda keskin bir güneş saati çizer.',
  },
  {
    id: 'golden',
    time: '17:45',
    label: 'Altın Saat',
    kelvin: '2900K Kehribar Ufuk',
    lux: '480 Lüks',
    image: IMAGES.amalfi,
    filterStyle: 'brightness(1.0) contrast(1.1) sepia(0.18) saturate(1.15)',
    overlayStyle: 'linear-gradient(180deg, rgba(60,35,15,0.2) 0%, rgba(18,12,8,0.75) 100%)',
    caption:
      'Akdeniz ufuk çizgisinde güneş alçalırken kireçtaşı kemerler kehribar rengine bürünür; taş kütle gündüz topladığı sıcaklığı teraslara yaymaya başlar.',
  },
  {
    id: 'nocturne',
    time: '22:00',
    label: 'Termal Gece',
    kelvin: '2200K Ocak & Aurora',
    lux: '45 Lüks',
    image: IMAGES.nordic,
    filterStyle: 'brightness(0.82) contrast(1.18) saturate(0.9)',
    overlayStyle: 'linear-gradient(180deg, rgba(8,14,22,0.4) 0%, rgba(8,10,14,0.86) 100%)',
    caption:
      'Gece çöktüğünde sirkadiyen ritmi koruyan 2200K gizli zemin aydınlatmaları devreye girer; dış cephe tamamen karararak yıldızları ve Kuzey Işıklarını içeri davet eder.',
  },
];

export const SanctuaryFilmModal: React.FC<SanctuaryFilmModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [activePhase, setActivePhase] = useState<DiurnalPhase>(PHASES[0]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[210] flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0e0f12] text-[#f7f6f2] rounded-3xl overflow-hidden border border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Üst Çubuk */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="font-syne font-bold text-white">Günlük Işık ve Mekân Simülasyonu</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{activePhase.time} Yerel Güneş Saati</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-[#bda177]">{activePhase.kelvin}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* İnteraktif Görsel Sahne */}
        <div className="relative h-[380px] md:h-[460px] w-full overflow-hidden">
          <ResilientImage
            src={activePhase.image}
            alt={activePhase.label}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: activePhase.filterStyle }}
          />
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: activePhase.overlayStyle }}
          />

          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="font-mono-tabular text-xs text-white/80 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                AYDINLIK DÜZEYİ: {activePhase.lux} · {activePhase.kelvin}
              </div>
              <div className="font-mono-tabular text-xs text-[#bda177] bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                GÜNEŞ EVRESİ: {activePhase.time}
              </div>
            </div>

            <div className="max-w-2xl">
              <h3 className="font-syne text-2xl md:text-4xl font-extrabold mb-3">
                {activePhase.time} — {activePhase.label}
              </h3>
              <p className="text-sm md:text-base text-white/85 leading-relaxed">
                {activePhase.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Alt Kontroller: Güneş Evresi Seçici */}
        <div className="p-6 md:px-10 md:py-6 bg-[#14161a] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
            {PHASES.map((phase) => {
              const Icon =
                phase.id === 'dawn'
                  ? Sunrise
                  : phase.id === 'zenith'
                  ? Sun
                  : phase.id === 'golden'
                  ? Sunset
                  : Moon;
              const isSelected = activePhase.id === phase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActivePhase(phase)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#bda177] text-[#0e0f12]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-mono-tabular">{phase.time}</span>
                  <span>{phase.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0e0f12] font-syne text-xs font-bold hover:bg-[#bda177] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Yerinde Deneyimle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
