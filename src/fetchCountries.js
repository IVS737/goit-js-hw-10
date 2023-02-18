export const fetchCountries = name =>
  new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    );

    if (response.status >= 400) return reject();

    return resolve(response.json());
  });
