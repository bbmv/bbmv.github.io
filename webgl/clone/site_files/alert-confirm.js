// --------------------  CUSTOM ALERT--------------------------------
function doConfirm(formID) {
  confirm('Do you want to submit this form ?', formID);
  return false;
}
function doAlert(formID) {
  alert('Do you want to submit this form ?', formID);
  return false;
}
// constants to define the title of the alert and button text.
var ALERT_TITLE = "An important message from top3 by design";
var ALERT_BUTTON_TEXT = "OK";
var ALERT_OK_BUTTON_TEXT = "OK";  // this is the alert OK
var CANCEL_BUTTON_TEXT = "Cancel";
// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
if(document.getElementById) {
	window.alert = function(txt, formID) {
    console.log(this);
	createCustomAlert(txt, formID);
	}
	window.confirm = function(txt, formID) {
    console.log(this);
	createCustomAlert(txt, formID, true);
	}
}

function createCustomAlert(txt, formID, isConfirm) {
	// shortcut reference to the document object
	d = document;
	// if the modalContainer object already exists in the DOM, bail out.
	if(d.getElementById("modalContainer")) return;
	// create the modalContainer div as a child of the BODY element
	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	 // make sure its as tall as it needs to be to overlay all the content on the page
	mObj.style.height = document.documentElement.scrollHeight + "px";
	// create the DIV that will be the alert 
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	// MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	// center the alert box
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
	// create an H1 element as the title bar
	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(ALERT_TITLE));
	// create a paragraph element to contain the txt argument
	msg = alertObj.appendChild(d.createElement("p"));
	msg.innerHTML = txt;
  if (isConfirm) {
    // create an anchor element to use as the cancel button.
    btnCancel = alertObj.appendChild(d.createElement("a"));
    btnCancel.id = "cancelBtn";
    btnCancel.appendChild(d.createTextNode(CANCEL_BUTTON_TEXT));
    btnCancel.href = "#";
    // set up the onclick event to remove the alert when the anchor is clicked
    btnCancel.onclick = function() { removeCustomAlert();return false; }
    // create an anchor element to use as the confirmation button.
    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "okBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    // set up the onclick event to remove the alert when the anchor is clicked
    btn.onclick = function() { removeCustomAlert(formID, isConfirm);return false; }
  } else {
    // create an anchor element to use as the confirmation button.
    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "okBtn";
    btn.appendChild(d.createTextNode(ALERT_OK_BUTTON_TEXT));
    btn.href = "#";
    // set up the onclick event to remove the alert when the anchor is clicked
    btn.onclick = function() { removeCustomAlert(formID);return false; }
  }
}
// removes the custom alert from the DOM
function removeCustomAlert(formID, isConfirm) {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
  if (isConfirm) {
    document.getElementById(formID).submit();
  }
  return false;
}