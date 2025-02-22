const search = document.querySelector(".js-search");
const list = document.querySelector(".js-list");



search.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault()
    const { query, days } = evt.currentTarget.elements
getWeather(query.value, days.value)
    .then(data => console.log(createMarkup(data.forecast.forecastday)))
    .catch(err => console.log(err));
}


function getWeather(city, days) {
    //http://api.weatherapi.com/v1/forecast.json?key=a3ebf628800840f4a37220957252202&q=Paris&days=5
    const BASE_URL = 'http://api.weatherapi.com/v1';
    const API_KEY = 'a3ebf628800840f4a37220957252202';

  return  fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        })
    
};

function createMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { icon, text } } }) => `<li>
        <img src="${icon}" alt="${text}">
        <p>${text}</p>
        <h2>${date}</h2>
        <h3>${avgtemp_c}</h3>
      </li>`).join('')
};