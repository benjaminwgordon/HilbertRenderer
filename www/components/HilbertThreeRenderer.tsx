import { useEffect, useRef, useState } from "react";
import * as wasm from "../../pkg/hilbert_wasm_renderer";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";

type HilbertThreeRendererProps = {
  initN: number;
  initP: number;
  initPipeThickness: number;
  initGeometryType: string;
  isControlEnabled: boolean;
  isSpinning: boolean;
  isCameraOffSetY: boolean;
  rotationSpeed: number;
};
const HilbertThreeRenderer = (props: HilbertThreeRendererProps) => {
  const {
    initN,
    initP,
    initPipeThickness,
    initGeometryType,
    isControlEnabled,
    isSpinning,
    isCameraOffSetY,
    rotationSpeed,
  } = props;

  // initialize the renderer state with the values from props, otherwise use defaults
  let n = initN || 3;
  let p = initP || 3;
  let pipeThickness = initPipeThickness || 0.2;
  let geometryType = initGeometryType || "square";
  let rotation = 0;
  const THREECanvasMount = useRef(null);

  // camera and scene get initialized before render to prevent null access
  let camera: THREE.PerspectiveCamera | null;
  const scene = new THREE.Scene();

  // once the component is rendered:
  //  (so that the canvas exists to mount a THREE.Renderer to)
  //  set up the scene
  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setPixelRatio(window.devicePixelRatio);

    if (THREECanvasMount.current.children.length == 0) {
      THREECanvasMount.current.appendChild(renderer.domElement);
    }
    renderHilbertGeometry();

    function animate() {
      if (scene && camera) {
        requestAnimationFrame(animate);

        if (THREECanvasMount.current) {
          renderer.setSize(
            THREECanvasMount.current.clientWidth,
            THREECanvasMount.current.clientHeight
          );
          camera.aspect =
            THREECanvasMount.current.clientWidth /
            THREECanvasMount.current.clientHeight;
          camera.updateProjectionMatrix();
        }

        // throw the camera in a gentle ellipse around model center
        if (isSpinning) rotation += rotationSpeed;
        camera.position.x = Math.sin(rotation) * 2 ** p * 1.5;
        camera.position.y = isCameraOffSetY ? p ** 2 : 0;
        camera.position.z = Math.cos(rotation) * 2 ** p * 1.2;

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      } else {
        console.log({ scene }, { camera });
      }
    }
    animate();
  }, []);

  // global setters
  const updateN = (newGeometryTypeIs3D) => {
    n = newGeometryTypeIs3D ? 3 : 2;
    renderHilbertGeometry();
  };
  const updateGeometryType = (newGeometryTypeIsSquare) => {
    geometryType = newGeometryTypeIsSquare ? "square" : "round";
    renderHilbertGeometry();
  };
  function updateP(newP) {
    p = newP;
    renderHilbertGeometry();
  }
  const updatePipeThickness = (newPipeThickness) => {
    // pipe thickness is specified as integers, but is actually thousands of a unit
    pipeThickness = newPipeThickness / 1000;
    renderHilbertGeometry();
  };

  function renderHilbertGeometry() {
    // clear any prior geometry
    clearScene(scene);

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const hilbert_flat_buffer = wasm.hilbert_coordinates(n, p);
    const hilbertVectors = unflattenHilbertVectors(hilbert_flat_buffer);

    const roundedGeometry = new THREE.CapsuleGeometry(pipeThickness, 1, 2);
    const squareGeometry = new THREE.BoxGeometry(
      pipeThickness,
      1 + pipeThickness,
      pipeThickness
    );
    const pipeGeometry =
      geometryType == "round" ? roundedGeometry : squareGeometry;

    // create a correctly rotated capsule geometry and use it like a prefab
    const pipeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    pipeGeometry.rotateX(1.5708);
    pipeGeometry.rotateZ(1.5708);

    const geometries = [];
    for (let i = 1; i < hilbertVectors.length; i++) {
      const lineInGeometry = pipeGeometry.clone();
      const previousVertex =
        i == 0 ? new THREE.Vector3(0, 0, 0) : hilbertVectors[i - 1];
      const lineInDirection = hilbertVectors[i]
        .clone()
        .sub(previousVertex)
        .normalize();
      lineInGeometry.lookAt(lineInDirection);
      lineInGeometry.translate(
        hilbertVectors[i].x - lineInDirection.x * 0.5,
        hilbertVectors[i].y - lineInDirection.y * 0.5,
        hilbertVectors[i].z - lineInDirection.z * 0.5
      );
      geometries.push(lineInGeometry);
    }

    const hilbertGeometries = mergeGeometries(geometries);
    const hilbertMeshes = new THREE.Mesh(hilbertGeometries, pipeMaterial);
    hilbertMeshes.geometry.center();
    scene.add(hilbertMeshes);

    const lightOne = new THREE.DirectionalLight(0x00ffff, 0.7);
    const lightTwo = new THREE.DirectionalLight(0x00ff00, 0.6);
    const lightThree = new THREE.DirectionalLight(0xff00ff, 0.7);
    const lightFour = new THREE.DirectionalLight(0xff0000, 0.7);

    lightOne.position.set(0, -1, 0);
    lightTwo.position.set(0, 1, 0);
    lightThree.position.set(-1, 0, 0);
    lightFour.position.set(1, 0, 0);

    for (const light of [lightOne, lightTwo, lightThree, lightFour]) {
      scene.add(light);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
  }

  function clearScene(scene) {
    if (scene) {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    }
  }

  function unflattenHilbertVectors(hilbertFlatBuffer) {
    const hilbertVectors = [];
    for (let i = 0; i < hilbertFlatBuffer.length; i += 3) {
      hilbertVectors.push(
        new THREE.Vector3(
          hilbertFlatBuffer[i],
          hilbertFlatBuffer[i + 1],
          hilbertFlatBuffer[i + 2]
        )
      );
    }
    return hilbertVectors;
  }

  const controls = () => {
    return (
      <div className="absolute top left text-white">
        <div className="ml-2">
          <label htmlFor="geometryIs3D">3D?</label>
          <input
            type="checkbox"
            name="isGeometry3D"
            id="isGeometry3D"
            onChange={(e) => updateN(e.target.checked)}
            className="mx-2"
            defaultChecked
          />
        </div>
        <div className="ml-2">
          <label htmlFor="isGeometrySquare">Square?</label>
          <input
            type="checkbox"
            name="isGeometrySquare"
            id="isGeometrySquare"
            onChange={(e) => {
              console.log(e.target.checked);
              updateGeometryType(e.target.checked);
            }}
            className="mx-2"
            defaultChecked
          />
        </div>
        <div className="ml-2">
          <label htmlFor="pInput">Magnitude</label>
          <input
            type="range"
            min="1"
            max="6"
            defaultValue="3"
            className="mx-2"
            id="pInput"
            onChange={(e) => updateP(e.target.value)}
          />
        </div>
        <div className="ml-2">
          <label htmlFor="pipeThicknessInput">Thickness</label>
          <input
            type="range"
            min="1"
            max="1000"
            defaultValue="150"
            className="mx-2"
            id="pipeThicknessInput"
            onChange={(e) => updatePipeThickness(e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      {isControlEnabled && controls()}
      <div className="w-full h-full" ref={THREECanvasMount} />
    </div>
  );
};

export default HilbertThreeRenderer;
