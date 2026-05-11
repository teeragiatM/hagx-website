export type InsightPost = {
  slug: string;
  category: string;
  categoryTh: string;
  title: string;
  titleTh: string;
  excerpt: string;
  excerptTh: string;
  readMin: number;
  date: string;
  image: string;
  featured?: boolean;
  body: string;
  bodyTh: string;
  specs?: { label: string; value: string }[];
};

export const insightPosts: InsightPost[] = [
  {
    slug: "curtain-wall-selection-guide",
    category: "TECHNICAL",
    categoryTh: "เทคนิค",
    title: "Curtain Wall System Selection: A Complete Guide for Architects",
    titleTh: "คู่มือเลือกระบบ Curtain Wall สำหรับสถาปนิก",
    excerpt:
      "Choosing between unitised and stick-built curtain wall systems determines budget, programme, and long-term performance. This guide breaks down the decision.",
    excerptTh:
      "การเลือกระหว่างระบบ Unitised และ Stick-built มีผลต่อต้นทุน แผนงาน และประสิทธิภาพระยะยาว บทความนี้ช่วยให้คุณตัดสินใจได้ถูกต้อง",
    readMin: 7,
    date: "2026-04-18",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
    featured: true,
    body: `Curtain wall systems are the defining skin of contemporary commercial architecture. The choice between unitised and stick-built approaches shapes not only construction programme but also long-term weathertightness, maintenance cycles, and thermal performance.\n\n**Stick-Built Systems**\n\nStick-built curtain wall is assembled on-site piece by piece — mullions, transoms, infill panels, and seals are all installed sequentially. This approach suits irregular facades, retrofit projects, and buildings where factory prefabrication is impractical due to access constraints.\n\nThe key advantages: lower factory investment, greater flexibility for complex geometry, and simpler logistics on constrained sites. The trade-off is higher on-site labour time and greater exposure to weather during installation.\n\n**Unitised Systems**\n\nUnitised panels are fully fabricated and glazed in a controlled factory environment, then hoisted and clipped floor-by-floor. The result is a faster on-site programme, tighter tolerances, and improved quality control — critical for high-rise projects where access cost per fix is extreme.\n\nFor projects above 8–10 storeys, unitised almost always wins on total lifecycle cost even when upfront fabrication costs are higher.\n\n**Thermal & Acoustic Performance**\n\nBoth systems can achieve equivalent U-values with the right glass specification. However, unitised systems tend to offer better air and water infiltration rates at the panel joints due to factory-assembled EPDM seals versus site-applied silicone in stick-built.\n\nFor Thai climate: solar heat gain coefficient (SHGC) is often more critical than U-value. Low-E double-glazed units with SHGC ≤ 0.25 are standard for Bangkok high-rises to meet EEC requirements.`,
    bodyTh: `ระบบ Curtain Wall คือเปลือกอาคารที่กำหนดลักษณะของสถาปัตยกรรมเชิงพาณิชย์สมัยใหม่ การเลือกระหว่างระบบ Unitised และ Stick-built ส่งผลต่อทั้งแผนงานก่อสร้าง ความกันน้ำระยะยาว และประสิทธิภาพทางความร้อน\n\n**ระบบ Stick-Built**\n\nระบบ Stick-built ประกอบชิ้นส่วนทีละชิ้นในหน้างาน ทั้งโครงอลูมิเนียม แผงกระจก และซีล ติดตั้งตามลำดับ เหมาะสำหรับด้านหน้าอาคารรูปทรงซับซ้อน งาน Retrofit และโครงการที่มีข้อจำกัดด้านการขนส่ง\n\nข้อได้เปรียบหลัก: ลงทุนโรงงานน้อยกว่า ยืดหยุ่นสำหรับรูปทรงซับซ้อน และโลจิสติกส์ง่ายกว่าในพื้นที่จำกัด แต่ต้องใช้แรงงานหน้างานมากขึ้นและเสี่ยงต่อสภาพอากาศระหว่างติดตั้ง\n\n**ระบบ Unitised**\n\nแผง Unitised ผลิตและติดตั้งกระจกเสร็จสมบูรณ์จากโรงงาน จากนั้นยกขึ้นและล็อกชั้นต่อชั้น ผลลัพธ์คือระยะเวลาหน้างานสั้นลง ความเที่ยงตรงสูงขึ้น และควบคุมคุณภาพได้ดีกว่า ซึ่งสำคัญมากสำหรับอาคารสูงที่ต้นทุนการเข้าถึงสูง\n\nสำหรับโครงการที่สูงกว่า 8-10 ชั้น ระบบ Unitised มักชนะในด้านต้นทุนตลอดอายุการใช้งาน แม้ต้นทุนผลิตเริ่มต้นจะสูงกว่า\n\n**ประสิทธิภาพความร้อนและเสียง**\n\nทั้งสองระบบสามารถบรรลุค่า U-value เทียบเท่ากันได้ด้วยกระจกที่เหมาะสม อย่างไรก็ตาม ระบบ Unitised มักให้ประสิทธิภาพกันอากาศและน้ำที่ดีกว่าเนื่องจากซีล EPDM ประกอบจากโรงงานแทนซิลิโคนทาหน้างาน\n\nสำหรับสภาพอากาศไทย: ค่า SHGC มักสำคัญกว่าค่า U-value กระจก Low-E สองชั้นที่ SHGC ≤ 0.25 เป็นมาตรฐานสำหรับตึกสูงกรุงเทพฯ เพื่อผ่านมาตรฐาน EEC`,
    specs: [
      { label: "System Type", value: "Unitised / Stick-Built" },
      { label: "Glass Spec", value: "Double Glazed Low-E, 6+12+6mm" },
      { label: "SHGC Target", value: "≤ 0.25 (Bangkok EEC)" },
      { label: "Air Infiltration", value: "≤ 1.57 m³/h·m² @ 75Pa" },
      { label: "Standard", value: "AAMA 501, มอก. 2423" },
    ],
  },
  {
    slug: "low-e-glass-explained",
    category: "TECHNICAL",
    categoryTh: "เทคนิค",
    title: "Low-E Glass Explained: Coatings, Performance & Thai Climate",
    titleTh: "Low-E Glass คืออะไร: เคลือบ ประสิทธิภาพ และสภาพอากาศไทย",
    excerpt:
      "Not all Low-E glass is equal. Hard-coat vs. soft-coat, single vs. double silver — understanding the difference is critical for tropical climate performance.",
    excerptTh:
      "Low-E Glass ไม่ได้เหมือนกันทุกชนิด Hard-coat vs Soft-coat, เงินชั้นเดียว vs สองชั้น — ความต่างนี้สำคัญมากสำหรับสภาพอากาศร้อนชื้น",
    readMin: 5,
    date: "2026-03-27",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=85",
    body: `Low-emissivity (Low-E) glass has a microscopically thin metallic coating that reflects infrared radiation while allowing visible light to pass through. In Thailand's climate, the primary goal is rejecting solar heat gain rather than retaining interior warmth — the inverse of cold-climate priorities.\n\n**Hard-Coat vs Soft-Coat**\n\nHard-coat (pyrolytic) Low-E is applied during the float glass manufacturing process, making it durable and suitable for single-glazed applications. However, its emissivity performance (typically e ≈ 0.15–0.20) is lower than soft-coat.\n\nSoft-coat (sputtered) Low-E is applied in a vacuum chamber post-production, achieving emissivity values as low as e ≈ 0.02–0.04. It must be sealed within an IGU (insulated glass unit) as the coating is sensitive to moisture and abrasion.\n\n**Solar Control in Bangkok**\n\nFor Bangkok's 12+ hours of direct sun exposure, triple-silver soft-coat IGUs with SHGC between 0.20–0.28 deliver the best balance of daylight transmission and heat rejection. Visible light transmittance (VLT) of 40–55% avoids the oppressive cave effect while still providing meaningful glare control.`,
    bodyTh: `กระจก Low-E มีการเคลือบโลหะบางมากที่สะท้อนรังสีอินฟราเรดในขณะที่ยังให้แสงที่มองเห็นได้ผ่าน ในสภาพอากาศไทย เป้าหมายหลักคือการปฏิเสธความร้อนจากแสงอาทิตย์ ซึ่งตรงข้ามกับประเทศที่มีอากาศหนาว\n\n**Hard-Coat vs Soft-Coat**\n\nHard-coat (Pyrolytic) Low-E ใช้ระหว่างกระบวนการผลิตกระจกแบน ทำให้ทนทานและเหมาะสำหรับการใช้งานกระจกชั้นเดียว แต่ประสิทธิภาพ Emissivity (ประมาณ e ≈ 0.15–0.20) ต่ำกว่า Soft-coat\n\nSoft-coat (Sputtered) Low-E ใช้ในห้องสุญญากาศหลังการผลิต ได้ค่า Emissivity ต่ำถึง e ≈ 0.02–0.04 ต้องซีลไว้ใน IGU เนื่องจากการเคลือบอ่อนไหวต่อความชื้นและการขัดถู\n\n**การควบคุมแสงอาทิตย์ในกรุงเทพฯ**\n\nสำหรับกรุงเทพฯ ที่มีแสงแดดตรง 12+ ชั่วโมง Triple-silver soft-coat IGU ที่มีค่า SHGC 0.20–0.28 ให้สมดุลที่ดีที่สุดระหว่างการส่งผ่านแสงและการปฏิเสธความร้อน`,
    specs: [
      { label: "Coating Type", value: "Triple-Silver Soft-Coat" },
      { label: "Emissivity", value: "e ≈ 0.02–0.04" },
      { label: "SHGC Range", value: "0.20–0.28" },
      { label: "VLT", value: "40–55%" },
      { label: "Standard", value: "EN 673, มอก. 2555" },
    ],
  },
  {
    slug: "aluminium-profile-systems-comparison",
    category: "CASE STUDY",
    categoryTh: "กรณีศึกษา",
    title: "European vs Asian Aluminium Profile Systems: What HAGX Recommends",
    titleTh: "ระบบโปรไฟล์อลูมิเนียม EU vs Asia: คำแนะนำจาก HAGX",
    excerpt:
      "YKK AP, Schüco, Reynaers — each system has different thermal break geometry, tolerance specs, and supply chain implications for Thai projects.",
    excerptTh:
      "YKK AP, Schüco, Reynaers มีรูปทรง Thermal Break ความเที่ยงตรง และห่วงโซ่อุปทานที่แตกต่างกันสำหรับโครงการในไทย",
    readMin: 6,
    date: "2026-03-10",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85",
    body: `Specifying aluminium profile systems for Thai projects involves balancing thermal performance, lead times, and the local fabricator's ability to process the profiles correctly. HAGX works with both European and Asian systems and this is our honest assessment.\n\n**European Systems (Schüco, Reynaers, Technal)**\n\nEuropean profiles are engineered for cold climates with deep thermal breaks (typically 24–34mm polyamide). In Thailand's hot climate, this thermal break depth is often over-specified but delivers acoustic and rigidity benefits that matter for high-end residential.\n\nLead times from Europe are 8–14 weeks for standard profiles, with custom extrusions taking longer. Local stock in Thailand is limited to common dimensions.\n\n**Asian Systems (YKK AP, TOSTEM)**\n\nYKK AP profiles are manufactured in Thailand and Malaysia, offering 2–4 week lead times and competitive pricing. The system range is extensive, covering everything from residential windows to heavy commercial facades.\n\nHAGX recommendation: For premium residential and boutique hospitality, European systems with their visual refinement and brand recognition justify the premium. For commercial buildings and large-scale projects where programme and cost are critical, YKK AP delivers equivalent structural and weather performance at a fraction of the lead time.`,
    bodyTh: `การกำหนดระบบโปรไฟล์อลูมิเนียมสำหรับโครงการในไทยต้องสมดุลระหว่างประสิทธิภาพความร้อน ระยะเวลานำ และความสามารถของช่างผลิตในการประมวลผลโปรไฟล์ได้อย่างถูกต้อง HAGX ทำงานกับทั้งระบบ EU และ Asia นี่คือการประเมินตามความเป็นจริงของเรา\n\n**ระบบยุโรป (Schüco, Reynaers, Technal)**\n\nโปรไฟล์ยุโรปออกแบบสำหรับสภาพอากาศหนาวโดยมี Thermal Break ลึก (ทั่วไป 24–34 มม. โพลีอะไมด์) ในสภาพอากาศร้อนของไทย ความลึกนี้มักเกินความจำเป็น แต่ให้ประโยชน์ด้านเสียงและความแข็งแรงที่สำคัญสำหรับที่พักอาศัยระดับสูง\n\nระยะเวลานำจากยุโรป 8–14 สัปดาห์สำหรับโปรไฟล์มาตรฐาน Stock ในประเทศไทยมีจำกัดเฉพาะขนาดทั่วไป\n\n**ระบบเอเชีย (YKK AP, TOSTEM)**\n\nโปรไฟล์ YKK AP ผลิตในไทยและมาเลเซีย มีระยะเวลานำ 2–4 สัปดาห์และราคาแข่งขันได้ ครอบคลุมทุกอย่างตั้งแต่หน้าต่างที่พักอาศัยถึงด้านหน้าพาณิชย์หนัก\n\nคำแนะนำ HAGX: สำหรับที่พักอาศัยระดับพรีเมียมและโรงแรมบูติก ระบบยุโรปที่มีรูปลักษณ์ที่ประณีตและการรับรู้แบรนด์ที่ดีคุ้มค่ากับราคาพรีเมียม สำหรับอาคารพาณิชย์และโครงการขนาดใหญ่ที่แผนงานและต้นทุนสำคัญ YKK AP ให้ประสิทธิภาพโครงสร้างและการกันน้ำเทียบเท่าในเวลาสั้นกว่ามาก`,
    specs: [
      { label: "System", value: "YKK AP / Schüco / Reynaers" },
      { label: "Thermal Break", value: "24–34 mm Polyamide (EU)" },
      { label: "Lead Time (EU)", value: "8–14 weeks" },
      { label: "Lead Time (YKK)", value: "2–4 weeks" },
      { label: "Standard", value: "EN 14351-1, มอก. 1221" },
    ],
  },
  {
    slug: "glass-partition-office-design",
    category: "DESIGN",
    categoryTh: "การออกแบบ",
    title: "Glass Partition Systems for Modern Office Design: From Open to Acoustic",
    titleTh: "ระบบผนังกระจกสำหรับออฟฟิศสมัยใหม่: จาก Open Plan ถึง Acoustic",
    excerpt:
      "Full-height frameless glass walls redefine open-plan offices. But acoustic control and structural requirements are often underestimated at the design stage.",
    excerptTh:
      "ผนังกระจก Frameless เต็มความสูงเปลี่ยนนิยาม Open-plan Office แต่การควบคุมเสียงและข้อกำหนดโครงสร้างมักถูกประเมินต่ำในขั้นออกแบบ",
    readMin: 4,
    date: "2026-02-14",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85",
    body: `Full-height glass partitions have become the signature element of premium office interiors — offering visual openness while defining discrete working zones. The challenge lies in balancing this visual transparency with the acoustic isolation that knowledge workers actually need.\n\n**Frameless vs Framed Systems**\n\nFrameless (structural silicone or channel-clamped) systems maximise visual cleanliness and are appropriate for 10–12mm toughened glass up to approximately 3.5m height. Above this, framing is required for structural reasons and to control deflection under wind load or impact.\n\nFramed aluminium systems with slim 50–65mm face widths (e.g., Dorma Hüppe, HAGX custom profiles) offer a refined look while providing the structural continuity needed for floor-to-ceiling installations in high-rise buildings.\n\n**Acoustic Performance**\n\nA single 12mm toughened glass panel achieves approximately Rw 38dB — adequate for visual privacy but insufficient for confidential meeting rooms (Rw 42dB minimum recommended). Double-glazed partitions (6+12air+6) achieve Rw 44–46dB and are now standard for boardrooms and HR offices.`,
    bodyTh: `ผนังกระจกเต็มความสูงกลายเป็นองค์ประกอบสำคัญของออฟฟิศระดับพรีเมียม ให้ความเปิดโปร่งทางสายตาในขณะที่กำหนดพื้นที่ทำงานที่แตกต่างกัน ความท้าทายอยู่ที่การสมดุลความโปร่งใสนี้กับการป้องกันเสียงที่พนักงานต้องการ\n\n**ระบบ Frameless vs Framed**\n\nระบบ Frameless (Structural Silicone หรือ Channel-clamped) ให้ความสะอาดของรูปลักษณ์สูงสุด เหมาะสำหรับกระจก Tempered 10–12 มม. สูงไม่เกินประมาณ 3.5 เมตร เหนือจุดนี้ต้องมีกรอบด้วยเหตุผลโครงสร้าง\n\nระบบกรอบอลูมิเนียมที่มีหน้ากว้าง 50–65 มม. ให้รูปลักษณ์ที่ประณีตในขณะที่ให้ความต่อเนื่องโครงสร้างที่จำเป็นสำหรับการติดตั้งพื้นถึงเพดานในอาคารสูง\n\n**ประสิทธิภาพเสียง**\n\nแผงกระจก Tempered 12 มม. เดี่ยวให้ค่าประมาณ Rw 38dB เพียงพอสำหรับความเป็นส่วนตัวทางสายตาแต่ไม่เพียงพอสำหรับห้องประชุม ผนังกระจกสองชั้น (6+12air+6) ได้ Rw 44–46dB และเป็นมาตรฐานสำหรับห้อง Boardroom`,
    specs: [
      { label: "System", value: "Frameless / Slim-frame Aluminium" },
      { label: "Glass", value: "12mm Toughened / 6+12+6 IGU" },
      { label: "Acoustic (Single)", value: "Rw 38 dB" },
      { label: "Acoustic (Double)", value: "Rw 44–46 dB" },
      { label: "Standard", value: "มอก. 1305, EN 12600" },
    ],
  },
  {
    slug: "silicone-sealant-selection",
    category: "TECHNICAL",
    categoryTh: "เทคนิค",
    title: "Structural Silicone Sealant: Why Specification Matters on Every Project",
    titleTh: "โครงสร้างซิลิโคน Sealant: ทำไมการกำหนดสเปคถึงสำคัญ",
    excerpt:
      "Structural silicone is the invisible bond holding glass facades together. Using the wrong product — or applying it incorrectly — is a silent failure mode.",
    excerptTh:
      "ซิลิโคนโครงสร้างคือตัวยึดที่มองไม่เห็นที่ยึดด้านหน้ากระจกไว้ การใช้ผลิตภัณฑ์ผิดหรือทาผิดวิธีเป็นความล้มเหลวที่เงียบ",
    readMin: 5,
    date: "2026-01-30",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=85",
    body: `Structural silicone glazing (SSG) relies entirely on the adhesive bond between glass, aluminium, and the sealant to transfer wind and gravity loads. Unlike mechanical fixings, there is no visible redundancy — the sealant either works or it doesn't.\n\n**Dow Corning 983 vs Generic Products**\n\nDow Corning (now Dow) 983 and 993 are the benchmark structural silicones for facade work. They offer ETAG 002 certification, documented elongation at break (>150%), and documented adhesion to the specific substrates you are likely to encounter.\n\nGeneric structural silicones from non-certified manufacturers may meet short-term test requirements but lack the documented long-term UV and thermal cycling performance data that major projects require.\n\n**Application Quality Control**\n\nProper SSG application requires: substrate cleaning with approved primer, temperature and humidity logging during application, minimum bite depth calculation (typically 6mm structural, 6mm weather), and a 21-day cure before the assembly is loaded.\n\nHAGX performs all structural silicone work under controlled factory conditions with documented cure records supplied with every project.`,
    bodyTh: `การยึดกระจกด้วยซิลิโคนโครงสร้าง (SSG) อาศัยพันธะกาวระหว่างกระจก อลูมิเนียม และซีแลนท์ในการถ่ายโอนแรงลมและแรงโน้มถ่วงทั้งหมด ไม่เหมือนการยึดด้วยกลไก ไม่มีความซ้ำซ้อนที่มองเห็นได้\n\n**Dow Corning 983 vs ผลิตภัณฑ์ทั่วไป**\n\nDow Corning 983 และ 993 เป็นมาตรฐานสำหรับงาน Facade ได้รับการรับรอง ETAG 002 และมีข้อมูลยืดหยุ่นก่อนขาด (>150%) และการยึดเกาะกับวัสดุพื้นผิวที่ต้องพบเจอ\n\nซิลิโคนโครงสร้างทั่วไปจากผู้ผลิตที่ไม่ได้รับการรับรองอาจผ่านข้อกำหนดการทดสอบระยะสั้นแต่ขาดข้อมูลประสิทธิภาพระยะยาวภายใต้แสง UV และการเปลี่ยนแปลงอุณหภูมิ\n\n**การควบคุมคุณภาพการทา**\n\nการทา SSG ที่ถูกต้องต้องการ: ทำความสะอาดพื้นผิวด้วย Primer ที่ได้รับอนุมัติ บันทึกอุณหภูมิและความชื้นระหว่างการทา คำนวณความลึกต่ำสุด (ทั่วไป 6 มม. โครงสร้าง + 6 มม. กันน้ำ) และ Cure 21 วันก่อนรับน้ำหนัก\n\nHAGX ดำเนินการงาน SSG ทั้งหมดภายใต้เงื่อนไขที่ควบคุมในโรงงาน พร้อมบันทึก Cure ที่ได้รับการจัดทำเอกสารในทุกโครงการ`,
    specs: [
      { label: "Product", value: "Dow 983 / 993 SSG" },
      { label: "Certification", value: "ETAG 002 Part 1" },
      { label: "Elongation at Break", value: "> 150%" },
      { label: "Cure Period", value: "21 days min." },
      { label: "Bite Depth", value: "6mm structural + 6mm weather" },
    ],
  },
  {
    slug: "glass-facade-maintenance",
    category: "MAINTENANCE",
    categoryTh: "การบำรุงรักษา",
    title: "Glass Facade Maintenance: A 5-Year Schedule for Bangkok Buildings",
    titleTh: "การบำรุงรักษาด้านหน้ากระจก: ตารางงาน 5 ปี สำหรับอาคารในกรุงเทพฯ",
    excerpt:
      "Bangkok's pollution, UV intensity, and monsoon cycles create a specific maintenance profile for glass facades. Here's what the schedule should look like.",
    excerptTh:
      "มลพิษ UV และวัฏจักรมรสุมของกรุงเทพฯ สร้างโปรไฟล์การบำรุงรักษาเฉพาะสำหรับด้านหน้ากระจก นี่คือตารางงานที่ควรจะเป็น",
    readMin: 4,
    date: "2026-01-08",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    body: `Glass facades in Bangkok face a harsher maintenance environment than most European markets — higher UV index, monsoon-driven water infiltration risk, and elevated PM2.5 levels that leave residue on glass and seals. A structured maintenance schedule protects the building's appearance and extends seal life.\n\n**Annual Programme**\n\nYear 1: Full facade inspection + high-pressure water clean. Check all sealant joints for adhesion failure, cracking, or discolouration. Check drainage channel clearance.\n\nYear 2: Repeat clean. Visual inspection of glazing gaskets and structural silicone. Replace any failed perimeter seals.\n\nYear 3 (Major): Full sealant inspection with adhesion pull tests on sample joints. Check aluminium finish for coating breakdown or corrosion at fixings. Re-apply weather seals where deterioration observed.\n\n**Bangkok-Specific Considerations**\n\nSoot and exhaust deposits on lower facade panels (below 5th floor) accumulate significantly faster and require quarterly cleaning in high-traffic areas. Silicone sealants on south and west elevations are exposed to maximum UV and should be targeted for 7-year replacement cycles rather than the standard 10-year.`,
    bodyTh: `ด้านหน้ากระจกในกรุงเทพฯ เผชิญสภาพแวดล้อมการบำรุงรักษาที่รุนแรงกว่าส่วนใหญ่ในยุโรป ดัชนี UV สูงกว่า ความเสี่ยงจากน้ำมรสุม และระดับ PM2.5 สูงที่ทิ้งคราบบนกระจกและซีล ตารางงานที่มีโครงสร้างชัดเจนช่วยปกป้องรูปลักษณ์ของอาคารและยืดอายุซีล\n\n**โปรแกรมรายปี**\n\nปีที่ 1: ตรวจสอบด้านหน้าอาคารเต็มรูปแบบ + ทำความสะอาดด้วยแรงดันสูง ตรวจสอบรอยต่อซีแลนท์ทั้งหมดว่ามีความล้มเหลวในการยึดเกาะ การแตกร้าว หรือการเปลี่ยนสีหรือไม่\n\nปีที่ 2: ทำความสะอาดซ้ำ ตรวจสอบปะเก็นกระจกและซิลิโคนโครงสร้างด้วยสายตา เปลี่ยนซีลรอบนอกที่ล้มเหลว\n\nปีที่ 3 (หลัก): ตรวจสอบซีแลนท์เต็มรูปแบบพร้อมการทดสอบการดึงยึดเกาะบนรอยต่อตัวอย่าง ตรวจสอบผิวอลูมิเนียมว่ามีการสลายตัวของสารเคลือบหรือการกัดกร่อนที่จุดยึดหรือไม่\n\n**ข้อควรพิจารณาเฉพาะสำหรับกรุงเทพฯ**\n\nคราบเขม่าและไอเสียบนแผงด้านหน้าชั้นล่าง (ต่ำกว่าชั้น 5) สะสมเร็วกว่ามากและต้องทำความสะอาดรายไตรมาสในพื้นที่การจราจรสูง ซิลิโคนซีแลนท์บนด้านใต้และตะวันตกได้รับ UV สูงสุดและควรกำหนดรอบการเปลี่ยน 7 ปีแทนมาตรฐาน 10 ปี`,
    specs: [
      { label: "Clean Cycle", value: "Annual (Q3 monthly in lower floors)" },
      { label: "Sealant Replace", value: "7 yrs (S/W elevation), 10 yrs (N/E)" },
      { label: "Adhesion Test", value: "Every 3 years" },
      { label: "Drainage Check", value: "Post-monsoon season" },
      { label: "Standard", value: "CWCT TN 12, HAGX PM-001" },
    ],
  },
];
