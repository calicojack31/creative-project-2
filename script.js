/*
function doesFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
}
*/


document.getElementById("cultureSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("cultureInput").value;
  if (value === "")
    return;
  console.log(value);

  //const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=7cdcb7998d2273d430549d3fdd569083";
  //const url = "http://tastedive.com/api/similar?q=" + value + "&k=356160-Computer-AHFW7BJ2";
  const url = "https://api.harvardartmuseums.org/object?q=people.culture:" + value + "&apikey=158f3020-52c2-11ea-b8be-c9817d3722a4";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h2>Here is your selection of " + value + " artworks!</h2>";
      //NEED TO MAKE THIS A LOOP, for records.length
      //NEED SOME WAY TO MAKE PHOTOS SIZED BETTER
      results += '<div class="row">';
      for (let i = 0; i < json.records.length; i++) {
        if (json.records[i].primaryimageurl === null || json.records[i].primaryimageurl === undefined) {
          continue;
        } else {
          results += '<div class="col-md">';
          results += "<img src=" + "'" + json.records[i].primaryimageurl + "'" + "class='art-image img-fluid'/>";
          results += "<h4>" + json.records[i].people[0].role + ": " + json.records[i].people[0].displayname + "</h4>";
          results += "<h4>" + "Dated: " + json.records[i].dated + "</h4>";
          results += "<h4>" + "Technique: ";
          if (json.records[i].technique === null) {
            results += "Unavailable</h4>";
          } else {
            results += json.records[i].technique + "</h4>";
          }
          results += "<h4>" + "Page views: " + json.records[i].totalpageviews + "</h4>";
          results += '</div>';
        }
      }
      results += '</div>';

      //results += "<h4>" + json.similar.info.name + "<h4>";
      /*
      results += '<h2 class="section-title">Weather in ' + json.name + " as of " + moment(json.dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
      for (let i = 0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" class="weather-icon"/>';
        results += "<p class='weather-description'>" + json.weather[i].main + ", " + json.clouds.all + "% Cloudy</p>";
      }
      results += '<h4>' + "Temperature: " + json.main.temp + " &deg;F</h4>"; //I added the semicolon
      results += "<h4>" + "Feels Like: " + json.main.feels_like + " &deg;F</h4>";
      results += "<h4>" + "High: " + json.main.temp_max + " &deg;F</h4>";
      results += "<h4>" + "Low: " + json.main.temp_min + " &deg;F</h4>";
      results += "<h4>" + "Humidity: " + json.main.humidity + "%</h4>";
      results += "<h4>" + "Wind Speed: " + json.wind.speed + " m/s</h4>";
      results += "<h4>" + "Wind Direction: ";
      if (json.wind.deg === undefined) {
        results += "Presently unavailable for this location</h4>";
      } else {
        results += json.wind.deg + "&deg;</h4>";
      }
      */
      document.getElementById("cultureResults").innerHTML = results;
    });

  /*
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=7cdcb7998d2273d430549d3fdd569083";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let forecast = "";
        forecast += "<h2 class='section-title'>Five-day/Three-Hour Forecast for " + json.city.name + "</h2>";
        forecast += '<div class ="row">';
        for (let i = 0; i < json.list.length; i++) {
          forecast += '<div class="col-sm">';
          forecast += "<h5>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h5>";
          forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" class="weather-icon"/>';
          forecast += "<p class='weather-description'>" + json.list[i].weather[0].main + ", " + json.list[i].clouds.all + "% Cloudy</p>";
          forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
          forecast += "<p>High: " + json.list[i].main.temp_max + " &deg;F</p>";
          forecast += "<p>Low: " + json.list[i].main.temp_min + " &deg;F</p>";
          forecast += "<p>Humidity: " + json.list[i].main.humidity + "%</p>";
          forecast += "<p>Wind Speed: " + json.list[i].wind.speed + " m/s</p>";
          forecast += '</div>';
        }
        forecast += '</div>';
        document.getElementById("forecastResults").innerHTML = forecast;
      });
  */

});