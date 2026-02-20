import { motion } from "motion/react";
import { Check, Info, X } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useIsMobile } from "../ui/use-mobile";

// Shared features list with titles and generic subtitles
const commonFeatures = [
  {
    title: "Acesso à SOL 24h por dia",
    subtitle: "Orientação sempre disponível, no momento em que a dúvida aparece."
  },
  {
    title: "Suporte via WhatsApp",
    subtitle: "Dúvidas sobre o funcionamento da SOL? Nossa equipe te ajuda!"
  },
  {
    title: "Dicas de Receitas",
    subtitle: "Sugestões deliciosas e saudáveis personalizadas para seu jejum."
  },
  {
    title: "Análise da foto do prato",
    subtitle: "Envie uma foto e receba feedback nutricional instantâneo."
  },
  {
    title: "Auxílio na quebra do jejum",
    subtitle: "Orientações claras para evitar erros, sintomas e insegurança."
  },
  {
    title: "Análise de ingredientes",
    subtitle: "Saiba exatamente o que você está consumindo e seus benefícios."
  },
  {
    title: "Baseado no conhecimento\nda Dra. Maíra",
    subtitle: "Experiência clínica real, método próprio e formação internacional."
  },
  {
    title: "Uso compartilhado",
    subtitle: "Até dois números usando a SOL."
  },
  {
    title: "Uso familiar",
    subtitle: "Até quatro números conectados ao mesmo plano."
  }
];

const basePlans = [
  {
    id: "solo",
    name: "Plano Solo",
    prices: {
      mensal: { value: "R$ 29", details: null },
      semestral: { value: "R$ 27,58", details: "ou R$ 147,00 à vista" },
      anual: { value: "R$ 25,55", details: "ou R$ 247,00 à vista" }
    },
    checkoutLinks: {
      mensal: "https://pay.kiwify.com.br/rIRcNUZ",
      semestral: "https://pay.kiwify.com.br/Y2KcAql",
      anual: "https://pay.kiwify.com.br/r3PTOKe"
    },
    period: "/mês",
    buttonText: "Escolher este plano",
    popular: false
  },
  {
    id: "duo",
    name: "Plano Duo",
    prices: {
      mensal: { value: "R$ 47", details: null },
      semestral: { value: "R$ 42,59", details: "ou R$ 227,00 à vista" },
      anual: { value: "R$ 41,27", details: "ou R$ 399,00 à vista" }
    },
    checkoutLinks: {
      mensal: "https://pay.kiwify.com.br/RCJTmmv",
      semestral: "https://pay.kiwify.com.br/Bfqp8rg",
      anual: "https://pay.kiwify.com.br/lECIVO7"
    },
    period: "/mês",
    buttonText: "Escolher este plano",
    popular: true
  },
  {
    id: "familia",
    name: "Plano Família",
    prices: {
      mensal: { value: "R$ 75", details: null },
      semestral: { value: "R$ 67,91", details: "ou R$ 362,00 à vista" },
      anual: { value: "R$ 65,98", details: "ou R$ 638,00 à vista" }
    },
    checkoutLinks: {
      mensal: "https://pay.kiwify.com.br/ebap4Hh",
      semestral: "https://pay.kiwify.com.br/KCzitPp",
      anual: "https://pay.kiwify.com.br/lfk8Mfs"
    },
    period: "/mês",
    buttonText: "Escolher este plano",
    popular: false
  }
];

export function PricingSection() {
  const isMobile = useIsMobile();
  // State object to manage billing cycles independently for each plan
  const [billingCycles, setBillingCycles] = useState<Record<string, "mensal" | "semestral" | "anual">>({
    solo: "anual",
    duo: "anual",
    familia: "anual"
  });

  const handleCycleChange = (planId: string, cycle: "mensal" | "semestral" | "anual") => {
    setBillingCycles(prev => ({
      ...prev,
      [planId]: cycle
    }));
  };

  return (
    <section id="pricing" className="bg-[#0D0D0D] py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#CC3300]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#CC3300]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-3xl md:text-5xl font-bold leading-tight font-[Roboto] mb-6"
          >
            Escolha um dos <br className="md:hidden" /> <span className="text-[#CC3300]">nossos planos.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl max-w-4xl mx-auto font-light"
          >
            Saúde e alimentação a um clique de distância, 24h por dia no seu WhatsApp.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {basePlans.map((plan, index) => {
            const currentCycle = billingCycles[plan.id];
            const currentPrice = plan.prices[currentCycle];
            const checkoutUrl = (plan as any).checkoutLinks ? (plan as any).checkoutLinks[currentCycle] : "#";

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col p-8 rounded-[32px] border transition-all duration-500 group ${plan.popular
                  ? "bg-white/[0.05] border-[#CC3300]/40 shadow-[0_0_40px_rgba(204,51,0,0.1)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  } backdrop-blur-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#CC3300] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    Mais Popular
                  </div>
                )}

                {/* Card Header with Independent Internal Toggle */}
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-start md:gap-2">
                    <h3 className={`text-white font-bold ${'text-lg'}`}>{plan.name}</h3>

                    {/* Internal Toggle */}
                    <div className="flex flex-col w-full md:w-auto items-end gap-2">
                      <div className="grid grid-cols-3 w-full md:w-auto md:flex bg-white/5 rounded-lg p-1 border border-white/5">
                        {["mensal", "semestral", "anual"].map((cycle) => (
                          <button
                            key={cycle}
                            onClick={() => handleCycleChange(plan.id, cycle as "mensal" | "semestral" | "anual")}
                            className={`px-2 py-1 rounded-md text-[10px] font-bold capitalize transition-all duration-300 ${currentCycle === cycle
                              ? "bg-[#CC3300] text-white"
                              : "text-white/70 hover:text-white/100"
                              }`}
                          >
                            {cycle}
                          </button>
                        ))}
                      </div>
                      <div className="text-[#CC3300] text-[10px] font-bold bg-white px-2 py-0.5 rounded-full">
                        Economize 29%
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-baseline gap-1">
                      {/* Display "6x" or "12x" if semestral/anual */}
                      {currentCycle === 'semestral' && <span className="text-white/60 text-lg font-medium mr-1">6x</span>}
                      {currentCycle === 'anual' && <span className="text-white/60 text-lg font-medium mr-1">12x</span>}

                      <span className={`text-white font-bold tracking-tight ${plan.id === 'familia' ? 'text-4xl md:text-5xl' : 'text-5xl'}`}>{currentPrice.value}</span>
                      <span className="text-white/40 text-sm">{plan.period}</span>
                    </div>

                    {currentPrice.details && (
                      <span className="text-white/40 text-sm md:text-xs mt-1 block font-light">{currentPrice.details}</span>
                    )}
                  </div>
                </div>

                <a
                  id={`btn-${plan.id}-${currentCycle}`}
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 mb-8 border border-[#CC3300]/20 flex items-center justify-center ${plan.popular
                    ? "bg-[#CC3300] text-white shadow-lg shadow-[#CC3300]/20 hover:scale-[1.02]"
                    : "bg-transparent text-[#CC3300] hover:bg-[#CC3300] hover:text-white"
                    }`}
                >
                  {plan.buttonText}
                </a>

                <div className="flex flex-col gap-4 mt-auto">
                  {commonFeatures.map((feature, i) => {
                    // Logic for icons and opacity based on plan and feature index
                    let isExcluded = false;
                    let useGreenCheck = false;

                    // Feature 8: "Uso compartilhado" (Index 7)
                    if (i === 7) {
                      if (plan.id === 'solo') {
                        isExcluded = true;
                      } else {
                        // Duo and Familia have this
                        useGreenCheck = true;
                      }
                    } else if (i === 8) { // Feature 9: "Uso familiar" (Index 8)
                      if (plan.id === 'solo' || plan.id === 'duo') {
                        isExcluded = true;
                      } else {
                        // Only Familia has this
                        useGreenCheck = true;
                      }
                    }

                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {isExcluded ? (
                            <X className="w-4 h-4 text-white/30" />
                          ) : useGreenCheck ? (
                            <Check className="w-4 h-4 text-[#25D366]" />
                          ) : (
                            <Check className="w-4 h-4 text-[#CC3300]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className={`text-sm leading-tight whitespace-pre-line ${isExcluded ? 'text-white/30 font-light' : 'text-white font-normal'}`}>
                            {feature.title}
                          </span>

                          {!isExcluded && (
                            isMobile ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button className="text-white/20 hover:text-[#CC3300] transition-colors focus:outline-none cursor-help">
                                    <Info className="w-3.5 h-3.5" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent
                                  side="top"
                                  className="bg-[#CC3300] border-none text-white p-3 text-xs max-w-[200px] shadow-xl rounded-xl z-50 overflow-visible"
                                >
                                  <p className="font-light leading-relaxed">{feature.subtitle}</p>
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#CC3300] rotate-45" />
                                </PopoverContent>
                              </Popover>
                            ) : (
                              <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="text-white/20 hover:text-[#CC3300] transition-colors focus:outline-none cursor-help">
                                      <Info className="w-3.5 h-3.5" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="bg-[#CC3300] border-none text-white p-3 text-xs max-w-[200px] shadow-xl rounded-xl z-50 [--primary:#CC3300]"
                                  >
                                    <p className="font-light leading-relaxed">{feature.subtitle}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-white/60 text-xs text-[14px]"
        >
          * Pagamento seguro via Kiwify. 7 dias de garantia. Cancele quando quiser.
        </motion.p>
      </div>
    </section>
  );
}