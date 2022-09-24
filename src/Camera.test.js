const Camera = require("./Camera");
const Vector3D = require("./Vector3D");


test('set camera position', () => {
    const camera = new Camera();
    camera.setCameraPosition(new Vector3D(1,1,1));

    expect(camera.cameraPosition.x).toBe(1);
    expect(camera.cameraPosition.y).toBe(1);
    expect(camera.cameraPosition.z).toBe(1);


});

test('set image plane distance', () => {
    const camera = new Camera();
    camera.setImagePlaneDistance(2);
    expect(camera.imagePlaneDist).toBe(2);


});

test('set fov', () => {
    const camera = new Camera();
    camera.setFOV(2);
    expect(camera.fov).toBe(2);

});