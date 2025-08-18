import './style.scss';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const canvas = document.querySelector('#experience-canvas');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Loaders
const textureLoader = new THREE.TextureLoader();

// Model Loader
// GLTFLoader is used to load 3D models in the GLTF format, which is efficient for web applications
// DRACOLoader is used to decode compressed geometry data, improving loading times for complex models
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

const environmentMap = new THREE.CubeTextureLoader()
  .setPath("textures/environmentMap/")
  .load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);


const textureMap = {
    One: '/textures/TexturedImageOne.webp',
    Two: '/textures/TexturedImageTwo.webp',
    Three: '/textures/TexturedImageThree.webp',
    Four: '/textures/TexturedImageFour.webp',
    Five: '/textures/TexturedImageFive.webp',
    Six: '/textures/TexturedImageSix.webp'
}

const loadedTexture = {};

Object.entries(textureMap).forEach(([key, value]) => {
    const texture = textureLoader.load(value);
    texture.flipY = false; // Ensures the texture is not flipped vertically
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    loadedTexture[key] = texture;
});

const videoElement = document.createElement('video');
videoElement.src = '/textures/video.mp4';
videoElement.loop = true;
videoElement.muted = true;
videoElement.autoplay = true;
videoElement.play();

const videoTexture = new THREE.VideoTexture(videoElement);
videoTexture.colorSpace = THREE.SRGBColorSpace;
videoTexture.flipY = false;

gltfLoader.load('/models/Priscilla_Portfolio.glb', (glb) => {
    glb.scene.traverse((child) => {
        if (child.isMesh) {
            if (child.name.includes("glass")) {
                child.material = new THREE.MeshPhysicalMaterial({
                    transmission: 0.95,
                    opacity: 1,
                    color: 0xAEEBFF, // Brighter blue-ish color
                    metalness: 0,
                    roughness: 0.02,
                    ior: 0.9,
                    thickness: 0.02,
                    specularIntensity: 1,
                    envMap: environmentMap,
                    envMapIntensity: 1.5, // Increase environment brightness
                    depthWrite: false,
                    specularColor: 0xAEEBFF, // Match blue-ish color
                });
            } else if (child.name.includes("screen")) {
                child.material = new THREE.MeshPhysicalMaterial({
                    map: videoTexture,
                });
            } else {
                Object.keys(textureMap).forEach((key) => {
                    if (child.name.includes(key)) {
                        const material = new THREE.MeshBasicMaterial({
                            map: loadedTexture[key],
                        });
                        child.material = material;

                        if(child.material.map) {
                            child.material.map.minFilter = THREE.LinearFilter;
                        }
                    }

                    if (child.name.includes("two")) {
                        const material = new THREE.MeshBasicMaterial({
                            map: loadedTexture["Two"],
                        });
                        child.material = material;

                        if(child.material.map) {
                            child.material.map.minFilter = THREE.LinearFilter;
                        }
                    } else if (child.name.includes("three")) {
                        const material = new THREE.MeshBasicMaterial({
                            map: loadedTexture["Three"],
                        });
                        child.material = material;

                        if(child.material.map) {
                            child.material.map.minFilter = THREE.LinearFilter;
                        }
                    } else if (child.name.includes('four')) {
                        const material = new THREE.MeshBasicMaterial({
                            map: loadedTexture["Four"],
                        });
                        child.material = material;

                        if(child.material.map) {
                            child.material.map.minFilter = THREE.LinearFilter;
                        }
                    }
                });
            }
        }
    });
    scene.add(glb.scene);
});



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
    40, 
    sizes.width / sizes.height,
    0.1,
    1000
);
camera.position.set(24.551482825853856, 14.64881145636224, 21.21667148479107);


const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );


// Adding OrbitControls for camera movement
// This allows the user to rotate, zoom, and pan the camera view
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation to prevent flipping
controls.minPolarAngle = 0;
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;
controls.minDistance = 5;
controls.maxDistance = 45;

controls.update();
controls.target.set(-0.40947105187467747, -4.1972440066691625e-17, -4.697412835109269); // Set the initial target of the controls


// Event listener for resizing the canvas
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera aspect ratio and renderer size
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Re-render the scene
    renderer.render(scene, camera);
});

const render = () => {
    controls.update();

    console.log(controls.getDistance());
    renderer.render( scene, camera );
    window.requestAnimationFrame(render);
}

render()