"use client";

import PageHero from "@layout/PageHero";
import { PageListHeader } from "@layout";
import CTA from './CTA';
import { Sheet } from '@ui/Sheet';
import {
  MediaCard,
  MediaCardArrow,
  MediaCardBadge,
  MediaCardBody,
  MediaCardEyebrow,
  MediaCardFooter,
  MediaCardImage,
  MediaCardTitle,
} from "@ui/MediaCard";
import { useI18n } from "@/i18n/useI18n";
import type { LocalizedPortfolioItem } from "@/lib/localizePortfolio";
import { categoryOptions, typeOptions } from "@/lib/projects";
import { geoCentroid } from "d3-geo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

// ── Map constants ─────────────────────────────────────────────────────────────

const WORLD_GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json";
const THAI_GEO_URL = "/thailand-provinces.json";

const DEFAULT_CENTER: [number, number] = [101.2, 13.2];
const DEFAULT_ZOOM = 2.6; // Thailand-focused default — surrounding countries visible
const PROVINCE_ZOOM = 7;
const MIN_ZOOM = 1.8;
const MAX_ZOOM = 14;
const ZOOM_STEP = 1.5;

const PIN_KEYS = [
  "bangkok",
  "chonburi_pattaya",
  "chiang_mai",
  "hua_hin",
  "phuket",
  "khon_kaen",
  "chiang_rai",
] as const;

const THAI_PROVINCE_NAMES: Record<string, string> = {
  "Amnat Charoen": "อำนาจเจริญ",
  "Ang Thong": "อ่างทอง",
  "Bangkok": "กรุงเทพมหานคร",
  "Bangkok Metropolis": "กรุงเทพมหานคร",
  "Bueng Kan": "บึงกาฬ",
  "Buri Ram": "บุรีรัมย์",
  "Chachoengsao": "ฉะเชิงเทรา",
  "Chai Nat": "ชัยนาท",
  "Chaiyaphum": "ชัยภูมิ",
  "Chanthaburi": "จันทบุรี",
  "Chiang Mai": "เชียงใหม่",
  "Chiang Rai": "เชียงราย",
  "Chon Buri": "ชลบุรี",
  "Chumphon": "ชุมพร",
  "Kalasin": "กาฬสินธุ์",
  "Kamphaeng Phet": "กำแพงเพชร",
  "Kanchanaburi": "กาญจนบุรี",
  "Khon Kaen": "ขอนแก่น",
  "Krabi": "กระบี่",
  "Lampang": "ลำปาง",
  "Lamphun": "ลำพูน",
  "Loei": "เลย",
  "Lop Buri": "ลพบุรี",
  "Mae Hong Son": "แม่ฮ่องสอน",
  "Maha Sarakham": "มหาสารคาม",
  "Mukdahan": "มุกดาหาร",
  "Nakhon Nayok": "นครนายก",
  "Nakhon Pathom": "นครปฐม",
  "Nakhon Phanom": "นครพนม",
  "Nakhon Ratchasima": "นครราชสีมา",
  "Nakhon Sawan": "นครสวรรค์",
  "Nakhon Si Thammarat": "นครศรีธรรมราช",
  "Nan": "น่าน",
  "Narathiwat": "นราธิวาส",
  "Nong Bua Lam Phu": "หนองบัวลำภู",
  "Nong Khai": "หนองคาย",
  "Nonthaburi": "นนทบุรี",
  "Pathum Thani": "ปทุมธานี",
  "Pattani": "ปัตตานี",
  "Phangnga": "พังงา",
  "Phatthalung": "พัทลุง",
  "Phayao": "พะเยา",
  "Phetchabun": "เพชรบูรณ์",
  "Phetchaburi": "เพชรบุรี",
  "Phichit": "พิจิตร",
  "Phitsanulok": "พิษณุโลก",
  "Phra Nakhon Si Ayutthaya": "พระนครศรีอยุธยา",
  "Phrae": "แพร่",
  "Phuket": "ภูเก็ต",
  "Prachin Buri": "ปราจีนบุรี",
  "Prachuap Khiri Khan": "ประจวบคีรีขันธ์",
  "Ranong": "ระนอง",
  "Ratchaburi": "ราชบุรี",
  "Rayong": "ระยอง",
  "Roi Et": "ร้อยเอ็ด",
  "Sa Kaeo": "สระแก้ว",
  "Sakon Nakhon": "สกลนคร",
  "Samut Prakan": "สมุทรปราการ",
  "Samut Sakhon": "สมุทรสาคร",
  "Samut Songkhram": "สมุทรสงคราม",
  "Saraburi": "สระบุรี",
  "Satun": "สตูล",
  "Si Sa Ket": "ศรีสะเกษ",
  "Sing Buri": "สิงห์บุรี",
  "Songkhla": "สงขลา",
  "Sukhothai": "สุโขทัย",
  "Suphan Buri": "สุพรรณบุรี",
  "Surat Thani": "สุราษฎร์ธานี",
  "Surin": "สุรินทร์",
  "Tak": "ตาก",
  "Trang": "ตรัง",
  "Trat": "ตราด",
  "Ubon Ratchathani": "อุบลราชธานี",
  "Udon Thani": "อุดรธานี",
  "Uthai Thani": "อุทัยธานี",
  "Uttaradit": "อุตรดิตถ์",
  "Yala": "ยะลา",
  "Yasothon": "ยโสธร",
};

type PortfolioT = (key: string, opts?: Record<string, unknown>) => string;

function provinceName(name: string, lang: "th" | "en") {
  return lang === "th" ? THAI_PROVINCE_NAMES[name] ?? name : name;
}

const MAP_PINS = [
  {
    name: "กรุงเทพฯ",
    coords: [100.5018, 13.7563] as [number, number],
    count: 68,
  },
  {
    name: "ชลบุรี / พัทยา",
    coords: [100.9925, 13.0478] as [number, number],
    count: 12,
  },
  {
    name: "เชียงใหม่",
    coords: [98.9853, 18.7883] as [number, number],
    count: 8,
  },
  { name: "หัวหิน", coords: [99.9578, 12.5657] as [number, number], count: 15 },
  { name: "ภูเก็ต", coords: [98.3923, 7.8804] as [number, number], count: 10 },
  {
    name: "ขอนแก่น",
    coords: [102.8359, 16.4322] as [number, number],
    count: 5,
  },
  {
    name: "เชียงราย",
    coords: [99.8316, 19.9105] as [number, number],
    count: 3,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function PulseMarker({
  active,
  zoom,
  onClick,
}: {
  active: boolean;
  zoom: number;
  onClick: () => void;
}) {
  const s = 1 / zoom; // scale inversely with zoom so pin stays same visual size
  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
      transform={`scale(${s})`}
    >
      <motion.circle
        r={10}
        fill="rgba(255,138,0,0.12)"
        stroke="rgba(255,138,0,0.35)"
        strokeWidth={0.6}
        animate={{ r: [8, 16, 8], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        r={active ? 6 : 4}
        fill="#DB5828"
        stroke="white"
        strokeWidth={0.8}
        animate={{ r: active ? 6 : 4 }}
        transition={{ duration: 0.2 }}
      />
    </g>
  );
}

function ThailandMap({
  activePin,
  setActivePin,
  t,
  lang,
}: {
  activePin: string | null;
  setActivePin: (n: string | null) => void;
  t: PortfolioT;
  lang: "th" | "en";
}) {
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });

  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [activeProvince, setActiveProvince] = useState<string | null>(null);

  const handleProvinceClick = useCallback((geo: any) => {
    const centroid = geoCentroid(geo) as [number, number];
    setActiveProvince(geo.properties.name);
    setPosition({ coordinates: centroid, zoom: PROVINCE_ZOOM });
  }, []);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
    setActiveProvince(null);
  }, []);

  const zoomIn = useCallback(
    () =>
      setPosition((p) => ({
        ...p,
        zoom: Math.min(MAX_ZOOM, p.zoom * ZOOM_STEP),
      })),
    [],
  );
  const zoomOut = useCallback(
    () =>
      setPosition((p) => ({
        ...p,
        zoom: Math.max(MIN_ZOOM, p.zoom / ZOOM_STEP),
      })),
    [],
  );

  const isZoomed = position.zoom > DEFAULT_ZOOM + 0.1;

  return (
    <div className="relative h-full w-full select-none">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_65%_50%,rgba(255,138,0,0.13),transparent_60%)]" />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [100, 14], scale: 900 }}
        className="absolute inset-0 h-full w-full"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={({ zoom, coordinates }) =>
            setPosition({ zoom, coordinates: coordinates as [number, number] })
          }
          filterZoomEvent={(evt: any) => {
            // block scroll-wheel zoom; allow drag pan only
            if (evt.type === 'wheel') return false;
            return true;
          }}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
        >
          {/* ── Background world layer ── */}
          <Geographies geography={WORLD_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isThai = geo.properties.name === "Thailand";
                if (isThai) return null;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(255,255,255,0.025)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        fill: "rgba(255,255,255,0.05)",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* ── Thailand province layer ── */}
          <Geographies geography={THAI_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name as string;
                const isActive = activeProvince === name;
                const isHovered = hoveredProvince === name;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleProvinceClick(geo)}
                    onMouseEnter={() => setHoveredProvince(name)}
                    onMouseLeave={() => setHoveredProvince(null)}
                    fill={
                      isActive
                        ? 'rgba(255,138,0,0.40)'
                        : isHovered
                          ? 'rgba(255,138,0,0.22)'
                          : 'rgba(255,138,0,0.10)'
                    }
                    stroke={
                      isActive ? 'rgba(255,138,0,0.85)' : 'rgba(255,138,0,0.40)'
                    }
                    strokeWidth={isActive ? 0.8 : 0.3}
                    style={{
                      default: { outline: 'none', cursor: 'pointer' },
                      hover: { outline: 'none', cursor: 'pointer' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* ── Project pins ── */}
          {MAP_PINS.map((loc, index) => {
            const pinKey = PIN_KEYS[index];
            const label = t(`map.pins.${pinKey}`);
            return (
              <Marker key={pinKey} coordinates={loc.coords}>
                <PulseMarker
                  active={activePin === pinKey}
                  zoom={position.zoom}
                  onClick={() =>
                    setActivePin(activePin === pinKey ? null : pinKey)
                  }
                />
                <text
                  textAnchor="middle"
                  y={-14 / position.zoom}
                  fill="rgba(255,255,255,0.7)"
                  fontSize={7.5 / position.zoom}
                  fontWeight={300}
                  fontFamily="var(--font-anuphan), sans-serif"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {label}
                </text>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* ── Province hover label ── */}
      <AnimatePresence>
        {hoveredProvince && (
          <motion.div
            key="province-label"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 border border-accent-500/25 bg-[#120800]/90 px-4 py-2 text-xs font-light text-foreground-300 backdrop-blur-sm"
          >
            {provinceName(hoveredProvince, lang)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Zoom controls — right side ── */}
      <div className="absolute top-1/2 right-5 flex -translate-y-1/2 flex-col gap-1.5">
        {/* Zoom in */}
        <button
          onClick={zoomIn}
          disabled={position.zoom >= MAX_ZOOM}
          className="flex h-9 w-9 items-center justify-center bg-background-100/60 text-foreground-300 backdrop-blur-sm transition-colors hover:border-foreground-100/35 hover:text-foreground-100 disabled:opacity-20"
          aria-label={t('map.zoom_in')}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Zoom level indicator */}
        <div className="flex h-6 items-center justify-center text-xs font-light tracking-widest text-foreground-400">
          {Math.round(position.zoom * 10) / 10}x
        </div>

        {/* Zoom out */}
        <button
          onClick={zoomOut}
          disabled={position.zoom <= MIN_ZOOM}
          className="flex h-9 w-9 items-center justify-center bg-background-100/60 text-foreground-300 backdrop-blur-sm transition-colors hover:border-foreground-100/35 hover:text-foreground-100 disabled:opacity-20"
          aria-label={t('map.zoom_out')}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        {/* Reset */}
        <AnimatePresence>
          {isZoomed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={handleReset}
              className="mt-1 flex h-9 w-9 items-center justify-center border border-accent-500/30 bg-black/60 text-accent-600 backdrop-blur-sm transition-colors hover:border-accent-500/70 hover:text-accent-500"
              aria-label={t('map.reset')}
              title={t('map.reset')}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Pin info card — right side (above zoom controls) ── */}
      <AnimatePresence>
        {activePin &&
          (() => {
            const pinIndex = PIN_KEYS.findIndex((key) => key === activePin);
            const loc = MAP_PINS[pinIndex];
            const label = t(`map.pins.${activePin}`);
            if (!loc) return null;
            return (
              <motion.div
                key={activePin}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="absolute top-6 right-16 w-48 border border-accent-500/30 bg-gradient-to-br from-[#7a3500] to-[#2a1000] p-5 shadow-2xl"
              >
                <p className="mb-1 text-[10px] font-light tracking-widest text-accent-500 uppercase">
                  {t('map.location')}
                </p>
                <h3 className="text-lg leading-tight font-bold text-foreground-100">
                  {label}
                </h3>
                <p className="mt-3 text-3xl font-bold text-accent-500">
                  {loc.count}+
                </p>
                <p className="text-xs font-light text-foreground-300">
                  {t('map.projects_completed')}
                </p>
                <button
                  onClick={() => setActivePin(null)}
                  className="mt-4 text-[10px] font-light tracking-widest text-foreground-400 uppercase hover:text-foreground-100"
                >
                  {t('map.close')} x
                </button>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* ── Hint ── */}
      {!isZoomed && (
        <p className="pointer-events-none absolute right-14 bottom-6 text-xs font-light tracking-widest text-foreground-400 uppercase">
          {t('map.hint')}
        </p>
      )}
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────

export default function PortfolioClient({
  items,
  itemsEn,
}: {
  items: LocalizedPortfolioItem[];
  itemsEn?: LocalizedPortfolioItem[];
}) {
  const { t, lang } = useI18n("portfolio");
  const [activePin, setActivePin] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeType, setActiveType] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(9);
  const [filterValues, setFilterValues] = useState<{ types: string[]; categories: string[]; locations: string[] }>({
    types: [],
    categories: [],
    locations: [],
  });
  const currentItems = lang === "en" ? itemsEn ?? items : items;

  const selectedTypes = (filterValues.types as string[]) ?? [];
  const selectedCategories = (filterValues.categories as string[]) ?? [];
  const selectedLocations = (filterValues.locations as string[]) ?? [];

  const locationOptions = useMemo(
    () =>
      currentItems
        .map((p) => p.location)
        .filter((v, i, a) => a.indexOf(v) === i),
    [currentItems]
  );

  const filterGroups = useMemo(
    () => [
      {
        key: 'types',
        label: t('filters.project_type'),
        type: 'multi' as const,
        options: typeOptions.map((o) => ({
          value: o.value,
          label: t(`filters.type_options.${o.value}`),
        })),
      },
      {
        key: 'categories',
        label: t('filters.scope'),
        type: 'multi' as const,
        options: categoryOptions.map((o) => ({
          value: o.value,
          label: t(`filters.category_options.${o.value}`),
        })),
      },
      {
        key: 'locations',
        label: t('filters.location'),
        type: 'multi' as const,
        options: locationOptions.map((loc) => ({ value: loc, label: loc })),
      },
    ],
    [t, locationOptions]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = currentItems.filter((p) => {
      if (activeType !== "ALL" && p.type !== activeType) return false;
      if (selectedTypes.length && !selectedTypes.includes(p.type)) return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedLocations.length && !selectedLocations.includes(p.location)) return false;
      if (q) {
        const matchSearch =
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.scope.toLowerCase().includes(q) ||
          p.year.toLowerCase().includes(q);
        if (!matchSearch) return false;
      }
      return true;
    });
    list.sort((a, b) => sort === "oldest" ? a.year - b.year : b.year - a.year);
    return list;
  }, [currentItems, activeType, selectedTypes, selectedCategories, selectedLocations, sort, search]);

  const handleFilterChange = (key: string, value: string[] | boolean) =>
    setFilterValues((prev) => ({ ...prev, [key]: value }));

  const clearAll = () => {
    setFilterValues({ types: [], categories: [], locations: [] });
    setActiveType("ALL");
    setSearch("");
    setDisplayCount(9);
  };

  useEffect(() => {
    clearAll();
    setActivePin(null);
  }, [lang]);

  const filterActive =
    filterValues.types.length > 0 ||
    filterValues.categories.length > 0 ||
    filterValues.locations.length > 0 ||
    activeType !== "ALL" ||
    Boolean(search);

  return (
    <>
      {/* ── HERO MAP ── */}
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title_line1')}
            <br />
            {t('hero.title_line2')}
          </>
        }
        subtitle={t('hero.subtitle')}
        align="left"
        minHeight="85vh"
        glow={false}
        backgroundSlot={
          <>
            <div className="absolute inset-0 bg-[#080808]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 70% at 65% 55%, rgba(80,30,0,0.5) 0%, transparent 65%)',
              }}
            />

            <div className="absolute inset-0">
              <ThailandMap
                activePin={activePin}
                setActivePin={setActivePin}
                t={t}
                lang={lang}
              />
            </div>
          </>
        }
      >
        <div className="[&>div]:mt-0 [&>h1]:hidden [&>p]:hidden">
          <p className="eyebrow mb-4">{t('hero.eyebrow')}</p>
          <h1 className="max-w-xs text-5xl leading-tight font-bold tracking-tight sm:text-6xl">
            {t('hero.title_line1')}
            <br />
            {t('hero.title_line2')}
          </h1>
          <p className="mt-5 max-w-[220px] text-sm leading-7 font-light text-foreground-400">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-2">
            {(
              [
                ['120+', t('hero.stats_projects')],
                ['7', t('hero.stats_provinces')],
                ['10+', t('hero.stats_years')],
              ] as const
            ).map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold text-accent-500">{n}</p>
                <p className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      {/* ── FILTER + GRID ── */}
      <div className="section-py px-(--homepage-padding-inset)">
        <PageListHeader
          title={lang === "th" ? "ผลงาน" : "Portfolio"}
          tabs={typeOptions.map((o) => ({ value: o.value, label: t(`filters.type_options.${o.value}`) }))}
          activeTab={activeType}
          onTabChange={setActiveType}
          allLabel={lang === "th" ? "ทั้งหมด" : "All"}
          search={search}
          onSearch={(v) => { setSearch(v); setDisplayCount(9); }}
          searchPlaceholder={lang === "th" ? "ค้นหาโปรเจกต์..." : "Search projects..."}
          onFilterOpen={() => setFilterOpen(true)}
          filterActive={filterActive}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortOptions={[{ value: "newest", label: lang === "th" ? "ล่าสุด" : "Newest" }, { value: "oldest", label: lang === "th" ? "เก่าสุด" : "Oldest" }]}
          sort={sort}
          onSortChange={(v) => { setSort(v); setDisplayCount(9); }}
          className="mb-10"
        />
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex h-60 flex-col items-center justify-center text-center">
              <p className="text-sm font-light text-foreground-400">{t('filters.no_results')}</p>
              <button onClick={clearAll} className="mt-4 text-xs font-light text-accent-500 underline underline-offset-4">
                {t('filters.clear_filters')}
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <>
            <AnimatePresence mode="popLayout">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, displayCount).map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MediaCard href={`/portfolio/${p.slug}`} animate={false}>
                      <MediaCardImage src={p.cover_image} alt={p.title} aspect="wide">
                        <MediaCardBadge position="top-right">{p.year}</MediaCardBadge>
                      </MediaCardImage>
                      <MediaCardBody>
                        <MediaCardEyebrow>{p.location}</MediaCardEyebrow>
                        <MediaCardTitle>{p.title}</MediaCardTitle>
                        <p className="text-[10px] font-light tracking-widest text-foreground-400 uppercase">{p.scope}</p>
                        <MediaCardFooter className="mt-3 border-0 pt-0" right={<MediaCardArrow label={t('card.view_details')} />} />
                      </MediaCardBody>
                    </MediaCard>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
            {displayCount < filtered.length && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={() => setDisplayCount((c) => c + 9)}
                  className="group flex items-center gap-3 border border-white/10 px-8 py-3 text-xs font-light tracking-widest text-foreground-300 uppercase transition-colors hover:border-white/25 hover:text-foreground-100"
                >
                  {lang === "th" ? "โหลดเพิ่มเติม" : "Load more"}
                  <span className="text-foreground-400 transition-colors group-hover:text-foreground-200">({filtered.length - displayCount})</span>
                </button>
              </div>
            )}
            </>
          ) : (
            /* ── LIST VIEW ── */
            <>
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {filtered.slice(0, displayCount).map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.slug}`}
                  className="group flex items-center gap-4 py-3 transition-colors hover:bg-white/[0.02] sm:gap-5"
                >
                  <div className="relative aspect-square w-14 shrink-0 overflow-hidden sm:w-16">
                    <Image src={p.cover_image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[10px] font-light tracking-widest text-foreground-400 uppercase">{p.location}</p>
                    <p className="truncate text-sm font-light text-foreground-100 transition-colors group-hover:text-foreground">{p.title}</p>
                    <p className="text-[10px] font-light text-foreground-400">{p.scope}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-5 text-right">
                    <span className="hidden text-[10px] font-light text-foreground-400 sm:block">{p.year}</span>
                    <span className="text-[10px] font-light tracking-widest text-foreground-400 uppercase transition-colors group-hover:text-accent-500">{t('card.view_details')} →</span>
                  </div>
                </Link>
              ))}
            </div>
            {displayCount < filtered.length && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={() => setDisplayCount((c) => c + 9)}
                  className="group flex items-center gap-3 border border-white/10 px-8 py-3 text-xs font-light tracking-widest text-foreground-300 uppercase transition-colors hover:border-white/25 hover:text-foreground-100"
                >
                  {lang === "th" ? "โหลดเพิ่มเติม" : "Load more"}
                  <span className="text-foreground-400 transition-colors group-hover:text-foreground-200">({filtered.length - displayCount})</span>
                </button>
              </div>
            )}
            </>
          )}
        </div>
      </div>

      {/* Filter Sheet */}
      <Sheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        title={t('filters.project_type')}
        footerSlot={
          <div className="px-6 py-4">
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full border border-accent-500 py-2.5 text-[10px] font-light tracking-widest text-accent-500 uppercase transition-colors hover:bg-accent-500 hover:text-background-100"
            >
              {t('filters.view_results')} ({filtered.length})
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          {filterActive && (
            <button onClick={clearAll} className="text-[10px] font-light tracking-widest text-accent-500 uppercase hover:text-foreground-100">
              {t('filters.clear_filters')}
            </button>
          )}
          {filterGroups.map((g) => (
            <div key={g.key}>
              <p className="mb-3 border-b border-white/[0.08] pb-2 text-[10px] font-light tracking-widest text-foreground-400 uppercase">{g.label}</p>
              <div className="space-y-2">
                {g.options?.map((opt) => {
                  const arr = filterValues[g.key as keyof typeof filterValues] as string[];
                  const checked = arr.includes(opt.value);
                  return (
                    <label key={opt.value} className="flex cursor-pointer items-center gap-3 py-1 text-sm font-light text-foreground-300 transition-colors hover:text-foreground-100">
                      <span
                        onClick={() => handleFilterChange(g.key, checked ? arr.filter((v) => v !== opt.value) : [...arr, opt.value])}
                        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${checked ? "border-accent-500 bg-accent-500" : "border-border-300"}`}
                      >
                        {checked && <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                      </span>
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      <CTA
        eyebrow={t('cta.eyebrow')}
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ href: '/contact', label: t('cta.primary') }}
        secondaryAction={{ href: '/shop', label: t('cta.secondary') }}
      />
    </>
  );
}
