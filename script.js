'use strict';

// 1. Duomenų bazė (saugoma tiesiog čia, kode)
const peopleData = [
    {
        // Raktas, pagal kurį ieškosime. Geriausia be lietuviškų raidžių ir mažosiomis.
        searchKey: "aukstaiciu g. 76", 
        name: "Diana Ruolytė",
        fullAddress: "Aukštaičių g. 76, Kaunas",
        photoUrl: "https://i.postimg.cc/y8HCB20K/Diana-ruolyte-01.jpg"
    },
    {
        searchKey: "paupio g. 43",
        name: "Lukas Zvibliauskas",
        fullAddress: "Paupio g. 43, Švenčionėliai",
        // Kadangi yra dvi nuotraukos, galime jas saugoti masyve ir atsitiktinai parinkti
        photoUrl: [
            "https://i.postimg.cc/1561kynM/lukas-zvb-01.jpg",
            "https://i.postimg.cc/qvxV7QG3/lukas-zvb-02.jpg"
        ]
    },
    {
        searchKey: "misko g. 29",
        name: "Teresa Novikevič",
        fullAddress: "Miško g. 29, Šventa, Švenčionių rajonas",
        photoUrl: "https://i.postimg.cc/zfDmHWdP/teresa-01.jpg"
    }
];

// 2. Surandame HTML elementus, su kuriais dirbsime
const searchForm = document.getElementById('search-form');
const addressInput = document.getElementById('address-input');
const resultContainer = document.getElementById('result-container');

// 3. Pagrindinė funkcija, kuri veiks paspaudus "Ieškoti"
searchForm.addEventListener('submit', function(event) {
    // Sustabdome puslapio persikrovimą
    event.preventDefault(); 
    
    // Paimame vartotojo įvestą tekstą, pašaliname tarpus ir paverčiame mažosiomis raidėmis
    const query = addressInput.value.trim().toLowerCase();

    // Ieškome asmens duomenų bazėje pagal "searchKey"
    const foundPerson = peopleData.find(person => person.searchKey === query);

    // Išvalome ankstesnį rezultatą
    resultContainer.innerHTML = '';

    // 4. Tikriname, ar radome asmenį
    if (foundPerson) {
        // Jei radome, sukuriame ir parodome jo kortelę
        displayPersonCard(foundPerson);
    } else {
        // Jei neradome, parodome pranešimą
        displayNotFoundMessage();
    }
});

// Funkcija, kuri sukuria ir įdeda asmens kortelės HTML
function displayPersonCard(person) {
    // Patikriname, ar nuotraukų yra daugiau nei viena
    let photo = person.photoUrl;
    if (Array.isArray(photo)) {
        // Jei taip, parenkame atsitiktinę nuotrauką iš masyvo
        const randomIndex = Math.floor(Math.random() * photo.length);
        photo = photo[randomIndex];
    }

    const cardHTML = `
        <div class="person-card">
            <img src="${photo}" alt="${person.name}" class="person-photo">
            <div class="person-details">
                <h2>${person.name}</h2>
                <p>${person.fullAddress}</p>
            </div>
        </div>
    `;
    resultContainer.innerHTML = cardHTML;
}

// Funkcija, kuri parodo "nerasta" pranešimą
function displayNotFoundMessage() {
    const notFoundHTML = `<p class="not-found">Asmuo tokiu adresu nerastas.</p>`;
    resultContainer.innerHTML = notFoundHTML;
}
