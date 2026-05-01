"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUser, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhotoURL(session.user.photoURL || session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#111827]"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await updateUser({
        name,
        image: photoURL,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/profile");
      }
    } catch (err) {
      toast.error("An error occurred during update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-md w-full bg-white rounded-xl premium-shadow overflow-hidden border border-gray-100">
        <div className="px-8 py-10">
          <div className="flex items-center mb-8">
            <Link href="/profile" className="text-gray-400 hover:text-[#111827] transition-colors mr-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </Link>
            <h2 className="text-2xl font-serif text-[#111827]">Update Information</h2>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2 font-sans">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] sm:text-sm font-sans transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] mb-2 font-sans">
                Profile Image URL
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#111827] focus:border-[#111827] sm:text-sm font-sans transition-colors"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#0F172A] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors mt-4"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
