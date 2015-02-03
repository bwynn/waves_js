function pageNav() {
  $('nav a').on('click', function(e) {
    e.preventDefault();
    var url = this.href;

    $('nav a.active').removeClass('active');
    $(this).addClass('active');

    $('#content').remove();
    $('#bodyWrap').load(url + ' #content').hide().fadeIn('slow');
  });
}

pageNav();
