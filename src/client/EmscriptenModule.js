const Module = { // eslint-disable-line no-unused-vars
  filePackagePrefixURL: '/demoloops/',
  memoryInitializerPrefixURL: '/demoloops/',
  canvas: document.getElementById('canvas'),
  preRun: [
    function logPreRun() {
      window.cancelAnimationFrame(Module.loadingAnimationInterval);
    },
  ],
};

(function loadingDraw(m) {
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

  const attributeSetFloats = function attributeSetFloats(gl, prog, attrName, rsize, arr) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
    const attr = gl.getAttribLocation(prog, attrName);
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, rsize, gl.FLOAT, false, 0, 0);
  };

  const orthographicMatrix = function orthographicMatrix(left, right, bottom, top) {
    const matrix = new Float32Array(16);

    matrix[0] = 2 / (right - left);
    matrix[5] = 2 / (top - bottom);
    matrix[10] = -1;

    matrix[12] = -(right + left) / (right - left);
    matrix[13] = -(top + bottom) / (top - bottom);

    matrix[15] = 1;

    return matrix;
  };

  const drawRect = function drawRect(gl, program, x, y, w, h) {
    attributeSetFloats(gl, program, 'VertexPosition', 3, [
      x, y, 0,
      x, y + h, 0,
      x + w, y + h, 0,
      x + w, y, 0,
    ]);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  };

  const canvas = m.canvas;
  const gl = canvas.getContext('webgl');
  const program = shaderProgram(gl, `
    attribute vec3 VertexPosition;
    uniform mediump mat4 Projection;

    void main() {
     gl_Position = Projection * vec4(VertexPosition, 1.0);
    }`, `
    uniform mediump vec4 GlobalColor;

    void main() {
      gl_FragColor = GlobalColor;
    }`);
  gl.useProgram(program);

  const width = canvas.scrollWidth;
  const height = canvas.scrollHeight;
  const projection = orthographicMatrix(0, width, height, 0);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, 'Projection'), gl.FALSE, projection);

  const colors = [
    [255 / 255, 231 / 255, 156 / 255],
    [255 / 255, 192 / 255, 192 / 255],
    [228 / 255, 255 / 255, 206 / 255],
    [191 / 255, 250 / 255, 255 / 255],
    [201 / 255, 213 / 255, 255 / 255],
  ];

  const draw = function draw(time) {
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const count = 5;
    for (let i = 0; i < count; i++) {
      const interval = i / count * Math.PI * 2 + time / 1000;

      const c = colors[i];
      gl.uniform4f(gl.getUniformLocation(program, 'GlobalColor'), c[0], c[1], c[2], 1);

      const x = Math.cos(interval) * height / 3 + width / 2;
      const y = Math.sin(interval) * height / 3 + height / 2;

      drawRect(gl, program, x, y, 25, 25);
    }

    m.loadingAnimationInterval = window.requestAnimationFrame(draw);
  };
  m.loadingAnimationInterval = window.requestAnimationFrame(draw);
}(Module));

function loadASM(name) { // eslint-disable-line no-unused-vars
  const supported = (typeof WebAssembly === 'object');
  if (supported) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/demoloops/${name}.wasm`, true);
    xhr.responseType = 'arraybuffer';
    xhr.overrideMimeType('application/javascript');
    xhr.onload = function onWASMLoad() {
      Module.wasmBinary = xhr.response;
      const script = document.createElement('script');
      script.src = `/demoloops/${name}.js`;
      document.body.appendChild(script);
    };
    xhr.send(null);
  } else {
    const script = document.createElement('script');
    script.src = `/demoloops/${name}_asm.js`;
    document.body.appendChild(script);
  }
}
