import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  ArrowRight,
  GraduationCap,
  Compass,
  Gift,
  X,
  Tag,
  Loader2,
} from "lucide-react";

const StepTwo: React.FC = () => {
  const [expanded, setExpanded] = useState<"known" | "quiz" | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const validPromo = "01SYNCTECHX";

  const handlePromoApply = () => {
    if (promoCode.trim().toUpperCase() === validPromo) {
      setPromoApplied(true);
      setShowPromoModal(false);
      setPromoCode("");
    } else {
      alert("⚠️ Código inválido. Verifica e tenta novamente!");
    }
  };

  const colorStyles = {
    emerald: {
      text: "text-emerald-900",
      textLight: "text-emerald-800",
      bg: "bg-emerald-600",
      bgHover: "hover:bg-emerald-700",
      border: "border-emerald-200",
      borderLight: "border-emerald-100",
    },
    blue: {
      text: "text-blue-900",
      textLight: "text-blue-800",
      bg: "bg-blue-600",
      bgHover: "hover:bg-blue-700",
      border: "border-blue-200",
      borderLight: "border-blue-100",
    },
  };

  const cards = [
    {
      id: "known" as const,
      title: "Já sei o que quero estudar",
      icon: <GraduationCap className="w-12 h-12 text-emerald-700" />,
      price: 1,
      priceDisplay: "50 MZN",
      gradient: "from-emerald-50 via-emerald-100 to-emerald-300",
      shortDesc:
        "Tens uma ideia clara do curso que desejas frequentar? Este teste ajuda-te a descobrir as melhores universidades.",
      longDesc: `Ideal para quem já tem um curso em mente. Este formulário analisa o curso escolhido e apresenta-te 
      uma lista personalizada de universidades em Moçambique e no estrangeiro, incluindo requisitos, 
      bolsas de estudo e perspetivas de carreira.`,
      color: "emerald",
      reference: "KNOWNCOURSETEST",
      description: "Minha mensagem para ti: Quando se trata da tua educação, não há melhor investimento que possas fazer, utilizando 50MZN, e obter um retorno tão grande como o que o Trilho Académico proporciona.",
    },
    {
      id: "quiz" as const,
      title: "Ainda não sei o que quero estudar",
      icon: <Compass className="w-12 h-12 text-blue-700" />,
      oldPrice: "200 MZN",
      price: 1,
      priceDisplay: promoApplied ? "100 MZN (Oferta Aplicada)" : "200 MZN",
      discount: promoApplied ? "50% OFF" : undefined,
      gradient: "from-blue-50 via-sky-100 to-blue-300",
      shortDesc:
        "Indeciso? Faz o teste vocacional e recebe recomendações personalizadas baseadas na tua personalidade e interesses.",
      longDesc: `Este teste vocacional completo avalia a tua personalidade, interesses e pontos fortes 
      com base em metodologias reconhecidas internacionalmente. Recebe resultados detalhados com cursos e carreiras alinhadas ao teu perfil.`,
      color: "blue",
      reference: "VOCATIONALQUIZTEST",
      description: "Minha mensagem para ti: Quando se trata da tua educação, não há melhor investimento que possas fazer, utilizando 100MZN, e obter um retorno tão grande como o que o Trilho Académico proporciona.",
    },
  ];
 
  const handlePayment = async (card: (typeof cards)[0]) => {
    try {
      setLoadingPayment(true);
  
      // 🔹 URL da tua API backend
       const API_URL = "https://trilhoacademico.edu.mz/api/payments/create";
      // const API_URL = "http://localhost:5003/api/payments/create";
  
      // 🔹 Configuração individual por card
      let paymentData;
  
      if (card.id === "known") {
        paymentData = {
          amount: 1, // valor real
          reference: "KNOWNCOURSETEST",
          description:
            "Minha mensagem para ti: Quando se trata da tua educação, não há melhor investimento que possas fazer, utilizando 50MZN, e obter um retorno tão grande como o que o Trilho Académico proporciona.",
          return_url: "https://trilhoacademico.edu.mz/known-course",
           // podes trocar
        };
      } else if (card.id === "quiz") {
        paymentData = {
          amount: promoApplied ? 1 : 1,
          reference: "VOCATIONALQUIZTEST",
          description:
            "Minha mensagem para ti: Quando se trata da tua educação, não há melhor investimento que possas fazer, utilizando 100MZN, e obter um retorno tão grande como o que o Trilho Académico proporciona.",
          return_url: "https://trilhoacademico.edu.mz/vocational-quiz",
         
        };
      } else {
        throw new Error("Tipo de cartão inválido!");
      }
  
      // 🔹 Faz o POST
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });
  
      const data = await response.json();
  
      if (data.status !== "success" || !data.data?.checkout_url) {
        console.error("❌ Erro no pagamento:", data);
        alert("❌ Ocorreu um erro ao iniciar o pagamento. Tenta novamente.");
        setLoadingPayment(false);
        return;
      }
  
      console.log("✅ Pagamento criado:", data);
  
      // 🔹 Timeout de segurança
      const checkoutTimeout = setTimeout(() => {
        setLoadingPayment(false);
        alert(
          "⚠️ O pagamento demorou demasiado a iniciar. Por favor, tenta novamente ou usa outro método."
        );
      }, 15000);
  
      // 🔹 Abre o checkout
      // const newWindow = window.open(data.data.checkout_url, "_blank");
      const newWindow = window.location.href = data.data.checkout_url;

      
      // Não é necessário verificar o pop-up agora redereconamos na mesma janela
  
      // if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      //   clearTimeout(checkoutTimeout);
      //   setLoadingPayment(false);
      //   alert(
      //     "⚠️ Não conseguimos abrir o checkout. Verifica se o pop-up do browser está bloqueado."
      //   );
      //   return;
      // }
  
      // 🔹 Observa se a janela é fechada antes de concluir
      const pollTimer = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(pollTimer);
          clearTimeout(checkoutTimeout);
          setLoadingPayment(false);
          alert(
            "⚠️ Janela de pagamento fechada. Verifica se o pagamento foi concluído no teu dashboard."
          );
        }
      }, 100);
    } catch (err) {
      console.error("❌ Erro no pagamento:", err);
      setLoadingPayment(false);
      alert("❌ Erro de rede. Verifica a tua ligação e tenta novamente.");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16 px-6 sm:px-10 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-800"
        >
          Escolhe o teu tipo de orientação
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-3 text-gray-600 text-lg max-w-2xl mx-auto"
        >
          Seleciona a opção que melhor descreve a tua situação atual e começa a
          tua jornada académica.
        </motion.p>

        {/* Promo Message */}
        <div className="mt-8">
          {promoApplied ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg"
            >
              <Gift className="w-5 h-5" />
              <span>
                🎉 Código de oferta aplicado! Tens <b>50% de desconto</b> por 30
                dias.
              </span>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPromoModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all"
            >
              <Tag size={18} />
              Tens um código de oferta?
            </motion.button>
          )}
        </div>
      </div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {cards.map((card) => {
          const color = colorStyles[card.color];
          return (
            <motion.div
              key={card.id}
              layout
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${card.gradient} shadow-2xl ${color.border} overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <h3 className={`text-2xl sm:text-3xl font-bold ${color.text}`}>
                      {card.title}
                    </h3>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    {card.discount && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full shadow-sm"
                      >
                        {card.discount}
                      </motion.div>
                    )}
                    <div className="mt-1 flex items-baseline gap-2">
                      {card.oldPrice && (
                        <span className="text-xs line-through text-gray-500">
                          {card.oldPrice}
                        </span>
                      )}
                      <span className={`text-sm font-bold ${color.textLight}`}>
                        {card.priceDisplay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <p
                  className={`mt-4 ${color.textLight} text-base sm:text-lg leading-relaxed`}
                >
                  {card.shortDesc}
                </p>

                {/* Expanded Description */}
                <AnimatePresence>
                  {expanded === card.id && (
                    <motion.div
                      key="desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4"
                    >
                      <p
                        className={`${color.text} bg-white/70 backdrop-blur-sm rounded-xl p-4 text-sm sm:text-base leading-relaxed ${color.borderLight}`}
                      >
                        {card.longDesc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() =>
                      setExpanded(expanded === card.id ? null : card.id)
                    }
                    className={`flex items-center gap-2 ${color.text} font-semibold hover:opacity-80 transition`}
                  >
                    <Info size={18} />
                    {expanded === card.id ? "Menos detalhes" : "Mais detalhes"}
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={loadingPayment}
                    onClick={() => handlePayment(card)}
                    className={`flex items-center gap-2 px-6 py-3 text-white rounded-full font-semibold ${color.bg} ${color.bgHover} shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all ${
                      loadingPayment ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loadingPayment ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        A processar...
                      </>
                    ) : (
                      <>
                        {card.id === "known"
                          ? "Começar agora"
                          : "Fazer o teste"}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Promo Modal */}
      <AnimatePresence>
        {showPromoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-center"
            >
              <button
                onClick={() => setShowPromoModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center gap-4 mb-8 text-center">
                <Gift className="w-12 h-12 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Tens um código de oferta?
                </h3>
                <p className="text-gray-600 text-sm max-w-md">
                  Introduz o teu código de oferta para desbloquear descontos
                  especiais. <br />
                  Os códigos podem ser obtidos através de{" "}
                  <b>parcerias escolares</b>, <b>eventos da SyncTechX</b> ou{" "}
                  <b>promoções nas redes sociais</b>. <br />
                  <br />
                  <span className="text-blue-600 font-semibold">
                    Mantém-te atento às nossas páginas e eventos — novas
                    oportunidades de oferta são lançadas regularmente!
                  </span>
                </p>

                <div className="w-16 h-[2px] bg-blue-500 rounded-full my-2"></div>
              </div>

              <div className="flex justify-center items-center gap-3 mt-3">
                <input
                  type="text"
                  placeholder="Insere o teu código aqui"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border border-blue-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-56 text-center"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePromoApply}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-semibold shadow"
                >
                  Aplicar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Success Notice (Optional visual feedback) */}
      {/* <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircle size={18} />
            Redirecionando para pagamento...
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default StepTwo;


