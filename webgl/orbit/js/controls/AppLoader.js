window.DownloadProgress = function(){
	this.load = function(){
		this.progressBar = document.getElementById('progressBar');
		this.progressBar.style.width = "0%";
	};
	this.downloadJSON = function downloadJSON(jsonUrl, success){
		var self = this;
		var req = new XMLHttpRequest();
		req.open("GET", jsonUrl, true);
		req.addEventListener("progress", function (evt) {
			if(evt.lengthComputable) {
				var percentComplete = evt.loaded / evt.total;
				self.updateProgress(percentComplete*100);
			}
		}, false);

		req.onreadystatechange = function () {
			if (this.readyState === 4) {
				if( this.status === 200 ) {
					try {
						var myJSON = JSON.parse( this.responseText );
						success(myJSON);
						self.endProgress();
					} catch( e ) {
						throw e;
						alert( 'Something Wrong with ' + jsonUrl );
					}
				} else {
					alert( 'Could not Download ' + jsonUrl );
				}
			}
		};
		req.send();
	};
	this.updateProgress = function(percentage){
		this.progressBar.style.width = percentage + '%';
	};
	this.endProgress = function(){
		var initialLoader = document.getElementById('preLoaderScreen');
		initialLoader.parentElement.removeChild(initialLoader);
	}
};