let inputEl = document.getElementById('searchInput');
let resultContainerEl = document.getElementById('resultCountries');
let loadingEl = document.getElementById('spinner');

let inputval = "";
let countriesList = [];

function createAndAppendCountries(country) {
    let countryName = country.name;
    let flag = country.flag;
    let population = country.population;

    //creating container (div)
    let countryCardEl = document.createElement('div');
    countryCardEl.classList.add("country-card", "d-flex", "flex-row", "col-11", "col-md-5", "mr-auto", "ml-auto");
    resultContainerEl.appendChild(countryCardEl);


    //creating image (img)
    let countryFlag = document.createElement('img');
    countryFlag.src = flag;
    countryFlag.classList.add("country-flag", "mt-auto", "mb-auto");
    countryCardEl.appendChild(countryFlag);

    //creating inner container (div)
    let detailsContainer = document.createElement('div');
    detailsContainer.classList.add("d-flex", "flex-column", "ml-4");
    countryCardEl.appendChild(detailsContainer);

    //creating heading (h1)
    let countryNameEl = document.createElement('p');
    countryNameEl.textContent = countryName;
    countryNameEl.classList.add("country-name");
    detailsContainer.appendChild(countryNameEl);

    //creating population (p)
    let populationEl = document.createElement('p');
    populationEl.textContent = population;
    populationEl.classList.add("country-population");
    detailsContainer.appendChild(populationEl);
}


function displayCountries() {
    //console.log(countriesList);
    resultContainerEl.textContent = "";

    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(inputval)) {
            createAndAppendCountries(country);
        }
    }
}


function getCountries() {
    loadingEl.classList.toggle("d-none");
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            loadingEl.classList.toggle("d-none");
            countriesList = jsonData;
            displayCountries();
        });
}

function onsearchInput(event) {
    inputval = event.target.value;
    displayCountries();

}

getCountries();
inputEl.addEventListener("keyup", onsearchInput);