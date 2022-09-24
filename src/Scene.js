const AmbientLight = require('./AmbientLight.js');
const Camera = require('./Camera.js');
const Vector3D = require('./Vector3D.js');

class Scene{

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

module.exports = Scene;