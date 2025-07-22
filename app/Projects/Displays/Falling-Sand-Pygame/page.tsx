"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && footerRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const footerRect = footerRef.current.getBoundingClientRect();

        if (navRect.bottom > footerRect.top) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clearScrollInterval = () => {
    if (scrollInterval) {
      clearTimeout(scrollInterval);
      setScrollInterval(null);
    }
  };

  const toggleNavBar = () => {
    setIsNavBarVisible(!isNavBarVisible);
  };

  useEffect(() => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      const handleScroll = () => {
        const slideWidth = gallery.offsetWidth;
        const currentIndex = Math.round(gallery.scrollLeft / slideWidth);
        setCurrentSlide(currentIndex);
      };

      gallery.addEventListener('scroll', handleScroll);

      return () => {
        gallery.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="grid grid-row min-h-screen sm:p-0 font-[family-name:var(--font-geist-sans)] bg-gradient-to-bl from-tuna via-gondola to-diesel overflow-x-hidden">
      <div className="flex row-start w-full items-center justify-center" id="header">
        <header className="flex gap-20 items-center justify-center h-auto w-full bg-gradient-to-br from-blue-950 via-licorice to-cocoa_bean shadow-2xl p-20">
          <h1 className="flex h-full font-bold text-4xl text-center justify-center items-center text-white">Falling Sand Simulation</h1>
        </header>
      </div>
      <div className="row-start-2 w-full flex min-h-screen items-center">
        
        {/* Vertical Navigation Menu */}
        <nav 
          ref={navRef}
          className={`flex flex-col gap-10 border-r-3 border-t-3 border-b-3 border-cocoa_bean min-w-[60px] items-left h-auto fixed top-1/2 left-0 -translate-y-1/2 z-20 bg-licorice shadow-lg rounded-r-xl pt-5 pb-5 pl-5 pr-1 justify-center transition-opacity duration-300 ${isNavBarVisible ? 'opacity-100' : 'opacity-0 sm:opacity-100'}`}>
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
              className={`group flex items-center text-white text-lg font-medium relative transition-all duration-300 ${isNavBarVisible || isLargeScreen ? 'opacity-100 max-w-[120px]' : 'opacity-0 max-w-0'}`}
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

        {/* Toggle Button for Small Screens */}
        <button
          className="sm:hidden fixed top-5 left-5 bg-red-700 text-white p-2 rounded-full z-30"
          onClick={toggleNavBar}
        >
          {isNavBarVisible ? 'Hide Menu' : 'Show Menu'}
        </button>

        <main className="flex flex-col lg:flex-row w-full h-full ml-2.5 lg:ml-20 mr-2.5">

          <div className="flex flex-[0.7] w-full h-[70vh] sm:h-[100vh] bg-black/40 relative overflow-hidden order-2 lg:order-1 rounded-2xl">
            {/* Sliding Gallery */}
            <div className="flex w-full h-full whitespace-nowrap overflow-x-scroll scrollbar-hide" id="gallery">
              {["/falling-sand/sand1.png","/falling-sand/sand2.png","/falling-sand/sand3.gif"].map((src, index) => (
                <div
                  key={index}
                  className="flex w-full h-full flex-shrink-0 relative items-center justify-center"
                  style={{ minWidth: "100%" }}
                >
                  <img
                    src={src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-fill h-fill lg:w-4/5 lg:h-4/5 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="hidden sm:flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white text-black p-1 sm:p-2 rounded-full shadow-lg z-10 transition-colors duration-300"
              onMouseDown={() => {
                const gallery = document.getElementById('gallery');
                if (gallery) {
                  const scrollLeft = () => {
                    gallery.scrollBy({ left: -gallery.offsetWidth / 5, behavior: 'smooth' });
                    setScrollInterval(setTimeout(scrollLeft, 100));
                  };
                  scrollLeft();
                }
              }}
              onMouseUp={() => clearScrollInterval()}
              onMouseLeave={() => clearScrollInterval()}
            >
              &#8249;
            </button>
            <button
              className="hidden sm:flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white text-black p-1 sm:p-2 rounded-full shadow-lg z-10 transition-colors duration-300"
              onMouseDown={() => {
                const gallery = document.getElementById('gallery');
                if (gallery) {
                  const scrollRight = () => {
                    gallery.scrollBy({ left: gallery.offsetWidth / 5, behavior: 'smooth' });
                    setScrollInterval(setTimeout(scrollRight, 100));
                  };
                  scrollRight();
                }
              }}
              onMouseUp={() => clearScrollInterval()}
              onMouseLeave={() => clearScrollInterval()}
            >
              &#8250;
            </button>

            {/* Gallery Indicator */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {["/falling-sand/sand1.png","/falling-sand/sand2.png","/falling-sand/sand3.gif"].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-red-700 scale-110' : 'bg-tuna'}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 flex-[0.3] w-full h-auto bg-night order-1 lg:order-2 mt-4 lg:mt-0 justify-center items-center">
              <p className="text-lg sm:text-2xl text-center p-5 text-white">The Falling Sand Simulation is an interactive program that simulates the behavior of falling sand particles. Users can add sand particles to the grid, and the simulation will handle their movement based on simple physics-like rules. The program is built using Python and Pygame.</p>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/ConnorKnoetze/Falling-Sand-Pygame" className="flex text-2xl gap-2 text-blue-400 hover:scale-[105%] transition-all duration-300"><img src="/github.png" alt="github" className="w-[32px]"/>Github</a>
          </div>

        </main>

      </div>
      {/* Footer */}
      <div ref={footerRef} className="row-start-3 w-full" id="footer">
        <footer className="flex flex-row flex-wrap w-full shadow-2xl pt-10 pb-10 justify-center bg-gradient-to-bl from-cocoa_bean via-licorice to-blue-950">
          
          {/* PFP Section */}
          <div className="flex flex-[1] flex-row w-full h-full ml-[5vw] mr-[5vw] mb-10 items-center">
            <div className="flex flex-1 w-full h-full max-w-100 items-center justify-end pr-2">
              <a href="https://github.com/connorknoetze" target="_blank" rel="noopener noreferrer" className=""><img src={"/pfp.png"} width={200} className="border-3 rounded-full hover:shadow-lg shadow-white transition-all duration-350 min-w-50"></img></a>
            </div>
            <div className="flex flex-[0.5] flex-col w-full h-full items-center justify-center">
              <div className="flex flex-col flex-[1] w-full h-full p-5 gap-3 justify-center">
                <h1 className="font-bold text-white" >Connor Knoetze</h1>
                <p className="text-white">Bachelor Of Science (BSc)</p>
                <p className="text-white">Computer Science</p>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col flex-[1] items-center justify-center w-full h-fill min-w-50 max-w-200 p-5 m-2.5 ml-[5vw] mr-[5vw] bg-gray-600/15 hover:bg-gray-500/15 rounded-2xl transition-colors duration-350 shadow-xl hover:shadow-2xl">
            {/* Quicklinks Text Box */}
            <div className="flex flex-1 w-full h-full">
              <div className="flex flex-[0.2] w-full h-full"></div>
              <div className="flex flex-[1] w-full h-full items-center justify-center border-b-2 border-b-cocoa_bean">
                <h1 className="flex font-bold text-2xl text-white">
                  Pages
                </h1>
              </div>
              <div className="flex flex-[0.2] w-full h-full"></div>
            </div>
            
            {/* Pages Content */}
            <div className="flex flex-1 w-full h-full items-center justify-center pt-5">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl gap-2" href="/">
                <img src="/home.png" alt="projects" className="max-w-5 max-h-5"></img>
              Home
              </a>
            </div>
            <div className="flex flex-1 w-full h-full items-center justify-center">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl gap-2" href="/Projects">
                <img src="/projects.png" alt="projects" className="max-w-5 max-h-5"></img>
              Projects
              </a>
            </div>
            <div className="flex flex-1 w-full h-full items-center justify-center">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl gap-2" href="https://github.com/connorknoetze">
                <img src="/github.png" alt="projects" className="max-w-5 max-h-5"></img>
              Github
              </a>
            </div>
            <div className="flex flex-1 w-full h-full items-center justify-center">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl gap-2" href="/Contact">
                <img src="/contact.png" alt="projects" className="max-w-5 max-h-5"></img>
              Contact
              </a>
            </div>

          </div>

          {/* Quick Menu */}
          <div className="flex flex-col flex-[1] items-center justify-center w-full h-fill min-w-50 max-w-200 p-5 m-2.5 ml-[5vw] mr-[5vw] bg-gray-600/15 hover:bg-gray-500/15 rounded-2xl transition-colors duration-350 shadow-xl hover:shadow-2xl">
            <div className="flex flex-1 w-full h-full">
              <div className="flex flex-[0.2] w-full h-full"></div>
              <div className="flex flex-[1] w-full h-full items-center justify-center border-b-2 border-b-cocoa_bean">
                <h1 className="flex font-bold text-2xl text-white">
                  Quick Menu
                </h1>
              </div>
              <div className="flex flex-[0.2] w-full h-full"></div>
            </div>

            <div className="flex flex-1 w-full h-full items-center justify-center pt-5">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl" href="/#main">Welcome</a>
            </div>
            <div className="flex flex-1 w-full h-full items-center justify-center">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl" href="/#My Skills">My Skills</a>
            </div>
            <div className="flex flex-1 w-full h-full items-center justify-center">
              <a className="flex flex-1 items-center justify-center hover:bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna text-gray-300 text-lg w-full h-full rounded-2xl" href="/#About">About me</a>
            </div>

          </div>

        </footer>
      </div>
    </div>
  );
}