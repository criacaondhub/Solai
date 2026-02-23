import { motion } from "motion/react";

export function Ticker({ isFreemium }: { isFreemium?: boolean }) {
  const defaultText = "Acesso imediato • Plano anual com 40% de desconto • Inteligência exclusiva e única no Brasil";
  const freemiumText = "TESTE GRÁTIS AGORA MESMO • INTELIGÊNCIA ARTIFICIAL ÚNICA E EXCLUSIVA NO BRASIL";

  const text = isFreemium ? freemiumText : defaultText;
  const items = Array(4).fill(text);

  return (
    <div className={`w-full ${isFreemium ? 'bg-[#25D366]' : 'bg-[#CC3300]'} py-2 overflow-hidden flex z-50 relative transition-colors duration-500`}>
      <motion.div
        className="flex whitespace-nowrap flex-shrink-0"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {items.map((t, i) => (
          <span key={i} className="text-[#FFFAFA] font-bold text-sm md:text-base mx-4 uppercase tracking-wider">
            {t}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="flex whitespace-nowrap flex-shrink-0"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {items.map((t, i) => (
          <span key={i} className="text-[#FFFAFA] font-bold text-sm md:text-base mx-4 uppercase tracking-wider">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
