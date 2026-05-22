"use client";

const AddPetPage = () => {
  const inputClass =
    "w-full font-mono text-sm text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060] rounded-none";

  const labelClass =
    "font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const res = await fetch("http://localhost:5000/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
  }

  return (
    <div className="min-h-screen bg-[#F5EDE0] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs text-[#7B4F2E] uppercase tracking-widest mb-2">
            ✦ Dashboard / Action
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-[#2B1A0E]">
            Add A New Pet
          </h1>
          <p className="font-mono text-xs text-[#7B4F2E] mt-2">
            Fill up the details to list a pet for adoption.
          </p>
        </div>

        {/* Form Container/Card */}
        <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-6 md:p-10">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pet Name */}
              <div>
                <label className={labelClass}>Pet Name ✦</label>
                <input
                  name="petName"
                  type="text"
                  placeholder="e.g. Buddy"
                  required
                  className={inputClass}
                />
              </div>

              {/* Species Dropdown */}
              <div>
                <label className={labelClass}>Species ✦</label>
                <select name="species" required className={inputClass}>
                  <option value="">Select Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Breed */}
              <div>
                <label className={labelClass}>Breed ✦</label>
                <input
                  name="breed"
                  type="text"
                  placeholder="e.g. Golden Retriever"
                  required
                  className={inputClass}
                />
              </div>

              {/* Age */}
              <div>
                <label className={labelClass}>Age ✦</label>
                <input
                  name="age"
                  type="text"
                  placeholder="e.g. 2 Years or 6 Months"
                  required
                  className={inputClass}
                />
              </div>

              {/* Gender Dropdown */}
              <div>
                <label className={labelClass}>Gender ✦</label>
                <select name="gender" required className={inputClass}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className={labelClass}>
                  Image URL (imgbb/postimage) ✦
                </label>
                <input
                  name="imageUrl"
                  type="url"
                  placeholder="https://imgbb.com/your-pet-image.jpg"
                  required
                  className={inputClass}
                />
              </div>

              {/* Health Status */}
              <div>
                <label className={labelClass}>Health Status ✦</label>
                <input
                  name="healthStatus"
                  type="text"
                  placeholder="e.g. Healthy / Minor Allergy"
                  required
                  className={inputClass}
                />
              </div>

              {/* Vaccination Status Dropdown */}
              <div>
                <label className={labelClass}>Vaccination Status ✦</label>
                <select
                  name="vaccinationStatus"
                  required
                  className={inputClass}
                >
                  <option value="">Select Status</option>
                  <option value="Fully Vaccinated">Fully Vaccinated</option>
                  <option value="Partially Vaccinated">
                    Partially Vaccinated
                  </option>
                  <option value="Not Vaccinated">Not Vaccinated</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className={labelClass}>Location ✦</label>
                <input
                  name="location"
                  type="text"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  required
                  className={inputClass}
                />
              </div>

              {/* Adoption Fee */}
              <div>
                <label className={labelClass}>Adoption Fee ($) ✦</label>
                <input
                  name="adoptionFee"
                  type="number"
                  placeholder="e.g. 50 (0 for free)"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Full Width Fields */}

            {/* Owner Email (Auto-filled & Read Only) */}
            <div>
              <label className={labelClass}>Owner Email (Read Only)</label>
              <input
                name="ownerEmail"
                type="email"
                value="user@example.com"
                readOnly
                className={`${inputClass} cursor-not-allowed bg-[#F5EDE0] text-[#7B4F2E]`}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description ✦</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Tell us about the pet's behavior, habits, and why they need a new home..."
                required
                className={`${inputClass} resize-none`}
              ></textarea>
            </div>

            {/* Dashed Separator Line */}
            <hr className="border-t-2 border-dashed border-[#C9922A] my-2" />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-4 shadow-[6px_6px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 cursor-pointer"
            >
              ✦ List This Pet For Adoption
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
