window.BuildingTexts = function(scene, sceneCamera){

	var scope = this;
	this.enterTextMode = null;  // function assignable from outside
	this.scene = scene;
	this.sceneCamera = sceneCamera;
	this.camera = sceneCamera;
	this.renderer = new THREE.CSS3DRenderer();

	this.buildings = [
		{
			title: 'kvarter 1',
            textPosition: new THREE.Vector3(0,100,-1400),
            cameraPosition: new THREE.Vector3(-1.5, 4.5, -9.2),
            lookPosition: new THREE.Vector3(0, 1, -4.6),
			url: "#"
		},
		{
			title: 'kvarter 2',
			textPosition: new THREE.Vector3(-500,100,200),
			cameraPosition: new THREE.Vector3(-3.1, 3.5, 2.4),
			lookPosition: new THREE.Vector3(-1.2, 0.4, 0.4),
			url: "#"
		},
		{
			title: 'kvarter 3',
			textPosition: new THREE.Vector3(1100,100,-620),
			cameraPosition: new THREE.Vector3(5.8, 5, -6.8),
			lookPosition: new THREE.Vector3(3.4, 0.4, -5),
			url: "#"
		},
		{
			title: 'kvarter 5',
			textPosition: new THREE.Vector3(-1200,100,-700),
			cameraPosition: new THREE.Vector3(-6.6, 3, 0.4),
			lookPosition: new THREE.Vector3(-4, 0.4, -2),
			url: "#"
		},
		{
			title: 'kvarter 6',
			textPosition: new THREE.Vector3(-1000,100,-2000),
			cameraPosition: new THREE.Vector3(-1.4, 4, -12.2),
			lookPosition: new THREE.Vector3(-3.2, 0.9, -10.2),
			url: "#"
		}
	];

	this.load = function(){
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10000 );
		this.camera.position.set( -360, 2400, -200 );
		this.camera.lookAt( new THREE.Vector3() );
		console.log(this.camera.aspect);

		this.text3dLayer = document.getElementById('text3dLayer');

		this.buildings.forEach(function(building){
			var elementWrapper = document.createElement('div');
			var textElement = document.createElement('span');
			var imgElement = document.createElement('a');

			elementWrapper.classList.add('building-title-text');
			textElement.textContent = building.title;
			textElement.classList.add('title');
			imgElement.classList.add('image');
			imgElement.href = building.url;
			imgElement.target="_blank";

			elementWrapper.appendChild(textElement);
			elementWrapper.appendChild(imgElement);

			elementWrapper._point_data_ = building;
			elementWrapper.addEventListener('click', this.onTextClicked, true);
			elementWrapper.addEventListener('touchstart', this.onTextClicked, true);

			var sprite = new THREE.CSS3DSprite( elementWrapper );
			sprite.position.copy(building.textPosition);
			this.scene.add( sprite );
		}.bind(this));
		this.text3dLayer.appendChild( this.renderer.domElement );
	};

	this.setSize = function () {
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.render( this.scene, this.camera );
	};

	this.update = function(){
		this.camera.position.copy(this.sceneCamera.position);
		this.camera.rotation.copy(this.sceneCamera.rotation);
		this.camera.position.multiplyScalar(300);
		//console.log(this.sceneCamera.position);
		this.renderer.render( this.scene, this.camera );
	};

	this.onTextClicked = function (event){   // clicked dom node is this
		if(scope.animatingCamera === true)  return;
        window.ORBIT.enabled = false;

		if(!scope.selectedNode) {
			scope.animatingCamera = true;
			var node = this;
			var data = node._point_data_;
			scope.selectedNode = node;
			setTimeout( function() {
				node.classList.add( 'building-title-text-selected' );
				scope.text3dLayer.classList.add( 'black-out' );
			}, 1200 );
			scope.enterTextMode( data.cameraPosition, data.lookPosition, function() {
				scope.animatingCamera = false;
			} );
		}
	};
	this.exitTextMode = function(){
		if(scope.selectedNode) {
			var data = scope.selectedNode._point_data_;
			scope.selectedNode.classList.remove( 'building-title-text-selected' );
			scope.text3dLayer.classList.remove( 'black-out' );
			scope.selectedNode = null;
		}
	};
};