"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "FEATURES", href: "#features" },
    { name: "PRICING", href: "#pricing" },
    { name: "CONTACT", href: "#contact" },
    { name: "INSTAGRAM", href: "#" },
    { name: "LINKEDIN", href: "#" },
  ];

  return (
    <footer className="w-full bg-background border-t border-[#2A2A2D] py-12 px-6 md:px-12 relative z-10">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        
        {/* Logo */}
        <div className="font-heading text-3xl tracking-widest">
          <span className="text-white">FUTSAL</span>{" "}
          <span className="text-primary">NEPAL</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="font-mono text-[11px] text-muted tracking-wide">
          &copy; {currentYear} FUTSAL NEPAL
        </div>
      </div>

      {/* Built in Label */}
      <div className="mt-16 text-center">
        <span className="font-mono text-[10px] uppercase text-muted/50 tracking-[0.2em]">
          BUILT IN NEPAL 🇳🇵
        </span>
      </div>
    </footer>
  );
}
