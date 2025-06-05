"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const ResultPage = () => {
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const router = useRouter();

  const handleDeny = () => {
    setIsCameraModalOpen(false);
};

const handleAllow = () => {
    setIsCameraModalOpen(false);
    router.push('/camera');
};

  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            alt="Diamond Large"
            loading="lazy"
            width="482"
            height="482"
            decoding="async"
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
            src="/DiamondLarge.svg"
            style={{ color: "transparent" }}
          />
          <Image
            alt="DiamondMedium"
            loading="lazy"
            width="444"
            height="444"
            decoding="async"
            className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] animate-spin-slower rotate-190"
            src="/DiamondMedium.svg"
            style={{ color: "transparent" }}
          />
          <Image
            alt="DiamondSmall"
            loading="lazy"
            width="405"
            height="405"
            decoding="async"
            className="absolute w-[190px] h-[190px] md:w-[405] md:h-[405px] animate-spin-slowest"
            src="/DiamondSmall.svg"
            style={{ color: "transparent" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              onClick={() => setIsCameraModalOpen(true)}
              className="cursor-pointer"
            >
              <Image
                src="/camera.svg"
                alt="Camera Icon"
                loading="lazy"
                width={136}
                height={136}
                decoding="async"
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out relative"
                />
                </div>
              <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
                <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </p>
                <Image
                  alt="Scan Line"
                  loading="lazy"
                  width="66"
                  height="59"
                  decoding="async"
                  className="absolute hidden md:block md:right-[140px] md:top-[25px]"
                  src="/linepointingup.svg"
                  style={{ color: "transparent" }}
                  />
            </div>
          </div>
        </div>
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
          <Image
            alt="Diamond Large"
            loading="lazy"
            width="484"
            height="484"
            decoding="async"
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
            src="/DiamondLarge.svg"
            style={{ color: "transparent" }}
          />
          <Image
            alt="DiamondMedium"
            loading="lazy"
            width="448"
            height="448"
            decoding="async"
            className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] animate-spin-slower rotate-195"
            src="/DiamondMedium.svg"
            style={{ color: "transparent" }}
          />
          <Image
            alt="DiamondSmall"
            loading="lazy"
            width="408"
            height="408"
            decoding="async"
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
            src="/DiamondSmall.svg"
            style={{ color: "transparent" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              alt="Photo Upload Icon"
              loading="lazy"
              width="136"
              height={136}
              decoding="async"
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              src="/gallery-icon.svg"
              style={{ color: "transparent" }}
            />
            <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
              <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                ALLOW A.I. TO
                <br />
                ACCESS GALLERY
              </p>
              <Image
                alt="Gallery Line"
                loading="lazy"
                width="66"
                height="59"
                decoding="async"
                className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
                src="/linepointingdown.svg"
                style={{ color: "transparent" }}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"></div>
        </div>
        <input accept="image/*" className="hidden" type="file" />
      </div>
      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
          <Link className="relative" aria-label="Back" href="/testing">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                  BACK
                </span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                  ▶
                </span>
                <span className="text-sm font-semibold hidden sm:block ml-6 ">
                  BACK
                </span>
              </div>
            </div>
          </Link>
          <Link href="/select">
            <div className="hidden">
              <div>
                <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                    PROCEED
                  </span>
                </div>
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold hidden sm:block mr-5">
                    PROCEED
                  </span>
                  <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {isCameraModalOpen && (
        <div className="absolute md:top-[43%] md:left-[360px] w-[352px] z-50">
          <div className="bg-[#1A1B1C] pt-4 pb-2">
            <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] pl-4">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>
            <div className="flex mt-4 border-t border-[#FCFCFC] pt-2">
              <button onClick={handleDeny} className="px-7 md:translate-x-45 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500">
                DENY
              </button>
              <button onClick={handleAllow} className="px-5 md:translate-x-45 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300">
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;