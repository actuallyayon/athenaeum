import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 reveal">
            <h1 className="text-5xl md:text-7xl text-[#0F172A] font-serif mb-6 tracking-tight">Contact Us</h1>
            <p className="text-lg text-gray-500 font-sans font-light max-w-2xl mx-auto leading-relaxed">
              Whether you're inquiring about institutional access, looking for a rare title, or simply wish to discuss literature, our curators are here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-gray-100 reveal">
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 font-sans">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#FDFBF7] border-none rounded-sm py-3 px-4 text-sm focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 font-sans">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#FDFBF7] border-none rounded-sm py-3 px-4 text-sm focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 font-sans">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full bg-[#FDFBF7] border-none rounded-sm py-3 px-4 text-sm focus:ring-1 focus:ring-[#D4AF37] transition-all outline-none resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button className="w-full bg-[#0F172A] text-white py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-gray-800 transition-all shadow-md">
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12 reveal">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-4 font-sans">General Inquiries</h3>
                <p className="text-xl text-[#0F172A] font-serif">actuallyayon@gmail.com</p>
                <p className="text-sm text-[#0F172A] font-serif mt-2">+880 1XXX-XXXXXX</p>
                <p className="text-sm text-gray-400 mt-2 font-sans italic">Expect a response within 24 hours.</p>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-4 font-sans">Institutional Access</h3>
                <p className="text-xl text-[#0F172A] font-serif">partners@athenaeum.lib</p>
                <p className="text-sm text-gray-400 mt-2 font-sans">For regional libraries and educational centers.</p>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] mb-4 font-sans">Visit Our Studio</h3>
                <p className="text-[#0F172A] font-serif leading-relaxed">
                  Khulna, Bangladesh<br />
                  Digital Curation Wing
                </p>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <div className="flex space-x-6 text-[#0F172A]">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors font-sans text-[10px] uppercase tracking-widest font-bold">Instagram</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors font-sans text-[10px] uppercase tracking-widest font-bold">Twitter</a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors font-sans text-[10px] uppercase tracking-widest font-bold">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
