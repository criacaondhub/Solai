import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// Placeholder images for the prints (following the user's specific names)
const printICley = "https://images.unsplash.com/photo-1682941664177-7920d0e59418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGF0c2FwcCUyMGNoYXQlMjBoZWFsdGglMjBudXRyaXRpb24lMjBzY3JlZW5zaG90fGVufDF8fHx8MTc2ODQwMDY2NHww&ixlib=rb-4.1.0&q=80&w=1080";
const printMonica = "https://images.unsplash.com/photo-1711698520626-bae97bc6c204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBjaGF0JTIwbWVzc2FnZSUyMG51dHJpdGlvbiUyMGFwcHxlbnwxfHx8fDE3Njg0MDA2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const printEddy = "https://images.unsplash.com/photo-1685810332449-22666f83adf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMG1lYWwlMjBwbGFubmluZyUyMGFwcCUyMHNjcmVlbnNob3R8ZW58MXx8fHwxNzY4NDAwNjY5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const testimonials = [
  {
    id: "icley",
    image: printICley,
    name: "iCley",
    className: "md:col-span-1 md:row-span-2",
    delay: 0.1
  },
  {
    id: "monica",
    image: printMonica,
    name: "Mônica",
    className: "md:col-span-2 md:row-span-1",
    delay: 0.2
  },
  {
    id: "eddy",
    image: printEddy,
    name: "Eddy & Liane",
    className: "md:col-span-2 md:row-span-1",
    delay: 0.3
  }
];

export function BentoTestimonials() {
  return (
    <section className="bg-[#FFFAFA] py-24 px-6 relative overflow-hidden">
      {/* Background Orbs (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#CC3300]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[#CC3300]/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[rgb(30,21,20)] text-3xl md:text-5xl font-bold leading-tight whitespace-pre-line font-[Roboto]"
          >
            Veja como a SOL está transformando{"\n"}
            o dia-a-dia das pessoas
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[32px] border border-[rgb(30,21,20)]/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 ${item.className}`}
            >
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent backdrop-blur-[2px] z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
              
              {/* Print Image */}
              <div className="w-full h-full p-4 md:p-6 bg-[#f4f4f4] flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={`Depoimento de ${item.name}`}
                  className="w-full h-full object-contain md:object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Decorative Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[rgb(30,21,20)]/10 text-[10px] font-bold text-[rgb(30,21,20)]/60 uppercase tracking-widest shadow-sm">
                  Relato Real
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-[#CC3300]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Call to action below Bento */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
        >
            <p className="text-[rgb(30,21,20)]/60 text-sm font-medium">
              * Resultados reais compartilhados por nossos usuários via WhatsApp.
            </p>
        </motion.div>
      </div>
    </section>
  );
}
