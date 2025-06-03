'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image component

// Placeholder for DiamondButtonGrid component if you want to make it more dynamic later
// For now, the grid structure will be directly in the SelectPage component.

// Diamond button component for reusability
interface DiamondButtonProps {
  text: string;
  href?: string;
  disabled?: boolean;
  gridPosition: string; // e.g., 'col-start-2', 'row-start-2 col-start-1'
  isMain?: boolean; // To differentiate the central active button
}

const DiamondButton: React.FC<DiamondButtonProps> = ({ text, href, disabled, gridPosition, isMain }) => {
  const buttonClasses = `
    w-[153.88px] h-[153.88px] 
    transform rotate-45 
    flex items-center justify-center 
    -m-5 
    font-semibold leading-[24px] tracking-tight uppercase 
    transition-transform duration-300
    ${isMain ? 'bg-gray-200 hover:bg-gray-300 hover:scale-[1.05] cursor-pointer' : 'bg-gray-100 hover:bg-gray-200'}
    ${disabled ? 'cursor-not-allowed opacity-70' : ''}
  `;
  const spanClasses = "transform -rotate-45 text-center px-2";

  if (href && !disabled) {
    return (
      <div className={`flex items-center justify-center ${gridPosition}`}>
        <Link href={href} passHref>
          <button className={buttonClasses}>
            <span className={spanClasses}>{text}</span>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${gridPosition}`}>
      <button className={buttonClasses} disabled={disabled}>
        <span className={spanClasses}>{text}</span>
      </button>
    </div>
  );
};


export default function SelectPage() {
  // Placeholder image URLs - replace with your actual image paths or use a different strategy
  const placeholderDiamondSmall = "/DiamondSmall.svg";
  const placeholderDiamondMedium = "/DiamondMedium.svg";
  const placeholderDiamondLarge = "/DiamondLarge.svg";


  return (
    <div className="bg-white text-[#1A1B1C]"> {/* Assuming default background is white */}
      
      {/* Main Content Area */}
      <div>
        <div className="absolute top-10 left-8 text-left mt-5 px-4 sm:px-0"> {/* Added padding for smaller screens */}
          <h1 className="text-base font-semibold leading-[24px] tracking-tight">A.I. ANALYSIS</h1>
          <p className="text-sm mt-1 text-gray-500 uppercase leading-[24px]"> {/* text-muted-foreground equivalent */}
            A.I. has estimated the following.<br/>
            Fix estimated information if needed.
          </p>
        </div>

        {/* Diamond Button Grid Section */}
        {/* Adjusted height to be responsive, using min-h for a baseline */}
        <div className="min-h-[calc(78.3vh-64px)] flex flex-col items-center justify-center bg-white py-10 md:py-0"> {/* Adjusted height calculation and added padding */}
          <div className="relative">
            {/* Background Diamond Images - using placeholders */}
            {/* These would ideally have animations and specific layering */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute transition-all duration-400 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] opacity-20"> {/* Adjusted size and opacity */}
                <Image alt="Diamond Small" layout="fill" objectFit="contain" src={placeholderDiamondSmall} />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute transition-all duration-400 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] opacity-10"> {/* Adjusted size and opacity */}
                <Image alt="Diamond Medium" layout="fill" objectFit="contain" src={placeholderDiamondMedium} />
              </div>
            </div>
             {/* Removed the third diamond as it was identical to the first in the source, adjust if needed */}

            {/* Foreground Diamond Buttons */}
            <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0 scale-75 sm:scale-90 md:scale-100">
              <DiamondButton text="Demographics" href="/summary" gridPosition="col-start-2" isMain />
              <DiamondButton text="Cosmetic Concerns" gridPosition="row-start-2 col-start-1" disabled />
              <DiamondButton text="Skin Type Details" gridPosition="row-start-2 col-start-3" disabled />
              <DiamondButton text="Weather" gridPosition="row-start-3 col-start-2" disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      {/* Made sticky for mobile, static for md and up */}
      <footer className="pt-4 md:pt-12 pb-8 bg-white sticky bottom-0 md:static border-t md:border-none border-gray-200">
        <div className="flex justify-between max-w-full mx-auto px-4 sm:px-12 md:px-9"> {/* Adjusted padding */}
          {/* Back Button */}
          <Link href="/result" passHref legacyBehavior>
            <a className="cursor-pointer group">
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[0.9] sm:hidden">
                <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">BACK</span>
              </div>
              <div className="hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] top-1/2 -translate-y-1/2 transform scale-[0.9] rotate-180 text-[#1A1B1C] group-hover:scale-[0.92] ease duration-300 origin-center pointer-events-none">▶</span>
                <span className="text-sm font-semibold ml-6 text-[#1A1B1C]">BACK</span>
              </div>
            </a>
          </Link>

          {/* Get Summary Button */}
          <Link href="/summary" passHref legacyBehavior>
            <a className="cursor-pointer group">
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[0.9] sm:hidden">
                <span className="transform -rotate-45 text-xs font-semibold text-[#1A1B1C]">SUM</span>
              </div>
              <div className="hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold mr-5 text-[#1A1B1C]">GET SUMMARY</span>
                <div className="w-12 h-12 flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute right-[15px] top-1/2 -translate-y-1/2 transform scale-[0.9] text-[#1A1B1C] group-hover:scale-[0.92] ease duration-300 origin-center pointer-events-none">▶</span>
              </div>
            </a>
          </Link>
        </div>
      </footer>
    </div>
  );
}
