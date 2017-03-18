const Module = { // eslint-disable-line no-unused-vars
  filePackagePrefixURL: '/demoloops/',
  memoryInitializerPrefixURL: '/demoloops/',
  canvas: document.getElementById('canvas'),
};

function loadASM(name) {
  const supported = (typeof WebAssembly === 'object');
  if (supported) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/demoloops/${name}.wasm`, true);
    xhr.responseType = 'arraybuffer';
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
};
