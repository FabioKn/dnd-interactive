document.addEventListener("DOMContentLoaded", function() {
    let awaitingRoll = false;
    let rollType = null;
    let currentDiscovery = ""; // Aktueller Entdeckungszustand
    let alleOrte = initOrte(); // Initialisiere die Orte
    let aktuellerOrt = alleOrte[0]; // Starte am ersten Ort der Liste

    generateGreeting();

    // Aktiviere Spieleraktionen mit der Enter-Taste
    document.getElementById("player-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitPlayerAction();
        }
    });

    // Reaktion auf Mausklick für die Aktion
    document.getElementById("submit-action").addEventListener("click", submitPlayerAction);

    function submitPlayerAction() {
        playerAction();
        checkGameStatus(); // Diese Funktion muss definiert werden
    }

     // Diese Funktion muss definiert sein oder entfernt werden, wenn sie nicht verwendet wird.
     function checkGameStatus() {
        // Platzhalter für die Spielstatusüberprüfung
    }
});

    function playerAction() {
        var playerInput = document.getElementById("player-input").value.toLowerCase();
        document.getElementById("story-output").innerHTML += "<p>" + playerInput + "</p>";
        document.getElementById("player-input").value = ""; // Eingabefeld leeren


         // Zuordnung der Eingabe zu Funktionen
         switch (true) {
            case playerInput.includes("erkunden"):
                exploreCity();
                break;
            case playerInput.includes("sprechen"):
                initiateNpcDialog();
                break;
            case playerInput.includes("untersuchen"):
                investigateDiscovery();
                break;
            case playerInput.includes("rasten"):
                takeRest();
                break;
            case playerInput.includes("handeln"):
                initiateTrade();
                break;
            case playerInput.includes("eiche"):
                goToOldOak();
                break;
            case playerInput.includes("würfeln"):
                fightGuards();
                break;
            case playerInput.includes("umschauen"):
                lookAround();
                break;
            default:
                document.getElementById("story-output").innerHTML += "<p>Ich verstehe nicht, was du meinst...</p>";
                break;
        }
    }
        // Weitere Aktionen können hier ergänzt werden
    

        function generateGreeting() {
            let playerInfo = JSON.parse(localStorage.getItem('playerInfo')) || {}; // Fallback für playerInfo
            let selectedWeapon = localStorage.getItem('selectedWeapon') || 'unbewaffnet';
            let selectedLocation = localStorage.getItem('selectedLocation') || 'am Anfang';
    
            let storyText = `Hallo, ${playerInfo.name || 'Reisender'}. Sei gegrüßt ${playerInfo.class || 'Abenteurer'} aus dem Volk der ${playerInfo.race || 'Unbekannten'} ausgerüstet mit ${selectedWeapon}. Du befindest dich nun in ${selectedLocation}...`;
            document.getElementById('story-output').innerHTML = storyText;
        }

         // Initialisiere die Orte mit ihren Beschreibungen und NPCs
    function initOrte() {
        let marktplatz = new Ort("Marktplatz", "Ein lebendiger Ort voller Händler und Abenteurer.");
        let dunkleGasse = new Ort("Dunkle Gasse", "Eine düstere Gasse, die von zwielichtigen Gestalten frequentiert wird.");
        let königspalast = new Ort("Königspalast", "Der prächtige Wohnsitz des Königs und seiner Familie.");

        // Initialisiere die NPCs und füge sie den Orten hinzu
        let händler = new NPC("Händler", [
            { text: "Handeln", action: initiateTrade },
            { text: "Nach Gerüchten fragen", action: revealSecret }
        ]);
        marktplatz.addNPC(händler);

        return [marktplatz, dunkleGasse, königspalast];
    }

    function exploreCity() {
        let places = ["Marktplatz", "Dunkle Gasse", "Königspalast"];
        let storyOutput = document.getElementById("story-output");
        let placesHTML = places.map(place => 
            `<button class="explore-place" data-place="${place}">${place}</button>`
        ).join("");

        storyOutput.innerHTML += "<p>Wähle einen Ort aus, den du erkunden möchtest:</p>" + placesHTML;
        addExplorePlaceListeners();
    }

    function addExplorePlaceListeners() {
        document.querySelectorAll(".explore-place").forEach(button => {
            button.addEventListener("click", function() {
                let place = this.getAttribute("data-place");
                explorePlace(place);
            });
        });
    }

    function explorePlace(place) {
        document.getElementById("story-output").innerHTML += `<p>Du erkundest den Ort: ${place}</p>`;
        // Weitere spezifische Interaktionen und Entdeckungen basierend auf dem gewählten Ort
    }

    function initiateNpcDialog() {
        let npc = getCurrentNpc();
        displayDialogOptions(npc);
        if(npc.name === "Betrunkenen") {
            document.getElementById("story-output").innerHTML += "<p>Möchtest du zur alten Eiche im Norden gehen? Schreibe 'Zur Eiche gehen'.</p>";
        }
    }

    function goToOldOak() {
        document.getElementById("story-output").innerHTML += "<p>Du gehst zur alten Eiche im Norden. Während du die Gegend erkundest, wirst du plötzlich von Wachen überrascht und musst kämpfen! Würfle einen D20, um den Ausgang des Kampfes zu bestimmen.</p>";
        document.getElementById("story-output").innerHTML += '<p>Schreibe "Würfeln", um zu kämpfen.</p>';
    }
    
    function fightGuards() {
        let roll = Math.floor(Math.random() * 20) + 1;
        if (roll >= 11) {
            // Gewonnen
            document.getElementById("story-output").innerHTML += "<p>Du hast gewonnen! Die Wachen ziehen sich zurück.</p>";
            document.getElementById("story-output").innerHTML += "<p>Schreibe 'Umschauen', um die Gegend zu erkunden.</p>";
        } else {
            // Verloren
            document.getElementById("story-output").innerHTML += "<p>Du hast verloren und wirst ohnmächtig. Nach einer Minute kommst du wieder zu dir.</p>";
            setTimeout(() => {
                document.getElementById("story-output").innerHTML += "<p>Du bist wieder bei Bewusstsein. Schreibe 'Umschauen', um die Gegend zu erkunden.</p>";
            }, 60000);  // Wartet 60 Sekunden (60000 Millisekunden)
        }
    }
    
    function lookAround() {
        let roll = Math.floor(Math.random() * 20) + 1;
        if (roll >= 11) {
            // Geheime Kammer gefunden
            document.getElementById("story-output").innerHTML += "<p>Du findest einen geheimen Eingang zur alten Bibliothek!</p>";
        } else {
            // Keinen Eingang gefunden
            document.getElementById("story-output").innerHTML += "<p>Du findest nichts Besonderes, aber lernst mehr über die Geschichte der Eiche.</p>";
        }
    }

    // Würfelfunktion
    document.querySelectorAll(".dice-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (!awaitingRoll) return; // Reagiere nur, wenn ein Wurf erforderlich ist

            var diceType = parseInt(btn.getAttribute("data-dice"));
            if (diceType === rollType) {
                let rollResult = Math.ceil(Math.random() * diceType);
                document.getElementById("dice-result").innerText = "Du hast eine " + rollResult + " gewürfelt!";
                handleExplorationOutcome(rollResult);
                awaitingRoll = false;
            } else {
                document.getElementById("story-output").innerHTML += "<p>Bitte würfle den richtigen Würfel!</p>";
            }
        });
    });
    
        
        function showGoods() {
            document.getElementById("story-output").innerHTML += `<p>Der Händler zeigt eine Auswahl exotischer Gegenstände.</p>`;
            // Weitere Logik kann hier eingefügt werden, z.B. Gegenstände zum Kauf anzeigen
        }
        
        function revealSecret() {
            document.getElementById("story-output").innerHTML += `<p>Der Händler flüstert: "Der Schatz, den du suchst, liegt tief in den verlorenen Höhlen des alten Waldes."</p>`;
            // Ergänze hier zusätzliche Logik, z.B. eine neue Quest
        }

        function handleExplorationOutcome(rollResult) {
            let description = "";
            let selectedLocation = localStorage.getItem('selectedLocation');
        
            if (rollResult <= 5) {
                description = "Du findest wenig von Interesse. ";
                description += handleLowRollOutcome(selectedLocation);
            } else if (rollResult <= 15) {
                description = "Du entdeckst einige interessante, aber nicht außergewöhnliche Dinge. ";
                description += handleMediumRollOutcome(selectedLocation);
            } else {
                description = "Deine Entdeckungen sind faszinierend und wertvoll! ";
                description += handleHighRollOutcome(selectedLocation);
            }
        
            document.getElementById("story-output").innerHTML += "<p>" + description + "</p>";
        }
        
        // Fortsetzung von dnd.js
        function handleLowRollOutcome(location) {
            let outcome = "";
            switch(location) {
                case "stadt":
                    outcome = "In den Gassen der Stadt stolperst du über einen Betrunkenen, der dir verschwommen von einem versteckten Schatz erzählt.";
                    currentDiscovery = "betrunkenen";
                    break;
                case "wald":
                    outcome = "Ein leises Wimmern führt dich zu einem verletzten Tier. Es scheint etwas am Fuß einer nahen Klippe fallen gelassen zu haben.";
                    currentDiscovery = "verletztes Tier";
                    break;
                // ...weitere Fälle...
                default:
                    outcome = "Es ist ein ruhiger Tag, und es passiert nicht viel.";
                    break;
            }
            return outcome;
        }
        
        function handleMediumRollOutcome(location) {
            let outcome = "";
            switch(location) {
                case "stadt":
                    outcome = "In einer kleinen Seitenstraße findest du einen versteckten Händler, der magische Gegenstände anbietet. Eines der Objekte glüht geheimnisvoll.";
                    currentDiscovery = "magischer Händler";
                    break;
                case "wald":
                    outcome = "Du entdeckst die Ruinen einer alten Kapelle, umgeben von geheimnisvollen Symbolen und Zeichen.";
                    currentDiscovery = "alte Ruinen";
                    break;
                // ...weitere Fälle...
                default:
                    outcome = "Deine Suche führt dich zu einem interessanten, aber unerwarteten Ort.";
                    break;
            }
            return outcome;
        }
        
        function handleHighRollOutcome(location) {
            let outcome = "";
            switch(location) {
                case "stadt":
                    outcome = "Du enthüllst den Eingang zu einer verborgenen Unterwelt, gefüllt mit Dieben und zwielichtigen Gestalten, die Informationen gegen Gold tauschen.";
                    currentDiscovery = "verborgene Unterwelt";
                    break;
                case "wald":
                    outcome = "Ein geheimnisvoller, alternden Druiden begegnet dir und bietet dir, im Austausch für einen Dienst, Wissen über eine verborgene Macht.";
                    currentDiscovery = "alter Druide";
                    break;
                // ...weitere Fälle...
                default:
                    outcome = "Ein außergewöhnliches Ereignis! Du findest etwas Seltenes und Wertvolles.";
                    break;
            }
            return outcome;
        }
        
        function initiateNpcDialog() {
            let npcSpeech = document.getElementById("npc-speech");
        
            switch(currentDiscovery) {
                case "betrunkenen":
                    npcSpeech.innerHTML = "Betrunkenen: *hicks* Der Schatz, ich schwör's, liegt versteckt unter der alten Eiche im Norden!";
                    break;
                case "magischer Händler":
                    npcSpeech.innerHTML = "Händler: Diese Artefakte sind mächtig... aber für den richtigen Preis gehören sie dir.";
                    break;
                case "verborgene Unterwelt":
                    npcSpeech.innerHTML = "Dieb: Suchst du Informationen? Jedes Geheimnis hat seinen Preis.";
                    break;
                // ...weitere Fälle...
                default:
                    npcSpeech.innerHTML = "NPC: Hallo Abenteurer! Wie kann ich dir helfen?";
                    break;
            }
            // Erweiterungen für spezifische NPC-Dialoge und Aktionen
        }
        
        function displayDialogOptions(npc) {
            let npcSpeech = document.getElementById("npc-speech");
            npcSpeech.innerHTML = `<p>${npc.name}: Wähle eine Option.</p>`;
    
            let dialogHTML = npc.dialogOptions.map((option, index) =>
                `<button class="dialog-option" data-index="${index}">${option.text}</button>`
            ).join("");
    
            document.getElementById("dialog-options").innerHTML = dialogHTML;
            addDialogOptionListeners(npc);
        }
    
        function addDialogOptionListeners(npc) {
            document.querySelectorAll(".dialog-option").forEach(button => {
                button.addEventListener("click", function() {
                    let index = this.getAttribute("data-index");
                    npc.dialogOptions[index].action();
                });
            });
        }
    
        
        // Funktion zum Untersuchen der aktuellen Entdeckung
        function investigateDiscovery() {
            let investigationOutcome = "";
            let storyOutput = document.getElementById("story-output");
            switch(currentDiscovery) {
                case "betrunkenen":
                    investigationOutcome = "Du folgst den Hinweisen des Betrunkenen und entdeckst wirklich einen kleinen Schatz unter der Eiche.";
                    break;
                case "magischer Händler":
                    investigationOutcome = "Der Händler warnt dich, dass das Artefakt von einem Fluch belegt sein könnte.";
                    break;
                // ...weitere Fälle...
                default:
                    investigationOutcome = "Es gibt nichts Besonderes zu entdecken.";
                    break;
            }
            storyOutput.innerHTML += `<p>${investigationOutcome}</p>`;
        }

        function endConversation() {
            document.getElementById("npc-speech").innerHTML = "<p>Das Gespräch ist beendet.</p>";
            document.getElementById("dialog-options").innerHTML = "";
        }

