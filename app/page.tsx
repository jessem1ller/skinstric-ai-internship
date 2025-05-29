// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-16 left-9 text-left">
        <p className="font-semibold text-xs">TO START ANALYSIS</p>
      </div>
      <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">CLICK TO TYPE</p>
        <form
          action="javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          className="relative z-10"
        >
          <div className="flex flex-col items-center"></div>
          <input
            className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
            placeholder="Introduce Yourself"
            autoComplete="off"
            type="text"
            name="name"
          />
          <button type="submit" className="sr-only">
            Submit
          </button>
        </form>
        <Image
          alt="Diamond Large"
          loading="lazy"
          width={762}
          height={762}
          decoding="async"
          data-nimg="1"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow rotate-190"
          src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDiamond-light-large.27413569.png&w=828&q=75"
          style={{ color: 'transparent' }}
        />
        <Image
          alt="Diamond Medium"
          loading="lazy"
          width={682}
          height={682}
          decoding="async"
          data-nimg="1"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower rotate-185"
          src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDiamond-medium-medium.7599ea96.png&w=750&q=75"
          style={{ color: 'transparent' }}
        />
        <Image
          alt="Diamond Small"
          loading="lazy"
          width={602}
          height={602}
          decoding="async"
          data-nimg="1"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest"
          src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FDiamond-dark-small.c887a101.png&w=640&q=75"
          style={{ color: 'transparent' }}
        />
      </div>
      <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13">
        <Link className="inset-0" aria-label="Back" href="/">
          <div>
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
            </div>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                ▶
              </span>
              <span className="text-sm font-semibold hidden sm:block ml-6 ">BACK</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
