import React, { useState } from "react";
import countriesLegal from "../data/countriesLegal.json";
import {
  X,
  Mail,
  Phone,
  Globe,
  Instagram,
  MessageSquare,
  FileDown,
  ArrowRightCircle,
} from "lucide-react";

const LegalDocs: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<any | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState<any | null>(null);

  // Abre modal do tipo de visto
  const handleViewMore = (visa: any) => {
    setSelectedVisa(visa);
    setSelectedCountry(null);
  };

  // Fecha modal do visto
  const closeVisaModal = () => {
    setSelectedVisa(null);
  };

  // Abre modal de contacto para país
  const openContactModal = (country: any) => {
    setContactModalOpen(country);
  };

  // Fecha modal de contacto
  const closeContactModal = () => {
    setContactModalOpen(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-600">
            Documentação Legal
          </span>{" "}
          por País
        </h1>

        {/* Country Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {countriesLegal.map((country) => (
            <div
              key={country.id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden"
            >
              {/* Flag & Title */}
              <div
                className="flex items-center space-x-4 p-6 cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                onClick={() => setSelectedCountry(country)}
              >
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-14 h-14 rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {country.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {country.description}
                  </p>
                </div>
              </div>

              {/* Contact button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => openContactModal(country)}
                  className="p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md hover:shadow-xl hover:scale-110 transition-transform duration-300"
                  title="Contactar Comunidade"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start overflow-y-auto py-10 px-4">
          <div className="relative w-full max-w-5xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            {/* Close */}
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={selectedCountry.flag}
                alt={`${selectedCountry.name} flag`}
                className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
              />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {selectedCountry.name}
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {selectedCountry.description}
            </p>

            {/* Visa Sections */}
            {Object.entries(selectedCountry.visaInfo)
              .filter(([key]) => key !== "rules")
              .map(([visaType, info]) => (
                <div
                  key={visaType}
                  className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize mb-2">
                    {visaType.replace(/([A-Z])/g, " $1")}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {info.description}
                  </p>

                  {info.requirements && (
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Requisitos:</strong> {info.requirements.length} itens
                    </p>
                  )}
                  {info.validity && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Validade: {info.validity}
                    </p>
                  )}

                  <button
                    onClick={() => handleViewMore({ type: visaType, ...info })}
                    className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-xl hover:scale-105 transition-transform duration-300"
                  >
                    Ver mais detalhes
                    <ArrowRightCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}

            {/* Rules */}
            {selectedCountry.visaInfo.rules && (
              <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Regras Básicas
                </h4>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {selectedCountry.visaInfo.rules.map(
                    (rule: string, idx: number) => (
                      <li key={idx}>{rule}</li>
                    )
                  )}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visa Modal */}
      {selectedVisa && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex justify-center items-start overflow-y-auto py-10 px-4">
          <div className="relative w-full max-w-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            <button
              onClick={closeVisaModal}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedVisa.type.replace(/([A-Z])/g, " $1")}
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {selectedVisa.description}
            </p>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Requisitos
            </h4>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
              {selectedVisa.requirements?.map((req: string, idx: number) => (
                <li key={idx}>{req}</li>
              ))}
            </ol>

            {selectedVisa.validity && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Validade: {selectedVisa.validity}
              </p>
            )}

            {selectedVisa.steps && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Processo Passo-a-Passo
                </h4>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {selectedVisa.steps.map((step: string, idx: number) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="flex gap-6 mt-6">
              {selectedVisa.pdfLink && (
                <a
                  href={selectedVisa.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                  title="Descarregar Formulário"
                >
                  <FileDown className="w-6 h-6" />
                  <span className="text-xs mt-1">PDF</span>
                </a>
              )}
              {selectedVisa.officialWebsite && (
                <a
                  href={selectedVisa.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                  title="Website Oficial"
                >
                  <Globe className="w-6 h-6" />
                  <span className="text-xs mt-1">Site</span>
                </a>
              )}
            </div>

            {selectedVisa.contact && (
              <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Contactos
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Endereço: {selectedVisa.contact.address}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Telefone: {selectedVisa.contact.phone}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Email: {selectedVisa.contact.email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Community Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex justify-center items-center px-4">
          <div className="relative w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center">
            <button
              onClick={closeContactModal}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contactar Comunidade Estudantil - {contactModalOpen.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Escolha uma forma rápida de entrar em contacto com a comunidade.
            </p>

            <div className="flex justify-center gap-8">
              {contactModalOpen.community?.email && (
                <a
                  href={`mailto:${contactModalOpen.community.email}`}
                  className="flex flex-col items-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                  title="Enviar Email"
                >
                  <Mail className="w-8 h-8" />
                  <span className="text-xs mt-1">Email</span>
                </a>
              )}

              {contactModalOpen.community?.whatsapp && (
                <a
                  href={contactModalOpen.community.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-green-500 hover:scale-110 transition-transform"
                  title="WhatsApp"
                >
                  <Phone className="w-8 h-8" />
                  <span className="text-xs mt-1">WhatsApp</span>
                </a>
              )}

              {contactModalOpen.community?.instagram && (
                <a
                  href={contactModalOpen.community.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-pink-500 hover:scale-110 transition-transform"
                  title="Instagram"
                >
                  <Instagram className="w-8 h-8" />
                  <span className="text-xs mt-1">Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocs;
