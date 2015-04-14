// Best Bet component testing
var callout = $.ajax({                                                      // jQuery ajax declaration
    type: 'POST',                                                     // declare type of ajax call
    url: "http://api.worldweatheronline.com/free/v1/marine.ashx?q=36.5%2C-122&format=json&date=today&key=c9cda4e16df76d61eb092e6b5c5910ee3f0c6f3c",
    dataType: 'jsonp',                                                // declare dataType, using parsed json
    data: $(this).serialize(),                                          // setting $(this).serialize() using waves variable
    success: function(data){                                          // successful api call performs function
      return data.data.weather[0].hourly[0].swellHeight_m;      // gets swell height in meters
    },
    error: function(e) {console.log('epic marine fail')}
});
console.log(callout.sucess);

function compareData() {
  ($.getJSON('../waves/data/data.json', function(data) {
    var range = {
      min: data.locations[0].waveMin,
      max: data.locations[0].waveMax
    }
    console.log('from within function ' + parseInt(range.min));
    return parseInt(range.min);
  }));
  return this;
}
