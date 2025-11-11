import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  Globe,
  Loader2,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // modal state
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null); // to store target link

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.find((n: any) => n.id === id));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-600" />
        <p>A carregar notícia...</p>
      </div>
    );

  if (!news)
    return (
      <p className="text-center mt-20 text-gray-500">
        Notícia não encontrada.
      </p>
    );

  // When modal closes, redirect if there's a stored link
  const handleCloseModal = () => {
    setShowModal(false);
    if (redirectUrl) {
      window.open(redirectUrl, "_blank");
      setRedirectUrl(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/recursos"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 mb-6 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Link>

        {/* News Card */}
        <article className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden transition hover:shadow-2xl">
          {/* Image */}
          {news.image && (
            <div className="relative">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                    news.status === "Aberta"
                      ? "bg-green-100/70 text-green-800"
                      : news.status === "Fechada"
                      ? "bg-red-100/70 text-red-700"
                      : "bg-gray-100/70 text-gray-700"
                  }`}
                >
                  {news.status}
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              {news.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
              {news.country && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {news.country}
                </span>
              )}
              {news.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />{" "}
                  {new Date(news.date).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {news.source && (
                <span className="flex items-center gap-1">
                  <Globe className="w-4 h-4" /> {news.source}
                </span>
              )}
            </div>

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {news.excerpt}
              </p>
            )}

            {/* Description */}
            {news.description && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Descrição completa
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
                  {news.description}
                </p>
              </>
            )}

            {/* External Link */}
            {news.link && (
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setRedirectUrl(news.link);
                    setShowModal(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" /> Ler notícia completa
                </button>
              </div>
            )}
          </div>
        </article>
      </div>

      {/* ✅ Modal with iframe */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl h-[80vh] shadow-2xl overflow-hidden animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Iframe */}
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
