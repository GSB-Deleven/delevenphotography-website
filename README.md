# Deleven Photography – Website

Diese Anleitung ist für dich (David), falls du in einem Jahr oder in fünf Jahren
etwas an der Seite ändern willst und dich nicht mehr an alle Details erinnerst.
Keine Vorkenntnisse nötig – lies einfach den Abschnitt, der zu deinem Vorhaben passt.

---

## 1. Was ist das hier überhaupt?

Die Seite lief früher bei Hostinger (kostenpflichtig, ~10 CHF/Monat) mit einem
Baukasten (Astro/Vue). Sie wurde 1:1 als statische Kopie heruntergeladen und läuft
jetzt **kostenlos auf GitHub Pages**, unter derselben Domain `delevenphotography.com`.

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

**Wichtig zu neuen Fotos:** Die bestehenden Bilder liegen in
`assets.zyrosite.com/cdn-cgi/image/...` mit kryptischen, automatisch generierten
Ordnernamen (Grösse, Zuschnitt etc.) – das war der alte Bilder-Dienst des
Baukastens und ist **nicht** dafür gedacht, dass du dort von Hand neue Bilder
reinlegst. Für **neue** Fotos: leg einen eigenen Ordner an (z.B. `eigene-bilder/`),
leg dort dein Foto ab, und verlinke es an der gewünschten Stelle im HTML mit
`<img src="eigene-bilder/dateiname.jpg">`. Wenn du unsicher bist, frag Claude –
sag einfach welches Bild wo ausgetauscht werden soll.

---

## 4. NICHT ANFASSEN – drei Stellen, die extra repariert wurden

Die Original-Seite nutzte Javascript für ein paar Effekte. Beim Export ging
dieses Javascript verloren, darum wurden drei gezielte Reparaturen eingebaut.
Wenn diese drei Dinge aus Versehen gelöscht werden, sehen Teile der Seite
kaputt aus (z.B. unsichtbare Bilder) oder Funktionen hören auf zu arbeiten:

1. **`_astro-1737562879021/_slug_.5LXp_zWt.css`** – ganz am Ende der Datei steht
   ein Block mit `/* CUSTOM OVERRIDE ... */`. Der sorgt dafür, dass Bilder/Texte
   sichtbar sind (ohne ihn: unsichtbare Bilder auf mehreren Seiten).
2. **`_astro-1737562879021/site-fixes.js`** – eigenes kleines Script, macht das
   mobile Hamburger-Menü klickbar. Wird in jeder HTML-Datei ganz am Ende
   eingebunden (`<script src="_astro-1737562879021/site-fixes.js" ...>`).
3. **`anfrage.html`** – das Kontaktformular. Siehe Abschnitt 5 unten, dort NICHT
   die `name=`- oder `action=`-Attribute der Eingabefelder entfernen.

Wenn du an diesen drei Dateien allgemein etwas änderst (z.B. Text im Formular),
ist das kein Problem – lösch einfach nicht diese speziellen Zeilen/Blöcke.

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

*(Wird ausgefüllt, sobald wir die Domain umstellen – Platzhalter für später.)*

- GitHub Pages stellt automatisch und kostenlos ein HTTPS-Zertifikat aus,
  sobald die DNS-Einträge korrekt auf GitHub zeigen.
- Falls Cloudflare vor der Domain hängt: DNS-Einträge dort auf "DNS only"
  (graue Wolke) stellen, dann übernimmt GitHub das Zertifikat selbst –
  einfachste Variante.

---

## 7. Sicherheit – was NIE in dieses Repo gehört

- Keine Passwörter, API-Keys, Zugangsdaten – auch nicht "nur zum Testen".
- Keine privaten Kundendaten (Adressen, Telefonnummern von Kunden etc.).
- Dieses Repo ist **öffentlich** (Voraussetzung für kostenloses GitHub Pages
  Hosting) – alles darin kann jeder im Internet sehen.

---

## 8. Kurz-Übersicht: Was wurde am Original geändert?

| Was | Warum |
|---|---|
| CSS-Override am Dateiende angehängt | Bilder/Texte waren unsichtbar (fehlendes Animations-JS) |
| `anfrage.html`: Formularfelder bekamen `name=`, Formular bekam `action=` zu FormSubmit.co | Formular hat vorher gar keine Daten verschickt |
| `site-fixes.js` neu, in jeder Seite eingebunden | Mobiles Menü liess sich nicht öffnen |
| Alle Seiten von `delevenphotography.com/` ins Haupt­verzeichnis verschoben, Pfade angepasst | GitHub Pages braucht `index.html` im Root, damit die Domain direkt darauf zeigt |
