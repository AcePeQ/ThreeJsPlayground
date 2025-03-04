import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { degToRad } from "three/src/math/MathUtils.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// initialize a group
const group = new THREE.Group();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// initialize the texture
const grassTexture = textureLoader.load(
  "/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png"
);
grassTexture.repeat.set(2, 2);
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
// grassTexture.wrapS = THREE.MirroredRepeatWrapping;
// grassTexture.wrapT = THREE.MirroredRepeatWrapping;

grassTexture.offset.x = 0.5;

// initialize the material
const material = new THREE.MeshBasicMaterial();
material.side = THREE.DoubleSide;
material.map = grassTexture;
// material.color = new THREE.Color("red");

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
// plane.position.x = -1.5;
plane.rotation.x = THREE.MathUtils.degToRad(-90);
plane.scale.set(1000, 1000);

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.y = 1.5;

const cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.y = -1.5;

// add the mesh to the scene
// scene.add(cube);
// scene.add(knot);
// scene.add(plane);
// group.add(sphere, cylinder, cube, knot, plane);
group.add(plane);
scene.add(group);

// initialize the light
// const light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 10;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  // cube.rotation.y += 0.01;
  // scene.children.forEach((object) => {
  //   if (object instanceof THREE.Mesh) {
  //     object.rotation.y += 0.01;
  //   }
  // });

  // group.children.forEach((object) => {
  //   if (object instanceof THREE.Mesh) {
  //     object.rotation.y += 0.01;
  //   }
  // });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
