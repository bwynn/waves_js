/* --------------------- MODEL -----------------------------------------*/
// WEATHER AND MARINE INFO CALLS
// store the ajax object, wave object, weather object all into the same
// immediately instantiated call
var model = {
  locations: {
    name: ["Steamer Lane", "Rincon", "Trestles"],
    id: ["santaCruz", "carpenteria", "sanClemente"],
    conditionsLabel: ["Time", "Wind Direction", "Temp F", "Wind Speed", "Skies", "Wave Size", "Swell Direction", "Water Temp", "Swell Period (sec)"]
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
      return view.listBuilder(temp, model.locations.conditionsLabel[2]);
    },

    // local time -- this needs to be called independent of the ajax calls, as the
    // functions calling the ajaxCalls are handling data as arguments. Call this
    // independently.
    time: function() {
      var gmt = new Date();
      var time = gmt.toLocaleTimeString();
      // return time as a string
      //return console.log(time);
      //return view.contentItemBuilder(time);
      return view.listBuilder(time, model.locations.conditionsLabel[0]);
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
      return view.listBuilder(windDir, model.locations.conditionsLabel[1]);
    },

    windspeed: function(data) {
      // return windspeed as a string
      //return console.log(data.data.current_condition[0].windspeedMiles);
      var windSpeed = data.data.current_condition[0].windspeedMiles;
      //return view.contentItemBuilder(windSpeed);
      return view.listBuilder(windSpeed, model.locations.conditionsLabel[3]);
    },

    skies: function(data) {
      // weather Description returned as string
      //return console.log(data.data.current_condition[0].weatherDesc[0].value);
      var currently = data.data.current_condition[0].weatherDesc[0].value;

      //return view.contentItemBuilder(currently);
      return view.listBuilder(currently, model.locations.conditionsLabel[4]);
    },
    waveSize: function(data) {
      // get swell height - returned as a number
      var wSizeM = data.data.weather[0].hourly[0].swellHeight_m,
          // translates into feet
          wSizeF = (wSizeM * 3.28).toPrecision(3);
      //return console.log(wSizeF + " feet. Wave size.");
      //return view.contentItemBuilder(wSizeF);
      return view.listBuilder(wSizeF, model.locations.conditionsLabel[5]);
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
        return view.listBuilder(sDir, model.locations.conditionsLabel[6]);
    },
    waterTemp: function(data) {
      // gets water temp as a number
      var waterTemp = data.data.weather[0].hourly[0].waterTemp_F;     // gets water temp
      //return console.log(waterTemp + " degrees water.");
      //return view.contentItemBuilder(waterTemp);
      return view.listBuilder(waterTemp, model.locations.conditionsLabel[7]);
    },
    swellPeriod: function(data) {
      // gets swell period in seconds
      var sPeriod = data.data.weather[0].hourly[0].swellPeriod_secs;  // Swell period
      //return console.log(sPeriod + " swell period");
      //return view.contentItemBuilder(sPeriod);
      return view.listBuilder(sPeriod, model.locations.conditionsLabel[8]);
    }
  }, // end local object
  // toScale object is for processing data into relative information, applications
  // include wetsuit recommendations, optional wave scale system for your
  // reports (4feet, waist-chest high etc.), optional conditions report
  conditionsToScale: {
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
      return console.log(view.contentItemBuilder(swellSig));
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
      return console.log(view.contentItemBuilder(wSuit));
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
      return console.log(view.contentItemBuilder(wSizeF));
    }
  },
  // store the land-based weather calls
  weatherCall: function(data) {
    model.local.winddirection(data);
    model.local.airTemp(data);
    model.local.windspeed(data);
    model.local.skies(data);
  },
  // store the ocean data here
  marineCall: function(data) {
    model.local.waveSize(data);
    model.local.swellDirection(data);
    model.local.waterTemp(data);
    model.local.swellPeriod(data);
  },
  relative: function(data) {
  	model.conditionsToScale.relativeWaveSize(data);
    model.conditionsToScale.waveQuality(data);
    model.conditionsToScale.wetsuit(data);
  }
};  // END MODEL

// CONSTRUCTOR FUNCTIONS
// create a new constructor function calling the location information
var Location = function() {};

// create the weather method that pulls the location's weather information.
Location.prototype.weather = function(arg) {
  $.ajax({
          type: "POST",
          url: model.ajaxCall.cityUrl[arg],
          dataType: 'jsonp',
          success: function(data) {
            model.local.time();
            model.weatherCall(data);
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
          url: model.ajaxCall.waveUrl[arg],
          dataType: 'jsonp',
          success: function(data) {
            model.marineCall(data);
          }
  });
};

// index 1 -- STEAMERS -- SANTA CRUZ
// index 3 -- RINCON -- CARPENTERIA
// index 5 -- TRESTLES -- SAN CLEMENTE
var wave = new Wave(); // wave.conditions(arg);



// --------------------- VIEW ------------------------------------------
  // create locations object, this will serve as object information for all
  // things pertaining to
  var view = {
    // loop through length using each jquery method
    buildList: function() {
      // get length of locations options
      var location = model.locations.name;

      $(location).each(function() {
        // get unordered list element
        var ul = $("#globalNavContent");
        // add list items to global nav ul
        ul.append("<li>");
        // get list item
        var li = $("#globalNavContent li");
        // apply classes
        li.addClass("globalNavList");
      });
    },  // auto intialize this function
    // build the nav links function
    buildNavLinks: function() {
      // get list items
      var li = $("li.globalNavList");
      // append anchor tag
      li.append("<a href='#'></a>");

      // get newly defined anchor tag
      var a = $(".globalNavList a");

      // for each anchor tag selected, match the string from the name object
      a.each(function(i) {
        $(this).attr("id", model.locations.id[i]);
        $(this).text(model.locations.name[i]);
      });
    }, // auto initialize this function
    contentItemBuilder: function(arg) {
      var cont = $("#remoteData"),
          li = $("<li></li>"),
          span = $("<span></span>");

      // append list element to container
      cont.append(li);
      // append span to list element
      li.append(span);
      // insert the argument's return content into the span element
      span.text(arg);
    },
    // display function to show wave template, triggered by the local nav
    // element
    waveDisplay: function() {
      var $localData = $("#localData"),
          $remoteData = $("#remoteData");

          $localData.hide();
          $remoteData.css("display", "-webkit-box").css("display", "-ms-flexbox").css("display", "-webkit-flex").css("display", "flex");
    },
    // display function to be triggered on the local nav elements to display
    // the json data
    aboutDisplay: function() {
      var $localData = $("#localData"),
          $remoteData = $("#remoteData");

          $remoteData.hide();
          $localData.show();
    },
    // evaluate current conditions of the two local nav buttons to
    // determine which content to display
    evalBtnsContent: function() {
      var $waves = $("#wavesContentBtn"),
          $about = $("#aboutContentBtn");

          // conditional evaluates class attributes on variables
          // to determine which content to display
          if ($waves.attr("class") == "active") {
            return view.waveDisplay();
          } else if ($about.attr("class") == "active") {
            return view.aboutDisplay();
          } else {
            return console.log("there was an issue");
          }
    },
    // this function evaluates the current body id and alters the
    // content of the page using json data containing location information.
    jsonData: function(arg) {
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
    },
    buildLocation: function(arg) {
      // add conditional to determine index for ajaxCalls
      if (arg.attr("id") == "santaCruz") {
        view.jsonData(0);
        wave.conditions(0);
        city.weather(0);
      } else if (arg.attr("id") == "carpenteria") {
        view.jsonData(1);
        wave.conditions(1);
        city.weather(1);
      } else {
        view.jsonData(2);
        wave.conditions(2);
        city.weather(2);
      }
    },
    listBuilder: function(arg1, arg2) {
      var conditions = arg1,
          label = arg2,
          cont = $("#remoteData"),
          li = $("<li></li>"),
          span = $("<span></span>");

      // append list element to container
      cont.append(li);
      // append span element to list
      li.append(span);
      // insert text into builder;
      span.text(conditions).append("<br/>" + label);
    }
  }; // END VIEW



// --------------------- CONTROLLER ------------------------------------
// globalNavigation event trigger
var controller = {
  globalNavController: function() {
    var $anchor = $(".globalNavList a");

    // event trigger
    $anchor.on("click", function() {
      // get content section, local nav anchor and the first local nav anchor element
      var $content = $("#content"),
          $localNav = $("#localNav ul li a"),
          $localNavFirst = $("#localNav ul li a:first"),
          $remoteData = $("#remoteData");

      // set class values for the global navigation links
      $anchor.removeClass("active");
      $(this).addClass("active");

      // ensure that the local nav links are set to the correct value, which will
      // determine what content to display within the content section.
      $localNav.removeClass("active");
      $localNavFirst.addClass("active");

      // clear out the contents of the remote data container
      $remoteData.empty();

      // show content area
      $content.show();
      // set the content area
      view.evalBtnsContent();

      // empty out remote data contents
      $("#remoteData li").empty();

      // build location conditional
      view.buildLocation($(this));

      });
    },
    localNavController: function() {
      // localNavigation event trigger
      var $localNavAnchor = $("#localNav ul li a");
      $localNavAnchor.on("click", function() {

        $localNavAnchor.removeClass("active");
        $(this).addClass("active");

        // place content
        view.evalBtnsContent();
      });
    }
};
// eventually, the init function below should be the return value of the auto
// invoked code above

// init function
(function() {
  // view init
  view.buildList();
  view.buildNavLinks();
  // controller init
  controller.globalNavController();  // initialize global controller
  controller.localNavController();  // initialize local nav controller
}());
