import { ArrowUp } from "lucide-react";

const footerLinks = {
  Services: [
    "Curtain Wall Systems",
    "Skylight & Roof Glazing",
    "Structural Glazing",
    "Glass Partitions",
    "Security Glazing",
    "Aluminium Cladding",
  ],
  Company: ["About HAGX", "Our Team", "Careers", "Certifications", "News"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-2xl font-bold tracking-widest gold-gradient mb-2">
              HAGX
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              Premium aluminium and glass architectural solutions. Engineered for
              excellence. Built to endure.
            </p>
            <div className="mt-6 w-8 h-px bg-gold-400/40" />
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} aria-label={`${group} links`}>
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold-400/80 font-medium mb-4">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-500 text-xs hover:text-slate-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-[11px] tracking-wide">
            © {new Date().getFullYear()} HAGX. All rights reserved.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-slate-500 hover:text-gold-400 transition-colors"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
