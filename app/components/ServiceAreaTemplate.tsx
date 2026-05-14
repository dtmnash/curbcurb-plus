import React from "react";

interface ServiceAreaTemplateProps {
  city: string;
}

export default function ServiceAreaTemplate({ city }: ServiceAreaTemplateProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Curb Curb",
    telephone: "(402) 577-0699",
    address: {
      "@type": "PostalAddress",
      streetAddress: "P.O. Box 683",
      addressLocality: "Gretna",
      addressRegion: "NE",
      postalCode: "68028",
    },
    areaServed: {
      "@type": "City",
      name: city,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A] font-lexend">
            Custom Concrete Curbing in {city}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-inter">
            Upgrade your {city} property with permanent, maintenance-free concrete landscape edging.
          </p>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-[#1A1A1A] font-lexend">
              Why Choose Curb Curb in {city}?
            </h2>
            <ul className="text-left space-y-4 text-gray-600 font-inter max-w-2xl mx-auto">
              <li className="flex items-start">
                <span className="text-[#F05A28] mr-2">✓</span>
                Custom designs tailored to your landscape
              </li>
              <li className="flex items-start">
                <span className="text-[#F05A28] mr-2">✓</span>
                Durable and long-lasting concrete solutions
              </li>
              <li className="flex items-start">
                <span className="text-[#F05A28] mr-2">✓</span>
                Professional installation by experienced teams
              </li>
              <li className="flex items-start">
                <span className="text-[#F05A28] mr-2">✓</span>
                Enhances property value and curb appeal
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-block bg-[#F05A28] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors font-inter"
              >
                Get a Free Estimate in {city}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
