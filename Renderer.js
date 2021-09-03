import Vector3D from "./Vector3D.js";
import Ray from "./Ray.js";
import Scene from "./Scene.js";

export default class Renderer{
    constructor(canvas){
        this.scene = new Scene();
        this.canvas = canvas;
        this.enableShadow = false;
        this.AA = false;
        this.maxReflectionDepth = 0;
    }

    enableShadows(option){
        this.enableShadow = option;
    }

    enableAA(option){
        this.AA = option;

    }
    setMaxReflectionDepth(depth){
        this.maxReflectionDepth = depth;
    }

    getHalfwayDirection(lightDirection,view){

        return Vector3D.addV(view,lightDirection);

    }

    getDistance(point1,point2){
        return Vector3D.subV(point1,point2).norm();

    }

    inShadow(hitPoint,lightDirection,distanceToLight){

        let shadowRay = new Ray(hitPoint,lightDirection);

        for(let object of this.scene.objects){
            let root = object.hit(shadowRay,0.0001);
            if(root < distanceToLight){
                return true;
            }
        }

        return false;

    }
    
    shadePhong(material,hitPoint,normal,ray){

        let view = ray.direction.negate();
        let lightDirection;
        let distanceToLight;
        let nDotL;
        let reflectionDirection;
        let diffuseLightIntensity = 0;
        let specularLightIntensity = 0;
        
        for (let light of this.scene.lights) 
        {
            
            lightDirection  = light.getDirection(hitPoint);
            distanceToLight = this.getDistance(light.position,hitPoint); 
            nDotL = Vector3D.dotProduct(lightDirection,normal);

            if(this.enableShadow && this.inShadow(hitPoint,lightDirection,distanceToLight)){
                continue; 
            }

            if(nDotL < 0 ){
                continue; 
            }
   
            reflectionDirection = this.getReflectionDirection(lightDirection,normal);
            reflectionDirection.normalize();

            diffuseLightIntensity  += material.kd * light.intensity * nDotL;
            specularLightIntensity += material.ks * light.intensity * Math.pow( Math.max(0, Vector3D.dotProduct(reflectionDirection,view) ) ,material.specularExponent);
  
        }

        let specularColor =  new Vector3D(255,255,255);
        let diffuse =  Vector3D.multiplyScalar( material.diffuseColor , diffuseLightIntensity );
        let specular = Vector3D.multiplyScalar( specularColor , specularLightIntensity );
        let ambient = Vector3D.multiplyScalar( material.diffuseColor , material.ka * this.scene.ambient.intensity);


        let finalColor = Vector3D.addV(ambient,Vector3D.addV(diffuse,specular));

        return finalColor;
        

    }

    shadeBlinnPhong(material,hitPoint,normal,ray){
        let view = ray.direction.negate();
        let lightDirection;
        let halfwayDirection;
        let diffuseLightIntensity = 0;
        let specularLightIntensity = 0;
        let ambient = Vector3D.multiplyScalar(material.diffuseColor, material.ka * this.scene.ambient.intensity);

        for (let light of this.scene.lights) {
            
            lightDirection  = Vector3D.subV(light.position,hitPoint);
            lightDirection.normalize();


            halfwayDirection = this.getHalfwayDirection(lightDirection,view);
            halfwayDirection.normalize();

            diffuseLightIntensity  += material.kd * light.intensity * Math.max(0, Vector3D.dotProduct(lightDirection,normal));
            specularLightIntensity += material.ks * light.intensity * Math.pow( Math.max(0, Vector3D.dotProduct(halfwayDirection,normal) ) ,material.specularExponent);
        }

        let result = Vector3D.addV(Vector3D.multiplyScalar(material.diffuseColor,diffuseLightIntensity), Vector3D.multiplyScalar(new Vector3D(255,255,255),specularLightIntensity));
        result = Vector3D.addV(result,ambient);
        return result;
        
    }

    getClosestIntersection(ray,tmin){
        let minRoot = Infinity; 
        let closestObject = null;

        for(let object of this.scene.objects){
            let root = object.hit(ray,tmin); 
                                                    
            if(root < minRoot){
                minRoot = root;
                closestObject = object;
            }
        }

        return {
            root: minRoot,
            closestObject: closestObject
        }

    }
 
    getReflectionDirection(lightDirection,normal){
        let negLightDir = lightDirection.negate();
        let ldotN = Vector3D.dotProduct(lightDirection,normal);
        let reflectionDirection = Vector3D.addV(Vector3D.multiplyScalar(normal, 2 * ldotN),negLightDir);
   
        return reflectionDirection;

    }

    traceRay(ray,tmin,currentDepth){ 
        let result = this.getClosestIntersection(ray,tmin);  

        if(result.root > 1000){
            return this.scene.backgroundColor;
        }
  
        let hitPoint= Vector3D.addV(ray.origin,Vector3D.multiplyScalar(ray.direction,result.root));
        let normal = Vector3D.subV(hitPoint,result.closestObject.center);
        normal.normalize();

        let localColor = this.shadePhong(result.closestObject.material,hitPoint,normal,ray); 

        let kr = result.closestObject.material.kr;

        if (currentDepth >= this.maxReflectionDepth || kr <= 0 ) {
            return localColor;
        }

        let reflectionRay = new Ray(hitPoint,this.getReflectionDirection(ray.direction.negate(),normal));
        let reflectedColor = this.traceRay(reflectionRay, 0.0001, currentDepth + 1 ); 
      
        return Vector3D.addV(localColor,Vector3D.multiplyScalar(reflectedColor,kr));

    }
    
    setPixelColor(pixelColor,pixelColorData,cx,cy,width){
        let pixelIndex = (cy * width) + cx;

        let rgbaIndex = 4 * pixelIndex;
 
        pixelColorData.data[rgbaIndex] = pixelColor.x;
        pixelColorData.data[rgbaIndex + 1] = pixelColor.y;
        pixelColorData.data[rgbaIndex + 2] = pixelColor.z;
        pixelColorData.data[rgbaIndex + 3] = 255;

    }

    genCameraRayAA(cx,cy,aspectRatio,width,height,p,q,n){

        let imagePlanex = ( 2 *( (cx + ( p + Math.random() ) / n) / width ) - 1) * Math.tan(this.scene.camera.fov / 2) * aspectRatio;
        let imagePlaney = ( 1 - 2*( (cy + (q + Math.random()) / n) / height ) ) * Math.tan(this.scene.camera.fov / 2);
        let imagePlaneCoordinate = new Vector3D(imagePlanex, imagePlaney, this.scene.camera.imagePlaneDist);

        return new Ray(this.scene.camera.cameraPosition, Vector3D.subV(imagePlaneCoordinate,this.scene.camera.cameraPosition));

    
    }

    genCameraRay(cx,cy,aspectRatio,width,height){
        let imagePlanex = ( 2 *( (cx + 0.5) / width ) - 1) * Math.tan(this.scene.camera.fov / 2) * aspectRatio;
        let imagePlaney = ( 1 - 2*( (cy + 0.5) / height ) ) * Math.tan(this.scene.camera.fov / 2);
        let imagePlaneCoordinate = new Vector3D(imagePlanex, imagePlaney, this.scene.camera.imagePlaneDist);

        return new Ray(this.scene.camera.cameraPosition, Vector3D.subV(imagePlaneCoordinate,this.scene.camera.cameraPosition));
        
    }

    getSamples(cx,cy,aspectRatio,width,height){

        let n = 4;

        let samples = [];

        for(let p = 0; p <= n-1 ; p++){
            for(let q = 0; q <= n-1; q++){

                let ray = this.genCameraRayAA(cx,cy,aspectRatio,width,height,p,q,n);
                ray.direction.normalize();

                samples.push(ray);
                
            }
        }

        return samples;

    }

    render(){
        let context = this.canvas.getContext("2d");
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;
        let pixelColorData = context.getImageData(0,0,width,height);
        let aspectRatio = width / height;

        for(let cy = 0; cy < height;  cy++){
            for(let cx = 0; cx < width; cx++){

                let pixelColor = new Vector3D(0,0,0);

                if(this.AA){
                    let samples = this.getSamples(cx,cy,aspectRatio,width,height);

                    for(let ray of samples){
                        let startingDepth = 0;
                        pixelColor = Vector3D.addV(pixelColor,this.traceRay(ray,0,startingDepth)); 

                    }

                    pixelColor = Vector3D.multiplyScalar(pixelColor,1/samples.length);

                }
                else{
                    let ray = this.genCameraRay(cx,cy,aspectRatio,width,height);
                    ray.direction.normalize();

                    let startingDepth = 0;
                    pixelColor = Vector3D.addV(pixelColor,this.traceRay(ray,0,startingDepth)); 
                }

                this.setPixelColor(pixelColor,pixelColorData,cx,cy,width);

            }
        }

        context.putImageData(pixelColorData,0,0);

    }
}