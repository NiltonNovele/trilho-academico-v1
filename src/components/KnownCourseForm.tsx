import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  DollarSign,
  Heart,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { useFormData, KnownCourseData } from "./FormDataContext";

const steps = [
  "Informação Pessoal",
  "Curso e Preferências",
  "Localização",
  "Orçamento & Idiomas",
  "Interesses & Observações",
];

const countryOptions = [
  "Moçambique",
  "África do Sul",
  "Polónia",
  "Brasil",
  "Índia",
  "Reino Unido",
  "Estados Unidos da América",
  "Chipre",
  "Portugal",
  "Malásia",
  "Alemanha",
  "Espanha",
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
  "Cabo Delgado",
  "Niassa",
];

const accommodationOptions = [
  "Apartamento / Flat",
  "Residência Estudantil",
  "Studio",
  "Casa Partilhada",
];

const KnownCourseForm: React.FC = () => {
  const navigate = useNavigate();
  const { setKnownCourseData } = useFormData();

  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<
    KnownCourseData & {
      name?: string;
      dateOfBirth?: string;
      highestEducation?: string;
      highSchool?: string;
      country?: string;
      province?: string;
      curriculum?: string;
      finalAverage?: string;
      hasAccommodation?: string;
      accommodationType?: string;
      studyMode?: string;
      startDate?: string;
      startMonthYear?: string;
      duration?: string;
      visaConcerns?: string;
    }
  >({
    name: "",
    dateOfBirth: "",
    highestEducation: "",
    highSchool: "",
    country: "",
    province: "",
    curriculum: "",
    finalAverage: "",
    course: "",
    alternativeCourses: [""],
    targetUniversities: "",
    preferredRegions: "",
    desiredCountries: [],
    startDate: "",
    duration: "",
    budget: "",
    currency: "MZN",
    livingPreference: "",
    studyMode: "",
    fundingType: "",
    visaConcerns: "",
    hasAccommodation: "no",
    accommodationType: "",
    languages: [""],
    interests: "",
    notes: "",
  });
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Handlers
  const handleArrayChange = (
    field: "alternativeCourses" | "languages",
    index: number,
    value: string
  ) => {
    const updated = [...(formData[field] as string[])];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addField = (field: "alternativeCourses" | "languages") => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    });
  };

  const handleLanguageChange = (index: number, value: string) =>
    handleArrayChange("languages", index, value);

  const handleAlternativeCourseChange = (index: number, value: string) =>
    handleArrayChange("alternativeCourses", index, value);

  const addAlternativeCourse = () => addField("alternativeCourses");
  const addLanguage = () => addField("languages");

  const handleCountrySelection = (value: string) => {
    let updated = [...(formData.desiredCountries || [])];
    if (updated.includes(value)) {
      updated = updated.filter((c) => c !== value);
    } else {
      if (updated.length >= 3) {
        alert("Só podes selecionar até 3 países preferidos.");
        return;
      }
      updated.push(value);
    }
    setFormData({ ...formData, desiredCountries: updated });
  };

  const nextStep = () => {
    if (step < steps.length) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== steps.length) return; // Prevent submission if not final step
    setKnownCourseData(formData);
    navigate("/results");
  };

  const progress = (step / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-100 py-10 sm:py-14">

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-lg mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Plano de Estudos Detalhado
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Preenche o formulário com atenção — quanto mais detalhes forneceres, melhores serão as recomendações.
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative mb-10 px-2 sm:px-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs sm:text-sm font-medium text-gray-600">
            {steps.map((label, index) => (
              <span
                key={index}
                className={`${index + 1 <= step ? "text-indigo-600 font-semibold" : "text-gray-500"}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && step !== steps.length) e.preventDefault();
          }}
          className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-500"
        >
          {/* --- Step 1: Informação Pessoal --- */}
          {step === 1 && (
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
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, highestEducation: e.target.value })}
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
                    Escola Secundária (Ensino Médio)
                  </label>
                  <input
                    type="text"
                    value={formData.highSchool}
                    onChange={(e) => setFormData({ ...formData, highSchool: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Província</label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currículo</label>
                  <select
                    value={formData.curriculum}
                    onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Média Final</label>
                  <input
                    type="text"
                    value={formData.finalAverage}
                    onChange={(e) => setFormData({ ...formData, finalAverage: e.target.value })}
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

          {/* Step 2: Curso e Preferências */}
{step === 2 && (
  <div className="space-y-6 animate-fade-in">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
      <BookOpen className="w-5 h-5 text-indigo-600" /> Curso e Preferências
    </h2>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Curso Principal
      </label>
      <input
        type="text"
        value={formData.course}
        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        placeholder="Ex: Engenharia Informática"
        className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Cursos Alternativos
      </label>
      {formData.alternativeCourses.map((course, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={course}
            onChange={(e) =>
              handleAlternativeCourseChange(index, e.target.value)
            }
            placeholder={`Curso alternativo #${index + 1}`}
            className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addAlternativeCourse}
        className="text-indigo-600 text-sm hover:underline"
      >
        + Adicionar curso alternativo
      </button>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Já tens alojamento?
      </label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="hasAccommodation"
            value="yes"
            checked={formData.hasAccommodation === "yes"}
            onChange={(e) =>
              setFormData({ ...formData, hasAccommodation: e.target.value })
            }
            className="text-indigo-600 focus:ring-indigo-500"
          />
          Sim
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="hasAccommodation"
            value="no"
            checked={formData.hasAccommodation === "no"}
            onChange={(e) =>
              setFormData({ ...formData, hasAccommodation: e.target.value })
            }
            className="text-indigo-600 focus:ring-indigo-500"
          />
          Não
        </label>
      </div>
    </div>

    {formData.hasAccommodation === "no" && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Que tipo de alojamento preferes?
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          {accommodationOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-indigo-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.accommodationType?.includes(option)}
                onChange={(e) => {
                  let updated = formData.accommodationType
                    ? formData.accommodationType.split(",")
                    : [];
                  if (e.target.checked) {
                    updated.push(option);
                  } else {
                    updated = updated.filter((o) => o !== option);
                  }
                  setFormData({
                    ...formData,
                    accommodationType: updated.join(","),
                  });
                }}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    )}

    <div className="grid sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modo de Estudo
        </label>
        <select
          value={formData.studyMode}
          onChange={(e) =>
            setFormData({ ...formData, studyMode: e.target.value })
          }
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="">Selecionar</option>
          <option value="full-time">Presencial</option>
          <option value="part-time">Online</option>
          <option value="hybrid">Híbrido</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mês e Ano de Início Desejado
        </label>
        <input
          type="month"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duração do Curso
        </label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          placeholder="Ex: 3 anos, 6 semestres..."
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observações
        </label>
        <textarea
          value={formData.visaConcerns}
          onChange={(e) =>
            setFormData({ ...formData, visaConcerns: e.target.value })
          }
          placeholder="Conte-nos algo importante (E.x. perdi o meu certificado)"
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          rows={2}
        />
      </div>
    </div>
  </div>
)}

          {/* Step 3: Localização */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" /> Localização Preferida
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Onde gostarias de estudar?
                </label>
                <textarea
                  value={formData.preferredRegions}
                  onChange={(e) => setFormData({ ...formData, preferredRegions: e.target.value })}
                  placeholder="Ex: Maputo, Lisboa, Cidade do Cabo..."
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Países de Interesse (máx. 3)
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {countryOptions.map((country) => (
                    <label
                      key={country}
                      className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.desiredCountries?.includes(country)}
                        onChange={() => handleCountrySelection(country)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
                {formData.desiredCountries?.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Selecionados: {formData.desiredCountries.join(", ")}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Universidades de Interesse</label>
                <input
                  type="text"
                  value={formData.targetUniversities}
                  onChange={(e) => setFormData({ ...formData, targetUniversities: e.target.value })}
                  placeholder="Ex: UEM, UCT, Wits, Harvard..."
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

         {/* Step 4: Orçamento & Idiomas */}
{step === 4 && (
  <div className="space-y-8 animate-fade-in">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
      <DollarSign className="w-5 h-5 text-indigo-600" /> Orçamento & Idiomas
    </h2>

    {/* Orçamento e Financiamento */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Orçamento */}
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Orçamento Estimado (por ano)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            placeholder="Ex: 500000"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
          />
          <select
            value={formData.currency}
            onChange={(e) =>
              setFormData({ ...formData, currency: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
          >
            <option value="MZN">MZN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ZAR">ZAR</option>
          </select>
        </div>
      </div>

      {/* Financiamento */}
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Como pretendes financiar os estudos?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Recursos próprios",
            "Bolsa de estudo",
            "Empréstimo bancário",
            "Apoio familiar",
            "Outros",
          ].map((option) => {
            const selected =
              formData.fundingType?.split(",").includes(option) || false;
            return (
              <label
                key={option}
                className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all duration-150 text-sm sm:text-base ${
                  selected
                    ? "bg-indigo-50 border-indigo-500 shadow-sm"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => {
                    let updated = formData.fundingType
                      ? formData.fundingType.split(",")
                      : [];
                    if (e.target.checked) {
                      updated.push(option);
                    } else {
                      updated = updated.filter((o) => o !== option);
                    }
                    setFormData({
                      ...formData,
                      fundingType: updated.join(","),
                    });
                  }}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  className={`${
                    selected ? "text-indigo-700 font-medium" : "text-gray-700"
                  }`}
                >
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>

    {/* Idiomas */}
    <div>
      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
        Idiomas Preferidos
      </label>
      <div className="space-y-2">
        {formData.languages.map((lang, index) => (
          <input
            key={index}
            type="text"
            value={lang}
            onChange={(e) => handleLanguageChange(index, e.target.value)}
            placeholder="Ex: Inglês, Português..."
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={addLanguage}
        className="mt-2 text-indigo-600 text-sm sm:text-base font-medium hover:underline transition"
      >
        + Adicionar idioma
      </button>
    </div>

    {/* Interesses & Observações */}
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <Heart className="w-5 h-5 text-indigo-600" /> Interesses & Observações
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interesses e Motivações
        </label>
        <textarea
          value={formData.interests}
          onChange={(e) =>
            setFormData({ ...formData, interests: e.target.value })
          }
          placeholder="Fala-nos sobre as tuas paixões, objetivos e áreas de interesse..."
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Observações Finais
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
          placeholder="Qualquer informação adicional relevante..."
          className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          rows={3}
        />
      </div>
    </div>
  </div>
)}



          

           {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-10 gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
            ) : (
              <div />
            )}

            {step < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Avançar
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium shadow-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <CheckCircle2 className="w-4 h-4" /> Submeter Formulário
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default KnownCourseForm;