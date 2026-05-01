"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function BorrowButton({ bookId, bookTitle, isAlreadyBorrowed }) {
  const [isBorrowing, setIsBorrowing] = useState(false);
  const router = useRouter();

  const handleBorrow = async () => {
    if (isAlreadyBorrowed) {
      router.push("/profile");
      return;
    }
    
    setIsBorrowing(true);
    
    try {
      const response = await fetch("/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">Action Confirmed</span>
            <span className="text-sm text-gray-600">"{bookTitle}" has been added to your library.</span>
          </div>,
          {
            style: {
              background: "#FAFAFA",
              color: "#111827",
              border: "1px solid #E5E7EB",
              borderRadius: "0.5rem",
            },
            icon: <span className="text-[#D4AF37]">✓</span>,
          }
        );
        router.refresh();
      } else {
        toast.error(data.error || "Failed to borrow book");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <button
      onClick={handleBorrow}
      disabled={isBorrowing}
      className={`w-full font-semibold py-3.5 px-4 rounded-full transition-all duration-300 flex justify-center items-center font-sans tracking-wide shadow-md ${
        isAlreadyBorrowed 
        ? "bg-[#D4AF37] hover:bg-[#b8952b] text-white" 
        : "bg-[#0F172A] hover:bg-gray-800 text-white"
      } shadow-gray-200`}
    >
      {isBorrowing ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : isAlreadyBorrowed ? (
        <span className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Already Borrowed - View in Shelf</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Borrow This Book</span>
        </span>
      )}
    </button>
  );
}

