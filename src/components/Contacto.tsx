import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const Enquiry: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sending form (could be integrated with backend later)
    setTimeout(() => {
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Entrar em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
              Contacto
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Envia-nos uma mensagem ou utiliza os nossos contactos diretos para falar connosco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Form or Confirmation */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Formulário de Envio
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      placeholder="O teu nome"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="teuemail@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Assunto */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assunto
                    </label>
                    <input
                      type="text"
                      placeholder="Sobre o que queres falar?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      placeholder="Escreve a tua mensagem aqui..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none transition"
                      required
                    ></textarea>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Enviar Mensagem
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </>
            ) : (
              // Confirmation Screen
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                <CheckCircle className="w-20 h-20 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mensagem Enviada!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  A tua mensagem foi enviada com sucesso.{" "}
                  <span className="font-semibold">
                    Não somos muito rápidos a responder no email
                  </span>, por isso para assistência mais rápida, entra em contacto via WhatsApp.
                </p>
                <a
                  href="https://wa.me/258847529665?text=Olá!%20Gostaria%20de%20saber%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-300"
                >
                  Falar no WhatsApp
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {/* Right Side: Contact Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Detalhes de Contacto
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Podes entrar em contacto diretamente connosco através dos canais abaixo.
              </p>
            </div>

            {/* Items */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Whatsapp
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">+258 84 752 9665</p>

                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/258847529665"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-colors duration-300"
                  >
                    Enviar Mensagem
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    ajuda@trilhoacademico.edu.mz
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Localização
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Maputo, Moçambique
                  </p>
                </div>
              </div>
            </div>

            {/* Optional Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <img
                src="/mz-loc2.avif"
                alt="Mapa de localização"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
