"use client";

import Contact from "../sections/Contact";
import AboutHero from "./_components/AboutHero";
import Services from "./_components/Services";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <AboutHero />
      <Services />
      <div className="mt-32">
        <Contact />
      </div>
    </main>
  );
}
