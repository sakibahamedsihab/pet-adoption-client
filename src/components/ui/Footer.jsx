import Link from "next/link";

const Footer = () => {
  const links = [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Donate", href: "/donate" },
  ];

  return (
    <footer className="bg-[#ede8e0]">
      <div className="max-w-7xl mx-auto py-8 flex items-start justify-between gap-12">
        {/* Left — Logo + Copyright */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="text-[#7c3b1e] text-base font-medium">
              PawsHome
            </span>
          </div>
          <p className="text-[#5c4a3a] text-sm leading-relaxed max-w-[200px]">
            © 2024 PawsHome. Dedicated to finding every pet a loving home.
          </p>
        </div>

        {/* Right — Links */}
        <div className="flex flex-col gap-3">
          <span className="text-[#5c4a3a] text-xs font-semibold tracking-widest uppercase">
            Links
          </span>
          <div className="flex items-center gap-6 flex-wrap">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[#3a2a1a] no-underline hover:text-[#7c3b1e] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
