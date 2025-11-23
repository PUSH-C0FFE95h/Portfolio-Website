# Projekt starten

## Voraussetzungen
Damit das gesamte System läuft, benötigst du folgende Tools:
1.  **Docker Desktop**: Für die PostgreSQL Datenbank.
2.  **Node.js (LTS)**: Für das React Frontend.
3.  **.NET 9 SDK**: Für das Backend (hast du bereits).

## 1. Datenbank starten
Stelle sicher, dass Docker Desktop läuft. Starte dann die Datenbank mit:
```powershell
docker-compose up -d
```
Dies startet einen PostgreSQL Container auf Port 5432.

## 2. Backend starten
Das Backend ist eine ASP.NET Core Web API.
```powershell
dotnet run --project src/MyPortfolio.Web
```
Nach dem Start findest du die API-Dokumentation (Swagger) unter:
👉 [http://localhost:5298/swagger](http://localhost:5298/swagger)

## 3. Frontend starten (noch nicht verfügbar)
*Aktuell fehlt noch Node.js auf deinem System. Sobald du es installiert hast, kann ich das Frontend mit `npm create vite@latest` erstellen.*

## Aktueller Stand (Aufgabenliste)
- [x] **Projekt-Struktur:** Clean Architecture (Domain, Application, Infrastructure, Web) steht.
- [x] **Datenbank:** Entity Framework Core & PostgreSQL sind konfiguriert. Migrations sind erstellt.
- [x] **Application Layer:** DTOs, Interfaces und Mapping (Mapster) sind eingerichtet.
- [x] **Repository:** `ProjectRepository` ist implementiert und registriert.
- [ ] **Frontend:** Wartet auf Node.js Installation.

## Troubleshooting
-   **Datenbank-Fehler:** Wenn beim Starten des Backends Fehler zur Datenbank kommen, prüfe ob der Docker-Container läuft (`docker ps`).
-   **Build-Fehler:** Falls Pakete fehlen, führe `dotnet restore` aus.
