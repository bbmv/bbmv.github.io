if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            const dataURL = this.toDataURL(type, quality).split(',')[1];
            setTimeout(function() {

                const binStr = atob( dataURL ),
                    len = binStr.length,
                    arr = new Uint8Array(len);

                for (let i = 0; i < len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );

            });
        }
    });
}

const canvas=document.createElement("canvas");
var btn22 = document.getElementById('btn22');

btn22.addEventListener('click', () => {

    canvas.toBlob((blob) => {
        saveAs(blob, "testFile.png");
    });
});
