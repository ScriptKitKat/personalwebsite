import './style.scss';

import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const canvas = document.querySelector('#experience-canvas');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const modals = {
    mywork: document.querySelector('.work.modal'),
    about: document.querySelector('.about.modal'),
    contact: document.querySelector('.contact.modal'),
}

document.querySelectorAll(".modal-exit-button").forEach(button => {
    function handleModalExit(event) {
        event.preventDefault();
        const modal = button.closest('.modal');
        hideModal(modal);
        gsap.to(button, {
            scale: 5,
            duration: 0.5,
            ease: "back.out(2)",
            onStart: () => {
                gsap.to(button, {
                scale: 1,
                duration: 0.5,
                ease: "back.out(2)",
                onComplete: () => {
                    gsap.set(button, {
                    clearProps: "all",
                    });
                },
                });
            },
        });

        hideModal(modal);
    }

    button.addEventListener('click', handleModalExit);
});

let isModalOpen = false;

const showModal = (modal) => {
    modal.style.display = 'block';
    overlay.style.display = 'block';

    isModalOpen = true;
    controls.enabled = false; // Disable controls when modal is open

    if (currentHoveredObject) {
        playHoverAnimation(currentHoveredObject, false); // Reset hover animation when modal is open
        currentHoveredObject = null; // Reset hovered object
    }

    document.body.style.cursor = 'default'; // Reset cursor when modal is open
    currentIntersects = []; // Clear current intersects to prevent hover effects

    gsap.set(modal, {
        opacity: 0,
        scale: 0,
    });
    gsap.set(overlay, {
        opacity: 0,
    });

    gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
    });

    gsap.to(modal, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
    });
};

const hideModal = (modal) => {
    isModalOpen = false;
    controls.enabled = true; // Re-enable controls when modal is closed
    
    gsap.to(modal, {
    opacity: 0,
    scale: 0,
    duration: 0.5,
    ease: "back.in(2)",
    onComplete: () => {
        modal.style.display = 'none';
    }
  });
};

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const raycasterObjects = [];
let currentIntersects = [];
let currentHoveredObject = null;

const socialLinks = {
    github: 'https://github.com/ScriptKitKat',
    linkedin: 'https://www.linkedin.com/in/priscillaye/',
    youtube: 'https://www.youtube.com/@itsprye',
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

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener('click', (event) => {
    if (currentIntersects.length > 0) {
        const object = currentIntersects[0].object;

        Object.entries(socialLinks).forEach(([key, url]) => {
            if (object.name.includes(key)) {
                const newWindow = window.open();
                newWindow.opener = null; // Prevents the new window from being able to access the opener
                newWindow.location = url; // Opens the link in a new window
                newWindow.target = "_blank"; // Ensures the link opens in a new tab
                newWindow.rel = "noopener noreferrer"; // Security measure to prevent the new window from accessing the original window
            }
        });

        if (object.name.includes("mywork")) {
            showModal(modals.mywork);
        } else if (object.name.includes("about")) {
            showModal(modals.about);
        } else if (object.name.includes("contact")) {
            showModal(modals.contact);
        }

        if (isModalOpen) {
            // Close the modal if it's already open
            hideModal(modals.mywork);
            hideModal(modals.about);
            hideModal(modals.contact);
        }
    }
});

gltfLoader.load('/models/Priscilla_Portfolio.glb', (glb) => {
    glb.scene.traverse((child) => {
        if (child.isMesh) {
            if (child.name.includes("target")) {
                child.userData.initialScale = new THREE.Vector3().copy(child.scale);
                child.userData.initialPosition = new THREE.Vector3().copy(child.position);
                child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
            }
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

            if (child.name.includes("target")) {
                raycasterObjects.push(child);
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

function playHoverAnimation(object, isHovered) {
    if (!object.userData.initialScale || !object.userData.initialRotation) {
        // Prevent errors if initial values are not set
        return;
    }
    let scale = 1.4;  
    gsap.killTweensOf(object.scale);
    gsap.killTweensOf(object.rotation);
    gsap.killTweensOf(object.position);

    if(isHovered) {
        if (object.name.includes("bible")) {
            scale = 1;
        }

        if (object.name.includes("snake_plant") || 
            object.name.includes("mailbox")){
            scale = 1.1;
        }

        gsap.to(object.scale,
            { x: object.userData.initialScale.x * scale,
              y: object.userData.initialScale.y * scale,
              z: object.userData.initialScale.z * scale,
              duration: 0.5,
              ease: 'back.out(2)',
            });

        if (object.name.includes("about")) {
            gsap.to(object.rotation,
            { x: object.userData.initialRotation.x - Math.PI/ 8,
              duration: 0.5,
              ease: 'back.out(2)',
            });
        } else if (
        object.name.includes("contact") ||
        object.name.includes("mywork") ||
        object.name.includes("github") ||
        object.name.includes("youtube") ||
        object.name.includes("linkedin")
        ) {
        gsap.to(object.rotation,
            { x: object.userData.initialRotation.x + Math.PI/ 8,
              duration: 0.5,
              ease: 'back.out(2)',
            });
        } else if (object.name.includes("bible")) {
            gsap.to(object.rotation,
            { y: object.userData.initialRotation.y - Math.PI / 6, // Rotate around Y axis instead of X
              duration: 0.5,
              ease: 'back.out(2)',
            });
        }
    } else {
        gsap.to(object.scale,
            { x: object.userData.initialScale.x,
              y: object.userData.initialScale.y,
              z: object.userData.initialScale.z,
              duration: 0.3,
              ease: 'back.out(2)',
            });
        if (
        object.name.includes("about") ||
        object.name.includes("contact") ||
        object.name.includes("mywork") ||
        object.name.includes("github") ||
        object.name.includes("youtube") ||
        object.name.includes("linkedin")
        ) {
        gsap.to(object.rotation,
            { x: object.userData.initialRotation.x,
              duration: 0.5,
              ease: 'back.out(2)',
            });
        }

        if (object.name.includes("bible")) {
            gsap.to(object.rotation,
            { y: object.userData.initialRotation.y,
              duration: 0.5,
              ease: 'back.out(2)',
            });
        }
    }
}

const render = () => {
    controls.update();


    raycaster.setFromCamera(mouse, camera);
    currentIntersects = raycaster.intersectObjects(raycasterObjects);

    if (currentIntersects.length > 0) {
        const currentIntersectObject = currentIntersects[0].object;

        if (currentIntersectObject.name.includes("target")) {
            if (currentHoveredObject !== currentIntersectObject) {

                if (currentHoveredObject) {
                    playHoverAnimation(currentHoveredObject, false);
                }

                currentHoveredObject = currentIntersectObject;
                playHoverAnimation(currentIntersectObject, true);
            }
        }

        if (currentIntersectObject.name.includes("button")) {
            document.body.style.cursor = 'pointer'; // Change cursor to pointer when hovering over an object
        } else {
            document.body.style.cursor = 'default'; // Reset cursor when not hovering over an object
        }
    } else {
        if (currentHoveredObject) {
            playHoverAnimation(currentHoveredObject, false);
            currentHoveredObject = null; // Reset hovered object
        }
        document.body.style.cursor = 'default'; // Reset cursor when not hovering over an object
    }

    renderer.render( scene, camera );
    window.requestAnimationFrame(render);
}

render()