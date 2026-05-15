import Image from "next/image";
import Link from "next/link";
import stylesData from "../../data/styles.json";

export default function StylesGallery() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Styles & Gallery</h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          Explore our collection of custom textures and styles to find the perfect match for your landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {stylesData.map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            className="group block overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={style.heroImage}
                alt={style.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {style.name}
              </h2>
              <p className="text-zinc-600 line-clamp-2">
                {style.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
