import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

import './css/styles.css';

const countryList = document.querySelector('.country-list');
const countryContainer = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

const singleCountryToHtmlString = countryObj =>
  `<img class="Country-flags" src="${countryObj.flags.svg}" alt="${
    countryObj.name.official
  }" /><h1>${countryObj.name.official}</h1><p>Capital:${
    countryObj.capital
  }</p><p>Population:${countryObj.population}</p><p>Languages: ${Object.values(
    countryObj.languages
  ).map((language, idx, arr) =>
    arr.length - 1 === idx ? language : `${language}, `
  )}</p>`;

const multiCountryToHtmlString = countryObj =>
  `<li><img class="Country-flags" src="${countryObj.flags.svg}" alt="${countryObj.name.official}" /><p>${countryObj.name.official}</p></li>`;

const showCountries = async () => {
  const inputValue = input.value.trim();

  countryContainer.innerHTML = '';
  countryList.innerHTML = '';

  if (inputValue.length < 2)
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );

  try {
    const data = await fetchCountries(inputValue);

    if (data.length === 1)
      return (countryContainer.innerHTML = singleCountryToHtmlString(data[0]));

    const countriesHtmlArr = data.map(multiCountryToHtmlString);

    countryList.innerHTML = countriesHtmlArr.join('');
  } catch (err) {
    Notiflix.Notify.failure('Ooops, there is no country with that name');
  }
};

const debounceCountries = debounce(showCountries, DEBOUNCE_DELAY);

input.addEventListener('input', debounceCountries);
