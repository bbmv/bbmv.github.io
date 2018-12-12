$(function() {
	$("#reallife_cancelFix").click(function() {
		$( "#uploader-form" ).dialog( "close" );
	});

	$( "#uploader-form" ).dialog({
		autoOpen: false,
		height: 500,
		width: 360,
		modal: true,
		buttons: {
       
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});

	$( "#create-uploader" )
		.click(function() {
			$( "#uploader-form" ).dialog( "open" );
		});
	});