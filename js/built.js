// store the ajax object, wave object, weather object all into the same
// immediately instantiated call
var local = {

  // get air temp for location
  airTemp: function(data) {
    // return air temp information as a string
    return console.log(data.data.current_condition[0].temp_F);
  },

  // local time
  time: function() {
    var gmt = new Date();
    var time = gmt.toLocaleTimeString();
    // return time as a string
    return console.log(time);
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
    return console.log(windDir);
  },

  windspeed: function(data) {
    // return windspeed as a string
    return console.log(data.data.current_condition[0].windspeedMiles);
  },

  skies: function(data) {
    // weather Description returned as string
    return console.log(data.data.current_condition[0].weatherDesc[0].value);
  },
  waveSize: function(data) {
    // get swell height - returned as a number
    var wSizeM = data.data.weather[0].hourly[0].swellHeight_m,
        // translates into feet
        wSizeF = (wSizeM * 3.28).toPrecision(3);
    return console.log(wSizeF + " feet. Wave size.");
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
      return console.log(sDir + " swell direction");
  },
  waterTemp: function(data) {
    // gets water temp as a number
    var data;
    var waterTemp = data.data.weather[0].hourly[0].waterTemp_F;     // gets water temp
    return console.log(waterTemp + " degrees water.")
  },
  swellPeriod: function(data) {
    // gets swell period in seconds
    var sPeriod = data.data.weather[0].hourly[0].swellPeriod_secs;  // Swell period
    return console.log(sPeriod + " swell period");
  }
};

// toScale object is for processing data into relative information, applications
// include wetsuit recommendations, optional wave scale system for your
// reports (4feet, waist-chest high etc.), optional conditions report
var toScale = {
  waveQuality: function() {
    var period = local.swellPeriod(),
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
    return swellSig;
  },
  wetsuit: function() {
    var waterTemp = local.waterTemp(),
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
  },
  relativeWaveSize: function() {
    // get local.waveSize() function
    var wSizeF = local.waveSize(),
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
    return wSize;
  }
};

// store the land-based weather calls
var weatherCall = function(data) {
  local.time();
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

// data objects that are compartmentalized and passed individual arguments
// from the wave data object. Allowing for customized and individual
// ajax calls to the worldweatheronline server
var ajaxCall = {
  type: "POST",
  dataType: 'jsonp',
  url: [
    // santa cruz
      //weather [0]
    "http://api.worldweatheronline.com/free/v1/weather.ashx?q=95062&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
      //waves [1]
    "http://api.worldweatheronline.com/free/v1/marine.ashx?q=36.5%2C-122&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    // carpenteria
      // weather [2]
    "http://api.worldweatheronline.com/free/v1/weather.ashx?q=93014&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
      // waves [3]
    "http://api.worldweatheronline.com/free/v1/marine.ashx?q=34.22%2C-119.28&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    // san clemente
      // weather [4]
    "http://api.worldweatheronline.com/free/v1/weather.ashx?q=92674&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
      // waves [5]
      "http://api.worldweatheronline.com/free/v1/marine.ashx?q=33.22%2C-117.36&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c"
  ],
  // take the info passed back from the server and prepare it
  data: $(this).serialize(),
  // set this function to shoot back a message if there are any issues with
  // the external ajax call
  error: function(){ console.log('better luck next time, bud!');}
};

// wrap ajax object into a function to execute when variable is called.
var santaCruz = function() {
  $.ajax({
          type: ajaxCall.type,
          url: ajaxCall.url[0],
          dataType: ajaxCall.dataType,
          success: function(data) {
            weatherCall(data);
          },
  });
};
// Marine info call
var steamers = function() {
  $.ajax({
          type: ajaxCall.type,
          url: ajaxCall.url[1],
          dataType: ajaxCall.dataType,
          success: function(data) {
            marineCall(data);
          },
  });
};
// carpenteria weather
var carpenteria = function() {
  $.ajax({
          type: ajaxCall.type,
          url: ajaxCall.url[2],
          dataType: ajaxCall.dataType,
          success: function(data) {
            weatherCall(data);
          },
  });
};
// rincon marine data
var rincon = function() {
  $.ajax({
          type: ajaxCall.type,
          url: ajaxCall.url[3],
          dataType: ajaxCall.dataType,
          success: function(data) {
            marineCall(data);
          },
  });
};
// san clemente weather
var sanClemente = function() {
  $.ajax({
          type: ajaxCall.type,
          url: ajaxCall.url[4],
          dataType: ajaxCall.dataType,
          success: function(data) {
            weatherCall(data);
          },
  });
}
// trestles marine data
var trestles = function() {
  $.ajax({
          type: ajaxCall.type,
          url: ajaxCall.url[5],
          dataType: ajaxCall.dataType,
          success: function(data) {
            marineCall(data);
          },
  });
};
