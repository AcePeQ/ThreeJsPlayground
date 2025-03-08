import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector(".canvas");

const axesHelper = new THREE.AxesHelper();

let width = window.innerWidth;
let height = window.innerHeight;
let aspectRatio = width / height;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.OrthographicCamera(
  -50 * aspectRatio,
  50 * aspectRatio,
  50,
  -50,
  0.1,
  2000
);
camera.position.set(-50, 50, 100);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
// controls.autoRotate = true;

/*-----------------------------------*/
const environmentGroup = new THREE.Group();

const groundGeo = new THREE.BoxGeometry(50, 10, 50);
const groundMat = new THREE.MeshBasicMaterial({
  color: 0x3aaf4f,
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
groundMesh.position.y = 0;
scene.add(groundMesh);

const treeGroup = new THREE.Group();

const treeLogGeo = new THREE.CylinderGeometry(1, 1, 10, 16, 1);
const treeLogMat = new THREE.MeshBasicMaterial({ color: 0x8b5a2b });
const treeLogMesh = new THREE.Mesh(treeLogGeo, treeLogMat);

const treeCrownGeo = new THREE.SphereGeometry(4, 32, 32);
const treeCrownMat = new THREE.MeshBasicMaterial({ color: 0x228b22 });
const treeCrownMesh = new THREE.Mesh(treeCrownGeo, treeCrownMat);
treeLogMesh.add(treeCrownMesh);
treeCrownMesh.position.y = 5;

treeGroup.add(treeLogMesh);
treeGroup.position.y = 10;

groundMesh.add(treeGroup);
/*-----------------------------------*/

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);

window.addEventListener("resize", function () {
  width = window.innerWidth;
  height = window.innerHeight;
  aspectRatio = width / height;

  camera.left = -1 * aspectRatio;
  camera.right = 1 * aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

function renderLoop() {
  requestAnimationFrame(renderLoop);

  controls.update();

  renderer.render(scene, camera);
}
renderLoop();
