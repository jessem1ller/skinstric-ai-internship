"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ResultPage = () => {
  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>
      <div>
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]">
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border-2 border-dotted border-[#A0A4AB] opacity-50 animate-spin-slow rotate-185"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px] border-2 border-dotted border-[#A0A4AB] opacity-30 animate-spin-slower rotate-175"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-2 border-dotted border-[#A0A4AB] opacity-60 rotate-160 animate-spin-slowest"></div>
        </div>
            {/* Your diamond components */}
          </div>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <Image
            src="../camera.svg"
            alt="Camera Icon"
            loading='lazy'
            width={136}
            height={136}
            decoding='async'
            className='absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer'
            ></Image>
          </div>
        </div>
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]">
            {/* Your diamond components */}
          </div>
          {/* Your gallery icon and text */}
        </div>
        <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"></div>
        </div>
        <input type="file" accept="image/*" className="hidden" />
      </div>
      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
          <Link href="/testing" className="relative" aria-label="Back">
            {/* Your back button component */}
          </Link>
          {/* Your proceed button (if needed on this page) */}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;