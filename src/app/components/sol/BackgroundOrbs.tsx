import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export function BackgroundOrbs() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement to create a fluid, watery feel
  const springConfig = { damping: 20, stiffness: 50, mass: 2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        // Normalize mouse position -1 to 1
        mouseX.set((e.clientX / innerWidth) * 2 - 1);
        mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };
    
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  // Parallax transforms - different orbs move at different speeds/directions
  const x1 = useTransform(x, [-1, 1], [-40, 40]);
  const y1 = useTransform(y, [-1, 1], [-40, 40]);

  const x2 = useTransform(x, [-1, 1], [30, -30]);
  const y2 = useTransform(y, [-1, 1], [60, -60]);

  const x3 = useTransform(x, [-1, 1], [-20, 20]);
  const y3 = useTransform(y, [-1, 1], [20, -20]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Orb 1 - Top Left - Primary Red/Orange */}
        <motion.div
            style={{ x: x1, y: y1 }}
            className="absolute -top-[10%] -left-[10%]"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 100, -50, 0],       // Increased movement range
                    y: [0, -50, 50, 0],        // Increased movement range
                }}
                transition={{
                    duration: 10,              // Faster duration (was 15)
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="w-[600px] h-[600px] rounded-full bg-[#CC3300] blur-[120px]"
            />
        </motion.div>

        {/* Orb 2 - Center Right - Warm Peach/Pink */}
        <motion.div
            style={{ x: x2, y: y2 }}
            className="absolute top-[20%] -right-[15%]"
        >
            <motion.div
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.35, 0.55, 0.35],
                    x: [0, -80, 40, 0],        // Increased movement range
                    y: [0, 60, -60, 0],        // Increased movement range
                }}
                transition={{
                    duration: 12,              // Faster duration (was 18)
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="w-[500px] h-[500px] rounded-full bg-[#FF8C69] blur-[100px]"
            />
        </motion.div>

        {/* Orb 3 - Bottom Left - Replaced Yellow with Primary Red Variation */}
        <motion.div
            style={{ x: x3, y: y3 }}
            className="absolute -bottom-[20%] left-[10%]"
        >
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.25, 0.45, 0.25],
                    x: [0, 90, -60, 0],        // Increased movement range
                    y: [0, -70, 40, 0],        // Increased movement range
                }}
                transition={{
                    duration: 14,              // Faster duration (was 20)
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="w-[700px] h-[700px] rounded-full bg-[#CC3300] blur-[130px]" 
            />
        </motion.div>
        
        {/* Subtle Texture Overlay (Optional, adds grain) */}
        <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
