export const hagxIdentity = {
  bodyTh:
    "HAGX คือทีมผู้เชี่ยวชาญด้านการออกแบบ ผลิต และติดตั้งระบบกระจก-อลูมิเนียมสำหรับอาคารที่เน้นความ Precision (ความแม่นยำ) เป็นหัวใจหลัก เราเปลี่ยนความต้องการของคุณให้เป็นระบบประตู-หน้าต่างที่แข็งแรง ทนทาน และสะอาดตา ด้วยมาตรฐานวิศวกรรมขั้นสูง เพื่อยกระดับความปลอดภัยและความงามให้สถาปัตยกรรมของคุณอย่างยั่งยืน",
  bodyEn:
    "HAGX is a specialist team for the design, fabrication, and installation of architectural glass and aluminium systems. With precision at the core, we turn project requirements into durable, refined door and window systems engineered for lasting safety, performance, and architectural clarity.",
};

export const hagxStats = [
  {
    n: "20+",
    labelEn: "Years of Engineering Expertise",
    labelTh: "ปีแห่งความเชี่ยวชาญ",
    sub: "ประสบการณ์ด้านงานกระจกและอลูมิเนียมมากกว่า 20 ปี",
    subEn: "Over 20 years of engineering expertise in glass and aluminium.",
  },
  {
    n: "600+",
    labelEn: "Trusted Projects",
    labelTh: "โครงการที่ไว้วางใจ",
    sub: "ส่งมอบผลงานคุณภาพให้กับโครงการหลากหลายขนาดมากกว่า 600 โครงการ",
    subEn: "Delivered quality outcomes across 600+ projects of all scales.",
  },
  {
    n: "01",
    labelEn: "Complete One-Stop Solutions",
    labelTh: "โซลูชันครบวงจร จบในที่เดียว",
    sub: "ครบจบในที่เดียว ทั้งวัสดุ ดีไซน์ และการติดตั้งมาตรฐานสูง พร้อมระบบการดูแลที่ได้มาตรฐาน",
    subEn:
      "A complete one-stop solution covering materials, design, high-standard installation, and reliable care.",
  },
  {
    n: "100%",
    labelEn: "Maximum Precision and Standards",
    labelTh: "ความแม่นยำและมาตรฐานสูงสุด",
    sub: "มอบความมั่นใจด้วยความละเอียดระดับมิลลิเมตร ตรวจสอบงานทุกขั้นตอนเพื่อผลลัพธ์ที่สมบูรณ์แบบ และการรับประกันที่เชื่อถือได้",
    subEn:
      "Confidence delivered through millimetre-level precision, step-by-step inspection, and dependable warranty support.",
  },
];

export const hagxBrands: string[] = [
  'YKK AP',
  'Dow Corning',
  'Guardian Glass',
  'AGC Glass',
  'Schuco',
  'Reynaers',
  'Pilkington',
  'Technal',
];

export type ProcessStep = {
  n: string;
  title: string;
  titleTh: string;
  image: string;
  itemsTh: string[];
  itemsEn: string[];
};

export const hagxProcessSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Consultation & Site Survey',
    titleTh: 'การปรึกษาและสำรวจหน้างาน',
    image: '/images/working-process-1.png',
    itemsTh: [
      'วิเคราะห์ความต้องการ: ให้คำปรึกษาเชิงลึกเพื่อเป็นคู่คิดในการวางแผนโครงการ',
      'สำรวจพื้นที่จริง: เก็บข้อมูลทางเทคนิคและขนาดที่แม่นยำ',
      'วางรากฐานโครงการ: ตรวจสอบความพร้อมก่อนเริ่มงาน',
    ],
    itemsEn: [
      'Requirement Analysis: In-depth consultation to act as your strategic project partner.',
      'Technical Survey: On-site inspections for precise measurements and technical data.',
      'Project Foundation: Ensuring total accuracy in project planning from step one.',
    ],
  },
  {
    n: '02',
    title: 'Design & Engineering',
    titleTh: 'การพัฒนาแบบและวิศวกรรม',
    image: '/images/working-process-2.png',
    itemsTh: [
      'จัดทำแบบขยาย: Shop Drawing ที่ละเอียดถี่ถ้วน',
      'วางแผนงบประมาณ: รายการวัสดุ (BOQ) ที่ชัดเจนตรวจสอบได้',
      'มาตรฐานสากล: ความสวยงามและโครงสร้างที่แข็งแกร่ง',
    ],
    itemsEn: [
      'Shop Drawings: Transforming concepts into detailed architectural drawings.',
      'Budget Planning: Transparent and verifiable Bills of Quantities (BOQ).',
      'International Standards: Aesthetic excellence with structural integrity.',
    ],
  },
  {
    n: '03',
    title: 'Manufacturing & QC',
    titleTh: 'การผลิตและควบคุมคุณภาพ',
    image: '/images/working-process-3.png',
    itemsTh: [
      'การผลิตเฉพาะทาง: ควบคุมคุณภาพในโรงงานของเราเอง',
      'การทดสอบระบบ: ตรวจสอบชิ้นงาน Pre-test ก่อนติดตั้ง',
      'วัสดุเกรดพรีเมียม: คัดสรรคุณภาพสูงเพื่อความทนทานสูงสุด',
    ],
    itemsEn: [
      'Specialized Production: Manufacturing under strict quality control in-house.',
      'System Testing: Rigorous pre-installation tests for component integrity.',
      'Premium Materials: High-grade materials for maximum durability and performance.',
    ],
  },
  {
    n: '04',
    title: 'Professional Installation',
    titleTh: 'การติดตั้งโดยทีมช่างผู้เชี่ยวชาญ',
    image: '/images/step_4.png',
    itemsTh: [
      'ทีมงานเทคนิค: ทีมช่างเฉพาะทางที่มีประสบการณ์สูง',
      'ความแม่นยำระดับมิลลิเมตร: มาตรฐานสูงสุดในการปฏิบัติงาน',
      'มาตรฐานความปลอดภัย: ความสะอาดและความปลอดภัยในพื้นที่',
    ],
    itemsEn: [
      'Technical Teams: Highly skilled specialized installation teams.',
      'Millimeter Precision: Highest standards of precision in every aspect.',
      'Worksite Excellence: Safety, cleanliness, and strict technical adherence.',
    ],
  },
  {
    n: '05',
    title: 'Inspection & Handover',
    titleTh: 'การตรวจสอบและส่งมอบงาน',
    image: '/images/working-process-3.png',
    itemsTh: [
      'การตรวจรับงาน: QC อย่างละเอียดก่อนส่งมอบ',
      'โซลูชันอุปกรณ์: ติดตั้งอุปกรณ์คุณภาพสูงให้สมบูรณ์แบบ',
      'การรับประกัน: บริการหลังการขายและการรับประกันที่เชื่อถือได้',
    ],
    itemsEn: [
      'Final QC: Detailed inspections across all dimensions before handover.',
      'Hardware Solutions: High-quality hardware integration for a flawless finish.',
      'Warranty & Support: Reliable after-sales service and long-term warranties.',
    ],
  },
];

export type ScopeItem = {
  n: string;
  en: string;
  th: string;
  image: string;
};

export const hagxScopeItems: ScopeItem[] = [
  {
    n: '01',
    en: 'Curtain Wall Systems',
    th: 'ระบบ Curtain Wall',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85',
  },
  {
    n: '02',
    en: 'Glass Facades',
    th: 'ผนังกระจก Facade',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=85',
  },
  {
    n: '03',
    en: 'Aluminium Windows & Doors',
    th: 'หน้าต่างและประตูอลูมิเนียม',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85',
  },
  {
    n: '04',
    en: 'Glass Partitions',
    th: 'ผนังกระจกภายใน',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85',
  },
  {
    n: '05',
    en: 'Sliding & Folding Systems',
    th: 'ระบบบานเลื่อนและบานพับ',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85',
  },
  {
    n: '06',
    en: 'Railings & Balusters',
    th: 'ราวบันไดและราวกันตก',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&q=85',
  },
  {
    n: '07',
    en: 'Material Supply',
    th: 'จำหน่ายวัสดุและฮาร์ดแวร์',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=85',
  },
  {
    n: '08',
    en: 'Project Management',
    th: 'บริหารโครงการครบวงจร',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1400&q=85',
  },
];

export type StrategyPillar = {
  num: string;
  tag: string;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  fill: number;
  iconName: 'ScanSearch' | 'Factory' | 'Hammer';
};

export const hagxStrategyPillars: StrategyPillar[] = [
  {
    num: '01',
    tag: 'ANALYZE',
    titleTh: 'วิเคราะห์',
    titleEn: 'Analyze',
    descTh:
      'วิเคราะห์โจทย์สถาปนิกและข้อจำกัดหน้างานอย่างละเอียด ก่อนกำหนดระบบที่เหมาะสมที่สุดสำหรับแต่ละโครงการ',
    descEn:
      'We analyze architectural briefs and site constraints in detail before defining the most suitable system for each project.',
    fill: 0.35,
    iconName: 'ScanSearch',
  },
  {
    num: '02',
    tag: 'FABRICATE',
    titleTh: 'ผลิต',
    titleEn: 'Fabricate',
    descTh:
      'ประกอบบานด้วยเครื่องจักรและทดสอบระบบ Pre-engineering ก่อนส่งถึงหน้างาน เพื่อความแม่นยำและคุณภาพสูงสุด',
    descEn:
      'Panels are machine-fabricated and pre-engineering tested before delivery to ensure precision and quality.',
    fill: 0.45,
    iconName: 'Factory',
  },
  {
    num: '03',
    tag: 'INSTALL',
    titleTh: 'ติดตั้ง',
    titleEn: 'Install',
    descTh:
      'ติดตั้งด้วยมาตรฐานความปลอดภัยและทีมช่างฝีมือประณีต ตรวจสอบทุกจุดก่อนส่งมอบงาน',
    descEn:
      'Installed with safety discipline and refined workmanship, with every point checked before handover.',
    fill: 0.55,
    iconName: 'Hammer',
  },
];

/** legacy: keep `label` pointing to EN for backward compat */
export const hagxValues = [
  {
    n: "01",
    title: "Experience & Local Mastery",
    titleTh: "ประสบการณ์และความเชี่ยวชาญ",
    subTh:
      "กว่า 20 ปีในอุตสาหกรรมกระจกและอลูมิเนียม เราสั่งสมประสบการณ์จากโครงการหลากหลายสเกล",
    descTh:
      "ด้วยประสบการณ์กว่า 20 ปีในงานกระจก อลูมิเนียม และงานตกแต่งภายใน เรามีความเข้าใจลึกซึ้งในรายละเอียดเทคนิคและสภาพแวดล้อมจริงในพื้นที่หัวหิน ทำให้เราเป็นตัวจริงที่คนในพื้นที่ไว้วางใจเสมอมา",
    subEn: "Long-standing expertise shaped by real local conditions.",
    descEn:
      "With more than 20 years across glass, aluminium, and interior works, HAGX understands both technical detail and the on-site realities of Hua Hin, earning long-term trust from local clients and project teams.",
  },
  {
    n: "02",
    title: "Reliable Accountability",
    titleTh: "ความน่าเชื่อถือและความรับผิดชอบ",
    subTh:
      "เรายึดมั่นในความโปร่งใสและรับผิดชอบในทุกขั้นตอน ด้วยระบบการทำงานที่ตรวจสอบได้จริง",
    descTh:
      "ความซื่อสัตย์คือรากฐานของธุรกิจเรา HAGX ยึดมั่นในความโปร่งใสและการรับผิดชอบต่อผลงานในระยะยาว เราให้คำปรึกษาอย่างตรงไปตรงมา เพื่อให้ลูกค้าได้รับสิ่งที่คุ้มค่าที่สุดสำหรับการลงทุนในทุกโครงการ",
    subEn:
      "Transparent advice, accountable delivery, and long-term responsibility.",
    descEn:
      "Integrity is the foundation of our work. We communicate clearly, take responsibility for long-term outcomes, and guide clients toward the most worthwhile solution for every investment.",
  },
  {
    n: "03",
    title: "Precision & Punctuality",
    titleTh: "ความแม่นยำและการตรงต่อเวลา",
    subTh:
      "รักษามาตรฐานความละเอียด ควบคู่ไปกับการบริหารจัดการเวลาที่มีประสิทธิภาพ",
    descTh:
      "เราเน้นความเนี๊ยบในทุกมิติ ชิ้นงานทุกชิ้นผ่านการทดสอบระบบ (Pre-engineering) จากโรงงานของเราเอง เพื่อให้มั่นใจว่าผลงานเป๊ะตามแบบแผน และส่งมอบถึงมือลูกค้าภายในกรอบเวลาที่กำหนดอย่างเคร่งครัด",
    subEn: "Refined fabrication with disciplined delivery timelines.",
    descEn:
      "Every piece is prepared and checked through our in-house pre-engineering process, ensuring accurate fit, clean execution, and delivery within the agreed schedule.",
  },
  {
    n: "04",
    title: "Innovative Material Selection",
    titleTh: "มาตรฐานการทำงานที่ชัดเจนและต่อเนื่อง",
    subTh:
      "ผลงานที่สำเร็จอย่างต่อเนื่องคือบทพิสูจน์ถึงความสามารถ และความมุ่งมั่นในการรักษามาตรฐานคุณภาพงานในระดับสูงสุด",
    descTh:
      "ผลงานที่สำเร็จอย่างต่อเนื่องคือบทพิสูจน์ถึงความสามารถ และความมุ่งมั่นในการรักษามาตรฐานคุณภาพงานในระดับสูงสุด",
    subEn: "Advanced materials selected for function, beauty, and performance.",
    descEn:
      "We source leading aluminium systems and high-spec glass technologies to create solutions that balance functional performance with architectural expression.",
  },
];
