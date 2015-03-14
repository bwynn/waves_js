function jsonTest() {
  $.getJSON('../waves/data/data.json', function(data) {
    var output = '';

    for (var i = 0; i < data.locations.length; i++) {
      output += '<li>' + data.locations[i].title + '</li>';
    }
    content.innerHTML = output;
  });
}

jsonTest();
