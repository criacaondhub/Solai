import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ScrollBackgroundOrbs } from "@/app/components/sol/ScrollBackgroundOrbs";
import StartChatButton from "./StartChatButton";

const imgICley = "https://i.postimg.cc/05pmcpk9/Captura-de-tela-2025-09-29-110706.jpg";
const imgMonica = "https://i.postimg.cc/j5fNVfzb/Captura-de-tela-2025-09-29-110542.jpg";
const imgEddy = "https://i.postimg.cc/c403jrCc/Captura-de-tela-2025-09-29-110825.jpg";

const testimonials = [
  {
    id: "monica",
    image: imgMonica,
    name: "Mônica",
    className: "md:col-span-2 md:row-span-1",
    delay: 0.1
  },
  {
    id: "icley",
    image: imgICley,
    name: "iCley",
    className: "md:col-span-1 md:row-span-1",
    delay: 0.2
  },
  {
    id: "eddy",
    image: imgEddy,
    name: "Eddy & Liane",
    className: "md:col-span-3 md:row-span-2",
    delay: 0.3
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[rgb(30,21,20)] text-3xl md:text-5xl font-bold leading-tight whitespace-pre-line font-[Roboto]"
          >
            Veja como a <span className="text-[#cc3300]">SOL</span> está transformando{"\n"}
            o dia-a-dia das pessoas
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[32px] border-2 border-transparent bg-white shadow-sm hover:shadow-2xl hover:border-[#CC3300]/30 transition-all duration-500 cursor-default ${item.className}`}
            >
              {/* Print Image Container */}
              <div className="w-full h-full bg-[#0b141a] flex items-center justify-center overflow-hidden relative">
                <ImageWithFallback
                  src={item.image}
                  alt={`Depoimento de ${item.name}`}
                  className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.1]"
                />
                
                {/* Subtle Inner Glow to make the print pop */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] pointer-events-none" />
              </div>

              {/* Decorative Badge - Always visible and clean */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-[#CC3300]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-sm">
                  Relato Real
                </div>
              </div>

              {/* Animated Stroke/Contour Overlay (cc3300) */}
              <div className="absolute inset-0 border-2 border-[#CC3300] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[32px] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Call to action / Disclaimer */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
        >
            <div className="flex flex-col items-center gap-10">
              <p className="text-[rgb(30,21,20)]/40 text-sm font-medium italic">
                * Relatos reais compartilhados via WhatsApp. A privacidade dos nossos usuários é nossa prioridade.
              </p>
              <StartChatButton
                onClick={() =>
                  window.open("https://wa.me/5511999999999", "_blank")
                }
                className="!px-12 py-[28px] border-none shadow-xl"
              />
            </div>
        </motion.div>

        {/* Subtle Horizontal Separator */}
        <div className="mt-20 w-full flex justify-center">
          <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[#CC3300]/15 to-transparent" />
        </div>
      </div>
    </section>
  );
}