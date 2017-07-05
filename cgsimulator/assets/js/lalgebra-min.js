var lalgebra=function(){function k(a,b){var c=Error(a);c.code=b;return c}function m(a){for(var b=[],c=0;c<a;c+=1)b[c]=[];return b}function n(a){if(isNaN(parseFloat(a))||!isFinite(a))throw k("The value is not a number!","la-004");return!0}function t(a){var b;if(!(a instanceof Array))throw k("Array is undefined!","la-001");var c=a.length;if(0===c)throw k("Array has zero dimension!","la-002");for(var d=0;d<c;d+=1){var e=a[d].length;b||(b=e);if(b!==e)throw k("Array has a different amount of elements in the rows!",
"la-003");b=e}for(d=0;d<c;d+=1)for(b=0;b<e;b+=1)if(!n(a[d][b]))return!1;return!0}function u(a){if(!t(a))return!1;var b=a.length;var c=a[0].length;newArr=m(b);for(var d=0;d<b;d+=1)for(var e=0;e<c;e+=1)newArr[d][e]=a[d][e];return newArr}function h(a){function b(a,b){if(a>=d||0>a||b>=e||0>b)throw k("The index out of range!","la-mx-001");return!0}var c,d,e;this.initElems=function(a){c=u(a);d=c.length;e=c[0].length};this.getElems=function(){return u(c)};this.getRows=function(){return d};this.getCols=function(){return e};
this.getElem=function(a,d){b(a,d);return c[a][d]};this.setElem=function(a,d,e){n(a)&&b(d,e)&&(c[d][e]=a)};this.initElems(a)}function q(a,b){return{x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x}}function v(a,b){return a.x*b.x+a.y*b.y+a.z*b.z}function w(a,b,c){return v(q(a,b),c)}function r(a){return 180*a/Math.PI}h.prototype.trace=function(){for(var a=this.getRows(),b=this.getCols(),c=this.getElem,d,e=0;e<a;e+=1){d="["+String(c(e,0));for(var f=1;f<b;f+=1)d=d+","+String(c(e,f));d+="]";console.log(d)}};
h.prototype.multiply=function(a){if(!(a instanceof h))throw k("Attempt to multiply by an undefined matrix!","la-mx-002");var b=this.getElem,c=a.getElem,d=this.getRows(),e=this.getCols(),f=a.getRows();a=a.getCols();if(e!==f)throw k("Attempt to multiply a matrix with dimensions "+d+"x"+e+" by a matrix with dimensions "+f+"x"+a+"!","la-mx-003");f=m(d);for(var g=0;g<d;g+=1)for(var p=0;p<a;p+=1)for(var l=f[g][p]=0;l<e;l+=1)f[g][p]+=b(g,l)*c(l,p);return new h(f)};h.prototype.transpose=function(){for(var a=
this.getElem,b=this.getRows(),c=this.getCols(),d=m(c),e=0;e<b;e+=1)for(var f=0;f<c;f+=1)d[f][e]=a(e,f);return new h(d)};h.prototype.getCopy=function(){for(var a=this.getElem,b=this.getRows(),c=this.getCols(),d=m(b),e=0;e<b;e+=1)for(var f=0;f<c;f+=1)d[e][f]=a(e,f);return new h(d)};h.prototype.getMinor=function(a,b){for(var c=this.getElem,d=this.getRows(),e=this.getCols(),f=m(d-1),g=0,k=0;g<d;g+=1)if(g!==a){for(var l=0,n=0;l<e;l+=1)l!==b&&(f[k][n]=c(g,l),n+=1);k+=1}return new h(f)};h.prototype.determinant=
function(){var a=this.getElem,b=this.getRows(),c=this.getCols(),d=0;if(b!==c)throw k("Attempt to transpose a non quadratic matrix!","la-mx-004");switch(b){case 2:d=a(0,0)*a(1,1)-a(0,1)*a(1,0);break;default:for(b=0;b<c;b++)d+=a(0,b)*Math.pow(-1,2+b)*this.getMinor(0,b).determinant()}return d};h.prototype.inverse=function(){var a=this.getRows(),b=this.getCols(),c=this.determinant();if(0===c)throw k("Inverse matrix does not exist!","la-mx-005");for(var d=m(a),e=0;e<a;e+=1)for(var f=0;f<b;f+=1)d[e][f]=
Math.pow(-1,2+e+f)*this.getMinor(e,f).determinant()/c;return(new h(d)).transpose()};h.prototype.normolize=function(){for(var a=this.getRows(),b=this.getCols(),c=this.getElem,d,e=m(a),f=0;f<a;f++)for(var g=0;g<b;g++)d=c(f,b-1),e[f][g]=0!=d?c(f,g)/d:0;return new h(e)};return{errMsg:k,check2dArray:t,checkSegment:function(a){if(!a.p1||!a.p2)throw k("Segment should have two points: p1 and p2!","la-005");var b=a.p1;a=a.p2;b.x=parseFloat(b.x);b.y=parseFloat(b.y);b.z=parseFloat(b.z);a.x=parseFloat(a.x);a.y=
parseFloat(a.y);a.z=parseFloat(a.z);return isNaN(b.x)||isNaN(b.y)||isNaN(b.z)||isNaN(a.x)||isNaN(a.y)||isNaN(a.z)?!1:!0},isNumber:n,Matrix:h,getIntersection:function(a,b,c,d){var e={};if(0!=w({x:b.x-a.x,y:b.y-a.y,z:b.z-a.z},{x:d.x-c.x,y:d.y-c.y,z:d.z-c.z},{x:b.x-c.x,y:b.y-c.y,z:b.z-c.z}))return console.log("\u041e\u0442\u0440\u0435\u0437\u043a\u0438 \u0432 \u0440\u0430\u0437\u043d\u044b\u0445 \u043f\u043b\u043e\u0441\u043a\u043e\u0441\u0442\u044f\u0445!"),!1;var f=(b.x-a.x)*(d.y-c.y)-(b.y-a.y)*(d.x-
c.x),g=(d.y-c.y)*(b.x-a.x)-(d.x-c.x)*(b.y-a.y);if(0===f||0===g)return console.log("\u041f\u0440\u044f\u043c\u044b\u0435 \u043f\u0430\u0440\u0430\u043b\u043b\u0435\u043b\u044c\u043d\u044b!"),!1;f=((c.x-a.x)*(d.y-c.y)-(c.y-a.y)*(d.x-c.x))/f;a=((c.x-a.x)*(b.y-a.y)-(c.y-a.y)*(b.x-a.x))/g;if(0>f||1<f||0>a||1<a)return console.log("The segments are not intersection!"),!1;e.x=Math.round(c.x+(d.x-c.x)*a);e.y=Math.round(c.y+(d.y-c.y)*a);e.z=Math.round(c.z+(d.z-c.z)*a);return e},vectorMagnitude:function(a){return Math.sqrt(a.x*
a.x+a.y*a.y+a.z*a.z)},vectorProduct:q,scalarProduct:v,tripleProduct:w,normal:function(a,b,c){a=q({x:b.x-a.x,y:b.y-a.y,z:b.z-a.z},{x:c.x-a.x,y:c.y-a.y,z:c.z-a.z});return 0===a?(console.log("The segments are parallel!"),!1):a},getAngles:function(a){var b=a.x,c=a.y;a=a.z;var d=lalgebra.radianToDegree,e={},f=1;0>b&&(f=-1);e.a=0!==b||0!==a?d(Math.acos(a/Math.sqrt(b*b+a*a)))*f:0;e.b=d(Math.acos(c/Math.sqrt(b*b+c*c+a*a)));return e},cartesianToSpherical:function(a){var b=a.x;var c=a.y;var d=a.z;a=Math.sqrt(b*
b+c*c+d*d);0===a?c=d=0:(d=Math.acos(d/a),0===b?c=0>c?3*Math.PI/2:Math.PI/2:(c=Math.atan(c/b),0>b&&(c+=Math.PI)));return{r:a,a:r(c),b:r(d)}},degreeToRadian:function(a){return a/180*Math.PI},radianToDegree:r}}();