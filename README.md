# Deleven Photography – Website

Diese Anleitung ist für dich (David), falls du in einem Jahr oder in fünf Jahren
etwas an der Seite ändern willst und dich nicht mehr an alle Details erinnerst.
Keine Vorkenntnisse nötig – lies einfach den Abschnitt, der zu deinem Vorhaben passt.

---

## 1. Was ist das hier überhaupt?

Die Seite lief früher bei einem kostenpflichtigen Baukasten-Anbieter (~10 CHF/Monat).
Sie wurde als reine statische Website (HTML/CSS/Bilder, ohne Baukasten im Hintergrund)
neu aufgesetzt und läuft jetzt **kostenlos auf GitHub Pages**, unter derselben Domain
`delevenphotography.com`.

- **Kein Login, keine Datenbank, kein Server** – nur HTML/CSS/Bilder-Dateien.
- **GitHub Pages** liefert diese Dateien einfach so aus, wie sie im Repo liegen.
- Jede Änderung, die du im Repo speicherst ("committen"), erscheint automatisch
  (meist innerhalb 1–2 Minuten) live auf der echten Seite.

---

## 2. Kleine Text-Änderung machen (der einfache Weg, kein Programm nötig)

Beispiel: Ein Preis in den FAQ ändern, einen Tippfehler korrigieren.

1. Geh auf github.com, öffne dieses Repo.
2. Klicke die passende Datei an (z.B. `uber-mich-und-haufige-fragen.html`).
3. Klicke oben rechts auf das **Stift-Symbol** ("Edit this file").
4. **Achtung:** Der Text steckt mitten in viel HTML-Code. Nutze `Cmd+F` im
   Browser, um deinen Text zu finden (z.B. "180.- CHF"), und ändere nur den
   sichtbaren Text – lass alle `<...>`-Klammern und Anführungszeichen genau so
   stehen, wie sie sind.
5. Unten auf **"Commit changes..."** klicken, kurze Beschreibung eintippen
   (z.B. "Preis angepasst"), dann **"Commit changes"** bestätigen.
6. Fertig. Nach ca. 1–2 Minuten ist es live. Prüfen kannst du das im Tab
   **"Actions"** oben im Repo – ein grüner Haken heisst "live".

---

## 3. Grössere Änderung / neue Fotos einbauen (lokal, mit Werkzeug)

Für alles, was mehr als ein paar Wörter ist, lohnt sich lokales Arbeiten
(z.B. mit Claude Code oder VS Code):

```bash
git clone https://github.com/DEIN-USERNAME/DEIN-REPO.git
cd DEIN-REPO
# Änderungen machen ...
git add -A
git commit -m "Kurze Beschreibung was geändert wurde"
git push
```

Danach wieder 1–2 Minuten warten, dann ist es live.

**Wichtig zu neuen Fotos:** Die bestehenden Bilder liegen im Ordner `media/` mit
kryptischen, automatisch generierten Dateinamen (Grösse, Zuschnitt etc.) – dieser
Ordner ist **nicht** dafür gedacht, dass du dort von Hand neue Bilder reinlegst.
Für **neue** Fotos: leg einen eigenen Ordner an (z.B. `eigene-bilder/`), leg dort
dein Foto ab, und verlinke es an der gewünschten Stelle im HTML mit
`<img src="eigene-bilder/dateiname.jpg">`. Wenn du unsicher bist, frag Claude –
sag einfach welches Bild wo ausgetauscht werden soll.

---

## 4. NICHT ANFASSEN – ein paar Stellen, die extra repariert wurden

Ein paar kleine Effekte/Funktionen der alten Seite hingen an Javascript, das beim
Neuaufbau als reine statische Seite nicht mehr dabei war. Dafür gibt es gezielte
Reparaturen. Wenn diese aus Versehen gelöscht werden, sehen Teile der Seite kaputt
aus (z.B. unsichtbare Bilder) oder Funktionen hören auf zu arbeiten:

1. **`assets/_slug_.5LXp_zWt.css`** – ganz am Ende der Datei steht ein Block mit
   `/* CUSTOM OVERRIDE ... */`. Der sorgt dafür, dass Bilder/Texte sichtbar sind
   (ohne ihn: unsichtbare Bilder auf mehreren Seiten).
2. **`assets/site-fixes.js`** – eigenes kleines Script, macht das mobile
   Hamburger-Menü klickbar. Wird in jeder HTML-Datei ganz am Ende eingebunden
   (`<script src="assets/site-fixes.js" ...>`).
3. **`anfrage.html`** – das Kontaktformular. Siehe Abschnitt 5 unten, dort NICHT
   die `name=`- oder `action=`-Attribute der Eingabefelder entfernen.
4. In jeder Seite gibt es 3 Telefon-Icons (Menü x2, Fusszeile) mit je einer
   eindeutigen `clip-path`-ID (`clip0_22_491-1`, `-2`, `-3`). Diese IDs müssen
   eindeutig bleiben, sonst wird eines der Icons in Safari/iPhone unsichtbar
   (Chrome/Desktop zeigt den Fehler nicht, iPhone-Safari schon).

Wenn du an diesen Dateien allgemein etwas änderst (z.B. Text im Formular), ist das
kein Problem – lösch einfach nicht diese speziellen Zeilen/Blöcke.

---

## 5. Wie funktioniert das Kontaktformular?

Die Seite hat keinen eigenen Server, der E-Mails verschicken kann. Deshalb läuft
das Formular über den kostenlosen Dienst **FormSubmit.co**:

- Jemand füllt das Formular auf `anfrage.html` aus und klickt "Abschicken".
- FormSubmit.co nimmt die Daten entgegen und leitet sie per E-Mail an
  `info@delevenphotography.com` weiter.
- **Einmalig wichtig:** Beim allerersten Formular-Absenden (am besten testest du
  das selbst gleich nach dem Go-Live) schickt FormSubmit eine
  Bestätigungs-E-Mail an `info@delevenphotography.com`. Erst wenn du dort auf
  den Aktivierungslink klickst, werden **weitere** Anfragen zugestellt. Ohne
  diesen einen Klick gehen Anfragen ins Leere!
- Es gibt kein Login/Dashboard bei FormSubmit – die Anfragen kommen einfach als
  normale E-Mails in dein Postfach.
- Kein Abo, keine Kosten (Free-Tier reicht für ein Kontaktformular locker).

---

## 6. Domain & Cloudflare (DNS)

So ist es aktuell eingerichtet:

- Die Domain `delevenphotography.com` läuft über **Cloudflare** mit
  **aktiviertem Proxy** (orange Wolke). Das erkennt man daran, dass die
  DNS-Einträge auf Cloudflare-IPs zeigen, nicht direkt auf GitHub.
- Cloudflare stellt dabei **selbst** das HTTPS-Zertifikat für die Besucher
  aus – die Seite ist also verschlüsselt erreichbar, auch ohne dass GitHub
  sein eigenes Zertifikat ausstellt.
- Deshalb bleibt in **Settings → Pages** die Checkbox **"Enforce HTTPS"**
  bei GitHub dauerhaft ausgegraut ("DNS not properly configured to support
  HTTPS") – das ist normal bei dieser Kombination (Cloudflare-Proxy blockiert
  GitHubs eigene Zertifikats-Validierung) und **kein Fehler**, den man beheben
  muss. Die Seite ist trotzdem korrekt verschlüsselt.
- In Cloudflare unter **SSL/TLS → Overview** sollte der Modus auf **"Full"**
  stehen (nicht "Flexible") – das verschlüsselt zusätzlich die Strecke
  zwischen Cloudflare und GitHub.
- Falls du Cloudflare mal ganz rauslassen willst: DNS-Einträge dort auf
  "DNS only" (graue Wolke) umstellen, dann übernimmt GitHub selbst das
  Zertifikat, und "Enforce HTTPS" wird nach etwas Wartezeit klickbar. Nicht
  nötig, nur eine Option.

---

## 7. Sicherheit – was NIE in dieses Repo gehört

- Keine Passwörter, API-Keys, Zugangsdaten – auch nicht "nur zum Testen".
- Keine privaten Kundendaten (Adressen, Telefonnummern von Kunden etc.).
- Dieses Repo ist **öffentlich** (Voraussetzung für kostenloses GitHub Pages
  Hosting) – alles darin kann jeder im Internet sehen.

---

## 8. Impressum-Seite

`impressum.html` enthält Kontaktangaben, Haftungsausschluss, Urheberrecht und einen
kurzen Datenschutz-Hinweis (v.a. zum Kontaktformular/FormSubmit). Verlinkt ist sie
klein und unauffällig unten in der Fusszeile jeder Seite. Änderungen daran gehen
genau gleich wie bei jeder anderen Seite (Abschnitt 2 oder 3).

---

## 9. Google & Link-Vorschau (SEO)

Unsichtbar für Besucher, aber wichtig für Google und für geteilte Links:

- **Bildbeschreibungen (`alt="..."`)**: Jedes Foto hat eine kurze Beschreibung
  (z.B. "Brautpaar küsst sich vor Schloss Waldegg – Hochzeit von Romana & Remo").
  Google-Bildersuche liest diese Texte. Wenn du ein neues Foto einbaust, gib ihm
  auch so eine Beschreibung.
- **`sitemap.xml`**: Liste aller Seiten für Google. Wenn du eine neue Seite
  anlegst (z.B. eine neue Hochzeit), füge dort eine Zeile nach dem gleichen
  Muster hinzu.
- **Ordner `og/`**: Vorschaubilder (1200×630), die erscheinen, wenn jemand einen
  Link zu deiner Seite in WhatsApp, Facebook usw. teilt. Pro Seite eines, im
  HTML-Kopf verlinkt über `og:image`.
- **Startseite, Block `application/ld+json`**: Firmendaten (Name, Adresse,
  Telefon) in einer Form, die Google für die lokale Suche versteht. Ändert sich
  Adresse oder Telefonnummer, hier auch anpassen.
- **Seiten-Adressen**: Google kennt deine Seiten ohne `.html` (z.B.
  `delevenphotography.com/galerie`). GitHub Pages liefert beide Varianten aus;
  `canonical`, `og:url` und `sitemap.xml` nennen bewusst die Variante ohne `.html`.

---

## 10. Kurz-Übersicht: Was wurde am Original geändert?

| Was | Warum |
|---|---|
| CSS-Override am Dateiende angehängt | Bilder/Texte waren unsichtbar (fehlendes Animations-JS) |
| `anfrage.html`: Formularfelder bekamen `name=`, Formular bekam `action=` zu FormSubmit.co | Formular hat vorher gar keine Daten verschickt |
| `site-fixes.js` neu, in jeder Seite eingebunden | Mobiles Menü liess sich nicht öffnen |
| Alle Seiten ins Haupt­verzeichnis verschoben, Ordner umbenannt (`media/`, `fonts/`, `assets/`), Pfade angepasst | GitHub Pages braucht `index.html` im Root, damit die Domain direkt darauf zeigt |
| Eindeutige `clip-path`-IDs für die Telefon-Icons | Icon war in Safari/iPhone unsichtbar |
| Diverse Tippfehler korrigiert (Gross-/Kleinschreibung, „Telefonnnummer“ etc.) | Textqualität |
| `impressum.html` neu erstellt, in Fusszeile verlinkt | Rechtliche Grundangaben |
| Alle Fotos mit Bildbeschreibung (`alt`) versehen | Waren leer; wichtig für Google-Bildersuche und Barrierefreiheit |
| `sitemap.xml` neu erstellt | `robots.txt` verwies auf eine Sitemap, die es nicht gab |
| Link-Vorschaubilder in `og/`, `og:image` darauf umgestellt | Verwiesen auf eine nicht vorhandene Datei, geteilte Links hatten kein Bild |
| `canonical` absolut statt relativ | Eindeutige Adresse pro Seite für Google |
| Firmendaten (`ld+json`) auf der Startseite | Für die lokale Suche ("Hochzeitsfotograf Solothurn") |
