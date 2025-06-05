'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DiamondButtonProps {
  text: string;
  href?: string;
  disabled?: boolean;
  gridPosition: string; 
  isMain?: boolean; 
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DiamondButton: React.FC<DiamondButtonProps> = ({ 
  text, 
  href, 
  disabled, 
  gridPosition, 
  isMain, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const buttonClasses = `
    w-[153.88px] h-[153.88px] 
    transform rotate-45 
    flex items-center justify-center 
    -m-5 
    font-semibold leading-[24px] tracking-tight uppercase 
    transition-transform duration-300
    ${isMain ? 'bg-gray-200 hover:bg-gray-300 hover:scale-[1.05]' : 'bg-gray-100 hover:bg-gray-200'}
    ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} 
  `;
  const spanClasses = "transform -rotate-45 text-center px-2";

  const content = (
    <button className={buttonClasses} disabled={disabled}>
      <span className={spanClasses}>{text}</span>
    </button>
  );

  return (
    <div 
      className={`flex items-center justify-center ${gridPosition}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {href && !disabled ? <Link href={href} passHref>{content}</Link> : content}
    </div>
  );
};


export default function SelectPage() {
  const [activeBgDiamond, setActiveBgDiamond] = useState<'small' | 'medium' | 'large' | null>(null);

  const diamondSmallSrc = "/DiamondSmall.svg";
  const diamondMediumSrc = "/DiamondMedium.svg";
  const diamondLargeSrc = "/DiamondLarge.svg";

  return (
    <div className="bg-white text-[#1A1B1C]">

      <div>
        <div className="absolute top-10 left-8 text-left mt-5 px-4 sm:px-0">
          <h1 className="text-base font-semibold leading-[24px] tracking-tight">A.I. ANALYSIS</h1>
          <p className="text-sm mt-1 text-gray-500 uppercase leading-[24px]">
            A.I. has estimated the following.<br/>
            Fix estimated information if needed.
          </p>
        </div>

        <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
          <div className="relative">
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-in-out transform ${activeBgDiamond === 'small' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="absolute w-[600px] h-[600px]">
                <Image alt="Diamond Small" layout="fill" objectFit="contain" src={diamondSmallSrc} priority />
              </div>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-in-out transform ${activeBgDiamond === 'medium' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="absolute w-[650px] h-[650px]">
                <Image alt="Diamond Medium" layout="fill" objectFit="contain" src={diamondMediumSrc} priority />
              </div>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-in-out transform ${activeBgDiamond === 'large' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="absolute w-[700px] h-[700px]">
                <Image alt="Diamond Large" layout="fill" objectFit="contain" src={diamondLargeSrc} priority />
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
              <DiamondButton 
                text="Demographics" 
                href="/summary" 
                gridPosition="col-start-2" 
                isMain 
                onMouseEnter={() => setActiveBgDiamond('small')}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
              <DiamondButton 
                text="Cosmetic Concerns" 
                gridPosition="row-start-2 col-start-1" 
                disabled 
                onMouseEnter={() => setActiveBgDiamond('medium')}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
              <DiamondButton 
                text="Skin Type Details" 
                gridPosition="row-start-2 col-start-3" 
                disabled 
                onMouseEnter={() => setActiveBgDiamond('medium')}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
              <DiamondButton 
                text="Weather" 
                gridPosition="row-start-3 col-start-2" 
                disabled 
                onMouseEnter={() => setActiveBgDiamond('large')}
                onMouseLeave={() => setActiveBgDiamond(null)}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0 border-t md:border-none border-gray-200">
        <div className="flex justify-between max-w-full mx-auto px-4 sm:px-12 md:px-9">
          <Link href="/result" className="cursor-pointer group">
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">BACK</span>
            </div>
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300 text-[#1A1B1C]">▶</span>
              <span className="text-sm font-semibold hidden sm:block ml-6 text-[#1A1B1C]">BACK</span>
            </div>
          </Link>

          <Link href="/summary" className="cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">SUM</span>
            </div>
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <span className="text-sm font-semibold hidden sm:block mr-5 text-[#1A1B1C]">GET SUMMARY</span>
              <div className="w-12 h-12 hidden sm:flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300 text-[#1A1B1C]">▶</span>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}