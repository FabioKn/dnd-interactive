document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".weapon").forEach(function(weapon) {
        weapon.addEventListener("click", function() {
            var weaponChoice = weapon.alt; // Verwendet den alt-Text als Waffennamen
            var confirmChoice = confirm("Möchtest du das " + weaponChoice + " wählen?");
            if (confirmChoice) {
                // Logik, um die gewählte Waffe zu speichern
                localStorage.setItem('selectedWeapon', weaponChoice);
                // Optional: Weiterleitung oder Bestätigung
                alert("Du hast das " + weaponChoice + " gewählt!");
            }
        });
    });
});
