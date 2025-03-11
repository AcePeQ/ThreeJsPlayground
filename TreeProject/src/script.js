import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { treesObject } from "./trees";

const canvas = document.querySelector(".canvas");

const cubeLoader = new THREE.CubeTextureLoader();
cubeLoader.setPath("./skyCubeTexture/");

const axesHelper = new THREE.AxesHelper();

let width = window.innerWidth;
let height = window.innerHeight;
let aspectRatio = width / height;

const backgroundCubemap = cubeLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
// scene.background = backgroundCubemap;

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
controls.dampingFactor = 0.02;
// controls.autoRotate = true;

/*-----------------------------------*/

const grassGeo = new THREE.BoxGeometry(30, 5, 30);
const grassMat = new THREE.MeshStandardMaterial({
  color: 0x3a9236,
});
const grassMesh = new THREE.Mesh(grassGeo, grassMat);
grassMesh.position.y = -2.5;

const groundGeo = new THREE.BoxGeometry(28, 3.5, 28);
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x5c4033,
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);

groundMesh.position.y = -4;
grassMesh.add(groundMesh);

grassMesh.receiveShadow = true;
groundMesh.receiveShadow = true;

scene.add(grassMesh);

const treesGroup = new THREE.Group();
const trees = treesObject;

function createTree(tree) {
  const treeLogGeo = new THREE.BoxGeometry(1.5, 12, 1.5);
  const treeLogMat = new THREE.MeshStandardMaterial({ color: 0x654321 });
  const treeLogMesh = new THREE.Mesh(treeLogGeo, treeLogMat);

  tree.treeLegs.forEach((treeLegArg) => {
    const treeLeg = createTreeLeg(treeLegArg);
    treeLogMesh.add(treeLeg);
  });

  treeLogMesh.position.set(tree.position_x, tree.position_y, tree.position_z);
  treeLogMesh.rotation.set(
    THREE.MathUtils.degToRad(tree.rotate_x),
    THREE.MathUtils.degToRad(tree.rotate_y),
    THREE.MathUtils.degToRad(tree.rotate_z)
  );

  tree.treeBush.forEach((bush) => {
    const treeMainBush = createBush(bush);
    treeLogMesh.add(treeMainBush);
  });

  return treeLogMesh;
}

function createTreeLeg(treeLeg) {
  const treeLegGeo = new THREE.BoxGeometry(1.5, treeLeg.width, 1.5);
  const treeLegMat = new THREE.MeshStandardMaterial({
    color: 0x654321,
  });
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
  const treeLegCrownMat = new THREE.MeshStandardMaterial({ color: 0x654321 });
  const treeLegCrownMesh = new THREE.Mesh(treeLegCrownGeo, treeLegCrownMat);
  treeLegCrownMesh.rotation.x = THREE.MathUtils.degToRad(90);

  treeLegCrownMesh.position.set(
    crown.position_x,
    crown.position_y,
    crown.position_z
  );

  if (crown.treeLegBush) {
    crown.treeLegBush.forEach((bush) => {
      const legBush = createBush(bush);
      treeLegCrownMesh.add(legBush);
    });
  }

  return treeLegCrownMesh;
}

function createBush(bush) {
  const treeBushGeo = new THREE.BoxGeometry(
    bush.width,
    bush.height,
    bush.depth
  );
  const treeBushMat = new THREE.MeshStandardMaterial({
    color: 0x228b22,
  });
  const treeBushMesh = new THREE.Mesh(treeBushGeo, treeBushMat);
  treeBushMesh.position.set(bush.position_x, bush.position_y, bush.position_z);

  return treeBushMesh;
}

trees.forEach((treeArg) => {
  const tree = createTree(treeArg);
  treesGroup.add(tree);
});

treesGroup.position.y = 6;
treesGroup.castShadow = true;
treesGroup.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});

scene.add(treesGroup);
/*-----------------------------------*/

/*------------WALL--------------------*/
const wallGroupOne = new THREE.Group();
wallGroupOne.position.x = 14.5;
wallGroupOne.position.z = 14;
wallGroupOne.position.y = 0.5;
wallGroupOne.rotation.y = THREE.MathUtils.degToRad(90);

const wallGroupTwo = new THREE.Group();
wallGroupTwo.position.x = 14;
wallGroupTwo.position.z = 14.5;
wallGroupTwo.position.y = 0.5;
wallGroupTwo.rotation.y = THREE.MathUtils.degToRad(180);

function createWall() {
  const brickMeshes = [];
  let brickPositionX = 0;
  let brickPositionY = 0;
  let bricksPerRow = 6;

  for (let row = 0; row < 6; row++) {
    let col = bricksPerRow - row;
    for (; col > 0; col--) {
      const brickGeo = new THREE.BoxGeometry(2, 1, 1);
      const brickMat = new THREE.MeshStandardMaterial({ color: 0xa9a9a9 });
      const brickMesh = new THREE.Mesh(brickGeo, brickMat);
      brickMesh.position.x = brickPositionX;
      brickMesh.position.y = brickPositionY;
      brickMeshes.push(brickMesh);
      brickPositionX += 1;
    }
    brickPositionY += 1;
    brickPositionX = 0;
  }

  return brickMeshes;
}

const wallOne = createWall();
const wallTwo = createWall();
wallOne.forEach((brick) => {
  brick.castShadow = true;
  brick.receiveShadow = true;
  wallGroupOne.add(brick);
});

wallTwo.forEach((brick) => {
  brick.castShadow = true;
  brick.receiveShadow = true;
  wallGroupTwo.add(brick);
});

scene.add(wallGroupOne);
scene.add(wallGroupTwo);

/*------------WALL--------------------*/

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(50, 100, 50);

directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.camera.left = -25;
directionalLight.shadow.camera.right = 25;
directionalLight.shadow.camera.top = 25;
directionalLight.shadow.camera.bottom = -25;

directionalLight.shadow.mapSize.set(2048, 2048);

directionalLight.castShadow = true;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

scene.add(ambientLight, directionalLight);

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
