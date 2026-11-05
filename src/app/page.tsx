import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Services />
        <Contact />
      </main>
    </>
  );
}
