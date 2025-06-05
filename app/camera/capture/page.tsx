"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function CameraCapturePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImageDataUrl, setCapturedImageDataUrl] = useState<
    string | null
  >(null);
  const [showConfirmScreen, setShowConfirmScreen] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [isCameraInitializing, setIsCameraInitializing] =
    useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const API_URL =
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

  const startCamera = useCallback(async () => {
    setIsCameraInitializing(true);
    setError(null);
    setCapturedImageDataUrl(null);
    setShowConfirmScreen(false);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera API is not supported by this browser.");
        setIsCameraInitializing(false);
        return;
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 16 / 9,
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch((e) => {
          console.warn("Video play was prevented:", e);
          setError("");
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof DOMException) {
        if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          setError(
            "No camera found. Please ensure a camera is connected and enabled."
          );
        } else if (
          err.name === "NotReadableError" ||
          err.name === "TrackStartError"
        ) {
          setError(
            "Camera is already in use or cannot be accessed. Try closing other apps using the camera."
          );
        } else {
          setError(`Error accessing camera: ${err.message}`);
        }
      } else {
        setError("An unknown error occurred while accessing the camera.");
      }
    } finally {
      setIsCameraInitializing(false);
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (
      videoRef.current &&
      canvasRef.current &&
      stream &&
      videoRef.current.readyState >= videoRef.current.HAVE_METADATA
    ) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        const isMirrored = videoRef.current.style.transform === "scaleX(-1)";
        if (isMirrored) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        if (isMirrored) {
          context.setTransform(1, 0, 0, 1, 0, 0);
        }
        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setCapturedImageDataUrl(imageDataUrl);
        setShowConfirmScreen(true);
        setUploadError(null);
      }
    } else {
      setError("Camera not ready or stream not available for capture.");
      if (
        videoRef.current &&
        videoRef.current.readyState < videoRef.current.HAVE_METADATA
      ) {
        console.warn("Video metadata not loaded yet.");
      }
    }
  };

  const handleRetake = () => {
    setShowConfirmScreen(false);
    setCapturedImageDataUrl(null);
    setError(null);
    setUploadError(null);
    if (videoRef.current && stream && videoRef.current.paused) {
      videoRef.current
        .play()
        .catch((e) => console.error("Error re-playing video:", e));
    } else if (!stream) {
      startCamera();
    }
  };

  const handleConfirmAndUpload = async () => {
    if (!capturedImageDataUrl) return;

    setShowConfirmScreen(false);
    setIsUploading(true);
    setUploadError(null);

    setTimeout(async () => {
      try {
        const base64String = capturedImageDataUrl.split(",")[1];
        if (!base64String) {
          throw new Error("Could not extract base64 string from image data.");
        }

        const response = await axios.post(API_URL, { image: base64String });

        console.log("API Response:", response.data);
        const analysisDataString = encodeURIComponent(
          JSON.stringify(response.data)
        );
        router.push(`/select?data=${analysisDataString}`);
      } catch (err) {
        console.error("Error uploading image:", err);
        let message = "An unknown error occurred during upload.";
        if (axios.isAxiosError(err)) {
          message =
            err.response?.data?.message ||
            err.message ||
            "Failed to upload image. Please try again.";
        } else if (err instanceof Error) {
          message = err.message;
        }
        setUploadError(message);
        setShowConfirmScreen(true);
      } finally {
        setIsUploading(false);
      }
    }, 3000);
  };

  return (
    <div className="h-[90vh] w-full bg-gray-950 flex items-center justify-center p-0 md:p-0">
      <div className="relative h-[92vh] w-full max-w-[1920px] mx-auto bg-gray-900">
        {error && !showConfirmScreen && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white p-3 rounded-md shadow-lg text-center text-sm w-11/12 max-w-md">
            <p>{error}</p>
            {(error.includes("permission denied") ||
              error.includes("No camera found")) && (
              <button
                onClick={startCamera}
                className="mt-2 px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-xs font-semibold"
              >
                RETRY CAMERA
              </button>
            )}
          </div>
        )}

        {isCameraInitializing && !showConfirmScreen && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75">
            <p className="text-white text-lg">Initializing Camera...</p>
            <svg
              className="animate-spin h-8 w-8 text-white mt-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        <div
          className={`absolute inset-0 z-10 ${
            isCameraInitializing || showConfirmScreen
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          } transition-opacity duration-300`}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform:
                stream &&
                stream.getVideoTracks()[0]?.getSettings().facingMode === "user"
                  ? "scaleX(-1)"
                  : "scaleX(1)",
            }}
          ></video>

          <div className="absolute top-1/2 transform -translate-y-1/2 right-[2rem] z-20 flex items-center space-x-3">
            <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block">
              TAKE PICTURE
            </div>
            <button
              onClick={handleCapture}
              disabled={!stream || !!error || isCameraInitializing}
              className="transform hover:scale-105 active:scale-100 ease-in-out duration-200 group disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              aria-label="Take Picture"
            >
              <Image
                src="/TakePicture.svg"
                alt="Take Picture"
                width={64}
                height={64}
                priority
              />
            </button>
          </div>

          <div className="absolute bottom-[7.5rem] sm:bottom-[10rem] left-0 right-0 text-center z-20 px-4 pointer-events-none">
            <p className="text-sm mb-2 font-normal leading-6 text-[#FCFCFC] drop-shadow-md">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-8 gap-y-1 text-xs leading-6 text-[#FCFCFC] drop-shadow-md">
              <p>◇ NEUTRAL EXPRESSION</p>
              <p>◇ FRONTAL POSE</p>
              <p>◇ ADEQUATE LIGHTING</p>
            </div>
          </div>
        </div>

        {showConfirmScreen && capturedImageDataUrl && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gray-900">
            <Image
              src={capturedImageDataUrl}
              alt="Captured preview"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
              style={{
                transform:
                  stream &&
                  stream.getVideoTracks().length > 0 &&
                  stream.getVideoTracks()[0]?.getSettings().facingMode ===
                    "user"
                    ? "scaleX(-1)"
                    : "scaleX(1)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-between h-full w-full p-8">
              <h2 className="text-sm leading-6 uppercase text-[#FCFCFC] top-40">
                GREAT SHOT!
              </h2>

              {uploadError && (
                <div className="mb-4 bg-red-700 bg-opacity-80 text-white p-3 rounded-md text-sm shadow-lg">
                  <p>Upload Failed: {uploadError}</p>
                </div>
              )}
              <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md mt-140">
                Preview
              </h2>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16">
                <button
                  onClick={handleRetake}
                  disabled={isUploading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
                >
                  Retake
                </button>
                <button
                  onClick={handleConfirmAndUpload}
                  disabled={isUploading}
                  className="px-4 py-3 bg-gray-950 text-gray-200 cursor-pointer hover:bg-gray-800 hover:text-grey-200 shadow-md text-sm"
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Use This Photo"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#FCFCFC] bg-opacity-50 p-6 rounded-lg shadow-lg text-center">
              <p className="text-xl text-[#1A1B1C] animate-pulse">
                ANALYZING IMAGE...
              </p>
              <div className="flex items-center justify-center space-x-4 py-8">
                <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_0ms] opacity-30"></div>
                <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_250ms] opacity-30"></div>
                <div className="w-2 h-2 rounded-full bg-[#1A1B1C] animate-[bounce_1s_infinite_500ms] opacity-30"></div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`absolute md:bottom-8 bottom-[15rem] left-4 sm:left-8 ${
            showConfirmScreen ? "z-30" : "z-20"
          }`}
        >
          <Link
            href="/result"
            className="cursor-pointer group"
            title="Go Back"
            onClick={(e) => {
              if (showConfirmScreen) {
                e.preventDefault();
                alert(
                  "Please confirm or retake the photo first by using the buttons on screen."
                );
              }
            }}
          >
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold text-[#FCFCFC]">
                BACK
              </span>
            </div>
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 flex justify-center items-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] top-1/2 -translate-y-1/2 transform scale-[0.9] rotate-180 text-[#FCFCFC] group-hover:scale-[0.92] ease duration-300 origin-center pointer-events-none">
                ▶
              </span>
              <span className="text-sm font-semibold ml-6 text-[#FCFCFC]">
                BACK
              </span>
            </div>
          </Link>
        </div>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
}
