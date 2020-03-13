import * as THREE from 'three';
window.THREE = THREE;

require('three/examples/js/controls/OrbitControls.js');
require('three/examples/js/postprocessing/EffectComposer.js');
require('three/examples/js/postprocessing/ShaderPass.js');
require('three/examples/js/postprocessing/SSAARenderPass.js');
require('three/examples/js/shaders/CopyShader.js');

export default THREE;