// https://www.weatherapi.com/my/


async function searchWeather() {
    const citySelect = document.getElementById('city-select');
    const selectedCity = citySelect.value.trim().toLowerCase();
    const allowedCities = [
        "lecce", "otranto", "gallipoli", "santa maria di leuca", "porto cesareo",
        "torre dell'orso", "ugento", "casarano", "acquarica del capo", "alezio",
        "alliste", "andria", "aradeo", "arigliano", "bagnolo del salento", "botrugno",
        "calimera", "campi salentina", "canne", "caprarica di lecce", "carpignano salentino",
        "casarano", "cavallino", "cellino san marco", "collepasso", "copertino",
        "corigliano d'otranto", "cursi", "cutrofiano", "diso", "francavilla fontana",
        "galatina", "galatone", "gallipoli", "giuggianello", "giurdignano", "guagnano",
        "lecce", "lequile", "leverano", "lizzanello", "maglie", "martano", "martignano",
        "maruggio", "matino", "melendugno", "melissano", "melpignano", "miggiano",
        "minervino di lecce", "monteroni di lecce", "morciano di leuca", "muro leccese",
        "nardo'", "neviano", "noci", "novoli", "ortelle", "otranto", "palmariggi",
        "parabita", "patu'", "poggiardo", "porto cesareo", "presicce", "racale",
        "ruffano", "salice salentino", "salve", "san cassiano", "san cesario di lecce",
        "san donato di lecce", "san giorgio jonico", "san pietro in lama", "san vito dei normanni",
        "sanarica", "santa cesarea terme", "scorrano", "seclì", "soleto", "squinzano",
        "sternatia", "supersano", "surano", "surbo", "taurisano", "taviano", "tiggiano",
        "torre chianca", "torre dell'orso", "torre lapillo", "torre san giovanni",
        "torremozza", "trepuzzi", "tricasa", "tuglie", "ugento", "veglie", "verno",
        "vigliatore", "villaggio boncore", "villaspeciosa", "zollino"
    ];

    if (!allowedCities.includes(selectedCity)) {
        document.getElementById('weather-info').innerHTML = `<p style="color: red;">Errore: La città inserita non è nel Salento.</p>`;
        document.getElementById('suggested-area').innerHTML = "";
        return;
    }

    const apiKey = '5f66d0b63b054f0b92940013242906';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&lang=it`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const location = data.location.name;
            const condition = data.current.condition.text;
            const temp_c = data.current.temp_c;
            const wind_kph = data.current.wind_kph;
            const wind_dir = data.current.wind_dir;

            document.getElementById('weather-info').innerHTML = `
                <h2>Meteo a ${location}</h2>
                <p>Condizioni: ${condition}</p>
                <p>Temperatura: ${temp_c}°C</p>
                <p>Vento: ${wind_kph} km/h da ${wind_dir}</p>
            `;

            let suggestedArea = "";
            if (wind_dir.includes("N")) {
                suggestedArea = "Porto Badisco e Porto Miggiano sono le zone migliori.";
            } else if (wind_dir.includes("S")) {
                suggestedArea = "Torre dell'Orso è la zona migliore.";
            } else if (wind_dir.includes("E")) {
                suggestedArea = "Porto Selvaggio è la zona migliore.";
            } else if (wind_dir.includes("W")) {
                suggestedArea = "Le spiagge degli Alimini sono le zone migliori.";
            }

            document.getElementById('suggested-area').innerHTML = `
                <h2>Zone Consigliate</h2>
                <p>${suggestedArea}</p>
            `;
        } else {
            document.getElementById('weather-info').innerHTML = `<p style="color: red;">Errore nel recupero delle informazioni meteo.</p>`;
            document.getElementById('suggested-area').innerHTML = "";
        }
    } catch (error) {
        console.error('Errore:', error);
        document.getElementById('weather-info').innerHTML = `<p style="color: red;">Errore: Non è stato possibile recuperare le informazioni meteo.</p>`;
        document.getElementById('suggested-area').innerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('.close-btn');

    // Mostra la finestra popup quando la pagina è caricata
    popup.style.display = 'flex';

    // Chiudi la finestra popup quando si clicca sul pulsante di chiusura
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });
});


