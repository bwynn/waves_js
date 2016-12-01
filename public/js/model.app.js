/* --------------------- MODEL -----------------------------------------*/
// WEATHER AND MARINE INFO CALLS
// store the ajax object, wave object, weather object all into the same
// immediately instantiated call
var model = {
  locations: {
    name: ["Steamer Lane", "Rincon", "Trestles"],
    id: ["santaCruz", "carpenteria", "sanClemente"],
    className: ["santaCruz", "carpenteria", "sanClemente"],
    conditionsLabel: ["Time", "Wind Direction", "Air Temp F (degrees f)", "Wind Speed (mph)", "Skies", "Wave Size (feet)", "Swell Direction", "Water Temp (degrees f)", "Swell Period (seconds)", "Max Temp", "Sunrise", "Sunset"]
  },
  // data objects that are compartmentalized and passed individual arguments
  // from the wave data object. Allowing for customized and individual
  // ajax calls to the worldweatheronline server
  ajaxCall: {
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
  },

  local: {
    // add an object that lists off content to load into the template
    // this can be string-based
    // and then add a function that assigns out the information into the
    // array of list elements

    // get air temp for location
    airTemp: function(data) {
      // return air temp information as a string
      var temp = data.data.current_condition[0].temp_F;
      // build return and match to locations object
      //return view.contentItemBuilder(temp);
      return temp;
    },

    // local time -- this needs to be called independent of the ajax calls, as the
    // functions calling the ajaxCalls are handling data as arguments. Call this
    // independently.
    time: function() {
      var gmt = new Date();
      var time = gmt.toLocaleTimeString();
      var localTime = time.slice(0,11);
      // return time as a string
      //return console.log(time);
      //return view.contentItemBuilder(time);
      return localTime;
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
      //return view.contentItemBuilder(windDir);
      return windDir;
    },

    windspeed: function(data) {
      // return windspeed as a string
      //return console.log(data.data.current_condition[0].windspeedMiles);
      var windSpeed = data.data.current_condition[0].windspeedMiles;
      //return view.contentItemBuilder(windSpeed);
      return windSpeed;
    },

    skies: function(data) {
      // weather Description returned as string
      //return console.log(data.data.current_condition[0].weatherDesc[0].value);
      var currently = data.data.current_condition[0].weatherDesc[0].value;

      //return view.contentItemBuilder(currently);
      return currently;
    },
    maxTemp: function(data) {
      var maxTemp = data.data.weather[0].maxtempF;

      return maxTemp;
    },
    waveSize: function(data) {
      // get swell height - returned as a number
      var wSizeM = data.data.weather[0].hourly[0].swellHeight_m,
          // translates into feet
          wSizeF = (wSizeM * 3.28).toPrecision(3);
      //return console.log(wSizeF + " feet. Wave size.");
      //return view.contentItemBuilder(wSizeF);
      return wSizeF;
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
        //return view.contentItemBuilder(sDir);
        return sDir;
    },
    waterTemp: function(data) {
      // gets water temp as a number
      var waterTemp = data.data.weather[0].hourly[0].waterTemp_F;     // gets water temp
      //return console.log(waterTemp + " degrees water.");
      //return view.contentItemBuilder(waterTemp);
      return waterTemp;
    },
    swellPeriod: function(data) {
      // gets swell period in seconds
      var sPeriod = data.data.weather[0].hourly[0].swellPeriod_secs;  // Swell period
      //return console.log(sPeriod + " swell period");
      //return view.contentItemBuilder(sPeriod);
      return sPeriod;
    }
  },  // end local object
};
  // CONSTRUCTOR FUNCTIONS
  // create a new constructor function calling the location information
  Location = function() {};

  // create new objects from the constructor, include index in comments to reference

  var city = new Location(); // city.weather(obj,arg);
  // arg 0 -- SANTA CRUZ
  // arg 1 -- CARPENTERIA
  // arg 2 -- SAN CLEMENTE

  // create a Wave constructor function
  var Wave = function() {};
  // index 0 -- STEAMERS -- SANTA CRUZ
  // index 1 -- RINCON -- CARPENTERIA
  // index 2 -- TRESTLES -- SAN CLEMENTE
  var wave = new Wave(); // wave.conditions(arg);

  // create the weather method that pulls the location's weather information.
  // takes an object
  Location.prototype.weather = function(urlString, cont, index) {
    $.ajax({
            type: "POST",
            url: urlString[index],
            dataType: 'jsonp',
            success: function(data) {
              // local time
              view.pageStructure.listBuilder(model.local.time(), model.locations.conditionsLabel[0], cont);
              // air temp
              view.pageStructure.listBuilder(model.local.airTemp(data), model.locations.conditionsLabel[2], cont);
              // skies
              view.pageStructure.listBuilder(model.local.skies(data), model.locations.conditionsLabel[4], cont);
              // wind direction
              view.pageStructure.listBuilder(model.local.winddirection(data), model.locations.conditionsLabel[1], cont);
              // wind speed
              view.pageStructure.listBuilder(model.local.windspeed(data), model.locations.conditionsLabel[3], cont);
            }
    });
  };

  Location.prototype.userWeather = function(urlString, cont, index) {
    $.ajax({
            type: "POST",
            url: urlString[index],
            dataType: 'jsonp',
            success: function(data) {
              // local time
              view.pageStructure.listBuilder(model.local.time(), model.locations.conditionsLabel[0], cont);
              // air temp
              view.pageStructure.listBuilder(model.local.airTemp(data), model.locations.conditionsLabel[2], cont);
              // skies
              view.pageStructure.listBuilder(model.local.skies(data), model.locations.conditionsLabel[4], cont);
              // wind direction
              view.pageStructure.listBuilder(model.local.winddirection(data), model.locations.conditionsLabel[1], cont);
              // wind speed
              view.pageStructure.listBuilder(model.local.windspeed(data), model.locations.conditionsLabel[3], cont);
              // max Temp
              view.pageStructure.listBuilder(model.local.maxTemp(data), model.locations.conditionsLabel[9], cont);
              // Sun Rise
              /*view.pageStructure.listBuilder(model.local.sunRise(data), model.locations.conditionsLabel[10], cont);
              // Sun Set
              view.pageStructure.listBuilder(model.local.sunSet(data), model.locations.conditionsLabel[11], cont);*/
            }
    });
  }

  // build method pulling location's weather url string.
  Wave.prototype.conditions = function(arg, cont) {
    $.ajax({
            type: "POST",
            url: model.ajaxCall.waveUrl[arg],
            dataType: 'jsonp',
            success: function(data) {
              // wave size
              view.pageStructure.listBuilder(model.local.waveSize(data), model.locations.conditionsLabel[5], cont);
              // water temperature (fahrenheit)
              view.pageStructure.listBuilder(model.local.waterTemp(data), model.locations.conditionsLabel[7], cont);
              // swell direction
              view.pageStructure.listBuilder(model.local.swellDirection(data), model.locations.conditionsLabel[6], cont);
              // swell period
              view.pageStructure.listBuilder(model.local.swellPeriod(data), model.locations.conditionsLabel[8], cont);
            }
    });
  };
