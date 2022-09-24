const PointLight = require("./PointLight");
const Vector3D = require("./Vector3D");

test('creating point light', () => {
    const light = new PointLight(new Vector3D(30, 20, 30), 1.7);

    expect(light.position.x).toBe(30,2);
    expect(light.position.y).toBe(20,2);
    expect(light.position.z).toBe(30,2);

    expect(light.intensity).toBe(1.7,2);
    
});

test('get direction of point light', () => {
    const light = new PointLight(new Vector3D(1,1,1), 1);
    const point = new Vector3D(0,0,0);
    const direction = light.getDirection(point);

    expect(direction.x).toBeCloseTo(0.57735,3);
    expect(direction.y).toBeCloseTo(0.57735,3);
    expect(direction.z).toBeCloseTo(0.57735,3);
    
});