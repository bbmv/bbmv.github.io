function continueShopping(){
$.msgbox("The item has been added<br/>to your shopping bag", {
  type: "confirm",
  buttons : [
    {type: "cancel", value: "Continue Shopping"},
    {type: "submit", value: "Checkout"}
  ]
},  function(result) { if (result && result=='Checkout') { window.location = '/shop/shopping-bag';  }}

  ); return false;
} ;

function continueRegShopping(){
$.msgbox("The item has been added<br/>to your registry order", {
  type: "confirm",
  buttons : [
    {type: "cancel", value: "Continue Shopping"},
    {type: "submit", value: "Checkout"}
  ]
},  function(result) { if (result && result=='Checkout') { window.location = '/shop/registry-bag';  }}

  ); return false;
} ;

function continueRegistry(){
$.msgbox("The item has been added<br/>to your registry list", {
  type: "confirm",
  buttons : [
    {type: "cancel", value: "Continue Selection"},
    {type: "submit", value: "Review List"}
  ]
},  function(result) { if (result && result=='Review List') { window.location = '/registry/registry-list';  }}

  ); return false;
} ;

function continueWishing(){
$.msgbox("The item has been added to your wish list", {
  type: "confirm",
  buttons : [
    {type: "cancel", value: "Continue Shopping"},
    {type: "submit", value: "View Wishlist"}
  ]
},  function(result) { if (result && result=='View Wishlist') { window.location = '/wishlist/';  }}

  ); return false;
} ;


function pleaseWait() {
$.msgbox("Loading... please wait");
	setTimeout(function() {
		$.MsgBoxObject.close();
	}, 2000); // in ms
};


function doPayment() {
$.msgbox("Payment processing ... please wait", {
		type: "processing",
		buttons : [ ]
		}
	);
	setTimeout(function() {
		document.details01.submit();
	}, 2000); // in ms
};

function forgottenPassword(){	
$.msgbox("<p>In order to process your request you must provide the following:</p>", {
    type    : "prompt",
    inputs  : [
      {type: "text",     label: "Your email address:", value: "", required: true}
    ],
    buttons : [
      {type: "submit", value: "OK"},
      {type: "cancel", value: "Cancel"}
    ]
  }, function(name, password) {
    if (name) {
		$.ajax({
			type: "GET",
			url: location.protocol + "//" + location.host + "/ajax/ajax.html?id="+name,    
			success: function(msg){
				$.msgbox("<p style=font-size:12px;>Email with reset link has been sent to <br>"+name+"<br>from orders@top3.com.au<br>please check your junkmail folder.</p>", {
					type: "confirm",
					buttons : [
						{type: "submit", value: "OK"}
					]
			});
        }
	});

    } else {
      // $.msgbox("Bye!", {type: "info"});
    }
    
  });
  };
  