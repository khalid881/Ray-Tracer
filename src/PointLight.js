const Vector3D = require('./Vector3D.js');

class PointLight {
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

module.exports = PointLight;