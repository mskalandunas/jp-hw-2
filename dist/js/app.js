'use strict';

/*

    Necessary functions
    * image preloader

*/

function buildDataCard(entry, parent) {
    let card = document.createElement('article');
    card.classList = "rendered-api-entry";
    card.innerHTML = `
        <img class="rendered-api-image" src="http://mosaic-mock-api.herokuapp.com/${entry.screenshot}">
        <h3 class="rendered-api-title">${entry.title}</h3>
        <p>Released:
            <span class="rendered-api-release-data">${entry.release_date}</span>
        </p>
        <p>Rating:
            <span class="rendered-api-rating">${entry.rating}</span>
        </p>
        <p>Reviews:
            <span class="rendered-api-reviews">${entry.reviews}</span>
        </p>
        <p>Developer:
            <span class="rendered-api-developer">${entry.developer}</span>
        </p>
        <p>Publisher:
            <span class="rendered-api-publisher">${entry.publisher}</span>
        </p>
        <p>Genre:
            <span class="rendered-api-genre">${entry.genre}</span>
        </p>
        <p class="rendered-api-description"><br>${entry.description.replace(/\n/g, '\n\n')}</p>
    `

    parent.appendChild(card);
}

function changeSortPreference(e) {
    let preference = e.target.value;

    console.log(preference);
}

(function() {
    const displayOptionsDropdown = document.querySelector('select');
    const dataBlock = document.querySelector('#data-entries');
    const responseData = [];
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    fetch('http://mosaic-mock-api.herokuapp.com/api/games', options).then(res => res.json()).then(data => {
        responseData.push(...data.games);
        displayOptionsDropdown.addEventListener('change', changeSortPreference, true);
        responseData.forEach(entry => {
            buildDataCard(entry, dataBlock);
        });
    }).catch(err => {
        console.log(err);
    });
})();

