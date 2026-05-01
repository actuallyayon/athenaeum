"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BOOKS_PER_PAGE = 6;

function BrowseContent({ initialBooks }) {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("q") || "";
  
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearch(q);
    }
  }, [searchParams]);

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  const categories = ["All Books", "Story", "Tech", "Science"];

  const filteredBooks = useMemo(() => {
    return initialBooks.filter((book) => {
      const matchesCategory = selectedCategory === "All Books" || book.category === selectedCategory;
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                            book.author.toLowerCase().includes(search.toLowerCase()) ||
                            book.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialBooks, search, selectedCategory]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  
  const currentBooks = useMemo(() => {
    const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
    const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
    return filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  }, [filteredBooks, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-16 mt-8">
      {/* Sidebar */}
      <aside className="w-full md:w-48 flex-shrink-0">
        <h3 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-8 font-sans font-bold">Categories</h3>
        <ul className="space-y-6">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`text-[13px] font-sans w-full text-left transition-all duration-300 flex items-center group ${
                  selectedCategory === category 
                    ? "text-[#0F172A] font-semibold" 
                    : "text-gray-400 hover:text-[#0F172A]"
                }`}
              >
                <div className={`w-[2px] h-4 bg-[#0F172A] mr-4 transition-all duration-300 ${
                  selectedCategory === category ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}></div>
                <span className={selectedCategory === category ? "" : "group-hover:translate-x-1 transition-transform"}>
                  {category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Search Bar */}
        <div className="relative mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F3F4F6] border border-gray-100 rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37]/50 font-sans text-sm transition-all shadow-sm"
          />
        </div>

        <div className="flex justify-between items-baseline mb-12 border-b border-gray-100 pb-6">
          <h2 className="text-4xl text-[#0F172A] font-serif">Browse Collection</h2>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-sans">Showing {filteredBooks.length} titles</p>
        </div>

        {currentBooks.length === 0 ? (
          <div className="py-32 text-center text-gray-400 font-sans italic">
            No literary works found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {currentBooks.map((book) => (
              <div key={book.id} className="group flex flex-col bg-white rounded-[1.5rem] premium-shadow hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 overflow-hidden">
                <Link href={`/book/${book.id}`} className="relative aspect-[3/4.5] w-full bg-[#F5F1E8] mb-0 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-none">
                  <Image 
                    src={book.image_url} 
                    alt={book.title} 
                    fill 
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/5 transition-colors duration-500"></div>
                </Link>
                
                <div className="flex flex-col space-y-1.5 p-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4A26A] font-bold">
                    {book.category}
                  </span>
                  <Link href={`/book/${book.id}`} className="text-xl text-[#0F172A] font-serif group-hover:text-[#D4A26A] transition-colors line-clamp-1">
                    {book.title}
                  </Link>
                  <p className="text-sm text-[#0F172A]/60 font-sans italic">{book.author}</p>
                </div>
                
                <div className="mt-0 pt-6 border-t border-gray-50 px-6 pb-6">
                  <Link 
                    href={`/book/${book.id}`}
                    className="inline-block text-[10px] uppercase tracking-[0.2em] font-sans font-bold border-b border-transparent hover:border-[#0F172A] transition-all pb-1"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center space-x-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 transition-colors ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-[#0F172A] hover:bg-[#F3F4F6]'}`}
            >
              &larr;
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-sans text-sm transition-all ${
                  currentPage === i + 1 
                    ? "bg-[#0F172A] text-white shadow-lg shadow-black/10 scale-110" 
                    : "border border-gray-100 text-[#0F172A]/40 hover:text-[#0F172A] hover:bg-[#F3F4F6]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 transition-colors ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-[#0F172A] hover:bg-[#F3F4F6]'}`}
            >
              &rarr;
            </button>
          </div>
        )}
        
        <div className="mt-24 pt-12 border-t border-gray-100">
          <Link href="/" className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#0F172A] hover:text-[#D4A26A] transition-colors flex items-center group">
            <span className="mr-3 group-hover:-translate-x-1 transition-transform">←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BrowseClient({ initialBooks }) {
  return (
    <Suspense fallback={<div className="py-20 text-center font-sans text-gray-400">Loading catalog...</div>}>
      <BrowseContent initialBooks={initialBooks} />
    </Suspense>
  );
}


