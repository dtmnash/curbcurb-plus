import Link from "next/link";

export default function MobileFAB() {
  return (
    <div className="md:hidden fixed bottom-6 right-6 z-50">
      <Link
        href="/estimate"
        className="flex items-center justify-center bg-primary text-white p-4 rounded-xl shadow-lg hover:bg-primary/90 transition-transform active:scale-95"
        aria-label="Get a Free Estimate"
      >
        <span className="font-heading font-semibold">Free Estimate</span>
      </Link>
    </div>
  );
}
