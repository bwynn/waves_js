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
        // get form
        var form = $("section#pageLoad form");
        var msg = "<p>Please add a valid 5 digit zip code</p>";

        // compare user input with regular expression evaluating quality of user input.
        if (zip.match(/^\d+$/)) {
            // clear out the p element if found
            form.find("p").remove();
            return zip;
        } else {
          //console.log("please enter a valid zip");
          form.append(msg);
        }
      },
      buildPageLoadContent: function() {
        var cont = view.elemMap.pageLoadContainer();
            // user entered zip return full string
            zipUrl =  ["http://api.worldweatheronline.com/free/v1/weather.ashx?q=" + view.pageContent.getZipInput() + "&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c"]

        // check values
        //console.log(zipUrl[0]);
        //console.log(cont);
        // constructor function for building page content based on user input zip code
        city.userWeather(zipUrl, cont, 0);
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
