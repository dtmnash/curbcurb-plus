import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-xl text-primary mb-4">CurbCurb</h3>
            <p className="text-gray-400 text-sm">
              Providing modern, clean services to our local communities.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/styles-gallery" className="hover:text-primary transition-colors">Styles & Gallery</Link></li>
              <li><Link href="/process" className="hover:text-primary transition-colors">The Process</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Omaha</li>
              <li>Lincoln</li>
              <li>Elkhorn</li>
              <li>Papillion</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CurbCurb. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
