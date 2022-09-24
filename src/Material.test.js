const Material = require("./Material");
const Vector3D = require("./Vector3D");


test('creating a material', () => {
    const ivory = new Material(new Vector3D(102, 102, 76), 50,0.6,0.3,0.2,0.1);

    expect(ivory.diffuseColor.x).toBe(102);
    expect(ivory.diffuseColor.y).toBe(102);
    expect(ivory.diffuseColor.z).toBe(76);

    expect(ivory.specularExponent).toBe(50);
    expect(ivory.kd).toBeCloseTo(0.6,1);
    expect(ivory.ks).toBeCloseTo(0.3,1);
    expect(ivory.ka).toBeCloseTo(0.2,1);
    expect(ivory.kr).toBeCloseTo(0.1,1);

    
});