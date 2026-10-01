import kyotoImg from '../assets/images/kyoto_komorebi_pavilion_1790865598015.jpg';
import swissImg from '../assets/images/swiss_vals_granite_lodge_1790865612595.jpg';
import amalfiImg from '../assets/images/amalfi_limestone_villa_1790865626559.jpg';
import nordicImg from '../assets/images/nordic_mirror_cabin_1790865637540.jpg';
import travertineImg from '../assets/images/travertine_interior_craft_1790865650896.jpg';

export const IMAGES = {
  kyoto: kyotoImg,
  swiss: swissImg,
  amalfi: amalfiImg,
  nordic: nordicImg,
  travertine: travertineImg,
};

export type RegionKey =
  | 'Japonya ve Doğu Asya'
  | 'Alp Avrupa'
  | 'Akdeniz Havzası'
  | 'Kuzey Avrupa';

export interface Sanctuary {
  id: string;
  title: string;
  location: string;
  region: RegionKey;
  rating: string;
  column?: 'left' | 'center' | 'right';
  isSignature?: boolean;
  subtitle?: string;
  image: string;
  imagePosition?: string;
  nightlyRate: number;
  areaSqm: number;
  acousticDb: number;
  elevationM: number;
  coordinates: string;
  architect: string;
  materiality: string;
  thermalFeature: string;
  description: string;
  spatialNotes: string[];
  solarOrientation: string;
}

export const HERO_SANCTUARIES: Sanctuary[] = [
  // SOL SÜTUN
  {
    id: 'courtyard-stay',
    title: 'Avlu Sığınağı',
    location: 'Kyoto, Japonya',
    region: 'Japonya ve Doğu Asya',
    rating: '4.96',
    column: 'left',
    image: kyotoImg,
    imagePosition: 'center center',
    nightlyRate: 940,
    areaSqm: 185,
    acousticDb: 17,
    elevationM: 140,
    coordinates: '35.0116° K, 135.7681° D',
    architect: 'Studio Kengo & Ortakları',
    materiality: 'Yakılmış Hinoki Sediri · Siyah Bazalt · El Yapımı Washi',
    thermalFeature: 'Özel Jeotermal Hinoki Onsen Havuzu (41.5°C)',
    description:
      'Geleneksel machiya avlu kurgusunu monolitik bazalt taşlarla yeniden yorumlayan, yağmur suyunu iç avludaki yosun bahçesine yönlendiren dingin bir sığınak.',
    spatialNotes: [
      'Merkezi açık hava yosun avlusu ve akustik su aynası',
      'Çivisiz geçme ahşap (kigumi) tavan strüktürü',
      '41.5°C doğal kaynak suyuyla beslenen bazalt onsen küveti',
    ],
    solarOrientation: 'Doğu-Güneydoğu · Sabah bambu gölgeleri',
  },
  {
    id: 'terra-boutique',
    title: 'Terra Taş Konak',
    location: 'Toskana, İtalya',
    region: 'Akdeniz Havzası',
    rating: '4.92',
    column: 'left',
    image: travertineImg,
    imagePosition: 'center 35%',
    nightlyRate: 860,
    areaSqm: 210,
    acousticDb: 19,
    elevationM: 420,
    coordinates: '43.0642° K, 11.6131° D',
    architect: 'Atelier Val d’Orcia',
    materiality: 'Siena Ham Traverteni · Kireç Sıva · Yıllanmış Zeytin Ağacı',
    thermalFeature: 'Yeraltı Roma Kaldaryumu ve Tuzlu Su Havuzu',
    description:
      'Val d’Orcia tepelerinde sıkıştırılmış toprak ve ham traverten bloklarla inşa edilen, öğleden sonra güneşini iç kemerlerde süzen kırsal mimari.',
    spatialNotes: [
      '60 cm kalınlığında doğal termal kütle sağlayan taş duvarlar',
      'Yeraltı akustik şarap mahzeni ve özel tadım galerisi',
      'Selvi ağaçlarına bakan ısıtmalı traverten teras havuzu',
    ],
    solarOrientation: 'Güneybatı · Altın saat ışık koridoru',
  },
  {
    id: 'brass-marble',
    title: 'Pirinç & Mermer Atölye',
    location: 'Milano, İtalya',
    region: 'Akdeniz Havzası',
    rating: '4.88',
    column: 'left',
    image: travertineImg,
    imagePosition: 'left center',
    nightlyRate: 790,
    areaSqm: 145,
    acousticDb: 20,
    elevationM: 122,
    coordinates: '45.4642° K, 9.1900° D',
    architect: 'Studio Brera Milano',
    materiality: 'Carrara Gioia Mermeri · Verniksiz Fırçalanmış Pirinç',
    thermalFeature: 'Monolitik Mermer Buhar ve Hamam Odası',
    description:
      'Brera’nın tarihi bir avlusunun en üst katında, zamanla patine alan fırçalanmış pirinç yüzeyler ve Carrara mermerinin geometrik dengesiyle kurgulanan kentsel sığınak.',
    spatialNotes: [
      'Üç katmanlı akustik camlama ile 20 dBA kentsel sessizlik',
      'Özel döküm pirinç şömine ve tavana uzanan kütüphane duvarı',
      'Gizli çatı bahçesi ve monolitik mermer buhar odası',
    ],
    solarOrientation: 'Güney · Tepe ışıklığı ile dikey zenit aydınlatma',
  },
  {
    id: 'canal-hideaway',
    title: 'Kanal Evi Sığınağı',
    location: 'Amsterdam, Hollanda',
    region: 'Kuzey Avrupa',
    rating: '4.94',
    column: 'left',
    image: nordicImg,
    imagePosition: 'right center',
    nightlyRate: 820,
    areaSqm: 160,
    acousticDb: 18,
    elevationM: 2,
    coordinates: '52.3676° K, 4.9041° D',
    architect: 'Van Der Berg Mekânsal Tasarım',
    materiality: 'Tütsülenmiş Bataklık Meşesi · Belçika Mavi Taşı · Ham Keten',
    thermalFeature: 'Kızılötesi Sedir Saunası ve Soğuk Dalış Havuzu',
    description:
      '17. yüzyıldan kalma bir kanal yapısının iç hacmini tamamen boşaltarak yüksek tavanlı, su yansımalarını tavana taşıyan minimalist bir galeri-konuta dönüştüren proje.',
    spatialNotes: [
      'Kanal suyunun ışık yansımalarını içeri taşıyan alt pencere bantları',
      '5.8 metre tavan yüksekliğine sahip ana yaşam boşluğu',
      'Belçika mavi taşından oyulmuş yekpare banyo hacmi',
    ],
    solarOrientation: 'Batı · Su yüzeyinden yansıyan akşamüstü ışığı',
  },

  // ORTA SÜTUN
  {
    id: 'maison-altstadt',
    title: 'Maison Altstadt',
    location: 'Zürih, İsviçre',
    region: 'Alp Avrupa',
    rating: '4.98',
    column: 'center',
    image: swissImg,
    imagePosition: 'center center',
    nightlyRate: 1120,
    areaSqm: 230,
    acousticDb: 16,
    elevationM: 408,
    coordinates: '47.3769° K, 8.5417° D',
    architect: 'Zürih Monolit Kolektifi',
    materiality: 'Alp Gnays Taşı · Ahşap Kalıp Beton · İsviçre Karaçamı',
    thermalFeature: 'Limmat Nehri Manzaralı Çatı Mineral Termal Havuzu',
    description:
      'İsviçre saat işçiliğinin hassasiyetini brütalist taş ve karaçam yüzeylerle birleştiren, akustik olarak dış dünyadan tamamen yalıtılmış mimari başyapıt.',
    spatialNotes: [
      '16 dBA kayıt stüdyosu seviyesinde sessizlik standardı',
      'Yekpare İsviçre gnays taşından oyulmuş şömine ve oturma nişi',
      'Alpler’e bakan özel çatı katı mineral termal havuzu',
    ],
    solarOrientation: 'Güneydoğu · Alp zirvelerinden süzülen sabah ışığı',
  },
  {
    id: 'garden-suite',
    title: 'Botanik Bahçe Süiti',
    location: 'Cotswolds, Birleşik Krallık',
    region: 'Kuzey Avrupa',
    rating: '4.95',
    column: 'center',
    image: kyotoImg,
    imagePosition: 'left bottom',
    nightlyRate: 880,
    areaSqm: 195,
    acousticDb: 18,
    elevationM: 210,
    coordinates: '51.8330° K, 1.8433° B',
    architect: 'Cotswold Taş & Ahşap Atölyesi',
    materiality: 'Bal Rengi Oolitik Kireçtaşı · Geri Kazanılmış İngiliz Meşesi',
    thermalFeature: 'Cam Kış Bahçesinde El Dövmesi Bakır Küvet',
    description:
      'Bal rengi oolitik kireçtaşı duvarların modern çelik ve cam bir kış bahçesiyle buluştuğu, sisli İngiliz çayırlarına açılan pastoral sığınak.',
    spatialNotes: [
      'İç mekânla bütünleşen ısıtmalı botanik cam pavyon',
      'El dövmesi bakır küvet ve açık odun ateşi ocağı',
      'Özel tasarım keten akustik duvar panelleri',
    ],
    solarOrientation: 'Güney · Gün boyu difüze bahçe ışığı',
  },
  {
    id: 'river-house',
    title: 'Nehir Kıyısı Pavyonu',
    location: 'Porto, Portekiz',
    region: 'Akdeniz Havzası',
    rating: '4.90',
    column: 'center',
    image: amalfiImg,
    imagePosition: 'left center',
    nightlyRate: 760,
    areaSqm: 175,
    acousticDb: 19,
    elevationM: 85,
    coordinates: '41.1579° K, 8.6291° B',
    architect: 'Atelier Douro',
    materiality: 'Kireç Badanalı Granit · Pişmiş Toprak Tonoz · Doğal Mantar',
    thermalFeature: 'Douro Nehrine Uzanan Konsol Taş Havuz Terası',
    description:
      'Douro Vadisi’nin granit yamaçlarına tutunan, doğal mantar akustik tavanları ve nehre uzanan konsol terasıyla zamansız bir sığınak.',
    spatialNotes: [
      'Nehir vadisine 6 metre konsol çıkan taş teras',
      'Portekiz graniti ve doğal mantar izolasyonlu yatak süiti',
      'Özel bağ rotası ve ahşap tekne iskelesi erişimi',
    ],
    solarOrientation: 'Batı-Güneybatı · Nehir üzerinde kızıl gün batımı',
  },
  {
    id: 'rooftop-atelier',
    title: 'Çatı Katı Atölyesi',
    location: 'Paris, Fransa',
    region: 'Kuzey Avrupa',
    rating: '4.99',
    column: 'center',
    image: travertineImg,
    imagePosition: 'right bottom',
    nightlyRate: 1290,
    areaSqm: 205,
    acousticDb: 17,
    elevationM: 68,
    coordinates: '48.8566° K, 2.3522° D',
    architect: 'Maison Saint-Germain',
    materiality: 'Lutetian Kireçtaşı · Ham Alçı Sıva · Ağartılmış Meşe',
    thermalFeature: 'Tepe Işıklıklı Kireçtaşı Hamam ve Soğuk Sis Duşu',
    description:
      'Saint-Germain çatı katında, heykeltıraş atölyesi oranlarına sahip 6 metrelik kuzey ışıklıkları ve Paris kireçtaşının dingin dokusuyla biçimlenen rezidans.',
    spatialNotes: [
      'Kuzey cepheli atölye camlarından gölgesiz doğal gün ışığı',
      'Özel kürasyon sanat koleksiyonu ve mimari monografi kütüphanesi',
      'Lutetian kireçtaşından oyulmuş özel hamam süiti',
    ],
    solarOrientation: 'Kuzey & Batı · Homojen atölye ışığı',
  },

  // SAĞ SÜTUN
  {
    id: 'velvet-residence',
    title: 'Kadife & Ceviz Rezidans',
    location: 'Viyana, Avusturya',
    region: 'Alp Avrupa',
    rating: '4.91',
    column: 'right',
    image: travertineImg,
    imagePosition: 'center top',
    nightlyRate: 840,
    areaSqm: 190,
    acousticDb: 17,
    elevationM: 171,
    coordinates: '48.2082° K, 16.3738° D',
    architect: 'Wiener Werkstätte Modern',
    materiality: 'Tütsülenmiş Ceviz · Honlanmış Kireçtaşı · Kaşmir Keçe',
    thermalFeature: 'Özel Biyo-Sauna ve Akustik Plak Dinleme Salonu',
    description:
      'Viyana’nın tarihsel oranlarını modern minimalizmle buluşturan, yüksek sadakatli analog plak dinleme odasına sahip akustik konut.',
    spatialNotes: [
      'Özel tasarım ahşap horn hoparlörlü akustik dinleme salonu',
      '4.4 metre tavan yüksekliği ve tütsülenmiş ceviz lambriler',
      'Biyo-sauna ve sessiz iç dinlenme avlusu',
    ],
    solarOrientation: 'Doğu · Yumuşak avlu sabah ışığı',
  },
  {
    id: 'cloud-nine-hotel',
    title: 'Kaldera Kaya Sığınağı',
    location: 'Santorini, Yunanistan',
    region: 'Akdeniz Havzası',
    rating: '4.97',
    column: 'right',
    image: amalfiImg,
    imagePosition: 'center center',
    nightlyRate: 1180,
    areaSqm: 220,
    acousticDb: 18,
    elevationM: 310,
    coordinates: '36.3932° K, 25.4615° D',
    architect: 'Kiklad Form Stüdyosu',
    materiality: 'Volkanik Pozzolana Sıva · Paros Mermeri · Deniz Aşındırması Ahşap',
    thermalFeature: 'Mağara İçi Isıtmalı Kaldera Sonsuzluk Havuzu',
    description:
      'Kaldera kayalıklarının içine oyulmuş mağara mimarisini saf beyaz pozzolana sıva ve sonsuzluk su yüzeyiyle birleştiren Ege sığınağı.',
    spatialNotes: [
      'Volkanik kayaya oyulmuş 14 metrelik mağara içi ısıtmalı havuz',
      'Kesintisiz Ege ufuk çizgisi ve rüzgar korunaklı avlu',
      'Paros mermerinden yekpare yemek ve dinlenme platformu',
    ],
    solarOrientation: 'Batı · Kaldera üzerinde panoramik gün batımı',
  },
  {
    id: 'the-linen-house',
    title: 'Keten & Köknar Evi',
    location: 'Stockholm, İsveç',
    region: 'Kuzey Avrupa',
    rating: '4.87',
    column: 'right',
    image: nordicImg,
    imagePosition: 'center center',
    nightlyRate: 780,
    areaSqm: 165,
    acousticDb: 16,
    elevationM: 28,
    coordinates: '59.3293° K, 18.0686° D',
    architect: 'Nordic Tactile Lab',
    materiality: 'Douglas Köknarı · Gotland Kireçtaşı · Ağartılmamış Ham Keten',
    thermalFeature: 'Takımada Odun Ateşli Saunası ve Baltık Denizi İskelesi',
    description:
      'Stockholm takımadalarında, tamamı işlenmemiş Douglas köknarı ve ham keten dokularla kurgulanan, Baltık Denizi kıyısında yalın bir kuzey evi.',
    spatialNotes: [
      'Denize sıfır odun ateşli İskandinav saunası ve özel iskele',
      'Gotland kireçtaşı zemin ısıtma sistemi',
      'Kuzey ışığını yumuşatan keten katmanlı cephe perdeleri',
    ],
    solarOrientation: 'Güney · Alçak açılı İskandinav güneşi',
  },
  {
    id: 'arcade-rooms',
    title: 'Kemerli Revak Evi',
    location: 'Barselona, İspanya',
    region: 'Akdeniz Havzası',
    rating: '4.93',
    column: 'right',
    image: amalfiImg,
    imagePosition: 'right bottom',
    nightlyRate: 890,
    areaSqm: 180,
    acousticDb: 19,
    elevationM: 95,
    coordinates: '41.3874° K, 2.1686° D',
    architect: 'Katalan Tonoz Stüdyosu',
    materiality: 'El Kalıbı Terracotta · Montjuïc Kumtaşı · Karartılmış Çelik',
    thermalFeature: 'Çatı Solaryumu ve Gölgeli Kemer Yüzme Kanalı',
    description:
      'Geleneksel Katalan tonozlarını (volta catalana) ritmik kemerler ve gölgeli su revaklarıyla buluşturan Akdeniz mimari sığınağı.',
    spatialNotes: [
      'El yapımı pişmiş toprak tonozlar altında serin yaşam alanları',
      'Kemerli revak boyunca uzanan 18 metrelik yüzme kanalı',
      'Portakal ağaçlarıyla çevrili sessiz iç avlu',
    ],
    solarOrientation: 'Güneydoğu · Kemerlerden süzülen dramatik gölge ritmi',
  },
];

export const SIGNATURE_SUITES: Sanctuary[] = [
  {
    id: 'komorebi-glass-house',
    title: 'Komorebi Cam Pavyonu',
    subtitle: 'Kyoto Pavyonu',
    location: 'Arashiyama, Kyoto',
    region: 'Japonya ve Doğu Asya',
    rating: '4.99',
    isSignature: true,
    image: kyotoImg,
    nightlyRate: 1450,
    areaSqm: 260,
    acousticDb: 15,
    elevationM: 180,
    coordinates: '35.0094° K, 135.6670° D',
    architect: 'Tadao & Kengo Mekân Atölyesi',
    materiality: 'Yakılmış Sugi Sediri · Düşük Demirli Cam · Kurobe Bazaltı',
    thermalFeature: 'Orman Kıyısı Jeotermal Onsen ve Sedir Buhar Odası',
    description:
      'Bambu ormanının derinliklerinde, ağaç yapraklarından süzülen gün ışığını (komorebi) iç mekânın ana malzemesi haline getiren minimal ahşap ve cam pavyon.',
    spatialNotes: [
      '270 derece çerçevesiz ultra-şeffaf cam cephe ve bambu korusu',
      '15 dBA mutlak orman sessizliği ve doğal dere akustiği',
      'Siyah bazalt kayaya oyulmuş 42°C özel jeotermal onsen havuzu',
    ],
    solarOrientation: 'Doğu · Bambu gövdeleri arasından süzülen sabah sisi ve ışık',
  },
  {
    id: 'vals-granite-lodge',
    title: 'Vals Kuvarsit Dağ Evi',
    subtitle: 'Alp Sığınağı',
    location: 'Graubünden, İsviçre',
    region: 'Alp Avrupa',
    rating: '4.98',
    isSignature: true,
    image: swissImg,
    nightlyRate: 1680,
    areaSqm: 310,
    acousticDb: 14,
    elevationM: 1520,
    coordinates: '46.6167° K, 9.1806° D',
    architect: 'Atelier Graubünden',
    materiality: '60.000 Adet Yerel Vals Kuvarsit Plakası · Ham Bronz',
    thermalFeature: 'İç-Dış Mekân Bağlantılı 39°C Alp Kuvarsit Termal Havuzu',
    description:
      'Kuvarsit taşlarıyla katman katman örülmüş, İsviçre zirvelerine panoramik bakan ve dağın kalbindeki termal suyla beslenen monolitik yapı.',
    spatialNotes: [
      'Yerel ocaktan çıkarılmış 60.000 adet hassas kesim kuvarsit plaka',
      'İç mekândan karlı zirvelere yüzerek çıkılan 39°C termal havuz',
      'Akustik taş dehlizler ve şömineli dağ kütüphanesi',
    ],
    solarOrientation: 'Güney · Karlı yamaçlardan yansıyan berrak dağ ışığı',
  },
  {
    id: 'amalfi-sea-pavilion',
    title: 'Amalfi Deniz Pavyonu',
    subtitle: 'Akdeniz Yamacı',
    location: 'Ravello Kıyısı, İtalya',
    region: 'Akdeniz Havzası',
    rating: '4.97',
    isSignature: true,
    image: amalfiImg,
    nightlyRate: 1590,
    areaSqm: 285,
    acousticDb: 18,
    elevationM: 290,
    coordinates: '40.6489° K, 14.6128° D',
    architect: 'Studio Mare & Pietra',
    materiality: 'Oyma Trani Kireçtaşı · El Perdahlama Cocciopesto Sıva',
    thermalFeature: 'Uçurum Kenarı Konsol Tuzlu Su Sonsuzluk Havuzu',
    description:
      'Uçurum kenarında, Akdeniz meltemiyle yıkanan oyma kireçtaşı teraslar, kemerli revaklar ve ufuk çizgisiyle birleşen sonsuzluk havuzu.',
    spatialNotes: [
      'Denizden 290 metre yüksekte, uçuruma konsol çıkan taş teras',
      'Limon bahçeleriyle çevrili açık hava traverten yemek pavyonu',
      'Kayaya oyulmuş özel asansörle gizli denize giriş platformu',
    ],
    solarOrientation: 'Güneybatı · Akdeniz ufuk çizgisinde kesintisiz gün batımı',
  },
  {
    id: 'lofoten-mirror-cabin',
    title: 'Lofoten Ayna Kabini',
    subtitle: 'Kuzey Fiyordu',
    location: 'Lofoten Takımadaları, Norveç',
    region: 'Kuzey Avrupa',
    rating: '4.99',
    isSignature: true,
    image: nordicImg,
    nightlyRate: 1390,
    areaSqm: 215,
    acousticDb: 15,
    elevationM: 64,
    coordinates: '68.2086° K, 13.8825° D',
    architect: 'Snø & Fjord Arkitekter',
    materiality: 'Güneş Yansıtıcı Dikroik Cam · Öz Odun Çam · Kayrak Taşı',
    thermalFeature: 'Panoramik Fiyort Odun Saunası ve Arktik Dalış Havuzu',
    description:
      'Kutup ışıklarını ve fiyort sularını yansıtan ayna cepheler ile İskandinav odun saunası eşliğinde doğanın içinde görünmez olan saf dinginlik.',
    spatialNotes: [
      'Kuşlar için UV görünürlüğe sahip, dışarıdan peyzajla bütünleşen ayna cephe',
      'Kuzey ışıklarını (Aurora Borealis) yataktan izleme imkânı sunan cam tavan',
      'Fiyort kıyısında odun ateşli sauna ve buzlu su dalış havuzu',
    ],
    solarOrientation: 'Kuzey & Batı · Gece yarısı güneşi ve Kuzey Işıkları ekseni',
  },
];

export type AnatomyTabKey =
  | 'Monolitik Yapı'
  | 'Akustik Yalıtım'
  | 'Termal Taş'
  | 'Ham Meşe';

export interface AnatomySpec {
  id: AnatomyTabKey;
  label: string;
  lightCard: {
    index: string;
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
    image: string;
    details: string[];
  };
  darkCard: {
    index: string;
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
    image: string;
    details: string[];
  };
}

export const ANATOMY_SPECS: Record<AnatomyTabKey, AnatomySpec> = {
  'Monolitik Yapı': {
    id: 'Monolitik Yapı',
    label: 'Monolitik Yapı',
    lightCard: {
      index: '01. Materyal Dürüstlüğü',
      title: 'Neyi inşa ediyoruz.',
      description:
        'Ham traverten, fırçalanmış pirinç ve gölge oyunları. Mekânın sakinleştirici doğasını tekil ve dürüst malzemelerle özenle inşa ediyoruz.',
      metricLabel: 'Taş Yoğunluğu ve Termal Kütle',
      metricValue: '2.420 kg/m³ · Roma Traverteni',
      image: travertineImg,
      details: [
        'Kimyasal vernik kullanılmayan, zamanla patine alan doğal taş ve pirinç yüzeyler',
        'Süpürgelik veya derz profili barındırmayan sıfır-toleranslı monolitik birleşimler',
        'Gündüz ısısını depolayıp gece mekâna yayan pasif termal taş kütle',
      ],
    },
    darkCard: {
      index: '02. Atmosfer ve Işık',
      title: 'Işığı nasıl yontuyoruz.',
      description:
        'Günün her saatinde yaşayan monolitik cepheler ve doğal ışık koridorlarıyla zamanı yavaşlatıyoruz.',
      metricLabel: 'Gün Işığı Yarık Açısı',
      metricValue: '14° Güneş Yarığı · 2700K Alacakaranlık',
      image: swissImg,
      details: [
        'Güneşin geliş açısına göre hesaplanmış derin taş pencere nişleri',
        'Doğrudan göz almayan, taş yüzeylerden sekerek yayılan dolaylı zenit ışığı',
        'Gece sirkadiyen ritmi koruyan 2200K–2700K gizli mimari aydınlatma',
      ],
    },
  },
  'Akustik Yalıtım': {
    id: 'Akustik Yalıtım',
    label: 'Akustik Yalıtım',
    lightCard: {
      index: '01. Akustik İzolasyon',
      title: 'Tasarlanmış mutlak sessizlik.',
      description:
        'Dış dünyanın kentsel veya iklimsel uğultusunu tamamen filtreleyen çift kabuklu taş duvarlar ve doğal keten ses yutucu katmanlar.',
      metricLabel: 'Ölçülen İç Mekân Ses Tabanı',
      metricValue: '15.4 dBA · Stüdyo Düzeyi Sessizlik',
      image: kyotoImg,
      details: [
        'Üç katmanlı akustik lamine camlarla 52 dB dış ses sönümleme',
        'Mekanik havalandırma sesi barındırmayan pasif labirent hava kanalları',
        'Ayak sesini emen yüzer ahşap ve kireçtaşı döşeme katmanları',
      ],
    },
    darkCard: {
      index: '02. Mekânsal Rezonans',
      title: 'Su ve taşın doğal tınısı.',
      description:
        'Yapay gürültüyü sildiğimizde geriye yalnızca rüzgarın çam iğnelerindeki hışırtısı ve termal suyun taş havuzdaki yankısı kalır.',
      metricLabel: 'Yankılanma Süresi (RT60)',
      metricValue: '0.42 Saniye · Doğal Sönümlenme',
      image: nordicImg,
      details: [
        'Konuşma frekanslarında yankıyı önleyen mikro-perfore sedir tavanlar',
        'İç avlularda su damlası frekansına göre akort edilmiş bazalt çanaklar',
        'Seçili rezidanslarda analog plak ve horn hoparlör dinleme odaları',
      ],
    },
  },
  'Termal Taş': {
    id: 'Termal Taş',
    label: 'Termal Taş',
    lightCard: {
      index: '01. Mineral Litolojisi',
      title: 'Toprağın hafızasından oyuldu.',
      description:
        'Vals kuvarsiti, Kurobe bazaltı ve Siena traverteni. Her sığınak, üzerinde yükseldiği coğrafyanın jeolojik katmanlarından oyulur.',
      metricLabel: 'Jeotermal Kaynak Sıcaklığı',
      metricValue: '41.2°C · Doğal Mineral Kaynağı',
      image: swissImg,
      details: [
        'Suyu ipeksi bir dokuya kavuşturan yüksek silika ve magnezyum mineral dengesi',
        'Islak hacimlerde kaymaz çekiçlenmiş (bush-hammered) doğal taş dokusu',
        'Kimyasal klor yerine UV ve doğal mineral filtrasyonlu termal havuzlar',
      ],
    },
    darkCard: {
      index: '02. Buhar ve Ufuk Çizgisi',
      title: 'Dört mevsim termal dinginlik.',
      description:
        'Kar altındaki Alp zirvelerinden sisli Kyoto bambu korularına uzanan, iç mekândan açık havaya kesintisiz geçen sıcak su deneyimi.',
      metricLabel: 'Isı Koruma Verimliliği',
      metricValue: '%94.8 · Yeraltı Isı Eşanjörü',
      image: amalfiImg,
      details: [
        'İçeriden dışarıya cam bölmeyle kesintisiz yüzme imkânı sunan termal kanallar',
        'Soğuk dalış (8°C) ve kızılötesi sedir saunasıyla tam hidroterapi döngüsü',
        'Gece yıldız gözlemi için sıfır ışık kirliliği sağlayan su altı aydınlatması',
      ],
    },
  },
  'Ham Meşe': {
    id: 'Ham Meşe',
    label: 'Ham Meşe',
    lightCard: {
      index: '01. Organik Geçme İşçiliği',
      title: 'Dokunsal ahşap zanaatı.',
      description:
        'Metal çivi kullanılmadan birleştirilen Japon hinoki sediri ve 200 yıllık geri kazanılmış Avrupa meşesiyle dokunsal sıcaklık.',
      metricLabel: 'Ahşap Dinlendirme ve Geçme',
      metricValue: '12 Yıl Doğal Kurutma · Kigumi',
      image: kyotoImg,
      details: [
        'Yalınayak basıldığında sıcaklığı hissedilen ham balmumu cilalı meşe döşemeler',
        'Mekâna doğal fitonsit ve sedir aroması yayan işlenmemiş ahşap tavanlar',
        'Yerel zanaatkârlar tarafından her pavyon için özel üretilen yekpare masalar',
      ],
    },
    darkCard: {
      index: '02. Zamanın Patinası',
      title: 'Zarifçe yaşlanan yüzeyler.',
      description:
        'Yakılmış sedir (Shou Sugi Ban) cepheler ve tütsülenmiş bataklık meşesi, mevsimler geçtikçe karakter kazanan yaşayan yüzeyler sunar.',
      metricLabel: 'Yapısal Ömür ve Karbon Profili',
      metricValue: '100+ Yıl Yapısal Dayanım',
      image: travertineImg,
      details: [
        'Geleneksel yakma tekniğiyle çürümeye ve iklime dayanıklı Shou Sugi Ban cepheler',
        'El dokuması keten ve kaşmir tekstillerle dengelenen ahşap akustiği',
        'Sürdürülebilir ormanlardan sertifikalı, karbon negatif yapısal ahşap kullanımı',
      ],
    },
  },
};

export interface CuratedExperience {
  id: string;
  name: string;
  location: string;
  duration: string;
  timeOfDay: string;
  pricePerGuest: number;
  maxGuests: number;
  curator: string;
  image: string;
  summary: string;
  itinerary: string[];
}

export const CURATED_EXPERIENCES: CuratedExperience[] = [
  {
    id: 'zen-tea-ritual',
    name: 'Özel Zen Çay Ritüeli',
    location: 'Kyoto',
    duration: '4 Saat',
    timeOfDay: 'Şafak Vakti veya Alacakaranlık',
    pricePerGuest: 340,
    maxGuests: 4,
    curator: 'Usta Sōkū Takahashi (15. Kuşak Çay Ustası)',
    image: kyotoImg,
    summary:
      'Arashiyama bambu korusunun kıyısındaki gizli Roji bahçesinde, 400 yıllık Raku seramikleriyle gerçekleştirilen sessiz çay seremonisi ve kaiseki tadımı.',
    itinerary: [
      '01. Roji yosun bahçesinde sessiz yürüyüş ve tsukubai taş çanağında arınma',
      '02. Kömür ateşinde kaynayan demir kama kazanının akustik dinletisi',
      '03. Uji bölgesinin tek bahçe hasadı Koicha (yoğun matcha) ve mevsimsel wagashi ikramı',
      '04. Çay ustasıyla mimari boşluk (Ma) ve wabi-sabi felsefesi üzerine özel sohbet',
    ],
  },
  {
    id: 'sunset-yacht-charter',
    name: 'Gün Batımı Yat Seyri & Gizli Koylar',
    location: 'Capri & Amalfi',
    duration: 'Tam Gün (8 Saat)',
    timeOfDay: '11:00 – 19:30',
    pricePerGuest: 680,
    maxGuests: 6,
    curator: 'Kaptan Lorenzo Ferraro · Klasik Riva Filosu',
    image: amalfiImg,
    summary:
      'Restore edilmiş maun gövdeli klasik İtalyan yatıyla yalnızca denizden ulaşılabilen kireçtaşı mağaralarına ve gizli koylara özel seyir.',
    itinerary: [
      '01. Amalfi Deniz Pavyonu özel iskelesinden klasik maun yat ile hareket',
      '02. Li Galli adaları ve sadece tekneyle girilebilen turkuaz kaya koylarında yüzme molası',
      '03. Deniz kıyısındaki aile işletmesi taş terasta taze deniz ürünleri ve yerel şarap öğle yemeği',
      '04. Positano ve Capri kayalıkları önünde gün batımı aperitifi ile dönüş seyri',
    ],
  },
  {
    id: 'ancient-cellar-wine',
    name: 'Kadim Mahzen Şarap Rezidansı',
    location: 'Toskana',
    duration: 'Akşam (5 Saat)',
    timeOfDay: '17:30 – 22:30',
    pricePerGuest: 490,
    maxGuests: 8,
    curator: 'Baş Sommelier Beatrice Conti & Bağ Ustası',
    image: travertineImg,
    summary:
      '14. yüzyıldan kalma yeraltı tüf taşı mahzende, mum ışığında dikey Brunello di Montalcino rekolteleri ve özel şefin ateş üstü Toskana menüsü.',
    itinerary: [
      '01. Bağbozumu parsellerinde gün batımı yürüyüşü ve toprak/terroir incelemesi',
      '02. 12 metre yeraltındaki akustik tüf mahzene iniş ve meşe fıçıdan doğrudan tadım',
      '03. 1997, 2004, 2010 ve 2016 rekoltelerinden oluşan özel dikey koleksiyon açılışı',
      '04. Zeytin odunu ateşinde pişirilen 5 aşamalı özel Toskana akşam yemeği',
    ],
  },
  {
    id: 'alpine-stargazing-bath',
    name: 'Alp Yıldız Gözlemi & Termal Banyo',
    location: 'Zermatt & Vals',
    duration: 'Gece (3.5 Saat)',
    timeOfDay: '21:00 – 00:30',
    pricePerGuest: 420,
    maxGuests: 4,
    curator: 'Dr. Lukas Weber (Astrofizikçi & Termal Küratör)',
    image: swissImg,
    summary:
      '1.520 metre rakımda tüm dış ışıkların kapatıldığı 39°C açık hava kuvarsit termal havuzunda, profesyonel teleskop eşliğinde derin uzay gözlemi.',
    itinerary: [
      '01. Açık hava kuvarsit termal havuzunun yalnızca sizin için kapatılması ve sıfır ışık modu',
      '02. Sedir saunası ve dağ bitkileriyle hazırlanan sıcak bitki infüzyonu',
      '03. Astrofizikçi rehberliğinde yüksek açıklıklı teleskopla Samanyolu ve bulutsu gözlemi',
      '04. Açık taş şömine başında İsviçre Alp peynirleri ve yıllanmış konyak ikramı',
    ],
  },
];

export interface MonographReview {
  id: string;
  tag: string;
  themeClass:
    | 'bento-card-sage'
    | 'bento-card-dark'
    | 'bento-card-sand'
    | 'bento-card-mint';
  quote: string;
  author: string;
  role: string;
  sanctuaryVisited: string;
  residencyDate: string;
  metricHighlight: string;
  fullEssay: string[];
  avatarGradient: string;
  initials: string;
}

export const MONOGRAPH_REVIEWS: MonographReview[] = [
  {
    id: 'elena-rostova',
    tag: 'Mekânsal Rezidans · Sayı 14',
    themeClass: 'bento-card-sage',
    quote:
      '“Komorebi evinde geçirdiğimiz üç gün, mimarinin zihni nasıl dinginleştirebileceğinin yaşayan bir kanıtıydı.”',
    author: 'Elena Rostova',
    role: 'Kıdemli Mimari Editör, Architectural Digest',
    sanctuaryVisited: 'Komorebi Cam Pavyonu, Kyoto',
    residencyDate: 'Sonbahar Rezidansı · 4 Gece',
    metricHighlight: '15 dBA Ölçülen İç Mekân Sessizliği',
    avatarGradient: 'linear-gradient(135deg, #526354 0%, #2b382d 100%)',
    initials: 'ER',
    fullEssay: [
      'Günümüz lüks konaklama dünyası çoğu zaman fazlalıklarla tanımlanır; oysa Kyoto’daki Komorebi Cam Pavyonu, lüksü çıkarma sanatı olarak yeniden tanımlıyor.',
      'Sabah saat 06:15’te bambu gövdelerinin arasından süzülen ilk ışık huzmesi, yakılmış sedir duvarların üzerinde yavaşça ilerleyen bir güneş saati gibi çalışıyor. İç mekânda tek bir dekoratif fazlalık bile yok.',
      'Bazalt onsen küvetinin su sesi dışında ölçtüğümüz 15 dBA’lık sessizlik, şehir hayatının zihinsel yorgunluğunu ilk saatin sonunda tamamen siliyor.',
    ],
  },
  {
    id: 'matteo-bellini',
    tag: 'Akustik Monografi · Sayı 11',
    themeClass: 'bento-card-dark',
    quote:
      '“Vals Kuvarsit Dağ Evi’nde rüzgarın taş yüzeylerdeki tınısı dışında hiçbir yapay gürültü yoktu. Kusursuz bir izolasyon.”',
    author: 'Matteo Bellini',
    role: 'Baş Akustik Tasarımcı, Milano',
    sanctuaryVisited: 'Vals Kuvarsit Dağ Evi, İsviçre',
    residencyDate: 'Kış Gündönümü · 5 Gece',
    metricHighlight: '0.42sn Yankı Sönümlenme Süresi (RT60)',
    avatarGradient: 'linear-gradient(135deg, #bda177 0%, #6e5836 100%)',
    initials: 'MB',
    fullEssay: [
      'Bir akustik mühendisi olarak sert taş yüzeylerin genellikle soğuk ve yankılı olmasını beklersiniz. Ancak Vals Kuvarsit Dağ Evi’nde 60.000 kuvarsit plakanın mikro-gözenekli dizilimi ve gizli keten akustik cepler olağanüstü bir sonuç yaratmış.',
      'İçeride konuştuğunuzda sesiniz ne boğuluyor ne de yankılanıyor; 0.42 saniyelik doğal sönümlenme süresi insana kadim bir manastırda olduğu hissini veriyor.',
      'Gece kar yağarken 39 derecelik termal sudan dışarıya yüzmek, işitsel ve duyusal olarak unutulmaz bir deneyimdi.',
    ],
  },
  {
    id: 'sarah-jenkins',
    tag: 'Dokunsal Kürasyon · Sayı 16',
    themeClass: 'bento-card-sand',
    quote:
      '“Doğal dokuma ketenler, ham ahşap koku profili ve akşam ışığı. Her detay lüksü bağırmadan fısıldıyor.”',
    author: 'Sarah Jenkins',
    role: 'Kreatif Direktör, Cereal Magazine',
    sanctuaryVisited: 'Terra Taş Konak & Amalfi Pavyonu',
    residencyDate: 'İlkbahar Kürasyonu · 6 Gece',
    metricHighlight: '%100 Verniksiz Doğal Yüzey Dokusu',
    avatarGradient: 'linear-gradient(135deg, #8c7a64 0%, #4f4335 100%)',
    initials: 'SJ',
    fullEssay: [
      'Bir mekânı fotoğraflarken en çok dikkat ettiğim şey, ışığın yüzeyle kurduğu temastır. Parlak vernikli yüzeyler ışığı sertçe geri yansıtırken, Seçkin Sığınaklar koleksiyonundaki ham kireçtaşı ve keten yüzeyler ışığı adeta içlerine çekiyor.',
      'Yalınayak yürüdüğünüzde taş zeminin dokusunu, kapı koluna dokunduğunuzda fırçalanmış pirincin ağırlığını hissediyorsunuz.',
      'Bu sığınaklar sadece bakılmak için değil, tüm duyularla yaşanmak için tasarlanmış.',
    ],
  },
  {
    id: 'hiroshi-tanaka',
    tag: 'Zamansız Yaşam · Sayı 18',
    themeClass: 'bento-card-mint',
    quote:
      '“Sıradan bir otel odasından çok öte; doğayla kurulan meditatif bir diyalog ve mimari bir başyapıt.”',
    author: 'Hiroshi Tanaka',
    role: 'Mekân Küratörü, Tokyo',
    sanctuaryVisited: 'Lofoten Ayna Kabini, Norveç',
    residencyDate: 'Kuzey Işıkları Mevsimi · 4 Gece',
    metricHighlight: '270° Kesintisiz Fiyort Ufuk Açısı',
    avatarGradient: 'linear-gradient(135deg, #4b6b58 0%, #23382b 100%)',
    initials: 'HT',
    fullEssay: [
      'Norveç fiyortlarının vahşi doğasında bir yapı inşa etmek büyük bir tevazu gerektirir. Lofoten Ayna Kabini, dış cephesindeki ayna camlarla peyzajın içinde neredeyse görünmez oluyor.',
      'İçeride ise karaçam kerestenin sıcaklığı ve odun ateşinin çıtırtısı sizi sarıyor. Gece yarısı yataktan kalkmadan gökyüzündeki yeşil Kuzey Işıklarını izlemek zaman kavramını tamamen unutturuyor.',
    ],
  },
];
