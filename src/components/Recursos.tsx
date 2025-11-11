import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Award,
  Megaphone,
  Search,
  X,
  Edit3,
  Trash2,
  PlusCircle,
  Settings,
  Calendar,
  Globe2,
  ExternalLink,
  Lock,
  // Unlock,
  ShieldCheck,
} from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
  country?: string;
  link?: string;
  image?: string;
  status?: "Aberta" | "Fechada" | "Lotada" | "Cancelada";
};

type Scholarship = {
  id: string;
  title: string;
  provider: string;
  country: string;
  deadline?: string;
  openingDate?: string;
  eligibility: string[];
  steps: string[];
  description?: string;
  requirements?: string[];
  specifications?: string[];
  link?: string;
  image?: string;
  status?: "Aberta" | "Fechada" | "Lotada" | "Cancelada";
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Opportunities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"news" | "scholarships">("scholarships");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [query, setQuery] = useState("");
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingScholarship, setEditingScholarship] =
    useState<Scholarship | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const toggleAdmin = () => setAdminView((p) => !p);

  useEffect(() => {
    fetchNews();
    fetchScholarships();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${API_URL}/news`);
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
    }
  };

  const fetchScholarships = async () => {
    try {
      const res = await fetch(`${API_URL}/scholarships`);
      const data = await res.json();
      setScholarships(data);
    } catch (err) {
      console.error("Erro ao buscar bolsas:", err);
    }
  };

  const saveNews = async (item: Partial<NewsItem>, id?: string) => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/news/${id}` : `${API_URL}/news`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          source: item.source || "SyncTechX",
          status: item.status || "Aberta",
        }),
      });
      const updated = await res.json();
      if (id) {
        setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
      } else {
        setNews((prev) => [...prev, updated]);
      }
      setEditingNews(null);
    } catch (err) {
      console.error("Erro ao guardar notícia:", err);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await fetch(`${API_URL}/news/${id}`, { method: "DELETE" });
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Erro ao eliminar notícia:", err);
    }
  };

  const saveScholarship = async (item: Partial<Scholarship>, id?: string) => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `${API_URL}/scholarships/${id}`
        : `${API_URL}/scholarships`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          status: item.status || "Aberta",
        }),
      });
      const updated = await res.json();
      if (id) {
        setScholarships((prev) => prev.map((s) => (s.id === id ? updated : s)));
      } else {
        setScholarships((prev) => [...prev, updated]);
      }
      setEditingScholarship(null);
    } catch (err) {
      console.error("Erro ao guardar bolsa:", err);
    }
  };

  const deleteScholarship = async (id: string) => {
    try {
      await fetch(`${API_URL}/scholarships/${id}`, { method: "DELETE" });
      setScholarships((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro ao eliminar bolsa:", err);
    }
  };

  const filteredNews = useMemo(
  () =>
    news.filter((n) => {
      const t = (n?.title ?? "").toString();
      return t.toLowerCase().includes(query.toLowerCase());
    }),
  [news, query]
);

  const filteredSch = useMemo(
  () =>
    scholarships.filter((s) => {
      const t = (s?.title ?? "").toString();
      return t.toLowerCase().includes(query.toLowerCase());
    }),
  [scholarships, query]
);

  const statusOptions: ("Aberta" | "Fechada" | "Lotada" | "Cancelada")[] = [
    "Aberta",
    "Fechada",
    "Lotada",
    "Cancelada",
  ];

  const handlePinSubmit = () => {
    if (pinInput === "2307") {
      setIsAdmin(true);
      setAdminView(true);
      setShowPinModal(false);
      setPinInput("");
    } else {
      alert("PIN incorreto. Tente novamente.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg mb-5">
            <Megaphone className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Notícias & Bolsas de Estudo
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
            Encontre oportunidades e anúncios atualizados em um só lugar.
          </p>
        </div>

        {/* 🔒 Admin Lock (Top-right corner, subtle) */}
        <div className="fixed bottom-6 right-6 z-50">
          {!isAdmin ? (
            <button
              onClick={() => setShowPinModal(true)}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-105 transition"
              title="Acesso administrativo"
            >
              <Lock className="w-2 h-2 text-gray-600 dark:text-gray-300" />
            </button>
          ) : (
            <button
              onClick={toggleAdmin}
              className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:scale-105 transition"
              title="Alternar Painel Administrativo"
            >
              {adminView ? (
                <X className="w-6 h-6" />
              ) : (
                <Settings className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* ===== PUBLIC VIEW ===== */}
        {!adminView && (
          <>
            {/* Tabs */}
            <div className="mb-8 flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex space-x-1 shadow-lg">
                <button
                  onClick={() => setActiveTab("scholarships")}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 ${
                    activeTab === "scholarships"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Award className="inline w-5 h-5 mr-2" /> Bolsas
                </button>
                <button
                  onClick={() => setActiveTab("news")}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 ${
                    activeTab === "news"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <BookOpen className="inline w-5 h-5 mr-2" /> Notícias
                </button>
                
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-10">
              <div className="relative">
                <Search className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Pesquisar oportunidades..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-11 pr-4 py-3 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* News + Scholarships Display (unchanged, already beautiful) */}
            {activeTab === "news" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((n) => (
                  <article
                    key={n.id}
                    className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    {n.image && (
                      <img
                        src={n.image}
                        alt={n.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {n.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                        {n.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(n.date).toLocaleDateString("pt-PT")}
                        </span>
                        <a
                          href={`/news/${n.id}`}
                          className="text-blue-600 hover:text-cyan-500 font-medium flex items-center gap-1"
                        >
                          Ver mais <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
                {filteredNews.length === 0 && (
                  <p className="text-gray-500 text-center col-span-full">
                    Nenhuma notícia encontrada.
                  </p>
                )}
              </div>
            )}

            {activeTab === "scholarships" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSch.map((s) => (
                  <div
                    key={s.id}
                    className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    {s.image && (
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                        {s.description || "Sem descrição disponível."}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Globe2 className="w-4 h-4" /> {s.country}
                        </span>
                        <a
                          href={`/scholarships/${s.id}`}
                          className="text-blue-600 hover:text-cyan-500 font-medium flex items-center gap-1"
                        >
                          Ver mais <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredSch.length === 0 && (
                  <p className="text-gray-500 text-center col-span-full">
                    Nenhuma bolsa encontrada.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* ===== ADMIN DASHBOARD ===== */}
{adminView && (
  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in">
    <div className="flex items-center gap-3 mb-8">
      <ShieldCheck className="w-8 h-8 text-blue-600" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Painel de Administração
      </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-10">
      {/* Admin: Notícias */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Notícias
        </h3>
        <button
          onClick={() =>
            setEditingNews({
              id: "",
              title: "",
              excerpt: "",
              date: new Date().toISOString(),
              source: "SyncTechX",
              country: "Desconhecido",
              link: "",
              image: "",
              status: "Aberta",
            })
          }
          className="flex items-center text-blue-600 hover:underline mb-4"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> Adicionar Notícia
        </button>

        {editingNews && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 space-y-2 shadow-md">
            <input
              type="text"
              placeholder="Título"
              className="w-full p-2 border rounded"
              value={editingNews.title}
              onChange={(e) =>
                setEditingNews({ ...editingNews, title: e.target.value })
              }
            />
            <textarea
              placeholder="Resumo"
              className="w-full p-2 border rounded"
              value={editingNews.excerpt}
              onChange={(e) =>
                setEditingNews({ ...editingNews, excerpt: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Imagem URL"
              className="w-full p-2 border rounded"
              value={editingNews.image || ""}
              onChange={(e) =>
                setEditingNews({ ...editingNews, image: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Link"
              className="w-full p-2 border rounded"
              value={editingNews.link || ""}
              onChange={(e) =>
                setEditingNews({ ...editingNews, link: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Fonte"
              className="w-full p-2 border rounded"
              value={editingNews.source || ""}
              onChange={(e) =>
                setEditingNews({ ...editingNews, source: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="País"
              className="w-full p-2 border rounded"
              value={editingNews.country || ""}
              onChange={(e) =>
                setEditingNews({ ...editingNews, country: e.target.value })
              }
            />
            <input
              type="datetime-local"
              placeholder="Data"
              className="w-full p-2 border rounded"
              value={editingNews.date.slice(0, 16)}
              onChange={(e) =>
                setEditingNews({ ...editingNews, date: new Date(e.target.value).toISOString() })
              }
            />
            <select
              className="w-full p-2 border rounded"
              value={editingNews.status}
              onChange={(e) =>
                setEditingNews({ ...editingNews, status: e.target.value })
              }
            >
              <option>Aberta</option>
              <option>Fechada</option>
              <option>Lotada</option>
              <option>Cancelada</option>
            </select>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setEditingNews(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() =>
                  saveNews(editingNews, editingNews.id || undefined)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {news.map((n) => (
          <div
            key={n.id}
            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg mb-2"
          >
            <span>{n.title}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingNews(n)}
                className="text-blue-500"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteNews(n.id)}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admin: Bolsas */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Bolsas de Estudo
        </h3>
        <button
          onClick={() =>
            setEditingScholarship({
              id: "",
              title: "",
              provider: "",
              country: "",
              eligibility: [],
              steps: [],
              requirements: [],
              specifications: [],
              description: "",
              link: "",
              image: "",
              openingDate: "",
              deadline: "",
              status: "Aberta",
            })
          }
          className="flex items-center text-blue-600 hover:underline mb-4"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> Adicionar Bolsa
        </button>

        {editingScholarship && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 space-y-2 shadow-md">
            <input
              type="text"
              placeholder="Título"
              className="w-full p-2 border rounded"
              value={editingScholarship.title}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  title: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Fornecedor"
              className="w-full p-2 border rounded"
              value={editingScholarship.provider}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  provider: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="País"
              className="w-full p-2 border rounded"
              value={editingScholarship.country}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  country: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Descrição"
              className="w-full p-2 border rounded"
              value={editingScholarship.description || ""}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Link"
              className="w-full p-2 border rounded"
              value={editingScholarship.link || ""}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  link: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Imagem URL"
              className="w-full p-2 border rounded"
              value={editingScholarship.image || ""}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  image: e.target.value,
                })
              }
            />
            <input
              type="datetime-local"
              placeholder="Data de Abertura"
              className="w-full p-2 border rounded"
              value={editingScholarship.openingDate?.slice(0, 16) || ""}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  openingDate: new Date(e.target.value).toISOString(),
                })
              }
            />
            <input
              type="datetime-local"
              placeholder="Data Limite"
              className="w-full p-2 border rounded"
              value={editingScholarship.deadline?.slice(0, 16) || ""}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  deadline: new Date(e.target.value).toISOString(),
                })
              }
            />
            <input
              type="text"
              placeholder="Elegibilidade (separar por vírgula)"
              className="w-full p-2 border rounded"
              value={editingScholarship.eligibility.join(", ")}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  eligibility: e.target.value.split(",").map((x) => x.trim()),
                })
              }
            />
            <input
              type="text"
              placeholder="Passos (separar por vírgula)"
              className="w-full p-2 border rounded"
              value={editingScholarship.steps.join(", ")}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  steps: e.target.value.split(",").map((x) => x.trim()),
                })
              }
            />
            <input
              type="text"
              placeholder="Requisitos (separar por vírgula)"
              className="w-full p-2 border rounded"
              value={editingScholarship.requirements.join(", ")}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  requirements: e.target.value.split(",").map((x) => x.trim()),
                })
              }
            />
            <input
              type="text"
              placeholder="Especificações (separar por vírgula)"
              className="w-full p-2 border rounded"
              value={editingScholarship.specifications.join(", ")}
              onChange={(e) =>
                setEditingScholarship({
                  ...editingScholarship,
                  specifications: e.target.value.split(",").map((x) => x.trim()),
                })
              }
            />
            <select
              className="w-full p-2 border rounded"
              value={editingScholarship.status}
              onChange={(e) =>
                setEditingScholarship({ ...editingScholarship, status: e.target.value })
              }
            >
              <option>Aberta</option>
              <option>Fechada</option>
              <option>Lotada</option>
              <option>Cancelada</option>
            </select>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setEditingScholarship(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() =>
                  saveScholarship(editingScholarship, editingScholarship.id || undefined)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {scholarships.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg mb-2"
          >
            <span>{s.title}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingScholarship(s)}
                className="text-blue-500"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteScholarship(s.id)}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

        {/* 🔐 PIN Modal */}
        {showPinModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-96 text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Acesso Administrativo
              </h2>
              <input
                type="password"
                placeholder="Digite o PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full p-3 border rounded-lg mb-4 text-center text-lg"
              />
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
