// app/testing/page.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const TestingPage = () => {
  const [name, setName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    // We'll add logic for the second input later
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>
        <form className="relative z-10" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col items-center">
            <input
              className="text-4xl sm:text-5xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="Introduce Yourself"
              type="text"
              autoComplete="off"
              autoFocus
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="sr-only">Submit</button>
        </form>
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border-2 border-dotted border-[#A0A4AB] motion-reduce:animate-spin rotate-190"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px] border-2 border-dotted border-[#A0A4AB] motion-reduce:animate-spin rotate-185"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-2 border-dotted border-[#A0A4AB] animate-spin"></div>
      </div>
      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link href="/" aria-label="Back">
          <div>
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
            </div>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
              <span className="text-sm font-semibold hidden sm:block ml-6 ">BACK</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TestingPage;

// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const TestingPage = () => {
//   const [name, setName] = useState('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

//   return (
//     <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
//       <div className="absolute top-16 left-9 text-left">
//         <p className="font-semibold text-xs">TO START ANALYSIS</p>
//       </div>
//       <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
//         <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>
//         <form className="relative z-10" onSubmit={(e) => e.preventDefault()}>
//           <div className="flex flex-col items-center">
//             <input
//               className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
//               placeholder="Introduce Yourself"
//               type="text"
//               autoComplete="off"
//               autoFocus
//               name="name"
//               value={name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit" className="sr-only">Submit</button>
//         </form>
//         <Image
//           alt="Diamond Large"
//           src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDiamond-light-large.27413569.png&w=1920&q=75"
//           width={762}
//           height={762}
//           className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-190"
//           style={{ color: 'transparent' }}
//         />
//         <Image
//           alt="Diamond Medium"
//           src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDiamond-medium-medium.7599ea96.png&w=1920&q=75"
//           width={682}
//           height={682}
//           className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-185"
//           style={{ color: 'transparent' }}
//         />
//         <Image
//           alt="Diamond Small"
//           src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDiamond-dark-small.c887a101.png&w=1920&q=75"
//           width={602}
//           height={602}
//           className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest"
//           style={{ color: 'transparent' }}
//         />
//       </div>
//       <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
//         <Link href="/" aria-label="Back">
//           <div>
//             <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
//               <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
//             </div>
//             <div className="group hidden sm:flex flex-row relative justify-center items-center">
//               <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
//               <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
//               <span className="text-sm font-semibold hidden sm:block ml-6 ">BACK</span>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default TestingPage;