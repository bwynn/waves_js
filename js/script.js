function waveLoad() {

  var $bodyWrap = $('#bodyWrap');
  var $nav = $('#nav a')

  $nav.on('click', function(e){
    e.preventDefault();
    $bodyWrap.load('best-conditions.html').hide().fadeIn('slow');
  });

}

$(document).ready(function() {
  var $subNav = $('#subNav a');

  $subNav.on('click', function(e) {
    e.preventDefault();

    var $statsWrap = $('#statsWrap');

    switch($(this).attr('href')) {
      case 'best-bet.html' :
        $statsWrap.load('best-bet.html').hide().fadeIn('slow');
        break;
      case 'waves.html' :
        $statsWrap.load('waves.html').hide().fadeIn('slow');
        break;
      case 'weather.html' :
        $statsWrap.load('weather.html').hide().fadeIn('slow');
        break;
    }
  });
});


waveLoad();
