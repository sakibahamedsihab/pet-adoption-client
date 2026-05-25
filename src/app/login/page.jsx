"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast"; // ✦ Toast ইমপোর্ট করা হলো ✦

const LoginPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    // Better Auth-এর signIn ফাংশন কল করা হচ্ছে
    const { data: authData, error } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message || "Failed to login!"); // ✦ Alert রিমুভ করে Toast ✦
      setIsSubmitting(false);
      return;
    }

    toast.success("Logged in successfully! 🎉"); // ✦ Success Toast ✦
    // লগ-ইন সফল হলে হোম পেজ বা ড্যাশবোর্ডে রিডাইরেক্ট করবে
    router.push("/");
  }

  // ✦ গুগল লগ-ইন ফাংশন ✦
  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    const { data, error } = await signIn.social({
      provider: "google",
      callbackURL: "/", // লগ-ইন সফল হলে হোম পেজে রিডাইরেক্ট করবে
    });

    if (error) {
      toast.error(error.message || "Google login failed!"); // ✦ Alert রিমুভ করে Toast ✦
      setIsGoogleSubmitting(false);
    }
  };

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
              disabled={isSubmitting || isGoogleSubmitting}
              className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#FAF6EE] bg-[#7B1F1F] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "✦ Login"}
            </button>

            {/* ✦ গুগল লগ-ইন বাটন ✦ */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting || isGoogleSubmitting}
              className="w-full font-mono font-bold text-xs uppercase tracking-widest text-[#2B1A0E] bg-[#FAF6EE] border-[2px] border-[#2B1A0E] py-3 shadow-[5px_5px_0px_#2B1A0E] hover:shadow-[2px_2px_0px_#2B1A0E] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isGoogleSubmitting ? "Connecting..." : "Continue with Google"}
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
