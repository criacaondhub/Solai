import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { motion } from "motion/react";

const faqData = [
  {
    question: "A SOL funciona pra mim?",
    answer:
      "Sim. A SOL foi criada para pessoas que querem cuidar da alimentação e do jejum com mais clareza, segurança e orientação prática, mesmo sem conhecimento prévio. Ela se adapta às suas dúvidas, rotina e momento atual, utilizando protocolos baseados na experiência clínica e no conhecimento da Dra. Maíra. Se você quer decisões mais conscientes no dia a dia, a SOL funciona para você.",
  },
  {
    question: "Como terei acesso à SOL?",
    answer:
      "Seu acesso à SOL é feito 100% pelo WhatsApp. Não é necessário baixar aplicativos nem acessar plataformas externas.",
  },
  {
    question: "Minhas conversas com a SOL são seguras?",
    answer:
      "Sim. Suas conversas com a SOL são protegidas pela criptografia nativa do WhatsApp. Além disso, todas as informações seguem as diretrizes da Lei Geral de Proteção de Dados (LGPD).",
  },
  {
    question: "Preciso ter conhecimento técnico para usar a SOL?",
    answer:
      "Não. A SOL foi desenvolvida para ser simples e intuitiva. Ela é uma agente de inteligência artificial treinada com o conhecimento da Dra. Maíra e vai te orientar de forma clara em dúvidas sobre alimentação, jejum e escolhas do dia a dia.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. Você pode cancelar sua assinatura a qualquer momento. Basta entrar em contato com a equipe de suporte e solicitar o cancelamento.",
  },
  {
    question: "Se eu cancelar a assinatura, vou perder acesso à SOL?",
    answer:
      "Caso o cancelamento seja feito antes do término do período contratado, você continuará com acesso à SOL até a data final da sua assinatura. Após esse prazo, o acesso será suspenso automaticamente.",
  },
  {
    question: "Assinei a SOL e não gostei. Posso pedir reembolso?",
    answer:
      "Sim. Você pode solicitar o reembolso em até 7 dias corridos após a data da compra, conforme previsto por lei.",
  },
  {
    question: "Por onde posso tirar dúvidas sobre o funcionamento da SOL?",
    answer:
      "Você pode falar diretamente com a nossa equipe de suporte. Eles ajudam com dúvidas sobre acesso, funcionamento da plataforma, assinatura ou qualquer questão técnica que não envolva jejum ou alimentação.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-[#0D0D0D] py-16 md:py-24 px-6 relative overflow-hidden">
      {/* Background Decor - consistent with PricingSection but cleaner */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CC3300]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight font-[Roboto] mb-6">
            Perguntas <span className="text-[#CC3300]">Frequentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/10 last:border-0"
              >
                <AccordionTrigger className="text-white hover:text-[#CC3300] hover:no-underline transition-colors text-left font-medium text-base md:text-lg py-5 [&>svg]:text-[#CC3300]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 font-light leading-relaxed text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Support CTA Box */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-16 relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 md:p-12 text-center"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#CC3300] to-transparent opacity-50" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-[Roboto]">
                Fale com nossa equipe
            </h3>
            
            <p className="text-white/60 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Ficou com alguma dúvida sobre como a SOL pode te ajudar no seu jejum e alimentação? Fale com nossa equipe e descubra como transformar sua saúde.
            </p>
            
            <button 
                onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
                className="inline-flex items-center gap-2 bg-[#CC3300] hover:bg-[#CC3300]/90 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(204,51,0,0.3)] hover:shadow-[0_4px_30px_rgba(204,51,0,0.5)] hover:-translate-y-1"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Conversar no WhatsApp
            </button>
            
            <p className="mt-8 text-white/30 text-xs md:text-sm font-light">
                Resposta rápida e atendimento humanizado. Clique no botão acima e fale conosco agora mesmo!
            </p>
        </motion.div>
      </div>
    </section>
  );
}
