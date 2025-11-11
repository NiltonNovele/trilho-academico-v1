import React, { useState } from 'react';
import { NavigationPage } from '../types';
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Globe,
  BookOpen,
  FileText,
  Users,
  Newspaper,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Rocket,
  MapPin,
  Zap,
  AlertTriangle,
  // Gift
} from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

interface HomeProps {
  onNavigate: (page: NavigationPage) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Seleciona o Curso Perfeito",
      description:
        "Ao completar o nosso teste vocacional, recebe sugestões de cursos que melhor se alinham consigo, com a sua personalidade e interesses.",
      route: "/explorar",
      color: "from-purple-500 to-pink-600",
      badge: "Educação",
    },
    {
      icon: Globe,
      title: "Escolhe o País Ideal",
      description:
        "Com a nossa inteligência artificial, descobre qual o país (incluindo Moçambique), cidade e região que melhor se adapta aos teus sonhos e possibilidades.",
      route: "/escolher-teste",
      color: "from-cyan-500 to-blue-600",
      badge: "AI",
    },
    {
      icon: FileText,
      title: "Documentação e Vistos",
      description:
        "Recebe orientações passo a passo para preparar toda a documentação necessária, incluindo vistos de estudante.",
      route: "/legal",
      color: "from-green-500 to-emerald-600",
      badge: "Guias",
    },
    {
      icon: MapPin,
      title: "Planeamento Financeiro",
      description:
        "Calcula custos de vida, propinas e encontra bolsas de estudo e oportunidades de financiamento para identificar o melhor plano para si.",
      route: "/financeiro",
      color: "from-orange-500 to-red-600",
      badge: "Finanças",
    },
    {
      icon: Users,
      title: "Comunidade de Estudantes",
      description:
        "Liga-te a outros estudantes moçambicanos que já estão a estudar no estrangeiro e aprende com a experiência deles.",
      route: "/community",
      color: "from-indigo-500 to-purple-600",
      badge: "Rede",
    },
    {
      icon: Zap,
      title: "Suporte Personalizado",
      description:
        "Aproveite o apoio das comunidades e associações de estudantes em diferentes países, que querem orientar-te em todas as etapas.",
      route: "/contact",
      color: "from-teal-500 to-cyan-600",
      badge: "Mentoria",
    },
  ];

 const stats = [
  { label: "Países Disponíveis", value: 10, suffix: "+", icon: Globe, color: "text-cyan-600" },
  { label: "Estudantes Ajudados", value: 32, suffix: "+", icon: Users, color: "text-purple-600" },
  { label: "Testes Realizados", value: 40, suffix: "+", icon: Newspaper, color: "text-green-600" },
];

  const associations = [
    {
      src: "/partners/amecc.webp",
      alt: "AMECC",
      description:
        "Associação de Estudantes Moçambicanos na Cidade do Cabo, promovendo união e apoio entre estudantes na Cidade do Cabo.",
    },
    {
      src: "/partners/india.png",
      alt: "APU Moz Community",
      description: "Uma communidade juvenil de estudantes na Asia Pacific University.",
    },
    {
      src: "/partners/coimbra.png",
      alt: "AEMOPCoimbra",
      description: "Associação dos Estudantes Moçambicanos em Portugal - Coimbra.",
    },
    {
      src: "/partners/lisboa.png",
      alt: "AEMOP-NL",
      description: "Associação dos Estudantes Moçambicanos em Portugal - Núcleo de Lisboa.",
    },
    {
      src: "/partners/porto.png",
      alt: "AEMOPorto",
      description: "Associação dos Estudantes Moçambicanos no Porto, Portugal.",
    },
    {
      src: "/partners/mz-india.png",
      alt: "India",
      description: "Associação dos Estudantes Moçambicanos na India.",
    },
    {
      src: "/partners/mz-cp.png",
      alt: "Chipre",
      description: "Associação dos Estudantes Moçambicanos no Chipre.",
    },
  ];

  const partners = [
  {
    src: "/partners/kinesis.png",
    alt: "KinesisMz",
  },
  {
    src: "/partners/jeffito.webp",
    alt: "Jeffito",
  },
  {
    src: "/partners/chairman.png",
    alt: "ChairmanMediaHouse",
  },
  {
    src: "/partners/jeffito.webp",
    alt: "Jeffito",
  },
  {
    src: "/partners/kinesis.png",
    alt: "KinesisMz",
  },
];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 transition-colors duration-200">
      {/* Sliding Panel */}
      
       <div
  className={`fixed top-0 left-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 z-50 flex flex-col ${
    isPanelOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>
  {/* Header Section */}
  {/* <div className="relative h-60 w-full">
    <img
      src="/sidebar.png"
      alt="SyncTechX Banner"
      className="w-full h-full object-cover rounded-b-3xl"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end pb-6">
      <h2 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">SyncTechX Team</h2>
      <p className="text-sm text-gray-200">Dream. Build. Innovate.</p>
    </div>
  </div> */}

  {/* Team Section */}
  <div className="p-6 overflow-y-auto">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
      Elenco Principal
    </h3>

    <div className="space-y-6">
      {[
        {
          name: "Bionda Shirley",
          role: "Bionda@trilhoacademico.edu.mz",
          img: "/team/bionda.jpeg",
          quote: "Transformar ideias em impacto real.",
        },
        {
          name: "Henzel Tibana",
          role: "Henzel@trilhoacademico.edu.mz",
          img: "/henzel.jpg",
          quote: "Inovação é o futuro.",
        },
        {
          name: "Mauro Chemane",
          role: "Mauro@trilhoacademico.edu.mz",
          img: "/team/mauro.jpg",
          quote: "O detalhe faz a diferença.",
        },
        {
          name: "Alicio Lino",
          role: "Alicio@trilhoacademico.edu.mz",
          img: "/team/farley.jpg",
          quote: "Resolver problemas reais.",
        },
        {
          name: "Nilton Novele",
          role: "Nilton@trilhoacademico.edu.mz",
          img: "/team/nilton.jpeg",
          quote: "Simplicidade.",
        },
      ].map((member, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center group"
        >
          <div className="relative">
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-cyan-600 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
            />
            <div className="absolute inset-0 rounded-full bg-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <h4 className="mt-3 text-gray-900 dark:text-white font-semibold">{member.name}</h4>
          <p className="text-sm text-cyan-700 dark:text-cyan-400">{member.role}</p>
          <p className="text-xs italic text-gray-600 dark:text-gray-400 mt-1 px-4">
            “{member.quote}”
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Toggle Button */}
<button
  onClick={() => setIsPanelOpen(!isPanelOpen)}
  className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 bg-cyan-600 text-white p-2 rounded-r-xl shadow-lg hover:bg-cyan-700 transition-colors"
>
  {isPanelOpen ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
</button>


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 dark:from-cyan-400/10 dark:to-blue-500/10 px-4 py-2 rounded-full border border-cyan-200 dark:border-cyan-800 mb-8">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                Dinamizar a educação em Moçambique
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              O Teu Futuro Académico
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600">
                {' '}
                Começa Aqui
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              O Trilho Académico é o único teste vocacional em Moçambique que identifica o curso ideal para a tua personalidade e sugere universidades em Moçambique e no estrangeiro, incluindo opções de bolsas. Descobre o país, o curso e a instituição perfeita, com orientação completa para fazer o ensino superior sem complicações.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/escolher-teste">
    <button
      className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
    >
      <Rocket className="w-5 h-5 group-hover:animate-bounce" />
      <span>Começar agora</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  </Link>

  <Link to="/escolher-teste">
    <button
      className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-600 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    >
      Fazer Teste de vocacional
    </button>
  </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ALERTS SECTION */}
      <div className="max-w-4xl mx-auto px-4 mb-8 space-y-4">
        {/* Alert: Update on 7th October */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-sm flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 mt-0.5 text-yellow-500" />
          <div>
            <h3 className="font-semibold text-lg">Atualização Importante - 25 de Novembro</h3>
            <p className="text-sm">
              No dia <span className="font-semibold">25 de Novembro</span>, lançaremos uma grande atualização
              na plataforma. Fica Atento!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      
   <div className="bg-white dark:bg-gray-800 py-16 border-y border-gray-200 dark:border-gray-700 transition-colors duration-200">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>

                {/* CountUp */}
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  {stat.suffix}
                </div>

                {/* Label */}
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>


      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-600/10 dark:from-purple-400/10 dark:to-pink-500/10 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Funcionalidades Avançadas
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Traça O Trilho Para O
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {' '}
                Teu Ensino Superior
              </span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A nossa plataforma dá-te acesso a ferramentas e informações essenciais para a tua
              jornada académica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                  onClick={feature.action}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                        {feature.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span>Ver mais</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>





      {/* Coming Soon Section */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/10"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      <div className="text-center lg:text-left">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Colónia de Férias AMECC - Cape Town
          </h3>
          <p className="text-blue-100 mb-8 text-lg leading-relaxed">
            Uma experiência única de <span className="font-semibold text-white">5 dias</span> em Cape Town!  
            Descobre a cidade, visita as principais universidades e vive na pele como é ser um estudante
            internacional. Uma oportunidade para explorar, aprender e sonhar com o teu futuro académico
            num dos destinos mais vibrantes do mundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              Brevemente
            </button>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center lg:justify-end">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 max-w-lg w-full">
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/place.jpg"
              alt="Vista de Cape Town"
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Cidade Vibrante</span>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/place2.jpg"
              alt="Visita à universidade"
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Universidades</span>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-lg col-span-2">
            <img
              src="/place3.jpg"
              alt="Experiência de estudante"
              className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Vida Estudantil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* FAQ Section */}
<div className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-200">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Perguntas Frequentes
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Tudo o que precisas de saber antes de começares a tua jornada académica internacional.
      </p>
    </div>

    <div className="space-y-6">
      {/* FAQ Item 1 */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
        >
          <span>O que é a plataforma Trilho Académico?</span>
          <span className={`transform transition-transform ${openFAQ === 1 ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {openFAQ === 1 && (
          <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
            O Trilho Académico é uma plataforma desenvolvida para guiar estudantes moçambicanos que
            desejam estudar no estrangeiro. Ajudamos-te a escolher o país, curso e universidade
            ideais, além de fornecer suporte durante todo o processo.
          </div>
        )}
      </div>

      {/* FAQ Item 2 */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
        >
          <span>Como funciona o teste de orientação vocacional?</span>
          <span className={`transform transition-transform ${openFAQ === 2 ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {openFAQ === 2 && (
          <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
            O teste de orientação vocacional analisa as tuas preferências, habilidades e objetivos
            académicos, sugerindo cursos e países que se alinham ao teu perfil e sonhos.
          </div>
        )}
      </div>

      {/* FAQ Item 3 */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
        >
          <span>Quais são os custos envolvidos?</span>
          <span className={`transform transition-transform ${openFAQ === 3 ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {openFAQ === 3 && (
          <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
            A plataforma Trilho Académico cobra 50MZN por teste normal e 200MZN pelo teste vocacional. No entanto, existem custos
            associados à candidatura em universidades, emissão de vistos, viagens e acomodação, que
            variam conforme o país escolhido.
          </div>
        )}
      </div>

      {/* FAQ Item 4 */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
        >
          <span>A vossa esquipe está pronta para ajudar?</span>
          <span className={`transform transition-transform ${openFAQ === 4 ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {openFAQ === 4 && (
          <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
            Sim! Alguém da nossa equipa está pronto para te ajudar com qualquer dúvida, e pode contactar diretamente diferentes associações e comunidades estudantis de diferentes países. Estamos aqui para ajudar!
          </div>
        )}
      </div>

      {/* FAQ Item 5 */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
        >
          <span>Como fazer para fazer parte da equipa do Trilho Académico?</span>
          <span className={`transform transition-transform ${openFAQ === 5 ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        {openFAQ === 5 && (
          <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
            Bem, somos uma equipa jovem e estamos mais do que felizes por receber ajuda extra. Envie-nos uma mensagem com as suas competências e como pode contribuir para o nosso projeto. Estamos à espera!
          </div>
        )}
      </div>
    </div>
  </div>
   {/* Sponsors & Partners Section */}
<div className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Title */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Nossos Patrocinadores & Parceiros
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Trabalhamos com instituições e organizações que acreditam no poder transformador da educação nacional e internacional.
      </p>
    </div>

    {/* SyncTechX Highlight */}
    <div className="mb-20">
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-[1px] rounded-3xl shadow-xl">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 text-center relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <span className="px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-orange-100 text-orange-700 rounded-full dark:bg-orange-900 dark:text-orange-300 shadow">
              Criador / Desenvolvedor
            </span>
          </div>
          <img
            src="/partners/synctechx.png"
            alt="SyncTechX"
            className="h-20 mx-auto mb-6 object-contain transition-transform duration-300 hover:scale-105"
          />
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-base">
            Uma startup tecnológica moçambicana responsável pelo desenvolvimento desta plataforma
            e de várias outras soluções digitais inovadoras.
          </p>
        </div>
      </div>
    </div>

    {/* Associations Section */}
     <div className="mb-20">
      {/* Associations Section */}
      <h4 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-wide">
        Associações Estudantis
      </h4>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {associations.map((assoc, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center w-full">
              <div className="p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-sm transform hover:-translate-y-1 hover:scale-105">
                <img
                  src={assoc.src}
                  alt={assoc.alt}
                  className="h-20 mx-auto mb-4 object-contain rounded-md"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {assoc.alt}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                  {assoc.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Partners Section */}
      <h4 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 tracking-wide mt-20">
        Parceiros
      </h4>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="pb-10"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={index}>
            <div className="relative group w-full max-w-[180px] mx-auto p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-100 dark:border-gray-700">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-400/20 via-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 animate-pulse"></div>

              <div className="relative z-10 flex items-center justify-center">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="h-16 object-contain grayscale group-hover:grayscale-0 transition duration-300 transform group-hover:scale-110"
                />
              </div>

              {/* Label appears on hover */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-xs text-gray-700 dark:text-gray-300 font-medium transition-all duration-300">
                {partner.alt}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
</div>
</div>
</div>
</div>
    
  );
};

export default Home;
