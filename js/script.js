// topNav() function sets page template for the application
function topNav() {
  //using jQuery
  var $bodyWrap = $('#bodyWrap');
  var $nav = $('#nav a');
  $nav.on('click', function(e){
    e.preventDefault();
    switch ($(this).attr('href')) {
      case 'best-conditions.html' :
        $bodyWrap.load('best-conditions.html').hide().fadeIn('slow');
        break;
      case 'index.html' :
        $bodyWrap.load('bestbet.html').hide().fadeIn('slow');
        break;
    }
  });
};

// calls the data response templates -- not the actual data
// but the html base template the data is place into
function subNav() {
  var $subNav = $('#subNav a');

  $subNav.on('click', function(e) {
    e.preventDefault();

    var $statsWrap = $('#statsWrap');

    switch($(this).attr('href')) {
      case 'best-conditions.html' :
        $statsWrap.load('bestbet.html').hide().fadeIn('slow');
        break;
      case 'waves.html' :
        $statsWrap.load('waves.html').hide().fadeIn('slow');
        break;
      case 'weather.html' :
        $statsWrap.load('weather.html').hide().fadeIn('slow');
        break;
    }
  });
}

function weatherCalls() {

  var api = "c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c";                 // api call
  var waves = $(this);                                                  // sets $(this) value globally for wave

  function santaCruzWeather() {
  $.ajax({
    type: 'POST',
    url: "http://api.worldweatheronline.com/free/v1/weather.ashx?q=95062&format=json&date=today&key=" + api,
    dataType: 'jsonp',
    data: waves.serialize(),
    success: function(data){
        localTime(data);                                                // calls localTime function
        airTemp(data);                                                  // calls airTemp function
        windConditions(data);                                           // calls windDirection function
        generalConditions(data);                                        // calls generalConditions function
      },
    error: function(e) {console.log('epic fail')}
    });
  };

  function santaCruzMarineCall() {                                      // declare santaCruzMarineCall function
          $.ajax({                                                      // jQuery ajax declaration
      type: 'POST',                                                     // declare type of ajax call
      url: "http://api.worldweatheronline.com/free/v1/marine.ashx?q=36.5%2C-122&format=json&date=today&key=" + api,
      dataType: 'jsonp',                                                // declare dataType, using parsed json
      data: waves.serialize(),                                          // setting $(this).serialize() using waves variable
      success: function(data){                                          // successful api call performs function
        swellSize(data);                                                // calls swellSize function
        swDir(data);                                                    // calls swDir function
        wetsuit(data);                                                  // calls wetsuit function
        swellPeriod(data);                                              // calls swellPeriod function
      },
      error: function(e) {console.log('epic marine fail')}
    });
  };

  function carpenteriaWeather() {

    $.ajax({
      type: 'POST',
      url: "http://api.worldweatheronline.com/free/v1/weather.ashx?q=93014&format=json&date=today&key=" + api,
      dataType: 'jsonp',
      data: waves.serialize(),
      success: function(data){
          localTime(data);                                                // calls localTime function
          airTemp(data);                                                  // calls airTemp function
          windConditions(data);                                           // calls windDirection function
          generalConditions(data);                                        // calls generalConditions function
        },
      error: function(e) {console.log('epic fail')}
      });
  };

  function carpenteriaMarineCall() {                                      // declare santaCruzMarineCall function
      $.ajax({                                                            // jQuery ajax declaration
        type: 'POST',                                                     // declare type of ajax call
        url: "http://api.worldweatheronline.com/free/v1/marine.ashx?q=34.22%2C-119.28&format=json&date=today&key=" + api,
        dataType: 'jsonp',                                                // declare dataType, using parsed json
        data: waves.serialize(),                                          // setting $(this).serialize() using waves variable
        success: function(data){                                          // successful api call performs function
          swellSize(data);                                                // calls swellSize function
          swDir(data);                                                    // calls swDir function
          wetsuit(data);                                                  // calls wetsuit function
          swellPeriod(data);                                              // calls swellPeriod function
        },
        error: function(e) {console.log('epic marine fail')}
      });
  };

  function sanClementeWeather() {
  $.ajax({
    type: 'POST',
    url: "http://api.worldweatheronline.com/free/v1/weather.ashx?q=92674&format=json&date=today&key=" + api,
    dataType: 'jsonp',
    data: waves.serialize(),
    success: function(data){
        localTime(data);                                                // calls localTime function
        airTemp(data);                                                  // calls airTemp function
        windConditions(data);                                           // calls windDirection function
        generalConditions(data);                                        // calls generalConditions function
      },
    error: function(e) {console.log('epic fail')}
    });
  };

  function sanClementeMarineCall() {                                      // declare santaCruzMarineCall function
      $.ajax({                                                            // jQuery ajax declaration
        type: 'POST',                                                     // declare type of ajax call
        url: "http://api.worldweatheronline.com/free/v1/marine.ashx?q=33.22%2C-117.36&format=json&date=today&key=" + api,
        dataType: 'jsonp',                                                // declare dataType, using parsed json
        data: waves.serialize(),                                          // setting $(this).serialize() using waves variable
        success: function(data){                                          // successful api call performs function
          swellSize(data);                                                // calls swellSize function
          swDir(data);                                                    // calls swDir function
          wetsuit(data);                                                  // calls wetsuit function
          swellPeriod(data);                                              // calls swellPeriod function
        },
        error: function(e) {console.log('epic marine fail')}
      });
  };

  function localTime(data) {
    // local time
    var gmt = new Date();
    console.log('Time: ' + gmt);
  };

  function airTemp(data) {
    //temperature
    var temp = data.data.current_condition[0].temp_F;
    console.log('Degrees f: '+ temp);
  };

  function windConditions(data) {
    //wind direction
    var w_dir = data.data.current_condition[0].winddirDegree;
    var w_speed = data.data.current_condition[0].windspeedMiles;

    if (w_dir < 0) {
    var windDir = "North";
      } else if (w_dir < 45) {
    var windDir = "North East";
        } else if (w_dir < 90) {
    var windDir = "East";
        } else if (w_dir < 135) {
    var windDir = "South East";
          } else if (w_dir < 180) {
    var windDir = "South";
            } else if (w_dir < 225) {
    var windDir = "South West";
              } else if (w_dir < 270) {
    var windDir = "West";
                } else if (w_dir < 315) {
    var windDir = "North West";
                  }
    console.log('Wind: From the ' + windDir + ' at ' + w_speed + ' mph');
  };

  function generalConditions(data) {
    // weather Description
    var w_desc = data.data.current_condition[0].weatherDesc[0].value;
    console.log('Skies: ' + w_desc);

  };

  function swellSize(data) {                                          // declare receive function taking data as the argument
    var wSizeM = data.data.weather[0].hourly[0].swellHeight_m;      // gets swell height in meters
    var wSizeF = (wSizeM * 3.28).toPrecision(3);                    // meters to feet
    if ( wSizeF < 1 ) {
      var wSize = "Flat";
    } else if ( wSizeF < 3 ) {
      var wSize = "Knee to waist high";
    } else if ( wSizeF < 4 ) {
      var wSize = "Waist to chest high";
    } else if ( wSizeF < 5 ) {
      var wSize = "Chest to head high";
    } else if ( wSizeF < 6 ) {
      var wSize = "Head high";
    } else if ( wSizeF < 8 ) {
      var wSize = "Overhead";
    } else if ( wSizeF < 12 ) {
      var wSize = "Overhead to double overhead";
    } else if ( wSizeF < 18 ) {
      var wSize = "Double to triple overhead";
    } else if (wSizeF > 18.1 ) {
      var wSize = "Triple overhead plus";
    }
    console.log('wave height feet: ' + wSizeF);                     // prints wave size converted to feet
    console.log('wave size: ' + wSize);                     // prints wave size converted to feet
  };

  function swDir(data) {
      var swellDir = data.data.weather[0].hourly[0].swellDir;         // gets swell direction
      var sDir;                                                       // initializing sDir variable
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
         sDir = "N"
      }
      console.log('Primary swell direction: ' + sDir + ' at ' + swellDir + ' degrees.')
  };

  // Wetsuit Recommendation
  function wetsuit(data) {
    var waterTemp = data.data.weather[0].hourly[0].waterTemp_F;     // gets water temp
    if ( waterTemp < 55 ) {
      var wSuit = "5/4 Hooded Fullsuit";
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
    console.log('wetsuit: ' + wSuit);
    console.log('water temp today: ' + waterTemp);                  // prints water temp string
  };

  // Swell Period
  function swellPeriod(data) {
    var sPeriod = data.data.weather[0].hourly[0].swellPeriod_secs;  // Swell period
    if ( sPeriod < 7 ) {
      var swellSig = "Junky, short-period windswell";
    } else if ( sPeriod < 10 ) {
       swellSig = "Windswell";
    } else if ( sPeriod < 12 ) {
       swellSig = "Short period ground swell";
    } else if ( sPeriod > 12 ) {
       swellSig = "Long period ground swell";
    }
    console.log("Today's swell conditions: " + swellSig);
  };

  // calls steamers weather data call
  $('#steamers').on('click', function(e) {
    santaCruzWeather();
    santaCruzMarineCall();
  });
  // calls rincon weather data call
  $('#rincon').on('click', function(e) {
    carpenteriaWeather();
    carpenteriaMarineCall();
  });
  $('#trestles').on('click', function(e) {
    sanClementeWeather();
    sanClementeMarineCall();
  });
}

topNav();
subNav();
weatherCalls();
