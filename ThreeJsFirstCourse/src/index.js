import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("#canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

const controls = new OrbitControls(camera, canvas);
// controls.autoRotate = true;
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50;

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: "red" });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// const light = new THREE.AmbientLight("white", 1);
// scene.add(light);

const material = new THREE.LineBasicMaterial({ color: "red" });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(10, -20, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
scene.add(line);

function renderLoop() {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(renderLoop);
}

renderLoop();
