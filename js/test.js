// setup assert testing function
function assert(value, desc) {
  var li = document.createElement('li');
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  document.getElementById('results').appendChild(li);
}

assert(typeof santaCruzMarineCall === 'function', 'santaCruzMarineCall is in scope');
// Best Bet component testing
function santaCruzMarineCall() {
  $.ajax({                                                      // jQuery ajax declaration
    type: 'POST',                                                     // declare type of ajax call
    url: "http://api.worldweatheronline.com/free/v1/marine.ashx?q=36.5%2C-122&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    dataType: 'jsonp',                                                // declare dataType, using parsed json
    data: $(this).serialize(),                                          // setting $(this).serialize() using waves variable
    success: function(data){                                          // successful api call performs function
      var wSizeM = data.data.weather[0].hourly[0].swellHeight_m;      // gets swell height in meters
      var wSizeF = (wSizeM * 3.28).toPrecision(3);
      console.log(parseInt(wSizeF));
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

assert(typeof weatherCalls === 'object', 'weather calls is an object');

function versus() {
  var a = weatherCalls.live();
  var b = weatherCalls.file();
  console.log(a + b);
}

versus();
