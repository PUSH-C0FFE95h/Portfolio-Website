# Portfolio Website - Clean Architecture Showcase

Eine moderne Full-Stack-Applikation, die **Clean Architecture** Prinzipien mit aktuellen Technologien wie **ASP.NET Core 9**, **React 19**, **TanStack Query** und **shadcn/ui** verbindet.

## 🏗 Architektur-Übersicht (Clean Architecture)

Das Projekt ist in vier strikt getrennte Schichten unterteilt, wobei die Abhängigkeiten immer nach innen (zur Domain) zeigen.

```mermaid
graph TD
    Web[Presentation Layer (Web API + ClientApp)] --> App
    Web --> Inf
    Inf[Infrastructure Layer (DB, Hangfire, MinIO)] --> App
    App[Application Layer (CQRS, Logic)] --> Dom
    Dom[Domain Layer (Entities, Rules)]
```

### 1️⃣ Domain Layer (`MyPortfolio.Domain`)
**Der Kern.** Enthält Unternehmenslogik, Entities und Enums. Keine Abhängigkeiten zu Frameworks oder Datenbanken.
*   **Inhalt:** `Project`, `Customer` Entities.

### 2️⃣ Application Layer (`MyPortfolio.Application`)
**Die Steuerung.** Orchestriert die Anwendungsfälle (Use Cases). Nutzt **CQRS** (Command Query Responsibility Segregation) via **MediatR**.
*   **Pattern:** CQRS (Commands für Writes, Queries für Reads).
*   **Validierung:** **FluentValidation** prüft Inputs (Pipeline Behavior).
*   **Mapping:** **Mapster** für Entity-DTO Konvertierung.

### 3️⃣ Infrastructure Layer (`MyPortfolio.Infrastructure`)
**Die Werkzeuge.** Implementiert Interfaces aus dem Application Layer.
*   **Datenbank:** Entity Framework Core 9 (Write) & **Dapper** (High-Performance Read).
*   **Storage:** **MinIO** (S3-kompatibel) für Datei-Uploads (Blob Storage).
*   **Background Jobs:** **Hangfire** für zeitgesteuerte Aufgaben (z.B. E-Mail Versand).

### 4️⃣ Presentation Layer (`MyPortfolio.Web`)
**Der Einstieg.** Stellt API-Endpunkte und das Frontend bereit.
*   **API:** ASP.NET Core Web API.
*   **Realtime:** **SignalR** (Aktuell deaktiviert, siehe Known Issues).
*   **Frontend:** React (Vite), **Tailwind CSS**, **shadcn/ui**.

---

## 🛠 Verwendete Technologien & Patterns

### Backend
| Technologie | Zweck | Besonderheit |
|:---|:---|:---|
| **ASP.NET Core 9** | Web Framework | Neueste .NET Version |
| **MediatR** | CQRS Pattern | Entkoppelt Commands/Queries von Handlern |
| **FluentValidation** | Validierung | Automatische Validierung in der MediatR-Pipeline |
| **EF Core 9** | ORM (Write) | Code-First Migrationen, PostgreSQL |
| **Dapper** | Micro-ORM (Read) | Schnelle SQL-Queries für "Get"-Operationen |
| **Hangfire** | Job Scheduler | Background Processing (mit PostgreSQL Storage) |
| **MinIO** | Blob Storage | S3-kompatibler lokaler Speicher |
| **SignalR** | Weosckets | Echtzeit-Updates (Push Notifications) |

### Frontend (`/ClientApp`)
| Technologie | Zweck | Besonderheit |
|:---|:---|:---|
| **React 19** | UI Library | Hooks, Functional Components |
| **Vite** | Build Tool | Extrem schneller Dev-Server |
| **TanStack Query** | State Management | Caching, Re-Fetching, Loading-States |
| **shadcn/ui** | UI Komponenten | Basierend auf **Radix UI** & **Tailwind** (Manuell integriert) |
| **Tailwind CSS** | Styling | Utility-First CSS |
| **Axios/Fetch** | HTTP Client | Kommunikation mit Backend API |

---

## 💡 Anwendungsfälle & Code-Beispiele

### 1. Daten abrufen (Query Flow)
**Ziel:** Liste aller Projekte anzeigen.
*   **UI:** `useProjects` Hook (TanStack Query) ruft API.
*   **API:** `ProjectsController` sendet `GetProjectsQuery`.
*   **Application:** `GetProjectsQueryHandler` nutzt Repository/Dapper.

**Code:**
```javascript
// Frontend: useProjects.js
export const useProjects = () => useQuery({ 
  queryKey: ['projects'], 
  queryFn: fetchProjects 
});
```

```csharp
// Backend: Handler
public async Task<List<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken ct) {
    // Repository Zugriff
    return await _context.Projects.ProjectToType<ProjectDto>().ToListAsync(); 
}
```

### 2. Daten anlegen (Command Flow)
**Ziel:** Neues Projekt erstellen.
*   **UI:** Formular sendet Daten via `useCreateProject`.
*   **API:** Controller sendet `CreateProjectCommand`.
*   **Validation:** `ValidationBehavior` prüft Regeln (z.B. "Titel Pflichtfeld").
*   **Application:** Handler speichert Entity, feuert evtl. Domain Events.

**Code:**
```csharp
// Validation
public class CreateProjectCommandValidator : AbstractValidator<CreateProjectCommand> {
    public CreateProjectCommandValidator() {
        RuleFor(v => v.Title).NotEmpty().MaximumLength(200);
    }
}
```

---

## ⚠️ Known Issues

*   **SignalR Build Conflict:** Die aktive Registrierung von `AddSignalRT` in `Program.cs` ist aktuell **auskommentiert**. Es gibt einen Versionskonflikt (CS0433) zwischen dem .NET 9.0 Framework und `Hangfire.AspNetCore`-Abhängigkeiten. Echtzeit-Features sind daher vorübergehend inaktiv.

---

## 🚀 Start-Anleitung

Voraussetzungen: **Docker Desktop**, **.NET 9 SDK**, **Node.js 20+**.

1.  **Infrastruktur starten** (Postgres, MinIO):
    ```bash
    docker-compose up -d
    ```

2.  **Backend starten**:
    ```bash
    dotnet run --project src/MyPortfolio.Web
    # Swagger: http://localhost:5298/swagger
    # Hangfire: http://localhost:5298/hangfire
    ```

3.  **Frontend starten**:
    ```bash
    cd src/MyPortfolio.Web/ClientApp
    npm install
    npm run dev
    # App: http://localhost:5173
    ```
