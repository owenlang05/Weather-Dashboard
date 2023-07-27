var apiKey = 'bcca9cde2077618db7f70b7605e37960';



var city = $('#city')
var searchBtn = $('#search')
var pastCities = $('#past-cities')
var searchBox = $('#city-form')
var forecastDates = $('#5forecast').children().children('h3');
var forecastList = $('#5forecast').children().children('ul').children();
var forecastImages = $('#5forecast').children().children('img')
var today = dayjs().format('M/D/YYYY')


function loadDates() {
  city.text(`(${today})`)
  var day;
  for (var i = 1; i <= 5; i++){
    
    day = Number(dayjs().format('D'))
    var header = $(forecastDates[i-1])
    header.text(dayjs().date(day+i).format('M/D/YYYY'))
  }
}





function searchCities(evt) {
    evt.preventDefault();

    var cityInput = searchBox.val();
    
    if (!cityInput) {
        return;
    }
    
    var geocoderURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`

    fetch(geocoderURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    }).then(function (location) {
        var lat = location[0].lat;
        var long = location[0].lon;

        city.text(location[0].name + ` (${today})`);

        var weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
      fetch(weatherURL)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }

        return response.json();
      }).then(function (weather) {
        console.log(weather)
        for (var i = 0; i < 5; i++){
          var j = i * 8
          var img = $(forecastImages[i])
          var imageUrl = `https://openweathermap.org/img/wn/${weather.list[j].weather[0].icon.substring(0, 2)}d@2x.png`

          img.attr('src', imageUrl);
          img.css('display', 'block')
          console.log(forecastList)
          forecastList[i * 3].innerHTML = 'Temp: ' + weather.list[j].main.temp + ' °F';
          forecastList[i * 3 + 1].innerHTML = 'Wind: ' + weather.list[j].wind.speed + 'MPH';
          forecastList[i * 3 + 2].innerHTML = 'Humidity: ' + weather.list[j].main.humidity + '%';
        }
      })
    })
    .catch(function (error) {
        console.error(error);
    });
}

loadDates();
searchBtn.on('click', searchCities);