# 🚀 Development Cheatsheet

Dieses Dokument dient als zentrale Anlaufstelle für alle wichtigen Befehle rund um das Projekt MyPortfolio. Es umfasst den Startvorgang, Entity Framework, .NET CLI und Docker.

## 🏁 Projekt Starten (Quickstart)

### Voraussetzungen
*   Docker Desktop (laufend)
*   .NET 9 SDK
*   Node.js 20+

### Startvorgang
1.  **Infrastruktur hochfahren:**
    ```bash
    docker-compose up -d
    ```
2.  **Backend starten:**
    ```bash
    dotnet run --project src/MyPortfolio.Web
    ```
3.  **Frontend starten:**
    ```bash
    cd src/MyPortfolio.Web/ClientApp
    npm run dev
    ```

---

## 🗄 Entity Framework Core (EF Core)

Alle EF Core Befehle müssen aus dem Root-Verzeichnis ausgeführt werden.

| Aktion | Befehl | Erklärung |
|:---|:---|:---|
| **Migration erstellen** | `dotnet ef migrations add <Name> --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web` | Erstellt eine neue Migration basierend auf Änderungen am Domain-Modell. |
| **Datenbank updaten** | `dotnet ef database update --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web` | Wendet alle ausstehenden Migrationen auf die Datenbank an. |
| **Migration entfernen** | `dotnet ef migrations remove --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web` | Löscht die letzte (noch nicht angewendete) Migration. |
| **Datenbank droppen** | `dotnet ef database drop --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web` | **Vorsicht!** Löscht die komplette Datenbank. |
| **SQL Script generieren** | `dotnet ef migrations script --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web` | Erstellt ein SQL-Skript für die Migration (gut für Production). |

---

## 💻 .NET CLI

| Aktion | Befehl | Erklärung |
|:---|:---|:---|
| **Dependencies laden** | `dotnet restore` | Lädt fehlende NuGet Pakete herunter. |
| **Kompilieren** | `dotnet build` | Kompiliert das Projekt, ohne es zu starten. |
| **Clean** | `dotnet clean` | Löscht alle Build-Artefakte (`bin`, `obj`). Hilft oft bei seltsamen Fehlern. |
| **Tests ausführen** | `dotnet test` | Führt alle Unit- und Integrationstests aus. |
| **Starten (Backend)** | `dotnet run --project src/MyPortfolio.Web` | Startet die Web API. |
| **Paket hinzufügen** | `dotnet add <ProjektPfad> package <PaketName>` | Installiert ein NuGet Paket in ein bestimmtes Projekt. |

---

## 🐳 Docker & Docker Compose

| Aktion | Befehl | Erklärung |
|:---|:---|:---|
| **Starten** | `docker-compose up -d` | Startet alle Container (DB, MinIO, etc.) im Hintergrund. |
| **Stoppen** | `docker-compose stop` | Stoppt die Container, behält aber den State. |
| **Logs ansehen** | `docker-compose logs -f` | Zeigt Live-Logs aller Container an (`-f` für follow). |
| **Alles löschen** | `docker-compose down -v` | Stoppt & **löscht** Container und Volumes (Datenbank wird resettet!). |
| **Status prüfen** | `docker ps` | Zeigt laufende Container an. |
| **DB Connect** | `docker exec -it myportfolio_db psql -U postgres -d MyPortfolioDb` | Öffnet PostgreSQL CLI im Container. |

---

## 🛠 Frontend (Vite/React)

Ordner: `src/MyPortfolio.Web/ClientApp`

| Aktion | Befehl | Erklärung |
|:---|:---|:---|
| **Starten** | `npm run dev` | Startet den Development Server (Hot Module Replacement). |
| **Installieren** | `npm install` | Installiert Node Dependencies (package.json). |
| **Bauen** | `npm run build` | Erstellt das Production-Bundle im `dist` Ordner. |
| **Vorschau** | `npm run preview` | Startet einen lokalen Server mit dem Production-Build. |
| **Linting** | `npm run lint` | Prüft Code-Qualität mit ESLint. |

---

## 🧠 Backend Patterns & Tech (Kurzreferenz)

### MediatR (CQRS)
Jeder Use Case ist ein Request (`Command` oder `Query`) und hat genau einen `Handler`.

**Command erstellen:**
```csharp
// Application/Commands/DoSomethingCommand.cs
public record DoSomethingCommand(string Input) : IRequest<int>;

public class DoSomethingHandler : IRequestHandler<DoSomethingCommand, int> {
    public async Task<int> Handle(DoSomethingCommand request, CancellationToken ct) {
        // Logic...
        return 1;
    }
}
```

### FluentValidation
Validierung findet automatisch in der Pipeline statt (siehe `ValidationBehavior`).

**Validator erstellen:**
```csharp
public class DoSomethingValidator : AbstractValidator<DoSomethingCommand> {
    public DoSomethingValidator() {
        RuleFor(x => x.Input).NotEmpty().MaximumLength(50);
    }
}
```

### Dapper (High Performance Reads)
Für reine Read-Operationen verwenden wir Dapper direkt auf der `IDbConnection`.

**Dapper nutzen:**
```csharp
public class MyQueryHandler(IDbConnection db) { // Primary Constructor
    public async Task<List<Dto>> Handle(...) {
        return (await db.QueryAsync<Dto>("SELECT * FROM Projects")).ToList();
    }
}
```

### MinIO (Blob Storage)
Verwendung des `BlobStorageService`.

**File Upload:**
```csharp
await _blobService.UploadFileAsync("my-bucket", stream, "image/png");
```

### Hangfire (Background Jobs)
Jobs asynchron im Hintergrund ausführen.

**Job einreihen:**
```csharp
BackgroundJob.Enqueue(() => Console.WriteLine("Fire-and-forget!"));
```

---

## 🎨 Frontend Stack (Kurzreferenz)

### TanStack Query
Daten holen und cachen.

**Query (Daten lesen):**
```javascript
const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: () => fetch('/api/projects').then(res => res.json())
});
```

**Mutation (Daten schreiben):**
```javascript
const mutation = useMutation({
  mutationFn: (newProject) => axios.post('/api/projects', newProject),
  onSuccess: () => queryClient.invalidateQueries(['projects'])
});
```

### shadcn/ui & Tailwind
Komponenten befinden sich in `src/components/ui`.

**Button nutzen:**
```javascript
import { Button } from "@/components/ui/button"

<Button variant="destructive" size="lg">Delete</Button>
```

**Styles mergen (cn utility):**
Nutze `cn()` um Tailwind-Klassen bedingt zusammenzufügen.
```javascript
import { cn } from "@/lib/utils"

<div className={cn("bg-red-500", isActive && "bg-green-500")} />
```

---

## 🔗 Wichtige URLs

*   **Backend API:** <http://localhost:5298>
*   **Swagger Doku:** <http://localhost:5298/swagger>
*   **Hangfire Dashboard:** <http://localhost:5298/hangfire>
*   **Frontend:** <http://localhost:5173>
*   **MinIO Console:** <http://localhost:9001> (Login: minioadmin / minioadmin)
