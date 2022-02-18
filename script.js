const api = {
    key : "616a2fad2fb7f670cb3a0da26a064056",
    base_url:"https://api.openweathermap.org/data/2.5/weather?"
}
const input = document.querySelector('.search');
const city_elem = document.querySelector('.city');
const date_elem = document.querySelector('.date');
const temp_elem = document.querySelector('.temp');
const weather_elem = document.querySelector('.weather');
const hilow_elem = document.querySelector('.hi-lo');

//let city = "Kanpur";

input.addEventListener('keypress',setQuery);
function setQuery(evt){
    if(evt.keyCode == 13){  // ascii for enter key is 13
        weather_data(input.value);
        console.log(input.value);
    }
}


//promises are used here
function weather_data(city){
    fetch(`${api.base_url}q=${city}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
    .catch(function(){
        alert("Please Enter a Valid City ");
        console.log("error-line31");
    }); 
}
function displayResults(weather){
    console.log("Data Fetched");
    console.log(weather);
    temp_elem.textContent = `${Math.round(weather.main.temp)} °C`;
    city_elem.textContent = `${weather.name}, ${weather.sys.country}`;
    generateDate();
    weather_elem.textContent = weather.weather[0].main;
    hilow_elem.textContent = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}
function generateDate(){
    const days = ['Sunday','Monday','Tuesday','Wednessday','Thursday','Friday','Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    date_elem.textContent = `${days[d.getUTCDay()]} ${d.getUTCDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
