$(function() {
	$('#infotrigger1').click( function() {
		$('#pd-sinfo1').toggleClass('stockinfo-full');
		$('#infotrigger1').toggleClass('minus11');
		});
	});
	function toggleInfo1() {
		var ele = document.getElementById("pd-sinfo1");
		var text = document.getElementById("infotrigger1");
		if (ele.style.display == "block"){
			ele.style.display = "";
			text.innerHTML = "Stock Info One";
			}
		else {
			ele.style.display = "block"; 
			text.innerHTML = "Stock Info One"; 
		}
	}
		
	$(function() {
	$('#infotrigger2').click( function() {
		$('#pd-sinfo2').toggleClass('stockinfo-full');
		$('#infotrigger2').toggleClass('minus11');
		});
	});
	function toggleInfo1() {
		var ele = document.getElementById("pd-sinfo2");
		var text = document.getElementById("infotrigger2");
		if (ele.style.display == "block"){
			ele.style.display = "";
			text.innerHTML = "Stock Info Two";
			}
		else {
			ele.style.display = "block"; 
			text.innerHTML = "Stock Info Two"; 
		}
	}
		
	$(function() {
	$('#infotrigger3').click( function() {
		$('#pd-sinfo3').toggleClass('stockinfo-full');
		$('#infotrigger3').toggleClass('minus11');
		});
	});
	function toggleInfo1() {
		var ele = document.getElementById("pd-sinfo3");
		var text = document.getElementById("infotrigger3");
		if (ele.style.display == "block"){
			ele.style.display = "";
			text.innerHTML = "Stock Info Two";
			}
		else {
			ele.style.display = "block"; 
			text.innerHTML = "Stock Info Two"; 
		}
	}
	
	$(function() {
	$('#infotrigger0').click( function() {
		$('#pd-sinfo0').toggleClass('stockinfo-full');
		$('#infotrigger0').toggleClass('minus11');
		});
	});
	function toggleInfo0() {
		var ele = document.getElementById("pd-sinfo0");
		var text = document.getElementById("infotrigger0");
		if (ele.style.display == "block"){
			ele.style.display = "";
			text.innerHTML = "Hold stock for me (24 hours only)";
			}
		else {
			ele.style.display = "block"; 
			text.innerHTML = "Hold stock for me (24 hours only)"; 
		}
	}