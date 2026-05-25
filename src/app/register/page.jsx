"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    const password = data.password;
    const confirmPassword = data.confirmPassword;

    // ✦ পিডিএফ অনুযায়ী পাসওয়ার্ড ভ্যালিডেশন (Regex) ✦
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Password must contain at least one uppercase letter (A-Z).");
      setIsSubmitting(false);
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Password must contain at least one lowercase letter (a-z).");
      setIsSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    // Better Auth-এর signUp ফাংশন কল করা হচ্ছে
    const { data: authData, error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      image: data.photoURL || "",
    });

    if (error) {
      toast.error(error.message || "Failed to register!");
      setIsSubmitting(false);
      return;
    }

    // রেজিস্ট্রেশন সফল হলে হোম পেজে পাঠিয়ে দেবে
    toast.success("Registration Successful! 🎉");
    router.push("/");
  }

  const inputClass =
    "w-full font-mono text-sm text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] px-4 py-2.5 outline-none focus:shadow-[3px_3px_0px_#2B1A0E] transition-all placeholder:text-[#A08060]";

  const labelClass =
    "font-mono text-xs font-bold text-[#7B1F1F] uppercase tracking-widest mb-1.5 block";

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Your full name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      label: "Photo URL",
      name: "photoURL",
      type: "url",
      placeholder: "https://example.com/photo.jpg",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
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
            ✦ Welcome
          </p>
          <h1 className="font-serif text-4xl font-black text-[#2B1A0E]">
            PawsHome
          </h1>
          <p className="font-mono text-xs text-[#7B4F2E] mt-2">
            Create your account today.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FAF6EE] border-[3px] border-[#2B1A0E] shadow-[8px_8px_0px_#2B1A0E] p-8">
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {fields.map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className={labelClass}>{label}</label>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  required={name !== "photoURL"}
                  className={inputClass}
                />
              </div>
            ))}

            <hr className="border-t-2 border-dashed border-[#C9922A] my-1" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating Account..." : "✦ Create Account"}
            </button>
          </form>

          <p className="font-mono text-xs text-[#7B4F2E] text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#7B1F1F] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
