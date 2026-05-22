"use client";

import Link from "next/link";

const LoginPage = () => {
  async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    // API কল বা অথেনটিকেশন লজিক এখানে বসবে
    console.log("Login credentials:", data);
  }

  const inputClass =
    "w-full font-mono text-sm text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";

  const labelClass =
    "font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5EDE0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-[#7B4F2E] uppercase tracking-widest mb-2">
            ✦ Welcome Back
          </p>
          <h1 className="font-serif text-4xl font-black text-[#2B1A0E]">
            PawsHome
          </h1>
          <p className="font-mono text-xs text-[#7B4F2E] mt-2">
            Login to your account.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className={labelClass}>{label}</label>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required
                  className={inputClass}
                />
              </div>
            ))}

            <hr className="border-t-2 border-dashed border-[#C9922A] my-1" />

            <button
              type="submit"
              className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer"
            >
              ✦ Login
            </button>
          </form>

          <p className="font-mono text-xs text-[#7B4F2E] text-center mt-6">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="text-[#7B1F1F] font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
