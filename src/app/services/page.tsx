import Image from "next/image";
import Link from "next/link";
import ServiceCarousel, { type ServiceCarouselItem } from "@/components/ServiceCarousel";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

const installationServices: ServiceCarouselItem[] = [
  {
    n: "01",
    title: "Pre-Site Survey",
    desc: "สำรวจหน้างาน วัดระยะ ประเมินโครงสร้าง และแนะนำระบบที่เหมาะกับงบประมาณและแบบสถาปัตย์",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=80",
  },
  {
    n: "02",
    title: "Design & Shop Drawing",
    desc: "ออกแบบระบบ จัดทำ shop drawing ตารางวัสดุ และประสานแบบกับสถาปนิกหรือผู้รับเหมาหลัก",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=80",
  },
  {
    n: "03",
    title: "In-house Fabrication",
    desc: "ผลิตชิ้นงานอลูมิเนียม เตรียมกระจก ตัด เจาะ และตรวจคุณภาพก่อนนำส่งเข้าหน้างาน",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80",
  },
  {
    n: "04",
    title: "On-site Installation",
    desc: "ติดตั้ง curtain wall, facade, partition, railing และ sliding system โดยทีมช่าง HAGX",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80",
  },
];

const salesServices: ServiceCarouselItem[] = [
  {
    n: "01",
    title: "Glass Supply",
    desc: "จำหน่ายกระจก tempered, laminated, Low-E, insulated, frosted และ decorative glass สำหรับงานโครงการ",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1000&q=80",
  },
  {
    n: "02",
    title: "Aluminium Profile",
    desc: "จำหน่ายโปรไฟล์อลูมิเนียมสำหรับ curtain wall, sliding, casement, storefront และ partition",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
  },
  {
    n: "03",
    title: "Hardware & Accessories",
    desc: "จำหน่าย patch fittings, stainless hardware, มือจับ, structural silicone และอุปกรณ์ติดตั้ง",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&q=80",
  },
  {
    n: "04",
    title: "Sealant & Consumables",
    desc: "จัดหาซิลิโคน โฟม เทป ยางกันน้ำ และวัสดุสิ้นเปลืองสำหรับทีมติดตั้งกระจกและอลูมิเนียม",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1000&q=80",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/[0.06] px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(255,112,0,0.2),transparent_68%)]" />

        <h1 className="relative z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 text-[18vw] font-bold leading-none tracking-normal sm:text-[14vw] lg:text-[10vw]">
          <span className="-ml-[12vw] text-white sm:-ml-[7vw] lg:-ml-[4vw]">Our</span>
          <span className="text-[#ff8a00]">Services</span>
        </h1>
      </section>

      <section className="border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <h2 className="max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl">
              Our Area of Expertise
            </h2>
            <p className="max-w-xl text-sm font-light leading-7 text-white/55 lg:pt-3">
              HAGX provides aluminium and architectural glass work in two clear paths:
              project installation and premium material sales.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] lg:grid-cols-2">
            <article className="relative overflow-hidden bg-[#120d08] px-7 py-9 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_15%,rgba(255,138,0,0.16),transparent_64%)]" />
              <div className="relative">
                <div className="mb-8 flex items-center justify-between gap-6">
                  <p className="text-xs font-light uppercase tracking-widest text-[#ff8a00]">
                    Installation Work
                  </p>
                  <p className="text-4xl font-light text-white/10">01</p>
                </div>
                <h3 className="text-3xl font-light leading-tight text-white sm:text-4xl">
                  งานรับเหมาและติดตั้ง
                </h3>
                <p className="mt-5 max-w-xl text-sm font-light leading-8 text-white/50">
                  ดูแลตั้งแต่สำรวจหน้างาน ออกแบบ ผลิต และติดตั้ง เหมาะสำหรับลูกค้าที่ต้องการทีมเดียวรับผิดชอบจนส่งมอบ
                </p>
              </div>
            </article>

            <article className="relative overflow-hidden bg-[#0c0c0c] px-7 py-9 sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_15%,rgba(255,138,0,0.16),transparent_64%)]" />
              <div className="relative">
                <div className="mb-8 flex items-center justify-between gap-6">
                  <p className="text-xs font-light uppercase tracking-widest text-[#ff8a00]">
                    Supply & Sales
                  </p>
                  <p className="text-4xl font-light text-white/10">02</p>
                </div>
                <h3 className="text-3xl font-light leading-tight text-white sm:text-4xl">
                  งานขายและจำหน่ายวัสดุ
                </h3>
                <p className="mt-5 max-w-xl text-sm font-light leading-8 text-white/50">
                  จำหน่ายกระจก อลูมิเนียม ฮาร์ดแวร์ และอุปกรณ์ติดตั้งแยกชิ้น พร้อมช่วยแนะนำสเปกให้ตรงงานจริง
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <ServiceCarousel
        eyebrow="Installation Work"
        title="งานรับเหมาและติดตั้ง"
        description="บริการครบวงจรตั้งแต่สำรวจ ออกแบบ ผลิต และติดตั้ง สำหรับงานกระจกและอลูมิเนียมในอาคารพักอาศัย อาคารพาณิชย์ และโครงการสถาปัตยกรรม"
        items={installationServices}
        ctaPrimary={{ href: "/contact", label: "ขอใบเสนอราคาโครงการ" }}
        ctaSecondary={{ href: "/portfolio", label: "ดูผลงานติดตั้ง" }}
        visibleCount={4}
      />

      <ServiceCarousel
        eyebrow="Supply & Sales"
        title="งานขายและจัดหาวัสดุ"
        description="สำหรับลูกค้าที่ต้องการสั่งซื้อวัสดุแยก HAGX จำหน่ายกระจก อลูมิเนียม และฮาร์ดแวร์ พร้อมให้คำแนะนำสเปก ขนาด และการใช้งานให้เหมาะกับแต่ละงาน"
        items={salesServices}
        ctaPrimary={{ href: "/shop", label: "ดูสินค้าทั้งหมด" }}
        ctaSecondary={{ href: "/contact", label: "สอบถามราคา" }}
        visibleCount={3}
      />

      <section>
        <div className="container-site section-py">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow mb-3">Start a Project</p>
              <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Work with HAGX
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-8 text-white/40 lg:text-right">
              Send project details or browse completed work to see facade, partition, railing, and material supply examples.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-primary">
              Contact HAGX
            </Link>
            <Link href="/portfolio" className="btn btn-secondary">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
