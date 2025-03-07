import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector(".canvas");

const axesHelper = new THREE.AxesHelper();

const width = window.innerWidth;
const height = window.innerHeight;
let aspectRatio = width / height;

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
  -150 * aspectRatio,
  150 * aspectRatio,
  150,
  -150,
  0.1,
  2000
);
camera.position.set(-100, 25, 200);
camera.lookAt(0, 0, 0);

scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

/*-----------------------------------*/
const environmentGroup = new THREE.Group();

const groundGeo = new THREE.BoxGeometry(200, 35, 200);
const groundMat = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
groundMesh.position.y = -75;
scene.add(groundMesh);
/*-----------------------------------*/

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);

window.addEventListener("resize", function () {
  aspectRatio = width / height;
  camera.left = -150 * aspectRatio;
  camera.right = 150 * aspectRatio;

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

function renderLoop() {
  requestAnimationFrame(renderLoop);

  controls.update();

  renderer.render(scene, camera);
}
renderLoop();
