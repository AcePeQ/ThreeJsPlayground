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
    position_x: -10,
    position_y: 0,
    position_z: -10,
    rotate_x: 0,
    rotate_y: 90,
    rotate_z: 0,
    treeBush: [
      {
        width: 10,
        height: 6,
        depth: 10,
        position_x: 0,
        position_y: 8,
        position_z: 0,
      },
    ],
    treeLegs: [
      {
        width: 6,
        position_x: 0,
        position_y: 0,
        position_z: -3.75,
        treeLegCrowns: [
          {
            width: 2,
            position_x: 0,
            position_y: -2.25,
            position_z: -1.75,
            treeLegBush: [
              {
                width: 6,
                height: 4,
                depth: 6,
                position_x: 0,
                position_y: -2,
                position_z: 0,
              },
            ],
          },
        ],
      },
      {
        width: 4.5,
        position_x: 0,
        position_y: -2,
        position_z: 3,
        treeLegCrowns: [
          {
            width: 1,
            position_x: 0,
            position_y: 1.5,
            position_z: -1.25,
            treeLegBush: [
              {
                width: 6,
                height: 4,
                depth: 6,
                position_x: 0,
                position_y: -2,
                position_z: 0,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    position_x: 10,
    position_y: 0,
    position_z: 0,
    rotate_x: 0,
    rotate_y: 15,
    rotate_z: 0,
    treeBush: [
      {
        width: 10,
        height: 6,
        depth: 10,
        position_x: 0,
        position_y: 8,
        position_z: 0,
      },
    ],
    treeLegs: [
      {
        width: 6,
        position_x: 0,
        position_y: 0,
        position_z: -3.75,
        treeLegCrowns: [
          {
            width: 2,
            position_x: 0,
            position_y: -2.25,
            position_z: -1.75,
            treeLegBush: [
              {
                width: 6,
                height: 4,
                depth: 6,
                position_x: 0,
                position_y: -2,
                position_z: 0,
              },
            ],
          },
        ],
      },
      {
        width: 4.5,
        position_x: 0,
        position_y: -2,
        position_z: 3,
        treeLegCrowns: [
          {
            width: 1,
            position_x: 0,
            position_y: 1.5,
            position_z: -1.25,
            treeLegBush: [
              {
                width: 6,
                height: 4,
                depth: 6,
                position_x: 0,
                position_y: -2,
                position_z: 0,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    position_x: -10,
    position_y: 0,
    position_z: 10,
    rotate_x: 0,
    rotate_y: 15,
    rotate_z: 0,
    treeBush: [
      {
        width: 10,
        height: 6,
        depth: 10,
        position_x: 0,
        position_y: 8,
        position_z: 0,
      },
    ],
    treeLegs: [
      {
        width: 6,
        position_x: 0,
        position_y: 0,
        position_z: -3.75,
        treeLegCrowns: [
          {
            width: 2,
            position_x: 0,
            position_y: -2.25,
            position_z: -1.75,
            treeLegBush: [
              {
                width: 6,
                height: 4,
                depth: 6,
                position_x: 0,
                position_y: -2,
                position_z: 0,
              },
            ],
          },
        ],
      },
      {
        width: 4.5,
        position_x: 0,
        position_y: -2,
        position_z: 3,
        treeLegCrowns: [
          {
            width: 1,
            position_x: 0,
            position_y: 1.5,
            position_z: -1.25,
            treeLegBush: [
              {
                width: 6,
                height: 4,
                depth: 6,
                position_x: 0,
                position_y: -2,
                position_z: 0,
              },
            ],
          },
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
  const treeLegMat = new THREE.MeshBasicMaterial({ color: 0x8b5a2b });
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
  const treeLegCrownMat = new THREE.MeshBasicMaterial({ color: 0x8b5a2b });
  const treeLegCrownMesh = new THREE.Mesh(treeLegCrownGeo, treeLegCrownMat);
  treeLegCrownMesh.rotation.x = THREE.MathUtils.degToRad(90);

  treeLegCrownMesh.position.set(
    crown.position_x,
    crown.position_y,
    crown.position_z
  );

  console.log(crown.treeLegBush);

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
  const treeBushMat = new THREE.MeshBasicMaterial({ color: 0x228b22 });
  const treeBushMesh = new THREE.Mesh(treeBushGeo, treeBushMat);
  treeBushMesh.position.set(bush.position_x, bush.position_y, bush.position_z);

  return treeBushMesh;
}

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
