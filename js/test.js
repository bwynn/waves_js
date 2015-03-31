// setup assert testing function
function assert(value, desc) {
  var li = document.createElement('li');
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  document.getElementById('results').appendChild(li);
}

// Best Bet component testing
function santaCruzMarineCall() {
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
}

function compareData() {
  ($.getJSON('../waves/data/data.json', function(data) {
    var range = {
      min: data.locations[0].waveMin,
      max: data.locations[0].waveMax
    }
    console.log(parseInt(range.min));
    return parseInt(range.min);
  })());
}

var weatherCalls = {
  live: santaCruzMarineCall,
  file: compareData
};

function versus() {
  var a = weatherCalls.live();
  var b = weatherCalls.file();
  console.log(a + b);
}
