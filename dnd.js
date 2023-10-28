document.addEventListener("DOMContentLoaded", function() {
    generateGreeting();
    let awaitingRoll = false;
    let rollType = null;

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
        // Möglichkeit für zusätzliche Aktionen nach der Spieleraktion
        checkGameStatus(); // Überprüft den Spielstatus nach jeder Aktion
    }

    function playerAction() {
        var playerInput = document.getElementById("player-input").value.toLowerCase();
        document.getElementById("story-output").innerHTML += "<p>" + playerInput + "</p>";
        document.getElementById("player-input").value = ""; // Eingabefeld leeren
    
        if (playerInput.includes("erkunden")) {
            document.getElementById("story-output").innerHTML += "<p>Würfle einen D20, um deine Umgebung zu erkunden.</p>";
            awaitingRoll = true;
            rollType = 20;
            exploreCity();
        } else if (playerInput.includes("sprechen")) {
            initiateNpcDialog();
        } else if (playerInput.includes("untersuchen")) {
            investigateDiscovery();
        } else if (playerInput.includes("rasten")) {
            takeRest();
        } else if (playerInput.includes("handeln")) {
            initiateTrade();
        }
        // Weitere Aktionen können hier ergänzt werden
    }
    function exploreCity() {
        let places = ["Marktplatz", "Dunkle Gasse", "Königspalast"]; // Beispielliste von Orten
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
        // Logik zur Erkundung des ausgewählten Ortes
        document.getElementById("story-output").innerHTML += `<p>Du erkundest den Ort: ${place}</p>`;
        // Weitere spezifische Interaktionen und Entdeckungen basierend auf dem gewählten Ort
    }

    // Würfelfunktion
    document.querySelectorAll(".dice-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
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
    

        function initiateNpcDialog() {
            let npcSpeech = document.getElementById("npc-speech");
            let npc = getCurrentNpc(); // Funktion, um den aktuellen NPC zu bestimmen, basierend auf `currentDiscovery` oder anderen Spiellogiken
        
            displayDialogOptions(npc);
        }

        function generateGreeting() {
            let playerInfo = JSON.parse(localStorage.getItem('playerInfo'));
            let selectedWeapon = localStorage.getItem('selectedWeapon');
            let selectedLocation = localStorage.getItem('selectedLocation');
        
            let storyText = `Hallo, ${playerInfo.name}. Sei gegrüßt ${playerInfo.class} aus dem Volk der ${playerInfo.race} ausgerüstet mit ${selectedWeapon}. Du befindest dich nun in ${selectedLocation}...`;
            document.getElementById('story-output').innerHTML = storyText;
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

        function getCurrentNpc() {
            // Beispiellogik, um den NPC basierend auf der aktuellen Entdeckung zu bestimmen
            switch (currentDiscovery) {
                case "magischer Händler":
                    return {
                        name: "Magischer Händler",
                        dialogOptions: [
                            { text: "Zeige mir deine Waren.", action: showGoods },
                            { text: "Weißt du etwas über den versteckten Schatz?", action: revealSecret },
                            { text: "Auf Wiedersehen.", action: endConversation }
                        ]
                    };
                // Füge hier weitere NPCs hinzu
                default:
                    return { 
                        name: "Unbekannter NPC",
                        dialogOptions: [{ text: "Tschüss.", action: endConversation }]
                    };
            }
        }

        function endConversation() {
            document.getElementById("npc-speech").innerHTML = "<p>Das Gespräch ist beendet.</p>";
            document.getElementById("dialog-options").innerHTML = "";
        }




});

});
