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
            alert("Du hast " + selectedRace + " als dein Volk gewählt!");
            // Hier können Sie weitere Aktionen durchführen, z. B. eine neue Seite öffnen oder weitere Optionen anzeigen
        } else {
            alert("Bitte wähle ein Volk aus der Liste.");
        }
    });
});