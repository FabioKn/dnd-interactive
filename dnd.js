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
            var result = Math.ceil(Math.random() * diceType);
            document.getElementById("dice-result").innerText = "Du hast eine " + result + " gewürfelt!";
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
