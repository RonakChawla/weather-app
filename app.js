const weatherApi = {
    key: "73298eb87e503e61deeb00d18caa8539",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
})

function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .then(showWeatherReport);
}

function showWeatherReport(weather){
    if(weather.message === 'city not found'){
        alert("The weather for this city is currently unavailable. Please enter some nearby city.");
        document.querySelector('.weather-body').style.display = "none";
    }

    document.getElementById('city').innerHTML = `${weather.name}, ${weather.sys.country}`;
    document.getElementById('temp').innerHTML = `${weather.main.temp}&deg;C`;
    document.getElementById('min-max').innerHTML = `${weather.main.temp_min}&deg;C(min) / ${weather.main.temp_max}&deg;C(max)`;
    let waetherType = document.getElementById('weather');
    waetherType.innerHTML = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(waetherType.textContent === 'Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if(waetherType.textContent === 'Clouds' || waetherType.textContent === 'Haze'){
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    } else if(waetherType.textContent === 'Sunny'){
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    } else if(waetherType.textContent === 'Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    } else if(waetherType.textContent === 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if(waetherType.textContent === 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }

    if(`${weather.name}` === document.getElementById('input-box').value){
        showAlert("Results updated...");
    }
}

function dateManage(dateArg){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`
}

function showAlert(message){
    clearAlert();

    const div = document.createElement('div');
    div.className = 'alert-msg';

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.app-main');

    const search = document.getElementById('weather-body');

    container.insertBefore(div, search);

    setTimeout(() => {
        clearAlert();
    }, 5000);
}

function clearAlert(){
    const currentAlert = document.querySelector('.alert-msg');

    if(currentAlert){
        currentAlert.remove();
    }
}