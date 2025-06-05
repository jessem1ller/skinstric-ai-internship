"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CameraLoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/camera/capture");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="md:h-[85vh] h-[65vh] bg-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-[70vh] overflow-auto">
        <div className="flex-0 flex flex-col md:flex-row items-center justify-center relative">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            alt="Diamond Large"
            loading="lazy"
            width={482}
            height={482}
            decoding="async"
            src="/DiamondLarge.svg"
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow"
            style={{ color: "transparent" }}
          />
          <Image
            alt="Diamond Medium"
            loading="lazy"
            width={444}
            height={444}
            decoding="async"
            src="/DiamondMedium.svg"
            className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] animate-spin-slower"
            style={{ color: "transparent" }}
          />
          <Image
            alt="Diamond Small"
            loading="lazy"
            width={405}
            height={405}
            decoding="async"
            src="/DiamondSmall.svg"
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
            style={{ color: "transparent" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
            <Image
              alt="Camera Icon"
              loading="lazy"
              width={136}
              height={136}
              decoding="async"
              src="/camera.svg"
              className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] animate-pulse-grow"
              style={{ color: "transparent" }}
            />
            <p className="absolute font-semibold text-sm md:text-base leading-[24px] tracking-tight translate-y-22 animate-pulse">
              SETTING UP CAMERA ...
            </p>
          </div>
        </div>
        <div className="mt-0 text-center">
          <p className="text-xs md:text-sm mb-4 leading-6">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>
          <div className="flex justify-center space-x-8">
            <p className="text-xs md:text-sm leading-6">◇ NEUTRAL EXPRESSION</p>
            <p className="text-xs md:text-sm leading-6">◇ FRONTAL POSE</p>
            <p className="text-xs md:text-sm leading-6">◇ ADEQUATE LIGHTING</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraLoadingPage;
