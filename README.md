# Portfolio Website

Eine Portfolio-Website mit Clean Architecture, ASP.NET Core 9, PostgreSQL und React.

## 📋 Inhaltsverzeichnis
- [Architektur](#architektur)
- [Projekt-Struktur](#projekt-struktur)
- [Clean Architecture Layers](#clean-architecture-layers)
- [Technologie-Stack](#technologie-stack)
- [Schnellstart](#schnellstart)

## Architektur

Dieses Projekt folgt dem **Clean Architecture** Ansatz:

```
┌─────────────────────────────────────────┐
│           Presentation (Web)            │
│    ┌─────────────────────────────┐     │
│    │      ASP.NET Core API       │     │
│    │      React Frontend         │     │
│    └─────────────────────────────┘     │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Infrastructure Layer            │
│   ┌──────────┐      ┌──────────────┐   │
│   │ Database │      │ Repositories │   │
│   │  (EF)    │      │              │   │
│   └──────────┘      └──────────────┘   │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Application Layer               │
│   ┌──────────┐      ┌──────────────┐   │
│   │   DTOs   │      │  Interfaces  │   │
│   │ Mapping  │      │   Services   │   │
│   └──────────┘      └──────────────┘   │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│           Domain Layer                  │
│        ┌──────────────────┐             │
│        │    Entities      │             │
│        │  Business Logic  │             │
│        └──────────────────┘             │
└─────────────────────────────────────────┘
```

## Projekt-Struktur

```
Portfolio-Website/
├── src/
│   ├── MyPortfolio.Domain/
│   │   └── Entities/
│   │       └── Project.cs
│   │
│   ├── MyPortfolio.Application/
│   │   ├── DTOs/
│   │   │   └── ProjectDto.cs
│   │   ├── Interfaces/
│   │   │   └── IProjectRepository.cs
│   │   └── DependencyInjection.cs
│   │
│   ├── MyPortfolio.Infrastructure/
│   │   ├── Persistence/
│   │   │   └── ApplicationDbContext.cs
│   │   ├── Repositories/
│   │   │   └── ProjectRepository.cs
│   │   └── DependencyInjection.cs
│   │
│   └── MyPortfolio.Web/
│       ├── Program.cs
│       ├── appsettings.json
│       └── ClientApp/          (React Frontend)
│
├── docker-compose.yml
├── README.md
└── README_START.md
```

## Clean Architecture Layers

### 1️⃣ Domain Layer
**Zweck:** Enthält die Geschäftslogik und Domain-Entities.  
**Abhängigkeiten:** Keine (unabhängig von allen anderen Layern)

**Beispiel - Entity:**
```csharp
// src/MyPortfolio.Domain/Entities/Project.cs
namespace MyPortfolio.Domain.Entities;

public class Project
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

### 2️⃣ Application Layer
**Zweck:** Anwendungslogik, DTOs, Interfaces für Infrastructure.  
**Abhängigkeiten:** Domain

**Beispiel - DTO:**
```csharp
// src/MyPortfolio.Application/DTOs/ProjectDto.cs
namespace MyPortfolio.Application.DTOs;

public class ProjectDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
}
```

**Beispiel - Interface:**
```csharp
// src/MyPortfolio.Application/Interfaces/IProjectRepository.cs
namespace MyPortfolio.Application.Interfaces;

public interface IProjectRepository
{
    Task<List<Project>> GetAllAsync();
    Task<Project?> GetByIdAsync(Guid id);
    Task AddAsync(Project project);
}
```

**Beispiel - Dependency Injection:**
```csharp
// src/MyPortfolio.Application/DependencyInjection.cs
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings;
        config.NewConfig<Project, ProjectDto>();
        
        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();
        return services;
    }
}
```

### 3️⃣ Infrastructure Layer
**Zweck:** Implementierung der Interfaces (Datenbank, externe Services).  
**Abhängigkeiten:** Application, Domain

**Beispiel - DbContext:**
```csharp
// src/MyPortfolio.Infrastructure/Persistence/ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options) { }

    public DbSet<Project> Projects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
        });
    }
}
```

**Beispiel - Repository:**
```csharp
// src/MyPortfolio.Infrastructure/Repositories/ProjectRepository.cs
public class ProjectRepository : IProjectRepository
{
    private readonly ApplicationDbContext _context;

    public ProjectRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Project>> GetAllAsync()
    {
        return await _context.Projects.ToListAsync();
    }
}
```

**Beispiel - Dependency Injection:**
```csharp
// src/MyPortfolio.Infrastructure/DependencyInjection.cs
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
            
        services.AddScoped<IProjectRepository, ProjectRepository>();
        return services;
    }
}
```

### 4️⃣ Web/Presentation Layer
**Zweck:** API-Endpoints, Hosting, Frontend.  
**Abhängigkeiten:** Application, Infrastructure

**Beispiel - Program.cs:**
```csharp
// src/MyPortfolio.Web/Program.cs
using MyPortfolio.Application;
using MyPortfolio.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Dependency Injection
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
```

**Beispiel - API Endpoint (zukünftig):**
```csharp
app.MapGet("/api/projects", async (IProjectRepository repo, IMapper mapper) =>
{
    var projects = await repo.GetAllAsync();
    return Results.Ok(mapper.Map<List<ProjectDto>>(projects));
});
```

## Technologie-Stack

### Backend
- **Framework:** ASP.NET Core 9
- **ORM:** Entity Framework Core 9
- **Datenbank:** PostgreSQL 16
- **Mapping:** Mapster
- **API-Dokumentation:** Swagger/OpenAPI

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Bootstrap 5
- **Sprache:** JavaScript

### DevOps
- **Containerisierung:** Docker & Docker Compose
- **Versionskontrolle:** Git

## Schnellstart

**Vollständige Anleitung:** Siehe [README_START.md](./README_START.md)

**Kurzversion:**
```bash
# 1. Datenbank starten
docker-compose up -d

# 2. Backend starten
dotnet run --project src/MyPortfolio.Web

# 3. Frontend starten (neues Terminal)
cd src/MyPortfolio.Web/ClientApp
npm run dev
```

**URLs:**
- Backend API: http://localhost:5298
- Swagger UI: http://localhost:5298/swagger
- Frontend: http://localhost:5173

## Weitere Dokumentation

- **[README_START.md](./README_START.md)** - Komplette Setup-Anleitung
- **[Frontend README](./src/MyPortfolio.Web/ClientApp/README.md)** - React/Vite Entwicklung
