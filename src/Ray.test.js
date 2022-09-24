const Ray = require("./Ray");
const Vector3D = require("./Vector3D");

test('creating ray', () => {
    const ray = new Ray(new Vector3D(1,2,3), new Vector3D(4,5,6));

    expect(ray.origin.x).toBe(1,2);
    expect(ray.origin.y).toBe(2,2);
    expect(ray.origin.z).toBe(3,2);

    expect(ray.direction.x).toBe(4,2);
    expect(ray.direction.y).toBe(5,2);
    expect(ray.direction.z).toBe(6,2);
    
});