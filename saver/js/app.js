/*function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

toDataURL(
  'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0',
  function(dataUrl) {
    console.log('RESULT:', dataUrl)
  }
)

*/
var oReq = new XMLHttpRequest();
oReq.open("GET", "./images/grinder.png", true);
oReq.responseType = "arraybuffer";

oReq.onload = function(oEvent) {
  download(oReq.response, 'test.png');
};

oReq.send();

function download(buffer, filename) {
  var file = new Blob([buffer], {
    type: 'image/png'
  });
  var fileReader = new FileReader();

  fileReader.onloadend = function(e) {
    var converted = e.target.result;
    converted.name = filename;
    converted.webkitRelativePath = filename;

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = converted;
  };
  fileReader.onerror = function(e) {
    throw new Error('Something is wrong with buffer data');
  };
  fileReader.file = file;
  fileReader.readAsDataURL(file);
}