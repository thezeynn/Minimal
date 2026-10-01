import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  Share2,
  Check,
  ArrowUpRight,
  Play,
  Camera,
  Music,
  X,
  Copy,
} from 'lucide-react';
import { IMAGES, Sanctuary, SIGNATURE_SUITES, HERO_SANCTUARIES } from '../data/sanctuaries';
import { ResilientImage } from './ResilientImage';

export type SocialPlatform = 'Tümü' | 'Instagram' | 'YouTube' | 'Pinterest' | 'Spotify';

export interface SocialPost {
  id: string;
  platform: Exclude<SocialPlatform, 'Tümü'>;
  handle: string;
  date: string;
  location: string;
  caption: string;
  cameraSpec: string;
  likes: number;
  saves: number;
  image: string;
  isVideo?: boolean;
  duration?: string;
  relatedSanctuaryId: string;
  tags: string[];
}

export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  followers: string;
  description: string;
  latestUpdate: string;
  urlText: string;
  accentColor: string;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@seckinsiginaklar',
    followers: '482B Takipçi',
    description: 'Günlük ışık kırılmaları, şafak sisi kayıtları ve mimari detay kareleri.',
    latestUpdate: '2 saat önce · Arashiyama Bambu Işığı',
    urlText: 'instagram.com/seckinsiginaklar',
    accentColor: '#bda177',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'Seçkin Sığınaklar Belgesel',
    followers: '164B Abone',
    description: '4K 60fps sessiz mimari yürüyüşler, mimar röportajları ve akustik kayıtlar.',
    latestUpdate: 'Yeni Film · Vals Kuvarsit Ocağı (18 dk)',
    urlText: 'youtube.com/@seckinsiginaklar',
    accentColor: '#d4847c',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    handle: '/seckinsiginaklar',
    followers: '920B Aylık Görüntüleme',
    description: 'Ham traverten, yakılmış sedir, kigumi geçme detayları ve kat planı arşivleri.',
    latestUpdate: '24 Panoda 1.840 Küratöryel Pin',
    urlText: 'pinterest.com/seckinsiginaklar',
    accentColor: '#c9a675',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    handle: 'Sığınak Akustik Kayıtları',
    followers: '94B Dinleyici',
    description: 'Kyoto yağmur sesi, 174Hz rezonans tınıları ve Viyana analog plak seçkileri.',
    latestUpdate: 'Çalma Listesi · 04:00 Gece Sirkadiyen',
    urlText: 'open.spotify.com/seckinsiginaklar',
    accentColor: '#7ca982',
  },
  {
    id: 'behance',
    name: 'Behance',
    handle: 'Seçkin Sığınaklar Mimari',
    followers: '68B Takipçi',
    description: 'Aksonometrik çizimler, 1:100 teknik kesitler ve restorasyon monografileri.',
    latestUpdate: '8 Mimari Takdir Ödülü (Featured)',
    urlText: 'behance.net/seckinsiginaklar',
    accentColor: '#8899b0',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Zamansız Yaşam Kolektifi',
    followers: '42B Takipçi',
    description: 'Sürdürülebilir taş mimarisi, karbon-negatif ahşap yapılar ve kürasyon vizyonu.',
    latestUpdate: '2026 Mimari Sürdürülebilirlik Raporu',
    urlText: 'linkedin.com/company/seckinsiginaklar',
    accentColor: '#9aa5b1',
  },
];

const INITIAL_POSTS: SocialPost[] = [
  {
    id: 'post-kyoto-dawn',
    platform: 'Instagram',
    handle: '@seckinsiginaklar',
    date: 'Bugün · 06:18',
    location: 'Arashiyama, Kyoto',
    caption:
      'Sabah 06:15’te bazalt onsen havuzundan yükselen 41.5°C termal buhar, yakılmış sedir kolonların arasından süzülen ilk yatay güneş huzmesiyle buluşuyor. Tek bir yapay ışık kaynağı bile kullanılmadı.',
    cameraSpec: 'Leica M11 · APO-Summicron-M 35mm f/2 · ISO 64',
    likes: 14820,
    saves: 3940,
    image: IMAGES.kyoto,
    relatedSanctuaryId: 'komorebi-glass-house',
    tags: ['MimariSessizlik', 'KyotoOnsen', 'Komorebi', 'HinokiSediri'],
  },
  {
    id: 'post-vals-film',
    platform: 'YouTube',
    handle: 'Seçkin Sığınaklar Belgesel',
    date: '2 Gün Önce',
    location: 'Graubünden, İsviçre',
    caption:
      'Kısa Film: 60.000 Adet Kuvarsit Plakanın Akustik Sırrı. 1.520 metre rakımda inşa edilen Vals Kuvarsit Dağ Evi’nde rüzgarın ve suyun 14 dBA sessizlikteki yankısını kaydettik.',
    cameraSpec: 'RED V-Raptor 8K VV · Sennheiser Ambisonic Mikrofon',
    likes: 22450,
    saves: 6120,
    image: IMAGES.swiss,
    isVideo: true,
    duration: '14:28',
    relatedSanctuaryId: 'vals-granite-lodge',
    tags: ['AlpMimarisi', 'KuvarsitTaş', 'AkustikYalıtım', '4KBelgesel'],
  },
  {
    id: 'post-travertine-board',
    platform: 'Pinterest',
    handle: '/seckinsiginaklar',
    date: '4 Gün Önce',
    location: 'Val d’Orcia & Milano',
    caption:
      'Materyal İncelemesi No. 09: Verniksiz Roma traverteni ve fırçalanmış pirinç yüzeylerin öğle zenitinde (5600K) oluşturduğu geometrik gölge kesitleri.',
    cameraSpec: 'Hasselblad X2D 100C · XCD 55mmV',
    likes: 19310,
    saves: 8450,
    image: IMAGES.travertine,
    relatedSanctuaryId: 'terra-boutique',
    tags: ['RomaTraverteni', 'MonolitikDetay', 'IşıkYontusu', 'İçMimari'],
  },
  {
    id: 'post-nordic-sound',
    platform: 'Spotify',
    handle: 'Sığınak Akustik Kayıtları',
    date: '1 Hafta Önce',
    location: 'Lofoten Takımadaları, Norveç',
    caption:
      'Gece Seansı Kaydı: Kuzey Işıkları altında fiyort dalgalarının kayrak taşı kıyıya vuruşu ve odun ateşli saunanın 174Hz doğal rezonansı. Kulaklıkla dinlemeniz önerilir.',
    cameraSpec: 'Binaural 3D Alan Kaydı · 96kHz / 24-bit Kayıpsız Ses',
    likes: 11680,
    saves: 4790,
    image: IMAGES.nordic,
    isVideo: false,
    duration: '42:10 Ses Kaydı',
    relatedSanctuaryId: 'lofoten-mirror-cabin',
    tags: ['FiyortAkustiği', '174Hz', 'KuzeyIşıkları', 'BinauralSes'],
  },
];

interface SocialJournalSectionProps {
  onSelectSanctuary: (sanctuary: Sanctuary) => void;
  onCard3DTilt: (e: React.MouseEvent<HTMLElement>) => void;
  onCard3DReset: (e: React.MouseEvent<HTMLElement>) => void;
}

export const SocialJournalSection: React.FC<SocialJournalSectionProps> = ({
  onSelectSanctuary,
  onCard3DTilt,
  onCard3DReset,
}) => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>('Tümü');
  const [likedIds, setLikedIds] = useState<string[]>(['post-kyoto-dawn']);
  const [savedIds, setSavedIds] = useState<string[]>(['post-travertine-board']);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<SocialChannel | null>(
    null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allSanctuaries = [...SIGNATURE_SUITES, ...HERO_SANCTUARIES];

  const filteredPosts =
    activePlatform === 'Tümü'
      ? INITIAL_POSTS
      : INITIAL_POSTS.filter((p) => p.platform === activePlatform);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyText = (text: string, key: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInspectRelated = (sanctuaryId: string) => {
    const found = allSanctuaries.find((s) => s.id === sanctuaryId);
    if (found) {
      setSelectedPost(null);
      onSelectSanctuary(found);
    }
  };

  return (
    <section
      id="social-journal"
      className="max-w-[1200px] mx-auto px-6 pb-32 relative z-10 gsap-reveal-block"
    >
      {/* Üst Başlık ve Platform Filtre Sekmeleri */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <span className="hero-subtitle-top" style={{ marginBottom: '6px' }}>
            Dijital Kürasyon &amp; Topluluk · @seckinsiginaklar
          </span>
          <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight">
            Sosyal Medya ve Görsel Günlük
          </h2>
        </div>

        {/* İnteraktif Platform Filtresi */}
        <div
          role="tablist"
          aria-label="Sosyal Medya Platformları"
          className="flex items-center gap-1.5 p-1.5 bg-white/90 rounded-xl border border-black/8 flex-wrap"
        >
          {(
            ['Tümü', 'Instagram', 'YouTube', 'Pinterest', 'Spotify'] as const
          ).map((plat) => (
            <button
              key={plat}
              type="button"
              role="tab"
              aria-selected={activePlatform === plat}
              onClick={() => setActivePlatform(plat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activePlatform === plat
                  ? 'bg-[#111111] text-white'
                  : 'text-[#686662] hover:text-[#111111]'
              }`}
            >
              {plat === 'Tümü' ? 'Tüm Kanallar' : plat}
            </button>
          ))}
        </div>
      </div>

      {/* Görsel Günlük Kartları (4 Sütunlu Editoryal Sosyal Akış) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {filteredPosts.map((post) => {
          const isLiked = likedIds.includes(post.id);
          const isSaved = savedIds.includes(post.id);
          const likeCount = post.likes + (isLiked ? 1 : 0);
          const saveCount = post.saves + (isSaved ? 1 : 0);

          return (
            <article
              key={post.id}
              data-cursor="SOSYAL"
              onMouseMove={onCard3DTilt}
              onMouseLeave={onCard3DReset}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl overflow-hidden border border-black/8 flex flex-col justify-between cursor-pointer transition-colors hover:border-black/25"
            >
              <div>
                {/* Üst Platform Satırı */}
                <div className="px-5 py-3.5 flex items-center justify-between text-xs border-b border-black/6">
                  <div className="flex items-center gap-2 font-semibold text-[#111111]">
                    <span>{post.platform}</span>
                    <span className="text-[#686662] font-normal">·</span>
                    <span className="text-[#686662] font-normal truncate max-w-[110px]">
                      {post.location}
                    </span>
                  </div>
                  <span className="font-mono-tabular text-[11px] text-[#686662]">
                    {post.date}
                  </span>
                </div>

                {/* Görsel Alanı */}
                <div className="relative h-60 w-full overflow-hidden bg-[#141619]">
                  <ResilientImage
                    src={post.image}
                    alt={post.location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {post.isVideo && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 text-[#111111] flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  )}

                  {post.duration && (
                    <div className="absolute bottom-3 left-4 text-[11px] font-mono-tabular text-white/90 flex items-center gap-1.5">
                      {post.platform === 'Spotify' ? (
                        <Music className="w-3.5 h-3.5 text-[#bda177]" />
                      ) : (
                        <Camera className="w-3.5 h-3.5 text-[#bda177]" />
                      )}
                      <span>{post.duration}</span>
                    </div>
                  )}
                </div>

                {/* Açıklama */}
                <div className="p-5">
                  <p className="text-xs text-[#3d3b38] leading-relaxed line-clamp-3 mb-3">
                    {post.caption}
                  </p>
                  <div className="text-[11px] text-[#686662] font-mono-tabular truncate">
                    {post.tags.map((t) => `#${t}`).join(' · ')}
                  </div>
                </div>
              </div>

              {/* Alt Etkileşim Çubuğu */}
              <div className="px-5 py-3.5 bg-[#faf9f6] border-t border-black/6 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(post.id, e)}
                    aria-label="Beğen"
                    className={`inline-flex items-center gap-1.5 font-mono-tabular font-semibold transition-colors cursor-pointer ${
                      isLiked
                        ? 'text-red-700'
                        : 'text-[#55534e] hover:text-[#111111]'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                    />
                    <span>{likeCount.toLocaleString('tr-TR')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => toggleSave(post.id, e)}
                    aria-label="Koleksiyona Kaydet"
                    className={`inline-flex items-center gap-1.5 font-mono-tabular font-semibold transition-colors cursor-pointer ${
                      isSaved
                        ? 'text-[#8c7046]'
                        : 'text-[#55534e] hover:text-[#111111]'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                    />
                    <span>{saveCount.toLocaleString('tr-TR')}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={(e) =>
                    handleCopyText(
                      `https://seckinsiginaklar.com/gunluk/${post.id}`,
                      post.id,
                      e
                    )
                  }
                  aria-label="Paylaşım Bağlantısını Kopyala"
                  className="text-[#55534e] hover:text-[#111111] transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === post.id ? (
                    <span className="text-[11px] font-semibold text-emerald-800 inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Kopyalandı
                    </span>
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Resmi Sosyal Medya Kanalları Matrisi (6 Platform) */}
      <div className="bg-[#111111] text-[#f7f6f2] rounded-3xl p-6 md:p-10 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold text-[#bda177] block mb-1.5">
              Resmi Topluluk Ağları · 1.7M+ Küresel Mimari Takipçi
            </span>
            <h3 className="font-syne text-2xl md:text-3xl font-extrabold">
              Bizi Tüm Dijital Mecralarda Takip Edin
            </h3>
          </div>
          <p className="text-xs text-white/65 max-w-sm">
            Mimari monografiler, 4K belgesel gösterimleri ve akustik çalma
            listelerimize resmi kanallarımız üzerinden ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
          {SOCIAL_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              data-cursor="KANAL"
              onClick={() => setSelectedChannel(ch)}
              className="group p-5 rounded-2xl bg-white/4 hover:bg-white/8 border border-white/8 hover:border-[#bda177]/50 transition-all cursor-pointer flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-syne text-base font-bold text-white group-hover:text-[#bda177] transition-colors">
                    {ch.name}
                  </span>
                  <span className="font-mono-tabular text-xs text-white/65">
                    {ch.followers}
                  </span>
                </div>
                <div className="font-mono-tabular text-xs text-[#bda177] mb-2.5">
                  {ch.handle}
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/8 flex items-center justify-between text-[11px] text-white/55">
                <span className="truncate pr-2">{ch.latestUpdate}</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sosyal Medya Gönderi İnceleme Modalı */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[225] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#f7f6f2] text-[#111111] rounded-3xl overflow-hidden border border-black/15 grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:col-span-6 relative min-h-[280px] bg-[#141619]">
              <ResilientImage
                src={selectedPost.image}
                alt={selectedPost.location}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5">
                <div className="text-white text-xs font-mono-tabular">
                  <Camera className="w-3.5 h-3.5 inline mr-1.5 text-[#bda177]" />
                  {selectedPost.cameraSpec}
                </div>
              </div>
            </div>

            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-4">
                  <div>
                    <span className="font-syne font-bold text-sm block">
                      {selectedPost.platform} · {selectedPost.handle}
                    </span>
                    <span className="text-xs text-[#686662]">
                      {selectedPost.location} · {selectedPost.date}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    aria-label="Kapat"
                    className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-[#3d3b38] leading-relaxed mb-4">
                  {selectedPost.caption}
                </p>

                <div className="text-xs font-mono-tabular text-[#686662] mb-4">
                  {selectedPost.tags.map((t) => `#${t}`).join(' · ')}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tabular font-semibold">
                    ♥ {selectedPost.likes.toLocaleString('tr-TR')} Beğeni ·{' '}
                    {selectedPost.saves.toLocaleString('tr-TR')} Kayıt
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        `https://seckinsiginaklar.com/gunluk/${selectedPost.id}`,
                        `modal-${selectedPost.id}`
                      )
                    }
                    className="text-xs font-semibold text-[#111111] hover:text-[#bda177] inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === `modal-${selectedPost.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Bağlantı Kopyalandı
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Bağlantıyı Kopyala
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleInspectRelated(selectedPost.relatedSanctuaryId)
                  }
                  className="w-full py-3 rounded-full bg-[#111111] text-white font-syne text-xs font-bold hover:bg-[#bda177] transition-colors cursor-pointer"
                >
                  Bu Paylaşımdaki Sığınağın Mimari Dosyasını Aç
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resmi Sosyal Medya Kanalı Önizleme Modalı */}
      {selectedChannel && (
        <div
          className="fixed inset-0 z-[225] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedChannel(null)}
        >
          <div
            className="w-full max-w-lg bg-[#141619] text-[#f7f6f2] rounded-3xl p-6 md:p-8 border border-white/15 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono-tabular text-[#bda177] block mb-1">
                  RESMİ DOĞRULANMIŞ KANAL · {selectedChannel.followers}
                </span>
                <h3 className="font-syne text-2xl font-extrabold">
                  {selectedChannel.name} ({selectedChannel.handle})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChannel(null)}
                aria-label="Kapat"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              {selectedChannel.description}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/60">Son Yayın</span>
                <span className="font-semibold text-white">
                  {selectedChannel.latestUpdate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Resmi Bağlantı</span>
                <span className="font-mono-tabular text-[#bda177]">
                  https://{selectedChannel.urlText}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `https://${selectedChannel.urlText}`,
                    `ch-${selectedChannel.id}`
                  )
                }
                className="flex-1 py-3 rounded-full bg-white text-[#111111] font-syne text-xs font-bold hover:bg-[#bda177] hover:text-white transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                {copiedId === `ch-${selectedChannel.id}` ? (
                  <>
                    <Check className="w-4 h-4" /> Kanal Adresi Kopyalandı
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Kanal Bağlantısını Kopyala
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
