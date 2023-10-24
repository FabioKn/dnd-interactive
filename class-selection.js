document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    
    if (name) {
        document.getElementById('playerName').textContent = "Willkommen, " + name + "!";
    }

    // Handler für die Auswahl der Klasse
    document.getElementById('selectClassBtn').addEventListener('click', function() {
        var selectedClass = document.getElementById('classSelector').value;
        if(selectedClass) {
            // Versteckt das Klassenauswahlelement und zeigt das Volk-Auswahlelement
            document.getElementById('classSelector').style.display = 'none';
            document.getElementById('selectClassBtn').style.display = 'none';
            document.getElementById('raceSelector').style.display = 'block';
            document.getElementById('selectRaceBtn').style.display = 'block';
        } else {
            alert("Bitte wähle eine Klasse aus der Liste.");
        }
    });

    // Handler für die Auswahl des Volkes
    document.getElementById('selectRaceBtn').addEventListener('click', function() {
        var selectedRace = document.getElementById('raceSelector').value;
        if(selectedRace) {
            // Hier rufen wir die Funktion auf, die die Spielerinformationen speichert und dann umleitet
            savePlayerInfoAndRedirect();
        } else {
            alert("Bitte wähle ein Volk aus der Liste.");
        }
    });

    // Funktion zum Speichern von Spielerinformationen und Weiterleitung
    function savePlayerInfoAndRedirect() {
        var selectedClass = document.getElementById('classSelector').value;
        var selectedRace = document.getElementById('raceSelector').value;
        
        // Spielerinformationen in einem Objekt speichern
        var playerInfo = {
            name: name, // Wir verwenden den 'name' aus den URL-Parametern
            class: selectedClass,
            race: selectedRace
        };

        // Speichern im localStorage
        localStorage.setItem('playerInfo', JSON.stringify(playerInfo));

        // Weiterleitung zur Charakterbogen-Seite
        window.location.href = 'character-sheet.html';
    }

});
