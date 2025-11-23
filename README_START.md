# Portfolio Website - Getting Started

## Übersicht
Portfolio-Website mit Clean Architecture:
- **Backend:** ASP.NET Core 9, Entity Framework Core, PostgreSQL
- **Frontend:** React (Vite), Bootstrap
- **Architektur:** Domain, Application, Infrastructure, Web

## Voraussetzungen
✅ **.NET 9 SDK** - bereits installiert  
✅ **Docker Desktop** - für PostgreSQL  
✅ **Node.js (LTS)** - für React  

## 🚀 Projekt starten

### 1. Datenbank starten
```powershell
docker-compose up -d
```
Dies startet PostgreSQL auf Port 5432.

### 2. Backend starten
```powershell
dotnet run --project src/MyPortfolio.Web
```
**Swagger UI:** [http://localhost:5298/swagger](http://localhost:5298/swagger)

### 3. Frontend starten
```powershell
cd src/MyPortfolio.Web/ClientApp
npm run dev
```
**Frontend:** [http://localhost:5173](http://localhost:5173)

## 📋 Was ist bereits implementiert?

### ✅ Backend
- Clean Architecture (Domain, Application, Infrastructure, Web)
- Entity Framework Core mit PostgreSQL
- Datenbank-Migrationen angewendet
- Dependency Injection konfiguriert
- Mapster für Object Mapping
- Swagger/OpenAPI Dokumentation
- `Project` Entity und Repository

### ✅ Frontend
- React mit Vite
- Bootstrap installiert
- Grundstruktur erstellt

### 🔜 Nächste Schritte
- API-Endpoints für Projekte erstellen
- Portfolio-Layout im Frontend bauen
- CRUD-Funktionalität implementieren

## 🛠️ Troubleshooting

**Datenbank-Fehler:**
```powershell
docker ps  # Container-Status prüfen
docker-compose logs  # Logs ansehen
```

**Build-Fehler:**
```powershell
dotnet restore
dotnet build
```

**Frontend-Fehler:**
```powershell
cd src/MyPortfolio.Web/ClientApp
npm install
```

## 📁 Projekt-Struktur
```
├── src/
│   ├── MyPortfolio.Domain/          # Entities, Enums
│   ├── MyPortfolio.Application/     # DTOs, Interfaces, Mapping
│   ├── MyPortfolio.Infrastructure/  # DbContext, Repositories
│   └── MyPortfolio.Web/             # API, Program.cs
│       └── ClientApp/               # React Frontend
├── docker-compose.yml
└── MyPortfolio.sln
```
