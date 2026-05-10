export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  category: "installation" | "supply";
  year: string;
  image: string;
  images: string[];
  scope: string;
  desc: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "p1",
    slug: "curtain-wall-bangkok",
    title: "Curtain Wall System",
    location: "กรุงเทพฯ",
    type: "curtain-wall",
    category: "installation",
    year: "2024",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    ],
    scope: "Design | Fabrication | Install",
    desc: "ระบบ Curtain Wall อลูมิเนียม Thermal Break สำหรับอาคารสำนักงาน 20 ชั้น กรุงเทพฯ ครอบคลุมพื้นที่กระจกกว่า 2,400 ตร.ม. ด้วยกระจก Low-E Double Glazing",
    highlights: ["พื้นที่กระจก 2,400 ตร.ม.", "ระบบ 65mm Thermal Break", "กระจก Low-E IGU", "ดำเนินการแล้วเสร็จใน 4 เดือน"],
  },
  {
    id: "p2",
    slug: "glass-facade-huahin",
    title: "Glass Facade Villa",
    location: "หัวหิน",
    type: "facade",
    category: "installation",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"],
    scope: "Survey | Design | Install",
    desc: "Glass Facade และราวกันตกกระจก Laminated สำหรับวิลล่าส่วนตัวริมหาดหัวหิน เน้นความโปร่งและวิวทะเลสูงสุด",
    highlights: ["กระจก Laminated 10.38mm", "ราวกันตกสูง 1.2m", "Custom Patch Fitting", "ทนสภาพอากาศทะเล"],
  },
  {
    id: "p3",
    slug: "office-partition-bangkok",
    title: "Office Partition System",
    location: "กรุงเทพฯ",
    type: "partition",
    category: "installation",
    year: "2023",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80"],
    scope: "Design | Install",
    desc: "ระบบ Partition กระจกฝ้า Sandblasted สำหรับสำนักงาน Co-working Space ขนาดใหญ่ในกรุงเทพฯ ออกแบบให้แบ่งพื้นที่ได้ยืดหยุ่น",
    highlights: ["กระจกฝ้า Sandblasted", "ระบบ Demountable", "พื้นที่ 800 ตร.ม.", "ติดตั้งนอกเวลา Office"],
  },
  {
    id: "p4",
    slug: "retail-storefront-bangkok",
    title: "Retail Storefront",
    location: "กรุงเทพฯ",
    type: "facade",
    category: "installation",
    year: "2023",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"],
    scope: "Design | Fabrication | Install",
    desc: "หน้าร้าน Retail แบบ Full-Glass Storefront พร้อมประตูกระจก Frameless Patch Fitting สำหรับแบรนด์แฟชั่นใน Community Mall",
    highlights: ["Frameless Glass Door", "Patch Fitting SS304", "กระจก Tempered 12mm", "Signage Integration"],
  },
  {
    id: "p5",
    slug: "glass-railing-pattaya",
    title: "Balcony Glass Railing",
    location: "ชลบุรี / พัทยา",
    type: "railing",
    category: "installation",
    year: "2023",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80"],
    scope: "Supply | Install",
    desc: "ราวกันตกกระจก Laminated สำหรับระเบียงโครงการ Condominium ชลบุรี ระบบ Post-Fixed พร้อม Stainless Steel Handrail",
    highlights: ["กระจก Laminated VSG", "SS Handrail 316L", "ระบบ Post-Fixed", "240 เมตรแนว"],
  },
  {
    id: "p6",
    slug: "hotel-facade-phuket",
    title: "Hotel Facade & Lobby",
    location: "ภูเก็ต",
    type: "curtain-wall",
    category: "installation",
    year: "2024",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80"],
    scope: "Design | Fabrication | Install",
    desc: "Facade และ Lobby กระจก Low-E สำหรับโรงแรม 5 ดาว ภูเก็ต ออกแบบเพื่อลด Solar Heat Gain ในสภาพอากาศเขตร้อน",
    highlights: ["Low-E IGU U-Value ≤1.8", "Curtain Wall 90mm Series", "Lobby Frameless Glass", "LEED Credit Contribution"],
  },
  {
    id: "p7",
    slug: "lowe-supply-chiangmai",
    title: "Low-E Glass Supply",
    location: "เชียงใหม่",
    type: "supply",
    category: "supply",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"],
    scope: "Supply",
    desc: "จัดส่งกระจก Low-E Double Glazing (IGU) สำหรับโครงการอาคารพาณิชย์เชียงใหม่ ตัดขนาดพิเศษตามแบบ Shop Drawing",
    highlights: ["IGU 6mm Low-E + 12A + 6mm", "จัดส่ง 320 แผ่น", "QC Certificate ทุกแผ่น", "ส่งตรงหน้างาน"],
  },
  {
    id: "p8",
    slug: "aluminium-supply-bangkok",
    title: "Aluminium Profile Order",
    location: "กรุงเทพฯ",
    type: "supply",
    category: "supply",
    year: "2023",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80"],
    scope: "Supply",
    desc: "จำหน่ายโปรไฟล์อลูมิเนียม Curtain Wall Series 65mm สำหรับผู้รับเหมาหลักในกรุงเทพฯ พร้อมบริการตัดและเจาะตามแบบ",
    highlights: ["Profile 65mm Thermal Break", "Alloy 6063-T5 Anodized", "ตัดตามแบบ 580 เส้น", "Delivery 5 วันทำการ"],
  },
];

export const typeOptions = [
  { value: "curtain-wall", label: "Curtain Wall" },
  { value: "facade", label: "Glass Facade" },
  { value: "partition", label: "Interior Partition" },
  { value: "railing", label: "Railing System" },
  { value: "supply", label: "Material Supply" },
];

export const categoryOptions = [
  { value: "installation", label: "Installation Work" },
  { value: "supply", label: "Supply & Sales" },
];
