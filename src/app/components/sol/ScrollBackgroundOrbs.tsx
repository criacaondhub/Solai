import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ScrollBackgroundOrbs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds for each orb
  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Orb 1 - Top Left */}
        <motion.div
            style={{ y: y1 }}
            className="absolute top-[10%] -left-[10%]"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-[600px] h-[600px] rounded-full bg-[#CC3300] blur-[120px]"
            />
        </motion.div>

        {/* Orb 2 - Center Right */}
        <motion.div
            style={{ y: y2 }}
            className="absolute top-[30%] -right-[15%]"
        >
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="w-[500px] h-[500px] rounded-full bg-[#FF8C69] blur-[100px]"
            />
        </motion.div>

        {/* Orb 3 - Bottom Left */}
        <motion.div
            style={{ y: y3 }}
            className="absolute bottom-[10%] left-[5%]"
        >
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.12, 0.22, 0.12],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="w-[700px] h-[700px] rounded-full bg-[#CC3300] blur-[130px]" 
            />
        </motion.div>
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-transparent opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
