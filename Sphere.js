import Vector3D from "./Vector3D.js";

export default class Sphere {
    constructor(center = new Vector3D(),radius,material){
        this.center = center;
        this.radius = radius;
        this.material = material;

    }

    hit(ray,tmin){
        let oc = Vector3D.subV(ray.origin, this.center);
        let a = Vector3D.dotProduct(ray.direction, ray.direction);
        let b = 2 * Vector3D.dotProduct(oc,ray.direction);
        let c = Vector3D.dotProduct(oc, oc) - (this.radius * this.radius);
        let discriminant = b * b - 4 * a * c;

        if(discriminant < 0) return Infinity;

        let sqrtD = Math.sqrt(discriminant);

        let root = (-b - sqrtD) / (2 * a);


        if(root > tmin){
            return root;
        }
        else{
            root = (-b + sqrtD) / (2 * a);
            if(root > tmin) return root;
            else return Infinity;
            
        }

    }

}