document.addEventListener("DOMContentLoaded", function() {
    var playerInfo = JSON.parse(localStorage.getItem('playerInfo')) || {};

    // Setzen der initialen Attributswerte
    var attributes = {
        stärke: 10, 
        weisheit: 10,
        charisma: 10,
        intelligenz: 10,
        geschicklichkeit: 10,
    };

    var availablePoints = 27; // Beispiel für verfügbare Punkte

    var availablePointsElement = document.getElementById('available-points');
    availablePointsElement.innerText = availablePoints;

    function updateAttributeDisplay() {
        Object.keys(attributes).forEach(function (key) {
            var element = document.getElementById(key);
            element.value = attributes[key];
        });
        availablePointsElement.innerText = availablePoints;
    }

    function handleAttributeChange(event) {
        var attributeId = event.target.id;
        var newValue = parseInt(event.target.value);
        var oldValue = attributes[attributeId];

        var pointChange = newValue - oldValue;

        if (newValue >= 1 && (availablePoints - pointChange) >= 0) {
            attributes[attributeId] = newValue;
            availablePoints -= pointChange;
        } else {
            event.target.value = oldValue; // Zurücksetzen auf alten Wert
        }

        updateAttributeDisplay();
    }

    Object.keys(attributes).forEach(function (key) {
        document.getElementById(key).addEventListener('input', handleAttributeChange);
    });

    document.getElementById('save-button').addEventListener('click', function() {
        playerInfo.attributes = attributes;
        localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
        // Optional: Weiterleitung oder Bestätigung
    });

    updateAttributeDisplay();
});
