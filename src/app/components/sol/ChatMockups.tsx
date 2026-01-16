import { motion, AnimatePresence, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import solLogo from "figma:asset/d0ce00d0a5c69103cc27ccf53dcfcadc528cbeca.png";
import solAvatar from "figma:asset/d586e975fff0287aa0f7a40d12aef8a4974e4978.png";
import plateImage from "figma:asset/86254d01d9369815ae18743acc72963618a5da9a.png";

// Mockup Data
const MOCKUPS = [
  {
    id: 1,
    title: "Análise de Prato",
    userMsg: {
      type: "user",
      content: "image",
      src: plateImage,
      caption: "Oi Sol, pode avaliar meu prato?",
    },
    solMessages: [
      "Olá! Seu prato tem uma boa variedade de proteínas (carne de porco, linguiça, ovo, bolinho de carne), o que é ótimo para saciedade e metabolismo. A couve refogada é uma excelente escolha de vegetal verde escuro, rica em nutrientes. O feijão com legumes também traz fibras e micronutrientes importantes.",
      "Porém, o arroz branco é uma fonte de carboidrato simples, e o bacon, linguiça e bolinho empanado são alimentos mais processados e gordurosos, que podem ser consumidos com moderação para evitar inflamação.",
      "Que tal equilibrar com mais vegetais frescos e reduzir um pouco os embutidos? Posso ajudar com sugestões para deixar seu prato mais funcional! Você costuma fazer isso no dia a dia? 🌿",
    ],
  },
  {
    id: 2,
    title: "Checklist Jejum",
    userMsg: {
      type: "user",
      text: "Sol, vou fazer um jejum de 24h, me mande um checklist do que preciso fazer para concluir",
    },
    solMessages: [
      "Claro! Aqui está um checklist para seu jejum de 24h:",
      "✅ Evite óleos vegetais refinados (soja, canola, girassol, milho).\n✅ Reduza carboidratos refinados (pães, massas, doces) antes do jejum.\n✅ Faça uma refeição pré-jejum rica em proteínas magras, gorduras saudáveis (abacate, azeite, castanhas) e vegetais fibrosos.\n✅ Hidrate-se bem durante o jejum com água e chás sem açúcar.\n✅ Prepare o ambiente: tenha água e chás à mão, evite alimentos tentadores.\n✅ Observe sinais de alerta (tontura, fraqueza extrema, náusea) e interrompa o jejum se necessário.",
      "Quer dicas de receitas para a refeição antes do jejum? 🌿",
    ],
  },
  {
    id: 3,
    title: "Menopausa",
    userMsg: {
      type: "user",
      text: "Sol, estou na menopausa, eu posso fazer jejum? Se sim, quais os benefícios?",
    },
    solMessages: [
      "Sim, mulheres na menopausa podem fazer jejum, mas com alguns cuidados importantes. Durante a menopausa, o corpo passa por alterações hormonais que podem influenciar o metabolismo e o equilíbrio energético. O jejum pode ajudar a melhorar a sensibilidade à insulina, reduzir inflamação e favorecer o controle do peso, que são benefícios importantes nessa fase.",
      "Porém, é fundamental respeitar os sinais do corpo e evitar jejuns prolongados em períodos de maior sensibilidade hormonal, como a TPM, para não aumentar irritabilidade ou ansiedade.",
      "Quer que eu te envie dicas de alimentos que ajudam a equilibrar os hormônios femininos na menopausa? 🌿",
    ],
  },
];

function Phone({ data, delayStart = 0 }: { data: typeof MOCKUPS[0]; delayStart?: number }) {
  // Steps: 0=Empty, 1=UserMsg, 2=Typing, 3=SolMsg
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const hasStarted = useRef(false);

  useEffect(() => {
    // Only start if in view and hasn't started yet
    if (isInView && !hasStarted.current) {
        hasStarted.current = true;
        // Trigger the sequence
        // We can manually set step 0 -> 1 here or rely on the effect below
        // But since we want to respect the 'delayStart' from when it appears:
        setTimeout(() => setStep(1), 1000 + delayStart);
    }
  }, [isInView, delayStart]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 1) {
      // User message visible. Wait, then start typing
      timer = setTimeout(() => setStep(2), 1500);
    } else if (step === 2) {
      // Typing... Wait, then show Sol message
      timer = setTimeout(() => setStep(3), 2000);
    } 
    // Step 3 is final state. No loop.

    return () => clearTimeout(timer);
  }, [step]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [step]);

  return (
    <div 
        ref={containerRef} 
        className="w-[320px] h-[600px] bg-black rounded-[45px] p-3 relative border-4 border-[#1f1f1f] flex-shrink-0 shadow-[30px_30px_60px_-10px_rgba(0,0,0,0.3)]"
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-20"></div>

      {/* Screen */}
      <div className="w-full h-full bg-[#E5DDD5] rounded-[35px] overflow-hidden flex flex-col relative font-sans">
        {/* WhatsApp Pattern Background overlay */}
        <div className="absolute inset-0 opacity-[0.06] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[length:400px_400px] pointer-events-none"></div>

        {/* Header */}
        <div className="bg-[#008069] text-white p-4 pt-10 flex items-center gap-3 shadow-sm z-10 relative">
            <div className="flex items-center gap-1 -ml-1">
                <svg viewBox="0 0 24 24" width="24" height="24" className="fill-white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
            </div>
          <img 
            src={solAvatar} 
            alt="SOL Avatar" 
            className="w-9 h-9 rounded-full object-cover border border-white/20"
          />
          <div className="flex-1">
            <div className="font-medium text-base leading-none mb-1">SOL</div>
            <div className="text-[11px] opacity-90 leading-none">
                {step === 2 ? "digitando..." : "online"}
            </div>
          </div>
          <div className="flex gap-4 pr-1">
             <svg viewBox="0 0 24 24" width="20" height="20" className="fill-white"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.9l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"></path></svg>
             <svg viewBox="0 0 24 24" width="20" height="20" className="fill-white"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          </div>
        </div>

        {/* Chat Area */}
        <div 
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 scroll-smooth pb-8 relative z-0"
        >
          <AnimatePresence mode="popLayout">
            {/* User Message */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className="flex justify-end"
              >
                <div className="bg-[#E7FFDB] text-[#111B21] rounded-lg p-2 pl-3 max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] rounded-tr-none text-sm relative text-left">
                  {data.userMsg.content === "image" && data.userMsg.src && (
                    <div className="mb-1 rounded-md overflow-hidden bg-[#cfdcb8]">
                      <img src={data.userMsg.src} alt="Upload" className="w-full h-auto object-cover" />
                    </div>
                  )}
                  {data.userMsg.caption && <p className="mb-1">{data.userMsg.caption}</p>}
                  {data.userMsg.text && <p className="leading-relaxed">{data.userMsg.text}</p>}
                  
                  <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
                     <span className="text-[10px]">12:00</span>
                     <svg viewBox="0 0 16 15" width="16" height="15" className="fill-[#53bdeb]"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.473-.018l5.358-7.717a.42.42 0 0 0-.088-.541z"></path><path d="M10.97 4.792a.574.574 0 0 0-.752-.162l-.46.305a.44.44 0 0 0-.15.655 4.385 4.385 0 0 1 .151.78.33.33 0 0 1-.365.365 4.49 4.49 0 0 1-.78-.151.44.44 0 0 0-.655.15l-.305.46a.574.574 0 0 0 .162.752c.877.584 1.766.702 2.584-.08a6.3 6.3 0 0 0 1.07-1.46.58.58 0 0 0-.164-.755zM6.91 5.617a.575.575 0 0 0-.753-.162l-.458.304a.44.44 0 0 0-.151.655 4.384 4.384 0 0 1 .152.78.33.33 0 0 1-.366.365 4.49 4.49 0 0 1-.778-.15.44.44 0 0 0-.656.149l-.305.46a.575.575 0 0 0 .162.753c.877.583 1.767.702 2.583-.08.384-.367.746-.86 1.07-1.46a.58.58 0 0 0-.164-.755zM3.93 7.917a.575.575 0 0 0-.752-.162l-.46.305a.44.44 0 0 0-.15.655 4.385 4.385 0 0 1 .151.78.33.33 0 0 1-.365.365 4.49 4.49 0 0 1-.78-.151.44.44 0 0 0-.655.15l-.305.46a.574.574 0 0 0 .162.752c.877.584 1.766.702 2.584-.08a6.3 6.3 0 0 0 1.07-1.46.58.58 0 0 0-.164-.755z"></path><path d="M11.954 6.643L7.747 11.53a.527.527 0 0 1-.776.028l-2.033-1.89a.57.57 0 0 0-.775.055l-.558.706a.465.465 0 0 0 .054.656l2.915 2.652c.224.218.556.195.732-.01l5.503-7.23a.465.465 0 0 0-.083-.655l-.715-.558a.569.569 0 0 0-.759.043z"></path></svg>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Typing Indicator */}
            {step === 2 && (
               <motion.div 
                    key="typing"
                    initial={{ opacity: 0, scale: 0.95, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start w-full"
                >
                    <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] flex gap-1 items-center max-w-fit">
                        <motion.div 
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        />
                        <motion.div 
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        />
                        <motion.div 
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Sol Messages */}
            {step >= 3 && data.solMessages.map((msg, idx) => (
              <motion.div
                key={`sol-msg-${idx}`}
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: idx * 1.2, duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="bg-white text-[#111B21] rounded-lg p-2 pl-3 max-w-[85%] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] rounded-tl-none text-sm text-left">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.split("**").map((part, i) => 
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </div>
                  <div className="flex justify-end items-center mt-1 opacity-60">
                     <span className="text-[10px]">12:0{1 + idx}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Footer / Input Area Mockup */}
        <div className="p-2 pb-6 bg-[#F0F2F5] flex items-center gap-2 z-10">
            <div className="p-2 rounded-full text-[#8696a0]">
                 <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 11h6v2h-6v6h-2v-6H4v-2h6V5h2v6zm-1 2h-1z"></path></svg>
            </div>
            <div className="flex-1 bg-white h-9 rounded-lg px-3 flex items-center text-gray-400 text-sm">
                Mensagem
            </div>
            <div className="p-2 rounded-full text-[#8696a0]">
                 <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm4.609-3.531c0 2.544-2.065 4.609-4.609 4.609s-4.609-2.065-4.609-4.609h-1.06c0 3.13 2.544 5.669 5.669 5.669s5.669-2.539 5.669-5.669h-1.06zM11.999 23a.53.53 0 0 0 .53-.53v-2.887a6.706 6.706 0 0 0 5.669-6.643h1.06C19.258 17.51 16.01 20.758 12 20.758s-7.258-3.248-7.258-7.818h1.06c0 3.13 2.539 5.669 5.669 5.669v2.887a.53.53 0 0 0 .53.53z"></path></svg>
            </div>
        </div>
      </div>
    </div>
  );
}

export function ChatMockups() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-12 py-20 px-4 overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {MOCKUPS.map((mockup, index) => (
        <Phone key={mockup.id} data={mockup} delayStart={index * 1200} />
      ))}
    </div>
  );
}
