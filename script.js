document.getElementById("cultureSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("cultureInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "https://api.harvardartmuseums.org/object?q=people.culture:" + value + "&apikey=158f3020-52c2-11ea-b8be-c9817d3722a4";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      if (json.records.length === 0) {
        results += "<h2>Sorry, we couldn't find any " + value + " artworks.</h2>";
      } else {
        results += "<h2>Here is your selection of " + value + " artworks!</h2>";
      }
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
          results += "<h4> <a href='" + json.records[i].url + "'> View Page at Harvard</a></h4>";
          results += "<h4>" + "Page views: " + json.records[i].totalpageviews + "</h4>";
          results += '</div>';
        }
      }
      results += '</div>';

      document.getElementById("cultureResults").innerHTML = results;
    });

});