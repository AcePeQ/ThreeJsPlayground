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
camera.position.z = 5;

const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// let aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );
// camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new THREE.Mesh(geometry, material);

cubeMesh.add(axesHelper);

cubeMesh.rotation.reorder("XYZ");

cubeMesh.rotation.y = THREE.MathUtils.degToRad(90);
cubeMesh.rotation.x = THREE.MathUtils.degToRad(45);

// const cubeMesh2 = new THREE.Mesh(geometry, material);
// const cubeMesh3 = new THREE.Mesh(geometry, material);

// const tempVector = new THREE.Vector3(1, 0, 0);
// cubeMesh.position.x = 0;

// console.log(tempVector.distanceTo(cubeMesh.position));

// cubeMesh.position.y = 1;
// cubeMesh2.position.x = 2;
// cubeMesh3.position.x = -2;

// const group = new THREE.Group();
// group.add(cubeMesh);
// group.add(cubeMesh2);
// group.add(cubeMesh3);

// scene.add(group);

// group.position.y = 1;

scene.add(cubeMesh);
// scene.add(cubeMesh2);
// scene.add(cubeMesh3);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

function renderLoop() {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
