import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ScrollBackgroundOrbs } from "@/app/components/sol/ScrollBackgroundOrbs";
import expertImg from "figma:asset/c3844261a399295273b46bc28600e735e33e3672.png";

export function ExpertSection() {
  return (
    <section className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <h2 className="text-[rgb(30,21,20)] text-3xl md:text-5xl font-bold leading-tight whitespace-pre-line font-[Roboto]">
              Entenda quem está {"\n"}
              por trás da <span className="text-[#CC3300]">SOL.</span>
            </h2>

            <div className="w-12 h-[2px] bg-[#CC3300]/60 rounded-full" />

            <div className="text-[rgb(30,21,20)]/80 text-lg md:text-xl leading-relaxed font-light whitespace-pre-line font-[Roboto] flex flex-col gap-6">
              <p>
                <strong className="text-[rgb(30,21,20)] font-semibold">Dra. Maíra Soliani</strong> é médica PhD, especialista em medicina funcional e jejum intermitente.
              </p>
              
              <p>
                Ao longo dos últimos 8 anos já ajudou mais de 5.000 pessoas a transformarem sua saúde, emagrecer e melhorar o metabolismo aplicando estratégias baseadas na ciência.
              </p>

              <p>
                Criou a <span className="text-[#CC3300] font-medium">SOL</span> com o intuito de democratizar o acesso a conhecimentos aprofundados sobre jejum e alimentação que transformam vidas.
              </p>

              <p>
                Ficou meses desenvolvendo esta inteligência junto com um time de tecnologia completo, para garantir a segurança e qualidade de ponta a ponta.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glass Backdrop Decoration */}
            <div className="absolute -inset-4 bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-2xl -z-10 transform rotate-2 md:rotate-3" />
            
            <div className="relative overflow-hidden rounded-[32px] shadow-2xl group border border-white/10">
              <ImageWithFallback
                src={expertImg}
                alt="Dra. Maíra Soliani"
                className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1514]/20 to-transparent pointer-events-none" />
              
              {/* Expert Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 flex flex-col gap-1">
                  <span className="text-white text-lg font-bold">Dra. Maíra Soliani</span>
                  <span className="text-white/70 text-sm uppercase tracking-widest font-medium">Médica PhD & Criadora da SOL</span>
                </div>
              </div>
            </div>

            {/* Accent Blur */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#CC3300]/20 rounded-full blur-[60px] pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
