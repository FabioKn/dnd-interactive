document.addEventListener("DOMContentLoaded", function() {
    generateGreeting();

    document.getElementById("submit-action").addEventListener("click", function() {
        var playerInput = document.getElementById("player-input").value.toLowerCase(); // Konvertiere Eingabe zu Kleinbuchstaben
        document.getElementById("story-output").innerHTML += "<p>" + playerInput + "</p>";

        // Überprüfe auf Schlüsselwörter
        if(playerInput.includes("erkunden")) {
            alert("Bereite dich vor zu würfeln, um deine Umgebung zu erkunden.");
            triggerDiceRoll(20, handleExplorationOutcome);
        }
        // Weitere Schlüsselwörter und Funktionen können hier hinzugefügt werden
    });

    // Würfelfunktion
    document.querySelectorAll(".dice-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            var diceType = parseInt(btn.getAttribute("data-dice"));
            triggerDiceRoll(diceType, null); // Kein Callback, wenn der Spieler manuell würfelt
        });
    });
});

function triggerDiceRoll(diceType, callback) {
    var resultContainer = document.getElementById("dice-result");
    let finalResult = Math.ceil(Math.random() * diceType);
    resultContainer.innerText = "Du hast eine " + finalResult + " gewürfelt!";
    if(callback) callback(finalResult);
}

function handleExplorationOutcome(rollResult) {
    let description = "";
    let selectedLocation = localStorage.getItem('selectedLocation');

    if(rollResult <= 5) {
        description = "Du findest wenig von Interesse.";
    } else if(rollResult <= 15) {
        description = "Du entdeckst einige interessante, aber nicht außergewöhnliche Dinge.";
    } else {
        description = "Deine Entdeckungen sind faszinierend und wertvoll!";
    }
    
    // Füge Details basierend auf dem gewählten Ort hinzu
    if(selectedLocation === "Stadt") {
        description += " In den geschäftigen Straßen der Stadt...";
    } else if(selectedLocation === "Feld") {
        description += " Auf dem weiten, offenen Feld...";
    } else if(selectedLocation === "Wald") {
        description += " Im tiefen, geheimnisvollen Wald...";
    }

    document.getElementById("story-output").innerHTML += "<p>" + description + "</p>";
}
function generateGreeting() {
    let playerInfo = JSON.parse(localStorage.getItem('playerInfo'));
    let selectedWeapon = localStorage.getItem('selectedWeapon');
    let selectedLocation = localStorage.getItem('selectedLocation');

    let storyText = `Hallo, ${playerInfo.name}. Du bist ein/e ${playerInfo.class} aus dem Volk der ${playerInfo.race} mit einer/einem ${selectedWeapon}. Du befindest dich nun im/am ${selectedLocation}...`;
    document.getElementById('story-output').innerHTML = storyText;
}
