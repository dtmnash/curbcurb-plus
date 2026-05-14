import Link from "next/link";
import locationsData from "@/data/locations.json";

export const metadata = {
  title: "Service Areas | Curb Curb",
  description: "View our service areas for custom concrete landscape curbing.",
};

export default function ServiceAreas() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A] font-lexend">
          Our Service Areas
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 font-inter">
          We proudly serve the following communities with permanent, maintenance-free concrete landscape edging.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {locationsData.map((location) => (
            <Link
              key={location.slug}
              href={`/service-areas/${location.slug}`}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:border-[#F05A28] hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-bold text-[#1A1A1A] font-lexend">
                {location.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
