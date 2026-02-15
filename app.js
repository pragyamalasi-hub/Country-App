const filterbyRegion= document.querySelector('.filter-by-region');
const searchInput = document.querySelector('input');
const suggestions = document.querySelector('.suggestions');

let allCountries = [];

const modeChanger = document.querySelector('.mode-change');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

modeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});



fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,cca3')
.then(res => res.json())
.then(data => {
    data.forEach(country => {
        allCountries = data;

        console.log(country);
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href=`country.html?name=${country.name.common}`;

        // const cardImg= document.createElement('img');   [LENGTHY METHOD]
        // cardImg.src= country.flags.svg;

        // countryCard.append(cardImg);



        // BETTER METHOD USING  TEMPLATE LITERALS, WE CAN CREATE THE ENTIRE CARD IN ONE GO AND THEN INSERT IT INTO THE DOM. THIS IS MORE EFFICIENT AND CLEANER THAN CREATING EACH ELEMENT SEPARATELY AND APPENDING THEM ONE BY ONE.
        
        countryCard.innerHTML = 
            `<img src="${country.flags.svg}" alt="flag">
            <div class="card-text">
                <h4>${country.name.common}</h4>                                    
                <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region:</b> ${country.region}</p>
                <p><b>Capital:</b> ${country.capital}</p>
            </div>
        `;
        countriesContainer.append(countryCard);
    })
})
  
filterbyRegion.addEventListener( 'change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then(res => res.json())
    .then(data => {

        countriesContainer.innerHTML= '';  // THIS LINE IS CRUCIAL AS IT CLEARS THE PREVIOUSLY DISPLAYED COUNTRIES BEFORE DISPLAYING THE NEW ONES BASED ON THE SELECTED REGION. WITHOUT THIS LINE, THE NEW COUNTRIES WOULD BE APPENDED TO THE EXISTING ONES, CAUSING CLUTTER AND CONFUSION FOR THE USER.


        data.forEach(country => {

            console.log(country);
            const countryCard = document.createElement('a');
            countryCard.classList.add('country-card');
            countryCard.href=`country.html?name=${country.name.common}`;

        // const cardImg= document.createElement('img');   [LENGTHY METHOD]
        // cardImg.src= country.flags.svg;

        // countryCard.append(cardImg);



        // BETTER METHOD USING  TEMPLATE LITERALS, WE CAN CREATE THE ENTIRE CARD IN ONE GO AND THEN INSERT IT INTO THE DOM. THIS IS MORE EFFICIENT AND CLEANER THAN CREATING EACH ELEMENT SEPARATELY AND APPENDING THEM ONE BY ONE.
        
            countryCard.innerHTML = 
                `<img src="${country.flags.svg}" alt="flag">
                <div class="card-text">
                    <h4>${country.name.common}</h4>                                    
                    <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region:</b> ${country.region}</p>
                    <p><b>Capital:</b> ${country.capital}</p>
                </div>
                `;
        countriesContainer.append(countryCard);
        })
    })
})

const countriesContainer= document.querySelector('.countries-container');

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(value)
  );

  countriesContainer.innerHTML = '';

  filtered.forEach(country => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `country.html?name=${country.name.common}`;

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="flag">
      <div class="card-text">
        <h4>${country.name.common}</h4>
        <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region:</b> ${country.region}</p>
        <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
      </div>
    `;

    countriesContainer.append(countryCard);
  });

  // suggestions
  suggestions.innerHTML = '';
  if (value === '') return;

  filtered.slice(0, 5).forEach(country => {
    const li = document.createElement('li');
    li.textContent = country.name.common;

    li.onclick = () => {
      searchInput.value = country.name.common;
      suggestions.innerHTML = '';
    };

    suggestions.append(li);
  });
});



console.log(country.name.common, country.cca3);


