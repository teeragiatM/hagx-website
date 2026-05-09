const links = {
  บริการ: ["Curtain Wall", "หลังคากระจก", "Structural Glazing", "ฉากกั้นกระจก", "กระจกนิรภัย", "หุ้มผนังอลูมิเนียม"],
  บริษัท: ["เกี่ยวกับเรา", "ทีมงาน", "ร่วมงานกับเรา", "ใบรับรอง", "ข่าวสาร"],
  ข้อมูลกฎหมาย: ["นโยบายความเป็นส่วนตัว", "เงื่อนไขการใช้งาน"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-light tracking-[0.3em] uppercase mb-4">HAGX</div>
            <p className="text-slate-500 text-xs leading-relaxed font-light max-w-xs">
              ผู้เชี่ยวชาญด้านงานอลูมิเนียมและกระจกสถาปัตยกรรม ออกแบบและผลิตด้วยความแม่นยำ
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <nav key={group} aria-label={group}>
              <h4 className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-light mb-4">{group}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 text-xs font-light hover:text-white transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="h-px bg-slate-800 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-[11px] font-light">
            © {new Date().getFullYear()} HAGX. สงวนลิขสิทธิ์
          </p>
          <a href="#hero" className="text-[10px] tracking-widest uppercase text-slate-600 hover:text-white transition-colors font-light">
            กลับด้านบน ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
