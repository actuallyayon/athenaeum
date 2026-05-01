import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop" 
            alt="Old library" 
            fill 
            className="object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl text-white mb-6 font-serif tracking-tight">Our Story</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-sans font-light leading-relaxed uppercase tracking-[0.2em]">
            Cultivating the art of reading in a digital age.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#D4A26A] font-bold font-sans">Our Philosophy</h2>
            <h3 className="text-4xl md:text-5xl text-[#0F172A] font-serif leading-tight">A Sanctuary for the Discerning Reader</h3>
            <p className="text-lg text-gray-500 font-sans font-light leading-relaxed">
              Athenaeum was born from a simple belief: that in an era of infinite content, curation is the ultimate luxury. We don't just provide access to books; we provide a curated path through the vast landscape of human thought.
            </p>
            <p className="text-lg text-gray-500 font-sans font-light leading-relaxed">
              Every title in our collection is selected not for its popularity, but for its enduring impact, its aesthetic beauty, and its ability to challenge and inspire.
            </p>
          </div>
          <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop" 
              alt="Books on a shelf" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#0F172A] py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl text-white font-serif mb-6 tracking-tight">The Three Pillars</h2>
            <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-6 group">
              <span className="text-6xl text-[#D4AF37]/20 font-serif group-hover:text-[#D4AF37]/40 transition-colors">01</span>
              <h4 className="text-xl text-white font-serif tracking-wide">Curation</h4>
              <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                We believe in the power of selection. Our editors spend thousands of hours identifying the works that truly matter.
              </p>
            </div>
            <div className="space-y-6 group">
              <span className="text-6xl text-[#D4AF37]/20 font-serif group-hover:text-[#D4AF37]/40 transition-colors">02</span>
              <h4 className="text-xl text-white font-serif tracking-wide">Accessibility</h4>
              <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                Knowledge should be accessible. We bridge the gap between rare physical archives and the convenience of digital reading.
              </p>
            </div>
            <div className="space-y-6 group">
              <span className="text-6xl text-[#D4AF37]/20 font-serif group-hover:text-[#D4AF37]/40 transition-colors">03</span>
              <h4 className="text-xl text-white font-serif tracking-wide">Experience</h4>
              <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">
                Reading is a sensory act. We design our interface to be as serene and distraction-free as a private library.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-4xl md:text-5xl text-[#0F172A] font-serif mb-10 tracking-tight">Begin Your Journey</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-12 font-sans font-light text-lg">
          Join our community of readers and scholars today and discover a world of curated literature.
        </p>
        <Link 
          href="/browse" 
          className="inline-flex items-center bg-[#0F172A] text-white font-bold px-12 py-5 rounded-full hover:bg-gray-800 transition-all duration-300 font-sans uppercase tracking-[0.2em] text-xs shadow-xl shadow-gray-200"
        >
          Explore the Catalog
        </Link>
      </section>
    </div>
  );
}
