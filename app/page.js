import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import Testimonials from '@/components/Testimonials';

async function getFeaturedBooks() {
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const books = JSON.parse(jsonData);
  return books.slice(0, 4); // Get top 4 books
}

export default async function Home() {
  const featuredBooks = await getFeaturedBooks();
  const collections = ["Story", "Tech", "Science", "Philosophy", "Design"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000&auto=format&fit=crop"
            alt="Athenaeum Classical Archive"
            fill
            className="object-cover brightness-[0.35] animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA]/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto reveal">
          <h1 className="text-6xl md:text-8xl text-white mb-8 font-serif tracking-tight leading-tight">Find Your Next Read</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-sans font-light leading-relaxed opacity-90">
            Curated collections for the modern intellect. Discover rare finds, contemporary masterpieces, and timeless classics in our serene digital reading room.
          </p>
          <div className="flex flex-col items-center gap-12">
            <Link
              href="/browse"
              className="inline-flex items-center bg-[#D4AF37] hover:bg-[#b8952b] text-[#0F172A] font-bold px-10 py-4 rounded-full transition-all duration-300 font-sans uppercase tracking-[0.2em] text-xs group"
            >
              Browse Now <span className="ml-3 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-4 opacity-40">
              <span className="text-[9px] uppercase tracking-[0.4em] text-white">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-[#0F172A] text-[#D4AF37] py-4 overflow-hidden border-y border-[#D4AF37]/10">
        <div className="whitespace-nowrap flex animate-marquee font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              <span className="mx-8">&bull; Special Discount on Memberships</span>
              <span className="mx-8">&bull; New Arrivals: Dune</span>
              <span className="mx-8">&bull; Curated Monthly Picks Available Now</span>
              <span className="mx-8">&bull; New Arrivals: The Alchemist</span>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Collections Chips */}
      <section className="pt-16 pb-8 px-4 bg-white/30 reveal">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-8 font-sans">Curated Collections</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {collections.map(item => (
              <Link
                key={item}
                href={`/browse?q=${item}`}
                className="px-8 py-3 bg-[#F5F5F5] hover:bg-[#0F172A] hover:text-white text-[#0F172A] text-xs font-sans font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Selections */}
      <section className="pt-8 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full reveal">
        <div className="flex justify-between items-baseline mb-20">
          <h2 className="text-4xl md:text-5xl text-[#0F172A] font-serif tracking-tight">Featured Selections</h2>
          <Link href="/browse" className="text-[#D4A26A] hover:text-[#0F172A] text-[10px] uppercase tracking-[0.25em] font-bold font-sans group flex items-center transition-all">
            View All <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Card 1: Large Horizontal */}
          <div className="md:col-span-8 bg-white border border-gray-100 rounded-[2rem] transition-all duration-500 overflow-hidden group premium-shadow hover:shadow-2xl hover:shadow-black/10">
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden rounded-t-[2rem] md:rounded-t-none md:rounded-l-[2rem]">
                <Image src={featuredBooks[0].image_url} alt={featuredBooks[0].title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center w-full md:w-3/5">
                <span className="inline-block px-3 py-1 bg-[#FAFAFA] text-[#D4A26A] text-[9px] uppercase tracking-widest font-bold rounded-full mb-6 w-fit">
                  {featuredBooks[0].category}
                </span>
                <h3 className="text-3xl text-[#0F172A] font-serif mb-3 leading-tight">{featuredBooks[0].title}</h3>
                <p className="text-sm text-[#0F172A]/60 mb-6 font-sans italic">{featuredBooks[0].author}</p>
                <p className="text-sm text-[#0F172A] font-sans line-clamp-3 mb-10 leading-relaxed max-w-sm">
                  {featuredBooks[0].description}
                </p>
                <Link href={`/book/${featuredBooks[0].id}`} className="px-8 py-2.5 border border-gray-200 hover:border-[#0F172A] text-[#0F172A] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all w-fit font-sans">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Small Vertical */}
          <div className="md:col-span-4 bg-white border border-gray-100 rounded-[2rem] transition-all duration-500 overflow-hidden group premium-shadow hover:shadow-2xl hover:shadow-black/10">
            <div className="flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[2rem]">
                <Image src={featuredBooks[1].image_url} alt={featuredBooks[1].title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#FAFAFA] text-[#D4A26A] text-[9px] uppercase tracking-widest font-bold rounded-full mb-6">
                    {featuredBooks[1].category}
                  </span>
                  <h3 className="text-2xl text-[#0F172A] font-serif mb-2">{featuredBooks[1].title}</h3>
                  <p className="text-sm text-[#0F172A]/60 mb-8 font-sans italic">{featuredBooks[1].author}</p>
                </div>
                <Link href={`/book/${featuredBooks[1].id}`} className="w-full text-center py-2.5 border border-gray-200 hover:border-[#0F172A] text-[#0F172A] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all font-sans">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Small Vertical */}
          <div className="md:col-span-4 bg-white border border-gray-100 rounded-[2rem] transition-all duration-500 overflow-hidden group premium-shadow hover:shadow-2xl hover:shadow-black/10">
            <div className="flex flex-col h-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[2rem]">
                <Image src={featuredBooks[2].image_url} alt={featuredBooks[2].title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#FAFAFA] text-[#D4A26A] text-[9px] uppercase tracking-widest font-bold rounded-full mb-6">
                    {featuredBooks[2].category}
                  </span>
                  <h3 className="text-2xl text-[#0F172A] font-serif mb-2">{featuredBooks[2].title}</h3>
                  <p className="text-sm text-[#0F172A]/60 mb-8 font-sans italic">{featuredBooks[2].author}</p>
                </div>
                <Link href={`/book/${featuredBooks[2].id}`} className="w-full text-center py-2.5 border border-gray-200 hover:border-[#0F172A] text-[#0F172A] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all font-sans">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: Large Horizontal */}
          <div className="md:col-span-8 bg-white border border-gray-100 rounded-[2rem] transition-all duration-500 overflow-hidden group premium-shadow hover:shadow-2xl hover:shadow-black/10">
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden rounded-t-[2rem] md:rounded-t-none md:rounded-l-[2rem]">
                <Image src={featuredBooks[3].image_url} alt={featuredBooks[3].title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center w-full md:w-3/5">
                <span className="inline-block px-3 py-1 bg-[#FAFAFA] text-[#D4A26A] text-[9px] uppercase tracking-widest font-bold rounded-full mb-6 w-fit">
                  {featuredBooks[3].category}
                </span>
                <h3 className="text-3xl text-[#0F172A] font-serif mb-3 leading-tight">{featuredBooks[3].title}</h3>
                <p className="text-sm text-[#0F172A]/60 mb-6 font-sans italic">{featuredBooks[3].author}</p>
                <p className="text-sm text-[#0F172A] font-sans line-clamp-3 mb-10 leading-relaxed max-w-sm">
                  {featuredBooks[3].description}
                </p>
                <Link href={`/book/${featuredBooks[3].id}`} className="px-8 py-2.5 border border-gray-200 hover:border-[#0F172A] text-[#0F172A] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all w-fit font-sans">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Athenaeum Standard */}
      <section className="bg-[#0F172A] py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden reveal">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl text-white font-serif mb-6 tracking-tight">The <span className="text-[#D4AF37]">A</span>the<span className="text-[#D4AF37]">n</span>aeum Standard</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-20 font-sans font-light text-lg leading-relaxed">
            A sanctuary for the discerning reader, built on principles of curation, quality, and quiet focus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl text-white font-serif mb-4">Expert Curation</h3>
              <p className="text-gray-500 text-sm font-sans font-light leading-relaxed max-w-xs">Every title is hand-selected by literary experts, ensuring a collection of only the most impactful works.</p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl text-white font-serif mb-4">Tactile Experience</h3>
              <p className="text-gray-500 text-sm font-sans font-light leading-relaxed max-w-xs">We prioritize high-quality editions and formats that honor the physical nature of reading.</p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              </div>
              <h3 className="text-xl text-white font-serif mb-4">Deep Focus</h3>
              <p className="text-gray-500 text-sm font-sans font-light leading-relaxed max-w-xs">An interface free from distraction, designed to foster deep engagement with the text.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}

