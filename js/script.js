// auto initialized content. this needs to be placed into objects and then
// instantiated from within the document ready function
$(document).ready(function() {
  // create locations object, this will serve as object information for all
  // things pertaining to
  var locations = {
    name: ["Steamer Lane", "Rincon", "Trestles"],
    id: ["santaCruz", "carpenteria", "sanClemente"]
  };

// loop through length using each jquery method
  var buildList = function() {
    // get length of locations options
    var location = locations.name;

    $(location).each(function(index) {
      // get unordered list element
      var ul = $("#globalNavContent");
      // add list items to global nav ul
      ul.append("<li>");
      // get list item
      var li = $("#globalNavContent li");
      // apply classes
      li.addClass("globalNavList");
    });
  }();

// build the nav links function
  var buildNavLinks = function() {
    // get list items
    var li = $("li.globalNavList");
    // append anchor tag
    li.append("<a href='#'></a>");

    // get newly defined anchor tag
    var a = $(".globalNavList a");

    // for each anchor tag selected, match the string from the name object
    a.each(function(i) {
      $(this).attr("id", locations.id[i]);
      $(this).text(locations.name[i]);
    });
  }();
});


// WEATHER AND MARINE INFO CALLS


// store the ajax object, wave object, weather object all into the same
// immediately instantiated call
var local = {

  // get air temp for location
  airTemp: function(data) {
    // return air temp information as a string
    var temp = data.data.current_condition[0].temp_F;
    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(temp);
  },

  // local time -- this needs to be called independent of the ajax calls, as the
  // functions calling the ajaxCalls are handling data as arguments. Call this
  // independently.
  time: function() {
    var gmt = new Date();
    var time = gmt.toLocaleTimeString();
    // return time as a string
    //return console.log(time);
    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(time);
  },

  winddirection: function(data) {
    //wind direction
    var w_dir = data.data.current_condition[0].winddirDegree,
        windDir;

    if (w_dir < 0) {
      windDir = "North";
      } else if (w_dir < 45) {
        windDir = "North East";
      } else if (w_dir < 90) {
        windDir = "East";
      } else if (w_dir < 135) {
        windDir = "South East";
      } else if (w_dir < 180) {
        windDir = "South";
      } else if (w_dir < 225) {
        windDir = "South West";
      } else if (w_dir < 270) {
        windDir = "West";
      } else if (w_dir < 315) {
        windDir = "North West";
      }
    // return wind direction as a string
    //return console.log(windDir);
    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(windDir);
  },

  windspeed: function(data) {
    // return windspeed as a string
    //return console.log(data.data.current_condition[0].windspeedMiles);
    var windSpeed = data.data.current_condition[0].windspeedMiles;
    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(windSpeed);
  },

  skies: function(data) {
    // weather Description returned as string
    //return console.log(data.data.current_condition[0].weatherDesc[0].value);
    var currently = data.data.current_condition[0].weatherDesc[0].value;

    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(currently);
  },
  waveSize: function(data) {
    // get swell height - returned as a number
    var wSizeM = data.data.weather[0].hourly[0].swellHeight_m,
        // translates into feet
        wSizeF = (wSizeM * 3.28).toPrecision(3);
    //return console.log(wSizeF + " feet. Wave size.");
    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(wSizeF);
  },
  swellDirection: function(data) {
      // get swell direction as a number
      var swellDir = data.data.weather[0].hourly[0].swellDir,
          sDir;
      if ( swellDir < 23 ) {
         sDir = "NNE";
      } else if ( swellDir < 45 ) {
         sDir = "NE";
      } else if ( swellDir < 69 ) {
         sDir = "ENE";
      } else if ( swellDir < 90 ) {
         sDir = "E";
      } else if ( swellDir < 116 ) {
         sDir = "ESE";
      } else if ( swellDir < 140 ) {
         sDir = "SE";
      } else if ( swellDir < 170 ) {
         sDir = "SSE";
      } else if ( swellDir < 190 ) {
         sDir = "S";
      } else if ( swellDir < 215 ) {
         sDir = "SSW";
      } else if ( swellDir < 235 ) {
         sDir = "SW";
      } else if ( swellDir < 255 ) {
         sDir = "WSW";
      } else if ( swellDir < 280 ) {
         sDir = "W";
      } else if ( swellDir < 305 ) {
         sDir = "WNW";
      } else if ( swellDir < 320 ) {
         sDir = "NW";
      } else if ( swellDir < 340 ) {
         sDir = "NNW";
      } else if ( swellDir > 341 ) {
         sDir = "N";
      }
      // return sDir as a string
      //return console.log(sDir + " swell direction");
      var cont = $("#remoteData");
      var li = $("<li></li>");

      cont.append(li);
      li.text(sDir);
  },
  waterTemp: function(data) {
    // gets water temp as a number
    var waterTemp = data.data.weather[0].hourly[0].waterTemp_F;     // gets water temp
    //return console.log(waterTemp + " degrees water.");

    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(waterTemp);
  },
  swellPeriod: function(data) {
    // gets swell period in seconds
    var sPeriod = data.data.weather[0].hourly[0].swellPeriod_secs;  // Swell period
    //return console.log(sPeriod + " swell period");

    var cont = $("#remoteData");
    var li = $("<li></li>");

    cont.append(li);
    li.text(waterTemp);
  }
};

// toScale object is for processing data into relative information, applications
// include wetsuit recommendations, optional wave scale system for your
// reports (4feet, waist-chest high etc.), optional conditions report
var conditionsToScale = {
  waveQuality: function(data) {
    var period = data.data.weather[0].hourly[0].swellPeriod_secs,
        swellSig;
    if ( period < 7 ) {
      swellSig = "Junky, short-period windswell";
    } else if ( period < 10 ) {
       swellSig = "Windswell";
    } else if ( period < 12 ) {
       swellSig = "Short period ground swell";
    } else if ( period > 12 ) {
       swellSig = "Long period ground swell";
    }
    return console.log(swellSig);
  },
  wetsuit: function(data) {
    var waterTemp = data.data.weather[0].hourly[0].waterTemp_F,
        wSuit;
    if ( waterTemp < 55 ) {
       wSuit = "5/4 Hooded Fullsuit";
    } else if ( waterTemp < 60 ) {
       wSuit = "4/3 Fullsuit";
    } else if ( waterTemp < 67 ) {
       wSuit = "3/2 Fullsuit";
    } else if ( waterTemp < 72 ) {
       wSuit = "Springsuit";
    } else if ( waterTemp < 75 ) {
       wSuit = "Vest & Trunks";
    } else if ( waterTemp > 75 ) {
       wSuit = "Trunks";
    }
    return console.log(wSuit);
  },
  relativeWaveSize: function(data) {
    // get local.waveSize() function
    var wSizeM = data.data.weather[0].hourly[0].swellHeight_m,
        wSizeF = (wSizeM * 3.28).toPrecision(3),
        wSize;
    // conditional to determine relative wave size
    if ( wSizeF < 1 ) {
        wSize = "Flat";
    } else if ( wSizeF < 3 ) {
      wSize = "Knee to waist high";
    } else if ( wSizeF < 4 ) {
      wSize = "Waist to chest high";
    } else if ( wSizeF < 5 ) {
      wSize = "Chest to head high";
    } else if ( wSizeF < 6 ) {
      wSize = "Head high";
    } else if ( wSizeF < 8 ) {
      wSize = "Overhead";
    } else if ( wSizeF < 12 ) {
      wSize = "Overhead to double overhead";
    } else if ( wSizeF < 18 ) {
      wSize = "Double to triple overhead";
    } else if (wSizeF > 18.1 ) {
      wSize = "Triple overhead plus";
    }
    return console.log(wSizeF);
  }
};

// store the land-based weather calls
var weatherCall = function(data) {
  local.winddirection(data);
  local.airTemp(data);
  local.windspeed(data);
  local.skies(data);
};

// store the ocean data here
var marineCall = function(data) {
  local.waveSize(data);
  local.swellDirection(data);
  local.waterTemp(data);
  local.swellDirection(data);
};

var relative = function(data) {
	conditionsToScale.relativeWaveSize(data);
  conditionsToScale.waveQuality(data);
  conditionsToScale.wetsuit(data);
};

// data objects that are compartmentalized and passed individual arguments
// from the wave data object. Allowing for customized and individual
// ajax calls to the worldweatheronline server
var ajaxCall = {
  cityUrl: [
    // santa cruz(0)
    "http://api.worldweatheronline.com/free/v1/weather.ashx?q=95062&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    // carpenteria(1)
    "http://api.worldweatheronline.com/free/v1/weather.ashx?q=93014&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    // san clemente(2)
    "http://api.worldweatheronline.com/free/v1/weather.ashx?q=92674&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
  ],
    waveUrl: [
      // steamers(0)
      "http://api.worldweatheronline.com/free/v1/marine.ashx?q=36.5%2C-122&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
      // rincon(1)
      "http://api.worldweatheronline.com/free/v1/marine.ashx?q=34.22%2C-119.28&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
      // trestles(2)
      "http://api.worldweatheronline.com/free/v1/marine.ashx?q=33.22%2C-117.36&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c"
    ],
  // take the info passed back from the server and prepare it
  data: $(this).serialize(),
  // set this function to shoot back a message if there are any issues with
  // the external ajax call
  error: function(){ console.log('better luck next time, bud!');}
};

// create a new constructor function calling the location information
var Location = function() {};

// create the weather method that pulls the location's weather information.
Location.prototype.weather = function(arg) {
  $.ajax({
          type: "POST",
          url: ajaxCall.cityUrl[arg],
          dataType: 'jsonp',
          success: function(data) {
            local.time();
            weatherCall(data);
          }
  });
};

// create new objects from the constructor, include index in comments to reference

var city = new Location(); // city.weather(arg);
// index 0 -- SANTA CRUZ
// index 1 -- CARPENTERIA
// index 2 -- SAN CLEMENTE

// create a Wave constructor function
var Wave = function() {};

// build method pulling location's weather url string.
Wave.prototype.conditions = function(arg) {
  $.ajax({
          type: "POST",
          url: ajaxCall.waveUrl[arg],
          dataType: 'jsonp',
          success: function(data) {
            marineCall(data);
          }
  });
};

// index 1 -- STEAMERS -- SANTA CRUZ
// index 3 -- RINCON -- CARPENTERIA
// index 5 -- TRESTLES -- SAN CLEMENTE
var wave = new Wave(); // wave.conditions(arg);

///////////////////////////////////////////////////////////////////////////////
// this function evaluates the current body id and alters the
// content of the page using json data containing location information.
var jsonData = function(arg) {
  var $content = $('#localData');
  var i = arg;
  // get rid of list items inside content area using jquery empty() method.
  $content.empty();
  $.getJSON('../waves/data/data.json', function(data) {
    $content.append($('<li><strong>Wave:</strong> ' + data.locations[i].title + '</li>'));
    $content.append($('<li><strong>City:</strong> ' + data.locations[i].city + '</li>'));
    $content.append($('<li><strong>About:</strong> ' + data.locations[i].description + '</li>'));
    $content.append($('<li><strong>Optimal wave size:</strong> Between ' + data.locations[i].waveMin + ' and ' + data.locations[i].waveMax + ' feet</li>'));
  });
};

$(document).ready(function() {
  var $anchor = $(".globalNavList a");
  $anchor.on("click", function() {
    // set class values
    $anchor.removeClass("active");
    $(this).addClass("active");

    // empty out remote data contents
    $("#remoteData li").empty();

    // add conditional to determine index
    if ($(this).attr("id") == "santaCruz") {
      jsonData(0);
      wave.conditions(0);
      city.weather(0);
    } else if ($(this).attr("id") == "carpenteria") {
      jsonData(1);
      wave.conditions(1);
      city.weather(1);
    } else {
      jsonData(2);
      wave.conditions(2);
      city.weather(2);
    }

  });
});
