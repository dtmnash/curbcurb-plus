import Image from "next/image";
import Link from "next/link";
import stylesData from "../../data/styles.json";

export const metadata = {
  title: "Style Lookbook - CurbCurb",
  description: "Browse our collection of custom curbing styles including Milled Slate, Natural Stone, Moroccan, Brick, and Wood Grain.",
};

export default function StylesIndexPage() {
  return (
    <div className="bg-zinc-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold font-lexend text-gray-900 sm:text-5xl">
            Style Lookbook
          </h1>
          <p className="mt-4 text-xl text-gray-500 font-inter max-w-2xl mx-auto">
            Discover the perfect texture and style to complement your home&apos;s landscape. Explore our premium options below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylesData.map((style) => (
            <Link
              key={style.slug}
              href={`/styles/${style.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={style.heroImage}
                  alt={style.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold font-lexend text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {style.name}
                </h2>
                <p className="text-gray-600 font-inter mb-4 flex-1">
                  {style.description}
                </p>
                <div className="flex items-center text-primary font-medium">
                  View Details
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
