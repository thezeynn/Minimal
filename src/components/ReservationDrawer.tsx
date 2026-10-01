import React, { useState, useMemo } from 'react';
import { X, Check, Calendar, Users, Sparkles, ArrowRight } from 'lucide-react';
import {
  Sanctuary,
  HERO_SANCTUARIES,
  SIGNATURE_SUITES,
  CURATED_EXPERIENCES,
} from '../data/sanctuaries';
import { ResilientImage } from './ResilientImage';

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSanctuary: Sanctuary | null;
  selectedExperienceIds: string[];
  onToggleExperience: (id: string) => void;
  onSelectSanctuary: (s: Sanctuary) => void;
}

export const ReservationDrawer: React.FC<ReservationDrawerProps> = ({
  isOpen,
  onClose,
  selectedSanctuary,
  selectedExperienceIds,
  onToggleExperience,
  onSelectSanctuary,
}) => {
  const allSanctuaries = useMemo(
    () => [...SIGNATURE_SUITES, ...HERO_SANCTUARIES],
    []
  );

  const activeSanctuary = selectedSanctuary || SIGNATURE_SUITES[0];

  const [checkIn, setCheckIn] = useState('2026-11-12');
  const [checkOut, setCheckOut] = useState('2026-11-16');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 3;
  }, [checkIn, checkOut]);

  const staySubtotal = activeSanctuary.nightlyRate * nights;
  const experiencesSubtotal = useMemo(() => {
    return selectedExperienceIds.reduce((acc, id) => {
      const exp = CURATED_EXPERIENCES.find((e) => e.id === id);
      return acc + (exp ? exp.pricePerGuest * guests : 0);
    }, 0);
  }, [selectedExperienceIds, guests]);

  const totalTariff = staySubtotal + experiencesSubtotal;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Lütfen adınızı ve soyadınızı eksiksiz girin.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    const randomCode = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedCode(randomCode);
  };

  return (
    <div
      className="fixed inset-0 z-[220] flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl h-full overflow-y-auto bg-[#f7f6f2] text-[#111111] p-6 md:p-10 flex flex-col justify-between border-l border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Üst Başlık */}
          <div className="flex items-center justify-between pb-6 border-b border-black/10">
            <div>
              <span className="text-xs font-semibold text-[#686662] block mb-1">
                Özel Mimari Konsiyerj
              </span>
              <h2 className="font-syne text-2xl font-extrabold">
                Sığınak Konaklama Talebi
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Kapat"
              className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {confirmedCode ? (
            <div className="py-10 space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#1f2b20] text-[#e9ede6] flex items-center justify-center">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-mono-tabular text-[#686662] block mb-1">
                  DOSYA REFERANSI · {confirmedCode}
                </span>
                <h3 className="font-syne text-2xl font-extrabold mb-2">
                  Sığınak rezervasyon dosyanız oluşturuldu.
                </h3>
                <p className="text-sm text-[#55534e] leading-relaxed">
                  Sayın <strong>{fullName}</strong>, <strong>{activeSanctuary.title}</strong> ({activeSanctuary.location}) için özel mimari konaklama dosyanız onaylandı. Kıdemli küratörümüz 2 saat içinde transfer ve termal su hazırlık detayları için <strong>{email}</strong> adresinden sizinle iletişime geçecektir.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/8 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-black/6">
                  <span className="text-[#686662]">Seçilen Sığınak</span>
                  <span className="font-semibold">{activeSanctuary.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/6">
                  <span className="text-[#686662]">Tarihler ve Süre</span>
                  <span className="font-mono-tabular font-semibold">
                    {checkIn} → {checkOut} ({nights} Gece)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/6">
                  <span className="text-[#686662]">Konuk Sayısı</span>
                  <span className="font-mono-tabular font-semibold">{guests} Konuk</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/6">
                  <span className="text-[#686662]">Dahil Edilen Ritüeller</span>
                  <span className="font-mono-tabular font-semibold">
                    {selectedExperienceIds.length} Seçili Deneyim
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm">
                  <span className="font-syne font-bold">Toplam Tahmini Bedel</span>
                  <span className="font-mono-tabular font-bold">
                    €{totalTariff.toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedCode(null);
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-[#111111] text-white font-syne text-sm font-bold hover:bg-[#bda177] transition-colors cursor-pointer"
              >
                Mimari Koleksiyona Dön
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="py-6 space-y-6">
              {/* Sığınak Seçici */}
              <div>
                <label className="block text-xs font-semibold text-[#4a4845] mb-2">
                  01. Mimari Sığınak Seçimi
                </label>
                <select
                  value={activeSanctuary.id}
                  onChange={(e) => {
                    const found = allSanctuaries.find((s) => s.id === e.target.value);
                    if (found) onSelectSanctuary(found);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/12 text-sm font-medium focus:outline-none focus:border-black"
                >
                  <optgroup label="İmza Pavyonlar">
                    {SIGNATURE_SUITES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} — {s.location} (€{s.nightlyRate}/gece)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Seçkin Sığınaklar Koleksiyonu">
                    {HERO_SANCTUARIES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} — {s.location} (€{s.nightlyRate}/gece)
                      </option>
                    ))}
                  </optgroup>
                </select>

                {/* Seçilen Sığınak Önizleme */}
                <div className="mt-3 flex items-center gap-3.5 p-3 rounded-xl bg-white border border-black/6">
                  <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                    <ResilientImage
                      src={activeSanctuary.image}
                      alt={activeSanctuary.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-syne text-sm font-bold truncate">
                      {activeSanctuary.title}
                    </div>
                    <div className="text-xs text-[#686662] truncate">
                      {activeSanctuary.location} · {activeSanctuary.acousticDb} dBA · {activeSanctuary.areaSqm} m²
                    </div>
                  </div>
                  <div className="font-mono-tabular text-xs font-semibold shrink-0">
                    €{activeSanctuary.nightlyRate}/gece
                  </div>
                </div>
              </div>

              {/* Tarihler ve Konuk Sayısı */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4a4845] mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Giriş Tarihi
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/12 text-xs font-mono-tabular focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4845] mb-1.5">
                    <Calendar className="w-3.5 h-3.5 inline mr-1" />
                    Çıkış Tarihi
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/12 text-xs font-mono-tabular focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4a4845] mb-1.5">
                    <Users className="w-3.5 h-3.5 inline mr-1" />
                    Konuk Sayısı
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/12 text-xs font-mono-tabular focus:outline-none focus:border-black"
                  >
                    {[1, 2, 3, 4, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Konuk
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Özel Ritüel Seçimi */}
              <div>
                <label className="block text-xs font-semibold text-[#4a4845] mb-2">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1 text-[#bda177]" />
                  02. Özel Ritüel ve Deneyim Eşleştirmesi (İsteğe Bağlı)
                </label>
                <div className="space-y-2">
                  {CURATED_EXPERIENCES.map((exp) => {
                    const isChecked = selectedExperienceIds.includes(exp.id);
                    return (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => onToggleExperience(exp.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isChecked
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-[#111111] border-black/8 hover:border-black/25'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-syne text-xs font-bold truncate">
                            {exp.name}
                          </div>
                          <div
                            className={`text-[11px] truncate ${
                              isChecked ? 'text-white/70' : 'text-[#686662]'
                            }`}
                          >
                            {exp.location} · {exp.duration}
                          </div>
                        </div>
                        <div className="font-mono-tabular text-xs font-semibold shrink-0">
                          +€{exp.pricePerGuest}/kişi
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Konuk Bilgileri */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#4a4845]">
                  03. Konuk Bilgileri ve Akustik / Termal Tercihler
                </label>
                <input
                  type="text"
                  placeholder="Adınız ve Soyadınız"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/12 text-sm focus:outline-none focus:border-black"
                />
                <input
                  type="email"
                  placeholder="Özel E-Posta Adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/12 text-sm focus:outline-none focus:border-black"
                />
                <textarea
                  rows={2}
                  placeholder="Özel talepleriniz (Örn: helikopter transferi, 41.5°C termal su hazırlığı, plak koleksiyonu seçkisi)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/12 text-xs focus:outline-none focus:border-black resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/10 border border-red-800/30 text-red-900 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Toplam Özeti ve Onay */}
              <div className="pt-4 border-t border-black/10 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#686662]">
                    <span>
                      Sığınak Konaklaması ({nights} gece × €{activeSanctuary.nightlyRate})
                    </span>
                    <span className="font-mono-tabular">
                      €{staySubtotal.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  {experiencesSubtotal > 0 && (
                    <div className="flex justify-between text-[#686662]">
                      <span>
                        Seçili Ritüeller ({selectedExperienceIds.length} deneyim · {guests} konuk)
                      </span>
                      <span className="font-mono-tabular">
                        €{experiencesSubtotal.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-black/6">
                    <span className="font-syne">Toplam Konaklama Bedeli</span>
                    <span className="font-mono-tabular">
                      €{totalTariff.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#111111] text-white font-syne text-sm font-bold hover:bg-[#bda177] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Rezervasyon Talebini Onayla</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
