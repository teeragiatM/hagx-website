import { projects } from "@/lib/projects";
import { getSupabaseClient, type PortfolioRow } from "@/lib/supabase";
import {
  localizePortfolioItem,
  localizePortfolioItems,
  type Locale,
  type LocalizedPortfolioItem,
} from "@/lib/localizePortfolio";

const TABLE = "portfolio_items";

const localProjectTranslations: Record<
  string,
  {
    title: Record<Locale, string>;
    location: Record<Locale, string>;
    scope: Record<Locale, string>;
    description: Record<Locale, string>;
    highlights: Record<Locale, string[]>;
  }
> = {
  "curtain-wall-bangkok": {
    title: { th: "ระบบเคอร์เทนวอลล์", en: "Curtain Wall System" },
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    scope: {
      th: "ออกแบบ | ผลิต | ติดตั้ง",
      en: "Design | Fabrication | Install",
    },
    description: {
      th: "ระบบเคอร์เทนวอลล์อลูมิเนียม Thermal Break สำหรับอาคารสำนักงาน 20 ชั้นในกรุงเทพฯ ครอบคลุมพื้นที่กระจกกว่า 2,400 ตารางเมตร ด้วยกระจก Low-E Double Glazing",
      en: "A thermal break aluminium curtain wall system for a 20-storey Bangkok office building, covering more than 2,400 sq.m. with Low-E double glazing.",
    },
    highlights: {
      th: [
        "พื้นที่กระจก 2,400 ตร.ม.",
        "ระบบ Thermal Break 65 มม.",
        "กระจก Low-E IGU",
        "ดำเนินการแล้วเสร็จใน 4 เดือน",
      ],
      en: [
        "2,400 sq.m. of glazing",
        "65mm thermal break system",
        "Low-E IGU glass",
        "Completed within 4 months",
      ],
    },
  },
  "glass-facade-huahin": {
    title: { th: "ฟาซาดกระจกสำหรับวิลล่า", en: "Glass Facade Villa" },
    location: { th: "หัวหิน", en: "Hua Hin" },
    scope: { th: "สำรวจ | ออกแบบ | ติดตั้ง", en: "Survey | Design | Install" },
    description: {
      th: "ฟาซาดกระจกและราวกันตกกระจกลามิเนตสำหรับวิลล่าส่วนตัวริมทะเลหัวหิน เน้นความโปร่งและวิวทะเลสูงสุด",
      en: "Glass facade and laminated glass railing for a private beachfront villa in Hua Hin, designed for openness and uninterrupted sea views.",
    },
    highlights: {
      th: [
        "กระจกลามิเนต 10.38 มม.",
        "ราวกันตกสูง 1.2 เมตร",
        "Custom Patch Fitting",
        "เหมาะกับสภาพอากาศทะเล",
      ],
      en: [
        "10.38mm laminated glass",
        "1.2m glass railing",
        "Custom patch fitting",
        "Coastal weather performance",
      ],
    },
  },
  "office-partition-bangkok": {
    title: { th: "ระบบผนังกั้นสำนักงาน", en: "Office Partition System" },
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    scope: { th: "ออกแบบ | ติดตั้ง", en: "Design | Install" },
    description: {
      th: "ระบบผนังกั้นกระจกฝ้าสำหรับสำนักงาน Co-working Space ขนาดใหญ่ในกรุงเทพฯ ออกแบบให้แบ่งพื้นที่ได้ยืดหยุ่น",
      en: "Frosted glass partition system for a large Bangkok co-working office, designed for flexible space planning.",
    },
    highlights: {
      th: [
        "กระจกฝ้า Sandblasted",
        "ระบบถอดประกอบได้",
        "พื้นที่ 800 ตร.ม.",
        "ติดตั้งนอกเวลาทำการ",
      ],
      en: [
        "Sandblasted glass",
        "Demountable system",
        "800 sq.m. area",
        "After-hours installation",
      ],
    },
  },
  "retail-storefront-bangkok": {
    title: { th: "หน้าร้านกระจก", en: "Retail Storefront" },
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    scope: {
      th: "ออกแบบ | ผลิต | ติดตั้ง",
      en: "Design | Fabrication | Install",
    },
    description: {
      th: "หน้าร้านกระจกแบบ Full-Glass Storefront พร้อมประตูกระจกไร้กรอบสำหรับแบรนด์แฟชั่นในคอมมูนิตี้มอลล์",
      en: "Full-glass storefront with frameless glass doors for a fashion brand inside a community mall.",
    },
    highlights: {
      th: [
        "ประตูกระจกไร้กรอบ",
        "Patch Fitting SS304",
        "กระจกเทมเปอร์ 12 มม.",
        "รองรับงานป้ายหน้าร้าน",
      ],
      en: [
        "Frameless glass door",
        "SS304 patch fitting",
        "12mm tempered glass",
        "Signage integration",
      ],
    },
  },
  "glass-railing-pattaya": {
    title: { th: "ราวกันตกกระจกระเบียง", en: "Balcony Glass Railing" },
    location: { th: "ชลบุรี / พัทยา", en: "Chonburi / Pattaya" },
    scope: { th: "จัดหา | ติดตั้ง", en: "Supply | Install" },
    description: {
      th: "ราวกันตกกระจกลามิเนตสำหรับระเบียงโครงการคอนโดมิเนียมชลบุรี ระบบ Post-Fixed พร้อมราวมือจับสแตนเลส",
      en: "Laminated balcony glass railing for a condominium project in Chonburi, using a post-fixed system with stainless steel handrails.",
    },
    highlights: {
      th: [
        "กระจก Laminated VSG",
        "ราวมือจับ SS 316L",
        "ระบบ Post-Fixed",
        "แนวยาว 240 เมตร",
      ],
      en: [
        "Laminated VSG glass",
        "316L stainless handrail",
        "Post-fixed system",
        "240 linear metres",
      ],
    },
  },
  "hotel-facade-phuket": {
    title: { th: "ฟาซาดและล็อบบี้โรงแรม", en: "Hotel Facade & Lobby" },
    location: { th: "ภูเก็ต", en: "Phuket" },
    scope: {
      th: "ออกแบบ | ผลิต | ติดตั้ง",
      en: "Design | Fabrication | Install",
    },
    description: {
      th: "ฟาซาดและล็อบบี้กระจก Low-E สำหรับโรงแรม 5 ดาวในภูเก็ต ออกแบบเพื่อลดความร้อนจากแสงอาทิตย์ในสภาพอากาศเขตร้อน",
      en: "Low-E glass facade and lobby system for a five-star Phuket hotel, designed to reduce solar heat gain in a tropical climate.",
    },
    highlights: {
      th: [
        "Low-E IGU ค่า U-Value ไม่เกิน 1.8",
        "Curtain Wall Series 90 มม.",
        "กระจกล็อบบี้ไร้กรอบ",
        "สนับสนุนเครดิต LEED",
      ],
      en: [
        "Low-E IGU U-Value <= 1.8",
        "90mm curtain wall series",
        "Frameless lobby glass",
        "LEED credit contribution",
      ],
    },
  },
  "lowe-supply-chiangmai": {
    title: { th: "จัดหากระจก Low-E", en: "Low-E Glass Supply" },
    location: { th: "เชียงใหม่", en: "Chiang Mai" },
    scope: { th: "จัดหา", en: "Supply" },
    description: {
      th: "จัดส่งกระจก Low-E Double Glazing สำหรับโครงการอาคารพาณิชย์เชียงใหม่ ตัดขนาดพิเศษตามแบบ Shop Drawing",
      en: "Low-E double glazing supply for a Chiang Mai commercial building, custom-cut to shop drawing requirements.",
    },
    highlights: {
      th: [
        "IGU 6mm Low-E + 12A + 6mm",
        "จัดส่ง 320 แผ่น",
        "มี QC Certificate ทุกแผ่น",
        "ส่งตรงถึงหน้างาน",
      ],
      en: [
        "IGU 6mm Low-E + 12A + 6mm",
        "320 panels supplied",
        "QC certificate for every panel",
        "Direct site delivery",
      ],
    },
  },
  "aluminium-supply-bangkok": {
    title: { th: "จัดหาโปรไฟล์อลูมิเนียม", en: "Aluminium Profile Order" },
    location: { th: "กรุงเทพฯ", en: "Bangkok" },
    scope: { th: "จัดหา", en: "Supply" },
    description: {
      th: "จำหน่ายโปรไฟล์อลูมิเนียม Curtain Wall Series 65 มม. สำหรับผู้รับเหมาหลักในกรุงเทพฯ พร้อมบริการตัดและเจาะตามแบบ",
      en: "65mm curtain wall aluminium profile supply for a Bangkok main contractor, with cutting and drilling service to drawings.",
    },
    highlights: {
      th: [
        "Profile Thermal Break 65 มม.",
        "Alloy 6063-T5 Anodized",
        "ตัดตามแบบ 580 เส้น",
        "ส่งมอบภายใน 5 วันทำการ",
      ],
      en: [
        "65mm thermal break profile",
        "Alloy 6063-T5 anodized",
        "580 profiles cut to drawings",
        "Delivered within 5 working days",
      ],
    },
  },
};

function localProjectToPortfolioItem(
  project: (typeof projects)[number],
  locale: Locale = "th"
): LocalizedPortfolioItem {
  const translated = localProjectTranslations[project.slug];

  return {
    id: project.id,
    slug: project.slug,
    year: project.year,
    cover_image: project.image,
    title: translated?.title[locale] ?? project.title,
    description: translated?.description[locale] ?? project.desc,
    location: translated?.location[locale] ?? project.location,
    gallery: project.images,
    scope: translated?.scope[locale] ?? project.scope,
    highlights: translated?.highlights[locale] ?? project.highlights,
    type: project.type,
    project_type: project.type,
    category: project.category,
  };
}

function getLocalPortfolioItems(locale: Locale) {
  return projects.map((project) => localProjectToPortfolioItem(project, locale));
}

// ── Fetch all published items ─────────────────────────────────────────────────

export async function getPortfolioItems(
  locale: Locale = "th"
): Promise<LocalizedPortfolioItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return getLocalPortfolioItems(locale);

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .order("year", { ascending: false });

  if (error) {
    console.error("[getPortfolioItems]", error.message);
    return [];
  }

  return localizePortfolioItems((data as PortfolioRow[]) ?? [], locale);
}

// ── Fetch single item by slug ─────────────────────────────────────────────────

export async function getPortfolioItemBySlug(
  slug: string,
  locale: Locale = "th"
): Promise<LocalizedPortfolioItem | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    const project = projects.find((project) => project.slug === slug);
    return project ? localProjectToPortfolioItem(project, locale) : null;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    if (error?.code !== "PGRST116") {
      // PGRST116 = "no rows" — expected for unknown slugs, don't log
      console.error("[getPortfolioItemBySlug]", error?.message);
    }
    return null;
  }

  return localizePortfolioItem(data as PortfolioRow, locale);
}

// ── Generate static params for [slug] routes ─────────────────────────────────

export async function getPortfolioSlugs(): Promise<{ slug: string }[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return projects.map((project) => ({ slug: project.slug }));

  const { data, error } = await supabase
    .from(TABLE)
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("[getPortfolioSlugs]", error.message);
    return [];
  }

  return (data ?? []).map((r: Pick<PortfolioRow, "slug">) => ({ slug: r.slug }));
}
