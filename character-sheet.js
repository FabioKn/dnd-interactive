// character-sheet.js
document.addEventListener("DOMContentLoaded", function() {
    // Spielerinformationen abrufen
    var playerInfo = JSON.parse(localStorage.getItem('playerInfo')) || {};

    // Initialwerte für Attribute, könnten basierend auf Klasse/Rasse variieren
    var initialAttributes = {
        strength: 10, // Beispielwerte, sollten basierend auf Klasse/Rasse angepasst werden
        // ... andere Attribute
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
    document.getElementById('strength').addEventListener('change', handleAttributeChange);
    // Weitere Listener für andere Attribute...

    // Logik für den Speichern-Button
    document.getElementById('save-button').addEventListener('click', function() {
        // Validierung und Speichern der endgültigen Spielerdaten
        playerInfo.attributes = {
            strength: document.getElementById('strength').value,
            // ... andere Attribute
        };

        localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
        // Optional: Weiterleitung zu einer nächsten Seite oder Anzeige einer Bestätigung
    });
});
