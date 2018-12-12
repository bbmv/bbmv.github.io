$(function() {
	$( "#suggestinput" ).autocomplete({
		minLength: 2,
		source: "/ajax/predictive_search.dna",
		focus: function( event, ui ) {
			$( "#suggestinput" ).val( ui.item.label );
			return false;
		},
		select: function( event, ui ) {
			// $( "#suggestinput" ).val( ui.item.label );
			// $( "#suggestinput-id" ).val( ui.item.value );
			$( "#suggestinput-description" ).html( ui.item.desc );
			// $( "#suggestinput-icon" ).attr( "src", "images/" + ui.item.icon );
			return false;
		}
	})
	.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
		return $( "<li>" )
		// .append( "<a>" + item.label + "<br>" + item.desc + "</a>" )
		.append( item.desc )
		.appendTo( ul );
	};
});