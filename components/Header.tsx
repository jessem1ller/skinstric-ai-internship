// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  section?: string; // Optional prop for the section text (e.g., "INTRO", "ANALYSIS")
}

const Header: React.FC<HeaderProps> = ({ section }) => {
  return (
    <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
      <div className="flex flex-row pt-1 scale-75 justify-center items-center">
        <Link href="/" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-[1000]">
          SKINSTRIC
        </Link>
        <Image
          alt="left-bracket"
          loading="lazy"
          width={5}
          height={19}
          decoding="async"
          data-nimg="1"
          className="w-[4px] h-[17px]"
          style={{ color: 'transparent' }}
          src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FRectangle%202710.61a74ed4.png&w=16&q=75"
        />
        <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">{section ? section.toUpperCase() : ''}</p>
        <Image
          alt="right-bracket"
          loading="lazy"
          width={5}
          height={19}
          decoding="async"
          data-nimg="1"
          className="w-[4px] h-[17px]"
          style={{ color: 'transparent' }}
          src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FRectangle%202711.b2b3b291.png&w=16&q=75"
        />
      </div>
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold  transition-colors  disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
        ENTER CODE
      </button>
    </div>
  );
};

export default Header;