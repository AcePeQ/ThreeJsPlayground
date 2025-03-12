import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// canvas element
const canvas = document.querySelector("#canvas");

// additional variables
let width = window.innerWidth;
let height = window.innerHeight;
let ratioAspect = width / height;

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(35, ratioAspect, 0.1, 1000);
camera.position.z = 300;
camera.position.y = 100;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.02;
// controls.autoRotate = true;

// textures
const textureLoader = new THREE.TextureLoader();

const sunTexture = textureLoader.load("../../public/textures/8k_sun.jpg");
const moonTexture = textureLoader.load("../../public/textures/8k_moon.jpg");
const marsTexture = textureLoader.load("../../public/textures/8k_mars.jpg");
const jupiterTexture = textureLoader.load(
  "../../public/textures/8k_jupiter.jpg"
);
const mercuryTexture = textureLoader.load(
  "../../public/textures/8k_mercury.jpg"
);
const saturnTexture = textureLoader.load("../../public/textures/8k_saturn.jpg");
const saturnRingTexture = textureLoader.load(
  "../../public/textures/8k_saturn_ring_alpha.png"
);
const venusTexture = textureLoader.load(
  "../../public/textures/8k_venus_surface.jpg"
);
const neptunTexture = textureLoader.load(
  "../../public/textures/2k_neptune.jpg"
);
const earthTexture = textureLoader.load(
  "../../public/textures/8k_earth_daymap.jpg"
);
const uranusTexture = textureLoader.load("../../public/textures/2k_uranus.jpg");

// cubeTextures
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("../../public/cubeMaps/");

const sceneBackground = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = sceneBackground;

// generic geometry
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 5);

// materials
const sunMaterial = new THREE.MeshStandardMaterial({ map: sunTexture });
const sunMesh = new THREE.Mesh(icosahedronGeometry, sunMaterial);
sunMesh.scale.setScalar(5);
scene.add(sunMesh);

const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptunTexture });

const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

// planets
const planets = [
  {
    name: "Mercury",
    speed: 0.0047,
    distance: 10,
    radius: 0.38,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    speed: 0.0035,
    distance: 15,
    radius: 0.95,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    speed: 0.003,
    distance: 20,
    radius: 1,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        speed: 0.01,
        distance: 2,
        radius: 0.27,
        material: moonMaterial,
      },
    ],
  },
  {
    name: "Mars",
    speed: 0.0024,
    distance: 25,
    radius: 0.53,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        speed: 0.008,
        distance: 1.5,
        radius: 0.1,
        material: moonMaterial,
      },
      {
        name: "Deimos",
        speed: 0.005,
        distance: 2.5,
        radius: 0.15,
        material: moonMaterial,
      },
    ],
  },
  {
    name: "Jupiter",
    speed: 0.0013,
    distance: 50,
    radius: 3,
    material: jupiterMaterial,
    moons: [
      {
        name: "Io",
        speed: 0.007,
        distance: 7,
        radius: 0.5,
        material: moonMaterial,
      },
      {
        name: "Europa",
        speed: 0.006,
        distance: 1.5,
        radius: 0.4,
        material: moonMaterial,
      },
      {
        name: "Ganymede",
        speed: 0.005,
        distance: 3.5,
        radius: 0.7,
        material: moonMaterial,
      },
      {
        name: "Callisto",
        speed: 0.004,
        distance: 5,
        radius: 0.6,
        material: moonMaterial,
      },
    ],
  },
  {
    name: "Saturn",
    speed: 0.0009,
    distance: 80,
    radius: 2,
    material: saturnMaterial,
    moons: [
      {
        name: "Titan",
        speed: 0.0045,
        distance: 4,
        radius: 0.8,
        material: moonMaterial,
      },
      {
        name: "Enceladus",
        speed: 0.006,
        distance: 2,
        radius: 0.3,
        material: moonMaterial,
      },
    ],
  },
  {
    name: "Uranus",
    speed: 0.0007,
    distance: 120,
    radius: 1,
    material: uranusMaterial,
    moons: [
      {
        name: "Miranda",
        speed: 0.005,
        distance: 3,
        radius: 0.2,
        material: moonMaterial,
      },
      {
        name: "Titania",
        speed: 0.004,
        distance: 6,
        radius: 0.4,
        material: moonMaterial,
      },
    ],
  },
  {
    name: "Neptune",
    speed: 0.0005,
    distance: 150,
    radius: 0.8,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        speed: 0.0035,
        distance: 3,
        radius: 0.7,
        material: moonMaterial,
      },
    ],
  },
];

function createPlanetMesh(planet) {
  const planetMesh = new THREE.Mesh(icosahedronGeometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;

  planet.moons.forEach((moon) => {
    const moonMesh = createPlanetMoon(moon);
    planetMesh.add(moonMesh);
  });

  return planetMesh;
}

function createPlanetMoon(moon) {
  const planetMoon = new THREE.Mesh(icosahedronGeometry, moon.material);
  planetMoon.scale.setScalar(moon.radius);
  planetMoon.position.x = moon.distance;

  return planetMoon;
}

const planetMeshes = planets.map((planet) => {
  const planetObj = createPlanetMesh(planet);
  return planetObj;
});

console.log(planetMeshes);

// light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.25);
directionalLight.position.set(0, 100, 300);
scene.add(directionalLight);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);

// resize function
window.addEventListener("resize", function () {
  width = window.innerWidth;
  height = window.innerHeight;
  ratioAspect = width / height;

  camera.aspect = ratioAspect;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// renderloop function
function renderLoop() {
  requestAnimationFrame(renderLoop);

  planetMeshes.forEach((planet, i) => {
    planet.rotation.y += planets[i].speed;

    planet.position.x = Math.sin(planet.rotation.y) * planets[i].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[i].distance;

    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[i].moons[moonIndex].speed;

      moon.position.x =
        Math.sin(moon.rotation.y) * planets[i].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) * planets[i].moons[moonIndex].distance;
    });

    scene.add(planet);
  });

  controls.update();
  renderer.render(scene, camera);
}
renderLoop();
