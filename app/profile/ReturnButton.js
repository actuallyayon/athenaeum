
"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ReturnButton({ bookId, bookTitle }) {
  const [isReturning, setIsReturning] = useState(false);
  const router = useRouter();

  const handleReturn = async (e) => {
    e.preventDefault(); // Prevent navigation from Link parent
    e.stopPropagation();

    if (!confirm(`Are you sure you want to return "${bookTitle}"?`)) return;

    setIsReturning(true);
    
    try {
      const response = await fetch("/api/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">Book Returned</span>
            <span className="text-sm text-gray-600">"{bookTitle}" has been removed from your shelf.</span>
          </div>,
          {
            icon: <span className="text-[#D4AF37]">✓</span>,
          }
        );
        router.refresh();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to return book");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <button
      onClick={handleReturn}
      disabled={isReturning}
      className="mt-4 px-4 py-2 border border-red-100 bg-red-50/30 text-red-600 hover:bg-red-50 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all flex items-center justify-center disabled:opacity-50"
    >
      {isReturning ? "Returning..." : "Return Book"}
    </button>
  );
}
