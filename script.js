'use strict';

// Surandame visus reikiamus HTML elementus
const signatureForm = document.getElementById('signature-form');
const addressInput = document.getElementById('address-input');
const signatureList = document.getElementById('signature-list');
const successAnimation = document.getElementById('success-animation');

// Funkcija, kuri parodo sėkmės animaciją
function showSuccessAnimation() {
    // Pašaliname 'hidden' klasę, kad animacija taptų matoma
    successAnimation.classList.remove('hidden');

    // Po 2.5 sekundžių vėl paslepiame animaciją
    setTimeout(() => {
        successAnimation.classList.add('hidden');
    }, 2500);
}

// Funkcija, kuri prideda naują adresą į sąrašą
function addAddressToList(address) {
    // Sukuriame naują sąrašo elementą (<li>)
    const listItem = document.createElement('li');
    listItem.textContent = address;

    // Pridedame elementą į sąrašo viršų, kad naujausias būtų matomas pirmas
    signatureList.prepend(listItem);
}

// Formos pateikimo klausytojas
signatureForm.addEventListener('submit', function(event) {
    // Sustabdome numatytąjį formos veiksmą (puslapio perkrovimą)
    event.preventDefault();

    // Gauname adreso tekstą ir pašaliname nereikalingus tarpus
    const addressText = addressInput.value.trim();

    // Patikriname, ar adresas nėra tuščias
    if (addressText) {
        // Pridedame adresą į sąrašą
        addAddressToList(addressText);
        
        // Parodome sėkmės animaciją
        showSuccessAnimation();
        
        // Išvalome įvesties laukelį
        addressInput.value = '';

        // Sugrąžiname fokusą į įvesties laukelį patogesniam darbui
        addressInput.focus();
    }
});
