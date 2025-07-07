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
    <div className="grid grid-row min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-bl from-tuna via-gondola to-diesel ">
      
      <div className="row-start w-full" id="header">
        <header className="flex flex-row items-center justify-center w-full bg-gradient-to-br from-blue-950 via-licorice to-cocoa_bean h-[200px] shadow-2xl p-10">
          <h1 className="font-bold text-4xl">Projects</h1>
        </header>
      </div>

      <div className="row-start-2 w-full flex min-h-screen">
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

        {/* Main Content */}
        <main id="main" className="flex flex-col w-full h-full ml-20">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full p-2.5 gap-5 transition-all duration-700">
            {[
              { bgColor: "bg-black", title: "Project 1", description: "Description for Project 1", githubLink: "https://github.com/connorknoetze/project1", link: "/project1" },
              { bgColor: "bg-red-600", title: "Project 2", description: "Description for Project 2", githubLink: "https://github.com/connorknoetze/project2", link: "/project2" },
              { bgColor: "bg-purple-600", title: "Project 3", description: "Description for Project 3", githubLink: "https://github.com/connorknoetze/project3", link: "/project3" },
              { bgColor: "bg-orange-600", title: "Project 4", description: "Description for Project 4", githubLink: "https://github.com/connorknoetze/project4", link: "/project4" },
              { bgColor: "bg-black", title: "Project 5", description: "Description for Project 5", githubLink: "https://github.com/connorknoetze/project5", link: "/project5" },
              { bgColor: "bg-red-600", title: "Project 6", description: "Description for Project 6", githubLink: "https://github.com/connorknoetze/project6", link: "/project6" },
              { bgColor: "bg-purple-600", title: "Project 7", description: "Description for Project 7", githubLink: "https://github.com/connorknoetze/project7", link: "/project7" },
              { bgColor: "bg-orange-600", title: "Project 8", description: "Description for Project 8", githubLink: "https://github.com/connorknoetze/project8", link: "/project8" },
              { bgColor: "bg-black", title: "Project 9", description: "Description for Project 9", githubLink: "https://github.com/connorknoetze/project9", link: "/project9" },
              { bgColor: "bg-red-600", title: "Project 10", description: "Description for Project 10", githubLink: "https://github.com/connorknoetze/project10", link: "/project10" },
              { bgColor: "bg-purple-600", title: "Project 11", description: "Description for Project 11", githubLink: "https://github.com/connorknoetze/project11", link: "/project11" },
              { bgColor: "bg-orange-600", title: "Project 12", description: "Description for Project 12", githubLink: "https://github.com/connorknoetze/project12", link: "/project12" },
              { bgColor: "bg-black", title: "Project 13", description: "Description for Project 13", githubLink: "https://github.com/connorknoetze/project13", link: "/project13" },
              { bgColor: "bg-red-600", title: "Project 14", description: "Description for Project 14", githubLink: "https://github.com/connorknoetze/project14", link: "/project14" },
              { bgColor: "bg-purple-600", title: "Project 15", description: "Description for Project 15", githubLink: "https://github.com/connorknoetze/project15", link: "/project15" },
              { bgColor: "bg-orange-600", title: "Project 16", description: "Description for Project 16", githubLink: "https://github.com/connorknoetze/project16", link: "/project16" },
            ].map(({ bgColor, title, description, githubLink, link }, index) => (
              <a href={link} key={index}>
                <div
                className={`w-full min-w-[200px] min-h-[300px] flex flex-col ${bgColor} hover:scale-105 hover:shadow-lg transition-transform duration-500 justify-center items-center gap-2`}>
                  <div>{title}</div>
                  <div>{description}</div>
                  <a href={githubLink}><div className="flex gap-1 hover:scale-[105%] transform-all duration-350"><img src="github.png" width={20} height={20} alt=""/>Github link</div></a>
                </div>
              </a>
            ))}
            </div>
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