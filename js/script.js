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

topNav();
subNav();
