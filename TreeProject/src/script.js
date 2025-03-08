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
  -25 * aspectRatio,
  25 * aspectRatio,
  25,
  -25,
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

const groundGeo = new THREE.BoxGeometry(30, 5, 30);
const groundMat = new THREE.MeshBasicMaterial({
  color: 0x3aaf4f,
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
groundMesh.position.y = -2.5;
scene.add(groundMesh);

const treesGroup = new THREE.Group();

const trees = [
  {
    position_x: 0,
    position_y: 0,
    position_z: 0,
    treeLegs: [
      {
        width: 6,
        position_x: 0,
        position_y: 0,
        position_z: -3.75,
        treeLegCrowns: [
          { width: 2, position_x: 0, position_y: -2.25, position_z: -1.75 },
        ],
      },
      {
        width: 4.5,
        position_x: 0,
        position_y: -2,
        position_z: 3,
        treeLegCrowns: [
          { width: 1, position_x: 0, position_y: 1.5, position_z: -1.25 },
        ],
      },
    ],
  },
];

function createTree(tree) {
  const treeLogGeo = new THREE.BoxGeometry(1.5, 12, 1.5);
  const treeLogMat = new THREE.MeshBasicMaterial({ color: 0x8b5a2b });
  const treeLogMesh = new THREE.Mesh(treeLogGeo, treeLogMat);

  tree.treeLegs.forEach((treeLegArg) => {
    const treeLeg = createTreeLeg(treeLegArg);
    treeLogMesh.add(treeLeg);
  });

  treeLogMesh.position.set(tree.position_x, tree.position_y, tree.position_z);

  return treeLogMesh;
}

function createTreeLeg(treeLeg) {
  const treeLegGeo = new THREE.BoxGeometry(1.5, treeLeg.width, 1.5);
  const treeLegMat = new THREE.MeshBasicMaterial({ color: "red" });
  const treeLegMesh = new THREE.Mesh(treeLegGeo, treeLegMat);
  treeLegMesh.rotation.x = THREE.MathUtils.degToRad(90);
  treeLegMesh.position.set(
    treeLeg.position_x,
    treeLeg.position_y,
    treeLeg.position_z
  );

  treeLeg.treeLegCrowns.forEach((treeLegCrownArg) => {
    const treeLegCrown = createLegCrown(treeLegCrownArg);
    treeLegMesh.add(treeLegCrown);
  });

  return treeLegMesh;
}

function createLegCrown(crown) {
  const treeLegCrownGeo = new THREE.BoxGeometry(1.5, crown.width, 1.5);
  const treeLegCrownMat = new THREE.MeshBasicMaterial({ color: "blue" });
  const treeLegCrownMesh = new THREE.Mesh(treeLegCrownGeo, treeLegCrownMat);
  treeLegCrownMesh.rotation.x = THREE.MathUtils.degToRad(90);

  treeLegCrownMesh.position.set(
    crown.position_x,
    crown.position_y,
    crown.position_z
  );

  return treeLegCrownMesh;
}

function createBush() {}

trees.forEach((treeArg) => {
  const tree = createTree(treeArg);
  treesGroup.add(tree);
});

treesGroup.position.y = 6;
scene.add(treesGroup);

// groundMesh.add(treesGroup);
/*-----------------------------------*/

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);

window.addEventListener("resize", function () {
  width = window.innerWidth;
  height = window.innerHeight;
  aspectRatio = width / height;

  camera.left = -25 * aspectRatio;
  camera.right = 25 * aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

function renderLoop() {
  requestAnimationFrame(renderLoop);

  controls.update();

  renderer.render(scene, camera);
}
renderLoop();
