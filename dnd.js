document.addEventListener("DOMContentLoaded", function() {
    // Begrüßungsnachricht generieren
    generateGreeting();

    // Event Listener für Dialogsystem
    document.getElementById("submit-action").addEventListener("click", function() {
        var playerInput = document.getElementById("player-input").value;
        document.getElementById("story-output").innerHTML += "<p>" + playerInput + "</p>";
        // Hier könntest du zusätzliche Logik einbauen, um auf die Eingabe zu reagieren
    });

    // Würfelfunktion
    document.querySelectorAll(".dice-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            var diceType = parseInt(btn.getAttribute("data-dice"));
            var resultContainer = document.getElementById("dice-result");
    
            // Animierter Würfelwurf
            let times = 10; // Anzahl der Änderungen vor dem Endresultat
            let interval = setInterval(function() {
                let randomNum = Math.ceil(Math.random() * diceType);
                resultContainer.innerText = randomNum;
                times--;
                if (times <= 0) {
                    clearInterval(interval);
                    // Zeigt das endgültige Ergebnis an
                    let finalResult = Math.ceil(Math.random() * diceType);
                    resultContainer.innerText = "Du hast eine " + finalResult + " gewürfelt!";
                }
            }, 100); // Geschwindigkeit der Zahlwechsel
        });
    });
    
});

function generateGreeting() {
    let playerInfo = JSON.parse(localStorage.getItem('playerInfo'));
    let selectedWeapon = localStorage.getItem('selectedWeapon');
    let selectedLocation = localStorage.getItem('selectedLocation');

    let storyText = `Hallo, ${playerInfo.name}. Du bist ein/e ${playerInfo.class} aus dem Volk der ${playerInfo.race} mit einer/einem ${selectedWeapon}. Du befindest dich nun im/am ${selectedLocation}...`;
    document.getElementById('story-output').innerHTML = storyText;
}
