"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);

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

  return (
    <div className="grid grid-row min-h-screen sm:p-0 font-[family-name:var(--font-geist-sans)] bg-gradient-to-bl from-tuna via-gondola to-diesel overflow-x-hidden">
      <div className="row-start-2 w-full flex min-h-screen items-center">
        
        {/* Vertical Navigation Menu */}
        <nav 
          ref={navRef}
          className={`flex flex-col gap-10 border-r-3 border-t-3 border-b-3 border-cocoa_bean min-w-[60px] items-left h-auto fixed top-1/2 left-0 -translate-y-1/2 z-20 bg-licorice shadow-lg rounded-r-xl pt-5 pb-5 pl-5 pr-1 justify-center transition-opacity duration-300 ${isNavVisible ? 'opacity-100' : 'opacity-0'}`}>
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

        {/* Main Page Content */ }
        <main className="w-full h-full items-center justify-center ml-20">
          
          {/* Welcome Section */}
          <div id="welcome" className="flex flex-col lg:flex-row flex-wrap flex-1 w-full h-[100vh] transition-all duration-700 bg-black/20 p-5 rounded-4xl">

            <div className="flex flex-[1] flex-col w-full h-full pl-5 pr-5 items-center justify-center bg-gradient-to-bl from-tuna via-licorice to-cocoa_bean transition-all duration-700 rounded-4xl">
              <div className="flex flex-col bg-gray-300/10 items-center p-4 sm:p-10 rounded-4xl">
                <h1 className="flex text-3xl lg:text-4xl text-center pb-5 border-b-2 border-cocoa_bean text-white">Welcome To My Portfolio</h1>
                <p className="p-5 text-center text-white">Here you will find a collection of all of the projects I have completed on my programming journey to date. Experiments, faliures and successes are all included.</p>
                <div className="flex flex-row gap-5">
                  <a href="#skills" className="p-5 bg-black/20 hover:bg-cocoa_bean/50 hover:shadow-xl shadow-red-700/20 rounded-3xl transition-all duration-500 text-white">Skills</a>
                  <a href="#about" className="p-5 bg-black/20 hover:bg-cocoa_bean/50 hover:shadow-xl shadow-red-700/20 rounded-3xl transition-all duration-500 text-white">About</a>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-[1] flex-col w-full h-full justify-center items-center p-4 md:p-10 transition-all duration-700">
              <img
                src="opengl_triangle.png"
                alt="triangle"
                className="flex object-contain"
              />
            </div>
          </div>

          <div className="hidden xl:flex xl:w-full h-[5vh]"></div>

          {/* My Skills Section */ }
          <div id="skills" className="flex flex-1 p-5 bg-black/20 rounded-4xl lg:flex-row flex-col w-full h-auto lg:h-[80vh] 2xl:h-[30vh]">
              <div className="flex flex-[0.2] lg:flex-[0.4] flex-row w-full h-full p-4 md:p-10 items-end lg:items-center justify-center">
                <h1 className="text-4xl w-full text-center pb-5 border-b-4 border-cocoa_bean text-nowrap">My Skills</h1>
              </div>
              
              <div className="flex flex-1 w-full h-full pb-5 pl-5 pr-5">
                <div className="grid gap-5 w-full h-full bg-gradient-to-bl from-cocoa_bean via-licorice to-tuna rounded-3xl grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 2xl:grid-rows-1 2xl:grid-cols-4 items-center contain-content">
                  {[
                    { src: "python.png", alt: "Python" },
                    { src: "java.png", alt: "Java" },
                    { src: "c_lang.png", alt: "C" },
                    { src: "cpp.png", alt: "C++" },
                  ].map(({ src, alt}) => (
                    <div key={alt} className="flex flex-col items-center justify-center h-full w-full hover:bg-white/5 hover:rounded-2xl transition">
                      <a href="/Projects" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                        <img src={src} alt={alt} className="object-contain w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 max-w-full max-h-[220px] transition-transform duration-300 hover:scale-105"/>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
          </div>

          <div className="hidden xl:flex xl:w-full h-[5vh]"></div>

          {/* About Me Section */ }
          <div id="about" className="flex flex-col lg:flex-row flex-wrap flex-1 w-full h-[100vh] transition-all duration-700 bg-black/20 p-5 rounded-4xl">
            <div className="flex flex-[1] flex-col w-full h-full p-5 items-center justify-center bg-gradient-to-bl from-tuna via-licorice to-cocoa_bean transition-all duration-700 rounded-4xl">
              
              <div className="flex flex-1 flex-row w-full h-full items-center justify-center">
                
                <div className="grid xl:grid-cols-2 xl:grid-rows-1 lg:grid-cols-1 lg:grid-rows-2 items-center justify-center">
                  <h1 className="text-center text-4xl border-b-2 border-cocoa_bean xl:border-0">About Me</h1>
                  <p className="pt-5 md:pt-0 text-center text-xs md:text-lg xl:border-l-2 border-cocoa_bean xl:pl-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in odio nec nunc consectetur tristique eget ut sapien. Phasellus ac ante rutrum, consectetur mi a, auctor urna. Integer non malesuada nisi. Quisque quis nunc quis ipsum vulputate porta. Nam nec turpis commodo, egestas neque sit amet, congue orci. Nulla libero. </p>
                </div>

              </div>

                <div className="flex flex-1 flex-row bg-black/20 rounded-4xl w-full h-full items-center justify-center p-5">
                  <div className="grid grid-rows-2 gap-10 lg:grid-cols-2 lg:grid-rows-1 items-center justify-center">
                    <a href="https://github.com/connorknoetze" target="_blank" rel="noopener noreferrer"><img src="pfp.png" alt="profile picture" className="border-2 rounded-full w-24 h-24 lg:w-40 lg:h-40 xl:w-60 xl:h-60 object-cover hover:shadow-lg shadow-white hover:scale-105 transition-transform duration-300"/></a>
                    <div>
                      <p className="xl:text-2xl">Connor Knoetze</p><br />
                      <p className="xl:text-2xl">Bachelor Of Science (BSc)</p><br />
                      <p className="xl:text-2xl">Computer Science</p><br />
                    </div>
                  </div>
                </div>

            </div>
            <div className="hidden md:flex flex-[1] flex-col w-full h-full justify-center items-center p-4 md:p-10 transition-all duration-700">
              <img
                src="opengl_square.png"
                alt="triangle"
                className="flex object-contain"
              />
            </div>
          </div>
          
          <div className="flex xl:w-full h-[5vh]"></div>
        </main>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="row-start-3 w-full" id="footer">
        <footer className="flex flex-row flex-wrap w-full shadow-2xl pt-10 pb-10 justify-center bg-gradient-to-bl from-cocoa_bean via-licorice to-blue-950">
          
          {/* PFP Section */}
          <div className="flex flex-[1] flex-row w-full h-full ml-[5vw] mr-[5vw] mb-10 items-center">
            <div className="flex flex-1 w-full h-full max-w-100 items-center justify-end pr-2">
              <a href="https://github.com/connorknoetze" target="_blank" rel="noopener noreferrer" className=""><img src={"pfp.png"} width={200} className="border-3 rounded-full hover:shadow-lg shadow-white transition-all duration-350 min-w-50"></img></a>
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