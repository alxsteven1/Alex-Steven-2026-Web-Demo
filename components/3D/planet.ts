
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CITIES } from "@/config/cities";

import earthVertex from "./shaders/earth/vertex";
import earthFragment from "./shaders/earth/fragment";
import atmosphereVertex from "./shaders/atmosphere/vertex";
import atmosphereFragment from "./shaders/atmosphere/fragment";

// Change this to match your repository name
const BASE_PATH = "/Alex-Steven-2026-Web-Demo";

const initPlanet = (onCityClick: (id: string) => void) => {
  const canvas = document.querySelector("canvas.planet-3D") as HTMLCanvasElement;
  if (!canvas) return;

  const scene = new THREE.Scene();
  const size = { 
    width: window.innerWidth, 
    height: window.innerHeight, 
    pixelRatio: window.devicePixelRatio // Corrected typo
  };

  const camera = new THREE.PerspectiveCamera(15, size.width / size.height, 0.1, 10000);
  camera.position.set(0, 0, 30); 
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(size.pixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enabled = false; 
  controls.minDistance = 3.5;
  controls.maxDistance = 40;

  // Texture Loading with BASE_PATH
  const TL = new THREE.TextureLoader();
  const dayTexture = TL.load(`${BASE_PATH}/earth/day.jpg`);
  const nightTexture = TL.load(`${BASE_PATH}/earth/night.jpg`);
  const specularCloudsTexture = TL.load(`${BASE_PATH}/earth/specularClouds.jpg`);
  dayTexture.colorSpace = nightTexture.colorSpace = THREE.SRGBColorSpace;

  const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
  const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64); 

  const earthMaterial = new THREE.ShaderMaterial({
    vertexShader: earthVertex,
    fragmentShader: earthFragment,
    uniforms: {
      uDayTexture: new THREE.Uniform(dayTexture),
      uNightTexture: new THREE.Uniform(nightTexture),
      uSpecularCloudsTexture: new THREE.Uniform(specularCloudsTexture),
      uSunDirection: new THREE.Uniform(new THREE.Vector3(-1, 0, 0)),
      uAtmosphereDayColor: new THREE.Uniform(new THREE.Color("#4a96e8")),
      uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color("#1950E5")),
    },
    transparent: true,
  });

  const atmosphereMaterial = new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.BackSide,
    vertexShader: atmosphereVertex,
    fragmentShader: atmosphereFragment,
    uniforms: {
      uSunDirection: new THREE.Uniform(new THREE.Vector3(-1, 0, 0)),
      uAtmosphereDayColor: new THREE.Uniform(new THREE.Color("#4a96e8")),
      uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color("#1950E5")),
    },
    depthWrite: false,
  });

  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  atmosphere.scale.set(1.13, 1.13, 1.13);
  const earthGroup = new THREE.Group().add(earth, atmosphere);
  scene.add(earthGroup);

  const dotGroup = new THREE.Group();
  const dots: THREE.Mesh[] = [];

  /**
   * Spherical Coordinate Mapping
   * Converts Latitude/Longitude to 3D Cartesian space
   */
  const latLongToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  CITIES.forEach((city) => {
    const radius = city.size === "big" ? 0.045 : 0.025;
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1.5 })
    );
    dot.position.copy(latLongToVector3(city.lat, city.lng, 2.02));
    dot.lookAt(0,0,0);
    dot.userData = { id: city.id };
    dotGroup.add(dot);
    dots.push(dot);
  });
  earthGroup.add(dotGroup);

  let isCityOpen = false;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (event: MouseEvent) => {
    if (!controls.enabled && !isCityOpen) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(dots);

    if (intersects.length > 0) {
      isCityOpen = true;
      controls.enabled = false;
      onCityClick(intersects[0].object.userData.id);
      const targetWorldPos = new THREE.Vector3();
      intersects[0].object.getWorldPosition(targetWorldPos);
      const targetCamPos = targetWorldPos.clone().normalize().multiplyScalar(window.innerWidth > 768 ? 6 : 8);
      gsap.to(camera.position, { 
        x: targetCamPos.x, y: targetCamPos.y, z: targetCamPos.z, 
        duration: 1.5, ease: "power2.inOut", onUpdate: () => camera.lookAt(0,0,0)
      });
    }
  };
  window.addEventListener("click", onMouseClick);

  const clock = new THREE.Clock();
  let sunAngle = Math.PI;

  const tick = () => {
    const time = clock.getElapsedTime();
    
    if (!isCityOpen) {
      earthGroup.rotation.y += 0.0015; 
    } else {
      sunAngle -= 0.0015;
      const sunDir = new THREE.Vector3(Math.cos(sunAngle), 0, Math.sin(sunAngle)).normalize();
      earthMaterial.uniforms.uSunDirection.value.copy(sunDir);
      atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDir);
    }
    
    dots.forEach(d => { d.scale.setScalar(1 + Math.sin(time * 4) * 0.2); });
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  tick();

  return {
    destroy: () => { window.removeEventListener("click", onMouseClick); renderer.dispose(); },
    
    playIntro: () => {
      canvas.style.pointerEvents = "none";
      const tl = gsap.timeline({
        onComplete: () => { 
          controls.enabled = true; 
          canvas.style.pointerEvents = "auto";
        }
      });

      tl.to(".top-text h1 .letter", {
        y: "40vh",
        x: () => (Math.random() - 0.5) * 200, 
        z: -200, 
        rotationX: -120, 
        rotationY: () => (Math.random() - 0.5) * 90,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        stagger: { amount: 0.8, from: "center" }, 
        ease: "power2.in"
      }, 0);

      tl.to(".bottom-text p .letter", {
        y: "20vh", 
        z: -100,
        rotationX: 90, 
        opacity: 0,
        duration: 1.5,
        stagger: { amount: 0.5, from: "center" },
        ease: "power2.in"
      }, 0.2);

      tl.to(camera.position, {
        x: 0,
        y: 0,
        z: window.innerWidth > 768 ? 9 : 14, 
        duration: 3,
        ease: "power3.inOut"
      }, 0.5); 
    },

    resetCamera: () => {
      isCityOpen = false;
      gsap.to(camera.position, { 
        x: 0, y: 0, z: window.innerWidth > 768 ? 9 : 14, 
        duration: 1.5, ease: "power2.inOut", 
        onUpdate: () => camera.lookAt(0,0,0), 
        onComplete: () => { controls.enabled = true; } 
      });
    }
  };
};

export default initPlanet;
