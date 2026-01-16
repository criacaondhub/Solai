import { motion } from "motion/react";

export function Ticker() {
  const text = "Acesso imediato • Plano anual com 40% de desconto • Inteligência exclusiva e única no Brasil";
  const items = Array(4).fill(text);

  return (
    <div className="w-full bg-[#CC3300] py-2 overflow-hidden flex z-50 relative">
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
          <span key={i} className="text-[#FFFAFA] font-medium text-sm md:text-base mx-4">
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
          <span key={i} className="text-[#FFFAFA] font-medium text-sm md:text-base mx-4">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
