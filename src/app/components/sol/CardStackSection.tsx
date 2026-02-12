import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import card1Image from "../../../assets/prato-2.webp"; // Using the same import for card 1 for now or updating as needed?
// The user explicitly asked for card 2 image change to prato-2.webp
import card2Image from "../../../assets/prato-2.webp";
const card3Image = "https://i.postimg.cc/287Q8ngf/Gemini-Generated-Image-8xcbef8xcbef8xcb.png";
const card4Image = "https://i.postimg.cc/3wdmBVRz/Gemini-Generated-Image-6dkls46dkls46dkl.png";
const card1ImageExternal = "https://i.postimg.cc/FzhHhpKr/freshly-baked-croissant-cup-coffee-white-wooden-table.jpg";

interface CardData {
  h1: string;
  h2: string;
  image: string;
  alt: string;
}

const cards: CardData[] = [
  {
    h1: "Ela cuida da sua insulina",
    h2: '"Cuidado, comer apenas isso te fará ter um pico na sua insulina, adicione ovos…"',
    image: card1ImageExternal,
    alt: "Prato de macarronada",
  },
  {
    h1: "Ela avalia a densidade\nnutricional do seu prato",
    h2: "Purê de batata é uma ótima fonte de carboidratos e combina bem com a carne ao molho e o arroz. Para deixar a refeição ainda mais equilibrada, você pode adicionar vegetais ou uma salada fresca para fibras e vitaminas. Quer dicas de acompanhamentos saudáveis para complementar seu prato?",
    image: card2Image,
    alt: "Prato com hamburguers e linguiças",
  },
  {
    h1: "Ela te ajuda a fazer \n a compra correta",
    h2: '"Esse produto só engana, nele está cheio de gordura ruim para o seu corpo. Não compre!"',
    image: card3Image,
    alt: "Lendo rótulo de manteiga no mercado",
  },
  {
    h1: "Ajuda na escolha correta \nde uma simples proteína.",
    h2: '"A sobrecoxa ajudará você a se sentir mais saciado sem aumentar o seu consumo calórico."',
    image: card4Image,
    alt: "Peito e sobrecoxa de frango crus",
  },
];

const Card = ({
  i,
  data,
  progress,
  range,
  targetScale,
}: {
  i: number;
  data: CardData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen flex items-start justify-center sticky top-0 px-4 pt-20 md:pt-32">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col md:flex-row relative w-full max-w-[1000px] h-[600px] md:h-[500px] rounded-[32px] overflow-hidden origin-top border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        {/* Left Side - Image */}
        <div className="w-full md:w-5/12 h-2/5 md:h-full relative overflow-hidden">
          <ImageWithFallback
            src={data.image}
            alt={data.alt}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          {/* Gradient Overlay for integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1514]/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1E1514]/20" />
        </div>

        {/* Right Side - Text */}
        <div className="w-full md:w-7/12 h-3/5 md:h-full p-8 md:p-12 flex flex-col justify-center relative">
          {/* Glass decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6">
            <h3 className="text-white text-2xl md:text-3xl font-bold font-[Roboto] leading-tight whitespace-pre-line">
              {data.h1}
            </h3>

            <div className="h-[2px] w-12 bg-[#CC3300]/80 rounded-full" />

            <p
              className={`text-white/80 font-light leading-relaxed ${i === 1 ? "text-base md:text-2xl" : "text-xl md:text-2xl"
                }`}
            >
              {data.h2}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function CardStackSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="relative bg-[#1E1514] pb-24 md:pb-0"
      style={{ position: "relative" }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1514] via-[#2A1F1E] to-[#1E1514] pointer-events-none" />

      {/* Introduction text */}
      <div className="relative z-10 flex flex-col items-center text-center pt-16 md:pt-24 pb-0 px-6 max-w-5xl mx-auto">
        <h2 className="text-white text-3xl md:text-5xl font-[Roboto] mb-6 leading-tight max-w-[900px]">
          A{" "}
          <span className="text-[#CC3300] font-bold">
            SOL não é mais uma ferramenta básica
          </span>{" "}
          que apenas analisa seu prato de comida.
        </h2>
        <p className="text-white/70 text-lg md:text-xl font-light max-w-[800px] leading-relaxed">
          Entenda o porquê ela é tão completa e consegue
          transformar sua saúde e alimentação.
        </p>
      </div>

      <div className="mt-0 relative z-10">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              data={card}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}