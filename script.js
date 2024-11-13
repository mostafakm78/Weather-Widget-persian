const apikey = "332ec44e649602f9e7142ce74f626a3a"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fa&q="


const Dark = document.querySelector('#dark')
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')
const weatherInfo = document.querySelector('.weather-info')

Dark.addEventListener('click' , () => {
    document.body.classList.toggle('dark-mode')
    if (document.body.classList.contains('dark-mode')) {
        Dark.classList.add('fa-sun-o')
        Dark.classList.remove('fa-moon-o')
    } else {
        Dark.classList.remove('fa-sun-o')
        Dark.classList.add('fa-moon-o')
    }
})


async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`)

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather-info').style.display = 'none'
    } else {

        let data = await response.json()

    console.log(data)

    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.tempo').innerHTML = Math.round(data.main.temp) + '°c'
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h'

    if (data.weather[0].main == 'Clear') {
        weatherIcon.src = "./images/clear.png"
    } else if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = "./images/clouds.png"
    } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = "./images/rain.png"
    } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = "./images/drizzle.png"
    } else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = "./images/mist.png"
    }
    document.querySelector('.error').style.display = 'none'
    document.querySelector('.weather-info').style.display = 'block'

    }
}

searchBox.addEventListener('keypress' , (event) => {
    // console.log(event)
    if (event.key == 'Enter') {
        checkweather(searchBox.value)
    }
})

searchBtn.addEventListener('click' , () => {
    checkweather(searchBox.value)
})



checkweather()
