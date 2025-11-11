import { useState, useRef } from "react"; //useffect
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  Home,
  Compass,
  Brain,
  BookOpen,
  FileText,
  Menu,
  X,
  Moon,
  Sun,
  Zap,
  Contact,
  // Play,
  // Pause,
  // Heart,
} from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isBannerVisible, setIsBannerVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.play().catch(() => setIsPlaying(false));
  //   }
  // }, []);

  // const togglePlay = () => {
  //   if (!audioRef.current) return;
  //   isPlaying ? audioRef.current.pause() : audioRef.current.play();
  //   setIsPlaying(!isPlaying);
  // };

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/escolher-teste", label: "Explorar", icon: Compass },
    { path: "/Paralelas", label: "Paralelas", icon: Brain },
    { path: "/legal", label: "Documentação Legal", icon: FileText },
    { path: "/recursos", label: "Recursos", icon: BookOpen },
    { path: "/contact", label: "Contacto", icon: Contact },
  ];

  return (
    <>
      <audio ref={audioRef} src="/helio.mp3" loop />

      {/* NAVBAR */}
      <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        
        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Trilho Académico
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  From Moz to the World
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/25"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:block">{label}</span>
                </Link>
              ))}

              {/* Music Player */}
              {/* <div className="flex flex-col items-center ml-4">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-1">
                  Helio Beatz - Gênio
                </span>
              </div> */}
            </div>

            {/* Theme + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                    location.pathname === path
                      ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Donation Modal (now below navbar) */}
      {isModalOpen && (
        <div className="w-full flex justify-center bg-gray-100 dark:bg-gray-900 py-10 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-white dark:bg-gray-800 w-11/12 md:w-3/4 lg:w-2/3 rounded-2xl shadow-lg relative overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <iframe
              src="https://refres.co/trilho.academico"
              className="w-full h-[600px] rounded-2xl"
              frameBorder="0"
              title="Doação Trilho Académico"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
