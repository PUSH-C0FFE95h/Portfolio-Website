# Portfolio Website - Frontend

React Frontend mit Vite und Bootstrap.

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

## 📁 Struktur

```
ClientApp/
├── public/              # Statische Dateien
├── src/
│   ├── assets/         # Bilder, Icons, etc.
│   ├── components/     # React Components
│   ├── pages/          # Page Components
│   ├── styles/         # CSS/SCSS Dateien
│   ├── services/       # API Services
│   ├── App.jsx         # Root Component
│   └── main.jsx        # Entry Point
├── index.html
├── package.json
└── vite.config.js
```

## 🧩 Häufige Anwendungsfälle

### 1. Neuen Component erstellen

**Beispiel: ProjectCard Component**

```jsx
// src/components/ProjectCard.jsx
import React from 'react';

export const ProjectCard = ({ project }) => {
  return (
    <div className="card h-100">
      <img 
        src={project.imageUrl} 
        className="card-img-top" 
        alt={project.title} 
      />
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <div className="d-flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <span key={index} className="badge bg-primary">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <a href={project.projectUrl} className="btn btn-primary btn-sm">
          Live Demo
        </a>
        <a href={project.gitHubUrl} className="btn btn-outline-secondary btn-sm ms-2">
          GitHub
        </a>
      </div>
    </div>
  );
};
```

**Verwendung:**
```jsx
import { ProjectCard } from './components/ProjectCard';

function App() {
  return (
    <div className="container">
      <ProjectCard project={projectData} />
    </div>
  );
}
```

### 2. API-Aufruf mit Fetch

**Beispiel: API Service**

```jsx
// src/services/api.js
const API_BASE_URL = 'http://localhost:5298/api';

export const projectService = {
  // Alle Projekte abrufen
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  // Einzelnes Projekt abrufen
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },

  // Neues Projekt erstellen
  async create(project) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    if (!response.ok) throw new Error('Failed to create project');
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
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner-border">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row g-4">
      {projects.map(project => (
        <div key={project.id} className="col-md-4">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};
```

### 3. Bootstrap Integration

**CSS importieren:**
```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Bootstrap Components verwenden:**
```jsx
// Navbar Beispiel
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Portfolio</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects">Projects</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
```

### 4. Routing mit React Router (optional)

**Installation:**
```bash
npm install react-router-dom
```

**Setup:**
```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 5. Formular-Handling

**Beispiel: Contact Form**
```jsx
import { useState } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          className="form-control"
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
};
```

### 6. Responsive Layout

**Beispiel: Projects Grid**
```jsx
export const ProjectsGrid = ({ projects }) => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">My Projects</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map(project => (
          <div key={project.id} className="col">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 💡 Best Practices

1. **Component-Organisation:** Kleine, wiederverwendbare Components
2. **State Management:** `useState` für lokalen State, Context API für globalen State
3. **API Calls:** Zentralisiert in `services/` Ordner
4. **Error Handling:** Try-catch für async Operationen
5. **Loading States:** Spinner für bessere UX
6. **Responsive Design:** Bootstrap Grid System nutzen

## 🔧 Vite Konfiguration

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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

## 📦 Wichtige NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx"
  }
}
```

## 🌐 Deployment

**Build für Production:**
```bash
npm run build
```

Die Build-Dateien werden in `dist/` erstellt und können auf jedem Static Hosting Service deployed werden.
