const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data) {
    const html = `
            <article class="country">
                <img src="${data.flags.png}" alt="" class="country_img">
                <div class="country_data">
                    <h3 class="country_name">${data.name.official}</h3>
                    <div class="country_data">
                        <h4 class="country_name">${data.name.common}</h4>
                        <p class="country_populaton">${(+data.population / 1000000).toFixed(1)} million</p>
                        <p class="country_currency">${data.currencies.name}</p>
                    </div>
                </div>
            </article>
    `
    countriesContainer.insertAdjacentHTML('beforeend', html);
}


function getCountryAndNeighbour(country) {
    // AJAX call country -1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);//this keyword represented request here, keep the constant in third bracket is destructuring data
        console.log(data);
        //Render Country -1
        renderCountry(data);
        //Get neighbour country -2
        const [neighbour] = data.borders;
        if (!neighbour) return;

        // AJAX call country -2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();
        request2.addEventListener('load', function() {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);
            renderCountry(data2);
        })
    })
}

getCountryAndNeighbour('bangladesh');




