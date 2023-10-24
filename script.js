document.addEventListener("DOMContentLoaded", function() {
    // Diese Funktion wird ausgeführt, wenn das Dokument geladen ist
    addMessageToHistory("Hello new player!", "system");

    document.getElementById('userInput').addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkInput();
        }
    });

    document.getElementById('submitBtn').addEventListener("click", function(event) {
        event.preventDefault();
        checkInput();
    });
});

var stage = 0; // Eine Variable, um das aktuelle Stadium der Konversation zu verfolgen
var playerName = ""; // Eine Variable, um den Namen des Spielers zu speichern

function checkInput() {
    var userInput = document.getElementById('userInput').value.trim();
    addMessageToHistory(userInput, "user"); // Fügt die Benutzernachricht zur Historie hinzu

    if(stage === 0) {
        var greetings = ['hallo', 'hey', 'hello', 'hi'];
        if (greetings.includes(userInput.toLowerCase())) {
            addMessageToHistory("Schön dich kennenzulernen! Wie heißt du?", "system");
            stage = 1; // Gehe zum nächsten Schritt
        } else {
            addMessageToHistory("Bitte sag Hallo, um fortzufahren.", "system");
        }
    } else if(stage === 1) {
        playerName = userInput; // Speichert den Namen des Benutzers
        addMessageToHistory("Hallo " + playerName + "! Bist du bereit, dein Abenteuer zu beginnen?", "system");
        // Verzögert die Weiterleitung um 3 Sekunden (3000 Millisekunden)
        setTimeout(function() {
            window.location.href = 'class-selection.html?name=' + encodeURIComponent(playerName);
        }, 5000);
    }

    document.getElementById('userInput').value = ''; // Leert das Eingabefeld nach dem Absenden
}

function addMessageToHistory(message, sender) {
    var chatHistory = document.getElementById('chatHistory');
    var messageElement = document.createElement('div');

    messageElement.textContent = message; 
    messageElement.classList.add(sender + '-message'); 
    chatHistory.appendChild(messageElement);

    chatHistory.scrollTop = chatHistory.scrollHeight;
}
