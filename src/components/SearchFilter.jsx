"use client";

import { FiSearch } from "react-icons/fi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (term, key) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const inputClass =
    "w-full font-mono text-sm text-[#2B1A0E] bg-white border-[2px] border-[#2B1A0E] px-4 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";
  const labelClass =
    "font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  return (
    <div className="bg-[#FAF8F5] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Search by name..."
            className={`${inputClass} pl-12 rounded-full border-none bg-white text-base`}
            defaultValue={searchParams.get("search")?.toString() || ""}
            onChange={(e) => handleFilterChange(e.target.value, "search")} // টাইপ করলেই URL চেঞ্জ হবে
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#2B1A0E]" />
        </div>

        <div>
          <label className={labelClass}>Species</label>
          <select
            className={`${inputClass} rounded-full`}
            defaultValue={searchParams.get("species")?.toString() || ""}
            onChange={(e) => handleFilterChange(e.target.value, "species")}
          >
            <option value="">All Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Rabbit">Rabbit</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
