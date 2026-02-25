import { Ticker } from "./Ticker";
import { FeatureBoxes } from "./FeatureBoxes";
import SplitText from "./SplitText";
import { ScrollBackgroundOrbs } from "./ScrollBackgroundOrbs";
import StartChatButton from "./StartChatButton";
import gsap from "gsap";
import solMotion from "../../../assets/video-sol-transparente.webm";

import solLogo from "@/assets/logo-sol.webp";
import solMobileImg from "@/assets/img-mobile.webp";

export function HeroSection({ isFreemium, ctaUrl }: { isFreemium?: boolean; ctaUrl?: string }) {
  return (
    <div className="bg-[#FFFAFA] min-h-screen flex flex-col font-[Roboto] relative overflow-hidden">
      {/* Unified Scroll-based Parallax Orbs for Light Sections */}
      <ScrollBackgroundOrbs />

      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <Ticker isFreemium={isFreemium} />

        <div className="flex-1 flex flex-col items-center py-16 md:py-24 px-4 w-full max-w-[1440px] mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full mb-16">

            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 lg:max-w-2xl">
              {/* Logo */}
              <div className="mb-8 lg:mb-12 hidden lg:block">
                <img
                  src={solLogo}
                  alt="SOL Logo"
                  className="h-16 md:h-20 object-contain"
                />
              </div>

              {/* Disclaimer H2 */}
              <div className="bg-[#FAE6E1] px-6 py-3 rounded-full mb-8 w-fit mx-auto lg:mx-0 max-w-full">
                <h2 className="text-[rgb(204,51,0)] font-medium text-sm md:text-base leading-tight font-[Roboto] font-normal uppercase whitespace-normal text-center lg:text-left">
                  {isFreemium ? (
                    <>
                      <span className="font-black underline-offset-4">Experimente grátis</span> — Sua assistente de Saúde e Jejum no WhatsApp
                    </>
                  ) : (
                    <>
                      A <span className="font-black">maior e melhor</span> assistente virtual <br />
                      focada na sua <span className="font-black">Saúde e Bem-Estar</span>
                    </>
                  )}
                </h2>
              </div>

              {/* Headline H1 - Animated with SplitText */}
              <h1 className="text-[rgb(30,21,20)] text-4xl md:text-5xl lg:text-[58px] leading-[1.1] mb-8 tracking-tight font-[Roboto] font-bold text-wrap text-center lg:text-left">
                <SplitText
                  text="Oi, eu sou a SOL!"
                  className="inline text-[#cc3300]"
                  delay={50}
                  duration={0.6}
                  ease="power3.out"
                />
                <br />
                {isFreemium ? (
                  <>
                    <SplitText
                      text="A inteligência artificial que te acompanha no jejum e na saúde. "
                      className="inline"
                      delay={350}
                      duration={0.6}
                      ease="power3.out"
                    />
                    <span className="text-[#CC3300] inline">
                      <SplitText
                        text="Grátis pra você "
                        className="inline"
                        delay={1200}
                        duration={0.6}
                        ease="power3.out"
                      />
                      <br className="md:hidden" />
                      <SplitText
                        text="testar agora."
                        className="inline"
                        delay={1200}
                        duration={0.6}
                        ease="power3.out"
                      />
                    </span>
                  </>
                ) : (
                  <SplitText
                    text="A inteligência artificial criada para cuidar de você, da sua saúde e do seu Jejum pelo WhatsApp"
                    className="inline"
                    delay={350}
                    duration={0.6}
                    ease="power3.out"
                  />
                )}
              </h1>

              <div className="mb-10 lg:mb-0 mt-2">
                <StartChatButton
                  text={isFreemium ? "Quero fazer o teste grátis" : "Quero falar com a SOL"}
                  onClick={() => {
                    if (isFreemium && ctaUrl) {
                      window.open(ctaUrl, "_blank");
                      return;
                    }
                    const element = document.getElementById("pricing");
                    if (element) {
                      const targetY = element.getBoundingClientRect().top + window.pageYOffset;
                      const obj = { y: window.pageYOffset };
                      gsap.to(obj, {
                        y: targetY,
                        duration: 1.5,
                        ease: "power4.inOut",
                        onUpdate: () => window.scrollTo(0, obj.y)
                      });
                    }
                  }}
                  className="!px-12 py-[28px] border-none shadow-xl px-[48px]"
                />
              </div>
            </div>

            {/* Right Side: Motion Video (Desktop) / Image (Mobile) */}
            <div className="order-1 lg:order-2 flex justify-center items-center lg:w-[760px]">
              <div className="relative w-full lg:w-[760px] flex justify-center">
                <video
                  src={solMotion}
                  autoPlay
                  muted
                  playsInline
                  style={{ width: '100%', maxWidth: '760px', minWidth: '760px' }}
                  className="h-auto object-contain drop-shadow-2xl hidden lg:block"
                />
                {/* Mobile version uses static image */}
                <img
                  src={solMobileImg}
                  alt="Sol Interface Mobile"
                  className="w-full h-auto object-contain drop-shadow-2xl lg:hidden"
                />
              </div>
            </div>

          </div>

          {/* Feature Boxes - Kept centered below */}
          <div className="w-full flex justify-center">
            <FeatureBoxes />
          </div>

          {/* Chat Mockups */}
        </div>
      </div>
    </div>
  );
}