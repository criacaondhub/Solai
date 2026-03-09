import { motion } from "motion/react";
import { Check } from "lucide-react";

import logoscartao from "@/assets/logoscartao.webp";

export function PricingSectionPlano() {
  const checkoutUrl = "https://pay.kiwify.com.br/BZrDDCS";

  const features = [
    "Acesso à SOL 24h por dia",
    "Suporte via WhatsApp",
    "Dicas de Receitas",
    "Análise da foto do prato",
    "Auxílio na quebra do jejum",
    "Análise de ingredientes",
    "Baseado no conhecimento da Dra. Maíra",
    "1 ano de acesso"
  ];

  return (
    <section id="pricing" className="relative w-full py-20 lg:py-32 bg-[#0D0D0D] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#CC3300]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#CC3300]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">

        {/* Mobile Header */}
        <div className="text-center mb-12 lg:hidden">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-3xl md:text-5xl font-bold leading-tight font-[Roboto] mb-6"
          >
            Sua saúde merece <br /> <span className="text-[#CC3300]">o melhor cuidado.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl font-light"
          >
            Tenha a inteligência artificial da SOL ao seu lado 24h por dia.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Left Column - List */}
          <div className="flex-1 w-full order-1 lg:order-1">
            <div className="hidden lg:block">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-white text-[50px] font-bold leading-[1.1] font-[Roboto] mb-10"
              >
                Sua saúde merece <br /> <span className="text-[#CC3300]">o melhor cuidado.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg md:text-xl font-light mb-10 max-w-[700px]"
              >
                Garanta o acesso completo à SOL e transforme sua rotina <br /> com monitoramento inteligente e suporte especializado.
              </motion.p>
            </div>

            {/* Translucent Box for Items */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 lg:p-8 backdrop-blur-sm group/box relative overflow-hidden"
            >
              <h3 className="text-[#CC3300] font-bold text-sm lg:text-base uppercase tracking-widest mb-8 border-b border-white/10 pb-6 text-center lg:text-left">
                Tudo o que você terá acesso agora:
              </h3>

              <div className="space-y-3">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#CC3300]/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#CC3300]" />
                    </div>
                    <span className="text-white/90 text-base lg:text-lg font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Price Box */}
          <div className="w-full lg:w-[480px] order-2 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-[1.5px] rounded-[40px] overflow-hidden group shadow-[0_0_60px_rgba(204,51,0,0.15)] bg-white/10"
            >
              {/* Border Beam Animation */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 80%, #CC3300 100%)",
                  }}
                />
              </div>

              <div className="relative z-10 bg-[#0D0D0D] rounded-[39px] p-10 lg:p-12 flex flex-col items-center text-center">
                {/* Inner Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#CC3300]/10 to-transparent pointer-events-none" />

                <div className="space-y-4 mb-8">
                  {/* Temporary Discount Banner */}
                  <div className="flex items-center justify-center gap-1.5 md:gap-2.5 mb-3">
                    <div className="w-4 h-4 border-2 border-[#CC3300]/20 border-t-[#CC3300] rounded-full animate-spin" />
                    <span className="text-[#CC3300] text-[11px] lg:text-sm font-black tracking-normal md:tracking-[0.2em] uppercase text-center">
                      DESCONTO TEMPORÁRIO EXPIRANDO
                    </span>
                  </div>

                  <p className="text-white/60 text-sm lg:text-base font-bold tracking-widest uppercase">
                    POR APENAS 12X DE
                  </p>
                  <div className="flex items-start justify-center text-white">
                    <span className="text-3xl lg:text-[40px] font-black mt-4 mr-1">R$</span>
                    <span className="text-[96px] lg:text-[132px] font-black leading-none tracking-tighter">20</span>
                    <span className="text-4xl lg:text-[46px] font-black mt-4 ml-1">,37</span>
                  </div>
                </div>

                <p className="text-white/80 font-bold text-sm lg:text-lg mb-10 tracking-wide uppercase">
                  OU R$ 197,00 À VISTA
                </p>

                {/* CTA Button */}
                <div className="w-full relative group isolate">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0px 0px 0px rgba(16, 185, 129, 0)",
                        "0px 0px 30px rgba(16, 185, 129, 0.4)",
                        "0px 0px 0px rgba(16, 185, 129, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[#10B981] group-hover:bg-[#059669] transition-colors rounded-2xl -z-10"
                  />
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-8 py-5 text-white font-black text-lg leading-none md:leading-normal tracking-tight uppercase text-center"
                  >
                    QUERO MEU ACESSO <br className="md:hidden" /> À SOL AGORA
                  </a>
                </div>

                <div className="mt-8 flex justify-center w-full opacity-60">
                  <img
                    src={logoscartao}
                    alt="Formas de Pagamento"
                    className="h-6 md:h-8 object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}