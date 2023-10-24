// character-sheet.js
document.addEventListener("DOMContentLoaded", function() {
    // Spielerinformationen abrufen
    var playerInfo = JSON.parse(localStorage.getItem('playerInfo')) || {};

    // Initialwerte für Attribute, könnten basierend auf Klasse/Rasse variieren
    var initialAttributes = {
        stärke: 10, 
        weisheit: 10,
        charisma: 10,
        intelligenz: 10,
        geschicklichkeit: 10,
    };

    var availablePoints = 27; // Beispiel für verfügbare Punkte
    
    // Initialwerte basierend auf Klasse/Rasse festlegen (optional, je nach Ihren Spielregeln)
    // ...

    // UI-Elemente initialisieren
    var availablePointsElement = document.getElementById('available-points');
    availablePointsElement.innerText = availablePoints;

    // Funktion zur Verwaltung von Attributänderungen
    function handleAttributeChange(event) {
        // Logik zum Hinzufügen/Entfernen von Punkten, Aktualisieren der verfügbaren Punkte
        // ...
    }

    // Event-Listener für Attributänderungen
    document.getElementById('stärke').addEventListener('change', handleAttributeChange);
    document.getElementById('weisheit').addEventListener('change', handleAttributeChange);
    document.getElementById('charisma').addEventListener('change', handleAttributeChange);
    document.getElementById('geschicklichkeit').addEventListener('change', handleAttributeChange);
    document.getElementById('intelligenz').addEventListener('change', handleAttributeChange);
    // Weitere Listener für andere Attribute...

    // Logik für den Speichern-Button
    document.getElementById('save-button').addEventListener('click', function() {
        // Validierung und Speichern der endgültigen Spielerdaten
        playerInfo.attributes = {
            stärke: document.getElementById('stärke').value,
            weisheit: document.getElementById('weisheit').value,
            charisma: document.getElementById('charisma').value,
            geschicklichkeit: document.getElementById('geschicklichkeit').value,
            intelligenz: document.getElementById('intelligenz').value,
            // ... andere Attribute
        };

        localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
        // Optional: Weiterleitung zu einer nächsten Seite oder Anzeige einer Bestätigung
    });
});
