(function() {
    var scene;
    var camera;
    var renderer;
    var spotLight;
    var arrowHelper;
    var meshObject;
    var materialObject;

    var notes = new Notes();
    var currentNote = null;

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;

    // ---------- BROWSER CHECK ------------------------------
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    function init3dScene() {
        var orbit;
        var ambientLight;

        // ---------- SCENE --------------------------------------
        scene = new THREE.Scene();

        // ---------- CAMERA -------------------------------------
        camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000);
        camera.position.z = 5;
        scene.add(camera);

        // ---------- RENDER -------------------------------------
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(screenWidth, screenHeight);
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.shadowMap.enabled = true;
        document.getElementById('container3D').appendChild(renderer.domElement);

        // ---------- CONTROLS -----------------------------------
        orbit = new THREE.OrbitControls(camera, document.getElementById('container3D'));
        orbit.enableKeys = false;
        orbit.enablePan = false;
        orbit.mouseButtons = {ORBIT: THREE.MOUSE.RIGHT, ZOOM: THREE.MOUSE.MIDDLE};

        // ---------- LIGHTS -------------------------------------
        ambientLight = new THREE.AmbientLight(0x555555);
        scene.add(ambientLight);

        spotLight = new THREE.SpotLight(0xaaaaaa);
        spotLight.position.set(3, 1, 3);
        scene.add(spotLight);

        // ---------- MODEL ---------------------------------------
        materialObject = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x111111,
            shininess: 0,
            depthTest: true
        });

        var loader = new THREE.STLLoader();
        loader.load('../model/test_1_Maxillar.stl', function(geometryObject) {
            meshObject = new THREE.Mesh(geometryObject, materialObject);
            meshObject.castShadow = true;
            meshObject.receiveShadow = true;
            scene.add(meshObject);

            meshObject.scale.set(0.05, 0.05, 0.05);
            meshObject.rotation.set(0, -Math.PI / 40, 0);
            meshObject.position.set(0, -1, -0.2);
            scene.updateMatrixWorld(true);

            spotLight.target = meshObject;
            document.getElementById('loading').style.display = "none";
        });

        arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 0), 1, 0xffff00);

        // ---------- EVENTS --------------------------------------
        var drawing = false;

        function getPose(event) {
            var x = (event.clientX / screenWidth) * 2 - 1;
            var y = -(event.clientY / screenHeight) * 2 + 1;
            return new THREE.Vector2(x, y);
        }

        // --------------------------------------------
        window.addEventListener('resize', function() {
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;

            camera.aspect = screenWidth / screenHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(screenWidth, screenHeight);
            changePosition();
        });

        // --------------------------------------------
        document.addEventListener('mousedown', function(event) {
            if (!drawing && !event.target.hasAttribute('data-captured') && event.button === 0) {
                var p = getPose(event);
                var intersection = checkIntersection(p, meshObject);
                if (intersection.intersects) {
                    currentNote = new Note(meshObject, intersection.point, arrowHelper.rotation);
                    intersection = checkIntersection(p, currentNote._mesh);
                    currentNote.startDraw(intersection.uv);
                    drawing = true;
                }
            }
        });

        // --------------------------------------------
        document.addEventListener('mouseup', function() {
            drawing = false;
            if (currentNote !== null) {
                notes.items.push(currentNote);
                var p = sceneToScreen(currentNote._mesh, currentNote._position);
                currentNote.addWidget(new Bubble(p.x, p.y));
                currentNote = null;
            }
        });

        // --------------------------------------------
        document.addEventListener('mousemove', function(event) {
            if (drawing) {
                var p = getPose(event);
                var intersection = checkIntersection(p, currentNote._mesh);
                if (intersection.intersects) currentNote.continueDraw(intersection.uv);
            }
        });

        // --------------------------------------------
        orbit.addEventListener('change', changePosition);
        function changePosition() {
            renderer.render(scene, camera);
            for (var i = 0, len = notes.items.length; i < len; i += 1) {
                var note = notes.items[i];
                var p = sceneToScreen(notes.items[i]._mesh, notes.items[i]._position);
                note.getWidget().setPosition(p.x, p.y);
            }
        }
    }

    // ---------- NOTES ---------------------------------------
    function Notes() {
        this.items = [];

        // --------------------------------------------
        this.indexOfWidget = function(widget) {
            for (var i = 0, len = this.items.length; i < len; i += 1) {
                if(widget === this.items[i].getWidget()) return i;
            }
            return -1;
        };
        // --------------------------------------------
        this.remove = function(widget) {
            var index = this.indexOfWidget(widget);
            if(index !== -1) {
                scene.remove(this.items[index]._mesh);
                this.items.splice(index, 1);
            }
            currentNote = null;
        };
    }

    // ---------- NOTE ----------------------------------------
    function Note(mesh, position, orientation) {
        this._position = position;
        this._orientation = orientation;
        this._mesh = null;
        this._canvas = null;
        this._ctx = null;
        this.RESOLUTION = 128;
        var widget;

        // --------------------------------------------
        this.init = function () {
            var size = new THREE.Vector3(0.3, 0.3, 0.08);

            this._canvas = document.createElement('canvas');
            this._canvas.width = this._canvas.height = this.RESOLUTION;
            this._ctx = this._canvas.getContext('2d');

            var material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0x111111,
                shininess: 0,
                normalScale: new THREE.Vector2(1, 1),
                transparent: true,
                depthTest: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                polygonOffset: true,
                polygonOffsetFactor: -1
            });
            material.map = new THREE.Texture(this._canvas);
            material.map.magFilter = THREE.NearestFilter;
            material.map.magFilter = THREE.NearestFilter;
            material.map.needsUpdate = true;

            var geometry = new THREE.DecalGeometry(mesh, this._position, this._orientation, size);

            this._mesh = new THREE.Mesh(geometry, material);
            scene.add(this._mesh);
        };

        // --------------------------------------------
        this.startDraw = function (position) {
            var radius = 20;
            var blur = 10;
            var color = '#ffd4d4';

            position.x *= this.RESOLUTION;
            position.y *= this.RESOLUTION;

            this._ctx.beginPath();
            this._ctx.lineWidth = radius;
            this._ctx.strokeStyle = color;
            this._ctx.lineJoin = this._ctx.lineCap = 'round';
            this._ctx.shadowBlur = blur;
            this._ctx.shadowColor = color;
            this._ctx.moveTo(position.x, position.y);
            this._ctx.lineTo(position.x, position.y);
            this._ctx.stroke();

            this._mesh.material.map.needsUpdate = true;
        };

        // --------------------------------------------
        this.continueDraw = function (position) {
            position.x *= this.RESOLUTION;
            position.y *= this.RESOLUTION;

            this._ctx.lineTo(position.x, position.y);
            this._ctx.stroke();

            this._mesh.material.map.needsUpdate = true;
        };

        // --------------------------------------------
         this.addWidget = function(w) {
            widget = w;
        };

        // --------------------------------------------
        this.getWidget = function() {
            return widget;
        };
        // --------------------------------------------

        this.init();
    }

    // ---------- UTILS ---------------------------------------
    var raycaster = new THREE.Raycaster();

    function checkIntersection(position, mesh) {
        var intersection = {
            intersects: false,
            point: new THREE.Vector3(),
            normal: new THREE.Vector3(),
            uv: new THREE.Vector2()
        };

        raycaster.setFromCamera(position, camera);

        var intersects = raycaster.intersectObjects([mesh]);

        if (intersects.length > 0) {
            intersection.point.copy(intersects[0].point);
            intersection.normal.copy(intersects[0].face.normal);
            intersection.intersects = true;

            if (intersects[0].uv) {
                var uv = intersects[0].uv;
                intersects[0].object.material.map.transformUv(uv);
                intersection.uv.copy(uv);
            }

            arrowHelper.position.copy(intersection.point);

            var normal = intersection.normal.clone();
            normal.transformDirection(mesh.matrixWorld);
            normal.add(intersects[0].point);
            arrowHelper.lookAt(normal);

        } else {
            intersection.intersects = false;
        }

        return intersection;
    }

    // --------------------------------------------
    function sceneToScreen(mesh, xyz) {
        var widthHalf = screenWidth / 2,
            heightHalf = screenHeight / 2;
        var pos = xyz.clone();

        pos = mesh.localToWorld(pos);
        pos.project(camera);

        var x = (pos.x * widthHalf) + widthHalf;
        var y = -(pos.y * heightHalf) + heightHalf;

        return {x: x, y: y};
    }

    // ---------- ANIMATION -----------------------------------
    var animate = function () {
        requestAnimationFrame(animate);
        if(spotLight && meshObject) {
            spotLight.position.set(camera.position.x, camera.position.y, camera.position.z);
            renderer.render(scene, camera);
        }
    };
    init3dScene();
    animate();

    // ---------- UI ------------------------------------------
    function Bubble(left, bottom) {
        var bubble;
        var buttonDelete;
        var canvas;
        var self = this;

        init();

        function init() {
            bubble = document.createElement('div');
            bubble.className = 'bubble';
            document.body.appendChild(bubble);

            var textContainer = document.createElement('div');
            textContainer.setAttribute('data-captured', '');
            textContainer.className = 'bubble__text-container';
            bubble.appendChild(textContainer);

            var text = document.createElement('textarea');
            text.setAttribute('data-captured', '');
            text.className = 'bubble__text';
            textContainer.appendChild(text);
            text.addEventListener('input', inputText);
            text.addEventListener('focus', getFocus);
            text.addEventListener('blur', lostFocus);

            var textSpace = document.createElement('div');
            textSpace.className = 'bubble__text-space';
            textContainer.appendChild(textSpace);
            textSpace.innerHTML = '\n';

            buttonDelete = document.createElement('div');
            buttonDelete.setAttribute('data-captured', '');
            buttonDelete.className = 'bubble__button-delete';
            buttonDelete.textContent = '+';
            bubble.appendChild(buttonDelete);
            buttonDelete.addEventListener('click', removeNote);

            canvas = document.createElement('canvas');
            canvas.width = 20;
            canvas.height = 50;
            bubble.appendChild(canvas);

            drawString(false);
            text.focus();
            setPosition(left, bottom);
        }

        // --------------------------------------------
        function drawString(active) {
            var ctx = canvas.getContext('2d');
            var radius = 2;
            var width = canvas.width;
            var height = canvas.height;
            var lineWidth = 1;
            var centerX = radius + lineWidth;
            var centerY = height - radius - lineWidth;
            var angle = Math.atan(height / width);
            var x1 = radius * (1 + Math.cos(angle)) + lineWidth,
                y1 = height - radius * (1 + Math.sin(angle)) - lineWidth,
                x2 = width,
                y2 = 0;

            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.lineWidth = lineWidth;

            if (active) ctx.strokeStyle = '#ff0000';
            else ctx.strokeStyle = '#ffffff';

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.stroke();
        }
        // --------------------------------------------
        function inputText(event) {
            var main = event.target.closest('.bubble');
            var bottom = main.offsetHeight + main.offsetTop;

            event.target.nextSibling.innerHTML = event.target.value + '\n';

            var top = bottom - main.offsetHeight;
            main.style.top = top + 'px';
        }

        // --------------------------------------------
        function removeNote(event) {
            event.target.parentNode.remove();
            notes.remove(self);
        }

        // --------------------------------------------
        function getFocus(event) {
            var main = event.target.closest('.bubble');
            main.style.zIndex = '100';
            drawString(true);
        }

        // --------------------------------------------
        function lostFocus(event) {
            var main = event.target.closest('.bubble');
            main.style.zIndex = '';
            drawString(false);
        }

        // --------------------------------------------
        function setPosition(left, bottom) {
            var top = bottom - bubble.offsetHeight;

            bubble.style.top = top + 'px';
            bubble.style.left = left + 'px';
        }
        // Interface
        this.setPosition = setPosition;
    }
    // --------------------------------------------
    document.body.onContextMenu = function() {
        return false;
    }
}());