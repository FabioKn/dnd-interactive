// Klassendefinitionen
class Ort {
    constructor(name, beschreibung) {
        this.name = name;
        this.beschreibung = beschreibung;
        this.npcs = [];
        this.verbindungen = [];
    }

    addNPC(npc) {
        this.npcs.push(npc);
    }

    addVerbindung(ort) {
        this.verbindungen.push(ort);
    }

    besucheOrt() {
        let output = document.getElementById("story-output");
        output.innerHTML = `<p>${this.beschreibung}</p>`;
        this.npcs.forEach(npc => {
            output.innerHTML += `<p>Du siehst ${npc.name}.</p>`;
        });
        this.verbindungen.forEach(verbundenerOrt => {
            output.innerHTML += `<button onclick="reiseZu('${verbundenerOrt.name}')">${verbundenerOrt.name}</button>`;
        });
    }
}

class NPC {
    constructor(name, dialogOptionen) {
        this.name = name;
        this.dialogOptionen = dialogOptionen;
    }

    sprechen() {
        let output = document.getElementById("story-output");
        this.dialogOptionen.forEach(option => {
            output.innerHTML += `<button onclick="${option.action}()">${option.text}</button>`;
        });
    }
}

// Hilfsfunktionen
function würfeln(max) {
    return Math.floor(Math.random() * max) + 1;
}

function initiateTrade() {
    let output = document.getElementById("story-output");
    output.innerHTML += "<p>Du beginnst zu handeln...</p>";
    // Hier könnte eine Logik hinzugefügt werden, um handelbare Gegenstände anzuzeigen
}

function revealSecret() {
    let output = document.getElementById("story-output");
    output.innerHTML += "<p>Der Händler flüstert dir ein Geheimnis zu...</p>";
    // Logik zur Enthüllung von Geheimnissen könnte hier hinzugefügt werden
}

function getCurrentNpc() {
    return new NPC("Händler", [
        { text: "Handeln", action: "initiateTrade" },
        { text: "Nach Gerüchten fragen", action: "revealSecret" }
    ]);
}

function reiseZu(ortName) {
    const ort = alleOrte.find(o => o.name === ortName);
    aktuellerOrt = ort;
    aktuellerOrt.besucheOrt();
}

// Initialisierung der Orte
let alleOrte = initOrte();
let aktuellerOrt = alleOrte[0];

function initOrte() {
    let marktplatz = new Ort("Marktplatz", "Ein lebendiger Ort voller Händler und Abenteurer.");
    let dunkleGasse = new Ort("Dunkle Gasse", "Eine düstere Gasse, die von zwielichtigen Gestalten frequentiert wird.");
    let königspalast = new Ort("Königspalast", "Der prächtige Wohnsitz des Königs und seiner Familie.");

    // Verbindungen zwischen den Orten
    marktplatz.addVerbindung(dunkleGasse);
    dunkleGasse.addVerbindung(königspalast);
    königspalast.addVerbindung(marktplatz);

    // Initialisiere NPCs
    let händler = new NPC("Händler", [
        { text: "Handeln", action: "initiateTrade" },
        { text: "Nach Gerüchten fragen", action: "revealSecret" }
    ]);
    marktplatz.addNPC(händler);

    return [marktplatz, dunkleGasse, königspalast];
}

// Event Listener für das gesamte Dokument
document.addEventListener("DOMContentLoaded", function() {
    aktuellerOrt.besucheOrt();

    document.getElementById("player-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitPlayerAction();
        }
    });

    document.getElementById("submit-action").addEventListener("click", submitPlayerAction);

    function submitPlayerAction() {
        let playerInput = document.getElementById("player-input").value.toLowerCase();
        document.getElementById("player-input").value = "";
        let output = document.getElementById("story-output");
        output.innerHTML = ""; // Leere das Story-Output bei jeder Eingabe

        switch (true) {
            case playerInput.includes("erkunden"):
                erkundeStadt();
                break;
            case playerInput.includes("sprechen"):
                let npc = getCurrentNpc();
                npc.sprechen();
                break;
            case playerInput.includes("handeln"):
                initiateTrade();
                break;
            case playerInput.includes("geheimnis"):
                revealSecret();
                break;
            default:
                output.innerHTML += "<p>Ich verstehe nicht, was du meinst...</p>";
                break;
        }
    }

    function erkundeStadt() {
        let würfelErgebnis = würfeln(20);
        let output = document.getElementById("story-output");
        output.innerHTML = `<p>Würfelergebnis: ${würfelErgebnis}</p>`;
        aktuellerOrt.besucheOrt();

        // Je nach Würfelergebnis, verschiedene Ereignisse
        if (würfelErgebnis <= 6) {
            output.innerHTML += "<p>Es scheint ein ruhiger Tag zu sein, du findest nichts Außergewöhnliches.</p>";
        } else if (würfelErgebnis <= 12) {
            output.innerHTML += "<p>Du hörst Gerüchte über geheime Treffen in der dunklen Gasse.</p>";
            // Hier könnte eine Logik hinzugefügt werden, um den Spieler zur dunklen Gasse zu führen
        } else if (würfelErgebnis <= 18) {
            output.innerHTML += "<p>Ein Bote des Königspalasts sucht nach einem Abenteurer für eine geheime Mission.</p>";
            // Hier könnte eine Logik hinzugefügt werden, um den Spieler zum Königspalast zu führen
        } else {
            output.innerHTML += "<p>Du entdeckst einen verborgenen Hinweis, der dich zur alten Bibliothek führt.</p>";
            // Hier könnte eine Logik hinzugefügt werden, um den Spieler zur alten Bibliothek zu führen
        }
    }
});
