(function(){function p(g,e){var c=e.x-g.x,a=e.y-g.y,b=e.z-g.z;return{x:0!=c?c/Math.abs(c):0,y:0!=a?a/Math.abs(a):0,z:0!=b?b/Math.abs(b):0}}function q(g,c,a){var b=g.getPoint(c%a/a),e=g.getPoint((c+100)%a/a),d=g.getPoint((c-1)%a/a);g=g.getPoint((c+99)%a/a);b=p(b,e);d=p(d,g);return 1===d.x&&-1===d.y&&0===d.z&&-1===b.x&&-1===b.y&&0===b.z||1===d.x&&1===d.y&&0===d.z&&-1===b.x&&1===b.y&&0===b.z?!0:!1}var m=new THREE.Scene,h=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,.1,1E3);h.position.set(0,
0,60);m.add(h);var l=new THREE.WebGLRenderer;l.setPixelRatio(window.devicePixelRatio);l.setSize(window.innerWidth,window.innerHeight);l.setClearColor(new THREE.Color(0));l.shadowMap.enabled=!0;l.shadowMap.type=THREE.PCFShadowMap;document.body.appendChild(l.domElement);var a=[];a.push(new THREE.Vector3(-15,-15,-15));a.push(new THREE.Vector3(15,-15,-15));a.push(new THREE.Vector3(15,15,-15));a.push(new THREE.Vector3(-15,15,-15));a.push(new THREE.Vector3(-15,15,15));a.push(new THREE.Vector3(15,15,15));
a.push(new THREE.Vector3(15,-15,15));a.push(new THREE.Vector3(-15,-15,15));var d=new THREE.CatmullRomCurve3(a);d.closed=!0;a=new _TubeGeometry(d,120,2,4,Math.PI/4,!0);var k=new THREE.MeshPhongMaterial({side:THREE.BackSide,map:(new THREE.TextureLoader).load("../img/textures/stone.jpg"),bumpMap:(new THREE.TextureLoader).load("../img/textures/stone-bump.jpg"),bumpScale:.2});k.map.wrapS=THREE.RepeatWrapping;k.map.wrapT=THREE.RepeatWrapping;k.bumpMap.wrapS=THREE.RepeatWrapping;k.bumpMap.wrapT=THREE.RepeatWrapping;
k.map.repeat.set(67,5);k.bumpMap.repeat.set(67,5);a=new THREE.Mesh(a,k);m.add(a);var r=new THREE.PointLight(16777215,.5,30,2);m.add(r);new THREE.AmbientLight(2236962);var f;(new THREE.OBJLoader).load("../img/pampkin2.obj",function(a){var b=new THREE.MeshPhongMaterial({color:16756774,side:THREE.DoubleSide,shininess:70});a.children.forEach(function(a){a.material=b});f=a;a.scale.set(.07,.07,.07);m.add(a)});var n=new THREE.PointLight(16777215,2,2,2);m.add(n);window.addEventListener("resize",function(){h.aspect=
window.innerWidth/window.innerHeight;h.updateProjectionMatrix();l.setSize(window.innerWidth,window.innerHeight)},!1);var c=0,b=d.getPoint((c+1E3)%1E4/1E4),t=0,u=function(){if(f){0===c%1E3&&(b=d.getPoint((c+1E3)%1E4/1E4),t=c);f.rotation.x=0;f.rotation.y=0;f.rotation.z=0;f.position.set(b.x,b.y,b.z);n.position.set(b.x,b.y,b.z);q(d,c+1E3-200,1E4)&&(f.up.y*=-1);f.lookAt(d.getPoint((t+1E3-100)/1E4));f.rotateY(Math.PI/6*c);var a=.7*Math.cos(Math.PI/3*c),e=.7*Math.sin(Math.PI/3*c);f.position.set(b.x+a,b.y+
e,b.z+a);n.position.set(b.x+a,b.y+e,b.z+a)}a=d.getPoint(c/1E4);d.getTangent(c/1E4);1E4==c&&(c=0);e=d.getPoint((c+1)%1E4/1E4);var k=d.getPoint((c+100)%1E4/1E4);h.position.set(a.x,a.y,a.z);q(d,c,1E4)&&(h.up.y*=-1);c++;h.lookAt(k);r.position.set(e.x,e.y,e.z);l.render(m,h);requestAnimationFrame(u)};u()})();