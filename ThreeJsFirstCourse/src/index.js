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

//texture
const planetAmbientTexture = textureLoader.load(
  "/textures/Glass_Window/Glass_Window_003_basecolor.jpg"
);
planetAmbientTexture.colorSpace = THREE.SRGBColorSpace;

const planetAoTextureTexture = textureLoader.load(
  "/textures/Glass_Window/Glass_Window_003_ambientOcclusion.jpg"
);
const planetRoughnessTexture = textureLoader.load(
  "/textures/Glass_Window/Glass_Window_003_roughness.jpg"
);
const planetMetalnessTexture = textureLoader.load(
  "/textures/Glass_Window/Glass_Window_003_metallic.jpg"
);
const planetNormalTexture = textureLoader.load(
  "/textures/Glass_Window/Glass_Window_003_normal.jpg"
);
const planetHeightTexture = textureLoader.load(
  "/textures/Glass_Window/Glass_Window_003_height.png"
);

const sphereGeometry = new THREE.SphereGeometry(1, 70, 70);
const uv2Geometry = new THREE.BufferAttribute(
  sphereGeometry.attributes.uv.array,
  2
);
sphereGeometry.setAttribute("uv2", uv2Geometry);

const sphereMaterial = new THREE.MeshStandardMaterial();
sphereMaterial.map = planetAmbientTexture;
sphereMaterial.aoMap = planetAoTextureTexture;
sphereMaterial.roughnessMap = planetRoughnessTexture;
sphereMaterial.metalnessMap = planetMetalnessTexture;
sphereMaterial.metalness = 1;
sphereMaterial.normalMap = planetNormalTexture;
// sphereMaterial.displacementMap = planetHeightTexture;
// sphereMaterial.displacementScale = 0.1;

const planetMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(planetMesh);

const cylinderAmbientTexture = textureLoader.load(
  "/textures/Incrusted_Gems_001_SD/Incrusted_Gems_001_COLOR.jpg"
);

const cylinderGeometry = new THREE.CylinderGeometry(1.25, 1.25, 0.1, 60);
const cylinderMaterial = new THREE.MeshStandardMaterial();
cylinderMaterial.map = cylinderAmbientTexture;
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

cylinderMesh.position.y = -1.15;
scene.add(cylinderMesh);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 30);
scene.add(ambientLight);

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

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
