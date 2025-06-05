"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import axios from "axios";

const API_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const ResultPage = () => {
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for file upload functionality
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [analysisDataForRedirect, setAnalysisDataForRedirect] = useState<string | null>(null);

  const handleDenyCamera = () => {
    setIsCameraModalOpen(false);
  };

  const handleAllowCamera = () => {
    setIsCameraModalOpen(false);
    router.push('/camera/capture'); // Ensure this path is correct
  };

  const handleGalleryIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setAnalysisError(null); // Clear previous errors
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setPreviewSrc(base64String);
          uploadAndAnalyzeFile(base64String);
        };
        reader.readAsDataURL(file);
      } else {
        setAnalysisError("Please select a valid image file.");
        setPreviewSrc(null);
      }
    }
    if (event.target) { // Reset file input
        event.target.value = "";
    }
  };

  const uploadAndAnalyzeFile = async (base64ImageData: string) => {
    if (!base64ImageData) return;
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const base64StringOnly = base64ImageData.split(",")[1];
      if (!base64StringOnly) {
        throw new Error("Could not extract base64 string.");
      }
      const response = await axios.post(API_URL, { image: base64StringOnly });
      const analysisDataString = encodeURIComponent(JSON.stringify(response.data));
      setAnalysisDataForRedirect(analysisDataString);
      setTimeout(() => {
        setIsAnalyzing(false); // Hide loader
        setShowSuccessAlert(true); // Show success alert
      }, 3000);
      // setShowSuccessAlert(true);
    } catch (err) {
      console.error("Error uploading/analyzing image:", err);
      let message = "Analysis failed. Please try again.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message || "Analysis failed.";
      } else if (err instanceof Error) {
        message = err.message;
      }
      setAnalysisError(message);
      // Do not clear previewSrc here, let user see the image that failed
    }
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
    if (analysisDataForRedirect) {
      router.push(`/select?data=${analysisDataForRedirect}`);
    } else {
      console.error("Redirect data missing after success.");
      router.push('/'); // Fallback
    }
  };

  return (
    <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
      <div className="absolute top-2 left-9 md:left-8 text-left">
        <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
      </div>

      {/* Main content area - retaining original structure and classes */}
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        {/* Camera Option - original structure */}
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div> {/* Placeholder for spacing */}
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
            className="absolute w-[190px] h-[190px] md:w-[405px] md:h-[405px] animate-spin-slowest" // Corrected md:w-[405]
            src="/DiamondSmall.svg"
            style={{ color: "transparent" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              onClick={() => setIsCameraModalOpen(true)}
              className="cursor-pointer"
              aria-label="Allow A.I. to scan your face"
            >
              <Image
                src="/camera.svg"
                alt="Camera Icon"
                loading="lazy"
                width={136}
                height={136}
                decoding="async"
                className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out relative" // Removed 'absolute' as parent is already positioning it
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

        {/* Gallery Option - original structure */}
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div> {/* Placeholder for spacing */}
          <Image
            alt="Diamond Large Gallery"
            loading="lazy"
            width="484" // Original width
            height="484" // Original height
            decoding="async"
            className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
            src="/DiamondLarge.svg"
            style={{ color: "transparent" }}
          />
          <Image
            alt="DiamondMedium Gallery"
            loading="lazy"
            width="448" // Original width
            height="448" // Original height
            decoding="async"
            className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] animate-spin-slower rotate-195"
            src="/DiamondMedium.svg"
            style={{ color: "transparent" }}
          />
          <Image
            alt="DiamondSmall Gallery"
            loading="lazy"
            width="408" // Original width
            height="408" // Original height
            decoding="async"
            className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
            src="/DiamondSmall.svg"
            style={{ color: "transparent" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div // Added a wrapper div for onClick for gallery icon
                onClick={handleGalleryIconClick}
                className="cursor-pointer"
                aria-label="Allow A.I. to access gallery"
            >
                <Image
                    alt="Photo Upload Icon"
                    loading="lazy"
                    width="136" // Original width
                    height={136} // Original height
                    decoding="async"
                    className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out relative" // Removed 'absolute'
                    src="/gallery-icon.svg"
                    style={{ color: "transparent" }}
                />
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
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

        {/* Preview Box - original structure and classes */}
        <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
          <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 bg-gray-100 overflow-hidden flex items-center justify-center relative"> {/* Added relative for Image with layout fill */}
            {previewSrc ? (
                <Image src={previewSrc} alt="Selected preview" layout="fill" objectFit="cover" />
            ) : (
                <span className="text-xs text-gray-400">No image</span>
            )}
          </div>
          {analysisError && !isAnalyzing && <p className="text-red-500 text-xs mt-1 max-w-[128px] text-right">{analysisError}</p>}
        </div>
        
        {/* Original hidden file input - now controlled by ref */}
        {/* <input accept="image/*" className="hidden" type="file" /> */}
      </div>

      {/* Footer - original structure and classes */}
      <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0"> {/* Ensure bottom-30.5 is a valid Tailwind class or custom utility */}
        <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13"> {/* Ensure px-13 is valid or adjust */}
          <Link className="relative group" aria-label="Back" href="/"> {/* Changed href to / for a general back action */}
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden group-hover:scale-105 transition-transform">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden text-[#1A1B1C]"> {/* Added text color */}
                  BACK
                </span>
              </div>
              <div className="hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center items-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300 text-[#1A1B1C]"> {/* Added text color */}
                  ▶
                </span>
                <span className="text-sm font-semibold hidden sm:block ml-6 text-[#1A1B1C]"> {/* Added text color */}
                  BACK
                </span>
              </div>
            </div>
          </Link>
          {/* Proceed button is not needed if flow is automatic after analysis */}
          <div className="opacity-0 pointer-events-none"> {/* Kept for spacing if original layout relied on it */}
             <Link href="/select">
                <div className="hidden"> {/* Original hidden structure */}
                </div>
             </Link>
          </div>
        </div>
      </div>

      {/* Camera Permission Modal - original structure */}
      {isCameraModalOpen && (
        <div className="absolute md:top-[43%] md:left-[360px] w-[352px] z-50"> {/* Original positioning */}
          <div className="bg-[#1A1B1C] pt-4 pb-2">
            <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] pl-4">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </h2>
            <div className="flex mt-4 border-t border-[#FCFCFC] pt-2">
              <button onClick={handleDenyCamera} className="px-7 md:translate-x-45 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500">
                DENY
              </button>
              <button onClick={handleAllowCamera} className="px-5 md:translate-x-45 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300">
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing Loader Modal (Overlay) */}
      {isAnalyzing && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-[60] p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <p className="text-lg font-semibold text-gray-800">Preparing Your Analysis</p>
            <div className="flex justify-center items-center space-x-2 mt-5 mb-2">
              <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce_loader delay-0"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce_loader_200"></div>
              <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce_loader_400"></div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes bounce_loader {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        .animate-bounce_loader { animation: bounce_loader 1.4s infinite ease-in-out both; }
        .animate-bounce_loader_200 { animation: bounce_loader 1.4s infinite 0.2s ease-in-out both; }
        .animate-bounce_loader_400 { animation: bounce_loader 1.4s infinite 0.4s ease-in-out both; }
      `}</style>

      {/* Success Alert Modal (Overlay) */}
      {showSuccessAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center w-full max-w-xs">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Image Analyzed Successfully!</h3>
            <div className="mt-5">
              <button
                type="button"
                onClick={handleCloseSuccessAlert}
                className="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;



// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from 'next/navigation';

// const ResultPage = () => {
//   const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
//   const router = useRouter();

//   const handleDeny = () => {
//     setIsCameraModalOpen(false);
// };

// const handleAllow = () => {
//     setIsCameraModalOpen(false);
//     router.push('/camera');
// };

//   return (
//     <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
//       <div className="absolute top-2 left-9 md:left-8 text-left">
//         <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
//       </div>
//       <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
//         <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
//           <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
//           <Image
//             alt="Diamond Large"
//             loading="lazy"
//             width="482"
//             height="482"
//             decoding="async"
//             className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-200"
//             src="/DiamondLarge.svg"
//             style={{ color: "transparent" }}
//           />
//           <Image
//             alt="DiamondMedium"
//             loading="lazy"
//             width="444"
//             height="444"
//             decoding="async"
//             className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] animate-spin-slower rotate-190"
//             src="/DiamondMedium.svg"
//             style={{ color: "transparent" }}
//           />
//           <Image
//             alt="DiamondSmall"
//             loading="lazy"
//             width="405"
//             height="405"
//             decoding="async"
//             className="absolute w-[190px] h-[190px] md:w-[405] md:h-[405px] animate-spin-slowest"
//             src="/DiamondSmall.svg"
//             style={{ color: "transparent" }}
//           />
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <div
//               onClick={() => setIsCameraModalOpen(true)}
//               className="cursor-pointer"
//             >
//               <Image
//                 src="/camera.svg"
//                 alt="Camera Icon"
//                 loading="lazy"
//                 width={136}
//                 height={136}
//                 decoding="async"
//                 className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out relative"
//                 />
//                 </div>
//               <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
//                 <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
//                   ALLOW A.I.
//                   <br />
//                   TO SCAN YOUR FACE
//                 </p>
//                 <Image
//                   alt="Scan Line"
//                   loading="lazy"
//                   width="66"
//                   height="59"
//                   decoding="async"
//                   className="absolute hidden md:block md:right-[140px] md:top-[25px]"
//                   src="/linepointingup.svg"
//                   style={{ color: "transparent" }}
//                   />
//             </div>
//           </div>
//         </div>
//         <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100">
//           <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
//           <Image
//             alt="Diamond Large"
//             loading="lazy"
//             width="484"
//             height="484"
//             decoding="async"
//             className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-spin-slow rotate-205"
//             src="/DiamondLarge.svg"
//             style={{ color: "transparent" }}
//           />
//           <Image
//             alt="DiamondMedium"
//             loading="lazy"
//             width="448"
//             height="448"
//             decoding="async"
//             className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] animate-spin-slower rotate-195"
//             src="/DiamondMedium.svg"
//             style={{ color: "transparent" }}
//           />
//           <Image
//             alt="DiamondSmall"
//             loading="lazy"
//             width="408"
//             height="408"
//             decoding="async"
//             className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest"
//             src="/DiamondSmall.svg"
//             style={{ color: "transparent" }}
//           />
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <Image
//               alt="Photo Upload Icon"
//               loading="lazy"
//               width="136"
//               height={136}
//               decoding="async"
//               className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
//               src="/gallery-icon.svg"
//               style={{ color: "transparent" }}
//             />
//             <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
//               <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
//                 ALLOW A.I. TO
//                 <br />
//                 ACCESS GALLERY
//               </p>
//               <Image
//                 alt="Gallery Line"
//                 loading="lazy"
//                 width="66"
//                 height="59"
//                 decoding="async"
//                 className="absolute hidden md:block md:left-[120px] md:bottom-[39px]"
//                 src="/linepointingdown.svg"
//                 style={{ color: "transparent" }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
//           <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
//           <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden"></div>
//         </div>
//         <input accept="image/*" className="hidden" type="file" />
//       </div>
//       <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
//         <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
//           <Link className="relative" aria-label="Back" href="/testing">
//             <div>
//               <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
//                 <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
//                   BACK
//                 </span>
//               </div>
//               <div className="group hidden sm:flex flex-row relative justify-center items-center">
//                 <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
//                 <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
//                   ▶
//                 </span>
//                 <span className="text-sm font-semibold hidden sm:block ml-6 ">
//                   BACK
//                 </span>
//               </div>
//             </div>
//           </Link>
//           <Link href="/select">
//             <div className="hidden">
//               <div>
//                 <div className=" w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
//                   <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
//                     PROCEED
//                   </span>
//                 </div>
//                 <div className="group hidden sm:flex flex-row relative justify-center items-center">
//                   <span className="text-sm font-semibold hidden sm:block mr-5">
//                     PROCEED
//                   </span>
//                   <div className=" w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
//                   <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
//                     ▶
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//       {isCameraModalOpen && (
//         <div className="absolute md:top-[43%] md:left-[360px] w-[352px] z-50">
//           <div className="bg-[#1A1B1C] pt-4 pb-2">
//             <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-[24px] pl-4">
//               ALLOW A.I. TO ACCESS YOUR CAMERA
//             </h2>
//             <div className="flex mt-4 border-t border-[#FCFCFC] pt-2">
//               <button onClick={handleDeny} className="px-7 md:translate-x-45 text-[#fcfcfca1] font-normal text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-500">
//                 DENY
//               </button>
//               <button onClick={handleAllow} className="px-5 md:translate-x-45 text-[#FCFCFC] font-semibold text-sm leading-4 tracking-tight cursor-pointer hover:text-gray-300">
//                 ALLOW
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResultPage;