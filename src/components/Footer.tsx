const links = {
  บริการ: ["Curtain Wall", "หลังคากระจก", "Structural Glazing", "ฉากกั้นกระจก", "กระจกนิรภัย", "หุ้มผนังอลูมิเนียม"],
  บริษัท: ["เกี่ยวกับเรา", "ทีมงาน", "ร่วมงานกับเรา", "ใบรับรอง", "ข่าวสาร"],
  ข้อมูลกฎหมาย: ["นโยบายความเป็นส่วนตัว", "เงื่อนไขการใช้งาน"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-foreground-100" role="contentinfo">
      <div className="mx-auto max-w-7xl px-8 pt-16 pb-8">
        <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 text-xl font-light tracking-[0.3em] uppercase">
              HAGX
            </div>
            <p className="max-w-xs text-xs leading-relaxed font-light text-slate-500">
              ผู้เชี่ยวชาญด้านงานอลูมิเนียมและกระจกสถาปัตยกรรม
              ออกแบบและผลิตด้วยความแม่นยำ
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <nav key={group} aria-label={group}>
              <h4 className="mb-4 text-[10px] font-light tracking-[0.25em] text-slate-500 uppercase">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs font-light text-slate-500 transition-colors duration-200 hover:text-foreground-100"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mb-6 h-px bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[11px] font-light text-slate-600">
            © {new Date().getFullYear()} HAGX. สงวนลิขสิทธิ์
          </p>
          <a
            href="#hero"
            className="text-[10px] font-light tracking-widest text-slate-600 uppercase transition-colors hover:text-foreground-100"
          >
            กลับด้านบน ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
