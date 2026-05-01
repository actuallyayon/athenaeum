"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (err) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("An error occurred with Google login");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4 bg-[#FAFAFA]">
      <div className="max-w-md w-full bg-white rounded-sm shadow-2xl shadow-black/5 overflow-hidden border border-gray-100 relative">
        {/* Gold Accent Top Border */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]"></div>
        
        <div className="px-10 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-[#0F172A] mb-4 tracking-tight">Welcome Back</h2>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-sans">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#0F172A] font-sans">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#FDFBF7] border border-gray-100 rounded-sm focus:outline-none focus:ring-0 focus:border-[#D4AF37]/30 text-sm font-sans transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-[#0F172A] font-sans">
                  Password
                </label>
                <Link href="#" className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#D4A26A] hover:text-[#0F172A] transition-colors font-sans">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-300 group-focus-within:text-[#D4AF37] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#FDFBF7] border border-gray-100 rounded-sm focus:outline-none focus:ring-0 focus:border-[#D4AF37]/30 text-sm font-sans transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-4 px-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold text-white bg-[#0F172A] hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 cursor-pointer"
            >
              {loading ? "Signing in..." : "Login →"}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-50"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="px-4 bg-white text-gray-400 font-sans tracking-[0.3em] font-bold">OR</span>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center py-4 px-4 border border-gray-100 rounded-full bg-white text-[10px] uppercase tracking-[0.15em] font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm font-sans cursor-pointer group"
              >
                <svg className="h-4 w-4 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center text-[10px] uppercase tracking-[0.15em] font-bold font-sans text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#D4A26A] hover:text-[#0F172A] transition-all border-b border-[#D4A26A]/30">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

