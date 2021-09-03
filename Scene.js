import AmbientLight from "./AmbientLight.js";
import Camera from "./Camera.js";
import Vector3D from "./Vector3D.js";

export default class Scene{

    constructor(){
        this.objects = [];
        this.lights = [];
        this.backgroundColor = new Vector3D();
        this.camera = new Camera();
        this.ambient = new AmbientLight();
 
    }

    addObject(object){
        this.objects.push(object);

    }

    addLight(light){
        this.lights.push(light);
        
    }

    setBackgroundColor(color){
        this.backgroundColor = color;
    }

}