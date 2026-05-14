import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "../../components/Button";
import stylesData from "../../../data/styles.json";

interface StyleData {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  textureImage: string;
  features: string[];
  mowerEdgeCompatible: boolean;
}

export async function generateStaticParams() {
  return stylesData.map((style) => ({
    styleSlug: style.slug,
  }));
}

async function getStyle(slug: string): Promise<StyleData | undefined> {
  return (stylesData as StyleData[]).find((style) => style.slug === slug);
}

export default async function StylePage({
  params,
}: {
  params: Promise<{ styleSlug: string }>;
}) {
  const resolvedParams = await params;
  const style = await getStyle(resolvedParams.styleSlug);

  if (!style) {
    notFound();
  }

  // Structured Data (JSON-LD Product Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${style.name} Custom Curbing`,
    "description": style.description,
    "image": style.heroImage,
    "brand": {
      "@type": "Brand",
      "name": "CurbCurb"
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={style.heroImage}
          alt={style.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <div className="text-center px-4 mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-lexend text-white mb-6">
              {style.name}
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto font-inter">
              {style.description}
            </p>
          </div>
        </div>
      </section>

      {/* Texture close-up and details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={style.textureImage}
                alt={`${style.name} texture detail`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold font-lexend text-gray-900 mb-6">
                Premium Finish
              </h2>
              <p className="text-lg text-gray-600 mb-6 font-inter leading-relaxed">
                {"Experience the fine details and craftsmanship that set our " + style.name + " style apart. We use industry-leading techniques to ensure a flawless, long-lasting look that elevates your property's curb appeal."}
              </p>
              {style.mowerEdgeCompatible && (
                <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-200 font-medium font-inter">
                  <svg className="w-6 h-6 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mower Edge Compatible
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose This Style Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-lexend text-center mb-16">
            Why Choose {style.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {style.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center backdrop-blur-sm"
              >
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold font-lexend mb-2">{feature}</h3>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button href="/estimate" className="text-lg px-10 py-5 rounded-xl shadow-xl hover:scale-105 transition-transform duration-200">
              Get an Estimate for {style.name}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
