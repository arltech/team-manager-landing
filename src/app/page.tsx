import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Problem } from "./_components/Problem";
import { Solution } from "./_components/Solution";
import { SocialProof } from "./_components/SocialProof";
import { Offer } from "./_components/Offer";
import { Faq } from "./_components/Faq";
import { CtaFinal } from "./_components/CtaFinal";
import { StickyMobileCta } from "./_components/StickyMobileCta";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <SocialProof />
        <Offer />
        <Faq />
        <CtaFinal />
        <StickyMobileCta />
      </main>
    </>
  );
}
