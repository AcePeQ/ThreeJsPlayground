import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeLoader = new THREE.CubeTextureLoader();
cubeLoader.setPath("/textures/cubeMap/");

// adding textures
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
const backgroundTexture = textureLoader.load(
  "/textures/2k_stars_milky_way.jpg"
);

const backgroundCubemap = cubeLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);

scene.background = backgroundCubemap;

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

// add stuff here
const sphareGeomatry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });

const sun = new THREE.Mesh(sphareGeomatry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

// const earthMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
// const earth = new THREE.Mesh(sphareGeomatry, earthMaterial);
// earth.position.x = 10;
// scene.add(earth);
// // sun.add(earth);

// const moonMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
// const moon = new THREE.Mesh(sphareGeomatry, moonMaterial);
// moon.scale.setScalar(0.3);
// moon.position.x = 2;
// earth.add(moon);

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const createPlanet = (planet) => {
  // create mesh
  const planetMesh = new THREE.Mesh(sphareGeomatry, planet.material);
  // set the scale
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;

  return planetMesh;
};

const createMoon = (moon) => {
  const moonMesh = new THREE.Mesh(sphareGeomatry, moonMaterial);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
};

const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);
  scene.add(planetMesh);

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  });

  return planetMesh;
});

// add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize clock
const clock = new THREE.Clock();

const axesHelper = new THREE.AxesHelper(2);
// earth.add(axesHelper);

// render loop
const renderloop = () => {
  // const elapsedTime = clock.getElapsedTime();

  // add animation
  // earth.rotation.y += 0.01;

  // earth.position.x = Math.sin(elapsedTime) * 10;
  // earth.position.z = Math.cos(elapsedTime) * 10;

  // moon.position.x = Math.sin(elapsedTime) * 2;
  // moon.position.z = Math.cos(elapsedTime) * 2;

  planetMeshes.forEach((planet, index) => {
    planet.rotation.y += planets[index].speed;

    planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;

    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[index].moons[moonIndex].speed;

      moon.position.x =
        Math.sin(moon.rotation.y) * planets[index].moons[moonIndex].distance;
      moon.position.z =
        Math.cos(moon.rotation.y) * planets[index].moons[moonIndex].distance;
    });
  });

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
