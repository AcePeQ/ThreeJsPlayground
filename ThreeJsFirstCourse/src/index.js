import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const axesHelper = new THREE.AxesHelper();

const canvas = document.querySelector("#canvas");
const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 5;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

const materialTexture = textureLoader.load("/test.jpg");
materialTexture.repeat.set(5, 5);
materialTexture.wrapS = THREE.RepeatWrapping;
materialTexture.wrapT = THREE.RepeatWrapping;

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ map: materialTexture });

const roundMesh = new THREE.Mesh(geometry, material);
scene.add(roundMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 20);
pointLight.position.set(0, 0, 5);
scene.add(pointLight);

const scaneBackground = textureLoader.load("/milkyway.jpg");
scene.background = scaneBackground;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();
let previousTime = 0;

function renderLoop() {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  roundMesh.rotation.x += THREE.MathUtils.degToRad(1) * delta * 1;

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
