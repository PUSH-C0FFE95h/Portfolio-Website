# Projekt starten

Da Node.js noch fehlt, kannst du aktuell nur das **Backend (API)** starten.

1.  Öffne ein Terminal im Hauptordner `H:\Development\Portfolio-Website`.
2.  Führe folgenden Befehl aus:

```powershell
dotnet run --project src/MyPortfolio.Web
```

Das startet den Webserver. Du solltest dann unter `http://localhost:5xxx/swagger` (der Port wird in der Konsole angezeigt) die Swagger-UI sehen können.

**Hinweis:** Da wir noch keine Datenbank konfiguriert haben, wird noch nicht viel passieren, aber die Basis-API läuft.

Ich mache jetzt weiter mit der Einrichtung der Datenbank und der Domain-Logik.
