const Vector3D = require('./Vector3D.js');


test('magnitude of vector', () => {
    const vector = new Vector3D(1,1,1);
    vector.norm()

    expect(vector.norm()).toBeCloseTo(1.73205, 2);
});


test('normalize a vector', () => {
    const vector = new Vector3D(1,1,1);
    vector.normalize();

    expect(vector.norm()).toBe(1,2);
});


test('multiply vector by a scalar', () => {
    const vector = new Vector3D(1,1,1);
    const vector2 = Vector3D.multiplyScalar(vector,2);

    expect(vector2.x).toBe(2,2);
    expect(vector2.y).toBe(2,2);
    expect(vector2.z).toBe(2,2);
});


test('negate a vector', () => {
    const vector = new Vector3D(1,1,1);
    const vector2 = vector.negate();

    expect(vector2.x).toBe(-vector.x,2);
    expect(vector2.y).toBe(-vector.y,2);
    expect(vector2.z).toBe(-vector.z,2);
});



test('dot product of two vectors', () => {
    const vector = new Vector3D(1,1,1);
    const vector2 = new Vector3D(2,2,2);

    

    expect(Vector3D.dotProduct(vector,vector2)).toBe(6,2);
});


test('add vectors', () => {
    const vector = new Vector3D(1,1,1);
    const vector2 = new Vector3D(2,2,2);
    const vector3 = Vector3D.addV(vector,vector2);

    expect(vector3.x).toBe(3,2);
    expect(vector3.y).toBe(3,2);
    expect(vector3.z).toBe(3,2);
});

test('subtract vectors', () => {
    const vector = new Vector3D(1,1,1);
    const vector2 = new Vector3D(2,2,2);
    const vector3 = Vector3D.subV(vector,vector2);

    expect(vector3.x).toBe(-1,2);
    expect(vector3.y).toBe(-1,2);
    expect(vector3.z).toBe(-1,2);
});


