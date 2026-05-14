import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceAreaTemplate from "@/app/components/ServiceAreaTemplate";
import locationsData from "@/data/locations.json";

// In Next.js 15, dynamic route params must be awaited.
// The `params` object is a Promise that resolves to the route parameters.
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = locationsData.find((loc) => loc.slug === resolvedParams.slug);

  if (!location) {
    return {
      title: "Service Area Not Found",
    };
  }

  return {
    title: `Custom Landscape Curbing in ${location.name} | Curb Curb`,
    description: `Upgrade your ${location.name} property with permanent, maintenance-free concrete landscape edging. Get a free estimate from Curb Curb today.`,
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const resolvedParams = await params;
  const location = locationsData.find((loc) => loc.slug === resolvedParams.slug);

  if (!location) {
    notFound();
  }

  return <ServiceAreaTemplate city={location.name} />;
}
