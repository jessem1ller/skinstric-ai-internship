"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ApiData {
  age: Record<string, number>;
  gender: {
    male: number;
    female: number;
  };
  race: Record<string, number>;
}

interface AnalysisResult {
  success: boolean;
  message: string;
  data: ApiData;
}

function getKeyWithHighestValue(obj: Record<string, number>): string | null {
  if (!obj || Object.keys(obj).length === 0) return null;
  return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
}

type MainCategory = "RACE" | "AGE" | "SEX";

const RadioButtonIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5.5" stroke="#A0A4AB" fill="transparent" />
  </svg>
);

const ActiveRadioButtonIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="5.5" stroke="#FFFFFF" fill="transparent" />
    <circle cx="6" cy="6" r="3" fill="#FFFFFF" />
  </svg>
);

function SummaryContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [analysisDetails, setAnalysisDetails] = useState<ApiData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeMainCategory, setActiveMainCategory] =
    useState<MainCategory>("RACE");
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);
  const [selectedItemLabel, setSelectedItemLabel] = useState<string | null>(
    null
  );
  const [selectedItemConfidence, setSelectedItemConfidence] =
    useState<number>(0);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decodedData = decodeURIComponent(dataParam);
        const parsedResponse = JSON.parse(decodedData) as AnalysisResult;
        if (parsedResponse && parsedResponse.success && parsedResponse.data) {
          const data = parsedResponse.data;
          setAnalysisDetails(data);

          const topRaceKey = getKeyWithHighestValue(data.race);
          if (topRaceKey && data.race[topRaceKey] !== undefined) {
            setActiveMainCategory("RACE");
            setSelectedItemKey(topRaceKey);
            setSelectedItemLabel(
              topRaceKey.charAt(0).toUpperCase() + topRaceKey.slice(1)
            );
            setSelectedItemConfidence(data.race[topRaceKey] * 100);
          } else {
            const topAgeKey = getKeyWithHighestValue(data.age);
            if (topAgeKey && data.age[topAgeKey] !== undefined) {
              setActiveMainCategory("AGE");
              setSelectedItemKey(topAgeKey);
              setSelectedItemLabel(topAgeKey);
              setSelectedItemConfidence(data.age[topAgeKey] * 100);
            } else {
              const topGenderKey =
                data.gender.male > data.gender.female ? "male" : "female";
              setActiveMainCategory("SEX");
              setSelectedItemKey(topGenderKey);
              setSelectedItemLabel(topGenderKey.toUpperCase());
              setSelectedItemConfidence(data.gender[topGenderKey] * 100);
            }
          }
        } else {
          setError(
            parsedResponse?.message ||
              "Received data is not in the expected format or API indicated failure."
          );
        }
      } catch {
        setError("Failed to load analysis data. It might be corrupted.");
      }
    } else {
      setError("No analysis data found in URL.");
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="animate-pulse text-2xl text-gray-500 text-center py-20 col-span-3">
        Loading analysis data...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-xl text-red-500 text-center py-20 col-span-3">
        Error: {error}
      </div>
    );
  }
  if (!analysisDetails) {
    return (
      <div className="text-xl text-gray-500 text-center py-20 col-span-3">
        No analysis results to display.
      </div>
    );
  }

  const topPredictedRaceKey = getKeyWithHighestValue(analysisDetails.race);
  const topPredictedAgeKey = getKeyWithHighestValue(analysisDetails.age);
  const topPredictedGenderKey =
    analysisDetails.gender.male > analysisDetails.gender.female
      ? "male"
      : "female";

  const handleLeftSidebarSelect = (
    category: MainCategory,
    key: string | null,
    label: string
  ) => {
    if (!key || !analysisDetails) return;
    setActiveMainCategory(category);
    setSelectedItemKey(key);
    setSelectedItemLabel(label);

    let confidence = 0;
    if (category === "RACE" && analysisDetails.race[key] !== undefined) {
      confidence = analysisDetails.race[key] * 100;
    } else if (category === "AGE" && analysisDetails.age[key] !== undefined) {
      confidence = analysisDetails.age[key] * 100;
    } else if (category === "SEX") {
      confidence =
        (key === "male"
          ? analysisDetails.gender.male
          : analysisDetails.gender.female) * 100;
    }
    setSelectedItemConfidence(confidence);
  };

  const handleRightSidebarSelect = (
    key: string,
    label: string,
    confidence: number
  ) => {
    setSelectedItemKey(key);
    setSelectedItemLabel(label);
    setSelectedItemConfidence(confidence);
  };

  const getRightSidebarData = () => {
    let items: { key: string; label: string; confidence: number }[] = [];
    if (!analysisDetails) return items;
    switch (activeMainCategory) {
      case "RACE":
        items = Object.entries(analysisDetails.race).map(([key, value]) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          confidence: value * 100,
        }));
        return items.sort((a, b) => b.confidence - a.confidence);
      case "AGE":
        items = Object.entries(analysisDetails.age).map(([key, value]) => ({
          key,
          label: key,
          confidence: value * 100,
        }));
        return items.sort((a, b) => {
          const getLowerBound = (ageRange: string) => {
            if (ageRange.includes("+")) {
              return parseInt(ageRange.replace("+", ""), 10);
            }
            return parseInt(ageRange.split("-")[0], 10);
          };
          return getLowerBound(a.label) - getLowerBound(b.label);
        });
      case "SEX":
        items = [
          {
            key: "female",
            label: "FEMALE",
            confidence: analysisDetails.gender.female * 100,
          },
          {
            key: "male",
            label: "MALE",
            confidence: analysisDetails.gender.male * 100,
          },
        ];
        return items.sort((a, b) => b.confidence - a.confidence);
    }
    return items;
  };
  const rightSidebarItems = getRightSidebarData();

  const DonutChart = ({ percentage }: { percentage: number }) => {
    const strokeWidth = 1.7;
    const radius = 49.15;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-full max-w-[300px] sm:max-w-[384px] aspect-square">
        <svg
          className="CircularProgressbar text-[#1A1B1C]"
          viewBox="0 0 100 100"
        >
          <path
            className="CircularProgressbar-trail"
            d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
            strokeWidth={strokeWidth}
            fillOpacity="0"
            style={{
              stroke: "#e5e7eb",
              strokeLinecap: "butt",
              strokeDasharray: `${circumference}px, ${circumference}px`,
              strokeDashoffset: "0px",
            }}
          ></path>
          <path
            className="CircularProgressbar-path"
            d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
            strokeWidth={strokeWidth}
            fillOpacity="0"
            style={{
              stroke: "rgb(26, 27, 28)",
              strokeLinecap: "butt",
              transitionDuration: "0.8s",
              strokeDasharray: `${circumference}px, ${circumference}px`,
              strokeDashoffset: `${strokeDashoffset}px`,
            }}
          ></path>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl md:text-[40px] font-normal">
            {percentage.toFixed(0)}
            <span className="absolute text-xl md:text-3xl top-1/2 transform -translate-y-1/2 ml-1">
              %
            </span>
          </p>
        </div>
      </div>
    );
  };

  const LeftSidebarItem = ({
    label,
    categoryName,
    isActive,
    onClickHandler,
  }: {
    label: string;
    categoryName: MainCategory;
    isActive: boolean;
    onClickHandler: () => void;
  }) => (
    <div
      className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t hover:bg-[#E1E1E2] ${
        isActive ? "bg-[#1A1B1C] text-white" : "bg-[#F3F3F4] text-black"
      }`}
      onClick={onClickHandler}
    >
      <p className="text-base font-semibold">{label}</p>
      <h4
        className={`text-base font-semibold mb-1 ${
          isActive ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {categoryName}
      </h4>
    </div>
  );

  return (
    <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-2 md:mt-5 mb-10 md:mb-0 flex-1">
      <div className="bg-white space-y-0 md:flex md:flex-col md:h-[62%]">
        {topPredictedRaceKey && analysisDetails?.race && (
          <LeftSidebarItem
            label={
              topPredictedRaceKey.charAt(0).toUpperCase() +
              topPredictedRaceKey.slice(1)
            }
            categoryName="RACE"
            isActive={activeMainCategory === "RACE"}
            onClickHandler={() =>
              handleLeftSidebarSelect(
                "RACE",
                topPredictedRaceKey,
                topPredictedRaceKey.charAt(0).toUpperCase() +
                  topPredictedRaceKey.slice(1)
              )
            }
          />
        )}
        {topPredictedAgeKey && analysisDetails?.age && (
          <LeftSidebarItem
            label={topPredictedAgeKey}
            categoryName="AGE"
            isActive={activeMainCategory === "AGE"}
            onClickHandler={() =>
              handleLeftSidebarSelect(
                "AGE",
                topPredictedAgeKey,
                topPredictedAgeKey
              )
            }
          />
        )}
        {analysisDetails?.gender && (
          <LeftSidebarItem
            label={topPredictedGenderKey.toUpperCase()}
            categoryName="SEX"
            isActive={activeMainCategory === "SEX"}
            onClickHandler={() =>
              handleLeftSidebarSelect(
                "SEX",
                topPredictedGenderKey,
                topPredictedGenderKey.toUpperCase()
              )
            }
          />
        )}
      </div>

      <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t order-first md:order-none">
        <p className="hidden md:block md:absolute text-[32px] lg:text-[40px] mb-2 left-7 top-4 font-normal">
          {activeMainCategory === "AGE" && selectedItemLabel
            ? `${selectedItemLabel} y.o.`
            : selectedItemLabel?.toUpperCase() || "SELECT"}
        </p>
        <div className="relative w-full max-w-[300px] sm:max-w-[384px] aspect-square mb-4 md:absolute md:right-5 md:bottom-2">
          {selectedItemKey && (
            <DonutChart percentage={selectedItemConfidence} />
          )}
        </div>
      </div>

      <div className="bg-gray-100 pt-4 pb-4 md:border-t md:min-h-[50vh] md:h-auto">
        <div className="space-y-0">
          <div className="flex justify-between px-4">
            <h4 className="text-sm md:text-base leading-[24px] tracking-tight font-medium mb-2">
              {activeMainCategory}
            </h4>
            <h4 className="text-sm md:text-base leading-[24px] tracking-tight font-medium mb-2">
              A.I. CONFIDENCE
            </h4>
          </div>
          {rightSidebarItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center justify-between h-[48px] px-4 cursor-pointer ${
                item.key === selectedItemKey
                  ? "bg-[#1A1B1C] text-white hover:bg-black"
                  : "hover:bg-[#E1E1E2] text-black"
              }`}
              onClick={() =>
                handleRightSidebarSelect(item.key, item.label, item.confidence)
              }
            >
              <div className="flex items-center gap-1">
                {item.key === selectedItemKey ? (
                  <ActiveRadioButtonIcon />
                ) : (
                  <RadioButtonIcon />
                )}
                <span className="font-normal text-sm md:text-base leading-6 tracking-tight ml-2">
                  {item.label}
                </span>
              </div>
              <span className="font-normal text-sm md:text-base leading-6 tracking-tight">
                {item.confidence.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SummaryPage() {
  return (
    <div className="bg-white text-[#1A1B1C] flex flex-col h-screen">
      <div className="px-4 sm:px-6 md:px-8 pt-4 md:pt-6 shrink-0">
        <div className="text-start ml-0 md:ml-0 mb-2 md:mb-4">
          <h2 className="text-base md:text-base font-semibold mb-0 leading-[24px]">
            A.I. ANALYSIS
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-[52px] lg:text-[60px] font-normal leading-tight tracking-tighter">
            DEMOGRAPHICS
          </h3>
          <h4 className="text-xs sm:text-sm mt-1 leading-[24px] text-gray-500">
            PREDICTED RACE & AGE
          </h4>
        </div>
      </div>

      <main className="flex-1 w-full bg-white overflow-auto md:overflow-hidden px-2 sm:px-5">
        <Suspense
          fallback={
            <div className="animate-pulse text-2xl text-gray-500 text-center py-20">
              Loading analysis data...
            </div>
          }
        >
          <SummaryContent />
        </Suspense>
      </main>

      <footer className="pt-4 md:pt-[3px] bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
        <div className="flex justify-between items-center max-w-full mx-auto py-6 px-4 md:px-8">
          <Link
            href="/select"
            className="cursor-pointer group flex items-center"
          >
            <div className="relative w-10 h-10 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[0.8] sm:hidden">
              <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">
                BACK
              </span>
            </div>
            <div className="hidden sm:flex items-center">
              <div className="relative w-12 h-12 flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
                <span className="absolute left-[15px] top-1/2 -translate-y-1/2 transform scale-[0.9] rotate-180 text-[#1A1B1C] group-hover:scale-[0.92] ease duration-300 origin-center pointer-events-none">
                  ▶
                </span>
              </div>
              <span className="text-sm font-semibold ml-3 text-[#1A1B1C]">
                BACK
              </span>
            </div>
          </Link>

          <p className="text-xs sm:text-sm text-gray-500 text-center flex-1 mx-4 hidden md:block">
            If A.I. estimate is wrong, select the correct one.
          </p>

          <Link href="/" className="cursor-pointer group flex items-center">
            <div className="relative w-10 h-10 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[0.8] sm:hidden">
              <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">
                HOME
              </span>
            </div>
            <div className="hidden sm:flex items-center">
              <span className="text-sm font-semibold mr-3 text-[#1A1B1C]">
                HOME
              </span>
              <div className="relative w-12 h-12 flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300">
                <span className="absolute right-[15px] rotate-190 top-1/2 -translate-y-1/2 transform scale-[0.9] text-[#1A1B1C] group-hover:scale-[0.92] ease duration-300 origin-center pointer-events-none">
                  ▶
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2 md:hidden">
          If A.I. estimate is wrong, select the correct one.
        </p>
      </footer>
    </div>
  );
}
