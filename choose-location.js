document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".location").forEach(function(location) {
        location.addEventListener("click", function() {
            var locationChoice = location.id; // Nutzt die ID als Ortsnamen
            localStorage.setItem('selectedLocation', locationChoice);

            // Weiterleitung zur Begrüßungsseite
            window.location.href = 'dnd.html';
        });
    });
});
