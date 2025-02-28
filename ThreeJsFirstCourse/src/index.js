import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

const controls = new OrbitControls(camera, canvas);
// controls.autoRotate = true;
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "red" });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function renderLoop() {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(renderLoop);
}

renderLoop();
