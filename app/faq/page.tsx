import FaqSection from "../components/FaqSection";

export const metadata = {
  title: "Frequently Asked Questions - CurbCurb",
  description: "Find answers to your questions about custom concrete landscape curbing durability, winter weather, and cost in Nebraska.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-col w-full items-center justify-start pt-32 pb-16 bg-white dark:bg-black">
        <div className="max-w-3xl w-full mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl font-heading text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find everything you need to know about our custom concrete curbing services below.
          </p>
        </div>
        <div className="w-full bg-gray-50 dark:bg-[#111111] py-16">
          <FaqSection />
        </div>
      </main>
    </div>
  );
}
