(function() {
    var scene;
    var camera;
    var renderer;
    var spotLight;
    var arrowHelper;
    var meshObject;
    var materialObject;

    var notes = new Notes();

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
        var phongShader = THREE.ShaderLib.phong;
        var uniforms = THREE.UniformsUtils.clone(phongShader.uniforms);
        uniforms.u_brushSize = {type: 'f', value: 1.5};
        uniforms.u_trail = {type: '3fv', value: notes.getTrail()};
        uniforms.u_brushColor = {type: '4fv', value: new THREE.Vector4(1.0, 0.0, 0.0, 1.0)};
        uniforms.u_opacity = {type: 'f', value: 0.8};

        materialObject = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
            lights:true,
            fog: false,
            wireframe: false
        });

        // --------------------------------------------
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

        // --------------------------------------------
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
                    var note = notes.addNote(intersection.point);
                    if(note !== null) drawing = true;
                }
            }
        });

        // --------------------------------------------
        document.addEventListener('mouseup', function() {
            if (drawing) {
                drawing = false;
                var note = notes.getCurrentNote();
                var p = sceneToScreen(meshObject, note._linkPoint);
                note.addWidget(new Bubble(p.x, p.y));
            }
        });

        // --------------------------------------------
        document.addEventListener('mousemove', function(event) {
            if (drawing) {
                var p = getPose(event);
                var intersection = checkIntersection(p, meshObject);
                if (intersection.intersects) {
                    notes.getCurrentNote().addPoint(intersection.point);
                }
            }
        });

        // --------------------------------------------
        orbit.addEventListener('change', changePosition);
        function changePosition() {
            renderer.render(scene, camera);
            for (var i = 0, len = notes.length(); i < len; i += 1) {
                var note = notes.getNote(i);
                var p = sceneToScreen(meshObject, note._linkPoint);
                note.getWidget().setPosition(p.x, p.y);
            }
        }
    }

    // ---------- NOTES ---------------------------------------
    function Notes() {
        var items = [];
        var LENGTH = 200;
        var trail = new Float32Array(LENGTH*3);
        var currentNote;

        // --------------------------------------------
        function indexOfWidget(widget) {
            for (var i = 0, len = items.length; i < len; i += 1) {
                if(widget === items[i].getWidget()) return i;
            }
            return -1;
        }

        // --------------------------------------------
        function getCurrentNote() {
            return currentNote;
        }

        // --------------------------------------------
        function length() {
            return items.length;
        }

        // --------------------------------------------
        function getPointsAmount() {
            var amount = 0;
            items.forEach(function(item) {
                amount += item.length();
            });
            return amount;
        }

        // --------------------------------------------
        function addNote(position) {
            var amount = getPointsAmount();
            if(amount >= LENGTH) return null;
            currentNote = new Note(LENGTH-amount, position);
            items.push(currentNote);
            currentNote.addPoint(position);
            return currentNote;
        }

        // --------------------------------------------
        function getNote(index) {
            return items[index];
        }

        // --------------------------------------------
        function update() {
            var temp = [];
            items.forEach(function(item) {
                temp = temp.concat(item.toArray());
            });
            for(var i=temp.length; i<LENGTH*3; i+=1) {
                temp.push(10000);
            }
            for(i=0; i<LENGTH*3; i+=1) {
                trail[i] = temp[i];
            }
        }

        // --------------------------------------------
        function getTrail() {
            return trail;
        }

        // --------------------------------------------
        function remove(widget) {
            var index = indexOfWidget(widget);
            if(index !== -1) {
                items.splice(index, 1);
                update();
            }
            currentNote = null;
        }
        update();
        
        // Interface
        this.addNote = addNote;
        this.getNote = getNote;
        this.update = update;
        this.getTrail = getTrail;
        this.getCurrentNote = getCurrentNote;
        this.remove = remove;
        this.length = length;
    }

    // ---------- NOTE ----------------------------------------
    function Note(maxLength, position) {
        this._linkPoint = position;
        var points = [];
        var widget;

        // --------------------------------------------
        function addPoint(position) {
            if(points.length < maxLength) {
                var localPosition = meshObject.worldToLocal(position);
                points.push(localPosition);
                notes.update();
            }
        }

        // --------------------------------------------
        function addWidget(w) {
            widget = w;
        }

        // --------------------------------------------
        function getWidget() {
            return widget;
        }

        // --------------------------------------------
        function length() {
            return points.length;
        }

        // --------------------------------------------
        function toArray() {
            var temp = [];
            points.forEach(function(point) {
                temp = temp.concat(point.toArray());
            });
            return temp;
        }

        // Interface
        this.addPoint = addPoint;
        this.addWidget = addWidget;
        this.getWidget = getWidget;
        this.length = length;
        this.toArray = toArray;
    }

    // ---------- UTILS ---------------------------------------
    var raycaster = new THREE.Raycaster();

    function checkIntersection(position, mesh) {
        var intersection = {
            intersects: false,
            point: new THREE.Vector3()
        };

        raycaster.setFromCamera(position, camera);

        var intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
            intersection.point.copy(intersects[0].point);
            intersection.intersects = true;
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