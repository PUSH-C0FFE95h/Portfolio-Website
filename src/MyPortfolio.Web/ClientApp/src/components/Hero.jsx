import { ChatInterface } from './ChatInterface';

export const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hallo, ich bin ein Developer
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            Spezialisiert auf Full-Stack Development & KI-Integration
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Starte eine Unterhaltung mit meinem KI-Assistenten 👇
          </p>
        </div>

        {/* Chat Interface */}
        <ChatInterface />

        {/* Scroll Indicator */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToAbout}
            className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="text-sm">Scroll for more</span>
            <svg 
              className="w-6 h-6 animate-bounce group-hover:text-blue-400 transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
