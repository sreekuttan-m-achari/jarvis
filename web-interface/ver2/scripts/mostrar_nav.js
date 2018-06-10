$(window).click(function() {
	$('nav').removeClass('active');
});

$('#mobile-nav').click(function(event) {
  $('nav').toggleClass('active');
  event.stopPropagation();
});


