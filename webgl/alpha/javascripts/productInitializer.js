let detailsContainer, clock, isAnimated, isTextured, cubeMap, texturePath;
let detailsCamera, detailsScene, detailsRenderer, detailsObject, detailsParts, detailsGroup, detailsPlane;
let orbitControls, animationSpeed;
let enableAutospin, isSingleMulti, sentLoaded, alreadyRunningLoop, arEnabled, isProductInitialized = false;
let materials = {}, modelParts = {}, defaultConfig = {}, detailsLights = {};
let lightColorMap = [];
let textureLoader, loaderPRWM;

console.log("BAETES: loading viewer version: " + viewerVersion);

function initPreview( mapMod ) {
	var prev = product.textures.preview;
	if( prev !== undefined ) {
		if( typeof product.modelFile == 'object' ) {
			var previewPath = assetPrepend + "/" + productID + "/" + modMap( prev, mapMod ) + '?ver=1';
			$('#preview_container').css({
				'background-image': 'url(' + previewPath + ')'
			});
		} else {
			var previewPath = assetPrepend + "/" + productID + "/textures/" + modMap( prev, mapMod ) + '?ver=1';
			$('#preview_container').css({
				'background-image': 'url(' + previewPath + ')'
			});
		}
	}
}

function initProduct() {

	if ( typeof frameworkLoaded == "undefined" ) {
		setTimeout( initProduct, 50);
		return
	}

	detailsContainer = document.getElementById('3dcontainer');

	parseConfig();
	initCamera();
	initCubeMap();
	initLightColorMap();

	isAnimated = true;
	isTextured = false;

	detailsScene = new THREE.Scene();
	detailsRenderer = new THREE.WebGLRenderer({
					antialias: true,
						alpha: true,
		preserveDrawingBuffer: true
	});

	clock = new THREE.Clock();

	// var progressWheel = $( '#progress_wheel' )[0];
	// const pw_circumference = progressWheel.r.baseVal.value * 2 * Math.PI;
	// progressWheel.style.strokeDasharray = pw_circumference + ' ' + pw_circumference;
	// progressWheel.style.strokeDashoffset = pw_circumference;

	var loadingManager = new THREE.LoadingManager();

	loadingManager.onLoad = function() {

        pStat["done"] = performance.now() - pStat["start"];
		isTextured = true;
		onLoadUpdateUI();

		if( product.modelFile._text ) {
			onLoadUpdateText();
		}

		if( !sentLoaded ) {
			parent.postMessage(JSON.stringify("loaded"), '*');
			sentLoaded = true;
		}
	};

	loadingManager.onProgress = function ( xhr, items, itemsTotal ) {
		if (xhr.lengthComputable) {
			if (xhr.loaded === xhr.total) {
				// console.log('File size: ' + (xhr.total / 1024).toFixed(2) + 'kB');
				pStat["modelSize"] = (xhr.total / 1024).toFixed(2);
			}
		}
		// const percentComplete = Math.round(items/itemsTotal * 100, 2);
	 //  	const offset = pw_circumference - percentComplete / 100 * pw_circumference;
	 //  	progressWheel.style.strokeDashoffset = offset;
	};

	loadProduct(loadingManager);

	initLights();

	if( product.modelFile._text ) {
		loadText();
	}

	detailsScene.add( detailsGroup )

	//Create shadow maps
	updateShadowMaps();
	initDetailsPlane();

	detailsGroup.onObjectAdded = function () {
		// Move plane so that it is below model
		initDetailsPlane();
		// Resize shadow maps so that we can cast shadow for entire model
		updateShadowMaps();
	};

	detailsRenderer.setClearColor(0xffffff, 0.0);
	detailsRenderer.setPixelRatio(window.devicePixelRatio);
	detailsRenderer.setSize(detailsContainer.clientWidth, detailsContainer.clientHeight);
	detailsRenderer.shadowMap.enabled = true;
	detailsRenderer.shadowMap.autoUpdate = false;
	detailsRenderer.shadowMap.type = THREE.VSMShadowMap;
	detailsContainer.appendChild(detailsRenderer.domElement);

	// Set controls - ORBIT controls
	initControls();

	onWindowResize();
	window.addEventListener("resize", onWindowResize, false);
	window.addEventListener("orientationchange", onWindowResize, false);
	document.addEventListener("keyup", function(e){
		// if( e.which == 83 )
		// 	snapshot();
		if( e.which == 82 )
			console.log( detailsCamera.position );
		if( e.which == 80 )
			console.log( performStats() );
	});

	isProductInitialized = true;
}

function initCamera() {

    //The speed of the details switching animation (in milliseconds : 1000 = 1 second)
	animationSpeed = 500;

	if ( product.camera.orthographic ) {
		detailsCamera = new THREE.OrthographicCamera(detailsContainer.clientWidt / -8, detailsContainer.clientWidt / 8,detailsContainer.clientHeight / 8, detailsContainer.clientHeight / -8, 10, 2000 );
	} else {
		detailsCamera = new THREE.PerspectiveCamera(product.camera.fov, detailsContainer.clientWidth / detailsContainer.clientHeight, 10, 2000);
	}
	detailsCamera.position.set( product.camera.defaultCam.x, product.camera.defaultCam.y, product.camera.defaultCam.z );
	detailsCamera.lookAt(new THREE.Vector3(0, 0, 0));
}

function initCubeMap() {
	pStat["envStart"] = performance.now() - pStat["start"];

	// Search for envmap URL parameter, else default to mossymountains
	loadEnvMap = (typeof queryParams.envmap === 'string') ? queryParams.envmap : "mossymountains";

	// Load the Cube Map
	var cubeTextureLoader = new THREE.CubeTextureLoader();
	var path = "/3dmodels/" + loadEnvMap + "/";
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];
	cubeMap = cubeTextureLoader.load(urls, function(){
		pStat["envEnd"] = performance.now() - pStat["start"];
		cubeMap.format = THREE.RGBFormat;
	});
}

function initLights() {

    for ( i in product.lighting.lights ) {
		var light = product.lighting.lights[i];
		if ( light.lightColor !== undefined ) {
			light.color = convertColorMaptoColor(light.lightColor);
			delete product.lighting.lights[i].lightColor;
		}
		if ( light.type == 'point' ) light.type = 'directional';
		switch(light.type) {
			case 'ambient':
				detailsLights[i] = new THREE.AmbientLight();
				detailsLights[i].intensity = light.intensity;
				detailsLights[i].color = light.color;
				break;
			case 'directional':
				detailsLights[i] = new THREE.DirectionalLight();
				detailsLights[i].intensity = light.intensity;
				detailsLights[i].color = light.color;
				detailsLights[i].position.set( light.position.x, light.position.y, light.position.z );
				detailsLights[i].castShadow = light.castShadow || false;
				if (light.castShadow) {
					detailsLights[i].shadow.bias = -0.0005;
					detailsLights[i].shadow.radius = ( light.shadowRadius === undefined ? 5 : light.shadowRadius );
					detailsLights[i].shadow.mapSize.height = detailsLights[i].shadow.mapSize.width = light.shadowMapSize || 512;
				}
				break;
		}
		detailsScene.add(detailsLights[i]);
	}
}

function loadProduct(loadingManager) {

    var modelURLs = [];

    console.log(product.modelFile);
	if( typeof(product.modelFile) == "string" ) {
        modelURLs.push(assetPrepend + "/" + productID + "/" + product.modelFile);
    }
	else {
		if( typeof(product.modelFile) == "object" && product.modelFile !== null && Object.keys(product.modelFile).length == 1 ) {
			console.log("isSingleMulti");
			isSingleMulti = true;
		}
		var modelFiles = Object.keys(product.modelFile);
		if( product.modelFile._text ) {
			if ( typeof textModuleLoaded == "undefined" ) {
				setTimeout( loadProduct(loadingManager), 50 );
				return
			}
			initText(modelFiles);
		}
		for( modelFile in modelFiles ){
			modelURLs.push(assetPrepend + "/" + productID + "/" + modelFiles[modelFile] + "/" + Object.keys(product.modelFile[modelFiles[modelFile]])[0] + ".*.prwm" );
		}
	}

	pStat["modelStart"] = performance.now() - pStat["start"];
	loaderPRWM = new THREE.PRWMLoader(loadingManager);
	detailsParts = {};
	detailsGroup = new THREE.Group();
	textureLoader = new THREE.TextureLoader(loadingManager);

	for( modelURL in modelURLs ) {
		var modelIndex = modelURL;
		(function(currIndex){
			var loadURL = modelURLs[currIndex];
			var urlParts = modelURLs[currIndex].split('/')
			var part = urlParts[urlParts.length-2];
			if( defaultConfig[part] !== undefined && defaultConfig[part].model !== undefined ){
				loadURL = "";
				for( urlPart in urlParts ) {
					if( urlPart == urlParts.length-2 ){
						loadURL += part + "/";
					} else if( urlPart == urlParts.length-1) {
						loadURL += defaultConfig[part].model + urlParts[urlPart].substring(urlParts[urlPart].indexOf('.'))
					} else {
						loadURL += urlParts[urlPart] + "/";
					}
				}
			}
			if( loadURL.charAt(0) == '/' && loadURL.charAt(1) == '/' )
				loadURL = loadURL.substring(2,loadURL.length);

			if( loadURL.lastIndexOf( '/' ) > 2 )
			if( loadURL.charAt(loadURL.lastIndexOf('/') - 1) == '/' ) {
				var tempLoadURL = loadURL.substring( 0, loadURL.lastIndexOf( '/' ) ) + productID + loadURL.substring( loadURL.lastIndexOf( '/' ), loadURL.length );
				loadURL = tempLoadURL;
			}

            loadURL = '/assets/mesh/model.le.prwm';
			loaderPRWM.load( loadURL, function (geometry) {

				materials[modelURLs[currIndex]] = new THREE.MeshStandardMaterial({
					color: 0xffffff,
					envMap: cubeMap
				});

				materials[modelURLs[currIndex]].side = THREE.FrontSide;

				var	albedoPath = modMap( product.textures.albedo, mapMod );
				var	normalPath = product.textures.normal;
				var	metallicPath = product.textures.metallic;
				var	roughnessPath = product.textures.roughness;
				var	aoPath = product.textures.specular;
				var alphaPath = product.textures.alpha;
				var matSave, albedoSave, file, file2;
				var texPos = 0;

				if( modelURLs.length == 1 && !isSingleMulti ) {
					texturePath = "/assets/textures/";

				} else
				    {
					file = modelURLs[currIndex].replace( assetPrepend + "/" + productID + "/", "" ).replace( ".*.prwm", "" );

					file2 = file.substring( file.indexOf('/') + 1, file.length );
					file = file.substring( 0, file.indexOf('/') );

					if( defaultConfig[file] !== undefined && defaultConfig[file].model !== undefined ) {
						file2 = defaultConfig[file].model;
					}
					textureName = file2;
					if( defaultConfig !== undefined ) {
						if( defaultConfig[file] !== undefined ) {
							if( defaultConfig[file]["material"] !== undefined ) {
								textureName = defaultConfig[file]["material"];
							}
						}
					}
					for( texture in product.modelFile[file][file2].textures ) {
						if( product.modelFile[file][file2].textures[texture].name == textureName){
							texPos = texture;
						}
					}
					texturePath = loadURL.replace(".*.prwm","") + "/";
				}
				if( $( window ).width() > 420 && product.textures.resolution !== undefined ) {
					texturePath += product.textures.resolution[0] + "/";
				}

				pStat["tex"] = performance.now() - pStat["start"];

				if( product.textures.envMapIntensity !== undefined ) {
					materials[modelURLs[currIndex]].envMapIntensity = product.textures.envMapIntensity;
				} else {
					materials[modelURLs[currIndex]].envMapIntensity = 4;
				}

				if( modelURLs.length > 1 || isSingleMulti ) { //Only runs for multi parts
					var partConfig = defaultConfig[file];
					var partDetails = product.modelFile[file];
					var modelName = file2;
					var modelDetails = partDetails[modelName];
					var defaultTex = modelDetails.textures[texPos];
					if( partConfig !== undefined ) {
						if( partConfig["model"] !== undefined ) {
							modelName = partConfig.model;
						}
						// if( partConfig["material"] !== undefined ) {
						// 	defaultTex = partConfig.material;
						// 	console.log( defaultTex );
						// }
					}

					matSave = defaultTex.name;

					if( defaultConfig[part] !== undefined && defaultConfig[part].albedo !== undefined ){
                        if( defaultTex.albedo[defaultConfig[part].albedo] !== undefined ) {
							var pathString = texturePath + "albedo_" + defaultConfig[part].albedo + "." + defaultTex.albedo[defaultConfig[part].albedo].ext;
							var albedoMap = textureLoader.load( pathString, function(){

								pStat["albedoEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].map = albedoMap;
								detailsParts[part].currentAlbedo = defaultConfig[part].albedo;
							});
						} else {
							var errorString = "%cERROR: Albedo: " + defaultConfig[part].albedo + " is not valid for part: " + part
								+"\n\nValid options:";
							for( albedo in defaultTex.albedo ) {
								errorString += "\n\t" + albedo;
							}
							console.log( errorString, "color: red" );
							return;
						}
					} else if( defaultTex.albedo != undefined ) {
						var noalbedo = true;
						var keys = Object.keys(defaultTex.albedo);
						for( i=0; (i<keys.length) && (noalbedo); i++ ) {
							var key = keys[i];
							if( defaultTex.albedo[key].active == "true" ) {
								noalbedo = false;
								albedoSave = key;
								var pathString = texturePath + "albedo_" + key + "." + defaultTex.albedo[key].ext;
								var albedoMap = textureLoader.load( pathString, function(){
									pStat["albedoEnd"] = performance.now() - pStat["start"];
									materials[modelURLs[currIndex]].map = albedoMap;
								});
							}
						}
					}

					// function getExt(filename) {
					// 	return filename.split('.').pop();
					// }

					// console.log("defaultTex")
					// console.log(defaultTex)
					// console.log("modelDetails.maps")
					// console.log(modelDetails.maps)

					if( modelDetails.maps.length != 0 ) {
						if( modelDetails.maps.includes( "metallic.jpg" ) ) {
							pStat["metalStart"] = performance.now() - pStat["start"];
							var metallicMap = textureLoader.load( texturePath + "metallic.jpg", function(){
								pStat["metalEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].metalnessMap = metallicMap;
								if ( product.textures.metalnessValue !== undefined ) {
									materials[modelURLs[currIndex]].metalness = product.textures.metalnessValue;
								}
							});
						} else if( modelDetails.maps.includes( "metallic.png" ) ) {
							pStat["metalStart"] = performance.now() - pStat["start"];
							var metallicMap = textureLoader.load( texturePath + "metallic.png", function(){
								pStat["metalEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].metalnessMap = metallicMap;
								if ( product.textures.metalnessValue !== undefined ) {
									materials[modelURLs[currIndex]].metalness = product.textures.metalnessValue;
								}
							});
						}
						if( modelDetails.maps.includes( "ao.jpg" ) ){
							pStat["aoStart"] = performance.now() - pStat["start"];
							var aoMap = textureLoader.load( texturePath + "ao.jpg", function(){
								pStat["aoEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].aoMap = aoMap;
								materials[modelURLs[currIndex]].aoMapIntensity = 0.5;
							});
						} else if( modelDetails.maps.includes( "ao.png" ) ){
							pStat["aoStart"] = performance.now() - pStat["start"];
						var aoMap = textureLoader.load( texturePath + "ao.png", function(){
								pStat["aoEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].aoMap = aoMap;
								materials[modelURLs[currIndex]].aoMapIntensity = 0.5;
							});
						}
					}

					if( defaultTex.maps != undefined && defaultTex.name != undefined ) {
						if( defaultTex.maps.includes( "normal.png" ) ){
							pStat["normalStart"] = performance.now() - pStat["start"];
							var normalMap = textureLoader.load( texturePath + "normal_" + defaultTex.name + ".png", function(){
								materials[modelURLs[currIndex]].normalMap = normalMap;
								pStat["normalEnd"] = performance.now() - pStat["start"];
							});
						} else if( defaultTex.maps.includes( "normal.jpg" ) ){
							pStat["normalStart"] = performance.now() - pStat["start"];
							var normalMap = textureLoader.load( texturePath + "normal_" + defaultTex.name + ".jpg", function(){
								materials[modelURLs[currIndex]].normalMap = normalMap;
								pStat["normalEnd"] = performance.now() - pStat["start"];
							});
						}
						if( defaultTex.maps.includes( "roughness.jpg" ) ){
							pStat["roughStart"] = performance.now() - pStat["start"];
							var roughnessMap = textureLoader.load( texturePath + "roughness_" + defaultTex.name + ".jpg", function(){
								pStat["roughEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].roughnessMap = roughnessMap;
							});
						} else if( defaultTex.maps.includes( "roughness.png" ) ){
							pStat["roughStart"] = performance.now() - pStat["start"];
							var roughnessMap = textureLoader.load( texturePath + "roughness_" + defaultTex.name + ".png", function(){
								pStat["roughEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].roughnessMap = roughnessMap;
							});
						}
						if( defaultTex.maps.includes( "alpha.jpg" ) ) {
							pStat["alphaStart"] = performance.now() - pStat["start"];
							var alphaMap = textureLoader.load( texturePath + "alpha_" + defaultTex.name + ".jpg", function(){
								pStat["alphaEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].alphaMap = alphaMap;
								materials[modelURLs[currIndex]].transparent = true;
							})
						} else if( defaultTex.maps.includes( "alpha.png" ) ) {
							pStat["alphaStart"] = performance.now() - pStat["start"];
							var alphaMap = textureLoader.load( texturePath + "alpha_" + defaultTex.name + ".png", function(){
								pStat["alphaEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].alphaMap = alphaMap;
								materials[modelURLs[currIndex]].transparent = true;
							})
						}
						if( defaultTex.maps.includes( "metallic.jpg" ) ) {
							pStat["metallicStart"] = performance.now() - pStat["start"];
							var metallicMap = textureLoader.load( texturePath + "metallic_" + defaultTex.name + ".jpg", function(){
								pStat["metallicEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].metalnessMap = metallicMap;
							})
						} else if( defaultTex.maps.includes( "metallic.png" ) ) {
							pStat["metallicStart"] = performance.now() - pStat["start"];
							var metallicMap = textureLoader.load( texturePath + "metallic_" + defaultTex.name + ".png", function(){
								pStat["metallicEnd"] = performance.now() - pStat["start"];
								materials[modelURLs[currIndex]].metalnessMap = metallicMap;
							})
						}
					}

				} else {
					if ( albedoPath !== undefined ) {
						pStat["albedoStart"] = performance.now() - pStat["start"];
						var albedoMap = textureLoader.load( texturePath + albedoPath, function(){
							pStat["albedoEnd"] = performance.now() - pStat["start"];
							materials[modelURLs[currIndex]].map = albedoMap;
						});
					}

					if ( normalPath !== undefined ) {
						pStat["normalStart"] = performance.now() - pStat["start"];
						var normalMap = textureLoader.load( texturePath + normalPath, function(){
							materials[modelURLs[currIndex]].normalMap = normalMap;
							pStat["normalEnd"] = performance.now() - pStat["start"];
						});
					}

					if ( metallicPath !== undefined ) {
						pStat["metalStart"] = performance.now() - pStat["start"];
						var metallicMap = textureLoader.load( texturePath + metallicPath, function(){
							pStat["metalEnd"] = performance.now() - pStat["start"];
							materials[modelURLs[currIndex]].metalnessMap = metallicMap;
						});
					}

					if ( roughnessPath !== undefined ) {
						pStat["roughStart"] = performance.now() - pStat["start"];
						var roughnessMap = textureLoader.load( texturePath + roughnessPath, function(){
							pStat["roughEnd"] = performance.now() - pStat["start"];
							materials[modelURLs[currIndex]].roughnessMap = roughnessMap;
						});
					}

					if ( aoPath !== undefined ) {
						pStat["aoStart"] = performance.now() - pStat["start"];
						var aoMap = textureLoader.load( texturePath + aoPath, function(){
							pStat["aoEnd"] = performance.now() - pStat["start"];
							materials[modelURLs[currIndex]].aoMap = aoMap;
						});
					}

					if ( alphaPath !== undefined ) {
						pStat["alphaStart"] = performance.now() - pStat["start"];
						var alphaMap = textureLoader.load( texturePath + alphaPath, function(){
							pStat["alphaEnd"] = performance.now() - pStat["start"];
							materials[modelURLs[currIndex]].alphaMap = alphaMap;
							materials[modelURLs[currIndex]].transparent = true;
						})
					}
				}

				if ( product.textures.aoIntensity !== undefined ) {
					materials[modelURLs[currIndex]].aoMapIntensity = product.textures.aoIntensity;
				}

				if ( product.textures.metalnessValue !== undefined ) {
					if( (modelURLs.length == 1 && !isSingleMulti) ||
							product.modelFile[file][file2].maps.includes("metallic.png") ||
							product.modelFile[file][file2].maps.includes("metallic.jpg") ||
							product.modelFile[file][file2].textures[texPos].maps.includes("metallic.png") ||
							product.modelFile[file][file2].textures[texPos].maps.includes("metallic.jpg") ) {
						materials[modelURLs[currIndex]].metalness = product.textures.metalnessValue;
					} else {
						materials[modelURLs[currIndex]].metalness = 0.15;
					}
				}

				if ( product.textures.roughnessValue !== undefined ) {
					materials[modelURLs[currIndex]].roughness = product.textures.roughnessValue;
				}

				if( defaultConfig[part] !== undefined && defaultConfig[part].hide == "true" )
					materials[modelURLs[currIndex]].visible = false;

				// Load the model, scale it and set its properties
				pStat["model"] = performance.now() - pStat["start"];
				pStat["modelTime"] = pStat["model"] - pStat["modelStart"];
				pStat["modelSpeed"] = pStat["modelSize"] / pStat["modelTime"];
				var albedoPath = product.textures.albedo;
				var objAdd;
				// if( currIndex == 0 ){
		  //	 		detailsObject = new THREE.Mesh( geometry, materials[currIndex] );
		  //	 		objAdd = detailsObject;
				// } else {
				if( modelURLs.length == 1 && !isSingleMulti ) {
					detailsObject = new THREE.Mesh( geometry, materials[modelURLs[currIndex]] );
                    const material = materials[modelURLs[currIndex]];
                    material.transparent = true;
                    material.opacity = 1;
                    material.depthTest = true;
                    material.depthWrite = false;
                    material.side = THREE.DoubleSide;
                    material.needsUpdate = true;
                    console.log(material);

					objAdd = detailsObject;
				} else {
					var modelName = modelURLs[currIndex];
					modelName = modelName.replace( assetPrepend + "/" + productID + '/', '' );
					modelName = modelName.substring(0, modelName.indexOf('/'));
					detailsParts[modelName] = {
						model: new THREE.Mesh( geometry, materials[modelURLs[currIndex]] ),
						currentModel: file2,
						currentMaterial: matSave,
						currentAlbedo: albedoSave
					};
					objAdd = detailsParts[modelName].model;
				}

				objAdd.scale.set(product.model.scale, product.model.scale, product.model.scale);
				objAdd.rotation.set(product.model.rotation.x, product.model.rotation.y, product.model.rotation.z );

				objAdd.castShadow = true;
				objAdd.receiveShadow = product.lighting.objectShadow;

				// Load all the textures, Albedo, Normal Map, Metallic Map, Bump Map and Cube Map

				detailsCamera.target = objAdd.position;

				objAdd.material = materials[modelURLs[currIndex]];
				// if( modelURLs.length == 1 )
					// objAdd.geometry.center();

				detailsGroup.add( objAdd );
				detailsGroup.onObjectAdded();
				// detailsScene.add( objAdd );

				// initSliders();
				// console.log( objAdd );

			});
		})(modelIndex);
	}

}

function sceneBounds() {
	return ( new THREE.Box3() ).setFromObject( detailsGroup );
}

function updateShadowMaps() {
	var boundingSphere = sceneBounds().getBoundingSphere( new THREE.Sphere() );
	var extent = Math.max( 10, 2 * boundingSphere.radius );
	for ( i in detailsLights ) {
		if ( detailsLights[i].type == 'DirectionalLight' ) {
			// Adjust viewport of shadow camera so it captures object but isn't too large
			detailsLights[i].shadow.camera.top = extent;
			detailsLights[i].shadow.camera.bottom = -extent;
			detailsLights[i].shadow.camera.left = -extent;
			detailsLights[i].shadow.camera.right = extent;
			var D = detailsLights[i].position.length();
			detailsLights[i].shadow.camera.near = Math.max( 1, D - boundingSphere.radius );
			detailsLights[i].shadow.camera.far = Math.max( 10, D + 10 * boundingSphere.radius );
		}
	}
}

function initDetailsPlane() {
	// Add plane below object (small plane for shadows, large for distance)
	if ( product.lighting.groundShadow ){
		detailsScene.remove( detailsPlane );

		var bounds = sceneBounds();
		var boundingSphere = bounds.getBoundingSphere( new THREE.Sphere() );
		var size = 4 * boundingSphere.radius;

		var planeGeometry = new THREE.PlaneBufferGeometry( size, size, 2 );
		var planeMaterial = new THREE.ShadowMaterial( {
			opacity: 0.4, side: THREE.FrontSide} );

		detailsPlane = new THREE.Mesh( planeGeometry, planeMaterial );
		detailsPlane.position.y = bounds.min.y;
		detailsPlane.receiveShadow = true;
		detailsPlane.rotateX( -0.5 * Math.PI );
		detailsScene.add( detailsPlane );

		detailsRenderer.shadowMap.needsUpdate = true;
	}
}

function renderLoop() {
	if ( typeof frameworkLoaded == "undefined" ) {
		setTimeout( renderLoop, 50 );
		return
	}
	if(alreadyRunningLoop)
		return;
	else {
		alreadyRunningLoop = true;
		requestAnimationFrame(renderProductDetails);
	}
}

function renderProductDetails() {
	// We're fulfilling the requestAnimationFrame loop - so we can set this to false.
	alreadyRunningLoop = false;
	TWEEN.update();
	orbitControls.update();

	// If orbit controls indicates lingering movement - like from dampening - request the next animation loop so we can reevaluate render
	if(orbitControls.shouldContinueRendering) {
		orbitControls.shouldContinueRendering = false;
		// since we're requesting an animation frame, we'll want to make sure we don't request one again somewhere else.
		alreadyRunningLoop = true;
		requestAnimationFrame(renderProductDetails);
	}

	if ( isTextured) {
		detailsRenderer.render(detailsScene, detailsCamera);
	} else {
		setTimeout(renderLoop, 500);
	}
}

function onWindowResize() {
	document.body.height = window.innerHeight;
	detailsCamera.aspect = detailsContainer.clientWidth / detailsContainer.clientHeight;
	detailsCamera.fov = product.camera.fov / Math.min(detailsCamera.aspect,1);
	detailsCamera.updateProjectionMatrix();
	detailsRenderer.setSize(detailsContainer.clientWidth, detailsContainer.clientHeight);
	if ( !arEnabled ) {
		renderLoop();
	} else {
		JEEFACEFILTERAPI.resize();
		JeelizHelper.updateCamera( arCamera );
		orbitControls.enabled = false;
	}
}

function enableFullScreenGL(elem) {
	detailsCamera.aspect = window.innerWidth / window.innerHeight;
	detailsCamera.updateProjectionMatrix();
	detailsRenderer.setSize(window.innerWidth, window.innerHeight);
	THREEx.FullScreen.request(elem);
}

function tweenCameraTo(posX, posY, posZ) {
	renderLoop();

	if( isNaN(posX) || isNaN(posY) || isNaN(posZ) ) {
		return;
	}

	isAnimated = false;

	var destPosition = {
		x: posX,
		y: posY,
		z: posZ
	};
	var destLookAt = detailsGroup.position;

	var tween = new TWEEN.Tween(detailsCamera.position)
		.to(destPosition, animationSpeed)
		.onUpdate(function () {
			detailsCamera.lookAt(detailsCamera.target);
		})
		.onComplete(function () {
			detailsCamera.lookAt(destLookAt);
			detailsCamera.updateProjectionMatrix();
		})
		.easing(TWEEN.Easing.Quadratic.Out)
		.start();
}

function snapshotResize() {
	var container = $( '.container3d>canvas' );
	var origWidth = container.width();
	var origHeight = container.height();
	const dumpWidth = 320;
	const dumpHeight = 220;

	container.width( dumpWidth );
	container.height( dumpHeight );
	detailsCamera.aspect = dumpWidth / dumpHeight;
	detailsCamera.updateProjectionMatrix();
	detailsRenderer.setSize( dumpWidth, dumpHeight);
	setTimeout(function(){
		snapshot();
		setTimeout(function(){
			container.width( origWidth );
			container.height( origHeight );
			detailsCamera.aspect = origWidth / origHeight;
			detailsCamera.updateProjectionMatrix();
			detailsRenderer.setSize( origWidth, origHeight);
		},20)
	},20)

}

function snapshot() {
	saveAsImage( detailsRenderer );
	console.log('snapshot');
}

function cameraPos() {
	console.log( detailsCamera.position );
}

function saveAsImage( renderer ) {
	var imgData;

	try {
		var strMime = "image/png";
		imgData = renderer.domElement.toDataURL(strMime);

		saveFile(imgData.replace(strMime, "image/octet-stream"), "preview.png");

	} catch (e) {
		console.log(e);
		return;
	}

}

var saveFile = function (strData, filename) {
	var link = document.createElement('a');
	if (typeof link.download === 'string') {
		document.body.appendChild(link); //Firefox requires the link to be in the body
		link.download = filename;
		link.href = strData;
		link.click();
		document.body.removeChild(link); //remove the link when done
	} else {
		location.replace(uri);
	}
}

// var change3DModelTexture = function ( mapName, lightOpt ) {
// 	textureLoader.load( texturePath + mapName, function (albedoMap) {
// 		detailsObject.material.map.dispose();
// 		detailsObject.material.map = albedoMap;
// 		if( product[ 'lights-' + lightOpt ] !== undefined ){
// 			lightingMode = lightOpt;
// 			updateLighting( product[ 'lights-' + lightOpt ] );
// 		} else {
// 			if( lightingMode !== "default" ) {
// 				lightingMode = "default";
// 				updateLighting( product.lighting.lights );
// 			}
// 		}
// 	});
// };

function initControls() {
	if( orbitControls ) {orbitControls.dispose()}
	orbitControls = new THREE.OOrbitControls(detailsCamera, detailsRenderer.domElement);
	orbitControls.addEventListener("change", function() {renderLoop()});
	settingsUpdate('disableZoom','');
	settingsUpdate('disablePan','');
	settingsUpdate('disableRotate','');
	settingsUpdate('polarAngle','');
	settingsUpdate('zoom','');
	orbitControls.smoothZoom = true;
	orbitControls.zoomDampingFactor = 0.6;
	orbitControls.smoothZoomSpeed = 1;
	orbitControls.zoomSpeed = 1;
	orbitControls.enableDamping = true;
	orbitControls.dampingFactor = 0.05;
	orbitControls.rotateSpeed = 0.3;
	if (typeof queryParams.autospin === 'string'){
		enableAutospin = true;
		orbitControls.autoRotate = true;
		orbitControls.autoRotateSpeed = Number(queryParams.autospin) * 5;
		renderLoop();
	}
}

function handleInteract( data ) {
	console.log("handleInteract()")
	console.log(data)
	switch( true ) {
		case data.name == '.textures.aoIntensity':
			// detailsObject.material.aoMapIntensity = data.value;
			for( obj in detailsGroup.children )
				detailsGroup.children[obj].material.aoMapIntensity = data.value;
			break;
		case data.name == '.textures.roughnessValue':
			// detailsObject.material.roughness = data.value;
			for( obj in detailsGroup.children )
				detailsGroup.children[obj].material.roughness = data.value;
			break;
		case data.name == '.textures.metalnessValue':
			// detailsObject.material.metalness = data.value;
			for( obj in detailsGroup.children )
				// if( detailsGroup.children[obj].material.metalnessMap !== null ){
					detailsGroup.children[obj].material.metalness = data.value;
				// }
			break;
		case data.name == '.textures.envMapIntensity':
			// detailsObject.material.envMapIntensity = data.value;
			for( obj in detailsGroup.children )
				detailsGroup.children[obj].material.envMapIntensity = data.value;
			break;
		case data.name == '.textures.normalScale':
			// detailsObject.material.normalScale = { x:data.value, y:data.value };
			for( obj in detailsGroup.children )
				detailsGroup.children[obj].material.normalScale = { x:data.value, y:data.value };
			break;
		case /lightingOptions\..\.intensity/.test(data.name):
			var num = data.name.charAt(17);

			var lightObj;
			if( num == 0 )
				lightObj = ambientLight;
			else
				lightObj = eval("point" + num);
			lightObj.intensity = data.value;
			break;
		case /lightingOptions\..\.lightColor/.test(data.name):
			var num = data.name.charAt(17);
			var lightObj;
			if( num == 0 )
				lightObj = ambientLight;
			else
				lightObj = eval("point" + num);
			setLightColor( lightObj, data.value );
			break;
		case /lightingOptions\..\.position/.test(data.name):
			var num = data.name.charAt(17);
			var axis = data.name.charAt(33);
			var lightObj;
			if( num == 0 )
				lightObj = ambientLight;
			else
				lightObj = eval("point" + num);

			switch( axis ) {
				case 'x':
					lightObj.position.setX(data.value);
					break;
				case 'y':
					lightObj.position.setY(data.value);
					break;
				case 'z':
					lightObj.position.setZ(data.value);
					break;
			}
			lightObj.position.axis = data.value;
			break;
		case /zoom/.test(data.name):
			if( data.name.includes( "min" ) )
				orbitControls.minDistance = data.value;
			else
				orbitControls.maxDistance = data.value;
			break;
		case /rotation/.test(data.name):
			if( detailsGroup !== undefined ) {
				for( mesh in detailsGroup.children ) {
					if( data.name.includes( "x" ) )
						detailsGroup.children[mesh].rotation.set(data.value, detailsGroup.children[mesh].rotation.y, detailsGroup.children[mesh].rotation.z);
					else if( data.name.includes("y") )
						detailsGroup.children[mesh].rotation.set(detailsGroup.children[mesh].rotation.x, data.value, detailsGroup.children[mesh].rotation.z);
					else
						detailsGroup.children[mesh].rotation.set(detailsGroup.children[mesh].rotation.x, detailsGroup.children[mesh].rotation.y, data.value);
				}
			} else {
				if( data.name.includes( "x" ) )
					detailsObject.rotation.set(data.value, detailsObject.rotation.y, detailsObject.rotation.z);
				else if( data.name.includes("y") )
					detailsObject.rotation.set(detailsObject.rotation.x, data.value, detailsObject.rotation.z);
				else
					detailsObject.rotation.set(detailsObject.rotation.x, detailsObject.rotation.y, data.value);
			}
			break;
		case /scale/.test(data.name):
			if( detailsGroup !== undefined ) {
				for( mesh in detailsGroup.children )
				{
					detailsGroup.children[mesh].scale.set(data.value, data.value, data.value);
				}
			} else {
				detailsObject.scale.set(data.value, data.value, data.value);
			}
			break;
		case /backgroundColor/.test(data.name):
			if( $( '.container3d' ).css( 'background-image' ) !== 'unset' )
				$( '.container3d' ).css( 'background-image', 'unset' );
			$( '.container3d' ).css( 'background-color', data.value );
			break;
	}
	renderLoop();
}

function settingsUpdate( setting, data ) {
	switch (setting) {
		case 'hideFullscreen':
			if (data.value != undefined) {
				console.log(data.value != undefined);
				product.viewer.hideFullscreen = Boolean(JSON.parse(data.value));
			}
			if (product.viewer.hideFullscreen) {
				$( '#fullScreenIcon' ).parent().remove();
			} else if (!$( '#fullScreenIcon' ).length) {
				$( '#bottom_bar' ).append("<div class='ui-icon'><img id='fullScreenIcon' src='" + viewerPrepend + "/viewer/" + viewerVersion + "/images/fullscreen.png'></img></div>");
				$( '#fullScreenIcon' ).on( 'click', function(){
					enableFullScreen();
				});
			}
			break;

		case 'hideLogos':
			if (data.value != undefined) {
				product.viewer.hideLogos = Boolean(JSON.parse(data.value));
			}
			if (product.viewer.hideLogos) {
				$( '#bottom_logo' ).remove();
				$( '#pulse' ).remove();
			} else {
				if (!document.getElementById('bottom_logo')) {
					$( '#ui' ).append("<img id='bottom_logo' src='/images/baetes_black.png'>");
				}
				if (!document.getElementById('pulse')) {
					$( '#loader' ).append("<img id='pulse' class='/images/baetes_black.png'>");
				}
				onLoadUpdateUI();
			}
			break;

		case 'touch3D':
			if (data.value != undefined) {
				product.viewer.touch3D = Boolean(JSON.parse(data.value));
			}
			if (product.viewer.touch3D) {
				if (!document.getElementById('touchOverlay')) {
					$( '#ui' ).append("<div id='touchOverlay'></div>")
					onLoadUpdateUI();
				}
			} else {
				$( '#touchOverlay' ).remove();
			}
			break;

		case 'icon3D':
			console.log('icon3D')
			if (data.value != undefined) {
				product.viewer.icon3D = Boolean(JSON.parse(data.value));
			}
			if (product.viewer.icon3D) {
				console.log(product.viewer.icon3D)
				if (!document.getElementById('icon3D')) {
					console.log('append')
					$( '#ui' ).append("<img id='icon3D' src='" + viewerPrepend + "/viewer/" + viewerVersion + "/images/3d_icon.png'>");
				}
			} else {
				$( '#icon3D' ).remove();
			}
			break;

		case 'background':
			switch (data.value) {
				case 'transparent':
					product.viewer.transparent = true;
					product.viewer.gradient = false;
					$( '.container3d' ).css( 'background-color', 'transparent' );
					$( '.container3d' ).removeClass( 'gradient' );
					break;
				case 'gradient':
					console.log('gradient')
					product.viewer.transparent = false;
					product.viewer.gradient = true;
					$( '.container3d' ).addClass( 'gradient' );
					break;
				case 'backgroundColor':
					console.log('backgroundColor')
					product.viewer.transparent = false;
					product.viewer.gradient = false;
					if (data.color) product.viewer.backgroundColor = data.color;
					$( '.container3d' ).css( 'background-color', product.viewer.backgroundColor );
					$( '.container3d' ).removeClass( 'gradient' );
					break;
			}
			break;

		case 'defaultCam':
			if (data.value != undefined) {
				product.camera.defaultCam = {"x":data.value.x,"y":data.value.y,"z":data.value.z};
			}
			detailsCamera.position.set( product.camera.defaultCam.x, product.camera.defaultCam.y, product.camera.defaultCam.z, );
			break;

		case 'zoom':
			if (data.value != undefined) {
				product.camera.zoom.max = Number(data.value.max);
				product.camera.zoom.min = Number(data.value.min);
			}
			orbitControls.maxDistance = product.camera.zoom.max;
			orbitControls.minDistance = product.camera.zoom.min;
			break;

		case 'fov':
			if (data.value != undefined) {
				product.camera.fov = Number(data.value);
			}
			onWindowResize();
			break;

		case 'disablePan':
			if (data.value != undefined) {
				product.camera.disablePan = Boolean(JSON.parse(data.value));
			}
			orbitControls.enablePan = !product.camera.disablePan;
			break;

		case 'disableZoom':
			if (data.value != undefined) {
				product.camera.disableZoom = Boolean(JSON.parse(data.value));
			}
			orbitControls.enableZoom = !product.camera.disableZoom;
			break;

		case 'disableRotate':
			if (data.value != undefined) {
				product.camera.disableRotate = Boolean(JSON.parse(data.value));
			}
			orbitControls.enableRotate = !product.camera.disableRotate;
			break;

		case 'polarAngle':
			if (data.value != undefined) {
				product.camera.minPolarAngle = Number(data.value.min);
				product.camera.maxPolarAngle = Number(data.value.max);
			}
			orbitControls.maxPolarAngle = eval(Math.abs(product.camera.minPolarAngle - 90) * Math.PI / 180);
			orbitControls.minPolarAngle = eval(Math.abs(product.camera.maxPolarAngle - 90) * Math.PI / 180);
			break;

		case 'groundShadow':
			if (data.value != undefined) {
				product.lighting.groundShadow = Boolean(JSON.parse(data.value));
			}
			if (product.lighting.groundShadow) {
				initDetailsPlane();
			} else {
				detailsScene.remove( detailsPlane );
			}
			break;

		case 'objectShadow':
			if (data.value != undefined) {
				product.lighting.objectShadow = Boolean(JSON.parse(data.value));
			}
			if (product.lighting.objectShadow) {
				if( detailsGroup !== undefined ) {
					for( mesh in detailsGroup.children ) {
						detailsGroup.children[mesh].receiveShadow.set(product.lighting.objectShadow);
					}
				} else {
					detailsObject.receiveShadow.set(product.lighting.objectShadow);
				}
			}
			break;

		case 'lights':
			product.lighting.lights = [];
			product.lighting.lights = data.value; // Expects entire lighting settings
			detailsLights = {};
			for (let i = 0, j = 0, deleted = 0; i < detailsScene.children.length + deleted; i++){
				j = i - deleted;
				if ( detailsScene.children[j].type == 'DirectionalLight' || detailsScene.children[j].type == 'AmbientLight' ) {
					detailsScene.children.splice(j,1);
					deleted++;
				}
			}
			initLights();
			break;

		case 'scale':
			if (detailsGroup) {
				for( mesh in detailsGroup.children ) {
					detailsGroup.children[mesh].scale.set(data.value, data.value, data.value);
				}
			} else {
				detailsObject.scale.set(data.value, data.value, data.value);
			}
			break;

		case 'rotation':
			product.model.rotation = {"x":Number(data.value.x),"y":Number(data.value.y),"z":Number(data.value.z)}
			if( detailsGroup !== undefined ) {
				for( mesh in detailsGroup.children ) {
					detailsGroup.children[mesh].rotation.set(product.model.rotation.x, product.model.rotation.y, product.model.rotation.z);
				}
			} else {
				detailsObject.rotation.set(product.model.rotation.x, product.model.rotation.y, product.model.rotation.z);
			}
			break;

	}

	if (isProductInitialized) renderLoop();

}

function autospinDelay(){
	if (enableAutospin)
		setTimeout( function(){orbitControls.autoRotate = true, renderLoop()}, 2000 );
}

function performStats() {
	var performString =
		"Pg Ready:\t" + pStat["ready"] + "ms\n"
		+ "AJAX End:\t" + pStat["ajax"] + "ms\n"
		+ "Model St:\t" + pStat["modelStart"] + "ms\n"
		+ "Model End:\t" + pStat["model"] + "ms\n"
		+ "Model Size:\t" + pStat["modelSize"] + "KB\n\n"
		+ "\tModel Time:\t\t" + pStat["modelTime"] + "ms\n"
		+ "\tModel Speed:\t" + pStat["modelSpeed"] + "MB/s\n\n"
		+ "Tex St:\t\t" + pStat["tex"] + "ms\n";

	if( pStat["albedoEnd"] !== undefined )
		performString += "Albedo:\t\t" + pStat["albedoEnd"] + "ms\t" + pStat["modelSpeed"] + "\n";
	if( pStat["normalEnd"] !== undefined )
		performString += "Normal:\t\t" + pStat["normalEnd"] + "ms\n";
	if( pStat["roughEnd"] !== undefined )
		performString += "Rough:\t\t" + pStat["roughEnd"] + "ms\n";
	if( pStat["metalEnd"] !== undefined )
		performString += "Metal\t\t\t: " + pStat["metalEnd"] + "ms\n";
	if( pStat["aoEnd"] !== undefined )
		performString += "AO:\t\t\t" + pStat["aoEnd"] + "ms\n";

	performString += "\n\tTex Time:\t" + (pStat["done"] - pStat["tex"]) + "\n"
	+ "\nTotal Time:\t" + pStat["done"] + "ms\n"
	+ "\nAnalysis:\
	\n\n\tUse";

	return performString;
}

function setLightColor( light, colorCode ) {
	light.color.setRGB( lightColorMap[colorCode].r / 255, lightColorMap[colorCode].g / 255, lightColorMap[colorCode].b / 255 );
}

function initLightColorMap() {
	if (lightColorMap == "") {
		var startColor = { r : 247, g : 215, b : 136 };
		var endColor = { r : 255, g : 255, b : 255 };
		for( i=0; i<100; i++ ) {
			var pushR = endColor.r - ( i * ( (endColor.r - startColor.r) / 100 ) );
			var pushG = endColor.g - ( i * ( (endColor.g - startColor.g) / 100 ) );
			var pushB = endColor.b - ( i * ( (endColor.b - startColor.b) / 100 ) );
			lightColorMap.push( { r: pushR, g: pushG, b: pushB } );
		}
	}
}

function convertColorMaptoColor(lightColor) {
	initLightColorMap();
	var color = {};
	color.r = lightColorMap[lightColor].r / 255;
	color.g = lightColorMap[lightColor].g / 255;
	color.b = lightColorMap[lightColor].b / 255;
	return color;
}

function modMap( map, mod ) {
	if( isNaN(mod) ) {
		if( mod !== "" )
			mod = "-" + mod;
		if( map.indexOf( '-' ) !==  -1 && mod !== "" )
			map = map.substring( 0, map.indexOf( '-' ) ) + map.substring( map.indexOf( '.' ), map.length );
	} else {
		return map.substring( 0, map.indexOf( '.' ) ) + mod + map.substring( map.indexOf('.'), map.length );
	}
	return map.substring( 0, map.indexOf( '.' ) ) + mod + map.substring( map.indexOf( '.' ), map.length );
}

function switchModel( data ){

	var part = data.part;

	if( part == undefined ) {
		console.log( "%cERROR: Part not specified", "color: red" );
		return;
	}

	if( product.modelFile[part] == undefined ) {
		console.log( "%cERROR: Specified part: " + part + " does not exist", "color: red" );
		return;
	}

	var model = data.model;
	var mat = data.material;
	var alb = data.albedo;
	var hide = data.hide;

	if( model == undefined && mat == undefined && alb == undefined && hide == undefined ) {
		console.log( "%cERROR: Must specify a model, material, albedo, and/or hide change", "color: red" );
		return;
	}

	if( hide !== undefined && hide == "true" ) {
		console.log( "Hiding: " + part )
		detailsParts[part].model.material.visible = false;
	} else {
		detailsParts[part].model.material.visible = true;
	}

	var matExists = false;
	var prePath = assetPrepend + "/" + productID + "/" + part;
	if( model !== undefined ) {

		if( product.modelFile[part][model] == undefined ) {
			console.log( "%cERROR: Specified model: " + model + " does not exist for part: " + part, "color: red" );
			return;
		}

		if( model !== undefined && model !== detailsParts[part].currentModel ) {
			console.log( "LOADING " + prePath + "/" + model + ".*.prwm" );

			var modelSwitch = false;
			if( detailsParts[part].currentModel !== model ) {
				modelSwitch = true;
				detailsParts[part].currentModel = model;
			}

			if( mat !== undefined ) {
				for( texture in product.modelFile[part][model].textures ) {
					if( product.modelFile[part][model].textures[texture].name == mat ) {
						matExists = true;
					}
				}

				if( !matExists ) {
					console.log( "%cERROR: Specified material: " + mat + " does not exist for part: " + part + " and model: " + model, "color: red" );
				}
			}

			if( mat == undefined || !matExists ) {
				mat = product.modelFile[part][model].textures[0].name;
			}

			var texPos;
			for( texture in product.modelFile[part][model].textures ) {
				if( product.modelFile[part][model].textures[texture].name == mat ) {
					texPos = texture;
					break;
				}
			}
			if( alb == undefined || !albedoExists( part, model, mat, alb ) ) {
				var albedoKeys = Object.keys(product.modelFile[part][model].textures[texPos].albedo );

				for( albKey in albedoKeys ){
					// console.log( albKey );
					// console.log( albedoKeys[albKey] );
					if( product.modelFile[part][model].textures[texture].albedo[albedoKeys[albKey]].active == "true" ){
						alb = albedoKeys[albKey];
						console.log( "DEFAULTING TO ALBEDO: " + alb );
						break;
					}
				}
				if( alb == undefined ) {
					console.log( "%cERROR: No active albedos for specified material: " + mat + " - part: " + part + " - model: " + model, "color: red" );
					return;
				}
			}
			loaderPRWM.load(prePath + "/" + model + ".*.prwm", function(geometry) {

				var modelReplace = new THREE.Mesh(geometry,detailsParts[part].model.material);
                switchMaterial( prePath, part, model, mat, alb, modelReplace.material, modelSwitch );
				modelReplace.scale.set(product.model.scale, product.model.scale, product.model.scale);
				modelReplace.rotation.set(product.model.rotation.x, product.model.rotation.y, product.model.rotation.z);
				detailsParts[part].model.geometry.dispose();
				detailsParts[part].model.material.dispose();
				detailsGroup.remove( detailsParts[part].model );
				detailsParts[part].model = modelReplace
				modelReplace.receiveShadow = product.lighting.objectShadow;
				modelReplace.castShadow = true;
				detailsGroup.add( modelReplace );
				detailsGroup.onObjectAdded();
			});

		} else if( mat !== undefined && mat !== detailsParts[part].currentMaterial ) {
			if( alb == undefined ) {
				alb = detailsParts[part].currentAlbedo;
			}
			if( !albedoExists( part, model, mat, alb ) ) {
				var texPos;
				for( texture in product.modelFile[part][model].textures ) {
					if( product.modelFile[part][model].textures[texture].name == mat ) {
						texPos = texture;
						break;
					}
				}
				var albedoKeys = Object.keys(product.modelFile[part][model].textures[texPos].albedo );

				for( albKey in albedoKeys ){
					// console.log( albKey );
					// console.log( albedoKeys[albKey] );
					if( product.modelFile[part][model].textures[texture].albedo[albedoKeys[albKey]].active == "true" ){
						alb = albedoKeys[albKey];
						break;
					}
				}
				if( alb == undefined ) {
					console.log( "%cERROR: No active albedos for specified material: " + mat + " - part: " + part + " - model: " + model, "color: red" );
					return;
				}
			}
			switchMaterial( prePath, part, model, mat, alb, detailsParts[part].model.material, false );
		} else if( alb !== undefined && alb !== detailsParts[part].currentAlbedo ) {
			if( mat == undefined ) {
				mat = detailsParts[part].currentMaterial;
			}
			switchMaterial( prePath, part, model, mat, alb, detailsParts[part].model.material, false );
		}

	} else {
		model = detailsParts[part].currentModel;
		if( mat !== undefined && mat !== detailsParts[part].currentMaterial ) {
			if( alb == undefined || !albedoExists( part, model, mat, alb ) ) {
				var texPos = 0;
				for( texture in product.modelFile[part][model].textures ) {
					if( product.modelFile[part][model].textures[texture].name == mat ) {
						texPos = texture;
						break;
					}
				}
				var albedoKeys = Object.keys(product.modelFile[part][model].textures[texPos].albedo );

				for( albKey in albedoKeys ){
					// console.log( albKey );
					// console.log( albedoKeys[albKey] );
					if( product.modelFile[part][model].textures[texture].albedo[albedoKeys[albKey]].active == "true" ){
						alb = albedoKeys[albKey];
						break;
					}
				}
				if( alb == undefined ) {
					console.log( "%cERROR: No active albedos for specified material: " + mat + " - part: " + part + " - model: " + model, "color: red" );
					return;
				}
			} else {
			}

			switchMaterial( prePath, part, model, mat, alb, detailsParts[part].model.material, false );
		} else if( alb !== undefined && alb !== detailsParts[part].currentAlbedo ) {
			if( mat == undefined ) {
				mat = detailsParts[part].currentMaterial;
			}
			switchMaterial( prePath, part, model, mat, alb, detailsParts[part].model.material, false );
		} else {
		}
	}

	renderLoop();
	detailsGroup.onObjectAdded();
}

function albedoExists( part, model, mat, albedo ) {

    var albedoExists = false;
	for( texture in product.modelFile[part][model].textures ) {
		if( product.modelFile[part][model].textures[texture].name == mat ) {
			if( product.modelFile[part][model].textures[texture].albedo[albedo] !== undefined &&
					product.modelFile[part][model].textures[texture].albedo[albedo].active == "true" ){
				albedoExists = true;
				break;
			}
		}
	}
	return albedoExists;
}

function switchMaterial( prePath, part, model, material, albedo, matNew, modelSwitch ) {
	var maps = product.modelFile[part][model].maps
	var variantMaps;
	var albedoDefault;
	var texPos;
	for( texture in product.modelFile[part][model].textures ) {
		if( product.modelFile[part][model].textures[texture].name == material ) {
			texPos = texture;
			variantMaps = product.modelFile[part][model].textures[texture].maps;
			albedoDefault = Object.keys(product.modelFile[part][model].textures[texture].albedo)
			for( albKey in albedoDefault ){
				if( product.modelFile[part][model].textures[texture].albedo[albedoDefault[albKey]].active == "true" ){
					albedoDefault = albedoDefault[albKey];
					break;
				}
			}

		}
	}

	var totalMaps = [ "metallic", "roughness", "ao", "alpha", "normal" ];
	var renderedMaps = [];

	for( map in maps ) {
		renderedMaps.push(maps[map].replace('.jpg','').replace('.png',''));
		// if( model !== detailsParts[part].currentModel ) {
			var type = maps[map].substring(0, maps[map].length-4);
			switchTexture( prePath + "/" + model + "/" + maps[map], part, type, matNew );
		// }
	}

	// console.log( variantMaps );
	for( map in variantMaps ) {
		renderedMaps.push(variantMaps[map].replace('.jpg','').replace('.png',''));
		if( modelSwitch || material !== detailsParts[part].currentMaterial ) {
			var type = variantMaps[map].substring(0, variantMaps[map].length-4);
			var ext = variantMaps[map].substring(variantMaps[map].length-4, variantMaps[map].length);
			switchTexture( prePath + "/" + model + "/" + type + "_" + material + ext, part, type, matNew );
		}
	}
	if( material !== detailsParts[part].currentMaterial ) {
		detailsParts[part].currentMaterial = material;
	}

	for( map in totalMaps ) {
		if( !renderedMaps.includes(totalMaps[map])){
			var matString = "";
			switch( totalMaps[map] ){
				case "metallic":
					matString = 'metalnessMap';
					break;
				case "roughness":
					matString = 'roughnessMap';
					break;
				case "alpha":
					matString = 'alphaMap';
					break;
				case "normal":
					matString = 'normalMap';
					break;
				case "ao":
					matString = 'aoMap';
					break;
			}
			if( matNew[matString] !== undefined && matNew[matString] !== null ) {
				matNew[matString] = null;
				if( matString == 'metalnessMap' ) {
					matNew.metalness = product.metalnessValue;
					matNew.envMapIntensity = 1;
				}
			}
		}
	}

	if( material == undefined && model == detailsParts[part].currentModel ) {
		material = detailsParts[part].currentMaterial;
	}

	var albedoExists = false;
	for( texture in product.modelFile[part][model].textures ) {
		if( product.modelFile[part][model].textures[texture].name == material ) {
			// console.log( model );
			// console.log( material );
			// console.log( albedo );
			var keys = Object.keys(product.modelFile[part][model].textures[texture].albedo);
			// console.log( keys );
			if( keys.includes(albedo) ) {
				if( product.modelFile[part][model].textures[texture].albedo[albedo] !== undefined &&
					product.modelFile[part][model].textures[texture].albedo[albedo].active == "true" ) {
					albedoExists = true;
				}
			}
			break;
		}
	}

	// if( albedo !== undefined && albedo !== detailsParts[part].currentAlbedo ) {
	// 	if( !albedoExists ) {
	// 		console.log( "%cERROR: Specified albedo: " + albedo + " is not available for material: " +
	// 			material + " and part: " + part + " and model: " + model, "color: red" );
	// 	}
	// }

	if( !albedoExists && albedo !== undefined ) {
		console.log( "%cERROR: Specified albedo: " + albedo + " is not available for material: " + material + " and part: " + part + " and model: " + model, "color: red" );
		albedo = albedoDefault;
	}
	if( albedo !== undefined  && albedo !== detailsParts[part].currentAlbedo ) {
		if( product.modelFile[part][model].textures[texPos].albedo[albedo] == undefined ){
			console.log( "%cERROR: Specified albedo: " + albedo + " is not available for material: " + material + " and part: " + part + " and model: " + model, "color: red" );
			albedo = albedoDefault;
		}

		if( albedo !== detailsParts[part].currentAlbedo  ) {
			console.log( "LOADING path: " + prePath + "/" + model + "/" + albedo + " type: albedo" )
			switchTexture( prePath + "/" + model + "/albedo_" + albedo + "." + product.modelFile[part][model].textures[texPos].albedo[albedo].ext, part, "albedo", matNew );
			detailsParts[part].currentAlbedo = albedo;
		}

	}
	if( !detailsParts[part].model.material.visible )
		detailsParts[part].model.material.visible = true;

	detailsGroup.onObjectAdded();
	renderLoop();
}

function switchCustomTexture( part, img ) {
	detailsParts[part].model.material.map = textureLoader.load(img);
	renderLoop();
}

function switchCustomMask( part, baseImgPath, maskImgPath, size ) {
	var imgCanvas = document.createElement('canvas').getContext('2d');
	imgCanvas.id = imgCanvas;
	imgCanvas.canvas.width = imgCanvas.canvas.height = size;

	const baseImg = new Image();
	baseImg.src = baseImgPath;
	baseImg.crossOrigin = "anonymous";


	const maskImg = new Image();
	maskImg.src = maskImgPath;
	maskImg.crossOrigin = "anonymous";

	var baseImgLoaded = false,
		maskImgLoaded = false;

	baseImg.onload = function(){
		baseImgLoaded = true;

		var baseImgCanvas = document.createElement('canvas');
		baseImgCanvas.width = baseImgCanvas.height = size;
		var ctxBase = baseImgCanvas.getBoundingClientRect('2d');
		ctxBase.drawImage(baseImg, 0, 0);
		var baseDataURL = baseImgCanvas.toDataURL();
		console.log(baseDataURL)


		if (maskImgLoaded) mergeImages();
	}

	maskImg.onload = function(){
		maskImgLoaded = true;
		if (baseImgLoaded) mergeImages();
	}

	function mergeImages() {
		imgCanvas.drawImage(baseImg, 0, 0, imgCanvas.canvas.width, imgCanvas.canvas.height);
		imgCanvas.drawImage(maskImg, 0, 0, imgCanvas.canvas.width, imgCanvas.canvas.height);
		dataURL = imgCanvas.canvas.toDataURL();
		detailsParts[part].model.material.map = textureLoader.load(dataURL);
		//const customTexture = new THREE.CanvasTexture(imgCanvas.canvas);
		//detailsParts[part].model.material.map = customTexture;
		renderLoop();
	}
	$('#imgCanvas').remove();
}

function switchTexture( prePath, part, type, material ) {
	textureLoader.load(prePath, function(mapTex){
		console.log( "prepath: " + prePath + " part: " + part + " type: " + type );
		if( type == "albedo" )
			material.map = mapTex;
		else if( type == "normal" )
			material.normalMap = mapTex;
		else if( type == "roughness" ) {
			material.roughnessMap = mapTex;
			if( product.textures.roughnessValue !== undefined ) {
				material.roughness = product.textures.roughnessValue;
			}
		} else if( type == "metallic" ) {
			material.metalnessMap = mapTex;
			if( product.textures.metalnessValue !== undefined ) {
				material.metalness = product.textures.metalnessValue;
			}
			material.envMapIntensity = 4;
		} else if( type == "ao" ) {
			material.aoMap = mapTex;
			if( product.textures.aoIntensity !== undefined ) {
				material.aoIntensity = product.textures.aoIntensity;
			}
		} else if( type == "alpha" )
			material.alphaMap = mapTex;

		detailsParts[part].material = material;
		detailsParts[part].material.needsUpdate = true;

		renderLoop();
	});
}

function parseConfig(){
	var loc = decodeURI(window.location.href);

	if( product.defaultConfig !== undefined ) {
		var defConfKeys = Object.keys(product.defaultConfig);
		for( key in defConfKeys ) {
			defaultConfig[defConfKeys[key]] = product.defaultConfig[defConfKeys[key]];
		}
	}
	if( queryParams.defaultConfig ) {
		var delim = loc.length;
		var config = loc.substring( loc.indexOf("defaultConfig")+14, loc.length );
		if( config.indexOf( '&' ) !== -1 )
			config = config.substring( 0, config.indexOf( '&' ) );
		config = config.split('},{');
		for( cf in config ) {
			config[cf] += "}";
			if( config[cf].includes("part:") ){
				var partData = {};
				var partName;
				var partPos = config[cf].indexOf('part:')+5;
				var delim = config[cf].indexOf(',',partPos);
				if( delim == -1 || (config[cf].indexOf('}',partPos) < delim &&
					config[cf].indexOf('}',partPos) !== -1 ) ) {
					delim = config[cf].indexOf('}', partPos);
				}
				partName = config[cf].substring(partPos,delim);

				if( config[cf].includes("model:") ){
					var partPos = config[cf].indexOf('model:')+6;
					var delim = config[cf].indexOf(',',partPos);
					if( delim == -1 || (config[cf].indexOf('}',partPos) < delim &&
						config[cf].indexOf('}',partPos) !== -1 ) ) {
						delim = config[cf].indexOf('}', partPos);
					}
					partData["model"] =  config[cf].substring(partPos,delim);
				}

				if( config[cf].includes("material:") ){
					var partPos = config[cf].indexOf('material:')+9;
					var delim = config[cf].indexOf(',',partPos);
					if( delim == -1 || (config[cf].indexOf('}',partPos) < delim &&
						config[cf].indexOf('}',partPos) !== -1 ) ) {
						delim = config[cf].indexOf('}', partPos);
					}
					partData["material"] =  config[cf].substring(partPos,delim);
				}

				if( config[cf].includes("albedo:") ){
					var partPos = config[cf].indexOf('albedo:')+7;
					var delim = config[cf].indexOf(',',partPos);
					if( delim == -1 || (config[cf].indexOf('}',partPos) < delim &&
						config[cf].indexOf('}',partPos) !== -1 ) ) {
						delim = config[cf].indexOf('}', partPos);
					}
					partData["albedo"] =  config[cf].substring(partPos,delim);
				}

				if( config[cf].includes("hide:") ){
					var partPos = config[cf].indexOf('hide:')+5;
					var delim = config[cf].indexOf(',',partPos);
					if( delim == -1 || (config[cf].indexOf('}',partPos) < delim &&
						config[cf].indexOf('}',partPos) !== -1 ) ) {
						delim = config[cf].indexOf('}', partPos);
					}
					partData["hide"] =  config[cf].substring(partPos,delim);
				}
				// defaultConfig[partName] = partData;
				dataKeys = Object.keys(partData);

				defaultConfig[partName] = {};

				for( key in dataKeys ) {
					keyVal = dataKeys[key];
					defaultConfig[partName][keyVal] = partData[keyVal];
				}
			}
		}
	}

	if( queryParams.defaultText ) {
		defaultText();
	}
}

String.prototype.hasInvalidWhitespace = function() {
	return( this.includes(': ') || this.includes(', ') );
};
String.prototype.removeAllInvalidWhitespace = function() {
	return this.replace(new RegExp(/:\s/, 'g'), ':').replace(new RegExp(/,\s/, 'g'), ',');
};
