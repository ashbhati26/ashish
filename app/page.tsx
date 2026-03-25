"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Hero from "./sections/Hero";
import Description from "./sections/Description";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import TechStack from "./components/TeckStack";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          document.body.style.overflow = "";
        }}
      >
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Hero />
      
      <Description />
      <TechStack />
      <Projects />
      <div className="mt-32">
        <Contact />
      </div>
    </main>
  );
}
