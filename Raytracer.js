import Sphere from "./Sphere.js";
import Vector3D from "./Vector3D.js";
import PointLight from "./PointLight.js";
import Renderer from "./Renderer.js";
import Material from "./Material.js";

const  canvas = document.getElementById('canvas');
const  renderer = new Renderer(canvas);

function initTinyRayTracerScene(){
    
    // Materials
    let ivory = new Material(new Vector3D(102, 102, 76.5), 50,0.6,0.3,0.2,0.1);
    let redRubber = new Material(new Vector3D(76.5, 25.5, 25.5), 10,0.9,0.1,0.2,0.0);
    let mirror = new Material(new Vector3D(255,255,255),1425,0.0,10.0,0.2,0.8);

    // Background color 
    let backgroundColor = new Vector3D(51.2, 179.2, 204.8);

    // Objects
    let sphere1 = new Sphere(new Vector3D(-3, 0, -16), 2, ivory);
    let sphere2 = new Sphere(new Vector3D(-1, -1.5, -12), 2, mirror);
    let sphere3 = new Sphere(new Vector3D(1.5, -0.5, -18), 3, redRubber);
    let sphere4 = new Sphere(new Vector3D(7, 5, -18), 4, mirror);

    // Lights
    let light1 = new PointLight(new Vector3D(-20, 20, 20) , 1.5);
    let light2 = new PointLight(new Vector3D(30, 50, -25), 1.8 );
    let light3 = new PointLight(new Vector3D(30, 20, 30), 1.7);
 
    // Scene 
    renderer.scene.setBackgroundColor(backgroundColor);

    // set camera 
    renderer.scene.camera.setCameraPosition(new Vector3D(0,0,0));
    renderer.scene.camera.setImagePlaneDistance(-1);
    renderer.scene.camera.setFOV(Math.PI / 3);

    // add objects
    renderer.scene.addObject(sphere1);
    renderer.scene.addObject(sphere2);
    renderer.scene.addObject(sphere3);
    renderer.scene.addObject(sphere4);

    // add lights 
    renderer.scene.addLight(light1);
    renderer.scene.addLight(light2);
    renderer.scene.addLight(light3);
    renderer.scene.ambient.setIntensity(0);

    // renderer options
    renderer.enableShadows(true);
    renderer.setMaxReflectionDepth(4);
    renderer.enableAA(true);
   
}

initTinyRayTracerScene();
renderer.render();


