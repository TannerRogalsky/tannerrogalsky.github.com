const shaderProgram = function shaderProgram(gl, vs, fs) {
  const prog = gl.createProgram();
  const addShader = function addShader(type, source) {
    const s = gl.createShader((type === 'vertex') ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(`Could not compile ${type} shader: ${gl.getShaderInfoLog(s)}`);
    }
    gl.attachShader(prog, s);
  };
  addShader('vertex', vs);
  addShader('fragment', fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('Could not link the shader program!');
  }
  return prog;
};

export default shaderProgram;
