import Image from "next/image";
import Link from "next/link";
// import PetDetailTopBar from "./PetDetailTopBar";

export default function PetDetailCard({ pet }) {
  const {
    petName,
    breed = "Golden Retriever Mix",
    type = "Dog",
    age = "2 Years",
    size = "Medium",
    gender = "Male",
    location = "Seattle, WA",
    adoptionFee = 150,
    imageURL = "/placeholder.jpg",
    description = "",
    healthTags = ["Vaccinated", "Neutered", "Microchipped", "House Trained"],
  } = pet ?? {};

  const stats = [
    { icon: "🗓", label: "Age", value: age },
    { icon: "⚖️", label: "Size", value: size },
    { icon: "♂", label: "Sex", value: gender },
    { icon: "📍", label: "Location", value: location },
  ];

  const inputClass =
    "w-full font-mono text-xs text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-3 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";

  const labelClass =
    "font-mono text-[10px] font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* <PetDetailTopBar key={pet._id} pet={pet} /> */}

        <div className="flex gap-8 items-start">
          {/* LEFT */}
          <div className="flex-1">
            {/* Image */}
            <div className="relative border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] overflow-hidden h-[340px] mb-6">
              <Image
                src={imageURL}
                alt={petName}
                fill
                className="object-cover"
                priority
              />
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#C9922A] border-[2px] border-[#2B1A0E] px-3 py-1 shadow-[3px_3px_0px_#2B1A0E]">
                <span className="font-mono text-[10px] font-bold text-[#2B1A0E] uppercase tracking-widest">
                  🐾 Looking for a home
                </span>
              </div>
            </div>

            {/* Name + Fee */}
            <div className="flex items-start justify-between mb-1">
              <h1 className="font-serif text-5xl font-black text-[#2B1A0E]">
                {petName}
              </h1>
              <div className="text-right">
                <p className="font-serif text-3xl font-black text-[#7B1F1F]">
                  ${adoptionFee}
                </p>
                <p className="font-mono text-[10px] text-[#7B4F2E] uppercase tracking-widest">
                  Adoption Fee
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-[#7B4F2E] uppercase tracking-widest mb-6">
              {type} · {breed}
            </p>

            <hr className="border-t-2 border-dashed border-[#C9922A] mb-6" />

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-8">
              {stats.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="bg-[#FAF6EE] border-[2px] border-[#2B1A0E] shadow-[4px_4px_0px_#2B1A0E] p-3 text-center"
                >
                  <p className="text-lg mb-1">{icon}</p>
                  <p className="font-serif text-sm font-black text-[#2B1A0E]">
                    {value}
                  </p>
                  <p className="font-mono text-[9px] text-[#7B4F2E] uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Health & Vitals */}
            <div className="mb-8">
              <h2 className="font-serif text-xl font-black text-[#2B1A0E] mb-3">
                Health & Vitals
              </h2>
              <div className="flex flex-wrap gap-2">
                {healthTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] font-bold text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] px-3 py-1 uppercase tracking-widest shadow-[2px_2px_0px_#2B1A0E]"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <hr className="border-t-2 border-dashed border-[#C9922A] mb-6" />

            {/* Meet section */}
            <div>
              <h2 className="font-serif text-2xl font-black text-[#2B1A0E] mb-3">
                Meet {petName}
              </h2>
              <p className="font-mono text-xs text-[#4A2E1A] leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* RIGHT — Adoption Form */}
          <div className="w-[280px] flex-shrink-0 sticky top-6">
            <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6">
              <p className="font-mono text-[10px] text-[#7B4F2E] uppercase tracking-widest mb-1">
                ✦ Adopt
              </p>
              <h3 className="font-serif text-2xl font-black text-[#2B1A0E] mb-1">
                Ready to adopt?
              </h3>
              <p className="font-mono text-[10px] text-[#7B4F2E] mb-5 leading-relaxed">
                Send an inquiry to the shelter to start the process.
              </p>

              <hr className="border-t-2 border-dashed border-[#C9922A] mb-5" />

              <form className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Jane Doe"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Preferred Meet & Greet Date
                  </label>
                  <input
                    type="date"
                    name="meetDate"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Message to Shelter</label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us about your home environment..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer"
                >
                  Submit Request ↗
                </button>

                <p className="font-mono text-[9px] text-[#A08060] text-center leading-relaxed">
                  Submitting a request does not guarantee adoption. The shelter
                  will contact you to proceed.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
