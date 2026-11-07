import { Preloader } from "@/components/motion/Preloader";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Value } from "@/components/sections/Value";
import { Architecture } from "@/components/sections/Architecture";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { Ownership } from "@/components/sections/Ownership";
import { Process } from "@/components/sections/Process";
import { Examples } from "@/components/sections/Examples";
import { Model } from "@/components/sections/Model";
import { Principles } from "@/components/sections/Principles";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Value />
        <Architecture />
        <div className="mt-28 md:mt-40">
          <Services />
        </div>
        <Products />
        <Ownership />
        <Process />
        <Examples />
        <Model />
        <Principles />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
