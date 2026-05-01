import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl text-[#0F172A] font-serif mb-12 tracking-tight">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600 font-sans font-light leading-relaxed space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4A26A] font-bold">Effective Date: April 30, 2026</p>
          
          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">Introduction</h2>
            <p>
              At Athenaeum, we hold your privacy in the same high regard as we do the literary works in our collection. This Privacy Policy describes how we collect, use, and protect your personal information when you use our digital library services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">Information We Collect</h2>
            <p>
              We collect information to provide a better experience to all our readers. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email address, password)</li>
              <li>Reading preferences and borrowing history</li>
              <li>Device and browser information for technical optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">How We Use Information</h2>
            <p>
              Your data is used solely to enhance your literary journey:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To manage your digital library and borrowing records</li>
              <li>To provide personalized book recommendations</li>
              <li>To maintain the security and integrity of our platform</li>
            </ul>
            <p className="mt-4 italic">
              We never sell your data to third parties. Your reading habits are your own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">Data Security</h2>
            <p>
              We implement industry-standard encryption and security measures to protect your personal information. Our database is secured with modern protocols to ensure your data remains confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data at any time. You can manage these settings directly through your profile or by contacting our support team.
            </p>
          </section>

          <section className="pt-12 border-t border-gray-200">
            <h2 className="text-2xl text-[#0F172A] font-serif mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at <span className="text-[#D4A26A] border-b border-[#D4A26A]/30">privacy@athenaeum.lib</span>.
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
