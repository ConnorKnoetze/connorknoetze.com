"use client";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  // Animation state
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [exitProgress, setExitProgress] = useState(0); // 0 = fully in, 1 = fully out

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Reveal animation
      if (rect.top < window.innerHeight - 100) {
        setVisible(true);
      }
      // Animation progress based on scroll amount in sticky parent
      const stickyParent = sectionRef.current.parentElement;
      if (stickyParent) {
        const parentRect = stickyParent.getBoundingClientRect();
        const parentTop = parentRect.top + window.scrollY;
        const scrollY = window.scrollY || window.pageYOffset;
        const scrolled = scrollY - parentTop;
        const duration = window.innerHeight; // animation lasts for one viewport height of scroll
        let progress = scrolled / duration * 3;
        progress = Math.max(0, Math.min(1, progress));
        setExitProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate transform and opacity for exit (across full viewport)
  const exitStyle = {
    transform: `translateX(${exitProgress * 200}px)`,
    opacity: 1 - exitProgress,
    transition: "transform 0.4s, opacity 0.4s"
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 pb-0 gap-0 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 w-full flex min-h-screen items-center">
        {/* Vertical Navigation Menu */}
        <nav className="flex flex-col gap-10 border-r border-t border-b border-red-500 min-w-[60px] items-left h-auto fixed top-1/2 left-0 -translate-y-1/2 z-20 bg-gray-600 dark:bg-licorice shadow-lg rounded-r-xl pt-5 pb-5 pl-5 pr-1 justify-center">
            {[
            { href: "/", icon: "/home.png", alt: "Home Icon", label: "| Home" },
            { href: "/Projects", icon: "/projects.png", alt: "Projects Icon", label: "| Projects" },
            { href: "https://github.com/connorknoetze", icon: "/github.png", alt: "Github Icon", label: "| Github", external: true },
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
              <span
              className="ml-2 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[120px] transition-all duration-500 overflow-hidden whitespace-nowrap"
              >
              {label}
              </span>
            </a>
            ))}
        </nav>
        {/* Main Content */}
        <main className="flex flex-col gap-[32px] flex-1 items-center sm:items-start pl-8 ml-[100px]">
          {/* Sticky Animated Section Container at the top */}
          <div className="relative w-full h-[150vh] flex items-start justify-center">
            <div
              ref={sectionRef}
              className="sticky top-10 flex flex-row items-center w-full h-screen min-h-[300px] justify-center"
              style={exitStyle}
            >
              {/* Textbox */}
              <div
                className={`flex-1 flex flex-col justify-center w-[350px] max-w-[400px] text-white dark:text-white bg-gray-600 dark:bg-licorice rounded-lg shadow-lg p-8 mb-20 h-[100vh] transition-all duration-700 ease-out
                  ${visible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"}`}
              >
                <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
                <p className="text-lg text-white dark:text-gray-200">This is an animated section. As you scroll, both this text and the image will slide in from the left to reveal more about me and my work.</p>
              </div>
                <div
                className={`flex-1 max-w-[30vw]
                  ${visible ? "translate-x-0 opacity-100" : "-translate-x-32 opacity-0"} hidden 2xl:flex`}
                >
                  
                </div>
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
          {/* Placeholder for page length */}
          <div className="h-[2000px] w-full"></div>
        </main>
      </div>
    </div>
  );
}
