import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const loadGLTFModel = (url: string) => {
  return new Promise<Group>((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.name = 'Cat';
        model.position.x = 0;
        model.position.y = 0;

        resolve(model);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
