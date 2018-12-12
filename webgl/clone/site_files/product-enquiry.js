$(function() {
    var name = $( "#name" ),
      email = $( "#email" ),
      allFields = $( [] ).add( name ).add( email ),
      tips = $( ".validateTips" );

    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
		setTimeout(function() {
        // tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }

    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Please enter your " + n + "");
        return false;
      } else {
        return true;
      }
    }

    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    $("#cancelFix").click(function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
        $( "#penquiry-form" ).dialog( "close" );
      });

    $( "#penquiry-form" ).dialog({
      autoOpen: false,
      height: 480,
      width: 400,
      modal: true,
      buttons: {
        "Send Enquiry": function() {
          var bValid = true;
          allFields.removeClass( "ui-state-error" );
          bValid = bValid && checkLength( name, "name", 3, 80 );
          bValid = bValid && checkLength( email, "email", 6, 80 );
          bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z ])+$/i, "name may consist of a-z, 0-9, spaces, begin with a letter." );
          bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "Please provide a valid email address" );

          if ( bValid ) {
            $( "#users tbody" ).append( "<tr>" +
              "<td>" + name.val() + "</td>" +
              "<td>" + email.val() + "</td>" +
            "</tr>" );

            //Prepare to ajax submit a form. Pass the form fields.

      var dataString = $("form[name='penquirer']").serialize();
      $.ajax({
        type: "POST",
        url: "/ajax/product-enquiry.dna",
        data: dataString,
        dataType: "json",
        timeout: 5000,
        error: function (xhr, err) {
            tips.hide();
			$("#penquirer").hide();
			$("p.productenquiry").hide();
			$( ".ui-dialog-buttonset" ).hide();
			$("#productenquiry_message").html("<br/><div class='successMessage' style='text-align:center;font-weight:bold;'>Thank you, " + name.val() + "<br/>we will contact you via email with an answer<br/>to your question as soon as possible.</div>");
			$("#cancelFix").show();
		},
		success: function(data) {
			$( ".ui-dialog-buttonset" ).hide();
				tips.hide();
					$("#penquirer").hide();
					$("p.productenquiry").hide();
					$("#productenquiry_message").html("<br/><div class='successMessage' style='text-align:center;font-weight:bold;'>Thank you, " + name.val() + "<br/>we will contact you via email with an answer<br/>to your question as soon as possible.</div>");
					$("#cancelFix").show();
				}
			});
    return false;

            $( this ).dialog( "close" );
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });

    $( "#create-penquirer" )
      .click(function() {
        $( "#penquiry-form" ).dialog( "open" );
      });
  });