import { Routes, Route } from "react-router-dom";
import { HeroSection } from "./components/sol/HeroSection";
import { CardStackSection } from "./components/sol/CardStackSection";
import { TestimonialsSection } from "./components/sol/TestimonialsSection";
import { ExpertSection } from "./components/sol/ExpertSection";
import { PricingSection } from "./components/sol/PricingSection";
import { FAQSection } from "./components/sol/FAQSection";
import { ScrollBackgroundOrbs } from "./components/sol/ScrollBackgroundOrbs";
import { OnboardingPage } from "./components/sol/OnboardingPage";
import { FloatingWhatsAppButton } from "./components/sol/FloatingWhatsAppButton";
import { PricingSectionPlano } from "./components/sol/PricingSectionPlano";

function LandingPage({ isFreemium, ctaUrl }: { isFreemium?: boolean; ctaUrl?: string }) {
  return (
    <main className="relative">
      <HeroSection isFreemium={isFreemium} ctaUrl={ctaUrl} />
      <CardStackSection />

      {/* Light Sections Group with Unified Parallax */}
      <div className="relative bg-[#FFFAFA] overflow-hidden">
        <ScrollBackgroundOrbs />
        <TestimonialsSection ctaUrl={ctaUrl} isFreemium={isFreemium} />
        <ExpertSection />
      </div>

      <PricingSection ctaUrl={ctaUrl} />

      <div className="bg-[#0D0D0D] flex justify-center items-center py-2 relative z-10">
        <div className="w-20 h-1.5 bg-[#CC3300] rounded-full opacity-80 shadow-[0_0_15px_rgba(204,51,0,0.4)]" />
      </div>

      <FAQSection ctaUrl={ctaUrl} />
      <FloatingWhatsAppButton />
    </main>
  );
}

function LandingPagePlano({ ctaUrl }: { ctaUrl?: string }) {
  return (
    <main className="relative">
      <HeroSection ctaUrl={ctaUrl} />
      <CardStackSection />

      {/* Light Sections Group with Unified Parallax */}
      <div className="relative bg-[#FFFAFA] overflow-hidden">
        <ScrollBackgroundOrbs />
        <TestimonialsSection ctaUrl={ctaUrl} />
        <ExpertSection />
      </div>

      <PricingSectionPlano ctaUrl={ctaUrl} />

      <div className="bg-[#0D0D0D] flex justify-center items-center py-2 relative z-10">
        <div className="w-20 h-1.5 bg-[#CC3300] rounded-full opacity-80 shadow-[0_0_15px_rgba(204,51,0,0.4)]" />
      </div>

      <FAQSection ctaUrl={ctaUrl} />
      <FloatingWhatsAppButton />
    </main>
  );
}

export default function App() {
  const freemiumCtaUrl = "https://wa.link/w1q3xs";

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/freemium" element={<LandingPage isFreemium={true} ctaUrl={freemiumCtaUrl} />} />
      <Route path="/plano" element={<LandingPagePlano />} />
      <Route path="/obrigado" element={<OnboardingPage />} />
    </Routes>
  );
}
