export const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Avatar Side */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for profile image */}
                  <div className="text-8xl">👨‍💻</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Über mich
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Ich bin ein leidenschaftlicher <span className="text-blue-400 font-semibold">Full-Stack Developer</span> mit 
                Fokus auf moderne Web-Technologien und KI-Integration.
              </p>
              
              <p>
                Meine Expertise liegt in der Entwicklung von <span className="text-purple-400 font-semibold">skalierbaren 
                Webanwendungen</span> mit React, ASP.NET Core und PostgreSQL. Besonders interessiert mich die 
                Integration von KI-Technologien wie RAG-Systeme und Open Weights Modelle.
              </p>
              
              <p>
                Ich liebe es, innovative Lösungen zu entwickeln, die echten Mehrwert bieten und 
                benutzerfreundlich sind.
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Highlight number="3+" label="Jahre Erfahrung" />
              <Highlight number="15+" label="Projekte" />
              <Highlight number="10+" label="Technologien" />
              <Highlight number="100%" label="Leidenschaft" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Highlight = ({ number, label }) => (
  <div className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {number}
    </div>
    <div className="text-sm text-gray-400 mt-1">{label}</div>
  </div>
);
