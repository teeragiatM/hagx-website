import CtaSection from "@/components/CtaSection";
import PageHero from "@/components/PageHero";
import ServiceCarousel, { type ServiceCarouselItem } from "@/components/ServiceCarousel";
import { ReviewSection, type TestimonialItem } from "@/components/ui/ReviewSection";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

const installationServices: ServiceCarouselItem[] = [
  {
    n: "01",
    title: "Design Consultation & Problem Solving",
    desc: "เราเป็นคู่คิดที่ช่วยออกแบบและสนับสนุนการตัดสินใจ โดยวิเคราะห์โซลูชันและวิธีแก้ปัญหาทางวิศวกรรมที่ดีที่สุด เพื่อให้งานออกมาสมบูรณ์ตามดีไซน์",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=80",
  },
  {
    n: "02",
    title: "Technical Shop Drawing",
    desc: "จัดทำแบบ shop drawing เชิงเทคนิคอย่างละเอียด เพื่อประสานงานร่วมกับสถาปนิกและผู้รับเหมาหลักอย่างมืออาชีพ ลดความคลาดเคลื่อนก่อนเริ่มผลิตจริง",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=80",
  },
  {
    n: "03",
    title: "Precision Site Survey",
    desc: "สำรวจหน้างานด้วยอุปกรณ์มาตรฐานสูง เพื่อความแม่นยำในการผลิต ควบคุมระยะจริง และลดข้อผิดพลาดในขั้นตอนการติดตั้ง",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=80",
  },
  {
    n: "04",
    title: "Pre-Engineering & Quality Inspection",
    desc: "ชิ้นงานถูกเตรียมจากโรงงาน พร้อมผ่านการทดสอบระบบ pre-engineering และตรวจสอบด้วย QC checklist ที่เข้มงวดก่อนส่งมอบสู่หน้างาน",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80",
  },
];

const manufacturingServices: ServiceCarouselItem[] = [
  {
    n: "01",
    title: "Tailor-made Design",
    desc: "รับผลิตตามสเปกและคุณสมบัติที่ลูกค้าต้องการในรูปแบบ custom-made พร้อมนำเสนอ proposed drawing เพื่ออนุมัติก่อนเข้าสู่ไลน์ผลิตจริง",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=80",
  },
  {
    n: "02",
    title: "Precision Manufacturing",
    desc: "ใช้เครื่องจักรที่ทันสมัยในการประกอบ เพื่อให้ได้ precision joinery งานเนี๊ยบ แข็งแรง และได้ระนาบที่สมบูรณ์ตามมาตรฐานสถาปัตยกรรม",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&q=80",
  },
  {
    n: "03",
    title: "Internal System Testing",
    desc: "มีการ test system ภายในโรงงาน เพื่อตรวจสอบกลไกการทำงาน ความสมบูรณ์ของระบบ และความพร้อมก่อนการส่งมอบ 100%",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80",
  },
  {
    n: "04",
    title: "Certified Materials (TIS Standard)",
    desc: "คัดสรรวัสดุที่ได้รับมาตรฐานอุตสาหกรรมไทย (มอก.) ในเกรดคุณภาพสูง พร้อมตรวจสอบมาตรฐานสีเคลือบผิวและ coating ให้ตรงตามสเปก",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1000&q=80",
  },
];

const supplyServices: ServiceCarouselItem[] = [
  {
    n: "01",
    title: "Premium Glass & Customization",
    desc: "จำหน่ายกระจกแผ่นดิบและงานสั่งทำพิเศษ ทั้งการเจียรขอบและตัดตามขนาด cut-to-size พร้อมบริการช่วยประเมินแบบหน้างาน",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1000&q=80",
  },
  {
    n: "02",
    title: "Aluminium Profile & Hardware",
    desc: "ศูนย์รวมเส้นอลูมิเนียมหลากหลายซีรีส์จากแบรนด์ชั้นนำ และจำหน่ายอุปกรณ์ฮาร์ดแวร์ครบวงจร เช่น มือจับ, patch fittings และ structural silicone คุณภาพสูง",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
  },
  {
    n: "03",
    title: "SCG Official Partnership",
    desc: "เป็นตัวแทนจำหน่ายอย่างเป็นทางการสำหรับผลิตภัณฑ์ SCG อาทิ แผ่นยิบซัมและโครงคร่าวซีลาย มั่นใจได้ในสินค้าของแท้ 100%",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80",
  },
  {
    n: "04",
    title: "Nationwide High-Speed Logistics",
    desc: "อำนวยความสะดวกด้วยบริการจัดส่งสินค้าที่รวดเร็วและปลอดภัย ครอบคลุมทั่วประเทศไทย เพื่อให้งานโครงการดำเนินไปอย่างไม่มีสะดุด",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80",
  },
];

const expertiseTracks = [
  {
    n: "01",
    eyebrow: "Project Installation Work",
    title: "งานรับเหมาและติดตั้งแบบครบวงจร",
    desc: "HAGX คือผู้เชี่ยวชาญด้านงานติดตั้งที่ยึดถือมาตรฐานสูงสุด เราควบคุมคุณภาพแบบ 100% ด้วยทีมช่าง in-house ของเราเองโดยไม่ใช้ outsource เพื่อส่งมอบงานที่ประณีตและความรับผิดชอบสูงสุดในทุกโครงการ",
  },
  {
    n: "02",
    eyebrow: "Manufacturing & Custom Fabrication",
    title: "งานผลิตและประกอบตามมาตรฐาน",
    desc: "เรายกระดับงานผลิตประตู-หน้าต่างอลูมิเนียมด้วยโรงงานมาตรฐาน เปลี่ยนความต้องการของลูกค้าให้เป็นชิ้นงานที่ใช้งานได้จริง ทนทาน และสวยงามตามหลักสถาปัตยกรรม",
  },
  {
    n: "03",
    eyebrow: "Supply & Official Distributor",
    title: "ศูนย์จำหน่ายและจัดหาวัสดุครบวงจร",
    desc: "เราเป็นคู่ค้ากับแบรนด์วัสดุก่อสร้างชั้นนำ และเป็นตัวแทนจำหน่ายอย่างเป็นทางการ พร้อมซัพพอร์ตลูกค้าด้วยสินค้าคุณภาพสูงและบริการแปรรูปวัสดุที่แม่นยำ",
  },
];

const serviceTestimonials: TestimonialItem[] = [
  {
    client: "Property Developer",
    project: "High-rise Curtain Wall System",
    scope: "PROJECT INSTALLATION | QC CONTROL",
    quote: "ทีม HAGX ควบคุมงานติดตั้งได้เป็นระบบตั้งแต่สำรวจหน้างานจนส่งมอบ รายละเอียดรอยต่อและแนวกระจกเรียบร้อยตามมาตรฐานที่ตกลงไว้",
    bg: "#16120d",
    accent: "#ff8a00",
  },
  {
    client: "Construction Partner",
    project: "Custom Aluminium Fabrication",
    scope: "MANUFACTURING | PRE-ENGINEERING",
    quote: "งานผลิตจากโรงงานมีความแม่นยำสูง ชิ้นงานประกอบหน้างานได้รวดเร็ว ลดการแก้ไขซ้ำ และช่วยให้แผนงานโครงการเดินต่อได้ตามกำหนด",
    bg: "#10151c",
    accent: "#7cb7ff",
  },
  {
    client: "Interior Design Studio",
    project: "Glass Partition & Hardware Supply",
    scope: "SUPPLY | INSTALLATION SUPPORT",
    quote: "วัสดุและฮาร์ดแวร์ที่ HAGX จัดหาให้มีคุณภาพสม่ำเสมอ ทีมให้คำแนะนำเรื่องสเปกและขนาดชัดเจน ทำให้งานจบได้เรียบร้อย",
    bg: "#11170f",
    accent: "#77c36a",
  },
  {
    client: "Hospitality Group",
    project: "Facade Glazing Renovation",
    scope: "DESIGN SUPPORT | INSTALL",
    quote: "HAGX เข้าใจข้อจำกัดของอาคารเดิมและเสนอวิธีติดตั้งที่เหมาะสม งานออกมาสวย ตรงดีไซน์ และประสานงานกับทีมโครงการได้ดีมาก",
    bg: "#1b1118",
    accent: "#d68adf",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <SiteNav />

      <PageHero
        eyebrow="Services"
        title="Our Services"
        subtitle="งานกระจกและอลูมิเนียมสถาปัตยกรรม ครบทั้งรับเหมาติดตั้ง ผลิตตามสั่ง และจัดหาวัสดุ ด้วยมาตรฐานวิศวกรรมสูงสุดในทุกโครงการ"
        minHeight="70vh"
      />

      <section className="border-b border-white/[0.06] px-4 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <h2 className="max-w-4xl text-5xl font-light leading-none tracking-normal text-white sm:text-6xl lg:text-7xl">
              Our Area of Expertise
            </h2>
            <p className="max-w-xl text-sm font-light leading-7 text-white/55 lg:pt-3">
              HAGX delivers architectural glass, aluminium fabrication, installation,
              and material supply through three integrated capabilities built around
              engineering standards and accountable workmanship.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {expertiseTracks.map((track, index) => (
              <article
                key={track.n}
                className={`relative overflow-hidden px-7 py-9 sm:px-10 sm:py-12 ${
                  index === 0 ? "bg-[#120d08]" : "bg-[#0c0c0c]"
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_15%,rgba(255,138,0,0.16),transparent_64%)]" />
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between gap-6">
                    <p className="text-xs font-light uppercase tracking-widest text-[#ff8a00]">
                      {track.eyebrow}
                    </p>
                    <p className="text-4xl font-light text-white/10">{track.n}</p>
                  </div>
                  <h3 className="text-2xl font-light leading-tight text-white sm:text-3xl">
                    {track.title}
                  </h3>
                  <p className="mt-5 text-sm font-light leading-8 text-white/50">
                    {track.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceCarousel
        eyebrow="01 | Project Installation Work"
        title="งานรับเหมาและติดตั้งแบบครบวงจร"
        description="HAGX ควบคุมคุณภาพงานติดตั้งด้วยทีมช่าง in-house 100% โดยไม่ใช้ outsource เพื่อส่งมอบงานที่ประณีต ตรวจสอบได้ และรับผิดชอบได้จริงในทุกโครงการ"
        items={installationServices}
        ctaPrimary={{ href: "/contact", label: "ขอใบเสนอราคาโครงการ" }}
        ctaSecondary={{ href: "/portfolio", label: "ดูผลงานติดตั้ง" }}
        visibleCount={3}
      />

      <ServiceCarousel
        eyebrow="02 | Manufacturing & Custom Fabrication"
        title="งานผลิตและประกอบตามมาตรฐาน"
        description="โรงงานมาตรฐานของ HAGX เปลี่ยนความต้องการเฉพาะของลูกค้าให้เป็นชิ้นงานประตู-หน้าต่างอลูมิเนียมที่ใช้งานได้จริง ทนทาน และสวยงามตามหลักสถาปัตยกรรม"
        items={manufacturingServices}
        ctaPrimary={{ href: "/contact", label: "ปรึกษางานผลิต" }}
        ctaSecondary={{ href: "/portfolio", label: "ดูตัวอย่างงาน" }}
        visibleCount={3}
      />

      <ServiceCarousel
        eyebrow="03 | Supply & Official Distributor"
        title="ศูนย์จำหน่ายและจัดหาวัสดุครบวงจร"
        description="HAGX เป็นคู่ค้ากับแบรนด์วัสดุก่อสร้างชั้นนำและตัวแทนจำหน่ายอย่างเป็นทางการ พร้อมซัพพอร์ตลูกค้าด้วยสินค้าคุณภาพสูง การแปรรูปที่แม่นยำ และระบบจัดส่งทั่วประเทศ"
        items={supplyServices}
        ctaPrimary={{ href: "/shop", label: "ดูสินค้าทั้งหมด" }}
        ctaSecondary={{ href: "/contact", label: "สอบถามราคา" }}
        visibleCount={3}
      />

      <ReviewSection
        eyebrow="Client Stories"
        title="สิ่งที่ลูกค้าพูดถึงเรา"
        description="ความเชื่อมั่นที่สร้างจากผลงานจริง — ไม่ใช่คำสัญญา"
        items={serviceTestimonials}
      />

      <CtaSection
        eyebrow="Start a Project"
        title="Work with HAGX"
        description="Send project details or material requirements to our team for technical review, specification support, and quotation."
        primaryAction={{ href: "/contact", label: "Contact HAGX" }}
        secondaryAction={{ href: "/portfolio", label: "View Portfolio" }}
      />

      <SiteFooter />
    </main>
  );
}
