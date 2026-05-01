import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { client } from "@/lib/db";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import ReturnButton from "./ReturnButton";

async function getBorrowedBooks(userId) {
  const db = client.db();
  const borrowsCollection = db.collection("borrows");
  const borrows = await borrowsCollection.find({ userId }).toArray();
  const bookIds = borrows.map(b => b.bookId);

  const filePath = path.join(process.cwd(), "data", "books.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const allBooks = JSON.parse(jsonData);

  return allBooks.filter(book => bookIds.includes(book.id));
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const borrowedBooks = await getBorrowedBooks(user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="mb-16">
        <h1 className="text-5xl text-[#0F172A] font-serif mb-3 tracking-tight">Reader Profile</h1>
        <p className="text-gray-400 font-sans max-w-2xl text-sm tracking-wide uppercase">
          Manage your personal information, reading preferences, and journal subscriptions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Profile Card */}
        <div className="flex-grow space-y-12">
          <div className="bg-[#FDFBF7] rounded-sm p-10 flex flex-col md:flex-row gap-10 items-start border border-gray-100 shadow-sm">
            <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden flex-shrink-0 bg-gray-50 border-[6px] border-white shadow-sm">
              <Image 
                src={user.photoURL || user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt={user.name} 
                fill 
                className="object-cover"
              />
            </div>
            
            <div className="flex-grow flex flex-col justify-center h-full pt-4">
              <h2 className="text-4xl text-[#0F172A] font-serif mb-3">{user.name}</h2>
              <div className="flex items-center text-gray-400 mb-10 font-sans text-sm tracking-wider">
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {user.email}
              </div>
              
              <Link
                href="/profile/update"
                className="inline-flex items-center justify-center w-fit py-3 px-8 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white bg-[#0F172A] hover:bg-gray-800 transition-all shadow-md shadow-gray-200"
              >
                <svg className="w-3.5 h-3.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
                Update Information
              </Link>
            </div>
          </div>

          {/* Borrowed Books Section */}
          <div className="pt-8">
            <h3 className="text-2xl text-[#0F172A] font-serif mb-8 border-b border-gray-100 pb-4">My Library</h3>
            {borrowedBooks.length === 0 ? (
              <div className="bg-[#FDFBF7] p-12 rounded-sm text-center border border-dashed border-gray-200">
                <p className="text-gray-400 font-sans italic">Your digital shelf is currently empty.</p>
                <Link href="/browse" className="mt-4 inline-block text-[11px] uppercase tracking-widest text-[#D4A26A] font-bold hover:text-[#0F172A] transition-colors">
                  Browse Collection &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {borrowedBooks.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`} className="flex gap-6 group bg-white p-4 rounded-sm border border-gray-50 hover:shadow-md transition-all">
                    <div className="relative w-24 aspect-[3/4.5] flex-shrink-0 shadow-sm overflow-hidden">
                      <Image src={book.image_url} alt={book.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[8px] uppercase tracking-widest text-[#D4A26A] font-bold mb-1">{book.category}</span>
                      <h4 className="text-lg text-[#0F172A] font-serif leading-tight group-hover:text-[#D4A26A] transition-colors">{book.title}</h4>
                      <p className="text-xs text-gray-400 font-sans italic mt-1">{book.author}</p>
                      
                      <ReturnButton bookId={book.id} bookTitle={book.title} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="w-full lg:w-80 flex flex-col gap-8">
          <div className="bg-[#FDFBF7] rounded-sm p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/5 rounded-bl-full flex items-center justify-center pl-4 pb-4">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 className="text-lg text-[#0F172A] font-serif mb-4">Membership</h3>
            <div className="inline-block px-3 py-1 bg-white border border-gray-100 text-[#D4A26A] text-[9px] uppercase tracking-widest rounded-full font-bold mb-6">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full inline-block mr-2 animate-pulse"></span>
              Active Folio
            </div>
            <p className="text-[13px] text-gray-500 font-sans leading-relaxed">
              Your institutional access is granted through <span className="text-[#0F172A] font-medium">University College London</span>. Renews automatically next autumn.
            </p>
          </div>

          <div className="bg-[#FDFBF7] rounded-sm p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg text-[#0F172A] font-serif mb-6">Curated Interests</h3>
            <div className="flex flex-wrap gap-2">
              {["Modernist Fiction", "Aesthetics", "Cultural Criticism"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white border border-gray-50 rounded-full text-[11px] text-gray-400 font-sans uppercase tracking-wider hover:border-[#D4AF37]/30 hover:text-[#D4A26A] transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-gray-100">
        <Link href="/" className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#0F172A] hover:text-[#D4A26A] transition-colors flex items-center group">
          <span className="mr-3 group-hover:-translate-x-1 transition-transform">←</span> Back to Home
        </Link>
      </div>
    </div>
  );
}

