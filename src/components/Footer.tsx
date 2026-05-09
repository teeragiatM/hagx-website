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
    <footer className="bg-bg border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold tracking-widest gold-gradient mb-3">HAGX</div>
            <p className="text-muted text-xs leading-relaxed max-w-xs">
              Premium aluminium and glass architectural solutions. Engineered for excellence. Built to endure.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <nav key={group} aria-label={`${group} links`}>
              <h4 className="text-xs font-semibold text-content mb-4">{group}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted text-xs hover:text-content transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} HAGX. All rights reserved.
          </p>
          <a
            href="#hero"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-gold-400 transition-colors"
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
