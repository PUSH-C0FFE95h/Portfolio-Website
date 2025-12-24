# Portfolio Website - Frontend

React Frontend mit Vite und **Tailwind CSS** 🎨

## 🚀 Schnellstart

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Build lokal testen
npm run preview
```

**Development URL:** http://localhost:5173

## 📦 Tech Stack

- ⚡ **Vite** - Next Generation Frontend Tooling
- ⚛️ **React 19** - UI Library
- 🎨 **Tailwind CSS** - Utility-First CSS Framework
- 📡 **Proxy Setup** - API calls zu Backend (Port 5298)

## 🎨 Tailwind CSS

### Setup

Tailwind ist bereits konfiguriert:
- [tailwind.config.js](file:///h:/Development/Portfolio-Website/src/MyPortfolio.Web/ClientApp/tailwind.config.js) - Content paths und Theme
- [postcss.config.js](file:///h:/Development/Portfolio-Website/src/MyPortfolio.Web/ClientApp/postcss.config.js) - PostCSS mit Tailwind & Autoprefixer

### Verwendung

```jsx
// Utility Classes direkt in JSX verwenden
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// Responsive Design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid Items */}
</div>

// Custom Animations (definiert in tailwind.config.js)
<img className="animate-spin-slow" src={logo} />
```

## 🧩 Beispiel: Component mit Tailwind

**ProjectCard Component:**

```jsx
// src/components/ProjectCard.jsx
export const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={project.imageUrl} 
        className="w-full h-48 object-cover" 
        alt={project.title} 
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        
        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <a 
            href={project.projectUrl}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Live Demo
          </a>
          <a 
            href={project.gitHubUrl}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};
```

## 📡 API Integration

**API Service mit Fetch:**

```jsx
// src/services/api.js
const API_BASE_URL = '/api'; // Proxy zu localhost:5298

export const projectService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },
  
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  }
};
```

**Verwendung in Component:**

```jsx
import { useState, useEffect } from 'react';
import { projectService } from '../services/api';

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getAll()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

## 💡 Tailwind Best Practices

1. **Utility-First** - Nutze Tailwind utilities statt custom CSS
2. **Responsive Design** - Nutze `sm:`, `md:`, `lg:`, `xl:` prefixes
3. **Dark Mode** - Nutze `dark:` prefix für dark mode styles
4. **Custom Config** - Erweitere `tailwind.config.js` für custom values
5. **Component Extraction** - Erstelle React Components für wiederverwendbare Patterns

## 🔧 Vite Konfiguration

```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5298',
        changeOrigin: true
      }
    }
  }
})
```

## 📚 Nützliche Ressourcen

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Tailwind Play](https://play.tailwindcss.com/) - Online Playground
- [React Docs](https://react.dev)
- [Vite Docs](https://vite.dev)
