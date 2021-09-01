const countryContainer = document.getElementById("country-container");
const countryDetails = document.getElementById("country-details");
const errorNotify = document.getElementById("error-notify");

const loadData = () => {
  const inputFeild = document.getElementById("input-feild");
  const searchText = inputFeild.value;
  if (searchText === "") {
    errorNotify.innerHTML = `
      <h2 class="text-danger">Please write something!!!</h2>
      `;
    //clear details when researched
    countryContainer.textContent = "";
    countryDetails.innerHTML = "";
  } else {
    errorNotify.innerHTML = "";
    const url = `https://restcountries.eu/rest/v2/name/${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayContries(data));
  }
  inputFeild.value = "";
};

//Display searched country
const displayContries = (countries) => {
  //clear details
  countryContainer.textContent = "";
  countryDetails.innerHTML = "";
  //   console.log(countries);
  if (countries.status === 404) {
    errorNotify.innerHTML = `
    <h2 class="text-danger">No result found!!!</h2>
    `;
  } else {
    countries.forEach((country) => {
      // errorNotify
      errorNotify.innerHTML = "";
      // console.log(country);

      const countryDiv = document.createElement("div");
      countryDiv.classList.add("col-md-3");
      countryDiv.innerHTML = ` 
      <div class="rounded overflow-hidden border p-2">
        <img
          src="${country.flag}"
          class="w-100"
          alt=""
        />
      </div>
  
      <div
        class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        "
      >
        <h3>${country.name} </h3>
        <button onclick="displayCountry('${country.alpha2Code}')" class="btn btn-dark">Learn More</button>
      </div>
      `;
      countryContainer.appendChild(countryDiv);
    });
  }
};

//load data with alpha code
const displayCountry = (alpha) => {
  const url = `https://restcountries.eu/rest/v2/alpha/${alpha}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data));
};

//display country details
const displayDetails = (country) => {
  countryDetails.innerHTML = "";
  console.log(country);

  const countryDiv = document.createElement("div");
  countryDiv.innerHTML = `
  <div class="rounded overflow-hidden border p-2">
      <img
        src="${country.flag}"
        class="w-100"
        alt=""
      />
    </div>

    <div
      class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
      "
    >
      <h3 class="fw-bold">${country.name} </h3>
      <h4 class= "text-secondary">Population: ${country.population} </h4>
      <h4 class= "text-info">Currency: ${country.currencies[0].symbol} </h4>
    </div>
  `;
  countryDetails.appendChild(countryDiv);
};
