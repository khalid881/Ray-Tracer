import Vector3D from "./Vector3D.js";

export default class PointLight {
    constructor(position, intensity){
        this.position = position; 
        this.intensity = intensity;
    }
    
    getDirection(point){
        let direction = Vector3D.subV(this.position,point);
        direction.normalize();
        return direction;
    }

}