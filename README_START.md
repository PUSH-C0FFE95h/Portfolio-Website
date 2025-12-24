# Portfolio Website - Lokale Entwicklung

Vollständige Anleitung zum Starten des Projekts auf deinem lokalen System.

## 📋 Voraussetzungen

Stelle sicher, dass folgende Tools installiert sind:

| Tool | Version | Download |
|------|---------|----------|
| **.NET SDK** | 9.0+ | [dotnet.microsoft.com](https://dotnet.microsoft.com/download) |
| **Node.js** | LTS (20+) | [nodejs.org](https://nodejs.org/) |
| **Docker Desktop** | Latest | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

**Versionen prüfen:**
```bash
dotnet --version    # Sollte 9.x.x anzeigen
node --version      # Sollte 20.x.x+ anzeigen
npm --version       # Sollte mit Node.js mitgeliefert werden
docker --version    # Sollte installiert sein
```

## 🚀 Erstmaliges Setup

### 1. Repository klonen
```bash
git clone <repository-url>
cd Portfolio-Website
```

### 2. Datenbank starten
```bash
# Docker Desktop starten (GUI)
# Dann PostgreSQL Container starten:
docker-compose up -d
```

**Überprüfen:**
```bash
docker ps
# Sollte "myportfolio_db" Container anzeigen
```

### 3. Datenbank-Migrationen anwenden
```bash
dotnet ef database update --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
```

**Falls `dotnet ef` nicht gefunden wird:**
```bash
dotnet tool install --global dotnet-ef
```

### 4. Backend Dependencies installieren
```bash
dotnet restore
```

### 5. Frontend Dependencies installieren
```bash
cd src/MyPortfolio.Web/ClientApp
npm install
cd ../../..
```

## ▶️ Projekt starten

### Option A: Separate Terminals (empfohlen für Entwicklung)

**Terminal 1 - Backend:**
```bash
dotnet run --project src/MyPortfolio.Web
```
✅ Backend läuft auf: http://localhost:5298  
✅ Swagger UI: http://localhost:5298/swagger

**Terminal 2 - Frontend:**
```bash
cd src/MyPortfolio.Web/ClientApp
npm run dev
```
✅ Frontend läuft auf: http://localhost:5173

### Option B: PowerShell (beide gleichzeitig)

```powershell
# Backend im Hintergrund
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; dotnet run --project src/MyPortfolio.Web"

# Frontend im Hintergrund  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD/src/MyPortfolio.Web/ClientApp'; npm run dev"
```

## 🛑 Projekt stoppen

**Backend:** `Ctrl+C` im Terminal

**Frontend:** `Ctrl+C` im Terminal

**Datenbank:**
```bash
docker-compose stop
```

**Alles komplett herunterfahren (inkl. Volumes löschen):**
```bash
docker-compose down -v
```

## 🔧 Häufige Entwicklungs-Befehle

### Backend

**Build:**
```bash
dotnet build
```

**Tests ausführen:**
```bash
dotnet test
```

**Neue Migration erstellen:**
```bash
dotnet ef migrations add <MigrationName> --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
```

**Migration entfernen (letzte):**
```bash
dotnet ef migrations remove --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
```

**Datenbank zurücksetzen:**
```bash
dotnet ef database drop --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
dotnet ef database update --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
```

### Frontend

**Entwicklung starten:**
```bash
cd src/MyPortfolio.Web/ClientApp
npm run dev
```

**Production Build:**
```bash
npm run build
```

**Build lokal testen:**
```bash
npm run preview
```

**Dependencies aktualisieren:**
```bash
npm update
```

### Datenbank

**Container-Status:**
```bash
docker ps
```

**Container-Logs:**
```bash
docker-compose logs
docker-compose logs -f  # Follow mode
```

**In PostgreSQL einloggen:**
```bash
docker exec -it myportfolio_db psql -U postgres -d MyPortfolioDb
```

**PostgreSQL Befehle:**
```sql
\dt              -- Tabellen anzeigen
\d Projects      -- Schema der Projects-Tabelle
SELECT * FROM "Projects";
\q               -- Beenden
```

## 🐛 Troubleshooting

### Problem: "dotnet: command not found"
**Lösung:** .NET SDK installieren von [dotnet.microsoft.com](https://dotnet.microsoft.com/download)

### Problem: "npm: command not found"
**Lösung:** Node.js installieren von [nodejs.org](https://nodejs.org/)

### Problem: Docker Container startet nicht
**Lösung:**
```bash
# Docker Desktop starten
# Logs prüfen:
docker-compose logs

# Container neu erstellen:
docker-compose down -v
docker-compose up -d
```

### Problem: Port bereits belegt (5298 oder 5173)
**Lösung Option 1 - Port ändern:**

**Backend (launchSettings.json):**
```json
"applicationUrl": "http://localhost:5299"
```

**Frontend (vite.config.js):**
```js
server: { port: 5174 }
```

**Lösung Option 2 - Prozess beenden:**
```powershell
# Windows
netstat -ano | findstr :5298
taskkill /PID <PID> /F
```

### Problem: Datenbank-Verbindungsfehler
**Lösung:**
```bash
# Container läuft?
docker ps

# Falls nicht:
docker-compose up -d

# Connection String prüfen (appsettings.json):
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=MyPortfolioDb;Username=postgres;Password=postgres"
}
```

### Problem: Migration-Fehler
**Lösung:**
```bash
# Datenbank zurücksetzen
docker-compose down -v
docker-compose up -d

# Migrations neu anwenden
dotnet ef database update --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
```

### Problem: Frontend Build-Fehler
**Lösung:**
```bash
cd src/MyPortfolio.Web/ClientApp

# node_modules löschen und neu installieren
rm -rf node_modules
rm package-lock.json
npm install
```

### Problem: "Package not found" im NuGet
**Lösung:**
```bash
# NuGet Cache löschen
dotnet nuget locals all --clear

# Restore
dotnet restore
```

## 📊 Entwicklungs-Workflow

### Neue Feature implementieren

1. **Backend:**
   ```bash
   # 1. Entity in Domain erstellen
   # 2. DTO in Application erstellen
   # 3. Repository Interface in Application erstellen
   # 4. Repository in Infrastructure implementieren
   # 5. Migration erstellen:
   dotnet ef migrations add AddNewEntity --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
   
   # 6. Migration anwenden:
   dotnet ef database update --project src/MyPortfolio.Infrastructure --startup-project src/MyPortfolio.Web
   ```

2. **Frontend:**
   ```bash
   cd src/MyPortfolio.Web/ClientApp
   
   # 1. Component erstellen
   # 2. Service für API-Aufrufe erstellen
   # 3. Testen im Browser
   ```

## 🌐 URLs

| Service | URL | Beschreibung |
|---------|-----|--------------|
| **Backend API** | http://localhost:5298 | ASP.NET Core API |
| **Swagger UI** | http://localhost:5298/swagger | API-Dokumentation |
| **Frontend** | http://localhost:5173 | React App |
| **PostgreSQL** | localhost:5432 | Datenbank |

## 📚 Weitere Dokumentation

- **[README.md](../README.md)** - Architektur & Projekt-Übersicht
- **[Frontend README](src/MyPortfolio.Web/ClientApp/README.md)** - React Development Guide

## ✅ Setup-Checkliste

- [ ] .NET SDK installiert (`dotnet --version`)
- [ ] Node.js installiert (`node --version`)
- [ ] Docker Desktop installiert und gestartet
- [ ] Repository geklont
- [ ] `docker-compose up -d` ausgeführt
- [ ] Database Migrations angewendet
- [ ] `dotnet restore` ausgeführt
- [ ] `npm install` im ClientApp ausgeführt
- [ ] Backend läuft (http://localhost:5298/swagger)
- [ ] Frontend läuft (http://localhost:5173)

**Alles grün? Dann kann's losgehen! 🚀**
