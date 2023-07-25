async function fetchData() {
    try {
        // Address doc https://api-docs.iqair.com/?version=latest
        const resJSON = await fetch('http://api.airvisual.com/v2/nearest_city?key=f65412e8-a270-4b50-ab86-81ba079581aa');
        if (!resJSON.ok) {
            throw new Error('Connection serveur impossible');
        }
        const resJS = await resJSON.json();

        const dataMeteo = {
            country: resJS.data.country,
            city: resJS.data.city,
            temp: resJS.data.current.weather.tp,
            icon: resJS.data.current.weather.ic
        };
        createElements(dataMeteo);

    } catch (error) {
        console.error("===Error=== " + error);
        const errorInfo = document.querySelector('.error-info');
        errorInfo.innerText = error.message;
        errorInfo.style.display = "flex";
    } finally {
        const spinner = document.querySelector('.lds-spinner');
        spinner.classList.add('hidden');
        setTimeout(() => spinner.remove(), 800);
    }
}

/**
 * Creates DOM elements to display the weather data.
 * @function createElements
 * @param {Object} dataMeteo - The weather data object.
 * @param {string} dataMeteo.country - The country name.
 * @param {string} dataMeteo.city - The city name.
 * @param {number} dataMeteo.temp - The temperature value.
 * @param {string} dataMeteo.icon - The icon representing weather conditions.
 */
function createElements(dataMeteo) {
    const city = document.querySelector('.city');
    const country = document.querySelector('.country');
    const temp = document.querySelector('.temp');
    const icon = document.querySelector('.icon');

    city.textContent = dataMeteo.city;
    country.textContent = dataMeteo.country;
    temp.textContent = `${dataMeteo.temp}°`;
    icon.src = `ressources/jour/${dataMeteo.icon}.svg`;
}

fetchData();