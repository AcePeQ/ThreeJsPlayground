import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelpers = new THREE.AxesHelper();

cubeMesh.add(axesHelpers);

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1);

  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // cubeMesh.rotation.x += THREE.MathUtils.degToRad(1) * delta * 5;

  // console.log(Math.sin(currentTime));
  // cubeMesh.scale.x = Math.sin(currentTime) * 2 + 1;

  // console.log(Math.sin(currentTime));
  // cubeMesh.rotation.x = Math.sin(currentTime);

  // cubeMesh.position.x += THREE.MathUtils.degToRad(1) * delta * 10;
  cubeMesh.position.x = Math.cos(currentTime) * 3;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
