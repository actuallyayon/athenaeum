import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { client } from '@/lib/db';
import Link from 'next/link';
import BorrowButton from './BorrowButton';

async function getBookById(id) {
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const books = JSON.parse(jsonData);
  return books.find(b => b.id === id);
}

export default async function BookPage({ params }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;
  const book = await getBookById(id);

  const db = client.db();
  const borrowsCollection = db.collection("borrows");
  const existingBorrow = await borrowsCollection.findOne({
    userId: session.user.id,
    bookId: id
  });

  const isAlreadyBorrowed = !!existingBorrow;

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center bg-[#FAFAFA]">
        <h1 className="text-4xl text-[#0F172A] font-serif mb-4">Literary work not found</h1>
        <Link href="/browse" className="text-[#D4A26A] font-sans uppercase tracking-widest text-xs font-bold">Return to catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 w-full bg-[#FAFAFA]">
      {/* Back Button */}
      <div className="mb-8 md:mb-12">
        <Link 
          href="/browse" 
          className="inline-flex items-center text-[10px] uppercase tracking-[0.25em] font-bold text-[#D4A26A] hover:text-[#0F172A] transition-all group"
        >
          <span className="mr-3 group-hover:-translate-x-1 transition-transform">←</span> Back to Catalog
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
        {/* Left: Book Cover */}
        <div className="w-full lg:w-1/2 flex justify-center lg:sticky lg:top-32">
          <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[3/4.5] book-shadow rounded-sm overflow-hidden group">
            <Image 
              src={book.image_url} 
              alt={book.title} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              priority
            />
          </div>
        </div>

        {/* Right: Book Details */}
        <div className="w-full lg:w-1/2 flex flex-col mt-10 lg:mt-0">
          <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-[#D4AF37] text-white text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-sm whitespace-nowrap">
              {book.category}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#0F172A]/40 font-sans uppercase tracking-[0.15em] font-medium">Published 1992</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl text-[#0F172A] font-serif mb-4 leading-tight tracking-tight">{book.title}</h1>
          <p className="text-xl sm:text-2xl text-[#0F172A]/60 font-serif italic mb-8 sm:mb-12 border-b border-gray-100 pb-8 sm:pb-10">{book.author}</p>
          
          <div className="prose prose-sm sm:prose-lg text-[#0F172A] font-sans font-light mb-12 sm:mb-16 leading-relaxed">
            <p>{book.description}</p>
          </div>

          <div className="bg-[#F3F4F6] border border-gray-100 rounded-sm p-6 sm:p-8 shadow-sm mb-12 sm:mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#D4AF37]/5 rounded-bl-full flex items-center justify-center pl-4 pb-4 sm:pl-6 sm:pb-6">
               <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/>
               </svg>
            </div>
            <div className="flex justify-between items-start mb-8 sm:mb-10">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-serif text-[#0F172A]">{book.available_quantity} copies available</span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#0F172A]/40 font-bold">Hampden Campus Library</span>
                </div>
              </div>
            </div>
            
            <BorrowButton bookId={book.id} bookTitle={book.title} isAlreadyBorrowed={isAlreadyBorrowed} />
          </div>

          <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-10 border-t border-gray-100">
            <div className="flex justify-between items-baseline group">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#0F172A]/40">ISBN</span>
              <span className="text-xs sm:text-sm font-sans text-[#0F172A] font-medium tracking-wide">978-0-123456-47-2</span>
            </div>
            <div className="flex justify-between items-baseline group">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#0F172A]/40">Pages</span>
              <span className="text-xs sm:text-sm font-sans text-[#0F172A] font-medium tracking-wide">350</span>
            </div>
            <div className="flex justify-between items-baseline group">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#0F172A]/40">Publisher</span>
              <span className="text-xs sm:text-sm font-sans text-[#0F172A] font-medium tracking-wide italic">Athenaeum Press</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

