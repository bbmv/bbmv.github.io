(function(){function da(a,b){function g(a){var b=[-60,60];var h=[-80,40],f=[10,0],w=[-50,50],k=[-50,50],p=[-10,0],d=new THREE.Color("hsl("+(240*Math.random()+120)+", 60%, 80%)");c.attributes.aColor.setXYZ(a,d.r,d.g,d.b);b={x:Math.random()*(b[1]-b[0])+b[0],y:Math.random()*(h[1]-h[0])+h[0],z:Math.random()*(f[1]-f[0])+f[0],size:1.5*Math.random()+1,opacity:1,idx:a};a={x:Math.random()*(w[1]-w[0])+w[0],y:Math.random()*(k[1]-k[0])+k[0],z:Math.random()*(p[1]-p[0])+p[0],size:.5*Math.random()+.5,opacity:0,
idx:a};(new TWEEN.Tween(b)).to(a,3E3*Math.random()+3E3).easing(TWEEN.Easing.Sinusoidal.In).onUpdate(function(){c.attributes.position.setXYZ(this.idx,this.x,this.y,this.z);c.attributes.size.setX(this.idx,this.size);c.attributes.opacity.setX(this.idx,this.opacity)}).delay(6E3*Math.random()).onComplete(function(){g(this.idx)}).start()}var c=function(a){for(var c=[],b=[],f=[],h=[],g=0;g<a;g++)h.push(0),h.push(0),h.push(0),f.push(.5,.5,.5),c.push(1),b.push(0);a=new THREE.BufferGeometry;a.addAttribute("position",
new THREE.Float32BufferAttribute(h,3));a.addAttribute("aColor",new THREE.Float32BufferAttribute(f,3));a.addAttribute("size",(new THREE.Float32BufferAttribute(c,1)).setDynamic(!0));a.addAttribute("opacity",(new THREE.Float32BufferAttribute(b,1)).setDynamic(!0));return a}(a),f=function(a,c){var b={map:{value:(new THREE.TextureLoader).load(c)}};b=new THREE.ShaderMaterial({uniforms:b,transparent:!0,blending:THREE.AdditiveBlending,depthTest:!1,vertexColors:!0,vertexShader:document.getElementById("particleVertexShader").text,
fragmentShader:document.getElementById("particleFragmentShader").text});b=new THREE.Points(a,b);b.sortParticles=!1;return b}(c,b);C.add(f);(function(){for(var a=0;a<c.attributes.position.count;a++)g(a)})();return{update:function(){c.attributes.position.needsUpdate=!0;c.attributes.size.needsUpdate=!0;c.attributes.aColor.needsUpdate=!0;c.attributes.opacity.needsUpdate=!0}}}function ea(a,b,g,c){function f(a,b,d,c){(new THREE.OBJLoader).load(a,function(a){var e=new THREE.MeshBasicMaterial({color:13056,
side:THREE.DoubleSide,visible:!1});a=(new THREE.Geometry).fromBufferGeometry(a.children[0].geometry);a.mergeVertices();x=new THREE.Mesh(a,e);k=x.geometry.vertices[parseInt(Math.random()*x.geometry.vertices.length)];0>k.x&&(k.x*=-1);0>k.y&&(k.y*=-1);0>k.z&&(k.z*=-1);D=k;C.add(x);e=[];for(var n=0;n<a.vertices.length;n++)e.push(a.vertices[n].x),e.push(a.vertices[n].y),e.push(a.vertices[n].z);a=new THREE.BufferGeometry;a.addAttribute("position",new THREE.Float32BufferAttribute(e,3));p.push({geometry:a,
color:b,opacity:d});x.geometry.translate(0,-10,20);a.translate(0,-10,20);c(a)})}function h(a){console.log(p.length);console.log(p[a]);return p[a]}function q(a,b,n,d){var c=[];c.push(new THREE.Vector3(0,0,0));for(var e=0;e<d;e++)c.push(new THREE.Vector3(a*Math.random()-a/2,b*Math.random()-b/2,n));c.push(new THREE.Vector3(100*Math.random()-50,100*Math.random()-50,0));return new THREE.CatmullRomCurve3(c)}function r(a,b,c){b=b.getPoints(c);c=[];for(var d,e=1;e<b.length;e++)d=p[a-1].geometry.clone(),d.scale(.2*
Math.random(),.2*Math.random(),.2*Math.random()),d.rotateX(2*Math.random()*Math.PI),d.rotateY(2*Math.random()*Math.PI),d.rotateZ(2*Math.random()*Math.PI),d.translate(b[e].x,b[e].y,b[e].z),c.push(d);c.push(p[a].geometry);return c}function u(a,b,d,c){for(var e=[],n=[],f=[],l=1;l<b.length;l++)e.push(b[l].attributes.position.getX(a)),n.push(b[l].attributes.position.getY(a)),f.push(b[l].attributes.position.getZ(a));return{x:e,y:n,z:f,R:d.r,G:d.g,B:d.b,opacity:c,idx:a}}var w=!1,y=!1,p=[],d=function(a,b){for(var d=
[],c=[],e=[],f=[],B,l,m=a/2,h=0;h<b;h++)B=a*Math.random()-m,l=a*Math.random()-m,f.push(B),f.push(l),f.push(0),e.push(.7,.7,.7),d.push(1),c.push(0);B=new THREE.BufferGeometry;B.addAttribute("position",new THREE.Float32BufferAttribute(f,3));B.addAttribute("aColor",new THREE.Float32BufferAttribute(e,3));B.addAttribute("size",(new THREE.Float32BufferAttribute(d,1)).setDynamic(!0));B.addAttribute("opacity",(new THREE.Float32BufferAttribute(c,1)).setDynamic(!0));return B}(a,b),v=function(a,b,d){d={map:{value:(new THREE.TextureLoader).load(d)}};
d=new THREE.ShaderMaterial({uniforms:d,transparent:!0,blending:THREE.AdditiveBlending,depthTest:!1,vertexColors:!0,vertexShader:document.getElementById("particleVertexShader").text,fragmentShader:document.getElementById("particleFragmentShader").text});d=new THREE.Points(a,d);a.translate(b.x,b.y,b.z);d.sortParticles=!1;return d}(d,g,c),z;p.push({geometry:d,color:new THREE.Color(16777215),opacity:1});C.add(v);return{addModel:f,update:function(){d.attributes.position.needsUpdate=!0;d.attributes.size.needsUpdate=
!0;d.attributes.aColor.needsUpdate=!0;d.attributes.opacity.needsUpdate=!0},rotateY:function(a){v.rotateY(a)},firstTransition:function(a,b,c,f){function e(){d.attributes.position.setXYZ(this.idx,this.x,this.y,this.z);d.attributes.size.setX(this.idx,this.size);d.attributes.aColor.setXYZ(this.idx,this.R,this.G,this.B);d.attributes.opacity.setX(this.idx,this.opacity)}var n=p[a].geometry;a=p[a].color;var h=0,l=new THREE.Color(t[0].color);w=!1;for(var m=0;m<d.attributes.position.count;m++){var g={x:d.attributes.position.getX(m),
y:d.attributes.position.getY(m),z:d.attributes.position.getZ(m),size:.3,R:l.r,G:l.g,B:l.b,opacity:0,idx:m};var k={x:n.attributes.position.getX(m),y:n.attributes.position.getY(m),z:n.attributes.position.getZ(m),size:.15,R:a.r,G:a.g,B:a.b,opacity:1,idx:m};m>=n.attributes.position.count&&(k.opacity=0);(new TWEEN.Tween(g)).to(k,b*Math.random()).easing(TWEEN.Easing.Sinusoidal.In).onUpdate(e).delay(c).onStart(function(){}).onComplete(function(){h++;h===d.attributes.position.count-1&&(w=!0,z=d.clone(),f())}).start()}},
transition:function(a,b){function c(){d.attributes.position.setXYZ(this.idx,this.x,this.y,this.z);d.attributes.aColor.setXYZ(this.idx,this.R,this.G,this.B);d.attributes.opacity.setX(this.idx,this.opacity)}var e=p[b].color,g=p[b].opacity,M=q(300,300,-100,2);M=r(a,M,20);var k=0;w=!1;for(var l=0;l<d.attributes.position.count;l++){var m={x:d.attributes.position.getX(l),y:d.attributes.position.getY(l),z:d.attributes.position.getZ(l),R:e.r,G:e.g,B:e.b,opacity:g,idx:l};(new TWEEN.Tween(m)).to(u(l,M,p[a].color,
p[a].opacity),Math.floor(500*Math.random()+3E3)).easing(TWEEN.Easing.Exponential.InOut).onUpdate(c).onComplete(function(){k++;k===d.attributes.position.count-1&&(z=d.clone(),w=!0,a+1<=t.length&&!h(a+1)&&f(t[a].url,new THREE.Color(t[a].color),1,function(a){}))}).start()}},getPointsCloud:function(){return v},waveMesh:function(a,b,c,f){for(var e=new THREE.Vector2(E.point.x,E.point.y),n=0;n<d.attributes.position.count;n++){var h=d.attributes.position.getX(n),l=d.attributes.position.getY(n),m=d.attributes.position.getZ(n);
h=(new THREE.Vector2(h,l)).sub(e);a&&(d.attributes.position.setZ(n,Math.sin(h.length()/-b+a/c)*f/(.5*h.length())+m),d.attributes.position.needsUpdate=!0)}},stopWaving:function(){function a(){d.attributes.position.setXYZ(this.idx,this.x,this.y,this.z)}var b=0;w=!1;for(var c=0;c<d.attributes.position.count;c++){var f={x:d.attributes.position.getX(c),y:d.attributes.position.getY(c),z:d.attributes.position.getZ(c),idx:c};var h={x:z.attributes.position.getX(c),y:z.attributes.position.getY(c),z:z.attributes.position.getZ(c),
idx:c};(new TWEEN.Tween(f)).to(h,1E3).easing(TWEEN.Easing.Elastic.Out).onUpdate(a).onComplete(function(){b++;b===d.attributes.position.count-1&&(w=!0,y=!1)}).start()}},complete:function(){return w},distortion:function(){return y},moveCamera:function(a){var b=new TWEEN.Tween({x:A.position.x}),c=30;0!==a%2&&(c=-30);b.to({x:c},3500).easing(TWEEN.Easing.Exponential.InOut).onUpdate(function(){A.position.x=this.x}).start()},modelExists:h,modelsAmount:function(){return p.length},drawFrame:function(a,b,c,
f){if(k){y=!0;var h=v.position,e=b.clone().sub(h);b=e.clone().multiplyScalar(.8);e=e.length();c*=e;e=2/(.2*e);for(var g=z.attributes.position.count,l=0;l<g;l++){var m=new THREE.Vector3(z.attributes.position.getX(l),z.attributes.position.getY(l),z.attributes.position.getZ(l));new THREE.Vector3(d.attributes.position.getX(l),d.attributes.position.getY(l),d.attributes.position.getZ(l));var n=m.clone().sub(b).length(),p=m.clone();m.sub(h).normalize().multiplyScalar(Math.sin(n*e+.5-a/500)*c*Math.exp(-n/
f));m.add(p);d.attributes.position.setXYZ(l,m.x,m.y,m.z)}}},wave:function(a,b,c,f){for(var h=new THREE.Vector2(10,10),e=0;e<d.attributes.position.count;e++){var g=d.attributes.position.getX(e),l=d.attributes.position.getY(e),m=d.attributes.position.getZ(e);g=(new THREE.Vector2(g,l)).sub(h);a&&(d.attributes.position.setZ(e,Math.sin(g.length()/-b+a/c)*f+m),d.attributes.position.needsUpdate=!0)}}}}function fa(a,b,g,c){TweenMax.to(b,0,{ease:Power1.easeInOut,y:-20,scale:.8,delay:a,opacity:0});TweenMax.to(document.body,
1,{backgroundImage:"linear-gradient(-60deg, #000, #000)",delay:a});TweenMax.to(g,0,{ease:Power1.easeInOut,y:-45,scale:.8,delay:a,onComplete:c,opacity:0})}function ha(a){var b=document.querySelector("#note"),g=document.querySelector("#note__title"),c=document.querySelector("#note__text"),f=document.querySelector("#page_num .page_num_cls-2");document.querySelector("#page_num .page_num_cls-1").textContent=a;f.style.stroke=t[a-1].color;a%2?R(b):S(b);g.textContent="";g.style.color=t[a-1].color;c.textContent=
"";document.body.style.background=t[a-1].background}function T(a){function b(){a%2?R(g):S(g);c.innerHTML=t[a-1].title;c.style.color=t[a-1].color;f.innerHTML=t[a-1].text;var b=c,h=f,k=t[a-1].background;TweenMax.to(b,0,{ease:Power1.easeInOut,y:0,scale:1,opacity:1});TweenMax.to(h,0,{ease:Power1.easeInOut,y:0,scale:1,opacity:1});TweenMax.to(document.body,1,{backgroundImage:k,delay:0});TweenMax.from(b,.5,{ease:Power1.easeInOut,y:20,scale:.8,delay:0,opacity:0});TweenMax.from(h,.5,{ease:Power1.easeInOut,
y:20,delay:.5,opacity:0})}var g=document.querySelector("#note"),c=document.querySelector("#note__title"),f=document.querySelector("#note__text"),h=document.querySelector("#page_num .page_num_cls-2"),k=document.querySelector("#page_num .page_num_cls-1"),q=!1;0>a&&(q=!0,a=1);k.textContent=a;h.style.stroke=t[a-1].color;q?b():fa(0,c,f,b)}function S(a){a.classList.remove("to_left");a.classList.add("to_right")}function R(a){a.classList.remove("to_right");a.classList.add("to_left")}function U(){function a(a){a=
a.target;F+=c*(a.lastY-I);G+=c*(a.lastX-J);J=a.lastX;I=a.lastY;x.rotation.set(-F,-G,0,"XYZ");u.getPointsCloud().rotation.set(-F,-G,0,"XYZ");V.style.left=a.lastX+"px";V.style.top=a.lastY+"px";a=N.offsetHeight/2;var b=Math.sin(+F/2),f=Math.cos(+F/2),g=Math.sin(-G/2),k=Math.cos(-G/2);a=[k,0,-g,0,b*g,f,b*k,0,f*g,-b,f*k,0,a*b*g,-a*f,a*b*k,1];N.style["transform-origin"]="85% 50% 0px";N.style.transform="matrix3d("+a.join()+")"}var b=W,g=X;if(x){var c=Math.PI/8/q;O.push(TweenMax.to({lastX:J,lastY:I},Math.max(Math.abs(b-
J),Math.abs(g-I))/400,{lastX:b,lastY:g,ease:Power4.easeOut,onUpdate:a,onUpdateParams:["{self}"]}))}}var C,A,y,u,Y,r=window.innerWidth,q=window.innerHeight,Z=!1,P,E;Detector.webgl||Detector.addGetWebGLMessage();var aa=new THREE.Raycaster,x,k,t=[{title:"\u042d\u041b\u0415\u041a\u0422\u0420\u041e\u042d\u041d\u0415\u0420\u0413\u0418\u042f",text:"\u0421\u0435\u0433\u043e\u0434\u043d\u044f \u0447\u0435\u043b\u043e\u0432\u0435\u0447\u0435\u0441\u0442\u0432\u043e \u043d\u0435 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0441\u0432\u043e\u044e \u0436\u0438\u0437\u043d\u044c \u0431\u0435\u0437 \u044d\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u0435\u0441\u0442\u0432\u0430. \u0421 \u043a\u0430\u0436\u0434\u044b\u043c \u0433\u043e\u0434\u043e\u043c \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u0438 \u0440\u0430\u0441\u0442\u0435\u0442. \u0417\u0430 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 5 \u043b\u0435\u0442 \u043c\u0438\u0440\u043e\u0432\u043e\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u0438 \u0432\u044b\u0440\u043e\u0441\u043b\u043e \u043d\u0430 20%. \u041f\u043e \u0434\u0430\u043d\u043d\u044b\u043c \u043c\u0438\u043d\u0438\u0441\u0442\u0435\u0440\u0441\u0442\u0432\u0430 \u044d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u043a\u0438 \u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u043e\u0439 \u0444\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438 \u0432\u044b\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u0438 \u0441\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442  \u2013 1 071 800 000 000 \u043a\u0412\u0442/\u0447\u0430\u0441, \u0430 \u043d\u0435 \u0437\u043d\u0430\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u043c\u0435\u043d\u044c\u0448\u0435 \u0435\u0435 \u044d\u043b\u0435\u043a\u0442\u0440\u043e-\u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435 \u2013 1 054 500 000 000 \u043a\u0412\u0442/\u0447\u0430\u0441 \u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f \u0438\u0437\u0443\u0447\u0430\u0435\u0442 \u044d\u0442\u043e\u0442 \u0432\u043e\u043f\u0440\u043e\u0441 \u0441 1988 \u0433\u043e\u0434\u0430, \u0432 1991 \u0433\u043e\u0434\u0443 \u0431\u044b\u043b\u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0430\u043d\u0430 \u043f\u0435\u0440\u0432\u0430\u044f \u043e\u043f\u044b\u0442\u043d\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c, \u0430 \u0432 2017 \u0433\u043e\u0434\u0443 \u043c\u044b \u043f\u0440\u043e\u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043b\u0438 \u0441\u0431\u043e\u0440\u043a\u0443 \u043f\u0435\u0440\u0432\u043e\u0439 \u0440\u0430\u0431\u043e\u0447\u0435\u0439 \u043c\u043e\u0434\u0435\u043b\u0438. \u041a 2030 \u0433\u043e\u0434\u0443 \u043c\u044b \u043f\u043b\u0430\u043d\u0438\u0440\u0443\u0435\u043c \u043c\u043e\u0434\u0435\u0440\u043d\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0443\u044e \u0447\u0430\u0441\u0442\u044c \u043f\u0440\u043e\u043c\u044b\u0448\u043b\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u0438 \u0441\u043e\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u0444\u0435\u0440\u044b.",
color:"#7676d7",background:"linear-gradient(0deg, #041806 30%, #150352)",url:"./model/globus3.obj"},{title:"\u0420\u0415\u0421\u0423\u0420\u0421\u042b",text:"\u0421\u0445\u0435\u043c\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0445 \u044d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u0441\u0438\u0441\u0442\u0435\u043c \u044d\u0442\u043e \u044f\u0434\u0435\u0440\u043d\u044b\u0439 \u0440\u0435\u0430\u043a\u0442\u043e\u0440, \u0442\u0443\u0440\u0431\u0438\u043d\u0430, \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440, \u0444\u0430\u0431\u0440\u0438\u043a\u0438 \u0434\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b \u044d\u0442\u0438\u0445 \u0441\u0438\u0441\u0438\u0442\u0435\u043c, \u043a\u0430\u043a \u0441\u043b\u0435\u0434\u0441\u0442\u0438\u0432\u0438\u0435 \u043c\u044b \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u043c \u043a\u043b\u0430\u0434\u0431\u0438\u0449\u0435 \u044f\u0434\u0435\u0440\u043d\u044b\u0445 \u043e\u0442\u0445\u043e\u0434\u043e\u0432. \u0426\u0435\u043d\u0430 \u0442\u0430\u043a\u0438\u0445 \u044d\u043d\u0435\u0440\u0433\u043e\u0441\u0438\u0441\u0442\u0435\u043c \u043a\u0430\u043a \u0430\u0442\u043e\u043c\u043d\u0430\u044f \u044d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u043a\u0430 \u043f\u043e \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044e \u043d\u0430 2018 \u0433\u043e\u0434 \u0441\u043e\u0441\u0442\u043e\u0432\u043b\u044f\u0435\u0442 \u0434\u043e 9 \u043c\u043b\u0440\u0434 \u20ac. \u0422\u0430\u043a \u0436\u0435 \u043c\u044b \u043f\u043e\u043b\u0443\u0447\u0430\u0435\u043c \u0432\u044b\u043a\u0430\u0447\u0438\u0432\u0430\u043d\u0438\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432 \u043f\u043b\u0430\u043d\u0435\u0442\u044b \u0434\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b \u0441\u043c\u0435\u0436\u043d\u044b\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u044d\u043d\u0435\u0440\u0433\u043e\u0441\u0438\u0441\u0442\u0435\u043c: \u043d\u0435\u0444\u0442\u044c, \u0443\u0433\u043e\u043b\u044c, \u0433\u0430\u0437.",
color:"#fa00ff",background:"linear-gradient(-60deg, #003f15, #1b0383)",url:"./model/barrel3.obj"},{title:"\u042d\u041a\u041e\u041b\u041e\u0413\u0418\u042f",text:"\u041f\u043e\u0441\u043b\u0435\u0434\u0441\u0442\u0432\u0438\u044f \u0440\u0430\u0431\u043e\u0442\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u042d\u0421: \u0440\u0430\u0434\u0438\u0430\u0446\u0438\u043e\u043d\u043d\u043d\u043e\u0435 \u043e\u0431\u043b\u0443\u0447\u0435\u043d\u0438\u0435, \u0437\u0430\u0433\u0440\u044f\u0437\u043d\u0435\u043d\u0438\u0435 \u043f\u043b\u0430\u043d\u0435\u0442\u044b, \u043a\u0430\u0442\u0430\u0441\u0442\u0440\u043e\u0444\u044b \u0427\u0435\u0440\u043d\u043e\u0431\u044b\u043b\u044c, \u0424\u0443\u043a\u0443\u0441\u0438\u043c\u0430). \u0412\u043f\u0435\u0440\u0432\u044b\u0435 \u0432 \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u043e\u0434\u043d\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u0441 \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u043e\u043c \u0447\u0435\u043b\u043e\u0432\u0435\u0447\u0435\u0441\u0442\u0432\u043e \u0443\u043b\u0443\u0447\u0448\u0438\u0442 \u044d\u043a\u043e\u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u043f\u043b\u0430\u043d\u0435\u0442\u044b \u0438 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u0436\u0438\u0437\u043d\u0438. \u0412\u0430\u043c \u0431\u043e\u043b\u044c\u0448\u0435 \u043d\u0435 \u043d\u0443\u0436\u043d\u043e \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044c. \u041b\u044e\u0431\u043e\u0439 \u0432\u0438\u0434 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442\u0430 \u0441\u043c\u043e\u0436\u0435\u0442 \u0435\u0437\u0434\u0438\u0442\u044c, \u043b\u0435\u0442\u0430\u0442\u044c \u0438\u043b\u0438 \u043f\u043b\u0430\u0432\u0430\u0442\u044c \u0431\u0435\u0441\u043a\u043e\u043d\u0435\u0447\u043d\u043e. \u041f\u043e\u0442\u0440\u0435\u0431\u043d\u043e\u0441\u0442\u044c \u0432 \u0443\u0433\u043b\u0435, \u043d\u0435\u0444\u0442\u0435 \u0438 \u044f\u0434\u0435\u0440\u043d\u043e\u043c \u0442\u043e\u043f\u043b\u0438\u0432\u0435 \u043e\u0441\u0442\u0430\u043d\u0435\u0442\u0441\u044f \u0432 \u043f\u0440\u043e\u0448\u043b\u043e\u043c \u043d\u0430\u0432\u0441\u0435\u0433\u0434\u0430. \u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u0438 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u0441\u043d\u0438\u0437\u0438\u0442\u044c\u0441\u044f \u0438 \u043a\u0430\u0436\u0434\u044b\u0439 \u0447\u0435\u043b\u043e\u0432\u0435\u043a \u043f\u043e\u043b\u0443\u0447\u0438\u0442 \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u044d\u043d\u0435\u0440\u0433\u0438\u0438 \u0432 \u043b\u044e\u0431\u043e\u0439 \u0442\u043e\u0447\u043a\u0435 \u043c\u0438\u0440\u0430. \u041d\u0430\u0441\u0442\u043e\u044f\u0449\u0430\u044f \u0440\u0435\u0432\u043e\u043b\u044e\u0446\u0438\u044f \u0432 \u044d\u043d\u0435\u0440\u0433\u0435\u0442\u0438\u043a\u0435, \u044d\u043a\u043e\u043b\u043e\u0433\u0438\u0438 \u0438 \u0432 \u043d\u0430\u0448\u0435\u0439 \u0436\u0438\u0437\u043d\u0438.",
color:"#00ff10",background:"linear-gradient(-60deg, #1b0383, #3f000b)",url:"./model/plant3.obj"},{title:"\u0422\u0415\u0425\u041d\u041e\u041b\u041e\u0413\u0418\u042f",text:"\u041c\u044b \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u043c \u0432\u0430\u0448\u0435\u043c\u0443 \u0432\u043d\u0438\u043c\u0430\u043d\u0438\u044e - \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440 \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u043a\u043e\u043b\u0435\u043d\u0438\u044f, \u043d\u0435 \u0438\u043c\u0435\u044e\u0449\u0438\u0439 \u043c\u0430\u0433\u043d\u0438\u0442\u043d\u043e\u0433\u043e \u0441\u043e\u043f\u0440\u043e\u0442\u0438\u0432\u043b\u0435\u043d\u0438\u044f \u0438 \u043d\u0435 \u043d\u0443\u0436\u0434\u0430\u044e\u0449\u0438\u0439\u0441\u044f \u0432 \u0442\u043e\u043f\u043b\u0438\u0432\u0435. \u041f\u0440\u0438\u043d\u0446\u0438\u043f \u0440\u0430\u0431\u043e\u0442\u044b: \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044c \u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440, \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440 \u043f\u0438\u0442\u0430\u0435\u0442 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043b\u044c. \u042d\u0442\u043e \u0430\u0432\u0442\u043e\u043d\u043e\u043c\u043d\u043e, \u044d\u043a\u043e\u043b\u043e\u0433\u0438\u0447\u043d\u043e, \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u043e, \u0432\u044b\u0433\u043e\u0434\u043d\u043e.<br>\u041d\u0430\u0448\u0430 \u043c\u0438\u0441\u0441\u0438\u044f \u043f\u043b\u0430\u043d\u0435\u0442\u0430\u0440\u043d\u043e\u0433\u043e \u043c\u0430\u0441\u0448\u0442\u0430\u0431\u0430:<br>1. \u0437\u0430\u043c\u0435\u043d\u0438\u0442\u044c \u0432\u0441\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0435 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u0441\u0442\u0430\u043d\u0446\u0438\u0438 \u0442\u043e\u043f\u043b\u0438\u0432\u043d\u043e\u0433\u043e \u0442\u0438\u043f\u0430<br>2. \u0443\u0441\u043e\u0432\u0435\u0440\u0448\u0435\u043d\u0441\u0442\u0432\u043e\u0432\u0430\u0442\u044c \u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u0441\u043d\u0430\u0431\u0436\u0435\u043d\u0438\u044f<br>3. \u043f\u0435\u0440\u0435\u0441\u0442\u0430\u0442\u044c \u0437\u0430\u0433\u0440\u044f\u0437\u043d\u044f\u0442\u044c \u043e\u043a\u0440\u0443\u0436\u0430\u044e\u0449\u0443\u044e \u0441\u0440\u0435\u0434\u0443<br>4. \u0443\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u044d\u043a\u043e\u0441\u0438\u0441\u0442\u0435\u043c\u0443 \u0438 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u0436\u0438\u0437\u043d\u0438<br>\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043d\u0430\u0448\u0435\u0433\u043e \u0433\u0435\u043d\u0435\u0440\u0430\u0442\u043e\u0440\u0430: \u0432 1000 \u0440\u0430\u0437 \u043c\u0435\u043d\u044c\u0448\u0435",
color:"#b000ff",background:"linear-gradient(-60deg, #1b0383, #3f000b)",url:"./model/gear3.obj"},{title:"\u041f\u0420\u0418\u0411\u042b\u041b\u042c",text:'\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f Source-Energy \u00ae \u0432\u044b\u043f\u0443\u0441\u043a\u0430\u0435\u0442 \u00abMegaWatt contract\u00bb<br>\u042d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u044b\u0435 \u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u044b \u0437\u0430\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u0435 \u0432 \u00abBlockchain\u00bb.<br>\u041c\u043e\u0449\u043d\u043e\u0441\u0442\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u044e\u0442\u0441\u044f \u043f\u043e \u043d\u0430\u0441\u043b\u0435\u0434\u0441\u0442\u0432\u0443.<br>\u041a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 \u043d\u0430 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u044d\u043d\u0435\u0440\u0433\u0438\u044e (\u043e\u0431\u044a\u0435\u043c\u043e\u043c 1\u041c\u0412\u0442)<br>\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u044b\u0439 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442 "ERC-20 \u0442\u043e\u043a\u0435\u043d"<br>\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u00abMegaWatt contract\u00bb<br>\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c 1 \u043a\u043e\u043d\u0440\u0430\u043a\u0442-\u0442\u043e\u043a\u0435\u043d\u0430 (WMC) \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043d\u0430 \u0437\u0430\u043a\u043e\u043d\u043e\u0434\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u043c \u0443\u0440\u043e\u0432\u043d\u0435, \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e \u0432 \u043a\u0430\u0436\u0434\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0435.<br>\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c 1 \u041c\u0412\u0442/\u0447\u0430\u0441 \u043d\u0430 2018 \u0433\u043e\u0434:<br>\u0420\u043e\u0441\u0441\u0438\u044f 3100 \u0440\u0443\u0431\u043b\u0435\u0439 (60$)<br>\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f 19 000 \u0440\u0443\u0431\u043b\u0435\u0439 (300$)<br> \u0421\u043e\u043b\u043e\u043c\u043e\u043d\u043e\u0432\u044b \u043e\u0441\u0442\u0440\u043e\u0432\u0430 95 000 \u0440\u0443\u0431\u043b\u0435\u0439 (1583$)',
color:"#00ffff",background:"linear-gradient(-60deg, #003f15, #3f000b)",url:"./model/bitcoin3.obj"},{title:"TITLE 6",text:"TEXT 6",color:"#ff0",background:"linear-gradient(-60deg, #3f000b, #003f15)",url:"./model/barrel3.obj"}];new THREE.Vector2(-1/r*2-1,-1/-q*2+1);new THREE.Vector2(0,-1/-q*2+1);new THREE.Vector2(1/r*2-1,-1/-q*2+1);new THREE.Vector2(-1/r*2-1,0);new THREE.Vector2(0,0);new THREE.Vector2(1/r*2-1,0);new THREE.Vector2(-1/r*2-1,1/-q*2+1);new THREE.Vector2(0,1/-q*2+1);new THREE.Vector2(1/
r*2-1,1/-q*2+1);var W,X,Q,F=0,G=-.2,O=[],N=document.querySelector("#note"),V=document.querySelector("#redBar"),J=.35*r,I=.5*q,v=0,H=0,D,ba,K=0,L=0,ca=function(a){requestAnimationFrame(ca);if(x&&P){var b=P,g=x,c={intersects:!1,point:new THREE.Vector3};aa.setFromCamera(b,A);b=aa.intersectObject(g);0<b.length&&(c.point.copy(b[0].point),c.intersects=!0);E=c;if(Z=E.intersects)k=x.worldToLocal(E.point),0<k.z&&(c=k.clone().sub(D),b=Math.ceil(3*c.length()),ba=c.divideScalar(b))}u.complete()&&x&&(Z?(L=0,K++,
0<K&&(D.equals(k)||D.add(ba),.5>v&&(v+=.005),10<H&&(H-=.5),K=0)):(K=0,L++,0<L&&(.04<v&&(v-=.005),.04>v&&(v+=.005),50>H&&(H+=.5),L=0)),u.drawFrame(a,D,v,H));y.render(C,A);TWEEN.update();u.update();Y.update()};(function(){C=new THREE.Scene;A=new THREE.PerspectiveCamera(75,r/q,.001,1E4);A.position.set(-30,-10,115);C.add(A);y=new THREE.WebGLRenderer({antialias:!0,alpha:!0});y.setPixelRatio(window.devicePixelRatio);y.setSize(r,q);y.setClearColor(0,0);document.getElementById("container3D").appendChild(y.domElement);
Y=new da(20,"./maps/disc.png");u=new ea(200,22E3,new THREE.Vector3(0,0,100),"./maps/disc.png");var a=document.querySelector("#SELogo");a.style.visibility="visible";TweenMax.to(a,0,{y:.4*window.innerHeight,scale:2});ha(1);(function(){u.addModel(t[0].url,new THREE.Color(t[0].color),1,function(b){a=document.querySelector("#SELogo");TweenMax.to(a,1.5,{ease:Power1.easeInOut,scale:1,y:0,onComplete:function(){T(-1);U();u.firstTransition(1,3E3,500,function(){})}})})})();window.addEventListener("resize",function(){r=
window.innerWidth;q=window.innerHeight;A.aspect=r/q;A.updateProjectionMatrix();y.setSize(r,q)});document.addEventListener("mousemove",function(a){a.preventDefault();P=new THREE.Vector2(a.clientX/r*2-1,2*-(a.clientY/q)+1);var b=Math.min(r-150,Math.max(100,a.pageX));a=Math.min(q-100,Math.max(100,a.pageY));Q=setTimeout(function(){for(;Q;)clearTimeout(Q--);O.forEach(function(a){a.kill()});O.length=0;U()},15);W=b;X=a});var b=1,g=0;document.addEventListener("wheel",function(a){a.preventDefault();if(u.complete()){var c=
b;0>a.wheelDelta?b++:b--;var h=u.modelsAmount();console.log("amount: "+h);1>b?b=1:1<b?b=1:(console.log("model: "+b),b+1>h&&b--,b!==g&&(g=b,u.transition(b,c),u.moveCamera(b),T(b),console.log(a.wheelDelta)))}})})();ca()})();