const AmbientLight = require("./AmbientLight");

test('setting ambient light intensity', () => {
    const ambientlight = new AmbientLight();
    ambientlight.setIntensity(2);

    expect(ambientlight.intensity).toBe(2);

});