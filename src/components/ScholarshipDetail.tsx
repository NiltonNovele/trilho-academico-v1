import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  ListChecks,
  Loader2,
  Globe,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export default function ScholarshipDetail() {
  const { id } = useParams();
  const [sch, setSch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/scholarships`)
      .then((res) => res.json())
      .then((data) => {
        setSch(data.find((s: any) => s.id === id));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleCloseModal = () => {
    setShowModal(false);
    if (sch?.link) {
      setTimeout(() => {
        window.open(sch.link, "_blank"); // ✅ open in new tab
      }, 300);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-600" />
        <p>A carregar bolsa...</p>
      </div>
    );

  if (!sch)
    return (
      <p className="text-center mt-20 text-gray-500">Bolsa não encontrada.</p>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/recursos"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 mb-6 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Link>

        <article className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl">
          {sch.image && (
            <div className="relative">
              <img
                src={sch.image}
                alt={sch.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                {sch.status && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                      sch.status === "Aberta"
                        ? "bg-green-100/70 text-green-800"
                        : sch.status === "Fechada"
                        ? "bg-red-100/70 text-red-700"
                        : sch.status === "Lotada"
                        ? "bg-yellow-100/70 text-yellow-800"
                        : "bg-gray-100/70 text-gray-700"
                    }`}
                  >
                    {sch.status}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
              {sch.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <span className="font-semibold">Provedor:</span> {sch.provider}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
              {sch.country && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {sch.country}
                </span>
              )}
              {sch.openingDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Abertura:{" "}
                  {new Date(sch.openingDate).toLocaleDateString("pt-PT")}
                </span>
              )}
              {sch.deadline && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Prazo:{" "}
                  {new Date(sch.deadline).toLocaleDateString("pt-PT")}
                </span>
              )}
              {sch.source && (
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {sch.source}
                </span>
              )}
            </div>

            {sch.description && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Descrição
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
                  {sch.description}
                </p>
              </>
            )}

            {sch.eligibility?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Elegibilidade
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                  {sch.eligibility.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {sch.requirements?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Requisitos
                </h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                  {sch.requirements.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {sch.steps?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-blue-500" /> Etapas de Candidatura
                </h2>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
                  {sch.steps.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </>
            )}

            {sch.link && (
              <div className="mt-8">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" /> Candidatar-se
                </button>
              </div>
            )}
          </div>
        </article>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl h-[80vh] shadow-2xl overflow-hidden animate-in fade-in duration-200">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 transition"
              aria-label="Fechar"
            >
             <X className="w-5 h-5" />
            </button>

            <iframe
              src="https://refres.co/trilho.academico"
              className="w-full h-full rounded-2xl"
              title="Candidatura Trilho Académico"
            />
          </div>
        </div>
      )}
    </div>
  );
}
