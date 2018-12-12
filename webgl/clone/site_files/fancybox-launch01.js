$(document).ready(function() {
	$('.fancybox').fancybox();
	$('.fancybox-media')
		.attr('rel', 'media-gallery')
		.fancybox({
			openEffect : 'none',
			closeEffect : 'none',
			prevEffect : 'none',
			nextEffect : 'none',
			arrows : false,
			maxWidth    : 800,
			maxHeight   : 458,
			helpers : {
				media : {},
				buttons : {}
			}
	});
});

$(document).ready(function() {
	$(".fancymaps").fancybox({
		maxWidth	: 625,
		maxHeight	: 370,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'elastic',
		closeEffect	: 'none'
	});
});