import React, { useState, useEffect, useMemo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { accommodations } from "../data/accommodations";
import { activities } from "../data/activities";
import {
  FaMapMarkerAlt,
  FaBed,
  FaRunning,
  FaCoffee,
  FaChurch,
  FaFilm,
  FaShoppingBag,
  FaLandmark,
  // FaMapMarkedAlt,
  // FaArrowLeft,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// const containerStyle = { width: "100%", height: "450px" };
// const fullMapStyle = { width: "100%", height: "calc(100vh - 100px)" };

const AccommodationExplorer: React.FC = () => {
  const [paisSelecionado, setPaisSelecionado] = useState("");
  const [universidadeSelecionada, setUniversidadeSelecionada] = useState("");
  const [tipoAtividadeSelecionada, setTipoAtividadeSelecionada] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Acomodações" | "Atividades">("Acomodações");
  const [mapViewOnly ] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_KEY",
  });

  const [userLocation, setUserLocation] = useState({ lat: -33.9249, lng: 18.4241 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.warn("Geolocation not available or denied")
      );
    }
  }, []);

  const filteredAccommodations = useMemo(
    () =>
      accommodations.filter(
        (acc) =>
          acc.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!paisSelecionado || acc.pais === paisSelecionado) &&
          (!universidadeSelecionada || acc.universidade === universidadeSelecionada)
      ),
    [searchQuery, paisSelecionado, universidadeSelecionada]
  );

  const filteredActivities = useMemo(
    () =>
      activities.filter(
        (act) =>
          act.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!paisSelecionado || act.pais === paisSelecionado) &&
          (!tipoAtividadeSelecionada || act.tipo === tipoAtividadeSelecionada)
      ),
    [searchQuery, paisSelecionado, tipoAtividadeSelecionada]
  );

  const [externalItems, setExternalItems] = useState<any[] | null>(null);
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiPage, setAiPage] = useState(1);

  const itemsToDisplay =
    externalItems ?? (activeTab === "Acomodações" ? filteredAccommodations : filteredActivities);

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "Desporto": return <FaRunning className="text-green-500" />;
      case "Café": return <FaCoffee className="text-orange-500" />;
      case "Ginásio": return <FaBed className="text-purple-500" />;
      case "Igreja": return <FaChurch className="text-indigo-500" />;
      case "Cinema": return <FaFilm className="text-red-500" />;
      case "Shopping": return <FaShoppingBag className="text-pink-500" />;
      case "Museu": return <FaLandmark className="text-yellow-500" />;
      default: return <FaMapMarkerAlt className="text-blue-500" />;
    }
  };

  async function handleAISearch(loadMore = false) {
    if (!searchQuery.trim()) return;
    setIsSearchingAI(true);
    setAiError(null);
    const nextPage = loadMore ? aiPage + 1 : 1;

    try {
      const resp = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, tab: activeTab, limit: 10 }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || "Erro desconhecido");
      }

      const data = await resp.json();
      const items = (data.items || []).map((it: any, idx: number) => ({
        id: it.id || `external-${idx}`,
        nome: it.nome || "Sem nome",
        descricao: it.descricao || "",
        pais: it.pais || "",
        universidade: it.universidade || "",
        tipo: it.tipo || "",
        preco: it.preco ?? null,
        imagem: it.imagem || null,
        lat: typeof it.lat === "number" ? it.lat : it.lat ? Number(it.lat) : null,
        lng: typeof it.lng === "number" ? it.lng : it.lng ? Number(it.lng) : null,
      }));

      setExternalItems(loadMore ? [...(externalItems || []), ...items] : items);
      setAiPage(nextPage);
    } catch (err: any) {
      console.error("AI search error", err);
      setAiError(err.message || "Erro ao pesquisar com IA");
    } finally {
      setIsSearchingAI(false);
    }
  }

  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
      <div className="w-20 h-20 border-4 border-t-4 border-purple-600 border-t-blue-500 rounded-full animate-spin mb-4" />
      <p className="text-gray-700 text-lg font-medium">A pesquisar com IA, por favor aguarda...</p>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 p-6">
      {isSearchingAI && <LoadingScreen />}

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Explorar{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              {externalItems ? "Resultados (IA)" : activeTab}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            Descobre acomodações e atividades alinhadas com os teus interesses.
          </p>
        </div>

        {/* FILTERS */}
        <div className="w-full bg-white p-4 md:p-6 rounded-2xl shadow-md border border-gray-100">
  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-stretch">
    {/* Search Bar */}
    <div className="flex flex-1 items-center gap-2 bg-gray-50 border rounded-full px-3 sm:px-4 py-2 shadow-sm hover:shadow-md transition">
      <input
        type="text"
        placeholder='🔍 Ex: "Acomodação de estudantes no Chipre"'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
      <button
        onClick={() => handleAISearch(false)}
        disabled={isSearchingAI}
        className="hidden sm:inline px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 shadow hover:scale-[1.02] transition disabled:opacity-60"
      >
        Pesquisar com IA
      </button>
    </div>

    {/* Mobile Search Button */}
    <button
      onClick={() => handleAISearch(false)}
      disabled={isSearchingAI}
      className="sm:hidden w-full px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 shadow hover:scale-[1.02] transition disabled:opacity-60"
    >
      Pesquisar com IA
    </button>

    {/* Country Filter */}
    <select
      className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full border outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm hover:shadow-md"
      value={paisSelecionado}
      onChange={(e) => setPaisSelecionado(e.target.value)}
    >
      <option value="">🌍 Todos os Países</option>
      {[
        "Moçambique",
        "África do Sul",
        "Portugal",
        "Alemanha",
        "Chipre",
        "Malásia",
        "Polónia",
        "Estados Unidos da América",
        "Espanha",
        "Brasil",
        "Reino Unido",
        "Índia",
      ].map((pais) => (
        <option key={pais} value={pais}>
          {pais}
        </option>
      ))}
    </select>

    {/* University Filter (Acomodações) */}
    {externalItems === null && activeTab === "Acomodações" && (
      <select
        className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full border outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm hover:shadow-md"
        value={universidadeSelecionada}
        onChange={(e) => setUniversidadeSelecionada(e.target.value)}
      >
        <option value="">🎓 Todas as Universidades</option>
        {[
          ...new Set(
            accommodations
              .filter((acc) =>
                paisSelecionado ? acc.pais === paisSelecionado : true
              )
              .map((acc) => acc.universidade)
          ),
        ].map((uni) => (
          <option key={uni} value={uni}>
            {uni}
          </option>
        ))}
      </select>
    )}

    {/* Activity Filter (Atividades) */}
    {externalItems === null && activeTab === "Atividades" && (
      <select
        className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full border outline-none focus:ring-2 focus:ring-purple-400 transition shadow-sm hover:shadow-md"
        value={tipoAtividadeSelecionada}
        onChange={(e) => setTipoAtividadeSelecionada(e.target.value)}
      >
        <option value="">🎭 Todos os Tipos</option>
        {[
          "Desporto",
          "Igreja",
          "Café",
          "Ginásio",
          "Cinema",
          "Shopping",
          "Museu",
        ].map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>
    )}

    {/* Return to Local Results */}
    {externalItems && (
      <button
        onClick={() => {
          setExternalItems(null);
          setAiPage(1);
        }}
        className="w-full sm:w-auto px-4 py-2 rounded-full border font-semibold text-gray-700 hover:shadow-md transition"
      >
        🔙 Voltar aos resultados locais
      </button>
    )}
  </div>
</div>


        {/* TABS */}
        <div className="flex justify-center space-x-4 mb-10 flex-wrap">
          {["Acomodações", "Atividades"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setExternalItems(null);
                setAiPage(1);
              }}
              className={`py-3 px-6 font-semibold rounded-full transition-all duration-300 mb-2 sm:mb-0 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:shadow-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* RESULTS */}
        {!mapViewOnly ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {itemsToDisplay.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <FaMapMarkerAlt className="mx-auto text-6xl text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">
                  Nenhum resultado encontrado. Tenta outros filtros ou pesquisa
                  com IA.
                </p>
                {aiError && (
                  <p className="text-red-500 mt-4 font-semibold">{aiError}</p>
                )}
              </div>
            ) : (
              itemsToDisplay.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition hover:shadow-2xl hover:scale-[1.02]"
                >
                  {activeTab === "Atividades" && item.imagem && (
                    <img
                      src={item.imagem || "/placeholder.png"}
                      alt={item.nome}
                      className="w-full md:w-48 h-48 object-cover"
                      loading="lazy"
                    />
                  )}

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {activeTab === "Atividades" && getIcon(item.tipo)}
                        <span className="text-gray-400 text-sm">
                          {activeTab === "Acomodações"
                            ? item.universidade
                            : item.tipo}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.nome}
                      </h3>
                      <p className="text-gray-500 mt-1 text-sm line-clamp-3">
                        {item.descricao}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/search?q=${encodeURIComponent(
                              item.nome + " " + item.pais
                            )}`,
                            "_blank"
                          )
                        }
                        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-full text-sm shadow hover:from-purple-700 hover:to-blue-600 transition"
                      >
                        Ver mais
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          isLoaded && (
            <div className="mt-4 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              {/* <GoogleMap
                mapContainerStyle={fullMapStyle}
                center={{
                  lat: itemsToDisplay[0]?.lat || userLocation.lat,
                  lng: itemsToDisplay[0]?.lng || userLocation.lng,
                }}
                zoom={11}
              >
                {itemsToDisplay.map(
                  (item: any) =>
                    item.lat &&
                    item.lng && (
                      <Marker
                        key={item.id}
                        position={{ lat: item.lat, lng: item.lng }}
                        title={item.nome}
                      />
                    )
                )}
              </GoogleMap> */}
            </div>
          )
        )}

        {/* MAP BELOW GRID */}
        {/* {!mapViewOnly && isLoaded && itemsToDisplay.length > 0 && (
          <div className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: itemsToDisplay[0]?.lat || userLocation.lat,
                lng: itemsToDisplay[0]?.lng || userLocation.lng,
              }}
              zoom={11}
            >
              {itemsToDisplay.map(
                (item: any) =>
                  item.lat &&
                  item.lng && (
                    <Marker
                      key={item.id}
                      position={{ lat: item.lat, lng: item.lng }}
                      title={item.nome}
                    />
                  )
              )}
            </GoogleMap>
          </div>
        )} */}

        {/* LOAD MORE BUTTON */}
        {externalItems && externalItems.length > 0 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => handleAISearch(true)}
              disabled={isSearchingAI}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow hover:scale-105 transition disabled:opacity-50"
            >
              Carregar mais resultados
            </button>
          </div>
        )}
      </div>

      {/* TOGGLE MAP BUTTON */}
      {/* <button
        onClick={() => setMapViewOnly(!mapViewOnly)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        title={mapViewOnly ? "Voltar à lista" : "Ver apenas o mapa"}
      >
        {mapViewOnly ? <FaArrowLeft size={20} /> : <FaMapMarkedAlt size={20} />}
      </button> */}
    </div>
  );
};

export default AccommodationExplorer;
