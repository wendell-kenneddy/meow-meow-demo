import { useCallback, useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadGLTFModel } from '../../lib/loadGLTFModel';
import { CatContainer } from '../CatContainer';
import { Spinner } from '../Spinner';

export const CatModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [renderer, setRenderer] = useState<WebGLRenderer>();
  const [camera, setCamera] = useState<PerspectiveCamera | null>(null);
  const [target] = useState(new THREE.Vector3(0, 0, 0));
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      5 * Math.sin(0.2 * Math.PI),
      1,
      10 * Math.cos(0.2 * Math.PI)
    )
  );
  const [scene] = useState(new THREE.Scene());
  const [controls, setControls] = useState<OrbitControls | null>(null);

  const handleWindowResize = useCallback(() => {
    const { current: container } = containerRef;
    if (container && renderer) {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
    }
  }, [renderer]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = containerRef;

    if (container && !renderer) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const webGlRenderer = new WebGLRenderer({ antialias: true, alpha: true });
      const perspectiveCamera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        5000
      );

      const orbitControls = new OrbitControls(
        perspectiveCamera,
        webGlRenderer.domElement
      );

      const ambientLight = new THREE.AmbientLight('#fff', 0.8);
      scene.add(ambientLight);

      const spaceTexture = new THREE.TextureLoader().load('/space_texture.jpg');
      scene.background = spaceTexture;

      webGlRenderer.setPixelRatio(window.devicePixelRatio);
      webGlRenderer.setSize(width, height);
      webGlRenderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(webGlRenderer.domElement);
      setRenderer(webGlRenderer);

      perspectiveCamera.position.copy(initialCameraPosition);
      perspectiveCamera.lookAt(target);
      setCamera(perspectiveCamera);

      orbitControls.target = target;
      orbitControls.autoRotate = true;
      setControls(orbitControls);

      const animate = () => {
        requestAnimationFrame(animate);

        orbitControls.update();
        webGlRenderer.render(scene, perspectiveCamera);
      };

      loadGLTFModel('/cat.glb').then((model) => {
        model.rotateY(3 * Math.sin(0.2 * Math.PI));

        scene.add(model);

        animate();
        setIsLoading(false);
      });

      return () => {
        console.log('unmount');
        webGlRenderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [renderer, handleWindowResize]);

  return (
    <CatContainer ref={containerRef}>{isLoading && <Spinner />}</CatContainer>
  );
};
