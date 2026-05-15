import Link from "next/link";

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl text-primary">
          CurbCurb
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/styles-gallery" className="text-sm font-medium hover:text-primary transition-colors">Styles & Gallery</Link>
          <Link href="/process" className="text-sm font-medium hover:text-primary transition-colors">The Process</Link>
          <Link href="/service-areas" className="text-sm font-medium hover:text-primary transition-colors">Service Areas</Link>
          <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <div className="hidden md:block">
          <Link
            href="/estimate"
            className="bg-primary text-white px-5 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Get a Free Estimate
          </Link>
        </div>
      </div>
    </header>
  );
}
