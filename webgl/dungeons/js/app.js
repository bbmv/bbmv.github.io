(function () {
/***************************************************************
*	Выдавливание фигуры по кривой
***************************************************************/
if( !Detector.webgl ) Detector.addGetWebGLMessage(); // проверка на наличие WebGL
//====== Создание сцены и ее содержания ========================
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, /*ближний предел*/0.1, /*дальний*/1000 );
camera.position.set(0, 0, 60); // от этого зависит размер геренерируемого изображения  
scene.add(camera); // можно было не добавлять, т.к. камера добавляется автоматически


var renderer = new THREE.WebGLRenderer(); // Рендерер для обработки сцены
renderer.setPixelRatio( window.devicePixelRatio ); // На случай если будут использовать на HiDPI устройствах, где реальное количество пикселов не соответствует номинальному
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(new THREE.Color(0x000000)); // очищаем фоновый цвет
renderer.shadowMap.enabled = true; // Включаем обработку теней
renderer.shadowMap.type = THREE.PCFShadowMap;

document.body.appendChild( renderer.domElement ); // Размещаем область рендеренга (canvas) на html-странице

//---- Задание сплайна Catmull-Rom -------
// Сделать, чтобы фигуры в начале и в конце замкнутой кривой совпали, не просто
// и зависит это от координат кривой
var vertces = [];
/*for(var i=0; i<10; i++) {
	vectors.push(new THREE.Vector3( 30*Math.random()-15, 30*Math.random()-15, 30*Math.random()-15 ));
}
*//*
	vertces.push(new THREE.Vector3( -6, -10,  6 ));
	vertces.push(new THREE.Vector3( -10,   2,  15 ));
	vertces.push(new THREE.Vector3( -15,  15,  10 ));
	vertces.push(new THREE.Vector3(  -7,   2, -6 ));
	vertces.push(new THREE.Vector3(  6, -10, -6 ));
*/	
	vertces.push(new THREE.Vector3( -15, -15, -15 ));
	vertces.push(new THREE.Vector3( 15, -15, -15 ));
	vertces.push(new THREE.Vector3( 15, 15, -15 ));
	vertces.push(new THREE.Vector3( -15,  15, -15 ));
	vertces.push(new THREE.Vector3( -15,  15, 15 ));
	vertces.push(new THREE.Vector3( 15,  15, 15 ));
	vertces.push(new THREE.Vector3( 15, -15, 15 ));
	vertces.push(new THREE.Vector3(  -15,   -15, 15 ));
/*
	vertces.push(new THREE.Vector3( -15, -15, -15 ));
	vertces.push(new THREE.Vector3( 15, -15, -16 ));
	vertces.push(new THREE.Vector3( 15, 15, -17 ));
	vertces.push(new THREE.Vector3( -15,  15, -18 ));
	vertces.push(new THREE.Vector3( -15,  15, 15));
	vertces.push(new THREE.Vector3( 15,  15, 16 ));
	vertces.push(new THREE.Vector3( 15, -15, 17 ));
	vertces.push(new THREE.Vector3(  -15,   -15, 18 ));
*/
var curve = new THREE.CatmullRomCurve3(vertces);

/* [
	new THREE.Vector3( -6, -10,  6 ),
	new THREE.Vector3( -6,   2,  6 ),
	new THREE.Vector3( -6,  15,  6 ),
	new THREE.Vector3(  6,   2, -6 ),
	new THREE.Vector3(  6, -10, -6 )] );
*/
/*var curve = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);*/
curve.closed = true; // замыкаем кривую


//camera.rotation.z = Math.PI;
//console.log(orbit.autoRotate);

//orbit.autoRotate = true;
//camera.updateProjectionMatrix();

//var orbit = new THREE.OrbitControls(camera);
//orbit.update();

//THREE.TubeGeometry = function(a,b,c) {};
var geomTube = new _TubeGeometry(curve, 120, 2, 4, Math.PI/4, true);
//var matTube = new THREE.MeshNormalMaterial({side: THREE.BackSide}); //new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.BackSide, transparent: true, opacity: 0.2});
/*
// задание вершин для фигуры
var verts = [];
verts.push(new THREE.Vector2(-2, -2));
verts.push(new THREE.Vector2(2, -2));
verts.push(new THREE.Vector2(2, 2));
verts.push(new THREE.Vector2(-2, 2));

var shape = new THREE.Shape( verts ); // создаем фигуру

// параметры выдавливания
var extrudeSettings = { // при выдавливании по кривой bevel и amount не работают
	steps: 300,
	amount: 10,
	bevelEnabled: true,
	bevelThickness: 0.1,
	bevelSize: 0.1,
	bevelSegments: 1,
	extrudePath: curve
};

var geomTube = new THREE.ExtrudeGeometry( shape, extrudeSettings );
*/


var matTube = new THREE.MeshPhongMaterial({//color: 0xffffff
	side: THREE.BackSide,
	map: new THREE.TextureLoader().load( '../img/textures/stone.jpg'),
	bumpMap: new THREE.TextureLoader().load( '../img/textures/stone-bump.jpg'),
	bumpScale: 0.2
}); //new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.BackSide, transparent: true, opacity: 0.2});


              matTube.map.wrapS = THREE.RepeatWrapping;
              matTube.map.wrapT = THREE.RepeatWrapping;
              matTube.bumpMap.wrapS = THREE.RepeatWrapping;
              matTube.bumpMap.wrapT = THREE.RepeatWrapping;
              matTube.map.repeat.set(67, 5);
              matTube.bumpMap.repeat.set(67, 5);
//              matTube.map.needsUpdate = true;
//              matTube.bumpMap.needsUpdate = true;

//var matTube = new THREE.MeshPhongMaterial( { color: 0xffdddd, side: THREE.BackSide } );

var meshTube = new THREE.Mesh(geomTube, matTube);
scene.add(meshTube);

//---- Установка света --------------------------
var pointLight = new THREE.PointLight( 0xffffff, 0.5, 30, 2 );
scene.add( pointLight );

var ambientLight = new THREE.AmbientLight( 0x222222 ); // Общая подсветка
//scene.add(ambientLight);

var pampkinMesh;

        var loader = new THREE.OBJLoader();
        loader.load('../img/pampkin2.obj', function (loadedMesh) {
            var material = new THREE.MeshPhongMaterial({color: 0xffb026, side: THREE.DoubleSide, shininess: 70});
            loadedMesh.children.forEach(function (child) {
                child.material = material;
            });

            pampkinMesh = loadedMesh;
            loadedMesh.scale.set(0.07, 0.07, 0.07);
            //loadedMesh.rotation.x = -0.3;
            scene.add(loadedMesh);
        });

var pampkinLight = new THREE.PointLight( 0xffffff, 2, 2, 2 );
scene.add( pampkinLight );

/*
var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
var material = new THREE.MeshPhongMaterial( { color: 0xb00000 } );
var extrudedMesh = new THREE.Mesh( geometry, material );
scene.add( extrudedMesh );

//---- Установка света --------------------------
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 3, 12, 20 );
spotLight.target = extrudedMesh; // можно нацелить свет на объект или на координаты, как показанно в закомментированном варианте ниже
//var target = new THREE.Object3D();
//target.position = new THREE.Vector3(5, 0, 0);
//spotLight.target = target;

spotLight.angle = Math.PI/4;
spotLight.castShadow = true; // этот источник света будет создавать тень

spotLight.penumbra = 0.1; // полутень на краях светового пятна
spotLight.decay = 1; // приглушение освещения
spotLight.distance = 50; // дальность освещения
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 50;

scene.add( spotLight );

var ambientLight = new THREE.AmbientLight( 0x555555 ); // Общая подсветка
scene.add(ambientLight);
*/


//--- Отслеживание и компенсация изменений размера экрана ---
window.addEventListener('resize', onResize, false);
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//-----------------------------------------------------
function getAPoint(curve, count, amount) {
	return curve.getPoint((count % amount) / amount);
}
//-----------------------------------------------------
function getVectorSign(p1, p2) {
  var dx = p2.x-p1.x;
  var dy = p2.y-p1.y;
  var dz = p2.z-p1.z;
 	var sx = (dx!=0)? dx / Math.abs(dx) : 0;
 	var sy = (dy!=0)? dy / Math.abs(dy) : 0;
 	var sz = (dz!=0)? dz / Math.abs(dz) : 0;

	return {x: sx, y: sy, z: sz };
}
//-----------------------------------------------------
function changedTop(curve, count, amount) {
  var pCurr1 = getAPoint(curve, count, amount);
  var pCurr2 = getAPoint(curve, count+50, amount);
  var pPrev1 = getAPoint(curve, count-1, amount);
  var pPrev2 = getAPoint(curve, count+49, amount);
  
  var vSignCurr = getVectorSign(pCurr1, pCurr2);
  var vSignPrev = getVectorSign(pPrev1, pPrev2);

	if( (vSignPrev.x===1 && vSignPrev.y===-1 && vSignPrev.z===0 && vSignCurr.x===-1 && vSignCurr.y===-1 && vSignCurr.z===0) ||
		(vSignPrev.x===1 && vSignPrev.y===1 && vSignPrev.z===0 && vSignCurr.x===-1 && vSignCurr.y===1 && vSignCurr.z===0) ) {
		return true;
	} 
	return false;
}
//-----------------------------------------------------

var count = 0, bnx, bnz, currSide;
var cNX, cNY, cNZ;
var currRX, currRY, currRZ;
//camera.up.x = 1;
var amount = 5000, dAmount = 500;
var pp = getAPoint(curve, count+dAmount, amount);
			var randX = pp.x + (0.4*Math.random()+0.3)*Math.pow(-1,Math.round((3*Math.random())));
			var randY = pp.y + (0.4*Math.random()+0.3)*Math.pow(-1,Math.round((3*Math.random())));
			var randZ = pp.z + (0.4*Math.random()+0.3)*Math.pow(-1,Math.round((3*Math.random())));
var fixCount = 0;
//====== Анимация с рендерингом ================================
var animate = function () {

	if(pampkinMesh) {

		if(count % dAmount === 0) {
			pp = getAPoint(curve, count+dAmount, amount);
			fixCount = count;
		}
		pampkinMesh.rotation.x = 0;
		pampkinMesh.rotation.y = 0;
		pampkinMesh.rotation.z = 0;

		pampkinMesh.position.set(pp.x, pp.y, pp.z);
		pampkinLight.position.set(pp.x, pp.y, pp.z);

		if(changedTop(curve, count+dAmount-100, amount)) {
			pampkinMesh.up.y *= -1;
		} 

		pampkinMesh.lookAt(curve.getPoint((fixCount + dAmount-50) / amount));
		pampkinMesh.rotateY(Math.PI/75*count);

		var deltaX = 0.7 * Math.cos(Math.PI/150*count);
		var deltaY = 0.7 * Math.sin(Math.PI/150*count);
		pampkinMesh.position.set(pp.x+deltaX, pp.y+deltaY, pp.z+deltaX);
		pampkinLight.position.set(pp.x+deltaX, pp.y+deltaY, pp.z+deltaX);

 		//console.log("pampkinMesh: "+pampkinMesh.up.x+", "+pampkinMesh.up.y+", "+pampkinMesh.up.z);
	}	

  var p1 = curve.getPoint(count / amount);
  var r = curve.getTangent(count / amount);
//  console.log("Tan: "+r.x+", "+r.y+", "+r.z);
  if (count == amount) {
    count = 0;
  }
  var p2 = getAPoint(curve, count+1, amount);
  var t = getAPoint(curve, count+50, amount);
  
  camera.position.set(p1.x, p1.y, p1.z);
  var sX, sY, sZ;

	if(changedTop(curve, count, amount)) {
		camera.up.y *= -1;
	} 
	count++;

// 	console.log("T: "+t.x+", "+t.y+", "+t.z);
// 	console.log("P: "+p1.x+", "+p1.y+", "+p1.z);
// 	console.log("D: "+dx+", "+dy+", "+dz);
// 	console.log("N: "+nx+", "+ny+", "+nz);
// 	console.log("Camera: "+camera.up.x+", "+camera.up.y+", "+camera.up.z);

/*
 	var rot = camera.rotation;
 	var rX = rot.x;
	var rY = rot.y; 
	var rZ = rot.z;

 	if(currRX) {
	 	var aX = Math.abs(currRX-rot.x);
	 	var aY = Math.abs(currRY-rot.y);
	 	var aZ = Math.abs(currRZ-rot.z);

	 	if( Math.abs(Math.PI - aX) < 0.01 ) { console.log("X: "+aX+":"+currRX+":"+rot.x); }
	 	if( Math.abs(Math.PI - aY) < 0.01 )	{ console.log("Y: "+aY+":"+currRY+":"+rot.y); }
	 	if( Math.abs(Math.PI - aZ) < 0.01 ) { console.log("Z: "+aZ+":"+currRZ+":"+rot.z); } 

	}
	currRX = rX;
	currRY = rY; 
	currRZ = rZ;*/
/*	var leftSide = false;
	if( (nx<0 && ny<0 && nz<0) ||
			(nx>=0 && ny>=0 && nz<0) ||
			(nx>=0 && ny<0 && nz>=0) ||
			(nx<0 && ny>=0 && nz>=0) ) {
		leftSide = true;
	}
	if( nx<0 ) {
		leftSide = true;
	}

  if(leftSide!=currSide) {
//  	console.log(nx+","+ny+","+nz);
  	camera.up.y *= -1;
	  currSide = leftSide;
  }	
*/

//  camera.up.set(r.z, r.y, r.x);
//  r = camera.rotation;
// console.log(r.x+" "+ r.y+" "+ r.z);
	//var up_curr = camera.up.y;
//  if(Math.round(r.x*100)/100<0) camera.up.y = -1;
//  else camera.up.y = 1;
//camera.updateProjectionMatrix();
//camera.updateMatrix ();
  camera.lookAt(t);
//  var ncx = camera.position.x;
 
//  orbit.update();
	pointLight.position.set(p2.x, p2.y, p2.z);

	 renderer.render(scene, camera);
	  requestAnimationFrame( animate );
};
animate();
//===============================================================
}());