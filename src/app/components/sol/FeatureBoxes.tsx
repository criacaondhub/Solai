import { Lock, Brain, MessageCircle } from "lucide-react";

export function FeatureBoxes() {
  const boxes = [
    {
      icon: <Lock className="w-8 h-8 text-[#CC3300]" />,
      title: "Segurança de ponta a ponta",
      text: "Seus dados, informações e conversas\n100% protegidos.",
    },
    {
      icon: <Brain className="w-8 h-8 text-[#CC3300]" />,
      title: "99,7% de assertividade",
      text: "Uma inteligência artificial treinada pela maior referência em Medicina Funcional do Brasil.",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-[#CC3300]" />,
      title: "Tudo pelo WhatsApp",
      text: "Sem essa de baixar aplicativo, ela funciona\n100% no SEU WhatsApp.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 my-12">
      {boxes.map((box, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#FAE6E1] flex flex-col items-start text-left gap-4 hover:shadow-md transition-shadow"
        >
          <div className="bg-[#FFFAFA] p-3 rounded-full border border-[#FAE6E1]">
            {box.icon}
          </div>
          <div>
            <h3 className="text-[#1E1514] font-bold text-lg mb-2 leading-tight">
              {box.title}
            </h3>
            <p className="text-[#1E1514]/80 text-sm leading-relaxed whitespace-pre-line">
              {box.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
