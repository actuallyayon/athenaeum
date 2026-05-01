import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl text-[#0F172A] font-serif mb-12 tracking-tight">Terms of Service</h1>
        <div className="prose prose-lg text-gray-600 font-sans font-light leading-relaxed space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4A26A] font-bold">Last Updated: April 30, 2026</p>
          
          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Athenaeum, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our digital library services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">2. Use of Service</h2>
            <p>
              Athenaeum provides a curated digital library for personal, non-commercial use. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate account information</li>
              <li>Maintain the confidentiality of your credentials</li>
              <li>Use the borrowed works responsibly and in accordance with copyright laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">3. Borrowing Rules</h2>
            <p>
              Our collection is curated for the community. When you borrow a digital work:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Digital titles are added to your personal library for a limited duration</li>
              <li>You may not reproduce, redistribute, or publicly perform any works from our collection</li>
              <li>Abuse of borrowing privileges may lead to account suspension</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">4. Intellectual Property</h2>
            <p>
              All content available through Athenaeum, including text, graphics, logos, and the curated collection itself, is the property of Athenaeum or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">5. Limitation of Liability</h2>
            <p>
              Athenaeum is provided "as is" without any warranties. We are not liable for any damages arising from your use of the service or inability to access certain literary works.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the platform after changes are posted constitutes your acceptance of the new Terms of Service.
            </p>
          </section>

          <section className="pt-12 border-t border-gray-200">
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">Inquiries</h2>
            <p>
              For any questions regarding these terms, please contact our legal team at <span className="text-[#D4A26A] border-b border-[#D4A26A]/30">legal@athenaeum.lib</span>.
            </p>
          </section>
        </div>
        
        <div className="mt-20">
          <Link href="/" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#0F172A] hover:text-[#D4A26A] transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
