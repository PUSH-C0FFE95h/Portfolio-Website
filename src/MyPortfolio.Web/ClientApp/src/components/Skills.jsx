export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "JavaScript/TypeScript", level: 88 },
        { name: "Vite", level: 80 }
      ]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        { name: "ASP.NET Core", level: 85 },
        { name: "Entity Framework", level: 82 },
        { name: "PostgreSQL", level: 80 },
        { name: "RESTful APIs", level: 88 }
      ]
    },
    {
      title: "KI & Data",
      icon: "🤖",
      skills: [
        { name: "RAG Systems", level: 75 },
        { name: "Open Weights Models", level: 70 },
        { name: "Vector Databases", level: 72 },
        { name: "Prompt Engineering", level: 80 }
      ]
    },
    {
      title: "DevOps & Tools",
      icon: "🛠️",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 75 },
        { name: "CI/CD", level: 70 },
        { name: "IONOS Hosting", level: 65 }
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center bg-gradient-to-br from-slate-900 to-purple-900/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Technologien
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mein Tech Stack für moderne Web- und KI-Anwendungen
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCategory = ({ category }) => (
  <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
    <div className="text-4xl mb-4">{category.icon}</div>
    <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
    <div className="space-y-3">
      {category.skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} />
      ))}
    </div>
  </div>
);

const SkillBar = ({ skill }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-300">{skill.name}</span>
      <span className="text-sm text-gray-400">{skill.level}%</span>
    </div>
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
  </div>
);
