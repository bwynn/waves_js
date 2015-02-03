$('nav a').on('click', function(e) {
  e.preventDefault();
  var url = this.href;
  console.log('works');

  $('nav a.active').removeClass('active');
  $(this).addClass('active');
  console.log('so');

  $('#content').remove();
  $('#bodyWrap').load(url + ' #content').hide().fadeIn('slow');
  console.log('far')
});
