var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.arrayFromIterator=function(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};
(function(){var a={vertices:[],faces:[],links:[]};self.onmessage=function(b){b=b.data.split("\n");for(var c=0,m=b.length;c<m;c+=1)switch(b[c][0]){case "v":var d=b[c].match(/-*[.\d]+/g);if(3!==d.length)throw"abnormal file format - "+(c+1)+": "+b[c];a.vertices.push(+d[0],+d[1],+d[2]);break;case "f":d=b[c].match(/[.\d]+/g);if(3!==d.length)throw"abnormal file format - "+(c+1)+": "+b[c];d=[+d[0]-1,+d[1]-1,+d[2]-1];a.faces.push.apply(a.faces,$jscomp.arrayFromIterable(d));for(var h=[0,1,2,0],g=0,n=h.length;g<
n-1;g+=1){var k=d[h[g]],l=d[h[g+1]];a:{var e=a.links;for(var f=0,p=e.length;f<p;f+=2)if(k===e[f]&&l===e[f+1]||l===e[f]&&k===e[f+1]){e=!0;break a}e=!1}e||a.links.push(k,l)}}postMessage(a)}})();