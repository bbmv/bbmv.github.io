/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finger swipe
var log;

THREE.OrbitControls = function ( object, domElement, textsUpdater ) {
    log = document.getElementById('log');


	var zeroVector = new THREE.Vector3(-1.5,0.2,-1.5);

	this.enteringTime = 2000;
	this.enteringEase = TWEEN.Easing.Quadratic.In;
	this.camera = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	this.textsUpdater = textsUpdater;
	this.getCameraBackOnTrack = getCameraBackOnTrack;

	textsUpdater.enterTextMode = function(newCameraPosition, newLookPosition, next){
		scope.enabled = false;
		scope.cameraFocused = false;
		scope.animatingCamera = true;
		console.log(newLookPosition);
		var tween1 = new TWEEN.Tween(scope.cameraLook)
				.to(newLookPosition, scope.enteringTime)
				.easing(scope.enteringEase); // Use an easing function to make the animation smooth.*/

		var tween2 = new TWEEN.Tween(scope.camera.position)
				.to(newCameraPosition, scope.enteringTime) // in 1 second.
				.easing(scope.enteringEase); // Use an easing function to make the animation smooth.

		tween1.onUpdate(onUpdate);

		tween2.onUpdate(onUpdate)
				.onComplete(function(){
					scope.cameraLook.copy(newLookPosition);
					next();
					scope.camera.position.copy(newCameraPosition);
					setTimeout(function(){
						scope.cameraFocused = true;

						scope.animatingCamera = false;
					},100);
				});

		tween1.start();
		tween2.start();

		function onUpdate(){
			scope.camera.lookAt( scope.cameraLook );
			scope.textsUpdater.update();
		}
	}.bind(this);

	this.onAnimate = function(time) {
		if(panOffset.x!==0 || panOffset.y!==0 || panOffset.y!==0 || rotation !== 0) {
			scope.update();
		}
	};

	// Set to false to disable this control
	this.cameraFocused = true;
	this.enabled = false;

	// "target" sets the location of focus, where the object orbits around
	this.lastDistanceL2 = 0;
	this.zeroVector = zeroVector;
	this.cameraLook = zeroVector.clone();
	this.altitudeTarget = new THREE.Vector3(zeroVector.x,6,zeroVector.z);
	this.upVector = new THREE.Vector3(0,1,0);
	// How far you can Pan in and out from Center

	// Set to true to enable damping (inertia)
	// If damping is enabled, you must call controls.update() in your animation loop
	this.enablePan = true;
	this.PAN_SPEED = 0.35;
	this.PAN_FRICTION_COEFF = 0.55;
	this.PAN_INERTIA_COEFF = 1.7;
	this.INERTIA_MAX_LIFE_TIME = 2000; //milli-second
	this.LOOK_RADIUS = 4.2;

	this.keyPanSpeed = 10.0;	// pixels moved per arrow key push
	this.keyPanSpeed = 1;

	// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
	// Set to false to disable zooming
	this.enableZoom = true;
	this.ZOOM_SPEED = 4.0;
	this.lowestAltitude = 2.8;
	this.highestAltitude = 9.5;

	// Set to false to disable rotating
	this.enableRotate = true;
	this.ROTATION_SPEED = 0.25;
	this.ROTATION_FRICTION_COEFF = 0.6;
	this.ROTATION_INERTIA_COEFF = 1.6;

	// Set to true to automatically rotate around the target
	// If auto-rotate is enabled, you must call controls.update() in your animation loop

	this.lookSpherical = new THREE.Spherical();
	//this.lookSpherical.setFromVector3(new THREE.Vector3(1.5, 5.8, 1.5));
	this.lookSpherical.setFromVector3(new THREE.Vector3(-1, 0, 3.5)); //camera.position.clone().sub(zeroVector)

	//tempcode
	/*window.altitudeTarget = this.altitudeTarget;
	window.camera = this.camera;
	window.zeroVector = this.zeroVector;
	window.cameraLook = this.cameraLook;
	window.lookSpherical = this.lookSpherical;*/

	// Set to false to disable use of the keys
	this.enableKeys = true;

	// The four arrow keys
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	// Mouse buttons
	this.mouseButtons = { ORBIT: THREE.MOUSE.RIGHT, PAN: THREE.MOUSE.LEFT };

	// this method is exposed, but perhaps it would be better if we can make it private...
	this.update = function () {

		var offset = new THREE.Vector3();

		return function update(forceUpdate) {
			if(scope.rotating){
				panOffset.set( 0, 0, 0 );
			} else if(scope.panning){
				rotation = 0;
			}

			var panOffsetZeroY = panOffset.clone();
			panOffsetZeroY.y = 0;
			var advancePositionL2 = (scope.cameraLook.clone()).add( panOffsetZeroY );
			var distanceL2 = scope.zeroVector.distanceTo(advancePositionL2);
			var deltaDistanceL2 = Math.ceil(scope.lastDistanceL2-distanceL2);
			var isPanTowardsZeroVector = deltaDistanceL2 > 0;
			var backwardLimit = isPanTowardsZeroVector || distanceL2 < scope.LOOK_RADIUS;

log.innerText = 'BACKWARD: ' + backwardLimit+'\n' + log.innerText;
			if(backwardLimit) {
				if(scope.panning) {
					scope.lastDistanceL2 = distanceL2;
				}

				if(forceUpdate || scope.dragged) {

					if(scale !== 1) {       // :: --- Zoom --- ::
log.innerText = 'SCALE: '+scale+'\n' + log.innerText;
						var zoomDelta = 1 - scale;
						var newY = scope.camera.position.y + zoomDelta;
						if( (scale < 1 || newY > scope.lowestAltitude) && (scale > 1 || newY < scope.highestAltitude) ) {
							panOffset.y = zoomDelta;
						}
					}

					moveCamera();
				}
				else {
					panOffset.y = 0;
					panOffset.multiplyScalar( scope.PAN_FRICTION_COEFF * scope.PAN_INERTIA_COEFF);
					rotation *= scope.ROTATION_FRICTION_COEFF * scope.ROTATION_INERTIA_COEFF;
					moveCamera();
				}
				scope.textsUpdater.update();
			} else{
				rotation = 0;
				panOffset.set( 0, 0, 0 );
			}

			scale = 1;
			return false;
			function moveCamera(){
				if(rotation) {            // :: --- Rotate --- ::
					offset.copy( scope.camera.position ).sub( scope.altitudeTarget );
					spherical.setFromVector3( offset );
					spherical.theta += rotation;
					spherical.makeSafe();
					offset.setFromSpherical( spherical );
					scope.camera.position.copy( offset ).add( scope.altitudeTarget );
				}

				scope.camera.position.add( panOffset );
				scope.altitudeTarget.add( panOffset );
				scope.cameraLook.add(panOffsetZeroY);
				scope.camera.lookAt( scope.cameraLook );
			}
		};

	}();
	function getCameraBackOnTrack(){
		if(scope.animatingCamera) return;

		scope.animatingCamera = true;
		var heightCenterVector = scope.zeroVector.clone();
		var positionVector = scope.camera.position.clone();
		var newPosition;

		scope.cameraLook.y += scope.zeroVector.y;

		// --- Calculate Theta of look from center
		heightCenterVector.y = scope.camera.position.y;
		positionVector.sub(heightCenterVector);
		spherical.setFromVector3( positionVector );

		scope.lookSpherical.theta = spherical.theta;
		positionVector.setFromSpherical(scope.lookSpherical);

		newPosition = scope.cameraLook.clone();
		newPosition.add(positionVector);
		newPosition.y = 6;

		var tween = new TWEEN.Tween(scope.camera.position)
			.to(newPosition, 1000) // in 1 second.
			.easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
			.delay(200)
			.onUpdate(function() {
				scope.camera.lookAt( scope.cameraLook );
				scope.textsUpdater.update();
			})
			.onComplete(function(){
				scope.camera.position.copy(newPosition);
				scope.altitudeTarget.copy(scope.cameraLook);
				scope.altitudeTarget.y = scope.camera.position.y;
				scope.lastDistanceL2 = 1000; // huge value for a distance
				scope.cameraFocused = false;
				scope.enabled = true;

				scope.animatingCamera = false;
			});

		tween.start();
		scope.textsUpdater.exitTextMode();
	}
	function startDragging(){ //console.log('startDragging');
		//scope.dragged = true;
		//scope.stopInertia && clearTimeout(scope.stopInertia);
	}
	function stopDragging(){ //console.log('stopDragging');
		//scope.dragged = false;
		scope.rotating = false;
		scope.panning = false;
		/*scope.stopInertia = setTimeout(function(){
			panOffset.set( 0, 0, 0 );
			rotation = 0;
			scope.stopInertia = null;
		}, scope.INERTIA_MAX_LIFE_TIME);*/
	}

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		window.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new THREE.Spherical();
	var rotation = 0;

	var scale = 1;
	var panOffset = new THREE.Vector3();

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getZoomScale() {
		return Math.pow( 0.95, scope.ZOOM_SPEED );
	}

	function rotateLeft( angle ) {
		if((angle<0 && rotation>0) || (angle>0 && rotation<0)){
			rotation = 0;
		}
		else if(angle<0 && rotation>0){
			rotation = 0;
		}
		rotation -= angle;
	}

	var panLeft = function () {

		var v = new THREE.Vector3();

		return function panLeft( distance, objectMatrix ) {
			distance*=scope.PAN_SPEED;

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function () {

		var v = new THREE.Vector3();

		return function panUp( distance, objectMatrix ) {
			distance*=scope.PAN_SPEED;

			var matrixClone = new THREE.Matrix4();//objectMatrix.clone();
			var positionVector = new THREE.Vector3();
			positionVector.setFromMatrixPosition(objectMatrix);
			matrixClone.lookAt(positionVector, scope.altitudeTarget, scope.upVector);

			v.setFromMatrixColumn(matrixClone, 2 ); // get Z column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new THREE.Vector3();

		return function pan( deltaX, deltaY ) {

			var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

			// perspective
			var position = scope.camera.position;
			offset.copy( position ).sub( scope.altitudeTarget );
			var targetDistance = offset.length();

			// half of the fov is center to top of screen
			targetDistance *= Math.tan( ( scope.camera.fov / 2 ) * Math.PI / 180.0 );

			// we actually don't use screenWidth, since perspective camera is fixed to screen height
			panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.camera.matrix );
			panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.camera.matrix )

		};

	}();

	function dollyIn( dollyScale ) {
        log.innerText = 'InScale: '+ dollyScale +'\n' + log.innerText;
			scale *= dollyScale;
	}

	function dollyOut( dollyScale ) {
        log.innerText = 'OutScale: '+ dollyScale +'\n' + log.innerText;
			scale /= dollyScale;

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		//console.log( 'handleMouseDownRotate' );

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		//console.log( 'handleMouseDownPan' );
		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		//console.log( 'handleMouseMoveRotate' );

		rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.ROTATION_SPEED );

		rotateStart.copy( rotateEnd );

		scope.update(true);

	}

	function handleMouseMoveDolly( event ) {

		//console.log( 'handleMouseMoveDolly' );

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyIn( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyOut( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update(true);

	}

	function handleMouseMovePan( event ) {

		//console.log( 'handleMouseMovePan' );

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		//scope.update();

	}

	function handleMouseUp( event ) {

		stopDragging();
		// console.log( 'handleMouseUp' );

	}

	function handleMouseWheel( event ) {
log.innerText = 'handleMouseWheel\n' + log.innerText;
		// console.log( 'handleMouseWheel' );

		if ( event.deltaY < 0 ) {

			dollyOut( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyIn( getZoomScale() );

		}

		scope.update(true);

	}

	function handleKeyDown( event ) {

		//console.log( 'handleKeyDown' );

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				scope.update(true);
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				scope.update(true);
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				scope.update(true);
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				scope.update(true);
				break;

		}

	}

	function handleTouchStartRotate( event ) {

		//console.log( 'handleTouchStartRotate' );

		rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchStartDolly( event ) {

		//console.log( 'handleTouchStartDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyStart.set( 0, distance );

	}

	function handleTouchStartPan( event ) {

		//console.log( 'handleTouchStartPan' );

		panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

	}

	function handleTouchMoveRotate( event ) {

		//console.log( 'handleTouchMoveRotate' );

		rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

		// rotating across whole screen goes 360 degrees around
		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.ROTATION_SPEED );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

    function handleTouchMoveZoom( event ) {
log.innerText = 'handleTouchMoveZoom\n' + log.innerText;
        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyEnd.set( 0, distance );

        dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

        dollyIn( dollyDelta.y );

        dollyStart.copy( dollyEnd );

        scope.update(true);

    }

    function handleTouchMoveDolly( event ) {
log.innerText = 'handleTouchMoveDolly\n' + log.innerText;

		//console.log( 'handleTouchMoveDolly' );

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyEnd.set( 0, distance );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyOut( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyIn( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update(true);

	}

	function handleTouchMovePan( event ) {

		//console.log( 'handleTouchMovePan' );

		panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		panDelta.subVectors( panEnd, panStart );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleTouchEnd( event ) {

		//console.log( 'handleTouchEnd' );

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if( scope.cameraFocused === true ) getCameraBackOnTrack();
		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( event.button ) {

			case scope.mouseButtons.ORBIT:

				if ( scope.enableRotate === false ) return;
				scope.rotating = true;

				handleMouseDownRotate( event );

				state = STATE.ROTATE;

				break;

			case scope.mouseButtons.PAN:

				if ( scope.enablePan === false ) return;
				scope.panning = true;

				handleMouseDownPan( event );

				state = STATE.PAN;
                state = STATE.DOLLY;

				break;

		}


		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );
			startDragging();
		}

	}

	function onMouseMove( event ) {

		event.preventDefault();

		switch ( state ) {

			case STATE.ROTATE:

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

				break;

			case STATE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

				break;

			case STATE.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

				break;

		}

	}

	function onMouseUp( event ) {

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if( scope.cameraFocused === true ) getCameraBackOnTrack();

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		handleMouseWheel( event );

		scope.dispatchEvent( startEvent ); // not sure why these are here...
		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		event.preventDefault();
		event.stopPropagation();
		startDragging();

		if( scope.cameraFocused === true ) getCameraBackOnTrack();

		if ( scope.enabled === false ) return;

		switch ( event.touches.length ) {

			case 1:	// one-fingered touch: pan

				if ( scope.enablePan === false ) return;
				scope.panning = true;
				handleTouchStartPan( event );

				state = STATE.TOUCH_PAN;

				break;

			case 2:	// two-fingered touch: dolly-rotate

                if ( scope.enableZoom === false && scope.enableRotate === false ) return;

                if ( scope.enableRotate === true) {

                    //scope.rotating = true;

                	handleTouchStartRotate( event );
                    state = STATE.TOUCH_ROTATE;
                }

                if ( scope.enableZoom === true) {

                	handleTouchStartDolly( event );
                    state = STATE.TOUCH_DOLLY;
                }

                break;

/*			case 3: // three-fingered touch: dolly

				if ( scope.enableZoom === false ) return;

				handleTouchStartDolly( event );

				state = STATE.TOUCH_DOLLY;

				break;*/

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

			case 1: // one-fingered touch: pan
                log.innerText = 'touch 1\n' + log.innerText;

				if ( scope.enablePan === false ) return;
				if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

				handleTouchMovePan( event );

				break;

			case 2: // two-fingered touch: dolly-rotate
                log.innerText = 'touch 2\n' + log.innerText;

                if ( scope.enableZoom === false && scope.enableRotate === false ) return;
                //if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?

                if ( scope.enableZoom === true) handleTouchMoveDolly( event ); // handleTouchMoveZoom( event ); //
                //if ( scope.enableRotate === true) handleTouchMoveRotate( event );

/*				if ( scope.enableRotate === false ) return;
				if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

				handleTouchMoveRotate( event );*/

				break;

/*			case 3: // three-fingered touch: dolly

				if ( scope.enableZoom === false ) return;
				if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

				handleTouchMoveDolly( event );

				break;*/

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		event.preventDefault();
		event.stopPropagation();

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;
		stopDragging();

	}

	function onContextMenu( event ) {

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	window.addEventListener( 'keydown', onKeyDown, false );

	// force an update at start

	this.update(true);

};

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;