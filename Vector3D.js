export default class Vector3D{
    constructor(x ,y ,z ){
        this.x = x;
        this.y = y;
        this.z = z;
 
    }

    norm(){
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    normalize(){
        let length = this.norm();

        this.x = this.x * (1/length);
        this.y = this.y * (1/length);
        this.z = this.z * (1/length); 

        return this;
    }

    static multiplyScalar(vector, scalar){
        let vec = new Vector3D(
            vector.x * scalar, 
            vector.y * scalar, 
            vector.z * scalar)

        return vec;
    }

    negate(){
        return new Vector3D(-this.x,-this.y,-this.z);
    }

    static dotProduct(leftVector,rightVector){

        let scalar = (
            leftVector.x * rightVector.x + 
            leftVector.y * rightVector.y +
            leftVector.z * rightVector.z
            ); 

        return scalar;

    }

    static addV(leftVector, rightVector){

        let vec = new Vector3D(
            leftVector.x + rightVector.x, 
            leftVector.y + rightVector.y,
            leftVector.z + rightVector.z
        );

        return vec;

    }
    
    static subV(leftVector, rightVector, norm){

        let vec = new Vector3D(
            leftVector.x - rightVector.x, 
            leftVector.y - rightVector.y,
            leftVector.z - rightVector.z

        );

        return vec;

    }

    
}


