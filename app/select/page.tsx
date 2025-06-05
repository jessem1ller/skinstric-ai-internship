"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface DiamondButtonProps {
  text: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  gridPosition: string;
  isMain?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DiamondButton: React.FC<DiamondButtonProps> = ({
  text,
  href,
  onClick,
  disabled,
  gridPosition,
  isMain,
  onMouseEnter,
  onMouseLeave,
}) => {
  const buttonClasses = `
    w-[153.88px] h-[153.88px]
    transform rotate-45
    flex items-center justify-center
    -m-5
    font-semibold leading-[24px] tracking-tight uppercase
    transition-transform duration-300
    ${
      isMain
        ? "bg-gray-200 hover:bg-gray-300 hover:scale-[1.05]"
        : "bg-gray-100 hover:bg-gray-200"
    }
    ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
  `;
  const spanClasses = "transform -rotate-45 text-center px-2";

  const buttonElement = (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      <span className={spanClasses}>{text}</span>
    </button>
  );

  return (
    <div
      className={`flex items-center justify-center ${gridPosition}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {onClick ? (
        buttonElement
      ) : href && !disabled ? (
        <Link href={href} passHref>
          {React.cloneElement(buttonElement, { onClick: undefined })}
        </Link>
      ) : (
        buttonElement
      )}
    </div>
  );
};

export default function SelectPage() {
  const [activeBgDiamond, setActiveBgDiamond] = useState<
    "small" | "medium" | "large" | null
  >(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [analysisData, setAnalysisData] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      setAnalysisData(data);
    } else {
      console.warn("No analysis data found in query params for select page.");
    }
  }, [searchParams, router]);

  const handleContinueToSummary = () => {
    if (analysisData) {
      router.push(`/summary?data=${analysisData}`);
    } else {
      alert("Analysis data is missing, cannot proceed to summary.");
      router.push("/");
    }
  };

  if (
    !analysisData &&
    typeof window !== "undefined" &&
    !searchParams.get("data")
  ) {
    console.warn("No analysis data found on initial load for select page.");
  }
  if (!analysisData && searchParams.get("data")) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading A.I. Analysis data...
      </div>
    );
  }
  if (!analysisData)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Error: Analysis data is missing.</p>
        <p className="mt-2 text-sm text-gray-600">
          Please try capturing your photo again.
        </p>
        <Link
          href="/camera/capture"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Camera
        </Link>
      </div>
    );

  const diamondSmallSrc = "/DiamondSmall.svg";
  const diamondMediumSrc = "/DiamondMedium.svg";
  const diamondLargeSrc = "/DiamondLarge.svg";

  return (
    <div className="bg-white text-[#1A1B1C]">
      <div>
        <div className="absolute top-10 left-8 text-left mt-5 px-4 sm:px-0">
          <h1 className="text-base font-semibold leading-[24px] tracking-tight">
            A.I. ANALYSIS
          </h1>
          <p className="text-sm mt-1 text-gray-500 uppercase leading-[24px]">
            A.I. has estimated the following.
            <br />
            Fix estimated information if needed.
          </p>
        </div>

        <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
          <div className="relative">
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-in-out transform ${
                activeBgDiamond === "small"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
              }`}
            >
              <div className="absolute w-[600px] h-[600px]">
                <Image
                  alt="Diamond Small"
                  layout="fill"
                  objectFit="contain"
                  src={diamondSmallSrc}
                  priority
                />
              </div>
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-in-out transform ${
                activeBgDiamond === "medium"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
              }`}
            >
              <div className="absolute w-[650px] h-[650px]">
                <Image
                  alt="Diamond Medium"
                  layout="fill"
                  objectFit="contain"
                  src={diamondMediumSrc}
                  priority
                />
              </div>
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-in-out transform ${
                activeBgDiamond === "large"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
              }`}
            >
              <div className="absolute w-[700px] h-[700px]">
                <Image
                  alt="Diamond Large"
                  layout="fill"
                  objectFit="contain"
                  src={diamondLargeSrc}
                  priority
                />
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
              <DiamondButton
                text="Demographics"
                gridPosition="col-start-2"
                isMain
                onClick={handleContinueToSummary}
                onMouseEnter={() => setActiveBgDiamond("small")}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
              <DiamondButton
                text="Cosmetic Concerns"
                gridPosition="row-start-2 col-start-1"
                disabled
                onMouseEnter={() => setActiveBgDiamond("medium")}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
              <DiamondButton
                text="Skin Type Details"
                gridPosition="row-start-2 col-start-3"
                disabled
                onMouseEnter={() => setActiveBgDiamond("medium")}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
              <DiamondButton
                text="Weather"
                gridPosition="row-start-3 col-start-2"
                disabled
                onMouseEnter={() => setActiveBgDiamond("large")}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-0 md:mb-0 border-t md:border-none border-gray-200">
        <div className="flex justify-between max-w-full mx-auto px-4 sm:px-12 md:px-9">
          <Link href="/camera/capture" className="cursor-pointer group">
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">
                BACK
              </span>
            </div>
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300 text-[#1A1B1C]">
                ▶
              </span>
              <span className="text-sm font-semibold hidden sm:block ml-6 text-[#1A1B1C]">
                BACK
              </span>
            </div>
          </Link>

          <button
            onClick={handleContinueToSummary}
            className="cursor-pointer group focus:outline-none"
            aria-label="Get Summary"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden group-hover:scale-[1.05] transition-transform duration-300">
              <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">
                SUM
              </span>
            </div>
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <span className="text-sm font-semibold hidden sm:block mr-5 text-[#1A1B1C]">
                GET SUMMARY
              </span>
              <div className="w-12 h-12 hidden sm:flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300 text-[#1A1B1C]">
                ▶
              </span>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}