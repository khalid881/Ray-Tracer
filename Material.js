export default class Material{
    constructor(diffuseColor,specularExponent = 0,kd = 0,ks = 0,ka = 0,kr=0){
        this.diffuseColor = diffuseColor;
        this.specularExponent = specularExponent; 
        this.kd = kd;
        this.ks = ks;
        this.ka = ka; 
        this.kr = kr; 
    }


}