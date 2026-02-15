    const flagHTML = `<img src="${data[0].flags?.svg}" alt="flag">`;
    document.querySelector('.flag-container').innerHTML = flagHTML;


    if(country.borders){
                    country.borders.forEach(border => {
                        fetch(`https://restcountries.com/v3.1/alpha/${border}`).then(res => res.json())
                        .then(countryData => {
                            console.log(countryData);
                })
            })
        }