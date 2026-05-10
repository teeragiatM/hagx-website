export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  category: "glass" | "aluminium" | "hardware";
  subcategory: string;
  tagline: string;
  desc: string;
  specs: { label: string; value: string }[];
  priceFrom: string;
  unit: string;
  image: string;
  images: string[];
  inStock: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "tempered-glass-clear",
    name: "กระจก Tempered ใส",
    nameEn: "Clear Tempered Glass (ESG)",
    category: "glass",
    subcategory: "Tempered Glass",
    tagline: "ความแข็งแกร่ง 5 เท่า พร้อมใบรับรอง มอก.",
    desc: "กระจกนิรภัยเทมเปอร์ใส เหมาะสำหรับ Partition, ราวกันตก, บานประตู-หน้าต่าง และ Facade ทั่วไป ผ่านมาตรฐาน มอก.2129 ตัดขนาดพิเศษได้",
    specs: [
      { label: "ความหนา", value: "6 / 8 / 10 / 12 / 15 / 19 mm" },
      { label: "ขนาดมาตรฐาน", value: "ถึง 2400 × 4500 mm" },
      { label: "มาตรฐาน", value: "มอก.2129 / EN 12150" },
      { label: "การส่ง", value: "3–7 วันทำการ" },
    ],
    priceFrom: "380",
    unit: "ตร.ม.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    ],
    inStock: true,
    featured: true,
  },
  {
    slug: "laminated-glass-vsG",
    name: "กระจก Laminated นิรภัย",
    nameEn: "Laminated Safety Glass (VSG)",
    category: "glass",
    subcategory: "Laminated Glass",
    tagline: "เมื่อแตก ไม่ร่วง — ปลอดภัยสูงสุด",
    desc: "กระจก Laminated ประกบฟิล์ม PVB ระหว่างแผ่น เมื่อแตกจะยึดติดกับฟิล์ม ไม่กระจาย เหมาะสำหรับ Skylight, หลังคากระจก, พื้นกระจก และงานที่ต้องการความปลอดภัยสูง",
    specs: [
      { label: "ความหนา", value: "6.38 / 8.38 / 10.38 / 12.38 mm" },
      { label: "ฟิล์ม PVB", value: "0.38 / 0.76 mm" },
      { label: "มาตรฐาน", value: "EN 14449 / ASTM C1172" },
      { label: "การส่ง", value: "5–10 วันทำการ" },
    ],
    priceFrom: "650",
    unit: "ตร.ม.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"],
    inStock: true,
    featured: true,
  },
  {
    slug: "low-e-double-glazing",
    name: "กระจก Low-E Insulated (IGU)",
    nameEn: "Low-E Double Glazing (IGU)",
    category: "glass",
    subcategory: "Insulated Glass",
    tagline: "ประหยัดพลังงาน กันความร้อน กันเสียง",
    desc: "กระจก Insulated Unit ประกอบด้วย กระจก Low-E + ช่องอากาศ + กระจกด้านใน ลด Solar Heat Gain ได้ถึง 70% เหมาะสำหรับ Curtain Wall และ Facade อาคารสูง",
    specs: [
      { label: "โครงสร้าง", value: "6mm Low-E + 12A + 6mm Clear" },
      { label: "U-Value", value: "≤ 1.8 W/m²K" },
      { label: "SHGC", value: "≤ 0.35" },
      { label: "การส่ง", value: "7–14 วันทำการ" },
    ],
    priceFrom: "1200",
    unit: "ตร.ม.",
    image: "https://images.unsplash.com/photo-1558618047-f4e62b98e9b5?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1558618047-f4e62b98e9b5?w=900&q=80"],
    inStock: true,
  },
  {
    slug: "frosted-glass",
    name: "กระจกฝ้า Sandblasted",
    nameEn: "Frosted / Sandblasted Glass",
    category: "glass",
    subcategory: "Decorative Glass",
    tagline: "ความเป็นส่วนตัว โดยไม่สูญเสียแสง",
    desc: "กระจกพ่นทรายทั้งแผ่นหรือพ่นลวดลาย ทำให้แสงผ่านได้แต่มองทะลุไม่ได้ เหมาะสำหรับ Partition ห้องน้ำ บานกั้นโต๊ะทำงาน และงานตกแต่งภายใน",
    specs: [
      { label: "ความหนา", value: "6 / 8 / 10 mm (Tempered)" },
      { label: "ระดับความโปร่ง", value: "ปรับได้ 10–90%" },
      { label: "ลวดลาย", value: "สั่งทำพิเศษได้" },
      { label: "การส่ง", value: "7–10 วันทำการ" },
    ],
    priceFrom: "520",
    unit: "ตร.ม.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=80"],
    inStock: true,
  },
  {
    slug: "aluminium-curtain-wall-profile",
    name: "โปรไฟล์ Curtain Wall",
    nameEn: "Aluminium Curtain Wall Profile",
    category: "aluminium",
    subcategory: "Curtain Wall",
    tagline: "ระบบ 50 / 65 / 90 mm Thermal Break",
    desc: "โปรไฟล์อลูมิเนียมสำหรับระบบ Curtain Wall แบบ Stick และ Unitized รองรับกระจกถึง 19 mm มีระบบ Thermal Break ลดการถ่ายเทความร้อน",
    specs: [
      { label: "ระบบ", value: "50 / 65 / 90 mm series" },
      { label: "วัสดุ", value: "Alloy 6063-T5" },
      { label: "ผิวเคลือบ", value: "Anodized / Powder Coat" },
      { label: "ความยาว", value: "6 เมตร/เส้น" },
    ],
    priceFrom: "285",
    unit: "เมตร",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80"],
    inStock: true,
    featured: true,
  },
  {
    slug: "aluminium-sliding-system",
    name: "ระบบบานเลื่อน Sliding",
    nameEn: "Aluminium Sliding Door/Window System",
    category: "aluminium",
    subcategory: "Sliding System",
    tagline: "เลื่อนลื่น เงียบ ทนทาน — รับน้ำหนักถึง 120 kg",
    desc: "ระบบบานเลื่อนอลูมิเนียมแบบ 2, 3, 4 บาน พร้อม Track และ Hardware ครบชุด รองรับกระจกหนักได้ถึง 120 kg/บาน เหมาะสำหรับประตู Patio และหน้าต่างบ้าน",
    specs: [
      { label: "ระบบ", value: "2-Track / 3-Track / 4-Track" },
      { label: "น้ำหนักรับ", value: "ถึง 120 kg/แผ่น" },
      { label: "ผิว", value: "Mill / Anodized / Powder Coat" },
      { label: "กระจก", value: "รองรับ 6–12 mm" },
    ],
    priceFrom: "1800",
    unit: "ชุด",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"],
    inStock: true,
  },
  {
    slug: "patch-fitting-set",
    name: "Patch Fitting Frameless",
    nameEn: "Patch Fitting Set for Frameless Glass Door",
    category: "hardware",
    subcategory: "Patch Fitting",
    tagline: "ประตูกระจก Frameless ไร้กรอบสวยงาม",
    desc: "ชุด Patch Fitting สแตนเลส 304 สำหรับประตูกระจก Tempered แบบไม่มีกรอบ ประกอบด้วย Top Patch, Bottom Patch, Handle และ Floor Spring ครบชุด",
    specs: [
      { label: "วัสดุ", value: "Stainless Steel 304" },
      { label: "รองรับกระจก", value: "10 / 12 mm Tempered" },
      { label: "น้ำหนักรับ", value: "ถึง 80 kg" },
      { label: "ผิว", value: "Brushed / Mirror" },
    ],
    priceFrom: "3500",
    unit: "ชุด",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80"],
    inStock: true,
  },
  {
    slug: "structural-silicone-sealant",
    name: "Structural Silicone Sealant",
    nameEn: "Structural & Weather Silicone Sealant",
    category: "hardware",
    subcategory: "Sealant",
    tagline: "ยึดแน่น กันน้ำ ทนอุณหภูมิ -50 ถึง 200°C",
    desc: "กาว Silicone สำหรับงาน Structural Glazing และ Weather Sealing คุณภาพสูง ทนทานต่อสภาพอากาศและรังสี UV เหมาะสำหรับ Curtain Wall และ Facade",
    specs: [
      { label: "ประเภท", value: "Structural / Weather / Neutral" },
      { label: "อุณหภูมิใช้งาน", value: "-50°C ถึง 200°C" },
      { label: "แรงยึด", value: "≥ 1.0 MPa (Structural)" },
      { label: "ขนาด", value: "300 ml / 600 ml" },
    ],
    priceFrom: "280",
    unit: "หลอด",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    images: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"],
    inStock: false,
  },
];

export const categories = [
  { value: "glass",     label: "กระจก (Glass)",          subcats: ["Tempered Glass","Laminated Glass","Insulated Glass","Decorative Glass"] },
  { value: "aluminium", label: "อลูมิเนียม (Aluminium)", subcats: ["Curtain Wall","Sliding System","Casement System","Partition Frame"] },
  { value: "hardware",  label: "ฮาร์ดแวร์ (Hardware)",  subcats: ["Patch Fitting","Sealant","Handles & Locks","Spider Clamp"] },
];
