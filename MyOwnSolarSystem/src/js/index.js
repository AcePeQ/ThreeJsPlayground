import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// canvas element
const canvas = document.querySelector("#canvas");

// additional variables
let width = window.innerWidth;
let height = window.innerHeight;
let ratioAspect = width / height;

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(35, ratioAspect, 0.1, 500);
camera.position.z = 5;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.02;
// controls.autoRotate = true;

// test mesh
const geo = new THREE.BoxGeometry(1, 1, 1);
const mat = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);

// resize function
window.addEventListener("resize", function () {
  width = window.innerWidth;
  height = window.innerHeight;
  ratioAspect = width / height;

  camera.aspect = ratioAspect;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// renderloop function
function renderLoop() {
  requestAnimationFrame(renderLoop);

  controls.update();

  renderer.render(scene, camera);
}
renderLoop();
