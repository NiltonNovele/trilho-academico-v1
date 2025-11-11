import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormData } from "./FormDataContext";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions";
import { User } from "lucide-react";

const API_URL = "https://trilhoacademico.edu.mz";

const professors = [
  { name: "Dra. Marcia Martins Banze", email: "Mestre em Psicologia", picture: "/marcia.jpg" },
  { name: "Alicio Lino", email: "Estudante de Psicologia na USTM", picture: "/farley.jpg" },
];

const countryOptions = [
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
];

const provinceOptions = [
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Niassa",
  "Cabo Delgado",
];

type AllAnswers = Record<number, string | string[]>;

const chunk = <T,>(arr: T[], size = 3) => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const VocationalTestForm: React.FC = () => {
  const navigate = useNavigate();
  const { setVocationalQuizData } = useFormData();

  const [showModal, setShowModal] = useState(false);

  // 🔹 Step 0: Personal Information
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    highestEducation: "",
    highSchool: "",
    country: "",
    province: "",
    curriculum: "",
    finalAverage: "",
  });

  // 🔹 Step 1+: Vocational Quiz
  const defaultAnswers: AllAnswers = Object.fromEntries(
    QUESTIONS.map((q) => [q.id, q.type === "multi" ? [] : ""])
  );
  const [answers, setAnswers] = useState<AllAnswers>(defaultAnswers);
  const steps = useMemo(() => chunk(QUESTIONS, 3), []);
  const totalSteps = steps.length;

  // step 0 = personal info, step 1+ = quiz
  const [currentStep, setCurrentStep] = useState(0);

  const totalQuestions = QUESTIONS.length;
  const answeredCount = useMemo(() => {
    let c = 0;
    Object.entries(answers).forEach(([_, v]) => {
      if (Array.isArray(v)) {
        if (v.length) c++;
      } else if (v) c++;
    });
    return c;
  }, [answers]);

  const handleAnswer = (id: number, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const toggleMulti = (id: number, opt: string) => {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];
      if (arr.includes(opt)) return { ...prev, [id]: arr.filter((o) => o !== opt) };
      if (arr.length >= 3) return prev;
      return { ...prev, [id]: [...arr, opt] };
    });
  };

  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true); // 🔹 Start loading

  setVocationalQuizData({ answers });

  try {
    const knownCourse = JSON.parse(localStorage.getItem("knownCourseData") || "{}");

    const response = await fetch(`${API_URL}/study-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personal: formData,
        vocational: answers,
        knownCourse,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log("Study Plan result:", data.result);
    localStorage.setItem("studyPlan", JSON.stringify(data.result));
    navigate("/results");
  } catch (err) {
    console.error("Failed to send data:", err);
    alert("Ocorreu um erro ao enviar os dados. Tenta novamente.");
  } finally {
    setLoading(false); // 🔹 Stop loading
  }
};

  const buttonClass = (selected = false) =>
    `flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition ${
      selected
        ? "bg-gradient-to-r from-[#26C6DA] to-[#6A5BFF] text-white border-transparent shadow-md"
        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col lg:flex-row gap-6 transition-all"
      >
        {/* Sidebar */}
        <aside className="lg:w-1/3 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#26C6DA] to-[#6A5BFF] flex items-center justify-center text-white text-lg font-bold shadow">
                TA
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                  Teste Vocacional
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  Responde com honestidade — leva apenas alguns minutos.
                </p>
              </div>
            </div>

            <h3 className="text-xs sm:text-sm font-semibold text-gray-600 uppercase mb-1">
              Passo {currentStep === 0 ? "Informação Pessoal" : `${currentStep} / ${totalSteps}`}
            </h3>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / (totalSteps + 1)) * 100}%`,
                  background: "linear-gradient(90deg,#26C6DA,#6A5BFF)",
                }}
              />
            </div>

            <p className="text-xs sm:text-sm text-gray-600">
              {currentStep === 0
                ? "Começa com as tuas informações básicas antes de fazer o teste."
                : `Perguntas respondidas: ${answeredCount} / ${totalQuestions}`}
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <motion.div
          key={currentStep}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:w-2/3 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md flex flex-col gap-6"
        >
          {/* --- Step 0: Informação Pessoal --- */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" /> Informação Pessoal
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Nilton Novele"
                    required
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    required
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nível Académico Mais Elevado
                  </label>
                  <select
                    value={formData.highestEducation}
                    onChange={(e) =>
                      setFormData({ ...formData, highestEducation: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Selecionar</option>
                    <option value="ensino-medio">Ensino Médio</option>
                    <option value="licenciatura">Licenciatura</option>
                    <option value="mestrado">Mestrado</option>
                    <option value="doutoramento">Doutoramento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Escola Secundária
                  </label>
                  <input
                    type="text"
                    value={formData.highSchool}
                    onChange={(e) =>
                      setFormData({ ...formData, highSchool: e.target.value })
                    }
                    placeholder="Ex: Escola Secundária Josina Machel"
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Selecionar</option>
                    {countryOptions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {formData.country === "Moçambique" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Província
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="">Selecionar</option>
                      {provinceOptions.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currículo
                  </label>
                  <select
                    value={formData.curriculum}
                    onChange={(e) =>
                      setFormData({ ...formData, curriculum: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="">Selecionar</option>
                    <option value="mozambicano">Nacional (Moçambicano)</option>
                    <option value="americano">Americano</option>
                    <option value="britanico">Cambridge</option>
                    <option value="ieb">IEB</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Média Final
                  </label>
                  <input
                    type="text"
                    value={formData.finalAverage}
                    onChange={(e) =>
                      setFormData({ ...formData, finalAverage: e.target.value })
                    }
                    placeholder={
                      formData.curriculum === "americano"
                        ? "Ex: 3.7 GPA"
                        : formData.curriculum === "mozambicano"
                        ? "Ex: 15/20"
                        : "Ex: 85%"
                    }
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --- Vocational Steps --- */}
          {currentStep > 0 &&
            steps[currentStep - 1].map((q) => (
              <div key={q.id} className="mb-6">
                <label className="block text-gray-800 font-medium mb-3">{q.text}</label>
                {(q.type === "likert" || q.type === "scale" || q.type === "single" || q.type === "ab") && (
                  <div className="flex flex-wrap gap-2">
                    {q.options?.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleAnswer(q.id, opt)}
                        className={buttonClass(answers[q.id] === opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {q.type === "multi" && (
                  <div className="flex flex-wrap gap-2">
                    {q.options?.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleMulti(q.id, opt)}
                        className={buttonClass((answers[q.id] as string[]).includes(opt))}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-4 flex-wrap gap-3">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-5 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                ← Voltar
              </button>
            )}
            <div className="ml-auto flex gap-2 items-center flex-wrap">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-[#26C6DA] to-[#6A5BFF] text-white rounded-lg shadow hover:scale-105 transition-transform"
                >
                  {currentStep === 0 ? "Começar Teste →" : "Próximo →"}
                </button>
              ) : (
                <button
  type="submit"
  disabled={loading}
  className={`px-6 py-2 rounded-lg shadow text-white transition-transform flex items-center justify-center gap-2 ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-green-400 to-teal-400 hover:scale-105"
  }`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Enviando...
    </>
  ) : (
    "Submeter Teste"
  )}
</button>
              )}
            </div>
          </div>
        </motion.div>
      </form>

      {/* Modal Section */}
      <div className="relative">
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#26C6DA] to-[#6A5BFF] shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform"
        >
          ℹ️
        </button>

        <AnimatePresence>
          {showModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 bg-black"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Responsáveis</h2>
                  <div className="space-y-4">
                    {professors.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition"
                      >
                        <img
                          src={p.picture}
                          alt={p.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{p.name}</p>
                          <p className="text-sm text-gray-600">{p.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Em caso de dúvidas, contacte a equipa Trilho Académico.
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VocationalTestForm;
