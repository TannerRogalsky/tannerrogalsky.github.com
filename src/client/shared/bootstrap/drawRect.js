import attributeSetFloats from './attributeSetFloats.js';

const drawRect = function drawRect(gl, program, x, y, w, h) {
  attributeSetFloats(gl, program, 'VertexPosition', 3, [
    x, y, 0,
    x, y + h, 0,
    x + w, y + h, 0,
    x + w, y, 0,
  ]);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
};

export default drawRect;
