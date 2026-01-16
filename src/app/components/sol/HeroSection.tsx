import { Ticker } from "./Ticker";
import { FeatureBoxes } from "./FeatureBoxes";
import { ChatMockups } from "./ChatMockups";
import SplitText from "./SplitText";
import { ScrollBackgroundOrbs } from "./ScrollBackgroundOrbs";
import StartChatButton from "./StartChatButton";
import solLogo from "figma:asset/d0ce00d0a5c69103cc27ccf53dcfcadc528cbeca.png";

export function HeroSection() {
  return (
    <div className="bg-[#FFFAFA] min-h-screen flex flex-col font-[Roboto] relative overflow-hidden">
      {/* Unified Scroll-based Parallax Orbs for Light Sections */}
      <ScrollBackgroundOrbs />
      
      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        <Ticker />

        <div className="flex-1 flex flex-col items-center py-16 md:py-24 px-4 text-center w-full max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="mb-12">
            <img
              src={solLogo}
              alt="SOL Logo"
              className="h-20 md:h-20 object-contain"
            />
          </div>

          {/* Disclaimer H2 */}
          <div className="bg-[#FAE6E1] px-6 py-3 rounded-full mb-8 w-fit mx-auto max-w-full">
            <h2 className="text-[rgb(204,51,0)] font-medium text-sm md:text-base leading-snug font-[Roboto] font-bold uppercase whitespace-normal text-center md:whitespace-nowrap">
              Você ainda não tem uma assistente virtual que
              cuida da sua alimentação, do seu metabolismo e da
              sua saúde?
            </h2>
          </div>

          {/* Headline H1 - Animated with SplitText */}
          <h1 className="text-[rgb(30,21,20)] md:text-5xl lg:text-6xl w-full max-w-6xl mx-auto leading-tight mb-8 tracking-tight font-[Roboto] font-bold flex flex-col items-center gap-1 md:gap-1">
            <SplitText
              text="Tenha acesso a SOL."
              className="block"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />

            <SplitText
              text="Uma Inteligência Artificial feita"
              className="block"
              delay={150}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />

            <div className="block">
              <SplitText
                text="para cuidar de você."
                className="block md:inline-block mr-0 md:mr-3"
                delay={250}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              <SplitText
                text="Tudo isso por WhatsApp"
                className="block md:inline-block text-[#25D366]"
                delay={350}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 0 }} // Keep green part simpler or same
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>
          </h1>

          <div className="mb-10 mt-2">
            <StartChatButton
              onClick={() =>
                window.open(
                  "https://wa.me/5511999999999",
                  "_blank",
                )
              }
              className="!px-12 py-[28px] border-none shadow-xl px-[48px]"
            />
          </div>

          {/* Feature Boxes */}
          <FeatureBoxes />

          {/* Chat Mockups */}
          <ChatMockups />
        </div>
      </div>
    </div>
  );
}
