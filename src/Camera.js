const Vector3D = require('./Vector3D.js');

class Camera{
    constructor(){
        this.cameraPosition = new Vector3D(); 
        this.imagePlaneDist = 0;
        this.fov =  0;
    }

    setCameraPosition(position){
        this.cameraPosition = position;
    }

    setImagePlaneDistance(distance){
        this.imagePlaneDist= distance;
    }

    setFOV(fov){
        this.fov = fov;

    }

}

module.exports = Camera;