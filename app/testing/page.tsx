"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const TestingPage = () => {
  const [stage, setStage] = useState<"name" | "location">("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const router = useRouter();
  const locationInputRef = useRef<HTMLInputElement>(null);

  const validateInput = (value: string): string => {
    if (typeof value !== "string" || value.trim() === "") {
      return "Please enter a valid text.";
    }
    if (/\d/.test(value)) {
      return "Input should not contain numbers.";
    }
    if (/[^a-zA-Z\s'-]/.test(value)) {
      return "Input contains invalid characters.";
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (stage === "name") {
      setName(value);
      setNameError("");
      setSubmissionSuccess(false);
    } else if (stage === "location") {
      setLocation(value);
      setLocationError("");
      setSubmissionSuccess(false);
    }
  };

  const submitData = async () => {
    if (stage === "name") {
      const error = validateInput(name);
      if (error) {
        setNameError(error);
        return;
      }
      setStage("location");
    } else if (stage === "location") {
      const error = validateInput(location);
      if (error) {
        setLocationError(error);
        return;
      }

      setIsSubmitting(true);
      const startTime = Date.now();

      try {
        const response = await axios.post(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          { name, location }
        );
        const responseData = response.data as {
          success?: boolean;
          message?: string;
        };

        if (responseData?.success === true) {
          setSubmissionSuccess(true);
        } else {
          alert("Submission failed. Please try again.");
        }
      } catch (error: unknown) {
        console.error("API Error:", error);
        alert("An error occurred during submission.");
      } finally {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const minimumDisplayTime = 2000;
        const delay = Math.max(0, minimumDisplayTime - elapsedTime);

        setTimeout(() => {
          setIsSubmitting(false);
        }, delay);
      }
    }
  };

  const handleProceed = () => {
    if (submissionSuccess) {
      router.push("/result");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (stage === "name") {
        const error = validateInput(name);
        if (!error) {
          setStage("location");
          setTimeout(() => {
            if (locationInputRef.current) {
              locationInputRef.current.focus();
            }
          }, 0);
        }
      } else if (stage === "location") {
        submitData();
      }
    }
  };

  const currentPlaceholder =
    stage === "name" ? "Introduce Yourself" : "Your City Name";
  const inputValue = stage === "name" ? name : location;
  const errorMessage = stage === "name" ? nameError : locationError;

  return (
    <>
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
        <div className="absolute top-16 left-9 text-left">
          <p className="font-semibold text-xs">TO START ANALYSIS</p>
        </div>
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
          <p
            className={`text-sm text-gray-400 tracking-wider uppercase mb-1 ${
              isSubmitting || submissionSuccess ? "hidden" : ""
            }`}
          >
            CLICK TO TYPE
          </p>
          {isSubmitting ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center text-gray-500">Processing Submission</div>
              <div className="flex gap-2 mt-5">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:.1s]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:.3s]"></div>
              </div>
            </div>
          ) : !submissionSuccess ? (
            <form
              className="relative z-10"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col items-center">
                {stage === "name" && (
                  <>
                    <input
                      className={`text-4xl sm:text-5xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10 ${
                        nameError && "border-red-500"
                      }`}
                      placeholder={currentPlaceholder}
                      type="text"
                      autoComplete="off"
                      autoFocus
                      name={stage}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMessage}
                      </p>
                    )}
                  </>
                )}
                {stage === "location" && (
                  <>
                    <input
                      className={`text-4xl sm:text-5xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10 ${
                        locationError && "border-red-500"
                      }`}
                      placeholder={currentPlaceholder}
                      type="text"
                      autoComplete="off"
                      name={stage}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      ref={locationInputRef}
                    />
                    {errorMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorMessage}
                      </p>
                    )}
                  </>
                )}
              </div>
              <button type="submit" className="sr-only">
                Submit
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-3xl text-gray-500 font-normal mb-2">
                THANK YOU!
              </p>
              <p className="text-lg text-gray-500">Proceed to the next step</p>
            </div>
          )}
           <Image
                      alt="Diamond Large"
                      loading="lazy"
                      width="482"
                      height="482"
                      decoding="async"
                      className="absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px] animate-spin-slow rotate-200"
                      src="/DiamondLarge.svg"
                      style={{ color: "transparent" }}
                    />
                    <Image
                      alt="DiamondMedium"
                      loading="lazy"
                      width="444"
                      height="444"
                      decoding="async"
                      className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] animate-spin-slower rotate-190"
                      src="/DiamondMedium.svg"
                      style={{ color: "transparent" }}
                    />
                    <Image
                      alt="DiamondSmall"
                      loading="lazy"
                      width="405"
                      height="405"
                      decoding="async"
                      className="absolute w-[300px] h-[300px] md:w-[550px] md:h-[550px] animate-spin-slowest"
                      src="/DiamondSmall.svg"
                      style={{ color: "transparent" }}
                    />
        </div>
        <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
          <Link href="/" className="inset-0" aria-label="Back">
            <div className="flex items-center">
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">
                  BACK
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
                <span className="text-sm font-semibold hidden sm:block ml-6">
                  BACK
                </span>
              </div>
            </div>
          </Link>
          {!isSubmitting && submissionSuccess && (
            <button
              onClick={handleProceed}
              className="group inset-0 aria-label='Proceed animate-slide-in transform: translate(0px, 0%)'"
            >
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">
                  PROCEED
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block ml-6 p-4">
                  PROCEED
                </span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] rotate-0 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TestingPage;
