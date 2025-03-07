import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

const scene = new THREE.Scene();

const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader();

const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/05_earthcloudmaptrans.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
earthGroup.add(cloudsMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
// scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff, 0.1);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

function rendererLoop(t) {
  requestAnimationFrame(rendererLoop);

  // mesh.rotation.y = t * 0.0001;

  renderer.render(scene, camera);
  controls.update();
}
rendererLoop();
