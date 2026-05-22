import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#FAF6EE] border-t-[3px] border-[#2B1A0E] px-4 py-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding & Copyright */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-3xl font-black text-[#2B1A0E]">
            PawsHome
          </h2>
          <p className="font-mono text-sm text-[#7B4F2E]">
            Find your new best friend today. Adopt, do not shop!
          </p>
          <div className="mt-auto pt-4">
            <p className="font-mono text-xs font-bold text-[#2B1A0E] uppercase tracking-widest bg-[#F5EDE0] inline-block border-[2px] border-[#2B1A0E] px-3 py-1.5 shadow-[3px_3px_0px_#2B1A0E]">
              © {new Date().getFullYear()} PawsHome
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-sm font-bold text-[#7B1F1F] uppercase tracking-widest mb-2 border-b-2 border-dashed border-[#C9922A] pb-2 inline-block w-max">
            ✦ Contact Info
          </h3>
          <p className="font-mono text-sm text-[#2B1A0E]">
            <span className="font-bold text-[#7B4F2E]">Email:</span>{" "}
            hello@pawshome.com
          </p>
          <p className="font-mono text-sm text-[#2B1A0E]">
            <span className="font-bold text-[#7B4F2E]">Phone:</span> +880 1234
            567890
          </p>
          <p className="font-mono text-sm text-[#2B1A0E]">
            <span className="font-bold text-[#7B4F2E]">Location:</span> Dhaka,
            Bangladesh
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-sm font-bold text-[#7B1F1F] uppercase tracking-widest mb-2 border-b-2 border-dashed border-[#C9922A] pb-2 inline-block w-max">
            ✦ Social Links
          </h3>
          <div className="flex flex-col gap-3">
            {["Facebook", "Twitter", "Instagram"].map((social) => (
              <Link
                key={social}
                href={`#${social.toLowerCase()}`}
                className="font-mono text-sm text-[#2B1A0E] font-bold hover:text-[#7B1F1F] hover:translate-x-[4px] transition-transform w-fit flex items-center gap-2"
              >
                <span className="text-[#C9922A]">→</span> {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
