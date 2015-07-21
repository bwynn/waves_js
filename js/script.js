/* --------------------- MODEL -----------------------------------------*/
// WEATHER AND MARINE INFO CALLS
// store the ajax object, wave object, weather object all into the same
// immediately instantiated call
var model = {
  locations: {
    name: ["Steamer Lane", "Rincon", "Trestles"],
    id: ["santaCruz", "carpenteria", "sanClemente"],
    className: ["santaCruz", "carpenteria", "sanClemente"],
    conditionsLabel: ["Time", "Wind Direction", "Air Temp F (degrees f)", "Wind Speed (mph)", "Skies", "Wave Size (feet)", "Swell Direction", "Water Temp (degrees f)", "Swell Period (seconds)"]
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
      // return time as a string
      //return console.log(time);
      //return view.contentItemBuilder(time);
      return time;
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
      return console.log(view.pageStructure.listBuilder(swellSig));
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
      return console.log(view.pageStructure.listBuilder(wSuit));
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
      return console.log(view.listBuilder(wSizeF));
    }
  }
};  // END MODEL

// CONSTRUCTOR FUNCTIONS
// create a new constructor function calling the location information
var Location = function() {};

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

// create new objects from the constructor, include index in comments to reference

var city = new Location(); // city.weather(obj,arg);
// arg 0 -- SANTA CRUZ
// arg 1 -- CARPENTERIA
// arg 2 -- SAN CLEMENTE

// create a Wave constructor function
var Wave = function() {};

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

// index 0 -- STEAMERS -- SANTA CRUZ
// index 1 -- RINCON -- CARPENTERIA
// index 2 -- TRESTLES -- SAN CLEMENTE
var wave = new Wave(); // wave.conditions(arg);



// --------------------- VIEW ------------------------------------------
  // create locations object, this will serve as object information for all
  // things pertaining to
  var view = {
    // create element map for building list builder method
    elemMap: {
      // get #remoteContainer for weather pages
      remoteContainer: function() {
        return $("#remoteData");
      },
      // get #pageLoadDataContainer
      pageLoadContainer: function() {
        return $("ul#userWeatherContent");
      }
    },
    // methods to build the navigation items are stored here
    navigation: {
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
        // show and hide the navigation for the nav display event
        showNav: function() {
          // get shownav anchor element
          var $nav = $("nav#globalNav");

          // toggle show/hide
          $nav.slideToggle("fast");
        },
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
        checkWeather: function() {
          // get the form element
          var $form = $("#pageLoad > form");
          // set display using toggle event -- apply a transition for this event
          $form.show();
        }
    },
    // methods to build page elements go in here
    pageStructure: {
      //hide pageLoad section
      hidePageLoad: function() {
        // get pageLoad section
        var page = $("section#pageLoad");
        // now hide it!
        return page.hide();
      }, // auto initialize this funciton
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
      listBuilder: function(arg1, arg2, arg3) {
        var conditions = arg1,
            label = arg2,
            cont = arg3,
            li = $("<li></li>"),
            span = $("<span></span>");

        // append list element to container
        cont.append(li);
        // append span element to list
        li.append(span);
        // insert text into builder;
        span.text(conditions).append("<br/><small>" + label + "</small>");
      },
      backgroundSwitch: function(arg) {
        // get background figure tag
        var backgd = $("#content figure#backgd");

        // remove old id value
        backgd.attr("class", "");
        // add new id value based on arg
        backgd.attr("class", arg);
      },
    },
    // methods based around the displayed contents go in here
    pageContent: {
      // evaluate current conditions of the two local nav buttons to
      // determine which content to display
      evalBtnsContent: function() {
        var $waves = $("#wavesContentBtn"),
            $about = $("#aboutContentBtn");

            // conditional evaluates class attributes on variables
            // to determine which content to display
            if ($waves.hasClass("active")) {
              return view.pageStructure.waveDisplay();
            } else if ($about.hasClass("active")) {
              return view.pageStructure.aboutDisplay();
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
      pageTitle: function(arg) {
        // create header tag
        var $header = $("<h1>"),
        // get container
            $pageTitle = $("#pageTitle"),
            $wipeHeader = $("#pageTitle h1");
        // remove existing header
        $wipeHeader.remove();
        // attach tag into container
        $pageTitle.append($header);
        // return appended header
        $header.text(arg);
      },
      // get input value
      getZipInput: function() {
        // get user input
        var userInput = $("#enterZip");
        // set variable for value using jquery .val method
        var zip = userInput.val();

        return zip;
      },
      buildPageLoadContent: function() {
        var cont = view.elemMap.pageLoadContainer();
            // user entered zip return full string
            zipUrl =  ["http://api.worldweatheronline.com/free/v1/weather.ashx?q=" + view.pageContent.getZipInput() + "&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c"]

        // check values
        //console.log(zipUrl[0]);
        //console.log(cont);
        // constructor function for building page content based on user input zip code
        city.weather(zipUrl, cont, 0);
      },
      buildLocation: function(arg) {
        // add conditional to determine index for ajaxCalls
        if (arg.attr("id") == "santaCruz") {
          view.pageStructure.backgroundSwitch(model.locations.className[0]);
          view.pageContent.pageTitle(model.locations.name[0]);
          view.pageContent.jsonData(0);
          // call wave conditions
          wave.conditions(0, view.elemMap.remoteContainer());
          // call weather data, passing in obj and arg values
          city.weather(model.ajaxCall.cityUrl, view.elemMap.remoteContainer(), 0);
        }
        else if (arg.attr("id") == "carpenteria") {
          view.pageStructure.backgroundSwitch(model.locations.className[1]);
          view.pageContent.pageTitle(model.locations.name[1]);
          view.pageContent.jsonData(1);
          // call wave conditions
          wave.conditions(1, view.elemMap.remoteContainer());
          // call weather data, passing in obj and arg values
          city.weather(model.ajaxCall.cityUrl, view.elemMap.remoteContainer(), 1);
        }
        else {
          view.pageStructure.backgroundSwitch(model.locations.className[2]);
          view.pageContent.pageTitle(model.locations.name[2]);
          view.pageContent.jsonData(2);
          // call wave conditions
          wave.conditions(2, view.elemMap.remoteContainer());
          // call weather data, passing in obj and arg values
          city.weather(model.ajaxCall.cityUrl, view.elemMap.remoteContainer(), 2);
        }
      }
    }
  }; // END VIEW



// --------------------- CONTROLLER ------------------------------------
// globalNavigation event trigger
var controller = {
  globalNavController: function() {
    var $anchor = $(".globalNavList a");

    // event trigger
    $anchor.on("click", function(e) {
      // get content section, local nav anchor and the first local nav anchor element
      var $content = $("#content"),
          $localNav = $("#localNav ul li a"),
          $localNavFirst = $("#localNav ul li a:first"),
          $remoteData = $("#remoteData");

      // prevent default behavior
      e.preventDefault();

      // set class values for the global navigation links
      $anchor.removeClass("active");
      $(this).addClass("active");

      // hide the global navigation
      view.navigation.showNav();

      // ensure that the local nav links are set to the correct value, which will
      // determine what content to display within the content section.
      $localNav.removeClass("active");
      $localNavFirst.addClass("active");

      // hide the pageLoad section
      view.pageStructure.hidePageLoad();

      // clear out the contents of the remote data container
      $remoteData.empty();

      // show content area
      $content.show();
      // set the content area
      view.pageContent.evalBtnsContent();

      // empty out remote data contents
      $("#remoteData li").empty();

      // build location conditional
      view.pageContent.buildLocation($(this));

      });
    },
    showNavController: function() {
      // get anchor element
      var $anchor = $("a#showNav");
      // create event
      $anchor.on("click", function(e) {
        // prevent default behavior
        e.preventDefault();
        // show navigation function
        view.navigation.showNav();
      });
    },
    localNavController: function() {
      // localNavigation event trigger
      var $localNavAnchor = $("#localNav ul li a");
      $localNavAnchor.on("click", function(e) {
        // prevent default behavior
        e.preventDefault();

        $localNavAnchor.removeClass("active");
        $(this).addClass("active");

        // place content
        view.pageContent.evalBtnsContent();
      });
    },
    // create new controller for form submission
    zipCodeController: function() {
      // get submit element
      var submit = $("#zipBtn"),
          content = view.elemMap.pageLoadContainer();
      // submit on click event function
      submit.on("click", function(e) {
        var container = $("#mainBtns");
        // get view function
        e.preventDefault();

        container.hide();
        // clear out existing content
        content.empty();
        // load page content
        view.pageContent.buildPageLoadContent();
      });
    },
    // openWaveNav event
    openWaveNavController: function() {
      var $btn = $("#openWaveNav");

      $btn.on("click", function(e) {
        // get the form element
        var $form = $("#pageLoad > form");

        e.preventDefault();
        // set display using toggle event -- apply a transition for this event
        $form.hide();
        // show navigation function
        view.navigation.showNav();
      });
    },
    // checkWeatherBtn event
    userWeatherController: function() {
      var $btn = $("#checkWeatherBtn");

      $btn.on("click", function(e) {
        e.preventDefault();
        // close the global nav if open using the shownav function (which also closes it)
        // show navigation function
        //view.navigation.showNav();
        // show the input form
        // get the form element
        var $form = $("#pageLoad > form");

        $form.slideToggle("slow");
      });
    }
};
// eventually, the init function below should be the return value of the auto
// invoked code above
controller.showNavController(); // initialize shownav function

// init function
(function() {
  // view init
  view.navigation.buildList();
  view.navigation.buildNavLinks();
  // controller init
  controller.globalNavController();  // initialize global controller
  controller.localNavController();  // initialize local nav controller
  controller.zipCodeController();  // initialize zip code controller;
  controller.openWaveNavController(); // init open wave nav
  controller.userWeatherController();
}());
