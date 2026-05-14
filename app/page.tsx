import EstimateForm from "./components/EstimateForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold font-lexend text-gray-900 sm:text-4xl">
          Get a Free Estimate
        </h1>
        <p className="mt-4 text-lg text-gray-500 font-inter">
          Tell us about your project and we&apos;ll get back to you with a free, no-obligation estimate.
        </p>
      </div>
      <EstimateForm />
    </div>
  );
}
