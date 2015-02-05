function pageNav() {
  $('nav a, a#subNav').on('click', function(e) {
    e.preventDefault();
    var url = this.href;

    $('nav a.active').removeClass('active');
    $(this).addClass('active');

    $('.content').remove();
    $('#bodyWrap, #statsWrap').load(url + ' .content').hide().fadeIn('slow');
  });
}

function subNav() {
  $('#subNav').on('click', function(e) {
    e.preventDefault();
    var subUrl = this.href;                         // this needs to be a dynamic path
    console.log(statusText);

    $('a.active').removeClass('active');
    $(this).addClass('active');

    $('#statsSection').remove();
    $('#statsWrap').load(subUrl + '#statsSection').hide().fadeIn('slow');
  });
}

function weatherLoad(subNav) {
  var xhr = new XMLHttpRequest();                   // create xmlhttp request object
  xhr.onload = function() {                         // when response has loaded
    if(xhr.status === 200) {      // xhr.status === 200
      document.getElementById('content').innerHTML = xhr.responseText;
    } else {
      console.log('there was an issue');
    }
  };

  xhr.open('GET', 'weather.html', true);
  xhr.send(null);
}

pageNav();
//subNav();
weatherLoad();
