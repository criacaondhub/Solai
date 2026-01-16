import { HeroSection } from "./components/sol/HeroSection";
import { CardStackSection } from "./components/sol/CardStackSection";
import { TestimonialsSection } from "./components/sol/TestimonialsSection";
import { ExpertSection } from "./components/sol/ExpertSection";
import { PricingSection } from "./components/sol/PricingSection";
import { FAQSection } from "./components/sol/FAQSection";
import { ScrollBackgroundOrbs } from "./components/sol/ScrollBackgroundOrbs";

export default function App() {
  return (
    <main className="relative">
      <HeroSection />
      <CardStackSection />
      
      {/* Light Sections Group with Unified Parallax */}
      <div className="relative bg-[#FFFAFA] overflow-hidden">
        <ScrollBackgroundOrbs />
        <TestimonialsSection />
        <ExpertSection />
      </div>

      <PricingSection />
      
      <div className="bg-[#0D0D0D] flex justify-center items-center py-2 relative z-10">
        <div className="w-20 h-1.5 bg-[#CC3300] rounded-full opacity-80 shadow-[0_0_15px_rgba(204,51,0,0.4)]" />
      </div>

      <FAQSection />
    </main>
  );
}
