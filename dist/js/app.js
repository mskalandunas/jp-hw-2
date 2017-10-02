'use strict';

// function removePrependingThe() {
//     let alteredTitles = [];

//     for (let title of arguments) {
//         if (title.startsWith('THE ')) {
//             alteredTitles.unshift(title.replace('THE ', ''));
//         }
//     }

//     return alteredTitles;
// }

(function() {
    const displayOptionsDropdown = document.querySelector('#sort-options-selector');
    const resultsAmountDropdown = document.querySelector('#results-amount-selector');
    const apiDataContainer = document.querySelector('#api-data-container');
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

        // Use more DRY function for this
        responseData.forEach(entry => {
            buildDataCard(entry, apiDataContainer);
        });
    }).catch(err => {
        console.log(err);
    });

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
        let numberOfResults = resultsAmountDropdown.value;
        let sortedData = [...responseData];

        apiDataContainer.innerHTML = '';

        // Break these up into more DRY functions
        switch(preference) {
            case 'release-data-latest':
                break;
            case 'release-data-earliest':
                break;
            case 'alphabetical':
                sortedData.sort((a, b) => {
                    let [titleA, titleB] = [a.title.toUpperCase(), b.title.toUpperCase()];

                    if (titleA < titleB) {
                        return -1;
                    }

                    if (titleA > titleB) {
                        return 1;
                    }

                    return 0;
                });
                break;
            case 'reverse-alphabetical':
                sortedData.sort((a, b) => {
                    let [titleA, titleB] = [a.title.toUpperCase(), b.title.toUpperCase()];

                    // [titleA, titleB] = removePrependingThe(titleA, titleB);

                    if (titleA < titleB) {
                        return 1;
                    }

                    if (titleA > titleB) {
                        return -1;
                    }

                    return 0;
                });
                break;
            case 'rating':
                sortedData.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
                break;
            case 'genre':
                numberOfResults = sortedData.length;
                break;
            default:
                break;
        }

        sortedData.forEach((entry, i) => {
            i < resultsAmountDropdown.value && buildDataCard(entry, apiDataContainer);
        });
    }
})();

