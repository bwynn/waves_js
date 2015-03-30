// setup assert testing function
function assert(value, desc) {
  var li = document.createElement('li');
  li.className = value ? "pass" : "fail";
  li.appendChild(document.createTextNode(desc));
  document.getElementById('results').appendChild(li);
}

function santaCruzMarineCall() {
  $.ajax({                                                      // jQuery ajax declaration
    type: 'POST',                                                     // declare type of ajax call
    url: "http://api.worldweatheronline.com/free/v1/marine.ashx?q=36.5%2C-122&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    dataType: 'jsonp',                                                // declare dataType, using parsed json
    data: $(this).serialize(),                                          // setting $(this).serialize() using waves variable
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
  $.getJSON('../waves/data/data.json', function(data) {
    console.log('json file: ' + data.locations[0].waveMin);
    console.log('json file: ' + data.locations[0].waveMax);
  });
}


assert(true, '|------- Before Outer --------|');
var weatherCalls = {
  live: santaCruzMarineCall,
  file: compareData
};
assert(typeof compareData === 'function',
      'compareData is a function');
