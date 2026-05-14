import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "../../components/Button";
import stylesData from "../../../data/styles.json";

interface StyleData {
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  features: string[];
  mowerEdgeCompatible: boolean;
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

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={style.heroImage}
          alt={style.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {style.name}
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto">
              {style.description}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose This Style Section */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose This Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {style.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  {/* Checkmark icon placeholder */}
                  <svg
                    className="w-6 h-6 text-white"
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
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/estimate" className="text-lg px-8 py-4">
              Get an Estimate for {style.name}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
