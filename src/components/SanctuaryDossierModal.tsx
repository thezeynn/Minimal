import React, { useState } from 'react';
import { X, Compass, Volume2, Thermometer, Maximize2, Check, ArrowRight } from 'lucide-react';
import { Sanctuary } from '../data/sanctuaries';
import { ResilientImage } from './ResilientImage';

interface SanctuaryDossierModalProps {
  sanctuary: Sanctuary | null;
  onClose: () => void;
  onReserve: (sanctuary: Sanctuary) => void;
}

export const SanctuaryDossierModal: React.FC<SanctuaryDossierModalProps> = ({
  sanctuary,
  onClose,
  onReserve,
}) => {
  const [viewMode, setViewMode] = useState<'photo' | 'blueprint'>('photo');

  if (!sanctuary) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#f7f6f2] text-[#111111] rounded-3xl border border-black/10 p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Üst Başlık */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#686662] font-medium mb-2">
              <span>{sanctuary.region}</span>
              <span aria-hidden="true">·</span>
              <span>{sanctuary.location}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-tabular">{sanctuary.coordinates}</span>
            </div>
            <h2 className="font-syne text-2xl md:text-4xl font-extrabold tracking-tight">
              {sanctuary.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Kapat"
            className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ana İçerik Izgarası */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
          {/* Sol Sütun: Fotoğraf / Mimari Plan Seçici */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex p-1 bg-[#eae7df] rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#686662] hover:text-[#111111]'
                  }`}
                >
                  Fotoğraf İncelemesi
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('blueprint')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    viewMode === 'blueprint'
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#686662] hover:text-[#111111]'
                  }`}
                >
                  Mimari Plan (SVG)
                </button>
              </div>

              <span className="text-xs text-[#686662] font-mono-tabular">
                ★ {sanctuary.rating} · {sanctuary.areaSqm} m²
              </span>
            </div>

            <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden border border-black/10 bg-[#141619]">
              {viewMode === 'photo' ? (
                <>
                  <ResilientImage
                    src={sanctuary.image}
                    alt={sanctuary.title}
                    objectPosition={sanctuary.imagePosition}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="text-xs text-white/75 mb-1">Birincil Materyal Dokusu</p>
                      <p className="text-sm font-medium">{sanctuary.materiality}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full p-6 flex flex-col justify-between text-[#e5ded4] bg-[#121417]">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#bda177]">
                    <span>ÖLÇEK 1:100 · MEKÂNSAL AKSONOMETRİK PLAN</span>
                    <span>SES TABANI: {sanctuary.acousticDb} dBA</span>
                  </div>

                  {/* İnteraktif Mimari Plan SVG */}
                  <svg
                    viewBox="0 0 600 300"
                    className="w-full h-60 stroke-[#e5ded4]/80"
                    fill="none"
                  >
                    <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
                      <line x1="0" y1="60" x2="600" y2="60" />
                      <line x1="0" y1="120" x2="600" y2="120" />
                      <line x1="0" y1="180" x2="600" y2="180" />
                      <line x1="0" y1="240" x2="600" y2="240" />
                      <line x1="120" y1="0" x2="120" y2="300" />
                      <line x1="240" y1="0" x2="240" y2="300" />
                      <line x1="360" y1="0" x2="360" y2="300" />
                      <line x1="480" y1="0" x2="480" y2="300" />
                    </g>

                    <rect
                      x="70"
                      y="35"
                      width="460"
                      height="230"
                      stroke="#bda177"
                      strokeWidth="2.5"
                      fill="rgba(189,161,119,0.04)"
                    />

                    <rect
                      x="90"
                      y="55"
                      width="150"
                      height="190"
                      stroke="#7dd3fc"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="rgba(125,211,252,0.06)"
                    />
                    <text
                      x="102"
                      y="82"
                      fill="#7dd3fc"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      TERMAL HAVUZ
                    </text>
                    <text
                      x="102"
                      y="98"
                      fill="rgba(255,255,255,0.6)"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      41.2°C MİNERAL SU
                    </text>

                    <rect
                      x="255"
                      y="55"
                      width="155"
                      height="120"
                      stroke="#e5ded4"
                      strokeWidth="1.5"
                    />
                    <text
                      x="266"
                      y="82"
                      fill="#e5ded4"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      ANA PAVYON BOŞLUĞU
                    </text>
                    <circle
                      cx="332"
                      cy="125"
                      r="22"
                      stroke="#bda177"
                      strokeWidth="1.2"
                    />

                    <rect
                      x="425"
                      y="55"
                      width="85"
                      height="190"
                      stroke="#e5ded4"
                      strokeWidth="1.5"
                    />
                    <text
                      x="433"
                      y="82"
                      fill="#e5ded4"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      UYKU SÜİTİ
                    </text>
                    <text
                      x="433"
                      y="96"
                      fill="#bda177"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {sanctuary.acousticDb} dBA
                    </text>

                    <path
                      d="M 255 240 Q 332 190 410 240"
                      stroke="#bda177"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <text
                      x="270"
                      y="235"
                      fill="#bda177"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      GÜNEŞ IŞIĞI EKSENİ
                    </text>
                  </svg>

                  <div className="flex items-center justify-between text-xs text-white/60 font-mono-tabular">
                    <span>MİMAR: {sanctuary.architect}</span>
                    <span>RAKIM: {sanctuary.elevationM}m</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mekânsal Notlar */}
            <div className="bg-white rounded-2xl p-6 border border-black/6">
              <h3 className="font-syne text-sm font-bold mb-3">
                Kürasyon ve Mekânsal Öne Çıkanlar
              </h3>
              <ul className="space-y-2.5">
                {sanctuary.spatialNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4a4845]">
                    <Check className="w-4 h-4 text-[#bda177] shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sağ Sütun: Teknik Özellikler ve Rezervasyon */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-syne text-lg font-bold mb-2">Mimari Monografi</h3>
                <p className="text-sm leading-relaxed text-[#55534e]">
                  {sanctuary.description}
                </p>
              </div>

              {/* Tabular Mimari Metrikler */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-xl border border-black/6">
                  <div className="flex items-center gap-1.5 text-xs text-[#686662] mb-1">
                    <Volume2 className="w-3.5 h-3.5 text-[#bda177]" />
                    <span>Akustik Yalıtım</span>
                  </div>
                  <div className="font-mono-tabular text-base font-semibold">
                    {sanctuary.acousticDb} dBA Sessizlik
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-black/6">
                  <div className="flex items-center gap-1.5 text-xs text-[#686662] mb-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#bda177]" />
                    <span>İç Mekân & Avlu</span>
                  </div>
                  <div className="font-mono-tabular text-base font-semibold">
                    {sanctuary.areaSqm} m² Toplam
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-black/6">
                  <div className="flex items-center gap-1.5 text-xs text-[#686662] mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#bda177]" />
                    <span>Termal Deneyim</span>
                  </div>
                  <div className="text-xs font-semibold leading-snug">
                    {sanctuary.thermalFeature}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-black/6">
                  <div className="flex items-center gap-1.5 text-xs text-[#686662] mb-1">
                    <Compass className="w-3.5 h-3.5 text-[#bda177]" />
                    <span>Güneş Yönelimi</span>
                  </div>
                  <div className="text-xs font-semibold leading-snug">
                    {sanctuary.solarOrientation}
                  </div>
                </div>
              </div>

              <div className="bg-[#ede9e0] rounded-xl p-4 text-xs text-[#4a4845] space-y-1">
                <div className="font-semibold text-[#111111]">
                  Baş Mimar: {sanctuary.architect}
                </div>
                <div>
                  Özel helikopter/tekne transferi, kişisel mimari rehber ve termal havuz hazırlığı gecelik konaklama bedeline dahildir.
                </div>
              </div>
            </div>

            {/* Alt Fiyat ve Rezervasyon */}
            <div className="pt-6 border-t border-black/10 flex items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#686662]">Konaklama Bedeli</span>
                <span className="font-syne text-2xl font-extrabold font-mono-tabular">
                  €{sanctuary.nightlyRate.toLocaleString('tr-TR')}
                </span>
                <span className="text-xs text-[#686662]"> / gece</span>
              </div>

              <button
                type="button"
                onClick={() => onReserve(sanctuary)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] text-white font-syne text-sm font-bold hover:bg-[#bda177] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Bu Sığınağı Ayırt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
