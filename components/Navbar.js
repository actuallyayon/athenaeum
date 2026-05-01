"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          setIsMenuOpen(false);
        },
      },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="w-full bg-[#FAFAFA] border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#0F172A]">
              <span className="text-[#D4AF37]">A</span>the<span className="text-[#D4AF37]">n</span>aeum
            </Link>
          </div>

          {/* Center: Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className={`text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-all relative py-2 ${pathname === "/"
                  ? "text-[#0F172A] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#D4AF37]"
                  : "text-[#0F172A]/50 hover:text-[#0F172A]"
                }`}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={`text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-all relative py-2 flex items-center ${pathname === "/browse"
                  ? "text-[#0F172A] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#D4AF37]"
                  : "text-[#0F172A]/50 hover:text-[#0F172A]"
                }`}
            >
              Browse
              <span className="ml-2 flex h-1.5 w-1.5 relative">
                <span className="animate-pulse-gold absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
              </span>
            </Link>
            {session && (
              <Link
                href="/profile"
                className={`text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-all relative py-2 ${pathname === "/profile"
                    ? "text-[#0F172A] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#D4AF37]"
                    : "text-[#0F172A]/50 hover:text-[#0F172A]"
                  }`}
              >
                My Profile
              </Link>
            )}
            <Link
              href="/about"
              className={`text-[11px] uppercase tracking-[0.2em] font-sans font-bold transition-all relative py-2 ${pathname === "/about"
                  ? "text-[#0F172A] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#D4AF37]"
                  : "text-[#0F172A]/50 hover:text-[#0F172A]"
                }`}
            >
              About
            </Link>
          </div>

          {/* Right: Search & Auth */}
          <div className="flex items-center space-x-6">
            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#F3F4F6] border-none rounded-full py-2 px-10 text-xs font-sans w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 text-[#0F172A] placeholder:text-[#0F172A]/40"
              />
              <svg
                className="w-4 h-4 absolute left-4 text-[#0F172A]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </form>

            <div className="hidden md:flex items-center space-x-4">
              {isPending ? (
                <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
              ) : session ? (
                <div className="flex items-center space-x-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#0F172A]/60">
                    {session.user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-[#0F172A] text-white hover:bg-gray-800 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium transition-all cursor-pointer shadow-sm shadow-gray-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link
                    href="/login"
                    className="bg-[#0F172A] text-white hover:bg-gray-800 px-8 py-2.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium transition-all cursor-pointer shadow-sm shadow-gray-200"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-[#0F172A] p-2 focus:outline-none cursor-pointer"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FAFAFA] border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-sans text-[#0F172A]">Home</Link>
            <Link href="/browse" onClick={() => setIsMenuOpen(false)} className="block text-sm font-sans text-[#0F172A]">Browse</Link>
            {session && (
              <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block text-sm font-sans text-[#0F172A]">My Profile</Link>
            )}
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-sm font-sans text-[#0F172A]">About</Link>
            <div className="pt-4 border-t border-gray-100">
              {session ? (
                <button onClick={handleLogout} className="text-sm font-sans text-[#D4A26A]">Logout</button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-sans text-[#D4A26A]">Login</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

