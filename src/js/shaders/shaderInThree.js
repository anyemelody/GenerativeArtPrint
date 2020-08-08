import * as THREE from "three";
import { vertexshader, fragmentshader } from "./waterDropEffectShader.glsl";

let testTexture = new THREE.TextureLoader().load(
  "../../assets/images/testImg.png"
);

let camera, scene, renderer;
let uniforms, mesh, cube;

export const shaderInThree = () => {
  function init() {
    //scene
    scene = new THREE.Scene();
    //camera
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    camera.position.set(0, 0, 10);
    scene.add(camera);
    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    //geometry and material
    let geometry = new THREE.BoxBufferGeometry(3, 3, 2);
    let plane = new THREE.PlaneBufferGeometry(5, 5, 32);
    uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: {
        type: "v2",
        value: new THREE.Vector2(
          renderer.domElement.width,
          renderer.domElement.height
        ),
      },
      u_mouse: { type: "v2", value: new THREE.Vector2() },
      u_texture: { type: "t", value: testTexture },
    };
    let cubeMaterial = new THREE.MeshBasicMaterial({
      map: testTexture,
    });
    let material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexshader,
      fragmentShader: fragmentshader,
    });
    cube = new THREE.Mesh(geometry, cubeMaterial);
    mesh = new THREE.Mesh(plane, material);
    scene.add(cube);
    scene.add(mesh);

    window.addEventListener("resize", onWindowResize, false);
    document.onmousemove = function (e) {
      uniforms.u_mouse.value.x = e.pageX;
      uniforms.u_mouse.value.y = e.pageY;
    };

    animate();
  }

  function animate() {
    requestAnimationFrame(() => {
      animate();
    });
    uniforms.u_time.value += 0.02;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }

  return init();
};

shaderInThree();
