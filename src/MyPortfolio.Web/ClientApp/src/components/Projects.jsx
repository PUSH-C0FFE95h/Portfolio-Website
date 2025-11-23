export const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "KI-Portfolio mit Chatbot",
      description: "Moderne Portfolio-Website mit integriertem KI-Chatbot basierend auf RAG und Open Weights Modellen.",
      technologies: ["React", "Tailwind CSS", "ASP.NET Core", "PostgreSQL", "RAG"],
      image: "🤖",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-Stack E-Commerce Lösung mit Zahlungsintegration und Admin-Dashboard.",
      technologies: ["React", "ASP.NET Core", "PostgreSQL", "Stripe"],
      image: "🛒",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Kollaborative Task-Management-Anwendung mit Echtzeit-Updates.",
      technologies: ["React", "SignalR", "Entity Framework", "PostgreSQL"],
      image: "✅",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projekte
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Eine Auswahl meiner aktuellen und vergangenen Projekte
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => (
  <div className={`backdrop-blur-lg bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 ${
    project.featured ? 'md:col-span-2 lg:col-span-1' : ''
  }`}>
    {/* Project Image/Icon */}
    <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-8xl">
      {project.image}
    </div>

    {/* Project Content */}
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
      <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <a
          href={project.liveUrl}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-center"
        >
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          GitHub
        </a>
      </div>
    </div>

    {project.featured && (
      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
        Featured
      </div>
    )}
  </div>
);
