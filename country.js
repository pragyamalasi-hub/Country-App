const variable= new URLSearchParams(location.search).get('name');
const Info= document.querySelector('.country-info');
const modeChanger = document.querySelector('.mode-change');

// apply saved theme on load
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


fetch(`https://restcountries.com/v3.1/name/${variable}?fullText=true`)
.then(res => res.json())
.then( data => {
    data.forEach(country =>{
        // console.log(country);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('country-info');
        
        infoContainer.innerHTML= `
            <img src= "${country.flags.svg}" alt="flag">
            <div class="text">
                <h1>${country.name.common}</h1>
                <div class="country-title">
                    <div class="left">
                        <p><strong>Native Name: </strong>${Object.values(country.name.nativeName)[0].common}</p>
                        <p><strong>Population: </strong>${country.population.toLocaleString()}</p> 
                        <p><strong>Region: </strong>${country.region}</p> 
                        <p><strong>Sub Region: </strong>${country.subregion}</p> 
                        <p><strong>Capital: </strong>${country.capital}</p>
                    </div>

                    <div class="right">
                        <p><strong>Top Level Domain: </strong>${country.tld}</p>  
                        <p><strong>Currencies: </strong>${Object.values(country.currencies)[0].name}</p> 
                        <p><strong>Languages: </strong>${Object.values(country.languages).join(', ')}</p> 
                    </div>



                </div>

                
                
                `
                // IF THE COUNTRY HAS BORDERS, WE MAP OVER THE BORDERS ARRAY AND CREATE AN ANCHOR TAG FOR EACH BORDER COUNTRY, LINKING TO ITS RESPECTIVE PAGE. IF THERE ARE NO BORDERS, WE DISPLAY 'NONE'.
                
                // country.borders ? ... : ...

                    //  This is a ternary operator.

                    //It works like:

                    //condition ? valueIfTrue : valueIfFalse

                // VERY IMPORTANT 


            
         

        Info.append(infoContainer);


    })
})

