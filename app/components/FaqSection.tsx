"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import faqs from "../../data/faqs.json";

export default function FaqSection() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Accordion.Root
        type="single"
        defaultValue="item-0"
        collapsible
        className="w-full rounded-xl bg-white dark:bg-[#1a1a1a] shadow-sm border border-gray-200 dark:border-gray-800"
      >
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border-b border-gray-200 dark:border-gray-800 last:border-b-0 overflow-hidden first:rounded-t-xl last:rounded-b-xl"
          >
            <Accordion.Header className="flex" asChild>
              <h2 className="w-full m-0">
                <Accordion.Trigger className="flex w-full flex-1 items-center justify-between py-4 px-5 text-left text-lg font-medium transition-all hover:bg-gray-50 dark:hover:bg-[#252525] group focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                  <span className="font-heading text-gray-900 dark:text-white m-0 text-lg group-data-[state=open]:text-primary">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </h2>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-base text-gray-600 dark:text-gray-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
              <div className="py-4 px-5 pb-5">
                {faq.answer}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
