"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";

// Types and validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(
      /^(\+?1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/,
      "Please enter a valid US phone number"
    ),
  serviceType: z.enum(["Curbing", "Sealing"], {
    message: "Please select a service type",
  }),
  footage: z.enum(
    ["Under 50 ft", "50-100 ft", "100-200 ft", "200+ ft", "Not Sure"],
    {
      message: "Please estimate your footage",
    }
  ),
  preferredStyle: z
    .enum(
      [
        "Milled Slate",
        "Natural Stone",
        "Moroccan",
        "Brick",
        "Wood Grain",
        "Undecided",
      ],
      {
        message: "Please select a preferred style",
      }
    )
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export default function EstimateForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredStyle: "", // Initialize as empty string
    },
    mode: "onTouched",
  });

  const selectedService = watch("serviceType");

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["name", "email", "phone"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["serviceType", "footage"];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    // If we're on step 3 and style is required (Curbing selected), we need to validate it
    if (selectedService === "Curbing" && (!data.preferredStyle || (data.preferredStyle as string) === "")) {
      setError("preferredStyle", { message: "Please select a preferred style" });
      return;
    }

    setIsSubmitting(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted payload:", data);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-lexend font-semibold text-gray-900 mb-2">
          Request Received!
        </h2>
        <p className="text-gray-600 font-inter mb-8">
          Thank you for requesting a free estimate. We&apos;ve received your details and will be in touch shortly to schedule your consultation.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setCurrentStep(1);
          }}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-xl transition-colors font-inter"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  // Adjust total visible steps based on selection
  const visibleSteps = selectedService === "Sealing" ? 2 : 3;

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Progress Bar Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-lexend font-semibold text-lg text-gray-800">
            Free Estimate
          </h2>
          <span className="text-sm font-medium text-gray-500 font-inter">
            Step {currentStep} of {visibleSteps}
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="flex gap-2 h-2">
          {Array.from({ length: visibleSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-all duration-300 ${
                idx < currentStep
                  ? "bg-primary"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Contact Info */}
          <div className={currentStep === 1 ? "block space-y-5 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                Full Name
              </label>
              <input
                {...register("name")}
                id="name"
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} shadow-sm outline-none transition-all`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500 font-inter">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                Email Address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} shadow-sm outline-none transition-all`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500 font-inter">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                Phone Number
              </label>
              <input
                {...register("phone")}
                id="phone"
                type="tel"
                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} shadow-sm outline-none transition-all`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-500 font-inter">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Step 2: Service & Footage */}
          <div className={currentStep === 2 ? "block space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-inter mb-3">
                Service Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`
                  relative flex cursor-pointer rounded-xl border p-4 focus:outline-none transition-all
                  ${watch("serviceType") === "Curbing"
                    ? "bg-green-50 border-primary ring-1 ring-primary"
                    : "border-gray-300 bg-white hover:bg-gray-50"}
                `}>
                  <input
                    type="radio"
                    {...register("serviceType")}
                    value="Curbing"
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className={`font-medium font-inter ${watch("serviceType") === "Curbing" ? "text-gray-900" : "text-gray-900"}`}>
                          Landscape Curbing
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`
                  relative flex cursor-pointer rounded-xl border p-4 focus:outline-none transition-all
                  ${watch("serviceType") === "Sealing"
                    ? "bg-green-50 border-primary ring-1 ring-primary"
                    : "border-gray-300 bg-white hover:bg-gray-50"}
                `}>
                  <input
                    type="radio"
                    {...register("serviceType")}
                    value="Sealing"
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <p className={`font-medium font-inter ${watch("serviceType") === "Sealing" ? "text-gray-900" : "text-gray-900"}`}>
                          Curb Sealing
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              {errors.serviceType && (
                <p className="mt-2 text-sm text-red-500 font-inter">{errors.serviceType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="footage" className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                Estimated Footage
              </label>
              <select
                {...register("footage")}
                id="footage"
                defaultValue=""
                className={`w-full px-4 py-3 rounded-xl border ${errors.footage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} bg-white shadow-sm outline-none transition-all font-inter appearance-none`}
              >
                <option value="" disabled>Select an estimated range</option>
                <option value="Under 50 ft">Under 50 ft</option>
                <option value="50-100 ft">50-100 ft</option>
                <option value="100-200 ft">100-200 ft</option>
                <option value="200+ ft">200+ ft</option>
                <option value="Not Sure">Not Sure</option>
              </select>
              {errors.footage && (
                <p className="mt-1.5 text-sm text-red-500 font-inter">{errors.footage.message}</p>
              )}
            </div>
          </div>

          {/* Step 3: Preferred Style (Only for Curbing) */}
          <div className={currentStep === 3 && selectedService === "Curbing" ? "block space-y-5 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
            <div>
              <label htmlFor="preferredStyle" className="block text-sm font-medium text-gray-700 font-inter mb-1.5">
                Preferred Style
              </label>
              <select
                {...register("preferredStyle")}
                id="preferredStyle"
                defaultValue=""
                className={`w-full px-4 py-3 rounded-xl border ${errors.preferredStyle ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary'} bg-white shadow-sm outline-none transition-all font-inter appearance-none`}
              >
                <option value="" disabled>Select a style</option>
                <option value="Milled Slate">Milled Slate</option>
                <option value="Natural Stone">Natural Stone</option>
                <option value="Moroccan">Moroccan</option>
                <option value="Brick">Brick</option>
                <option value="Wood Grain">Wood Grain</option>
                <option value="Undecided">Undecided</option>
              </select>
              {errors.preferredStyle && (
                <p className="mt-1.5 text-sm text-red-500 font-inter">{errors.preferredStyle.message}</p>
              )}
              <p className="mt-3 text-sm text-gray-500 font-inter">
                Don&apos;t worry if you&apos;re not sure yet! We can help you decide during the consultation.
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-100 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 flex-1"
              >
                <ChevronLeft className="w-5 h-5 mr-1 -ml-1" />
                Back
              </button>
            )}

            {currentStep < visibleSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors flex-[2]"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1 -mr-1" />
              </button>
            )}

            {currentStep === visibleSteps && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 flex-[2]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get Free Estimate"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
