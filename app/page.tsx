"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// --- Shared scroll direction state ---
function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');
  const lastScrollY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollDir(y > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollDir;
}

export default function Home() {
  // --- Section 1 Animation (Hero) ---
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [exitProgress, setExitProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setVisible(true);
      const stickyParent = sectionRef.current.parentElement;
      if (stickyParent) {
        const parentRect = stickyParent.getBoundingClientRect();
        const parentTop = parentRect.top + window.scrollY;
        const scrollY = window.scrollY || window.pageYOffset;
        const scrolled = scrollY - parentTop;
        const duration = window.innerHeight;
        let progress = (scrolled / duration) * 3;
        progress = Math.max(0, Math.min(1, progress));
        setExitProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const exitStyle = {
    transform: `translateX(${exitProgress * 200}px)`,
    opacity: 1 - exitProgress,
    transition: 'transform 0.4s, opacity 0.4s',
  };

  // --- Section 2 Animation ---
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const [visible2, setVisible2] = useState(false);
  const [hasAnimatedIn2, setHasAnimatedIn2] = useState(false);
  const [exitProgress2, setExitProgress2] = useState(0);
  useEffect(() => {
    const handleScroll2 = () => {
      if (!sectionRef2.current) return;
      const rect2 = sectionRef2.current.getBoundingClientRect();
      if (rect2.top < window.innerHeight - 100) {
        setVisible2(true);
        setHasAnimatedIn2(true);
      } else {
        setVisible2(false);
      }
      const stickyParent = sectionRef2.current.parentElement;
      let relativeScroll = 0;
      if (stickyParent) {
        const parentRect = stickyParent.getBoundingClientRect();
        const parentTop = parentRect.top + window.scrollY;
        const scrollY = window.scrollY || window.pageYOffset;
        relativeScroll = scrollY - parentTop;
      }
      const buffer = 40;
      const startFade = window.innerHeight * 0.7 - buffer;
      const duration = window.innerHeight * 0.7 + buffer * 2;
      let progress = (relativeScroll - startFade) / duration;
      progress = Math.max(0, Math.min(1, progress));
      setExitProgress2(progress);
    };
    window.addEventListener('scroll', handleScroll2);
    handleScroll2();
    return () => window.removeEventListener('scroll', handleScroll2);
  }, []);
  const exitStyle2 = {
    transform: `translateX(${exitProgress2 * 200}px)`,
    opacity: 1 - exitProgress2,
    transition: 'transform 0.4s, opacity 0.4s',
  };

  // --- Section 3 Animation ---
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const [visible3, setVisible3] = useState(false);
  const [hasAnimatedIn3, setHasAnimatedIn3] = useState(false);
  const [exitProgress3, setExitProgress3] = useState(0);
  useEffect(() => {
    const handleScroll3 = () => {
      if (!sectionRef3.current) return;
      const rect3 = sectionRef3.current.getBoundingClientRect();
      if (rect3.top < window.innerHeight - 100) {
        setVisible3(true);
        setHasAnimatedIn3(true);
      } else {
        setVisible3(false);
      }
      const stickyParent = sectionRef3.current.parentElement;
      let relativeScroll = 0;
      if (stickyParent) {
        const parentRect = stickyParent.getBoundingClientRect();
        const parentTop = parentRect.top + window.scrollY;
        const scrollY = window.scrollY || window.pageYOffset;
        relativeScroll = scrollY - parentTop;
      }
      const buffer = 40;
      const startFade = window.innerHeight * 0.7 - buffer;
      const duration = window.innerHeight * 0.7 + buffer * 2;
      let progress = (relativeScroll - startFade) / duration;
      progress = Math.max(0, Math.min(1, progress));
      setExitProgress3(progress);
    };
    window.addEventListener('scroll', handleScroll3);
    handleScroll3();
    return () => window.removeEventListener('scroll', handleScroll3);
  }, []);
  const exitStyle3 = {
    transform: `translateX(${exitProgress3 * 200}px)`,
    opacity: 1 - exitProgress3,
    transition: 'transform 0.4s, opacity 0.4s',
  };

  const scrollDir = useScrollDirection();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 pb-0 gap-0 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 w-full flex min-h-screen items-center">
        {/* Vertical Navigation Menu */}
        <nav className="flex flex-col gap-10 border-r-3 border-t-3 border-b-3 border-cocoa_bean min-w-[60px] items-left h-auto fixed top-1/2 left-0 -translate-y-1/2 z-20 bg-gray-600 dark:bg-licorice shadow-lg rounded-r-xl pt-5 pb-5 pl-5 pr-1 justify-center">
          {[
            { href: "/", icon: "/home.png", alt: "Home Icon", label: "| Home" },
            {
              href: "/Projects",
              icon: "/projects.png",
              alt: "Projects Icon",
              label: "| Projects",
            },
            {
              href: "https://github.com/connorknoetze",
              icon: "/github.png",
              alt: "Github Icon",
              label: "| Github",
              external: true,
            },
            { href: "/Contact", icon: "/contact.png", alt: "Contact Icon", label: "| Contact" },
          ].map(({ href, icon, alt, label, external }) => (
            <a
              key={label}
              href={href}
              className="group flex items-center gap-2 text-lg font-medium relative"
              style={{ minWidth: 0 }}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Image
                aria-hidden
                src={icon}
                alt={alt}
                width={35}
                height={35}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <span className="ml-2 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[120px] transition-all duration-500 overflow-hidden whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </nav>
        {/* Main Content */}
        <main
          id="main"
          className="flex flex-col gap-[32px] flex-1 items-center sm:items-start pl-10 ml-[7vw]"
        >
          {/* Sticky Animated Section Container at the top */}
          <div className="relative w-full h-[100vh] flex items-start justify-center">
            <div
              ref={sectionRef}
              className="sticky flex flex-row items-center w-full h-screen min-h-[300px] justify-center"
              style={exitStyle}
            >
              {/* Textbox */}
              <div
                className={`flex-1 flex flex-col justify-center w-[350px] max-w-[400px] text-white dark:text-white bg-gray-600 dark:bg-licorice rounded-lg shadow-lg p-8 mb-20 h-[100vh] transition-all duration-700 ease-out
                  ${visible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"}`}
              >
                <h2 className="text-4xl pt-42 font-bold mb-4">Welcome to My Portfolio</h2>
                <p className="text-lg text-white dark:text-gray-200">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet
                  consectetur adipiscing elit quisque faucibus ex sapien. Quisque
                  faucibus ex sapien vitae pellentesque sem placerat. Vitae
                  pellentesque sem placerat in id cursus mi.
                </p>
                <li className="pt-5 pb-5 flex items-center justify-center border-b-2 border-cocoa_bean">
                  <a className="p-5 m-3.5 rounded-xl bg-dark_maroon hover:bg-cocoa_bean transition-colors duration-350" 
                    href="#My Skills">
                    My Skills
                  </a>
                    <a
                    className="p-5 m-3.5 rounded-xl bg-dark_maroon hover:bg-cocoa_bean transition-colors duration-350"
                    href="#About"
                    >
                    About
                    </a>
                </li>
              </div>
              <div
                className={`flex-1 max-w-[30vw]
                  ${visible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"} hidden 2xl:flex`}
              ></div>
              {/* Image */}
              <div
                className={`flex-[1] flex items-center justify-center min-w-[50px] max-w-[600px] mr-50 ml-10 mb-20 h-full transition-all duration-700 ease-linear relative
                  ${visible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"} hidden sm:flex`}
              >
                <Image
                  priority={true}
                  src="/opengl_triangle.png"
                  alt="Profile"
                  fill
                  style={{ objectFit: "contain" }}
                  className="shadow-lg rounded-lg"
                  sizes="(max-width: 500px) 100vw"
                />
              </div>
            </div>
          </div>

          {/* Second Sticky Animated Section */}
          <div id="My Skills" className="relative w-full h-[100vh] flex items-start justify-center">
            <div
              ref={sectionRef2}
              className={`sticky top-[25vh] flex flex-row items-center w-full h-[50vh] min-h-[300px] justify-center transition-all duration-700 ease-out 
                ${hasAnimatedIn2 ? (visible2 ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0 pointer-events-none') : 'opacity-0 pointer-events-none'}`}
              style={exitStyle2}
            > 
              <div className="flex flex-col w-full h-full max-w-[50vh] bg-licorice border-2 rounded-xl border-licorice">
                <div className="flex flex-1 w-full h-1/6 items-end pb-5 justify-center min-w-70"
                >
                  <h1 className="text-4xl font-bold ">My Skills</h1>
                </div>  
                <div className="flex flex-1 flex-row w-full h-full">
                  <div className="flex flex-[1] flex-col w-full h-full items-center justify-center p-1"
                  >
                    <Image 
                    src="/python.png"
                    alt="Profile"
                    width={100}
                    height={100}
                    />
                  </div>
                  <div className="flex flex-[1] flex-col w-full h-full items-center justify-center p-1 border-t-2 border-cocoa_bean"
                  >
                    <Image 
                    src="/java.png"
                    alt="Profile"
                    width={100}
                    height={100}
                    />
                  </div>
                  <div className="flex flex-[1] flex-col w-full h-full items-center justify-center p-1 border-t-2 border-cocoa_bean"
                  >
                    <Image 
                    src="/c_lang.png"
                    alt="Profile"
                    width={100}
                    height={100}
                    />
                  </div>
                  <div className="flex flex-[1] flex-col w-full h-full items-center justify-center p-1"
                  >
                    <Image 
                    src="/cpp.png"
                    alt="Profile"
                    width={100}
                    height={100}
                    />
                  </div>
                  
                </div> 
                <div className="flex flex-[0.5] w-full items-center justify-center min-w-70"
                ></div> 
              </div>
              <div className="w-full h-full"></div> 
            </div>
          </div>
          <div id="About" className="relative w-full h-[100vh] flex items-start justify-center">
            <div
              ref={sectionRef3}
              className={`sticky top-[20vh] flex flex-row items-center w-full h-[60vh] min-h-[300px] justify-center p-5 bg-white transition-all duration-700 ease-out
                ${hasAnimatedIn3 ? (visible3 ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0 pointer-events-none') : 'opacity-0 pointer-events-none'}`}
              style={exitStyle3}
            >
              <h2 className="text-3xl font-bold mb-4">Third Sticky Section</h2>
            </div>
          </div>
        <div className="h-[20vh]"></div>
        </main>
      </div>
      {/* Footer */}
      <div className="row-start-3 w-full">
        <footer className="w-full bg-night h-[35vh] bottom-0 left-0 z-30">
          {/* Footer content goes here */}
        </footer>
      </div>
    </div>
  );
}
function handleScroll2(this: Window, ev: Event) {
  throw new Error("Function not implemented.");
}


